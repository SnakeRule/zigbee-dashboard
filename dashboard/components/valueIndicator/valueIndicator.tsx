import { Text } from "../text/text";
import styles from "./valueIndicator.module.css";

type ValueIndicatorProps = {
  currentValue: number;
  max: number;
  min: number;
  unit: string;
};

export function ValueIndicator({
  currentValue,
  max,
  min,
  unit,
}: ValueIndicatorProps) {
  const dotSizePx = 8;
  const clampedPosition = Math.min(
    1,
    Math.max(0, (currentValue - min) / (max - min || 1)),
  );
  const leftPosition = `calc(${(clampedPosition * 100).toFixed(2)}% - ${clampedPosition * dotSizePx}px)`;

  return (
    <div className={styles["value-indicator-container"]}>
      <div className={styles["value-indicator-slider-container"]}>
        <div className={styles["value-indicator-dot"]} />
        <div className={styles["value-indicator-line"]} />
        <div className={styles["value-indicator-dot"]} />
        <div
          className={styles["value-indicator-moving-dot"]}
          style={{ left: leftPosition }}
        >
          <Text
            className={`${styles["current-value"]} ${currentValue > 999 ? styles["current-value-large"] : ""}`}
            variant="text-regular-small"
            tag="span"
          >
            {`${currentValue}${unit}`}
          </Text>
        </div>
      </div>
      <div className={styles["value-min-max-container"]}>
        <Text variant="text-regular-extra-small" tag="span">
          {min}
        </Text>
        <Text variant="text-regular-extra-small" tag="span">
          {max}
        </Text>
      </div>
    </div>
  );
}
