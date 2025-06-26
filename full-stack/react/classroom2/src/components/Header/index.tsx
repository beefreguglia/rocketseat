import styles from "./styles.module.css"
import logo from "../../assets/logo.png"
import restart from "../../assets/restart.svg"

type HeaderProps = {
  current: number
  max: number
  onRestart: () => void
}

export function Header({ current, max, onRestart }: HeaderProps) {
  return (
    <div className={styles.header}>
      <img src={logo} alt="Logo" />

      <header>
        <span>
          <strong>{current}</strong> de {max} tentativas
        </span>

        <button onClick={onRestart}>
          <img src={restart} alt="Ícone de reiniciar" />
        </button>
      </header>
    </div>
  )
}