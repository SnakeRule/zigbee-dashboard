import { Clock } from "../clock/clock";
import styles from "./header.module.css";

export function Header() {
  return (
    <nav className={styles.nav}>
      <Clock />
    </nav>
  );
}
