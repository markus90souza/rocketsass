import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { User } from './models/user'
import { permissions } from './permissions'
import {
  billingSubject,
  inviteSubject,
  organizationSubject,
  ProjectSubject,
  userSubject,
} from './subjects'

export * from './models'
export * from './roles'

const appAbilitySchema = z.union([
  userSubject,
  ProjectSubject,
  billingSubject,
  inviteSubject,
  organizationSubject,

  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitySchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export const defineAbilityFor = (user: User) => {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permission not found for role: ${user.role}`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  return ability
}
