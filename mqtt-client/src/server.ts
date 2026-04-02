import { initWebsocketServer } from "./websocket";
import "dotenv/config";
import { initMockMqttClient } from "./mockMqttClient";
import { initMqttClient } from "./mqttClient";

const USE_MOCK = process.env.USE_MOCK;

const io = initWebsocketServer();
if (USE_MOCK === "false") {
  initMqttClient(io);
} else {
  initMockMqttClient(io);
}
