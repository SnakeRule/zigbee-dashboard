import { proxyMqttClientRequest } from "@/utils/apiUtils";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  return proxyMqttClientRequest(request);
}
