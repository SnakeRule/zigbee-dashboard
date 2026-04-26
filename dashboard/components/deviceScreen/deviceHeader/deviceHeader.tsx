import { TimePicker } from "../timePicker/timePicker";
import styles from "./deviceHeader.module.css";
import DeviceName from "./deviceName/deviceName";

type DeviceHeaderProps = {
  friendlyName: string;
  setTimeFrom: (timeFrom: string) => void;
};

export function DeviceHeader({ friendlyName, setTimeFrom }: DeviceHeaderProps) {
  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-content-container"]} />
      <div className={styles["header-content-container"]}>
        <DeviceName friendlyName={friendlyName} />
      </div>
      <div className={styles["header-content-container"]}>
        <TimePicker setTimeFrom={setTimeFrom} />
      </div>
    </div>
  );
}
