import '@/styles/globals.css'

import type { Metadata } from 'next'
import type { FC, ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="pt-br" className="dark">
      <body className={``}>{children}</body>
    </html>
  )
}

export default RootLayout
