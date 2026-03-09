import mqtt from "mqtt";
import { initWebsocketServer } from "./websocket";

const client = mqtt.connect("mqtt://192.168.1.23");
const server = initWebsocketServer();
let devices = {};

client.on("connect", () => {
  client.subscribe("zigbee2mqtt/bridge/devices", (err) => {
    if (!err) {
      console.log(client.connected);
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  //console.log(message.toString());
  const msg = JSON.parse(message.toString());
  console.log(msg);
  devices = msg;
  //client.end();
});

server.on("connection", () => {
  server.emit("devices", devices);
});
