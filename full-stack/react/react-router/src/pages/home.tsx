import { useNavigate } from "react-router"

export function Home() {
  const navigate = useNavigate()

  function handleNavigate(path: string) {
    navigate(path)
  }
  
  return(
    <div>
      <h1>Página Home</h1>
      <nav>
        <a href="/products">Produtos</a>
        <a href="/products?category=tvs">Categoria</a>
        <a href="/products?category=tvs&price=2000">Price</a>
        <button type="button" onClick={() => handleNavigate('/products')}>Ver produtos</button>
      </nav>
    </div>
  )
}