import { roleSchema } from '@rocketsass/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'
export async function getInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()

    .get(
      '/invites/:inviteId',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Get details of an invite',

          params: z.object({
            inviteId: z.string().cuid(),
          }),

          response: {
            200: z.object({
              invite: z.object({
                id: z.string().cuid(),
                email: z.string().email(),
                role: roleSchema,
                createdAt: z.date(),
                author: z
                  .object({
                    id: z.string().cuid(),
                    name: z.string().nullable(),
                    avatarUrl: z.string().url().nullable(),
                  })
                  .nullable(),
                organization: z.object({
                  name: z.string(),
                }),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { inviteId } = request.params

        const invite = await prisma.invite.findUnique({
          where: {
            id: inviteId,
          },
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
            organization: {
              select: { name: true },
            },
          },
        })

        if (!invite) {
          throw new BadRequestError('invite_not_found: Invite not found')
        }

        return reply.status(200).send({
          invite,
        })
      },
    )
}
