import { prisma } from '@/database/prisma';
import type { Request, Response } from 'express';
import { z } from 'zod';

class ServicesController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().trim().min(2, { message: 'Título é obrigatório' }),
      price: z.number().min(1, { message: 'Valor é obrigatório' }),
    });

    const { price, title } = bodySchema.parse(request.body);

    await prisma.service.create({
      data: {
        price,
        title,
      },
    });

    response.status(201).json();
  }

  async index(_: Request, response: Response) {
    const services = await prisma.service.findMany({
      select: {
        title: true,
        price: true,
        isActive: true,
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    response.status(200).json({
      services,
    });
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const service = await prisma.service.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        price: true,
      },
    });

    response.status(200).json(service);
  }

  async active(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.service.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });

    response.status(201).json();
  }

  async inactive(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.service.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    response.status(201).json();
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      title: z.string().trim().optional(),
      price: z.number().optional(),
    });

    const { id } = paramsSchema.parse(request.params);

    const { price, title } = bodySchema.parse(request.body);

    await prisma.service.update({
      where: {
        id,
      },
      data: {
        price,
        title,
      },
    });

    response.status(200).json();
  }
}

export { ServicesController };
