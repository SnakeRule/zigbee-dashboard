import Database from "better-sqlite3";
import { fieldsToSave } from "../utils/sqLiteUtils";
import { insertValueIntoDb } from "../sqLite";
import { initWebsocketServer } from "../websocket";
import type { initStateHandler } from "../mqttClient/stateHandler";

export function handleMqttMessage(
  topic: string,
  message: Buffer<ArrayBufferLike>,
  db: ReturnType<typeof Database>,
  io: ReturnType<typeof initWebsocketServer>,
  stateHandler: ReturnType<typeof initStateHandler>,
) {
  const devicesState = stateHandler.getDeviceState(
    "zigbee2mqtt/bridge/devices",
  );
  const targetDeviceState = stateHandler.getDeviceState(topic);
  const payload = message.toString();

  try {
    // Don't handle device value messages until we have the devices stored
    if (!devicesState && topic !== "zigbee2mqtt/bridge/devices") {
      return;
    }
    const msg = JSON.parse(payload);

    // If devices list is saved in local state, attempt to store value in database
    if (devicesState && topic !== "zigbee2mqtt/bridge/devices") {
      // Get the friendly name of the device from the topic
      const friendlyName = topic.substring(topic.lastIndexOf("/") + 1);

      if (topic === `zigbee2mqtt/${friendlyName}`) {
        // Match the friendly name from the topic to the one in the devices list
        const targetDevice = (
          devicesState as {
            friendly_name: string;
            ieee_address: string;
          }[]
        ).find(
          (device: { friendly_name: string }) =>
            device.friendly_name === friendlyName,
        );
        if (targetDevice) {
          for (const field of fieldsToSave) {
            const lastInsertedState = stateHandler.getLastInsertedValue(
              topic,
              field,
            );
            if (
              msg[field] !== undefined &&
              // Only save if the value has changed or if it's been an hour since the last inserted value
              (msg[field] !== targetDeviceState?.[field] ||
                lastInsertedState < Date.now() - 60 * 60 * 1000)
            ) {
              insertValueIntoDb(
                db,
                targetDevice.ieee_address,
                field,
                msg[field],
              );
              stateHandler.updateValueLastInserted(topic, field);
            }
          }
        } else {
          console.error(
            "Could not insert device value into db. No matching device found",
          );
        }
      }
    }

    // Update local state cache
    stateHandler.updateDeviceState(topic, msg);

    // Forward every message to the websocket using the topic as the event name
    io.emit(topic, msg);
  } catch (err) {
    console.error("FAILED TO HANDLE MESSAGE: ", err);
  }
}
