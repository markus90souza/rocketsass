import { defineAbilityFor } from '@rocketsass/auth'

const ability = defineAbilityFor({ role: 'ADMIN' })

const userCanInviteSomeOneElse = ability.can('invite', 'User')

const userCanDeleteOtherUsers = ability.can('delete', 'User')
console.log(userCanInviteSomeOneElse)
console.log(userCanDeleteOtherUsers)
