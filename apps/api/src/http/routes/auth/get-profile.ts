import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/profile',
    {
      schema: {
        tags: ['Auth'],
        summary: 'get user from profile',
        body: z.object({}),
        response: {
          200: z.object({
            user: z.object({
              id: z.string().cuid(),
              name: z.string().nullable(),
              email: z.string(),
              avatarUrl: z.string().url().nullable(),
            }),
          }),

          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { sub } = await request.jwtVerify<{ sub: string }>()

      const user = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
        where: {
          id: sub,
        },
      })

      if (!user) {
        return reply.status(404).send({ message: 'User not found' })
      }

      return reply.status(200).send({ user })
    },
  )
}
