'use client'

import { createContext, useContext, type ReactNode } from 'react'

interface CountryContextType {
  country: string
  getImagePath: (imagePath: string) => string
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

export function CountryProvider({
  children,
  country,
}: {
  children: ReactNode
  country: string
}) {
  const getImagePath = (imagePath: string) => {
    // Si le chemin commence par /images/, on ajoute le country code
    if (imagePath.startsWith('/images/')) {
      return imagePath.replace('/images/', `/images/${country}/`)
    }
    return imagePath
  }

  return (
    <CountryContext.Provider value={{ country, getImagePath }}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider')
  }
  return context
}
