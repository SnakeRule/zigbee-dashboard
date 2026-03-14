import {
  DeviceType,
  IkeaDoorSensorState,
  ZigbeeDevice,
  ZigbeeDeviceState,
} from "./types";

function updateDoorSensor(
  device: ZigbeeDevice,
  devicesDict: Record<string, ZigbeeDevice>,
  newState: IkeaDoorSensorState,
) {
  return {
    ...devicesDict,
    [device.friendlyName]: {
      ...device,
      battery: newState.battery ?? device.battery,
      contact: newState.contact ?? device.contact,
    },
  };
}

export function handleDeviceUpdate(
  device: ZigbeeDevice,
  devicesDict: Record<string, ZigbeeDevice>,
  newState: ZigbeeDeviceState,
) {
  switch (device.deviceType) {
    case DeviceType.DOOR_SENSOR:
      return updateDoorSensor(device, devicesDict, newState);
  }
}
