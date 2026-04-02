import mqtt from "mqtt";
import { initWebsocketServer } from "./websocket";

export function initMqttClient(io: ReturnType<typeof initWebsocketServer>) {
  const state: Record<string, any> = {};
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
    const payload = message.toString();

    try {
      const msg = JSON.parse(payload);

      // Update local state cache
      state[topic] = msg;

      // Forward every message to the websocket using the topic as the event name
      io.emit(topic, msg);
    } catch (err) {
      // For non-JSON, store as string
      state[topic] = payload;
      // Forward non-JSON messages as strings
      //io.emit(topic, payload);
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    // Send the latest state for all topics (devices, sensors, etc.)
    Object.keys(state).forEach((topic) => {
      socket.emit(topic, state[topic]);
    });
  });
}
