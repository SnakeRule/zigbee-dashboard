import { DateTime } from "luxon";

export const fieldsToSave = [
  "temperature",
  "humidity",
  "illuminance",
  "soil_moisture",
  "contact",
];

export function getSqLiteTimeFormat(dateTime: DateTime) {
  return dateTime.toFormat("yyyy-MM-dd HH:mm:ss");
}
