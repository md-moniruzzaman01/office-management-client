/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from "react";
import { AtSign, Clock, MapPin, Send } from "lucide-react";
import {
  useGetSingleUserQuery,
  useGetUsersQuery,
} from "../../redux/features/api/Users/user";
import LoadingPage from "../../common/LoadingPage/LoadingPage";
import { User } from "../../shared/config/types";
import { demoUserLogo } from "../../shared/config/constaints";
import { Socket } from "socket.io-client";
import { getUser } from "../../shared/Helpers/jwt";
import { useGetChatsRoomQuery } from "../../redux/features/api/Chat/chat";
import { getFormatDate } from "../../shared/Helpers/getFullTimeAndDate";
import { Button } from "../../components/ui/button";
import { NavLink } from "react-router-dom";
import {
  emitStopTyping,
  emitTyping,
  getSocket,
  joinChatRoom,
  sendMessage,
} from "../../Socket/socket-client";
import { SERVER_URL } from "../../shared/config/secret";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  senderId?: number;
  receiverId?: number;
}

const ChatApp = () => {
  const { data: users, isLoading } = useGetUsersQuery({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const user: any = getUser();
  const { data: singleUser } = useGetSingleUserQuery(
    { id: user?.id },
    { skip: !user?.id }
  );

  const { data: chatRoomData } = useGetChatsRoomQuery(
    {
      senderId: singleUser?.data?.id,
      receiverId: activeUser?.id,
    },
    { skip: !activeUser?.id || !singleUser?.data?.id }
  );

  // Initialize socket connection and current user
  useEffect(() => {
    setSocket(getSocket());

    // return () => {
    //   newSocket.disconnect();
    // };
  }, [users?.data, singleUser?.data]);
  // Set initial active user
  useEffect(() => {
    if (users?.data?.length && !activeUser) {
      const firstOtherUser = users?.data?.find(
        (user: User) => user?.id !== singleUser?.data?.id
      );
      setActiveUser(firstOtherUser);
    }
  }, [users?.data, singleUser?.data, activeUser]);

  // Join chat room when active user changes
  useEffect(() => {
    if (
      !socket ||
      !activeUser ||
      !singleUser?.data?.id ||
      !chatRoomData?.data?.id
    )
      return;

    const loadChatRoom = async () => {
      try {
        joinChatRoom(chatRoomData?.data?.id);
        const response = await fetch(
          `${SERVER_URL}/chats/room/${chatRoomData?.data?.id}`
        );

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if the response is in JSON format
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON response, but got " + contentType);
        }

        const data = await response.json();
        if (data?.success && data?.data) {
          setMessages(
            data?.data?.map((msg: any) => ({
              id: msg.id,
              text: msg.content,
              sender: msg.senderId === singleUser?.data?.id ? "user" : "bot",
              timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              senderId: msg.senderId,
              receiverId: msg.receiverId,
            }))
          );
        }
      } catch (error) {
        console.error("Error loading chat room:", error);
      }
    };

    loadChatRoom();
  }, [socket, activeUser, singleUser?.data, chatRoomData?.data?.id]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message: any) => {
      const isMine = message.senderId === singleUser?.data?.id;
      const newMsg: Message = {
        id: message.id,
        text: message.content,
        sender: isMine ? "user" : "bot",
        timestamp: new Date(message.createdAt || Date.now()).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        senderId: message.senderId,
        receiverId: message.receiverId,
      };

      setMessages((prev) => [...prev, newMsg]);
    });

    socket.on("userTyping", (user: number) => {
      if (user === activeUser?.id) {
        setIsTyping(true);
      }
    });

    socket.on("userStoppedTyping", (user: number) => {
      if (user === activeUser?.id) {
        setIsTyping(false);
      }
    });

    socket.on("messageUpdated", (updatedMessage: any) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === updatedMessage.id
            ? {
                ...msg,
                text: updatedMessage.content,
                timestamp: new Date(
                  updatedMessage.updatedAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }
            : msg
        )
      );
    });

    socket.on("messageDeleted", (deletedMessage: { id: number }) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== deletedMessage.id));
    });

    return () => {
      socket.off("newMessage");
      socket.off("userTyping");
      socket.off("userStoppedTyping");
      socket.off("messageUpdated");
      socket.off("messageDeleted");
    };
  }, [socket, singleUser?.data, activeUser, chatRoomData?.data?.id, user]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle typing indicator
  const handleTyping = () => {
    if (!socket || !activeUser || !singleUser?.data?.id) return;

    if (!isTyping) {
      emitTyping(chatRoomData?.data?.id, singleUser?.data?.id);
    }

    if (window.typingTimeout) {
      clearTimeout(window.typingTimeout);
    }

    window.typingTimeout = setTimeout(() => {
      emitStopTyping(chatRoomData?.data?.id, singleUser?.data?.id);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!input.trim() || !socket || !activeUser || !singleUser?.data?.id)
      return;

    const messageData = {
      senderId: singleUser?.data?.id,
      receiverId: activeUser.id,
      content: input.trim(),
    };

    sendMessage(messageData);

    setInput("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  if (isLoading) {
    return <LoadingPage fullPage />;
  }

  return (
    <div className="flex h-[calc(100vh-100px)] shadow-md">
      {/* Sidebar */}
      <div className="w-1/5 bg-sidebar text-chatText rounded-l-md">
        <div className="p-4 text-center border-b border-gray-700">
          <h2 className="text-lg font-semibold">Contacts</h2>
        </div>
        <div
          className="py-2 overflow-y-auto h-[calc(100vh-162px)] [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          {users?.data
            ?.filter((user: User) => user.id !== singleUser?.data?.id)
            .map((user: User) => (
              <div
                key={user.id}
                onClick={() => setActiveUser(user)}
                className={` text-gray-800 dark:text-gray-200 flex items-center px-4 py-3 cursor-pointer transition-all duration-500 ${
                  activeUser?.id === user?.id ? "text-blue underline pl-7" : ""
                }`}
              >
                <img
                  src={user?.profileImage || demoUserLogo}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>{user.name}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center px-4 py-[6px] bg-sidebar border-b border-gray-700 rounded-tr-md">
          <div className="relative w-12 h-12">
            <img
              src={activeUser?.profileImage || demoUserLogo}
              alt="John Doe"
              className="w-12 h-12 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
            />
            <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
          </div>
          <span>{activeUser?.name}</span>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto  p-4 bg-chatBg [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <div className="w-80 mx-auto mb-8">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <img
                  src={activeUser?.profileImage || demoUserLogo}
                  alt="John Doe"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
                <span className="absolute bottom-2 right-3 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold ">
                {activeUser?.name}
              </h3>
            </div>

            <div className="text-center text-xs font-medium">
              <div className="flex items-center justify-center p-1 ">
                <MapPin className="w-3 h-3 mr-1 text-blue-500" />
                <span>
                  {[
                    activeUser?.designation,
                    activeUser?.department?.name,
                    activeUser?.branch?.name,
                  ]
                    .filter(Boolean)
                    .join(" • ") || "No email available"}
                </span>
              </div>
              <div className="flex items-center justify-center p-1 ">
                <AtSign className="w-3 h-3 mr-1 text-blue-500" />
                <span>{activeUser?.email || "No email available"}</span>
              </div>

              <div className="flex items-center justify-center p-1 ">
                <Clock className="w-3 h-3 mr-1 text-blue-500" />
                <span>Joined {getFormatDate(activeUser?.hireDate ?? "")}</span>
              </div>
              <div>
                <NavLink to={`/profile`}>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    className="shadow-md mt-2 "
                  >
                    View Profile
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`${
                message.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`max-w-[60%] p-3 rounded-lg inline-block mb-4 ${
                  message.sender === "user"
                    ? "bg-componentsBackground "
                    : "bg-componentsBackground"
                }`}
              >
                {message.text}
                <div className="text-xs text-gray-400 mt-1">
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div ref={messagesEndRef} className="flex items-center ">
              <div className="bg-componentsBackground  rounded-full py-1 px-4  flex ">
                <span className="text-sm text-gray-400 ">Typing</span>
                <span className="rounded-full animate-bounce delay-100">.</span>
                <span className="rounded-full animate-bounce delay-300 mx-1">
                  .
                </span>
                <span className="rounded-full animate-bounce delay-500">.</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="w-full flex items-center px-3 py-3 border-t border-gray-300">
          <input
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInput(e.target.value);
              handleTyping();
            }}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="bg-componentsBackground flex-1 p-3 rounded-lg  placeholder-gray-500  transition-all"
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-500 text-white p-2 rounded-full"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
