import {
  RawDevice,
  ZigbeeDevice,
  ZigbeeDeviceState,
} from "@/zigbee-devices/types";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function handleDevicesMsg(msg: RawDevice[]) {
  const newDevices: Record<string, ZigbeeDevice> = {};
  for (const device of msg) {
    newDevices[device.ieee_address] = {
      friendlyName: device.friendly_name,
      ieeeAddress: device.ieee_address,
      deviceType: device.model_id,
    };
  }
  return newDevices;
}

export default function useWebsocketClient() {
  const [connected, setConnected] = useState(false);
  const [devicesList, setDevicesList] = useState<Record<string, ZigbeeDevice>>(
    {},
  );
  const [deviceValues, setDeviceValues] = useState<
    Record<string, ZigbeeDeviceState>
  >({});

  useEffect(() => {
    const socket = io("http://192.168.1.23:3001");

    socket.on("connect", () => {
      setConnected(true);
    });
    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.onAny((event: string, msg) => {
      if (event === "zigbee2mqtt/bridge/devices") {
        setDevicesList(handleDevicesMsg(msg));
        return;
      }

      setDevicesList((prevDevices) => {
        // Get friendly name from topic
        const friendlyName = event.substring(event.lastIndexOf("/") + 1);

        // Match friendly name to the one in devices list and get its ieeeAddress
        const targetAddress = Object.values(prevDevices).find(
          (device) => friendlyName === device.friendlyName,
        )?.ieeeAddress;

        if (!targetAddress) {
          return prevDevices;
        }

        // Set the values into deviceValues with the ieeeAddress as the key
        setDeviceValues((prev) => {
          return {
            ...prev,
            [targetAddress]: {
              ...prev[targetAddress],
              ...msg,
            },
          };
        });
        return prevDevices;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Merge devicesList and deviceValues into a single dict of devices with values
  const devices = useMemo(() => {
    const merged: Record<string, ZigbeeDevice> = {};
    for (const key of Object.keys(devicesList)) {
      merged[key] = {
        ...devicesList[key],
        ...(deviceValues[key] ?? {}),
      };
    }
    return merged;
  }, [devicesList, deviceValues]);

  return {
    connected,
    devices,
  };
}
