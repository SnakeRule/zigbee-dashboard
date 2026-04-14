import { NextRequest, NextResponse } from "next/server";

export async function proxyMqttClientRequest(request: NextRequest) {
  const res = await fetch(
    `http://192.168.1.23:8000${request.nextUrl.pathname}${request.nextUrl.search}`,
  );
  return NextResponse.json(await res.json(), { status: res.status });
}
