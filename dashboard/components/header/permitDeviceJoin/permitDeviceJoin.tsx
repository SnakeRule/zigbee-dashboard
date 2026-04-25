"use client";

import { Button } from "@/components/button/button";
import { Text } from "@/components/text/text";
import { ZigbeeDeviceContext } from "@/providers/zigbeeDeviceProvider";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./permitDeviceJoin.module.css";
import { RadioIcon, RadioOff } from "lucide-react";

const deviceJoinTime = 240;

function timeFormatted(timeRemaining: number) {
  return (
    parseInt((timeRemaining / 60).toString()) +
    ":" +
    (timeRemaining % 60 < 10 ? "0" : "") +
    (timeRemaining % 60).toString()
  );
}

export function PermitDeviceJoin() {
  const { joiningPermitted, resetJoiningPermitted } =
    useContext(ZigbeeDeviceContext);
  const [timeRemaining, setTimeRemaining] = useState(joiningPermitted);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeRemaining <= 0) {
      resetJoiningPermitted();
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeRemaining, resetJoiningPermitted]);

  useEffect(() => {
    setTimeRemaining(joiningPermitted);
  }, [joiningPermitted]);

  function onClick() {
    fetch(
      `/api/v1/zigbee/device/permit-join?time=${timeRemaining <= 0 ? deviceJoinTime : 0}`,
      { method: "GET" },
    );
  }

  function joiningActive() {
    return (
      <>
        <RadioIcon />
        <Text
          variant="text-regular"
          tag="p"
        >{`Estä liittyminen ${timeFormatted(timeRemaining)}`}</Text>
      </>
    );
  }
  function joiningDisabled() {
    return (
      <>
        <RadioOff />
        <Text variant="text-regular" tag="p">{`Salli liittyminen`}</Text>
      </>
    );
  }

  return (
    <Button onClick={onClick}>
      <div className={styles["device-join-content"]}>
        {timeRemaining > 0 ? joiningActive() : joiningDisabled()}
      </div>
    </Button>
  );
}
