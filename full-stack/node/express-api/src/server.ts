import express, { Request, Response, NextFunction } from "express"
import { routes } from "./routes"
import { AppError } from "./utils/app-error"
import { ZodError } from "zod"

const PORT = 3333

const app = express()

app.use(express.json())


// Middleware global, aplica em todas rotas abaixo dele
// app.use(myMiddleware)

app.use(routes)

/**
 * 400 (Bad request) Erro do cliente.
 * 500 (Internal Server Error): Erro interno do servidor.
 */

// Colocamos no final para pegar todos os erros disparados pelo sistema
app.use((
  error: any, 
  request: Request, 
  response: Response, 
  _: NextFunction
) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }
  
  if(error instanceof ZodError) {
    return response.status(400).json({ message: "Validation error", issues: error.format() })
  }

  response.status(500).json({ message: error.message })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

