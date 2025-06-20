import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./types";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
const token = localStorage.getItem("neo_partner_token");

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SOCKET_URL,
  {
    query: { token },
    transports: ["websocket"],
  }
);

export default socket;
