import { ReactNode } from "react";
import styles from "./contentLayout.module.css";

type ContentLayoutProps = {
  children: ReactNode;
};

export function ContentLayout({ children }: ContentLayoutProps) {
  <main className={styles["main-content"]}>{children}</main>;
}
