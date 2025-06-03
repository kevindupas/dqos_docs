// next.config.mjs - Correction
import withMarkdoc from '@markdoc/next.js'
import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  
  // IMPORTANT: Forcer l'utilisation de la config Markdoc
  experimental: {
    mdxRs: false, // Désactiver MDX par défaut
  },

  // Gérer les redirections pour les anciennes URLs
  async redirects() {
    const countryDefaultLanguages = {
      'zw': 'en',
      'sz': 'en',
      'ga': 'fr',
      'bw': 'en',
      'gm': 'en',
      'zm': 'en',
      'mz': 'en',
      'bi': 'fr',
    };

    const redirects = [];

    Object.entries(countryDefaultLanguages).forEach(([country, defaultLang]) => {
      redirects.push({
        source: `/${country}`,
        destination: `/${country}/${defaultLang}`,
        permanent: true,
      });
    });

    Object.entries(countryDefaultLanguages).forEach(([country, defaultLang]) => {
      redirects.push({
        source: `/${country}/docs/:path*`,
        destination: `/${country}/${defaultLang}/docs/:path*`,
        permanent: true,
      });
    });

    return redirects;
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/images/:country/:path*',
          destination: '/images/:country/:path*',
        },
      ],
    };
  },

  async headers() {
    return [
      {
        source: '/:country/:lang/:path*',
        headers: [
          {
            key: 'Content-Language',
            value: ':lang',
          },
        ],
      },
    ];
  },
}

// IMPORTANT: L'ordre compte ici !
export default withSearch(
  withMarkdoc({ 
    schemaPath: './src/markdoc',
    mode: 'static' // Force le mode statique
  })(nextConfig),
)