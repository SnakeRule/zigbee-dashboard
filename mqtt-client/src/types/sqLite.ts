export enum SENSOR_PARAMETER {
  TEMPERATURE = "temperature",
  HUMIDITY = "humidity",
  SOIL_MOISTURE = "soil_moisture",
  ILLUMINANCE = "illuminance",
}

export type SensorReturnValues = {
  created_at: string;
  value: number;
}[];
