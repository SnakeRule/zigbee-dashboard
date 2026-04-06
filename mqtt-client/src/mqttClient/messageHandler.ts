import Database from "better-sqlite3";
import { fieldsToSave } from "../utils/sqLiteUtils";
import { insertValueIntoDb } from "../sqLite";
import { initWebsocketServer } from "../websocket";

export function handleMqttMessage(
  topic: string,
  message: Buffer<ArrayBufferLike>,
  state: Record<string, any>,
  db: ReturnType<typeof Database>,
  io: ReturnType<typeof initWebsocketServer>,
) {
  const payload = message.toString();

  try {
    const msg = JSON.parse(payload);

    // If devices list is saved in local state, attempt to store value in database
    if (
      state["zigbee2mqtt/bridge/devices"] &&
      topic !== "zigbee2mqtt/bridge/devices"
    ) {
      // Get the friendly name of the device from the topic
      const friendlyName = topic.substring(topic.lastIndexOf("/") + 1);

      // Match the friendly name from the topic to the one in the devices list
      const targetDevice = (
        state["zigbee2mqtt/bridge/devices"] as [
          { friendly_name: string; ieee_address: string },
        ]
      ).find(
        (device: { friendly_name: string }) =>
          device.friendly_name === friendlyName,
      );
      if (targetDevice) {
        for (const field of fieldsToSave) {
          if (msg[field] !== undefined) {
            insertValueIntoDb(db, targetDevice.ieee_address, field, msg[field]);
          }
        }
      } else {
        console.error(
          "Could not insert device value into db. No matching device found",
        );
      }
    }

    // Update local state cache
    state[topic] = msg;

    // Forward every message to the websocket using the topic as the event name
    io.emit(topic, msg);
  } catch (err) {
    state[topic] = payload;
  }
}
