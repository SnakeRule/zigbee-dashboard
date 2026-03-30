import { DeviceType, ZigbeeDevice } from "./types";

export function filterDevices<T extends DeviceType>(
  devices: Record<string, ZigbeeDevice>,
  deviceType: T,
): Extract<ZigbeeDevice, { deviceType: T }>[] {
  return Object.values(devices).filter(
    (device): device is Extract<ZigbeeDevice, { deviceType: T }> => {
      return device.deviceType === deviceType;
    },
  );
}
