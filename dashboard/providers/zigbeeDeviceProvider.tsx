import useWebsocketClient from "@/hooks/useWebsocketClient";
import { ZigbeeDevice } from "@/zigbee-devices/types";
import { createContext, ReactNode } from "react";

type ZigbeeDeviceContextState = {
  connected: boolean;
  devices: Record<string, ZigbeeDevice>;
};

type ZigbeeDeviceProviderProps = {
  children: ReactNode;
};

const defaultState: ZigbeeDeviceContextState = {
  connected: false,
  devices: {},
};

export const ZigbeeDeviceContext = createContext(defaultState);

export default function ZigbeeDeviceProvider({
  children,
}: ZigbeeDeviceProviderProps) {
  const { connected, devices } = useWebsocketClient();

  return (
    <ZigbeeDeviceContext value={{ connected, devices }}>
      {children}
    </ZigbeeDeviceContext>
  );
}
