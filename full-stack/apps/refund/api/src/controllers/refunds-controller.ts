import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { Request,  Response } from 'express'
import { z } from 'zod'

const CategoriesEnum = z.enum([
  "food", 
  "others", 
  "services", 
  "transport", 
  "accommodation"
]);

class RefundsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(1, { message: 'Informe o nome da solicitação' }),
      category: CategoriesEnum,
      amount: z.number().positive({ message: "O número precisa ser positivo"}),
      filename: z.string().min(20),
    })

    const { amount, category, filename, name } = bodySchema.parse(request.body)

    if(!request.user?.id) {
      throw new AppError("Unauthorized", 401)
    }

    const refund = await prisma.refund.create({
      data: {
        amount,
        category,
        filename,
        name,
        userId: request.user.id,
      }
    })

    response.status(201).json(refund)
  }
  
  async index(request: Request, response: Response) {
    const querySchema =  z.object({
      name: z.string().trim().optional().default(''),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10),
    })

    const { name, page, perPage } = querySchema.parse(request.query)

    const skip = (page - 1) * perPage;

    const refunds = await prisma.refund.findMany({
      skip,
      take: perPage,
      where: {
        user: {
          name: {
            contains: name,
          }
        }
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Obter total de registros para calcular o número de páginas
    const totalRecords = await prisma.refund.count({
      where: {
        user: {
          name: {
            contains: name,
          }
        }
      },
    })

    const totalPages = Math.ceil(totalRecords / perPage);

    response.status(200).json({ 
      refunds,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1,
    } })
  }
  
  async show(request: Request, response: Response) {
    const paramsSchema =  z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const refund = await prisma.refund.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })

    response.status(200).json(refund)
  }
}

export { RefundsController }