import request from "supertest"

import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("TasksController", () => {
  let user_id: number | undefined
  let team_id: number | undefined
  let task_id: number | undefined
  let task_id2: number | undefined
  let task_id3: number | undefined
  let task_id4: number | undefined
  let token: string = ''

  afterAll(async() => {
    if(task_id) {
      await prisma.task.delete({ where: { id: task_id } })
    }
    if(task_id2) {
      await prisma.task.delete({ where: { id: task_id2 } })
    }
    if(task_id3) {
      await prisma.task.delete({ where: { id: task_id3 } })
    }
    if(task_id4) {
      await prisma.task.delete({ where: { id: task_id4 } })
    }
    if(team_id) {
      await prisma.team.delete({ where: { id: team_id } })
    }
    if(user_id) {
      await prisma.user.delete({ where: { id: user_id } })
    }
  })

  it('should be able to create a new task', async () => {
    const createdUserResponse = await request(app).post("/users").send({
      name: 'Auth Test User',
      email: 'authtestuser@example.com',
      password: '123456'
    })

    user_id = createdUserResponse.body.id;

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
    
    token = sessionResponse.body.token;

    const teamCreated = await request(app).post("/teams")
      .send({
        name: 'Team 1',
        description: 'description',
      })
      .set('Authorization', `Bearer ${token}`);
    
    team_id = teamCreated.body.team.id;
    
    const taskCreated = await request(app).post(`/tasks/${team_id}`)
      .send({
        title: 'Task title 1',
        description: 'Task description',
        assignedTo:user_id,
      })
      .set('Authorization', `Bearer ${token}`);

    task_id = taskCreated.body.task.id;

    expect(taskCreated.status).toBe(201);
    expect(taskCreated.body.task.title).toEqual('Task title 1');
    expect(taskCreated.body.task.description).toEqual('Task description');
  })
  
  it('should be able to show all tasks created by team', async () => {
    const taskCreated2 = await request(app).post(`/tasks/${team_id}`)
      .send({
        title: 'Task title 2',
        description: 'Task description',
        assignedTo: user_id,
      })
      .set('Authorization', `Bearer ${token}`);

    task_id2 = taskCreated2.body.task.id;

    const taskCreated3 = await request(app).post(`/tasks/${team_id}`)
      .send({
        title: 'Task title 3',
        description: 'Task description',
        assignedTo: user_id,
      })
      .set('Authorization', `Bearer ${token}`);

    task_id3 = taskCreated3.body.task.id;

    const taskCreated4 = await request(app).post(`/tasks/${team_id}`)
      .send({
        title: 'Task title 4',
        description: 'Task description',
        assignedTo: user_id,
      })
      .set('Authorization', `Bearer ${token}`);

    task_id4 = taskCreated4.body.task.id;

    const tasksResponse = await request(app).get(`/tasks/${team_id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(tasksResponse.status).toBe(200);
    expect(tasksResponse.body.tasks).toHaveLength(4);
    expect(tasksResponse.body.tasks).toEqual([
      expect.objectContaining({
        title: 'Task title 1'
      }),
      expect.objectContaining({
        title: 'Task title 2'
      }),
      expect.objectContaining({
        title: 'Task title 3'
      }),
      expect.objectContaining({
        title: 'Task title 4'
      }),
    ]);
  })

  it('should be able to show a created task by team id and task id', async () => {
    const taskResponse = await request(app)
      .get(`/tasks/${task_id}/team/${team_id}`)
      .set('Authorization', `Bearer ${token}`);
  
   
    expect(taskResponse.status).toBe(200);
    expect(taskResponse.body.task.title).toEqual('Task title 1');
  })

  it('should be able to update a task to in progress status', async () => {
    const taskResponse = await request(app)
      .patch(`/tasks/${task_id}/status/in_progress`)
      .set('Authorization', `Bearer ${token}`);

    expect(taskResponse.status).toBe(204);
  })

  it('should be able to update a task to pending status', async () => {
    const taskResponse = await request(app)
      .patch(`/tasks/${task_id}/status/pending`)
      .set('Authorization', `Bearer ${token}`);

    expect(taskResponse.status).toBe(204);
  })

  it('should be able to update a task to completed status', async () => {
    const taskResponse = await request(app)
      .patch(`/tasks/${task_id}/status/completed`)
      .set('Authorization', `Bearer ${token}`);

    expect(taskResponse.status).toBe(204);
  })

  it('should be able to delete a task', async () => {
    const taskResponse = await request(app)
      .delete(`/tasks/${task_id}`)
      .set('Authorization', `Bearer ${token}`);
    
    task_id = undefined

    expect(taskResponse.status).toBe(204);
  })
})