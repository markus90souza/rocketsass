import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

import { Header } from '@/components/header'
import type { ReactNode } from 'react'

type AppLayoutProps = {
  children: ReactNode
}

const AppLayout = async ({ children }: AppLayoutProps) => {
  if (await !isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  
    return (
      <div className="space-y-4 py-4">
        <Header />
        <main className="mx-auto w-full max-w-[1200px]">{children}</main>
      </div>
    )
  
}

export default AppLayout