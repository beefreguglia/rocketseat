import { prisma } from '@/database/prisma';
import { Request, Response } from 'express'
import { z } from 'zod'

class TeamsController {
  async create(request: Request, response: Response) {
    const teamBodySchema = z.object({
      name: z.string(),
      description: z.string().optional(),
    });

    const { name, description } = teamBodySchema.parse(request.body);

    const team = await prisma.team.create({
      data: {
        name,
        description,
      }
    });

    await prisma.teamMember.create({
      data: {
        teamId: team.id,
        userId: request.user?.id!,
      }
    })

    return response.status(201).json({ team });
  }
}

export { TeamsController }