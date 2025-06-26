import request from "supertest"

import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("SessionsController", () => {
  let user_id: number

  afterAll(async() => {
    if(user_id) {
      await prisma.user.delete({ where: { id: user_id } })
    }
  })

  it('should be able to authenticate and get access token', async () => {
    const createdUserResponse = await request(app).post("/users").send({
      name: 'Auth Test User',
      email: 'authtestuser@example.com',
      password: '123456'
    })

    user_id = createdUserResponse.body.id

    const sessionResponse = await request(app).post("/sessions").send({
      email: 'authtestuser@example.com',
      password: '123456'
    })

    expect(sessionResponse.status).toBe(200)
    expect(sessionResponse.body.token).toEqual(expect.any(String))
  })

  it('should throw an invalid credentials error if email is invalid', async () => {
    const sessionResponse = await request(app).post("/sessions").send({
      email: 'invalid@invalid.com',
      password: '123456'
    })
  
      expect(sessionResponse.status).toBe(401)
      expect(sessionResponse.body.message).toBe("Invalid credentials.")
    })

  it('should throw an invalid credentials error if password is invalid', async () => {
    const sessionResponse = await request(app).post("/sessions").send({
      email: 'authtestuser@example.com',
      password: 'invalid_password'
    })
  
      expect(sessionResponse.status).toBe(401)
      expect(sessionResponse.body.message).toBe("Invalid credentials.")
    })
})