"use client";

import useWebsocketClient from "@/hooks/useWebsocketClient";

export default function Home() {
  useWebsocketClient();

  return (
    <div>
      <p>SUP</p>
    </div>
  );
}
