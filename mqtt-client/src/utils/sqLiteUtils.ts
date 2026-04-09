import { DateTime } from "luxon";
import Downsample from "downsample";

export const fieldsToSave = [
  "temperature",
  "humidity",
  "illuminance",
  "soil_moisture",
  "contact",
];

export const sqLiteTimeFormat = "yyyy-MM-dd HH:mm:ss";

export function getSqLiteTimeFormat(dateTime: DateTime) {
  return dateTime.toFormat(sqLiteTimeFormat);
}

export function downsampleData(
  values: {
    value: number;
    created_at: string;
  }[],
) {
  return Array.from(
    Downsample.LTTB(
      values.map((value) => ({
        x: DateTime.fromFormat(value.created_at, sqLiteTimeFormat)
          .toUTC()
          .toJSDate(),
        y: value.value,
      })),
      30,
    ) as ArrayLike<{ x: Date; y: number }>,
  );
}

export function downsampledToResponse(
  downsampled: {
    x: Date;
    y: number;
  }[],
) {
  return downsampled.map((value) => ({
    created_at: DateTime.fromJSDate(value.x).toFormat(sqLiteTimeFormat),
    value: value.y,
  }));
}
