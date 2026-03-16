"use client";

import { useWeather } from "@/hooks/useWeather";
import Image from "next/image";
import styles from "./weather.module.css";

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
        <h3>{(weather.data.main.temp as number).toFixed(0)}°C</h3>
      </div>
    )
  );
}
