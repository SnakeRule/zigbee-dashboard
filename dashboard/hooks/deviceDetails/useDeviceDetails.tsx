"use client";

import { DeviceType } from "@/zigbee-devices/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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

export function useDeviceDetails({
  ieeeAddress,
  currentValue,
  target,
  sensor,
  timeFrom,
}: useDeviceDetailsProps) {
  const data = useQuery<useDeviceDetailsReturnValue>({
    queryKey: [ieeeAddress, currentValue, target, timeFrom],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const to = DateTime.now().toISO();
      const res = await fetch(
        `${getTargetUrl(sensor, target)}${ieeeAddress}/${encodeURIComponent(timeFrom)}/${encodeURIComponent(to)}?count=30`,
      );
      if (!res.ok) {
        throw Error();
      }
      return res.json();
    },
  });

  return data;
}
