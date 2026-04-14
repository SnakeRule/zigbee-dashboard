import { proxyMqttClientRequest } from "@/utils/apiUtils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return proxyMqttClientRequest(request);
}
