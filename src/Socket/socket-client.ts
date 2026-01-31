import { io, Socket } from "socket.io-client";
import { User } from "../shared/config/types"; // Adjust according to your type definitions
import { SERVER_URL, SERVER_URL_FOR_CHAT } from "../shared/config/secret";

// Create a singleton socket instance
let socket: Socket | null = null;

declare global {
  interface Window {
    typingTimeout: ReturnType<typeof setTimeout> | null;
  }
}

export const initializeSocket = (): Socket => {
  if (!socket) {
    let connectionUrl: string;

    if (SERVER_URL_FOR_CHAT) {
      // SERVER_URL_FOR_CHAT is typically the root domain (e.g. https://site.com)
      connectionUrl = `${SERVER_URL_FOR_CHAT}/api/v1/socket/chat`;
    } else {
      // Fallback to SERVER_URL. Handle potential /api/v1 suffix or trailing slashes.
      // Remove trailing slash if present
      const cleanServerUrl = SERVER_URL.replace(/\/+$/, '');

      if (cleanServerUrl.endsWith('/api/v1')) {
        connectionUrl = `${cleanServerUrl}/socket/chat`;
      } else {
        connectionUrl = `${cleanServerUrl}/api/v1/socket/chat`;
      }
    }

    socket = io(connectionUrl, {
      // Change order to prioritize polling, or remove 'websocket' entirely
      transports: ["websocket", "polling"],
      withCredentials: true,
      forceNew: true,
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

export const emitTyping = (roomId: string | number, userId: number): void => {
  const socket = getSocket();
  socket.emit("typing", { roomId, userId }); // Send the ID specifically
};

export const emitStopTyping = (roomId: string | number, user: User): void => {
  const socket = getSocket();
  socket.emit("stopTyping", { roomId, user });
};
