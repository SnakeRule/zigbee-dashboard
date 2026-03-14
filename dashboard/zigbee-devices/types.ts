export type RawDevice = {
  friendly_name: string;
  ieee_address: string;
  model_id: string;
};

export enum DeviceType {
  DOOR_SENSOR = "PARASOLL Door/Window Sensor",
}

export type ZigbeeDeviceBase = {
  ieeeAddress: string;
  friendlyName: string;
};

export type IkeaDoorSensor = ZigbeeDeviceBase &
  IkeaDoorSensorState & {
    deviceType: DeviceType.DOOR_SENSOR;
  };

export type IkeaDoorSensorState = {
  contact?: boolean;
  battery?: number;
};

export type ZigbeeDevice = IkeaDoorSensor; // Will add more devices here
export type ZigbeeDeviceState = IkeaDoorSensorState;
