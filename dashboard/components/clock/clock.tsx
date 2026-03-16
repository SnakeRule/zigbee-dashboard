"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

const TIME_FORMAT = "HH:mm:ss";

export function Clock() {
  const [time, setTime] = useState(dayjs().format(TIME_FORMAT));

  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs().format(TIME_FORMAT)));

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <h2>{time}</h2>;
}
