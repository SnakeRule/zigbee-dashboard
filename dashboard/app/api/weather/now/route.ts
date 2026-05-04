import { getWeatherQuery } from "@/utils/weatherUtils";
import { NextResponse } from "next/server";

export async function GET() {
  const query = getWeatherQuery(
    new URL("https://api.openweathermap.org/data/2.5/weather"),
  );
  if (!query) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  const res = await (await fetch(query)).json();
  return Response.json(res);
}
