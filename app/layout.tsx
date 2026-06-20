import type { Metadata } from 'next'
import './globals.css'

// All fonts (Inter 18pt Regular/Medium + Phudu SemiBold) loaded locally
// via @font-face in globals.css — no Google Fonts dependency

export const metadata: Metadata = {
  title: 'Flexible Pricing for Growing Banks',
  description:
    'Optimize payment accuracy and manage transfers with secure workflows.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
