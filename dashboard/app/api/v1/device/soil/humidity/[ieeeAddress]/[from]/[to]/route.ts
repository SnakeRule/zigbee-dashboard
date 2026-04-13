import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ ieeeAddress: string; from: string; to: string }> },
) {
  const dataPointCount = request.nextUrl.searchParams.get("count");
  const { from, ieeeAddress, to } = await params;
  const res = await fetch(
    `http://192.168.1.23:8000/api/v1/device/soil/humidity/${ieeeAddress}/${encodeURIComponent(from)}/${encodeURIComponent(to)}${dataPointCount ? `?count=${dataPointCount}` : ""}`,
  );
  return NextResponse.json(await res.json(), { status: res.status });
}
