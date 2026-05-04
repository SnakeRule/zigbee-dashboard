export function getWeatherQuery(query: URL) {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    console.error("No weather api defined in env!");
    return;
  }

  query.searchParams.append("lat", "61.4509709");
  query.searchParams.append("lon", "24.1066509");
  query.searchParams.append("appid", apiKey);
  query.searchParams.append("units", "metric");

  return query;
}
