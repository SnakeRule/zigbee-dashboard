import { createServer } from "http";
import { Server } from "socket.io";

export function initWebsocketServer() {
  const server = createServer();

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
    },
  });
  io.listen(3001);

  return io;
}
