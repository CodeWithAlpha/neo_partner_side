import React, { createContext, useEffect, useContext } from "react";
import socket from "./socket";

const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    socket.on("connect", async () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("join_room", "finance-room");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
