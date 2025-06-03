// src/lib/navigation.ts - Version corrigée
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
      { title: 'Dashboard Application Installation', titleFr: 'Installation Application Tableau de Bord', href: '/docs/dashboard-application-installation' },
      { title: 'User Complaints', titleFr: 'Plaintes Utilisateurs', href: '/docs/user-complaints' },
      { title: 'Follow Up Complaints', titleFr: 'Suivi des Plaintes', href: '/docs/follow-up-complaints' },
      { title: 'Surveys', titleFr: 'Enquêtes', href: '/docs/surveys' },
      { title: 'Notifications', titleFr: 'Notifications', href: '/docs/notifications' },
      { title: 'Imports Page', titleFr: 'Page d\'Imports', href: '/docs/imports-page' },
      { title: 'Location Manager', titleFr: 'Gestionnaire de Localisation', href: '/docs/location-manager' },
      { title: 'Translation Manager', titleFr: 'Gestionnaire de Traduction', href: '/docs/translation-manager' },
      { title: 'FAQ Manager', titleFr: 'Gestionnaire FAQ', href: '/docs/faq-manager' },
    ],
  },
  {
    title: 'Reporting Builder',
    titleFr: 'Générateur de Rapports',
    links: [
      { title: 'Generate Template', titleFr: 'Générer un Modèle', href: '/docs/generate-template' },
      { title: 'Generate campaign', titleFr: 'Générer une Campagne', href: '/docs/generate-campaign' },
      { title: 'Architecture guide', titleFr: 'Guide d\'Architecture', href: '/docs/architecture-guide' },
      { title: 'Export Report', titleFr: 'Exporter un Rapport', href: '/docs/export-report' },
    ],
  },
  {
    title: 'Support tickets',
    titleFr: 'Tickets de Support',
    links: [
      { title: 'Ticket Management', titleFr: 'Gestion des Tickets', href: '/docs/ticket-management' },
      { title: 'Ticket Creation', titleFr: 'Création de Tickets', href: '/docs/ticket-creation' },
      { title: 'Ticket Tracking', titleFr: 'Suivi des Tickets', href: '/docs/ticket-tracking' },
      { title: 'Ticket Email Notifications', titleFr: 'Notifications Email des Tickets', href: '/docs/ticket-email-notifications' },
    ],
  },
  {
    title: 'Data Management',
    titleFr: 'Gestion des Données',
    links: [
      { title: 'Topology Update Assistant', titleFr: 'Assistant de Mise à Jour Topologique', href: '/docs/topology-update-assistant' },
      { title: 'Operator Management', titleFr: 'Gestion des Opérateurs', href: '/docs/operator-management' },
      { title: 'Problem Management', titleFr: 'Gestion des Problèmes', href: '/docs/problem-management' },
      { title: 'Notification Manager', titleFr: 'Gestionnaire de Notifications', href: '/docs/notification-manager' },
    ],
  },
  {
    title: 'User Management',
    titleFr: 'Gestion des Utilisateurs',
    links: [
      { title: 'Roles', titleFr: 'Rôles', href: '/docs/roles' },
      { title: 'Permissions', titleFr: 'Permissions', href: '/docs/permissions' },
      { title: 'Users', titleFr: 'Utilisateurs', href: '/docs/users' },
    ],
  },
  {
    title: 'Settings',
    titleFr: 'Paramètres',
    links: [
      { title: 'General', titleFr: 'Général', href: '/docs/general-settings' },
      { title: 'Map', titleFr: 'Carte', href: '/docs/map-settings' },
      { title: 'KPIs', titleFr: 'KPIs', href: '/docs/kpi-settings' },
      { title: 'Coverage', titleFr: 'Couverture', href: '/docs/coverage-settings' },
      { title: 'Scoring', titleFr: 'Notation', href: '/docs/scoring-settings' },
      { title: 'RI Settings', titleFr: 'Paramètres RI', href: '/docs/ri-settings' },
      { title: 'Data Source', titleFr: 'Source de Données', href: '/docs/data-source-settings' },
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
      title: language === 'fr' ? ((link as any).titleFr || link.title) : link.title,
      href: link.href === '/' ? `/${country}/${language}` : `/${country}/${language}${link.href}`
    }))
  }))
}

// Garder l'ancienne fonction pour la compatibilité (deprecated)
export function getNavigationWithCountry(country: string) {
  return getNavigationWithCountryAndLanguage(country, 'en')
}