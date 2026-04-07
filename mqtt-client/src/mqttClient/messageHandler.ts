import Database from "better-sqlite3";
import { initWebsocketServer } from "../websocket";
import { initStateCache } from "./mqttCache";
import { handleDeviceValues } from "./handleDeviceValues";

export function handleMqttMessage(
  topic: string,
  message: Buffer<ArrayBufferLike>,
  db: ReturnType<typeof Database>,
  io: ReturnType<typeof initWebsocketServer>,
  mqttCache: ReturnType<typeof initStateCache>,
) {
  const devicesState = mqttCache.getFromMqttCache("zigbee2mqtt/bridge/devices");
  const payload = message.toString();

  try {
    // Don't handle device value messages until we have the devices stored
    if (!devicesState && topic !== "zigbee2mqtt/bridge/devices") {
      return;
    }
    const msg = JSON.parse(payload);

    // If devices list is saved in local state, attempt to store value in database
    if (devicesState && topic !== "zigbee2mqtt/bridge/devices") {
      handleDeviceValues(topic, db, msg, devicesState, mqttCache);
    }

    // Update local state cache
    mqttCache.updateMqttCache(topic, msg);

    // Forward every message to the websocket using the topic as the event name
    io.emit(topic, msg);
  } catch (err) {
    console.error("FAILED TO HANDLE MESSAGE: ", err);
  }
}
