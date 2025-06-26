import { Request, Response } from "express"
import {  hash} from 'bcryptjs'

import { prisma } from "@/lib/prisma"

class UsersController {
  async index(request: Request, response: Response) {
    const users = await prisma.user.findMany()
    return response.json(users)
  }

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body

    const passwordHash = await hash(password, 6)

    await prisma.user.create({ data: { name, email, passwordHash } })

    return response.status(201).json()
  }

  async show(request: Request, response: Response) {
    const { id } = request.params

    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new Error('User not found.')
    }

    return response.json(user)
  }
}

export { UsersController }
