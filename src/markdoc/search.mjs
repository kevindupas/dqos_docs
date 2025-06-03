// src/markdoc/search.mjs (mise à jour)
import Markdoc from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import glob from 'fast-glob'
import * as fs from 'fs'
import * as path from 'path'
import { createLoader } from 'simple-functional-loader'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const slugify = slugifyWithCounter()

function toString(node) {
  let str =
    node.type === 'text' && typeof node.attributes?.content === 'string'
      ? node.attributes.content
      : ''
  if ('children' in node) {
    for (let child of node.children) {
      str += toString(child)
    }
  }
  return str
}

function extractSections(node, sections, isRoot = true) {
  if (isRoot) {
    slugify.reset()
  }
  if (node.type === 'heading' || node.type === 'paragraph') {
    let content = toString(node).trim()
    if (node.type === 'heading' && node.attributes.level <= 2) {
      let hash = node.attributes?.id ?? slugify(content)
      sections.push([content, hash, []])
    } else {
      sections.at(-1)[2].push(content)
    }
  } else if ('children' in node) {
    for (let child of node.children) {
      extractSections(child, sections, false)
    }
  }
}

export default function withSearch(nextConfig = {}) {
  let cache = new Map()

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: __filename,
        use: [
          createLoader(function () {
            let pagesDir = path.resolve('./src/app/[country]/[lang]')
            this.addContextDependency(pagesDir)

            // Chercher tous les fichiers page.*.md dans tous les dossiers
            let files = glob.sync('**/page.*.md', { cwd: pagesDir })
            let data = {}

            files.forEach((file) => {
              // Extraire la langue du nom de fichier (page.en.md -> en, page.fr.md -> fr)
              let langMatch = file.match(/page\.([a-z]{2})\.md$/)
              if (!langMatch) return

              let lang = langMatch[1]
              let url = file === `page.${lang}.md` 
                ? '/' 
                : `/${file.replace(`/page.${lang}.md`, '')}`
              
              let md = fs.readFileSync(path.join(pagesDir, file), 'utf8')

              let sections

              if (cache.get(file)?.[0] === md) {
                sections = cache.get(file)[1]
              } else {
                let ast = Markdoc.parse(md)
                let title =
                  ast.attributes?.frontmatter?.match(
                    /^title:\s*(.*?)\s*$/m,
                  )?.[1]
                sections = [[title, null, []]]
                extractSections(ast, sections)
                cache.set(file, [md, sections])
              }

              // Organiser les données par langue
              if (!data[lang]) {
                data[lang] = []
              }
              data[lang].push({ url, sections })
            })

            // When this file is imported within the application
            // the following module is loaded:
            return `
              import FlexSearch from 'flexsearch'

              let sectionIndexes = {}
              let allData = ${JSON.stringify(data)}

              // Créer un index de recherche pour chaque langue
              Object.keys(allData).forEach(lang => {
                sectionIndexes[lang] = new FlexSearch.Document({
                  tokenize: 'full',
                  document: {
                    id: 'url',
                    index: 'content',
                    store: ['title', 'pageTitle'],
                  },
                  context: {
                    resolution: 9,
                    depth: 2,
                    bidirectional: true
                  }
                })

                for (let { url, sections } of allData[lang]) {
                  for (let [title, hash, content] of sections) {
                    sectionIndexes[lang].add({
                      url: url + (hash ? ('#' + hash) : ''),
                      title,
                      content: [title, ...content].join('\\n'),
                      pageTitle: hash ? sections[0][0] : undefined,
                    })
                  }
                }
              })

              export function search(query, options = {}, language = 'en') {
                let index = sectionIndexes[language]
                if (!index) {
                  return []
                }
                
                let result = index.search(query, {
                  ...options,
                  enrich: true,
                })
                if (result.length === 0) {
                  return []
                }
                return result[0].result.map((item) => ({
                  url: item.id,
                  title: item.doc.title,
                  pageTitle: item.doc.pageTitle,
                }))
              }
            `
          }),
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}