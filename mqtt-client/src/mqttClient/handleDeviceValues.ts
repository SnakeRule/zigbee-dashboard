import Database from "better-sqlite3";
import {
  findDeviceByFriendlyName,
  shouldSaveValueToDb,
} from "../utils/messageUtils";
import { fieldsToSave } from "../utils/sqLiteUtils";
import { initStateCache } from "./mqttCache";
import { insertValueIntoDb } from "../sqlite/sqLite";

export function handleDeviceValues(
  topic: string,
  db: ReturnType<typeof Database>,
  msg: any,
  devicesState: any,
  mqttCache: ReturnType<typeof initStateCache>,
) {
  const friendlyName = topic.substring(topic.lastIndexOf("/") + 1);
  if (topic === `zigbee2mqtt/${friendlyName}`) {
    const targetDeviceState = mqttCache.getFromMqttCache(topic);

    // Match the friendly name from the topic to the one in the devices list
    const targetDevice = findDeviceByFriendlyName(devicesState, friendlyName);

    if (targetDevice) {
      for (const field of fieldsToSave) {
        const lastInsertedValueTime = mqttCache.getLastInsertedValueTime(
          topic,
          field,
        );
        const newValue = msg[field];

        if (
          shouldSaveValueToDb(
            newValue,
            field,
            targetDeviceState,
            lastInsertedValueTime,
          )
        ) {
          insertValueIntoDb(db, targetDevice.ieee_address, field, msg[field]);
          mqttCache.updateValueLastInsertedTime(topic, field);
        }
      }
    } else {
      console.error(
        "Could not insert device value into db. No matching device found",
      );
    }
  }
}
