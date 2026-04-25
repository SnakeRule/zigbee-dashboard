"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Text } from "../../text/text";

const TIME_FORMAT = "HH:mm:ss";

export function Clock() {
  const [time, setTime] = useState(dayjs().format(TIME_FORMAT));

  useEffect(() => {
    const interval = setInterval(
      () => setTime(dayjs().format(TIME_FORMAT)),
      1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Text tag="p" variant="text-xl">
      {time}
    </Text>
  );
}
