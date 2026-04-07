import Database from "better-sqlite3";
import { ZigbeeDevice, DeviceType } from "./types/mockDevices";
import { generateDevice, generateRandomValues } from "./utils/mockUtils";
import { initWebsocketServer } from "./websocket";
import { fieldsToSave } from "./utils/sqLiteUtils";
import { insertValueIntoDb } from "./sqlite/sqLite";

export function initMockMqttClient(
  io: ReturnType<typeof initWebsocketServer>,
  db: ReturnType<typeof Database>,
) {
  const state: Record<string, any> = {};
  let devices: ZigbeeDevice[] = [];
  const devicesTopic = "zigbee2mqtt/bridge/devices";

  devices.push(generateDevice(DeviceType.DOOR_SENSOR));
  devices.push(generateDevice(DeviceType.PLANT_SOIL_SENSOR));
  devices.push(generateDevice(DeviceType.TEMPERATURE_SENSOR));

  devices = generateRandomValues(devices, io);
  for (const device of devices) {
    const topic = `zigbee2mqtt/${device.friendly_name}`;
    state[topic] = device;
  }

  setInterval(() => {
    devices = generateRandomValues(devices, io);
    for (const device of devices) {
      const topic = `zigbee2mqtt/${device.friendly_name}`;
      state[topic] = device;
      for (const field of fieldsToSave) {
        if (state[topic][field] !== undefined) {
          insertValueIntoDb(
            db,
            state[topic].ieee_address,
            field,
            state[topic][field],
          );
        }
      }
      io.emit(topic, device);
    }
  }, 10000);

  state[devicesTopic] = devices;

  io.on("connection", (socket) => {
    console.log("Client connected");
    socket.emit(devicesTopic, state[devicesTopic]);
    // Send the latest state for all topics (devices, sensors, etc.)
    Object.keys(state).forEach((topic) => {
      socket.emit(topic, state[topic]);
    });
  });
}
