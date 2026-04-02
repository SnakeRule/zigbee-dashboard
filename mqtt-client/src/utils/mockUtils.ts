import { randomInt, randomUUID } from "crypto";
import { DeviceType, ZigbeeDevice } from "../types/mockDevices";
import { initWebsocketServer } from "../websocket";

export function generateDevice(deviceType: DeviceType): ZigbeeDevice {
  return {
    ieee_address: randomUUID(),
    friendly_name: randomUUID(),
    model_id: deviceType,
  };
}

export function generateRandomValues(
  devices: ZigbeeDevice[],
  io: ReturnType<typeof initWebsocketServer>,
) {
  for (const device of devices) {
    switch (device.model_id) {
      case DeviceType.DOOR_SENSOR: {
        device.battery = randomInt(100);
        device.contact = Boolean(randomInt(0, 2));
        break;
      }
      case DeviceType.TEMPERATURE_SENSOR: {
        device.battery = randomInt(100);
        device.humidity = randomInt(100);
        device.temperature = randomInt(100);
        break;
      }
      case DeviceType.PLANT_SOIL_SENSOR: {
        device.battery_state = "high";
        device.humidity = randomInt(100);
        device.illuminance = randomInt(1000);
        device.soil_moisture = randomInt(100);
        device.temperature = randomInt(100);
        break;
      }
    }
  }
  return devices;
}
