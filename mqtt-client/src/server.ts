import { initWebsocketServer } from "./websocket";
import "dotenv/config";
import { initMockMqttClient } from "./mockMqttClient";
import { initMqttClient } from "./mqttClient/mqttClient";
import { initSqLite } from "./sqLite";

const USE_MOCK = process.env.USE_MOCK;

const db = initSqLite();
const io = initWebsocketServer();
if (db) {
  if (USE_MOCK === "false") {
    initMqttClient(io, db);
  } else {
    initMockMqttClient(io, db);
  }
} else {
  console.error("NO DATABASE CONNECTION, EXITING");
  process.exit(1);
}
