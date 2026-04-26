import { Button } from "@/components/button/button";
import { Text } from "@/components/text/text";
import { DateTime } from "luxon";
import styles from "./timePicker.module.css";
import { useState } from "react";

type TimePickerProps = {
  setTimeFrom: (timeFrom: string) => void;
};

enum TimeFrame {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export function TimePicker({ setTimeFrom }: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState<TimeFrame>(TimeFrame.WEEK);

  function onSelect(timeFrom: string, selectedTime: TimeFrame) {
    setTimeFrom(timeFrom);
    setSelectedTime(selectedTime);
  }

  return (
    <div className={styles["time-picker-container"]}>
      <Button
        className={selectedTime === TimeFrame.DAY ? styles.selected : ""}
        onClick={() =>
          onSelect(DateTime.now().minus({ hours: 24 }).toISO(), TimeFrame.DAY)
        }
      >
        <Text variant="text-regular-small" tag="span">
          24h
        </Text>
      </Button>
      <Button
        className={selectedTime === TimeFrame.WEEK ? styles.selected : ""}
        onClick={() =>
          onSelect(DateTime.now().minus({ days: 7 }).toISO(), TimeFrame.WEEK)
        }
      >
        <Text variant="text-regular-small" tag="span">
          1vk
        </Text>
      </Button>
      <Button
        className={selectedTime === TimeFrame.MONTH ? styles.selected : ""}
        onClick={() =>
          onSelect(DateTime.now().minus({ months: 1 }).toISO(), TimeFrame.MONTH)
        }
      >
        <Text variant="text-regular-small" tag="span">
          1kk
        </Text>
      </Button>
      <Button
        className={selectedTime === TimeFrame.YEAR ? styles.selected : ""}
        onClick={() =>
          onSelect(DateTime.now().minus({ years: 1 }).toISO(), TimeFrame.YEAR)
        }
      >
        <Text variant="text-regular-small" tag="span">
          1v
        </Text>
      </Button>
    </div>
  );
}
