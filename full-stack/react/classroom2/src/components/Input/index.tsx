import { ComponentProps } from 'react'
import styles from './styles.module.css'

type InputProps = ComponentProps<'input'> & {

}

export function Input({ ...rest }: InputProps) {
  return(
    <input className={styles.input} {...rest} />
  )
}