import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
lang="en"
data-theme="coffee">
      <body
className={inter.className}>
        <main
className="flex flex-col min-h-screen bg-base-100 text-base-content p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
