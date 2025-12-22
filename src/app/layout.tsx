import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://idrisswade.vercel.app'), // 🔁 change avec ton vrai domaine

  title: {
    default: 'Idy | Fullstack Developer',
    template: '%s | Idy',
  },

  description:
    'Développeur Fullstack basé à Dakar, spécialisé en Node.js, React et Next.js. Je crée des applications modernes, performantes et scalables.',

  keywords: [
    'développeur fullstack',
    'développeur web',
    'react',
    'nextjs',
    'javascript',
    'typescript',
    'node',
    'adonisjs',
    'nodejs',
    'typescript',
    'dakar',
    'sénégal',
  ],

  authors: [{ name: 'Idrissa Wade', url: 'https://idrisswade.vercel.app' }],
  creator: 'Idrissa Wade',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'Idy | Fullstack Developer',
    description:
      'Développeur Fullstack basé à Dakar, spécialisé en React, Next.js et Node.js.',
    url: 'https://idrisswade.vercel.app',
    siteName: 'Idy Portfolio',
    images: [
      {
        url: 'https://idrisswade.vercel.app/opengraph-image', // à mettre dans /public
        width: 1200,
        height: 630,
        alt: 'Idy - Fullstack Developer',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Idy | Fullstack Developer',
    description:
      'Développeur Fullstack spécialisé en React, Next.js et Node.js.',
    images: ['/opengraph-image'],
    creator: '@theShvdow', // optionnel
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  alternates: {
    canonical: 'https://idrisswade.vercel.app',
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
