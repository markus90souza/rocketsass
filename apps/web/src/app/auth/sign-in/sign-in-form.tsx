'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// import { type FormEvent, useState, useTransition } from 'react'
import GithubIcon from '@/assets/github-logo.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { onSignInWithCredentials } from './actions'
export const SignInForm = () => {
  // const [{ error, message, success }, formSignInAction, isPending] =
  //   useActionState(onSignInWithCredentials, {
  //     success: false,
  //     error: null,
  //     message: null,
  //   })

  // const [{ success, message, errors }, setFormState] = useState<{
  //   success: boolean
  //   message: string | null
  //   errors: Record<string, string[]> | null
  // }>({
  //   success: false,
  //   message: null,
  //   errors: null,
  // })

  // const [isPending, startTransition] = useTransition()

  // const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const form = event.currentTarget
  //   const data = new FormData(form)
  //   startTransition(async () => {
  //     const state = await onSignInWithCredentials(data)
  //     setFormState(state)
  //   })
  // }

  const router = useRouter()

  const [{ errors, success, message }, handleSubmit, isPending] = useFormState(
    onSignInWithCredentials,
    () => {
      router.push('/')
    },
  )
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign In failed</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />
        {errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Sign in with Email'
        )}
      </Button>

      <Button variant={'link'} className="w-full" size={'sm'} asChild>
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Separator />

      <Button className="w-full" variant="outline">
        <Image
          className="mr-2 size-4 dark:invert"
          src={GithubIcon}
          alt="GitHub logo"
        />
        Sign in with GitHub
      </Button>
    </form>
  )
}