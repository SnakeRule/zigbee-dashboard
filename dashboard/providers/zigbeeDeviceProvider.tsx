import useWebsocketClient from "@/hooks/useWebsocketClient";
import { ZigbeeDevice } from "@/zigbee-devices/types";
import { createContext, ReactNode, useCallback, useState } from "react";

type ZigbeeDeviceContextState = {
  connected: boolean;
  devices: Record<string, ZigbeeDevice>;
  joiningPermitted: number;
  resetJoiningPermitted: () => void;
};

type ZigbeeDeviceProviderProps = {
  children: ReactNode;
};

const defaultState: ZigbeeDeviceContextState = {
  connected: false,
  devices: {},
  joiningPermitted: 0,
  resetJoiningPermitted: () => {},
};

export const ZigbeeDeviceContext = createContext(defaultState);

export default function ZigbeeDeviceProvider({
  children,
}: ZigbeeDeviceProviderProps) {
  const [joiningPermitted, setJoiningPermitted] = useState(0);

  function onPermitJoin(time: number) {
    setJoiningPermitted(time);
  }

  const resetJoiningPermitted = useCallback(() => {
    setJoiningPermitted(0);
  }, []);

  const { connected, devices } = useWebsocketClient({ onPermitJoin });

  return (
    <ZigbeeDeviceContext
      value={{ connected, devices, joiningPermitted, resetJoiningPermitted }}
    >
      {children}
    </ZigbeeDeviceContext>
  );
}
