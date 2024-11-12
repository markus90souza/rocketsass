import { defineAbilityFor, type Role, userSchema } from '@zeronze/auth'

export const getUserPermissions = (userId: string, role: Role) => {
  const authUser = userSchema.parse({
    id: userId,
    role,
  })

  const abbility = defineAbilityFor(authUser)
  return abbility
}
