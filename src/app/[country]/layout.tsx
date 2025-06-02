import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'
import { notFound } from 'next/navigation'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { CountryProvider } from '@/contexts/CountryContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = localFont({
  src: '../../fonts/lexend.woff2',
  display: 'swap',
  variable: '--font-lexend',
})

// Liste des country codes supportés
const supportedCountries = ['zw', 'sz', 'za', 'bw'] // Ajoute tes pays ici

export const metadata: Metadata = {
  title: {
    template: '%s - Docs',
    default: 'DQoS - Never miss the cache again.',
  },
  description: 'Quality of Service monitoring solution for mobile networks.',
}

export default function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { country: string }
}) {
  // Vérifier si le country code est supporté
  if (!supportedCountries.includes(params.country)) {
    notFound()
  }

  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, lexend.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full bg-white dark:bg-slate-900">
        <Providers>
          <CountryProvider country={params.country}>
            <Layout>{children}</Layout>
          </CountryProvider>
        </Providers>
      </body>
    </html>
  )
}
