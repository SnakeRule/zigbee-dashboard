"use client";

import { useWeatherNow } from "@/hooks/useWeatherNow";
import Image from "next/image";
import styles from "./weather.module.css";
import { Text } from "../../text/text";
import { Button } from "@/components/button/button";
import { useState } from "react";
import { WeatherModal } from "@/components/weatherModal/weatherModal";

export function Weather() {
  const { weatherNow } = useWeatherNow();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    weatherNow.data !== undefined && (
      <div>
        <Button
          className={styles["weather-button"]}
          onClick={() => setIsModalVisible(true)}
        >
          <Image
            src={`https://openweathermap.org/img/wn/${weatherNow.data.weather[0].icon}@4x.png`}
            alt="Weather icon"
            width={60}
            height={60}
          />
          <Text tag="p" variant="text-xl">
            {weatherNow.data.main.temp.toFixed(0)}°C
          </Text>
        </Button>
        <WeatherModal
          modalVisible={isModalVisible}
          hideModal={() => setIsModalVisible(false)}
        />
      </div>
    )
  );
}
