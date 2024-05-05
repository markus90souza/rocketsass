import { roleSchema } from '@rocketsass/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
export async function getOrganizations(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get organizations which the user is a member of',
          security: [{ bearerAuth: [] }],

          response: {
            200: z.object({
              organizations: z.array(
                z.object({
                  id: z.string().cuid(),
                  name: z.string(),
                  slug: z.string(),
                  avatarUrl: z.string().url().nullable(),
                  role: roleSchema,
                }),
              ),
            }),
          },
        },
      },
      async (request) => {
        const userId = await request.getCurrentUserId()

        const organizationsData = await prisma.organization.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            avatarUrl: true,
            members: {
              where: {
                userId,
              },
              select: {
                role: true,
              },
            },
          },
          where: {
            members: {
              some: {
                userId,
              },
            },
          },
        })

        const organizations = organizationsData.map((org) => {
          return {
            ...org,
            role: roleSchema.parse(org.members[0].role),
          }
        })
        return { organizations }
      },
    )
}
