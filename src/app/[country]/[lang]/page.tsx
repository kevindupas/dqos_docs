// src/app/[country]/[lang]/page.tsx
import React from 'react'
import { notFound } from 'next/navigation'
import Markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'
import { transformImageUrls } from '@/markdoc/transformImages'

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

interface PageProps {
  params: {
    country: string
    lang: string
  }
}

async function getPageContent(country: string, lang: string) {
  try {
    if (!countryLanguages[country]?.includes(lang)) {
      return null
    }

    const filePath = path.join(
      process.cwd(),
      'src/app/[country]/[lang]',
      `page.${lang}.md`,
    )

    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`)
      return null
    }

    let fileContent = fs.readFileSync(filePath, 'utf8')

    // Transformation des images si nécessaire
    fileContent = transformImageUrls(fileContent, country)

    const ast = Markdoc.parse(fileContent)

    let frontmatter: { title?: string; description?: string } = {}
    if (ast.attributes.frontmatter) {
      try {
        frontmatter = yaml.load(ast.attributes.frontmatter) || {}
      } catch (error) {
        console.error('Error parsing frontmatter:', error)
      }
    }

    const content = Markdoc.transform(ast)

    return {
      content,
      frontmatter,
    }
  } catch (error) {
    console.error('Error loading page content:', error)
    return null
  }
}

export default async function CountryLanguagePage({ params }: PageProps) {
  const { country, lang } = params

  // Vérifier que la langue est supportée pour ce pays
  if (!countryLanguages[country]?.includes(lang)) {
    notFound()
  }

  const pageData = await getPageContent(country, lang)

  if (!pageData) {
    notFound()
  }

  const { content, frontmatter } = pageData

  return (
    <div className="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
      <article>
        <header className="mb-9 space-y-1">
          <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
            {frontmatter.title || 'DQoS Documentation'}
          </h1>
        </header>

        <div className="prose max-w-none prose-slate dark:text-slate-400 dark:prose-invert">
          {Markdoc.renderers.react(content, React)}
        </div>
      </article>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { country, lang } = params
  const pageData = await getPageContent(country, lang)

  if (!pageData) {
    return {
      title: 'Page Not Found',
    }
  }

  const { frontmatter } = pageData

  return {
    title: frontmatter.title || 'DQoS Documentation',
    description:
      frontmatter.description ||
      'Quality of Service monitoring solution for mobile networks.',
  }
}
