import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    console.error("No weather api defined in env!");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  const query = new URL("https://api.openweathermap.org/data/2.5/weather");
  query.searchParams.append("lat", "61.4509709");
  query.searchParams.append("lon", "24.1066509");
  query.searchParams.append("appid", apiKey);
  query.searchParams.append("units", "metric");
  const res = await (await fetch(query)).json();

  return Response.json(res);
}
