import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/auth/get-profile'
import { getMembership } from '@/http/orgs/get-membership'
import { defineAbilityFor } from '@zeronze/auth'
export async function isAuthenticated() {
  const cookieStore = await cookies()
  return !!cookieStore.get('token')?.value
}


export const getCurrentOrg = async () => {
  const cookieStore = await cookies()
  const currentOrg = cookieStore.get('org')?.value || null
  return currentOrg
}

export const getCurrentMembership = async () => {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}


export async function auth() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (err) {
    console.log(err)
  }

  redirect('api/auth/sign-out')
}