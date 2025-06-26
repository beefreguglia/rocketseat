import "./global.css";

import { useEffect, useState } from 'react';
import { Button } from "./components/button";

import styles from "./app.module.css";

// import { useMessage } from "./hooks/useMessage";

export function App() {
  // const { show } = useMessage("Bernardo", 28);
  const [count, setCount] = useState(0)

  function handleAdd() {
    setCount(count + 1)
  }

  function handleRemove() {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  useEffect(() => {
    if(count > 0) {
      console.log('O valor mudou!')
    }
  }, [count])
  
  return (
    <div className={styles.container}>
      <Button name="Adicionar" onClick={handleAdd} />
      <span>{count}</span>
      <Button name="Remover" onClick={handleRemove} />
    </div>
  )
}