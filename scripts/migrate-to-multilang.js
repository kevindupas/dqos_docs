// scripts/migrate-to-multilang.js
const fs = require('fs');
const path = require('path');

const sourceDir = 'src/app/[country]';
const targetDir = 'src/app/[country]/[lang]';

// Configuration des langues par défaut pour chaque type de contenu
const defaultLanguage = 'en';

function migrateFiles() {
  // Créer la structure de dossiers cible
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Fonction récursive pour traiter les dossiers
  function processDirectory(srcPath, destPath) {
    const items = fs.readdirSync(srcPath);
    
    items.forEach(item => {
      const srcItemPath = path.join(srcPath, item);
      const destItemPath = path.join(destPath, item);
      const stat = fs.statSync(srcItemPath);
      
      if (stat.isDirectory()) {
        // Créer le dossier dans la destination
        if (!fs.existsSync(destItemPath)) {
          fs.mkdirSync(destItemPath, { recursive: true });
        }
        // Traiter récursivement
        processDirectory(srcItemPath, destItemPath);
      } else if (item === 'page.md') {
        // Renommer page.md en page.en.md
        const content = fs.readFileSync(srcItemPath, 'utf8');
        const newFileName = `page.${defaultLanguage}.md`;
        const newFilePath = path.join(destPath, newFileName);
        
        console.log(`Migrating: ${srcItemPath} -> ${newFilePath}`);
        fs.writeFileSync(newFilePath, content);
        
        // Créer un template pour la version française
        const frFileName = `page.fr.md`;
        const frFilePath = path.join(destPath, frFileName);
        
        // Créer un template de base pour la traduction française
        const frTemplate = createFrenchTemplate(content);
        fs.writeFileSync(frFilePath, frTemplate);
        
        console.log(`Created French template: ${frFilePath}`);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        // Copier les autres fichiers TypeScript/JavaScript
        const content = fs.readFileSync(srcItemPath, 'utf8');
        fs.writeFileSync(destItemPath, content);
        console.log(`Copied: ${srcItemPath} -> ${destItemPath}`);
      }
    });
  }

  // Démarrer la migration
  processDirectory(sourceDir, targetDir);
  
  console.log('Migration completed!');
  console.log('Remember to:');
  console.log('1. Update imports in your components');
  console.log('2. Translate content in *.fr.md files');
  console.log('3. Update navigation translations');
  console.log('4. Test the new structure');
}

function createFrenchTemplate(englishContent) {
  // Extraire les métadonnées et créer un template français
  const frontmatterMatch = englishContent.match(/^---\n([\s\S]*?)\n---/);
  let frenchContent = englishContent;
  
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    
    // Traduire quelques termes communs dans les métadonnées
    const translatedFrontmatter = frontmatter
      .replace(/title:\s*"?([^"]*)"?/g, (match, title) => {
        const frenchTitle = translateTitle(title);
        return `title: "${frenchTitle}"`;
      })
      .replace(/description:\s*"?([^"]*)"?/g, (match, desc) => {
        const frenchDesc = translateDescription(desc);
        return `description: "${frenchDesc}"`;
      });
    
    frenchContent = englishContent.replace(frontmatterMatch[0], `---\n${translatedFrontmatter}\n---`);
  }
  
  // Ajouter un commentaire d'aide
  const helpComment = `\n<!-- TODO: Traduire ce contenu en français -->\n<!-- Cette page nécessite une traduction complète -->\n\n`;
  
  return frenchContent.replace(/^(---[\s\S]*?---\n)/, `$1${helpComment}`);
}

function translateTitle(title) {
  const translations = {
    'Login': 'Connexion',
    'Reset Password': 'Réinitialiser le mot de passe',
    'User Profile': 'Profil utilisateur',
    'Two-Factor Authentication': 'Authentification à deux facteurs',
    'DQoS Overview': 'Aperçu DQoS',
    'Installation': 'Installation',
    'Testing': 'Tests',
    'Writing plugins': 'Écriture de plugins',
    'Design principles': 'Principes de conception',
    'Architecture guide': 'Guide d\'architecture',
  };
  
  return translations[title] || `${title} (À traduire)`;
}

function translateDescription(desc) {
  const translations = {
    'Access the DQoS platform with your credentials.': 'Accédez à la plateforme DQoS avec vos identifiants.',
    'Instructions to reset your DQoS account password.': 'Instructions pour réinitialiser votre mot de passe DQoS.',
    'Quality of Service monitoring solution for mobile networks.': 'Solution de surveillance de la qualité de service pour les réseaux mobiles.',
  };
  
  return translations[desc] || `${desc} (À traduire)`;
}

// Exécuter la migration
if (require.main === module) {
  migrateFiles();
}

module.exports = { migrateFiles };