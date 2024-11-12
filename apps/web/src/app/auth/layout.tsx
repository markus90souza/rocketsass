import { redirect } from 'next/navigation'
import type { FC, ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'
type AuthLayoutProps = {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  if (isAuthenticated()) {
    redirect('/')
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  )
}

export default AuthLayout
