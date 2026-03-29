import { handleDeviceUpdate } from "@/zigbee-devices/deviceHandler";
import { RawDevice, ZigbeeDevice } from "@/zigbee-devices/types";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function handleDevicesMsg(
  msg: RawDevice[],
  prev: Record<string, ZigbeeDevice>,
) {
  const newDevices: Record<string, ZigbeeDevice> = {};
  for (const device of msg) {
    const parsedDevice = {
      ...prev[device.friendly_name],
      friendlyName: device.friendly_name,
      ieeeAddress: device.ieee_address,
      deviceType: device.model_id,
    };

    if (parsedDevice) {
      newDevices[parsedDevice.friendlyName] = parsedDevice;
    }
  }
  return newDevices;
}

export default function useWebsocketClient() {
  const [connected, setConnected] = useState(false);
  const [devices, setDevices] = useState<Record<string, ZigbeeDevice>>({});

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
        setDevices((prev) => handleDevicesMsg(msg, prev));
        return;
      }
      setDevices((prev) => {
        const matchingDevice =
          prev[event.substring(event.lastIndexOf("/") + 1)];

        if (!matchingDevice) {
          return prev;
        }

        return {
          ...prev,
          [matchingDevice.friendlyName]: {
            ...matchingDevice,
            ...handleDeviceUpdate(msg),
          },
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    connected,
    devices,
  };
}
