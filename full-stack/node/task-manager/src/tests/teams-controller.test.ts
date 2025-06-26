import request from "supertest"

import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("TeamsController", () => {
  let user_id: number
  let team_id: number

  afterAll(async() => {
    if(user_id) {
      await prisma.user.delete({ where: { id: user_id } })
    }
    if(team_id) {
      await prisma.team.delete({ where: { id: team_id } })
    }
  })

  it('should be able to create a new team', async () => {
    const createdUserResponse = await request(app).post("/users").send({
      name: 'Auth Test User',
      email: 'authtestuser@example.com',
      password: '123456'
    })

    user_id = createdUserResponse.body.id
    
    await prisma.user.update({
      data: {
        role: 'ADMIN'
      },
      where: {
        id: user_id
      }
    })
    
    const sessionResponse = await request(app).post("/sessions").send({
      email: 'authtestuser@example.com',
      password: '123456'
    })

    const teamCreated = await request(app).post("/teams")
      .send({
        name: 'Team 1',
        description: 'description',
      })
      .set('Authorization', `Bearer ${sessionResponse.body.token}`);
      
    team_id = teamCreated.body.team.id

    expect(teamCreated.status).toBe(201)
    expect(teamCreated.body.team.name).toEqual('Team 1')
  })
})