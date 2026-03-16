import { useQuery } from "@tanstack/react-query";

export function useWeather() {
  const weather = useQuery({
    queryKey: ["WEATHER"],
    queryFn: () =>
      fetch("api/weather").then((res) => {
        if (!res.ok) {
          throw Error;
        }
        return res.json();
      }),
    staleTime: 60 * 1000 * 1,
  });

  return weather;
}
