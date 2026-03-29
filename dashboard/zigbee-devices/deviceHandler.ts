import { IkeaDoorSensorState } from "./ikeaDoorSensor";
import { TemperatureHumiditySensorState } from "./temperatureHumiditySensor";
import { DeviceType, ZigbeeDevice } from "./types";

/**
 * We can get state updates that don't contain all the properties
 * To prevent overwriting existing values with undefined, we remove undefined values from the returning object
 * */
function filterUndefinedValues(object: object) {
  return Object.fromEntries(
    Object.entries(object).filter((arr) => arr[1] !== undefined),
  );
}

function updateDoorSensor(newState: IkeaDoorSensorState) {
  return filterUndefinedValues({
    battery: newState.battery,
    contact: newState.contact,
  });
}

function updateTemperatureSensor(newState: TemperatureHumiditySensorState) {
  return filterUndefinedValues({
    battery: newState.battery,
    humidity: newState.humidity,
    temperature: newState.temperature,
  });
}

export function handleDeviceUpdate(newState: ZigbeeDevice) {
  //updateSensor(device, devicesDict)
  switch (newState.deviceType) {
    case DeviceType.DOOR_SENSOR:
      return updateDoorSensor(newState);
    case DeviceType.TEMPERATURE_SENSOR:
      return updateTemperatureSensor(newState);
    default:
      return newState;
  }
}
