import { projectSchema } from '@zeronze/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'
export async function deleteProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug/projects/:projectId',
      {
        schema: {
          tags: ['Projects'],
          summary: 'Delete project',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            projectId: z.string().cuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, projectId } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        const project = await prisma.project.findUnique({
          where: {
            id: projectId,
            organizationId: organization.id,
          },
        })

        if (!project) {
          throw new BadRequestError('Bad request: project not found')
        }

        const authProject = projectSchema.parse(project)

        if (cannot('delete', authProject)) {
          throw new UnauthorizedError(
            'Unauthorized: user cannot delete project',
          )
        }
        await prisma.project.delete({
          where: {
            id: projectId,
          },
        })

        return reply.status(204).send()
      },
    )
}
