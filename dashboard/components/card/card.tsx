import { ReactNode } from "react";
import styles from "./card.module.css";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={`${styles["card-container"]} ${className}`}>{children}</div>
  );
}
