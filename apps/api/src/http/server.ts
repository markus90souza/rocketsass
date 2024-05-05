import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@rocketsass/env'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { authenticateWithCredentials } from './routes/auth/authenticate-with-credentials'
import { authenticateWithGithub } from './routes/auth/authenticate-with-github'
import { createAccount } from './routes/auth/create-account'
import { getProfile } from './routes/auth/get-profile'
import { requestPasswordRecover } from './routes/auth/request-password-recover'
import { resetPassword } from './routes/auth/reset-password'
import { createOrganization } from './routes/orgs/create-organization'
import { deleteOrganization } from './routes/orgs/delete-organization'
import { getMembership } from './routes/orgs/get-membership'
import { getOrganization } from './routes/orgs/get-organization'
import { getOrganizations } from './routes/orgs/get-organizations'
import { transferOrganization } from './routes/orgs/transfer-organization'
import { updateOrganization } from './routes/orgs/update-organization'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Rocketsass API',
      description: 'API for RocketSass',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, { routePrefix: '/docs' })
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

// AUTH
app.register(createAccount)
app.register(authenticateWithCredentials)
app.register(authenticateWithGithub)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)
// ORGANIZATIONS
app.register(createOrganization)
app.register(getOrganizations)
app.register(getOrganization)
app.register(updateOrganization)
app.register(deleteOrganization)
app.register(transferOrganization)
app.register(getMembership)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})
