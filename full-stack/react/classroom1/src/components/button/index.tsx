import styles from "./styles.module.css";

import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  name: string;
}

export function Button({ name, ...rest }: ButtonProps) {
  return <button className={styles.container} {...rest}>
    <span>{name}</span>
  </button>
}