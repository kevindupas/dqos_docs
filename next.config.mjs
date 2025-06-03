// next.config.mjs (mise à jour)
import withMarkdoc from '@markdoc/next.js'
import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  
  // Gérer les redirections pour les anciennes URLs
  async redirects() {
    // Configuration des langues par défaut pour chaque pays
    const countryDefaultLanguages = {
      'zw': 'en',  // Zimbabwe -> Anglais
      'sz': 'en',  // Eswatini -> Anglais  
      'ga': 'fr',  // Gabon -> Français
      'bw': 'en',  // Botswana -> Anglais
      'gm': 'en',  // Gambie -> Anglais
      'zm': 'en',  // Zambie -> Anglais
      'mz': 'en',  // Mozambique -> Anglais
      'bi': 'fr',  // Burundi -> Français
    };

    const redirects = [];

    // Redirection de /:country vers /:country/:defaultLang
    Object.entries(countryDefaultLanguages).forEach(([country, defaultLang]) => {
      redirects.push({
        source: `/${country}`,
        destination: `/${country}/${defaultLang}`,
        permanent: true,
      });
    });

    // Redirection de /:country/docs/* vers /:country/:defaultLang/docs/*
    Object.entries(countryDefaultLanguages).forEach(([country, defaultLang]) => {
      redirects.push({
        source: `/${country}/docs/:path*`,
        destination: `/${country}/${defaultLang}/docs/:path*`,
        permanent: true,
      });
    });

    return redirects;
  },

  // Gérer les rewrites pour une meilleure compatibilité
  async rewrites() {
    return {
      beforeFiles: [
        // Permettre l'accès direct aux images par pays
        {
          source: '/images/:country/:path*',
          destination: '/images/:country/:path*',
        },
      ],
    };
  },

  // Configuration des headers pour le SEO multilingue
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

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig),
)