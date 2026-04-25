import {
  RawDevice,
  ZigbeeDevice,
  ZigbeeDeviceState,
} from "@/zigbee-devices/types";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

type useWebsocketClientProps = {
  onPermitJoin: (time: number) => void;
};

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

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

export default function useWebsocketClient({
  onPermitJoin,
}: useWebsocketClientProps) {
  const [connected, setConnected] = useState(false);
  const [devicesList, setDevicesList] = useState<Record<string, ZigbeeDevice>>(
    {},
  );
  const [deviceValues, setDeviceValues] = useState<
    Record<string, ZigbeeDeviceState>
  >({});

  useEffect(() => {
    if (WEBSOCKET_URL === undefined) {
      console.error("No WEBSOCKET_URL defined!");
      return;
    }
    const socket = io(WEBSOCKET_URL);

    socket.on("connect", () => {
      setConnected(true);
    });
    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.onAny((event: string, msg) => {
      if (event === "zigbee2mqtt/bridge/response/permit_join") {
        console.log(msg);
        onPermitJoin(msg.data.time);
      }

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
