import { initWebsocketServer } from "./websocket";
import "dotenv/config";
import { initMockMqttClient } from "./mockMqttClient";
import { initMqttClient } from "./mqttClient/mqttClient";
import fastify from "fastify";
import { initSqLite } from "./sqlite/sqLite";
import v1Routes from "./api/v1Routes";

const USE_MOCK = process.env.USE_MOCK;

const db = initSqLite();
const server = fastify();
const io = initWebsocketServer(server);

async function startServer() {
  try {
    if (db) {
      if (USE_MOCK === "false") {
        initMqttClient(io, db);
      } else {
        initMockMqttClient(io, db);
      }

      server.decorate("db", db);
      server.register(v1Routes, { prefix: "/api/v1" });

      const res = await server.listen({ port: 3001 });
      console.log("Server listening: ", res);
    } else {
      console.error("NO DATABASE CONNECTION, EXITING");
      process.exit(1);
    }
  } catch (e) {
    server.log.error(e);
    process.exit(1);
  }
}

startServer();
