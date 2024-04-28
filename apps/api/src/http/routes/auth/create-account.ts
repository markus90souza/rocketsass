import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
export const createAccount = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (userWithSameEmail) {
        return reply.status(409).send({
          message: 'email_in_use: Email is already in use',
        })
      }

      const hashedPassword = await hash(password, 6)

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      })

      reply.status(201).send({
        message: 'account_created: Account created successfully',
      })
    },
  )
}
