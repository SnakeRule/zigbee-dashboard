import { Clock } from "./clock/clock";
import { Weather } from "./weather/Weather";
import styles from "./header.module.css";
import { PermitDeviceJoin } from "./permitDeviceJoin/permitDeviceJoin";

export function Header() {
  return (
    <nav className={styles.nav}>
      <Clock />
      <PermitDeviceJoin />
      <Weather />
    </nav>
  );
}
