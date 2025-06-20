export interface ClientToServerEvents {
  join_room: (roomId: string) => void;
  send_message: (data: {
    roomId: string;
    sender: string;
    message: string;
  }) => void;
}

export interface ServerToClientEvents {
  receive_message: (data: { sender: string; message: string }) => void;
}
export interface ServerToClientEvents {
  conversations: (data: any) => void;
}
