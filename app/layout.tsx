import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Task Management App',
  description: 'A task management application to organize your work.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
