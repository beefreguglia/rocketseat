import { Request, Response } from "express"
import { sign } from "jsonwebtoken"

import { AppError } from "@/utils/AppError"
import { authConfig } from "@/configs/auth"

const fakeUser = {
  id: "1",
  username: "Bernardo",
  password: "123456",
  role: "customer"
}

class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body

    if(username !== fakeUser.username || password !== fakeUser.password) {
      throw new AppError("E-mail e/ou senha incorreta!", 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({ role: fakeUser.role }, secret, {
      expiresIn,
      subject: String(fakeUser.id)
    })
    return response.json({ token })
  }
}

export { SessionsController }
