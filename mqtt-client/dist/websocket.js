"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebsocketServer = initWebsocketServer;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
function initWebsocketServer() {
    const server = (0, http_1.createServer)();
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
    io.listen(3001);
    return io;
}
