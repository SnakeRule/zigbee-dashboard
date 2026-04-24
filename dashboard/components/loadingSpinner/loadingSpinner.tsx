import { LoaderCircle } from "lucide-react";
import styles from "./loadingSpinner.module.css";

export function LoadingSpinner() {
  return <LoaderCircle size={24} className={styles["loader-circle"]} />;
}
