import { FastifyInstance } from "fastify";
import { Server } from "socket.io";

export function initWebsocketServer(server: FastifyInstance) {
  const io = new Server(server.server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  return io;
}
