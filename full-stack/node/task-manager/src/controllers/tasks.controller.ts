import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';
import { Request, Response } from 'express'
import { z } from 'zod'

class TasksController {
  async index(request: Request, response: Response) {
    const taskParamsSchema = z.object({
      teamId: z.coerce.number(),
    });
    
    const { teamId } = taskParamsSchema.parse(request.params);
    
    const tasks = await prisma.task.findMany({
      where: { teamId }
    })

    return response.json({ tasks })
  }

  async create(request: Request, response: Response) {
    const taskBodySchema = z.object({
      assignedTo: z.coerce.number(),
      title: z.string(),
      description: z.string().optional(),
      status: z.enum(['pending', 'in_progress', 'completed']).optional().default('pending'),
      priority: z.enum(['low', 'medium', 'high']).optional().default('low'),
    });

    const { 
      title, 
      assignedTo,
      description,
      priority, 
      status,
    } = taskBodySchema.parse(request.body);

    const taskParamsSchema = z.object({
      teamId: z.coerce.number(),
    });
    
    const { teamId } = taskParamsSchema.parse(request.params);

    const task = await prisma.task.create({
      data: {
        title,
        teamId,
        assignedTo,
        description,
        priority,
        status,
      }
    });

    return response.status(201).json({ task });
  }

  async get(request: Request, response: Response) {
    const taskParamsSchema = z.object({
      teamId: z.coerce.number(),
      taskId: z.coerce.number(),
    });
    
    const { teamId, taskId } = taskParamsSchema.parse(request.params);
    
    const task = await prisma.task.findUnique({
      where: { id: taskId, teamId }
    })

    return response.json({ task })
  }

  async update(request: Request, response: Response) {
    const taskBodySchema = z.object({
      assignedTo: z.coerce.number(),
      title: z.string(),
      description: z.string().optional(),
      status: z.enum(['pending', 'in_progress', 'completed']).optional().default('pending'),
      priority: z.enum(['low', 'medium', 'high']).optional().default('low'),
    });

    const { 
      title, 
      assignedTo,
      description,
      priority, 
      status,
    } = taskBodySchema.parse(request.body);

    const taskParamsSchema = z.object({
      teamId: z.coerce.number(),
      taskId: z.coerce.number(),
    });
    
    const { teamId, taskId } = taskParamsSchema.parse(request.params);

    const task = await prisma.task.update({
      data: {
        title,
        assignedTo,
        description,
        priority,
        status,
      },
      where: {
        id: taskId,
        teamId,
      }
    });

    return response.status(204).json({ task });
  }
  
  async changeToPending(request: Request, response: Response) {
    const taskParamsSchema = z.object({
      taskId: z.coerce.number(),
    });
    
    const { taskId } = taskParamsSchema.parse(request.params);

    const foundTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      }
    })

    if (!foundTask) {
      throw new AppError("Task not found.", 404);
    }

    const task = await prisma.task.update({
      data: {
        status: 'pending',
      },
      where: {
        id: taskId,
      }
    });

    await prisma.taskHistory.create({
      data: {
        newStatus: 'pending',
        oldStatus: task.status,
        taskId: task.id,
        changedBy: request.user?.id!,
      }
    })

    return response.status(204).json({ task });
  }

  async changeToInProgress(request: Request, response: Response) {
    const taskParamsSchema = z.object({
      taskId: z.coerce.number(),
    });
    
    const { taskId } = taskParamsSchema.parse(request.params);

    const foundTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      }
    })
    
    if (!foundTask) {
      throw new AppError("Task not found.", 404);
    }

    const task = await prisma.task.update({
      data: {
        status: 'in_progress',
      },
      where: {
        id: taskId,
      }
    });

    await prisma.taskHistory.create({
      data: {
        newStatus: task.status,
        oldStatus: foundTask.status,
        taskId: task.id,
        changedBy: request.user?.id!,
      }
    })
    return response.status(204).json();
  }

  async changeToCompleted(request: Request, response: Response) {
    const taskParamsSchema = z.object({
      taskId: z.coerce.number(),
    });
    
    const { taskId } = taskParamsSchema.parse(request.params);

    const foundTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      }
    })

    if (!foundTask) {
      throw new AppError("Task not found.", 404);
    }

    const task = await prisma.task.update({
      data: {
        status: 'completed',
      },
      where: {
        id: taskId,
      }
    });

    await prisma.taskHistory.create({
      data: {
        newStatus: 'completed',
        oldStatus: task.status,
        taskId: task.id,
        changedBy: request.user?.id!,
      }
    })

    return response.status(204).json();
  }

  async delete(request: Request, response: Response) {
    const taskParamsSchema = z.object({
      taskId: z.coerce.number(),
    });
    
    const { taskId } = taskParamsSchema.parse(request.params);

    const foundTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      }
    })

    if (!foundTask) {
      throw new AppError("Task not found.", 404);
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      }
    })

    return response.status(204).json();
  }
}

export { TasksController }