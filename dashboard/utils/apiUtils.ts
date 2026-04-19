import { NextRequest, NextResponse } from "next/server";

export async function proxyMqttClientRequest(request: NextRequest) {
  const hasBody = !["GET", "HEAD"].includes(request.method);
  const requestInit: RequestInit & { duplex?: "half" } = {
    method: request.method,
    headers: [["Content-Type", "application/json"]],
    body: hasBody ? request.body : undefined,
  };

  if (hasBody) {
    requestInit.duplex = "half";
  }

  const res = await fetch(
    `http://192.168.1.23:8000${request.nextUrl.pathname}${request.nextUrl.search}`,
    requestInit,
  );

  return NextResponse.json(await res.json(), { status: res.status });
}
