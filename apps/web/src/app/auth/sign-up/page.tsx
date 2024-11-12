import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import GithubIcon from '@/assets/github-logo.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const SignUpPage = () => {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input name="name" type="text" id="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Password Confirmation</Label>
        <Input
          name="password_confirmation"
          type="password"
          id="password_confirmation"
        />
      </div>

      <Button className="w-full" type="submit">
        Create account
      </Button>

      <Button variant={'link'} className="w-full" size={'sm'} asChild>
        <Link href="/auth/sign-in">Already registered? Sign in</Link>
      </Button>

      <Separator />

      <Button className="w-full" variant="outline">
        <Image
          className="mr-2 size-4 dark:invert"
          src={GithubIcon}
          alt="GitHub logo"
        />
        Sign up with GitHub
      </Button>
    </form>
  )
}

export default SignUpPage
