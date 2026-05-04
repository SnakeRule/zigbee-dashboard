import { useQuery } from "@tanstack/react-query";

export type WeatherData = {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
    gust: number;
    deg: number;
  };
  weather: {
    icon: string;
  }[];
};

export function useWeatherNow() {
  const weatherNow = useQuery<WeatherData>({
    queryKey: ["WEATHER-NOW"],
    queryFn: () =>
      fetch("/api/weather/now").then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch current weather");
        }
        return res.json();
      }),
    staleTime: 60 * 1000 * 10,
  });

  return { weatherNow };
}
