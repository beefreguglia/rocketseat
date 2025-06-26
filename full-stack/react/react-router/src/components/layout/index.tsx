import "./styles.css"

import { Outlet } from "react-router"

export function Layout() {
  return (
    <div>
      <header className="user">
        <p>Olá, Bernardo</p>
      </header>

      <Outlet />
      
      <footer>
        <span>
          <p>Todos os direitos reservados</p>
        </span>
      </footer>
    </div>
  )
}