import { Clock } from "../clock/clock";
import { Weather } from "../weather/Weather";
import styles from "./header.module.css";

export function Header() {
  return (
    <nav className={styles.nav}>
      <Clock />
      <Weather />
    </nav>
  );
}
