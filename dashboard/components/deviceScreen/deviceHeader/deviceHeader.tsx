import styles from "./deviceHeader.module.css";
import DeviceName from "./deviceName/deviceName";

type DeviceHeaderProps = {
  friendlyName: string;
};

export function DeviceHeader({ friendlyName }: DeviceHeaderProps) {
  return (
    <div className={styles["header-container"]}>
      <DeviceName friendlyName={friendlyName} />
    </div>
  );
}
