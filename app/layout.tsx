import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AWS CRUD Demo',
  description: 'Simple CRUD app with DynamoDB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}