import { ReactNode } from "react";
import styles from "./card.module.css";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: number;
};

export function Card({ children, className, padding }: CardProps) {
  return (
    <div
      className={`${styles["card-container"]} ${className}`}
      style={{ padding }}
    >
      {children}
    </div>
  );
}
