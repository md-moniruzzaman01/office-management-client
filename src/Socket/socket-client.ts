import { io, Socket } from "socket.io-client";
import { User } from "../shared/config/types"; // Adjust according to your type definitions

// Create a singleton socket instance
let socket: Socket | null = null;

declare global {
  interface Window {
    typingTimeout: ReturnType<typeof setTimeout> | null;
  }
}

export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io("https://office-management-backend-pied.vercel.app", {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("connect_error", (error: Error) => {
      console.error("Socket connection error:", error);
    });
  }

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Helper functions for common socket operations
export const joinChatRoom = (roomId: string | number): void => {
  const socket = getSocket();
  socket.emit("joinRoom", roomId);
};

export interface MessageData {
  senderId: number;
  receiverId: number;
  content: string;
  chatRoomId?: number;
}

export const sendMessage = (messageData: MessageData): void => {
  const socket = getSocket();
  socket.emit("sendMessage", messageData);
};

export const emitTyping = (roomId: string | number, user: User): void => {
  const socket = getSocket();
  socket.emit("typing", { roomId, user });
};

export const emitStopTyping = (roomId: string | number, user: User): void => {
  const socket = getSocket();
  socket.emit("stopTyping", { roomId, user });
};
