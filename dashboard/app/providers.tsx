// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import ZigbeeDeviceProvider from "../providers/zigbeeDeviceProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ZigbeeDeviceProvider>{children}</ZigbeeDeviceProvider>
    </QueryClientProvider>
  );
}
