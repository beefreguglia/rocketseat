import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import type { Request, Response } from 'express';
import { z } from 'zod';

class CallsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().trim().min(2, { message: 'Título é obrigatório' }),
      description: z.string().min(1, { message: 'Descrição é obrigatório' }),
      serviceId: z.string().uuid({ message: 'Serviço inválido' }),
    });

    const { description, title, serviceId } = bodySchema.parse(request.body);

    await prisma.$transaction(async (tx) => {
      if (!request?.user?.id) {
        throw new AppError('Usuário não autenticado.', 401);
      }

      const service = await tx.service.findFirst({
        where: { id: serviceId, isActive: true },
      });

      if (!service) {
        throw new AppError('Serviço não encontrado ou está inativo.', 404);
      }

      const now = new Date();
      now.setHours(now.getHours() - 3);
      const currentTime = now.getHours().toString().padStart(2, '0') + ':00';

      const availableTechnicians = await tx.user.findMany({
        where: {
          role: 'TECHNICIAN',
          technicianProfile: {
            availability: {
              contains: `"${currentTime}"`,
            },
          },
        },
        include: {
          _count: {
            select: {
              assignedCalls: { where: { status: 'OPEN' } },
            },
          },
        },
        orderBy: {
          assignedCalls: {
            _count: 'asc',
          },
        },
      });

      if (availableTechnicians.length === 0) {
        throw new AppError('Não há técnicos disponíveis no momento.', 500);
      }

      const assignedTechnician = availableTechnicians[0];

      const createdCall = await tx.call.create({
        data: {
          title,
          description,
          status: 'OPEN',
          clientId: request.user.id,
          technicianId: assignedTechnician.id,
          callServices: {
            create: {
              serviceId: service.id,
              priceAtTimeOfService: service.price,
            },
          },
        },
        include: {
          client: { select: { name: true } },
          technician: { select: { name: true } },
          callServices: { include: { service: { select: { title: true } } } },
        },
      });

      return createdCall;
    });

    response.status(201).json();
  }

  async index(_: Request, response: Response) {
    const calls = await prisma.call.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        status: true,
        client: {
          select: {
            name: true,
          },
        },
        technician: {
          select: {
            name: true,
          },
        },
        callServices: {
          select: {
            service: {
              select: {
                title: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    response.status(200).json({
      calls,
    });
  }
}

export { CallsController };
