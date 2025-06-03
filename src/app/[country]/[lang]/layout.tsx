// src/app/[country]/[lang]/layout.tsx
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Layout } from '@/components/Layout'
import { CountryLanguageProvider } from '@/contexts/CountryLanguageContext'

// Langues supportées
const supportedLanguages = ['en', 'fr']

// Pays supportés
const supportedCountries = ['zw', 'sz', 'ga', 'bw', 'gm', 'zm', 'mz', 'bi']

// Configuration des langues par pays
const countryLanguages: Record<string, string[]> = {
  zw: ['en'],
  sz: ['en'],
  ga: ['fr'],
  bw: ['en'],
  gm: ['en'],
  zm: ['en'],
  mz: ['en'],
  bi: ['fr'],
}

export const metadata: Metadata = {
  title: {
    template: '%s - DQoS Docs',
    default: 'DQoS - Quality of Service Documentation',
  },
  description:
    'Quality of Service monitoring solution documentation for mobile networks.',
}

export default function CountryLanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { country: string; lang: string }
}) {
  // Vérifier si le pays est supporté
  if (!supportedCountries.includes(params.country)) {
    notFound()
  }

  // Vérifier si la langue est supportée globalement
  if (!supportedLanguages.includes(params.lang)) {
    notFound()
  }

  // Vérifier si la langue est supportée pour ce pays
  if (!countryLanguages[params.country]?.includes(params.lang)) {
    notFound()
  }

  return (
    <CountryLanguageProvider country={params.country} language={params.lang}>
      <Layout>{children}</Layout>
    </CountryLanguageProvider>
  )
}
