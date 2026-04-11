import Database from "better-sqlite3";
import { SENSOR_PARAMETER, SensorReturnValues } from "../../types/sqLite";
import { downsampleData, downsampledToResponse } from "../../utils/sqLiteUtils";

export function sensorValueQuery(
  db: ReturnType<typeof Database>,
  parameter: SENSOR_PARAMETER,
  ieeeAddress: string,
  from: string,
  to: string,
  dataPointCount: number = 30,
) {
  const values = db
    .prepare(
      `
        SELECT value, created_at from sensor_values
            INNER JOIN parameters ON sensor_values.parameter_id = parameters.id 
            INNER JOIN sensors ON sensor_values.sensor_id = sensors.id 
            WHERE 
                parameters.name = '?' 
                AND sensors.name = ? 
                AND sensor_values.created_at >= ?
                AND sensor_values.created_at <= ?
            ORDER BY created_at ASC`,
    )
    .all(parameter, ieeeAddress, from, to) as SensorReturnValues;
  const downsampled = downsampleData(values, dataPointCount);
  return downsampledToResponse(downsampled);
}
