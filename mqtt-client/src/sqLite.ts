import Database from "better-sqlite3";

export function initSqLite() {
  try {
    const db = new Database("./sqlite/database.db");
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    db.exec(`
    CREATE TABLE IF NOT EXISTS sensors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS parameters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS sensor_values (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sensor_id INTEGER NOT NULL,
      parameter_id INTEGER NOT NULL,
      value NUMERIC NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (sensor_id) REFERENCES sensors(id),
      FOREIGN KEY (parameter_id) REFERENCES parameters(id)
    );
  `);

    db.exec(`
    CREATE INDEX IF NOT EXISTS idx_sensor_values_sensor_parameter_created_at
    ON sensor_values(sensor_id, parameter_id, created_at);
  `);
    return db;
  } catch (e) {
    console.error(e);
    return;
  }
}

export function insertValueIntoDb(
  db: ReturnType<typeof Database>,
  sensor: string,
  parameter: string,
  value: string | number | boolean,
) {
  try {
    const normalizedValue = typeof value === "boolean" ? Number(value) : value;
    db.prepare(
      "INSERT INTO sensors(name) VALUES (?) ON CONFLICT(name) DO NOTHING",
    ).run(sensor);
    db.prepare(
      "INSERT INTO parameters(name) VALUES (?) ON CONFLICT(name) DO NOTHING",
    ).run(parameter);

    const sensorRow = db
      .prepare("SELECT id FROM sensors WHERE name = ?")
      .get(sensor) as {
      id: number;
    };
    const parameterRow = db
      .prepare("SELECT id FROM parameters WHERE name = ?")
      .get(parameter) as { id: number };

    db.prepare(
      `
    INSERT INTO sensor_values (sensor_id, parameter_id, value)
    VALUES (?, ?, ?)
  `,
    ).run(sensorRow.id, parameterRow.id, normalizedValue);
  } catch (e) {
    console.error(e);
  }
}
