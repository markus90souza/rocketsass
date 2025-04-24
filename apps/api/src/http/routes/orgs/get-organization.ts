import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
export async function getOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organization/:slug',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get details of an organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              organization: z.object({
                id: z.string().cuid(),
                name: z.string(),
                domain: z.string().nullable(),
                slug: z.string(),
                shouldAttachUserByDomain: z.boolean().optional(),
                avatarUrl: z.string().url().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
                ownerId: z.string().cuid(),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params
        const { organization } = await request.getUserMembership(slug)

        return { organization }
      },
    )
}
