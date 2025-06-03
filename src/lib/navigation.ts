export const navigation = [
  {
    title: 'Introduction',
    titleFr: 'Introduction',
    links: [
      { title: 'DQoS Overview', titleFr: 'Aperçu DQoS', href: '/' },
    ],
  },
  {
    title: 'Login',
    titleFr: 'Connexion',
    links: [
      { title: 'Login', titleFr: 'Connexion', href: '/docs/login' },
      {
        title: 'Reset Password',
        titleFr: 'Réinitialiser le mot de passe',
        href: '/docs/reset-password',
      },
      { title: 'User Profile', titleFr: 'Profil utilisateur', href: '/docs/user-profile' },
      {
        title: 'Two-Factor Authentication',
        titleFr: 'Authentification à deux facteurs',
        href: '/docs/two-factor-authentication',
      },
    ],
  },
  {
    title: 'NMS Views',
    titleFr: 'Vues NMS',
    links: [
      { title: 'PM Data Availability', titleFr: 'Disponibilité des données PM', href: '/docs/pm-data-availability' },
      { title: 'RI Capture Duration', titleFr: 'Durée de capture RI', href: '/docs/ri-capture-duration' },
      { title: 'NMS Summary', titleFr: 'Résumé NMS', href: '/docs/nms-summary' },
      { title: 'NMS Details', titleFr: 'Détails NMS', href: '/docs/nms-details' },
      { title: 'NMS Benchmark', titleFr: 'Benchmark NMS', href: '/docs/nms-benchmark' },
      {
        title: 'Scoring',
        titleFr: 'Notation',
        href: '/docs/scoring',
      },
      {
        title: 'Ranking',
        titleFr: 'Classement',
        href: '/docs/ranking',
      },
      {
        title: 'Coverage VS QoS',
        titleFr: 'Couverture VS QoS',
        href: '/docs/coverage-vs-qos',
      },
      {
        title: 'Antennas Map',
        titleFr: 'Carte des antennes',
        href: '/docs/antennas-map',
      },
    ],
  },
  {
    title: 'User Feedback',
    titleFr: 'Feedback utilisateur',
    links: [
      { title: 'Dashboard Application Installation', href: '/docs/dashboard-application-installation' },
      { title: 'User Complaints', href: '/docs/user-complaints' },
      { title: 'Follow Up Complaints', href: '/docs/follow-up-complaints' },
      { title: 'Surveys', href: '/docs/surveys' },
      { title: 'Notifications', href: '/docs/notifications' },
      { title: 'Imports Page', href: '/docs/imports-page' },
      { title: 'Location Manager', href: '/docs/location-manager' },
      { title: 'Translation Manager', href: '/docs/translation-manager' },
      { title: 'FAQ Manager', href: '/docs/faq-manager' },
    ],
  },
  {
    title: 'Reporting Builder',
    links: [
      { title: 'Generate Template', href: '/docs/generate-template' },
      { title: 'Generate campaign', href: '/docs/generate-campaign' },
      { title: 'Architecture guide', href: '/docs/architecture-guide' },
      { title: 'Export Report', href: '/docs/export-report' },
    ],
  },
  {
    title: 'Support tickets',
    links: [
      { title: 'Ticket Management', href: '/docs/ticket-management' },
      { title: 'Ticket Creation', href: '/docs/ticket-creation' },
      { title: 'Ticket Tracking', href: '/docs/ticket-tracking' },
      { title: 'Ticket Email Notifications', href: '/docs/ticket-email-notifications' },
    ],
  },
  {
    title: 'Data Management',
    links: [
      { title: 'Topology Update Assistant', href: '/docs/topology-update-assistant' },
      { title: 'Operator Management', href: '/docs/operator-management' },
      { title: 'Problem Management', href: '/docs/problem-management' },
      { title: 'Notification Manager', href: '/docs/notification-manager' },
    ],
  },
  {
    title: 'User Management',
    links: [
      { title: 'Roles', href: '/docs/roles' },
      { title: 'Permissions', href: '/docs/permissions' },
      { title: 'Users', href: '/docs/users' },
    ],
  },
  {
    title: 'Settings',
    links: [
      { title: 'General', href: '/docs/general-settings' },
      { title: 'Map', href: '/docs/map-settings' },
      { title: 'KPIs', href: '/docs/kpi-settings' },
      { title: 'Coverage', href: '/docs/coverage-settings' },
      { title: 'Scoring', href: '/docs/scoring-settings' },
      { title: 'RI Settings', href: '/docs/ri-settings' },
      { title: 'Data Source', href: '/docs/data-source-settings' },
    ],
  },
]

// Fonction utilitaire pour obtenir les liens de navigation avec le country code et la langue
export function getNavigationWithCountryAndLanguage(country: string, language: string) {
  return navigation.map(section => ({
    ...section,
    title: language === 'fr' ? (section.titleFr || section.title) : section.title,
    links: section.links.map(link => ({
      ...link,
      title: language === 'fr' ? (link.titleFr || link.title) : link.title,
      href: link.href === '/' ? `/${country}/${language}` : `/${country}/${language}${link.href}`
    }))
  }))
}

// Garder l'ancienne fonction pour la compatibilité (deprecated)
export function getNavigationWithCountry(country: string) {
  return getNavigationWithCountryAndLanguage(country, 'en')
}