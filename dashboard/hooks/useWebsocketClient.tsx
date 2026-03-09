import { useEffect } from "react";
import { io } from "socket.io-client";

export default function useWebsocketClient() {
  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("devices", (msg) => {
      console.log(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}
