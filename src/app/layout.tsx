import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Idy | Fullstack Developer',
  description: 'Développeur Fullstack passionné spécialisé en Node.js, Express, React et Next.js. Je transforme vos idées en applications web performantes.',
  keywords: ['développeur', 'fullstack', 'react', 'nextjs', 'nodejs', 'sénégal', 'dakar'],
  authors: [{ name: 'Idy' }],
  openGraph: {
    title: 'Idy | Fullstack Developer',
    description: 'Développeur Fullstack passionné spécialisé en Node.js, Express, React et Next.js.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
