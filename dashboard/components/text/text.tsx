import { ReactNode } from "react";
import styles from "./text.module.css";
import clsx from "clsx";

type TextProps = {
  tag:
    | "p"
    | "span"
    | "strong"
    | "em"
    | "small"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
  variant:
    | "text-regular"
    | "text-regular-bold"
    | "text-xl"
    | "text-header-small"
    | "text-large";
  className?: string;
  children: ReactNode;
};

export function Text({ tag, variant, className, children }: TextProps) {
  const Tag = tag;

  return <Tag className={clsx(styles[variant], className)}>{children}</Tag>;
}
