import Database from "better-sqlite3";

export function temperatureQuery(
  db: ReturnType<typeof Database>,
  ieeeAddress: string,
  from: string,
  to: string,
) {
  return db
    .prepare(
      `
        SELECT value, created_at from sensor_values
            INNER JOIN parameters ON sensor_values.parameter_id = parameters.id 
            INNER JOIN sensors ON sensor_values.sensor_id = sensors.id 
            WHERE 
                parameters.name = 'temperature' 
                AND sensors.name = ? 
                AND sensor_values.created_at >= ?
                AND sensor_values.created_at <= ?
            ORDER BY created_at ASC`,
    )
    .all(ieeeAddress, from, to) as {
    value: number;
    created_at: string;
  }[];
}
