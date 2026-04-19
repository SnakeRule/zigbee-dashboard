"use client";

import { DeviceType } from "@/zigbee-devices/types";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useDeviceDetailsProps, useDeviceDetailsReturnValue } from "./types";

function getTargetUrl(
  sensor: DeviceType,
  target: useDeviceDetailsProps["target"],
) {
  switch (sensor) {
    case DeviceType.TEMPERATURE_SENSOR: {
      return target === "humidity"
        ? "/api/v1/zigbee/th/humidity/"
        : "/api/v1/zigbee/th/temperature/";
    }
    case DeviceType.PLANT_SOIL_SENSOR: {
      switch (target) {
        case "humidity":
          return "/api/v1/zigbee/soil/humidity/";
        case "illuminance":
          return "/api/v1/zigbee/soil/illuminance/";
        case "soil_moisture":
          return "/api/v1/zigbee/soil/moisture/";
        case "temperature":
          return "/api/v1/zigbee/soil/temperature/";
      }
    }
  }
}

const getQueryKeys = (
  ieeeAddress: string,
  currentValue: number,
  target: string,
) => ["DEVICE_DETAILS", ieeeAddress, currentValue, target];

export function useDeviceDetails({
  ieeAddress,
  currentValue,
  target,
  sensor,
}: useDeviceDetailsProps) {
  const data = useQuery<useDeviceDetailsReturnValue>({
    queryKey: [getQueryKeys(ieeAddress, currentValue, target)],
    queryFn: async () => {
      const from = DateTime.now().minus({ days: 7 }).toISO();
      const to = DateTime.now().toISO();
      const res = await fetch(
        `${getTargetUrl(sensor, target)}${ieeAddress}/${encodeURIComponent(from)}/${encodeURIComponent(to)}?count=30`,
      );
      if (!res.ok) {
        throw Error();
      }
      return res.json();
    },
  });

  return data;
}
