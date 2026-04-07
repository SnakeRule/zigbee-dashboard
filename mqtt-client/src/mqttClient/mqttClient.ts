import mqtt from "mqtt";
import { initWebsocketServer } from "../websocket";
import Database from "better-sqlite3";
import { handleMqttMessage } from "./messageHandler";
import { initStateHandler } from "./stateHandler";

export function initMqttClient(
  io: ReturnType<typeof initWebsocketServer>,
  db: ReturnType<typeof Database>,
) {
  const stateHandler = initStateHandler();
  const MQTT_HOST = process.env.MQTT_HOST;

  if (!MQTT_HOST) {
    throw "MQTT host missing!";
  }

  const client = mqtt.connect(MQTT_HOST, {
    reconnectPeriod: 3000, // Reconnect every 3 seconds if disconnected
  });

  client.on("connect", () => {
    console.log("Connected to MQTT broker");
    client.subscribe("zigbee2mqtt/#", (err) => {
      if (err) {
        console.error("Failed to subscribe to zigbee2mqtt/#", err);
      }
    });
  });

  client.on("error", (err) => {
    console.error("MQTT Client Error:", err);
  });

  client.on("reconnect", () => {
    console.log("Reconnecting to MQTT broker...");
  });

  client.on("message", (topic, message) => {
    handleMqttMessage(topic, message, db, io, stateHandler);
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    // Send the latest state for all topics (devices, sensors, etc.)
    Object.keys(stateHandler.getAllStates()).forEach((topic) => {
      socket.emit(topic, stateHandler.getDeviceState(topic));
    });
  });
}
