import { ComponentProps } from 'react'
import styles from './styles.module.css'

type ButtonProps = ComponentProps<"button"> & {
  title: string
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} {...rest}>{title}</button>
  )
}