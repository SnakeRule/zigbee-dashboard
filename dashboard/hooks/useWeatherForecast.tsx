import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "./useWeatherNow";

type WeatherForecastData = {
  list: WeatherData[];
};

export function useWeatherForecast() {
  const weatherForecast = useQuery<WeatherForecastData>({
    queryKey: ["WEATHER-FORECAST"],
    queryFn: () =>
      fetch("/api/weather/forecast").then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch weather forecast");
        }
        return res.json();
      }),
    staleTime: 60 * 1000 * 10,
  });

  return { weatherForecast };
}
