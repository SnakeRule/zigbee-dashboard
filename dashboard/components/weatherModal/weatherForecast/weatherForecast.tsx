import styles from "./weatherForecast.module.css";
import Image from "next/image";
import { Text } from "@/components/text/text";
import { DateTime } from "luxon";
import { Droplet, Thermometer, Wind } from "lucide-react";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";

export function WeatherForecast() {
  const { weatherForecast } = useWeatherForecast();

  return weatherForecast.data ? (
    <div className={styles["forecast-container"]}>
      {weatherForecast.data.list.map((item) => (
        <div className={styles["forecast-item"]} key={item.dt}>
          <Text tag="p" variant="text-regular">
            {DateTime.fromSeconds(item.dt)
              .setLocale("fi")
              .toFormat("ccc HH.mm")}
          </Text>
          <Image
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
            alt="Weather icon"
            width={100}
            height={100}
          />
          <div className={styles["forecast-text-icon-container"]}>
            <Thermometer />
            <Text tag="p" variant="text-regular">
              {`${item.main.temp.toFixed(0)} °C`}
            </Text>
          </div>
          <div className={styles["forecast-text-icon-container"]}>
            <Droplet />
            <Text tag="p" variant="text-regular">
              {`${item.main.humidity.toFixed(0)} %`}
            </Text>
          </div>
          <div className={styles["forecast-text-icon-container"]}>
            <Wind />
            <Text tag="p" variant="text-regular">
              {`${item.wind.speed.toFixed(0)} m/s`}
            </Text>
          </div>
        </div>
      ))}
    </div>
  ) : null;
}
