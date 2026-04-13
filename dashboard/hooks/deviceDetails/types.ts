import { PlantSoilSensorState } from "@/zigbee-devices/plantSoilSensor";
import { DeviceType } from "@/zigbee-devices/types";

export type useDeviceDetailsReturnValue = {
  created_at: string;
  value: number;
}[];

type useDeviceDetailsPropsBase = {
  ieeAddress: string;
  currentValue: number;
};

type useThHumidityDetailsProps = useDeviceDetailsPropsBase & {
  sensor: DeviceType.TEMPERATURE_SENSOR;
  target: "humidity";
};

type useThTemperatureDetailsProps = useDeviceDetailsPropsBase & {
  sensor: DeviceType.TEMPERATURE_SENSOR;
  target: "temperature";
};

type useSoilTemperatureDetailsProps = useDeviceDetailsPropsBase & {
  sensor: DeviceType.PLANT_SOIL_SENSOR;
  target: "temperature";
};

type useSoilHumidityDetailsProps = useDeviceDetailsPropsBase & {
  sensor: DeviceType.PLANT_SOIL_SENSOR;
  target: "humidity";
};

type useSoilMoistureDetailsProps = useDeviceDetailsPropsBase & {
  sensor: DeviceType.PLANT_SOIL_SENSOR;
  target: "soil_moisture";
};

type useSoilIlluminanceDetailsProps = useDeviceDetailsPropsBase & {
  sensor: DeviceType.PLANT_SOIL_SENSOR;
  target: "illuminance";
};

export type useDeviceDetailsProps =
  | useThHumidityDetailsProps
  | useThTemperatureDetailsProps
  | useSoilHumidityDetailsProps
  | useSoilIlluminanceDetailsProps
  | useSoilMoistureDetailsProps
  | useSoilTemperatureDetailsProps;
