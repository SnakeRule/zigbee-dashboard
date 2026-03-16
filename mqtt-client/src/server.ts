import mqtt from "mqtt";
import { initWebsocketServer } from "./websocket";

const client = mqtt.connect("mqtt://mosquitto");
const io = initWebsocketServer();

// Store the latest message for every topic (including devices list)
const state: Record<string, any> = {};

client.on("connect", () => {
  client.subscribe("zigbee2mqtt/#", (err) => {
    if (!err) {
      console.log("Connected to MQTT broker");
    }
  });
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
  client.publish("zigbee2mqtt/bridge/devices", "");

  // Send the latest state for all topics (devices, sensors, etc.)
  Object.keys(state).forEach((topic) => {
    socket.emit(topic, state[topic]);
  });
});
