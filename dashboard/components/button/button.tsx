"use client";

import { ReactNode } from "react";
import styles from "./button.module.css";

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  onClick: () => void;
};

export function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
}
