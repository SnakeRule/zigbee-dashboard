import { ZigbeeDevice, DeviceType } from "./types/mockDevices";
import { generateDevice, generateRandomValues } from "./utils/mockUtils";
import { initWebsocketServer } from "./websocket";

export function initMockMqttClient(io: ReturnType<typeof initWebsocketServer>) {
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
      io.emit(topic, device);
    }
  }, 10000);

  state[devicesTopic] = devices;

  io.on("connection", (socket) => {
    console.log("Client connected");
    socket.emit(devicesTopic, state[devicesTopic]);
    // Send the latest state for all topics (devices, sensors, etc.)
    Object.keys(state).forEach((topic) => {
      console.log(state[topic]);
      socket.emit(topic, state[topic]);
    });
  });
}
