import { ReactNode } from "react";
import styles from "./card.module.css";

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return <div className={styles["card-container"]}>{children}</div>;
}
