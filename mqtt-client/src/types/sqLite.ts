export enum SENSOR_PARAMETER {
  TEMPERATURE = "temperature",
}

export type SensorReturnValues = {
  created_at: string;
  value: number;
}[];
