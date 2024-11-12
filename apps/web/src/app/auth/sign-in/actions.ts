'use server'

import { HTTPError } from 'ky'

import { signInWithCredentials } from '@/http/auth/signin-with-credentials'

import { signInFormSchema } from './types'

export const onSignInWithCredentials = async (data: FormData) => {
  const result = signInFormSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithCredentials({
      email: String(email),
      password: String(password),
    })

    console.log(token)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error',
      errors: null,
    }
  }

  return {
    success: true,
    message: null,
    errors: null,
  }
}
