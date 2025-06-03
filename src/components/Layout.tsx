// src/components/Layout.tsx (mise à jour)
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { MobileNavigation } from '@/components/MobileNavigation'
import { Navigation } from '@/components/Navigation'
import { Search } from '@/components/Search'
import { ThemeSelector } from '@/components/ThemeSelector'
import { useCountryLanguage } from '@/contexts/CountryLanguageContext'
import dqosLogo from '@/images/dqos-logo_white.png'
import Image from 'next/image'

function Header() {
  let [isScrolled, setIsScrolled] = useState(false)
  const { country, language } = useCountryLanguage()

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur-sm dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent',
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation />
      </div>
      <div className="relative flex grow basis-0 items-center">
        <Link href={`/${country}/${language}`} aria-label="Home page">
          <Image
            src={dqosLogo}
            alt="DQoS"
            className="hidden h-9 w-auto fill-slate-700 lg:block dark:fill-sky-100"
          />
        </Link>
      </div>
      <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
        <Search />
      </div>
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow">
        {/* Sélecteur de langue */}
        <LanguageSelector />
        <ThemeSelector className="relative z-10" />
        <Link
          href="https://github.com"
          className="group"
          aria-label="GitHub"
        ></Link>
      </div>
    </header>
  )
}

function LanguageSelector() {
  const { country, language } = useCountryLanguage()
  const pathname = usePathname()

  // Créer les URLs pour changer de langue
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en'
    const newPath = pathname.replace(
      `/${country}/${language}`,
      `/${country}/${newLang}`,
    )
    return newPath
  }

  // Vérifier si le pays supporte plusieurs langues
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

  const supportedLangs = countryLanguages[country] || ['en']
  const showLanguageSelector = supportedLangs.length > 1

  if (!showLanguageSelector) {
    return null
  }

  return (
    <Link
      href={toggleLanguage()}
      className="flex h-6 w-6 items-center justify-center rounded-lg shadow-md ring-1 shadow-black/5 ring-black/5 dark:bg-slate-700 dark:ring-white/5 dark:ring-inset"
      aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
    >
      <span className="text-xs font-medium text-slate-900 dark:text-white">
        {language.toUpperCase()}
      </span>
    </Link>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  const { country, language } = useCountryLanguage()
  let isHomePage = pathname === `/${country}/${language}`

  return (
    <div className="flex w-full flex-col">
      <Header />

      <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute top-16 right-0 bottom-0 hidden h-12 w-px bg-linear-to-t from-slate-800 dark:block" />
          <div className="absolute top-28 right-0 bottom-0 hidden w-px bg-slate-800 dark:block" />
          <div className="sticky top-19 -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-x-hidden overflow-y-auto py-16 pr-8 pl-0.5 xl:w-72 xl:pr-16">
            <Navigation />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
