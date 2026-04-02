"use client";

import { useWeather } from "@/hooks/useWeather";
import Image from "next/image";
import styles from "./weather.module.css";
import { Text } from "../text/text";

export function Weather() {
  const weather = useWeather();
  console.log(weather.data);

  return (
    weather.data !== undefined && (
      <div className={styles["weather-container"]}>
        <Image
          src={`https://openweathermap.org/payload/api/media/file/${weather.data.weather[0].icon}.png/`}
          alt="Weather icon"
          width={80}
          height={80}
        />
        <Text tag="p" variant="text-xl">
          {(weather.data.main.temp as number).toFixed(0)}°C
        </Text>
      </div>
    )
  );
}
