import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(6, {
      message: 'Password must be at least 6 characters long',
    }),
})
