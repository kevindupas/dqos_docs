// src/contexts/CountryLanguageContext.tsx
'use client'

import { createContext, useContext, type ReactNode } from 'react'

interface CountryLanguageContextType {
  country: string
  language: string
  getImagePath: (imagePath: string) => string
  getLocalizedUrl: (path: string) => string
}

const CountryLanguageContext = createContext<
  CountryLanguageContextType | undefined
>(undefined)

export function CountryLanguageProvider({
  children,
  country,
  language,
}: {
  children: ReactNode
  country: string
  language: string
}) {
  const getImagePath = (imagePath: string) => {
    // Si le chemin commence par /images/, on ajoute le country code
    if (imagePath.startsWith('/images/')) {
      return imagePath.replace('/images/', `/images/${country}/`)
    }
    return imagePath
  }

  const getLocalizedUrl = (path: string) => {
    // Transformer les URLs pour inclure country et language
    if (path === '/') {
      return `/${country}/${language}`
    }
    if (path.startsWith('/docs/')) {
      return `/${country}/${language}${path}`
    }
    if (path.startsWith('/')) {
      return `/${country}/${language}${path}`
    }
    return `/${country}/${language}/${path}`
  }

  return (
    <CountryLanguageContext.Provider
      value={{
        country,
        language,
        getImagePath,
        getLocalizedUrl,
      }}
    >
      {children}
    </CountryLanguageContext.Provider>
  )
}

export function useCountryLanguage() {
  const context = useContext(CountryLanguageContext)
  if (context === undefined) {
    throw new Error(
      'useCountryLanguage must be used within a CountryLanguageProvider',
    )
  }
  return context
}

// Garder l'ancien hook pour la compatibilité
export function useCountry() {
  const context = useCountryLanguage()
  return {
    country: context.country,
    getImagePath: context.getImagePath,
  }
}
