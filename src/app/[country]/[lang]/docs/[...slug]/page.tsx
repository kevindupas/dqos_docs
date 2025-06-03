// src/app/[country]/[lang]/docs/[...slug]/page.tsx - Version corrigée
import React from 'react'
import { notFound } from 'next/navigation'
import Markdoc from '@markdoc/markdoc'
import { DocsLayout } from '@/components/DocsLayout'
import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'
import { transformImageUrls } from '@/markdoc/transformImages'

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
    slug: string[]
  }
}

async function getPageContent(country: string, lang: string, slug: string[]) {
  try {
    if (!countryLanguages[country]?.includes(lang)) {
      return null
    }

    const slugPath = slug.join('/')
    const filePath = path.join(
      process.cwd(),
      'src/app/[country]/[lang]/docs',
      slugPath,
      `page.${lang}.md`,
    )

    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`)
      return null
    }

    let fileContent = fs.readFileSync(filePath, 'utf8')

    // TRANSFORMATION DES IMAGES ICI !
    fileContent = transformImageUrls(fileContent, country)
    console.log(
      'Content after image transformation:',
      fileContent.substring(0, 500),
    )

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
      nodes: ast.children || [],
    }
  } catch (error) {
    console.error('Error loading page content:', error)
    return null
  }
}

export default async function DocsPage({ params }: PageProps) {
  const { country, lang, slug } = params

  const pageData = await getPageContent(country, lang, slug)

  if (!pageData) {
    notFound()
  }

  const { content, frontmatter, nodes } = pageData

  return (
    <DocsLayout frontmatter={frontmatter} nodes={nodes}>
      {Markdoc.renderers.react(content, React)}
    </DocsLayout>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { country, lang, slug } = params
  const pageData = await getPageContent(country, lang, slug)

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

export async function generateStaticParams() {
  const docPages = [
    'login',
    'reset-password',
    'user-profile',
    'two-factor-authentication',
    'scoring',
    'ranking',
    'coverage-vs-qos',
    'antennas-map',
    'surveys',
  ]

  const countries = ['zw', 'sz', 'ga', 'bw', 'gm', 'zm', 'mz', 'bi']
  const params = []

  for (const country of countries) {
    const supportedLangs = countryLanguages[country] || ['en']

    for (const lang of supportedLangs) {
      for (const page of docPages) {
        params.push({
          country,
          lang,
          slug: [page],
        })
      }
    }
  }

  return params
}
