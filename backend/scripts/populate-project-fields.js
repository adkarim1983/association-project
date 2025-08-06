import mongoose from 'mongoose';
import Project from '../models/Project.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Translation data for the new fields - EXACT COPY from src/locales/fr/translation.json
const projectTranslations = {
  "planet_food": {
    "name": "PLANET FOOD",
    "address": "123 Rue de la Food, Casablanca",
    "description": "Le meilleur de la street food dans un cadre convivial.",
    "founder_info": "Hanan Aghriwi, fondatrice du projet Planet Food, est une jeune femme de 28 ans titulaire d'un diplôme en art culinaire. Elle possède plus de 5 ans d'expérience dans ce domaine. Elle a débuté sa carrière professionnelle à domicile, en préparant des repas pour des événements et des fêtes, avec un souci constant d'offrir une qualité irréprochable à des prix abordables. Cela lui a permis de se forger une bonne réputation auprès de ses clients.Elle a choisi le secteur de la restauration rapide en raison de sa passion pour la cuisine et du constat d'une demande croissante pour une nourriture de qualité à prix raisonnable. Pour elle, la qualité et l'accessibilité sont les deux piliers garantissant la réussite d'un projet dans ce domaine. À travers Planet Food, Hanan souhaite offrir une expérience de restauration rapide, savoureuse, accessible à tout moment et en tout lieu, tout en respectant des normes strictes d'hygiène et de qualité.",
    "presentation": "Planet Food est un projet innovant dans le domaine de la restauration rapide. Il vise à proposer des repas légers et rapides à préparer, alliant excellente qualité et prix abordables. Le projet cherche à répondre aux besoins alimentaires de toutes les catégories sociales, en privilégiant des produits sains et sûrs, grâce à une hygiène rigoureuse, une préparation adéquate, et un stockage conforme qui préserve la qualité et la sécurité des ingrédients utilisés.Le projet est implanté dans la préfecture Moulay Rachid – Sidi Othmane, précisément au niveau de la rue Ahmed Rgoub, avec pour objectif de fournir un service rapide et de haute qualité aux consommateurs de cette zone. Par ailleurs, le projet ambitionne de créer quatre emplois locaux, participant ainsi à la stabilité économique des employés et au soutien de l'économie locale. Planet Food, ce n'est pas seulement de la vente de nourriture : c'est une volonté d'offrir une expérience culinaire rapide, agréable et respectueuse des standards les plus élevés.",
    "support": "L'Initiative Nationale pour le Développement Humain (INDH) de la préfecture Moulay Rachid est le principal soutien du projet Planet Food. Elle a joué un rôle clé en apportant un appui financier permettant de réunir les ressources nécessaires à la création et au lancement du projet. En parallèle, la Plateforme des Jeunes a également joué un rôle essentiel.Elle a permis à Hanan d'avoir accès aux opportunités de soutien, en offrant des formations préalables et un accompagnement continu tout au long des phases de planification et d'exécution. Grâce à l'appui de professionnels qualifiés via cette plateforme, Hanan et d'autres jeunes ont bénéficié de formations spécialisées dans divers domaines, renforçant leurs compétences et leur préparation à l'entrepreneuriat. Cet accompagnement global a été décisif pour l'obtention du financement de l'INDH et a grandement contribué à propulser le projet Planet Food vers la réussite.",
    "products": "Planet Food se spécialise dans la restauration rapide et propose une variété de repas légers, notamment des pizzas, tacos, coussamia, sandwichs et jus. L'objectif est de satisfaire tous les goûts et de répondre aux besoins de toutes les tranches d'âge. La qualité est la valeur ajoutée principale du projet. Hanan veille à utiliser des ingrédients frais et des bases saines pour garantir des repas savoureux et sûrs à chaque commande. En plus des plats, le projet propose également des jus naturels rafraîchissants et sains, comme le jus de citron, de carotte, de betterave et de citron vert, tous préparés quotidiennement avec des ingrédients 100 % naturels, enrichissant ainsi l'expérience client. Grâce à cette offre, Planet Food ambitionne de fournir des repas à la fois rapides et nutritifs, tout en respectant les plus hauts standards de qualité, ce qui en fait un choix de prédilection pour les consommateurs à la recherche d'une expérience culinaire unique.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm pour l'inclusion économique des jeunes"
  },
  "alphacom": {
    "name": "Alphacom",
    "address": "456 Avenue du Digital, Casablanca",
    "description": "Agence de marketing digital pour booster votre présence en ligne.",
    "founder_info": "L'équipe d'Alphacom est composée de jeunes professionnels passionnés par le marketing digital et les nouvelles technologies. Avec plus de 3 ans d'expérience dans le domaine, ils ont choisi de se spécialiser dans l'accompagnement des entreprises locales pour développer leur présence numérique. Leur mission est d'offrir des solutions marketing innovantes et accessibles à tous types d'entreprises.",
    "presentation": "Alphacom est une agence spécialisée dans le marketing digital qui vise à accompagner les entreprises dans leur transformation numérique. Le projet propose des services complets incluant la création de sites web, la gestion des réseaux sociaux, le référencement SEO et les campagnes publicitaires en ligne. L'objectif est de permettre aux entreprises locales de développer leur visibilité et d'atteindre de nouveaux clients grâce aux outils numériques.",
    "support": "Le projet Alphacom bénéficie du soutien de l'Initiative Nationale pour le Développement Humain (INDH) et de la Plateforme des Jeunes Irchad. Cet accompagnement inclut une formation spécialisée en marketing digital, un soutien financier pour l'acquisition d'équipements informatiques et un coaching personnalisé pour le développement commercial.",
    "products": "Alphacom propose une gamme complète de services digitaux : création et développement de sites web, gestion des réseaux sociaux (Facebook, Instagram, LinkedIn), campagnes publicitaires Google Ads et Facebook Ads, optimisation SEO, création de contenu visuel et rédactionnel, formation des équipes aux outils numériques.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm pour l'inclusion économique des jeunes, Chambres de commerce locales"
  },
  "pixel_prod": {
    "name": "Pixel Prod",
    "founder_info": "L'équipe de Pixel Prod est constituée de designers graphiques créatifs et passionnés, spécialisés dans la communication visuelle. Avec une formation en arts appliqués et plusieurs années d'expérience dans le domaine du design, ils se sont lancés dans ce projet pour offrir des solutions créatives aux entreprises et particuliers de la région.",
    "presentation": "Pixel Prod est un studio de design graphique et de production visuelle qui accompagne les entreprises dans leur communication visuelle. Le studio propose des services créatifs complets, de la conception à la réalisation, en passant par l'impression et la production multimédia.",
    "support": "Pixel Prod a été soutenu par l'INDH dans le cadre du programme d'appui aux jeunes entrepreneurs. Le projet a également bénéficié de l'accompagnement de la Plateforme des Jeunes pour le développement des compétences techniques et commerciales.",
    "products": "Services de design graphique : création de logos, identité visuelle, supports de communication, affiches, brochures, packaging, design web, production audiovisuelle, photographie professionnelle.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm"
  },
  "az_event_733": {
    "name": "AZ Event 733",
    "founder_info": "L'équipe d'AZ Event 733 est composée d'organisateurs d'événements expérimentés, passionnés par la création d'expériences mémorables. Avec plusieurs années d'expérience dans l'événementiel, ils se sont spécialisés dans l'organisation d'événements corporatifs et privés de haute qualité.",
    "presentation": "AZ Event 733 est une agence d'organisation d'événements spécialisée dans la création d'expériences sur mesure. L'agence accompagne ses clients dans la conception et la réalisation d'événements professionnels et privés, en proposant des solutions créatives et personnalisées.",
    "support": "Le projet AZ Event 733 a été accompagné par l'INDH et la Plateforme des Jeunes Irchad. Le soutien a inclus des formations en gestion d'événements et un appui financier pour l'acquisition d'équipements événementiels.",
    "products": "Organisation d'événements : événements corporatifs, lancements de produits, conférences, séminaires, mariages, anniversaires, fêtes privées, location de matériel événementiel, services de traiteur.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm"
  },
  "erregyby_event": {
    "name": "ERREGYBY EVENT",
    "founder_info": "Rachid, fondateur d'ERREGYBY EVENT, est un entrepreneur de 32 ans spécialisé dans l'événementiel corporate. Fort de son expérience en communication d'entreprise et en marketing événementiel, il a créé cette agence pour répondre aux besoins spécifiques des entreprises en matière d'organisation d'événements professionnels et de communication corporate.",
    "presentation": "ERREGYBY EVENT est une agence spécialisée dans l'organisation d'événements d'entreprise et de lancements de produits. L'agence propose des solutions complètes pour les entreprises souhaitant organiser des événements professionnels de qualité, en mettant l'accent sur la communication corporate et l'impact marketing.",
    "support": "ERREGYBY EVENT a bénéficié du soutien de l'INDH pour son développement. L'accompagnement a inclus des formations en gestion d'entreprise et en marketing événementiel, ainsi qu'un soutien financier pour l'acquisition d'équipements professionnels.",
    "products": "Organisation d'événements d'entreprise : lancements de produits, conférences, séminaires, team building, événements de networking, communication corporate, services de production audiovisuelle.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm"
  },
  "snack_yacout": {
    "name": "Snack Yacout",
    "founder_info": "Yacout, fondateur du Snack Yacout, est un entrepreneur de 35 ans qui a identifié un besoin de restauration de qualité dans la zone industrielle. Fort de son expérience dans la restauration et de sa connaissance des besoins des travailleurs, il a créé ce concept pour offrir des repas rapides, nutritifs et abordables aux employés de la zone industrielle.",
    "presentation": "Snack Yacout est un établissement de restauration rapide situé dans la zone industrielle, spécialement conçu pour répondre aux besoins des travailleurs. Le snack propose des repas équilibrés, rapides et abordables, adaptés aux horaires et aux contraintes des employés de la zone industrielle.",
    "support": "Le projet Snack Yacout a été soutenu par l'INDH dans le cadre du programme d'appui aux projets générateurs de revenus. L'accompagnement a inclus des formations en gestion de restaurant et un soutien financier pour l'aménagement du local.",
    "products": "Restauration rapide : sandwichs, plats du jour, salades, boissons, petits déjeuners, repas à emporter, service de livraison pour les entreprises de la zone industrielle.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm"
  },
  "foratino": {
    "name": "Foratino",
    "founder_info": "Antonio, fondateur de Foratino, est un chef italien de 34 ans passionné par la cuisine méditerranéenne authentique. Formé dans les meilleures écoles culinaires d'Italie, il a immigré au Maroc avec le rêve de partager les saveurs authentiques de son pays natal. Son expertise en cuisine italienne traditionnelle et sa passion pour les produits de qualité font de Foratino une référence en matière de cuisine italienne au Maroc.",
    "presentation": "Foratino est une pizzeria et restaurant italien qui propose une cuisine méditerranéenne authentique. Le restaurant se distingue par la qualité de ses ingrédients importés d'Italie et par le savoir-faire traditionnel de son chef, offrant une expérience culinaire italienne authentique au cœur de Casablanca.",
    "support": "Foratino a bénéficié du soutien de l'INDH pour son installation au Maroc. L'accompagnement a inclus des formations en gestion de restaurant et un soutien pour l'obtention des autorisations nécessaires à l'ouverture du restaurant.",
    "products": "Cuisine italienne : pizzas artisanales, pâtes fraîches, risottos, antipasti, desserts italiens, vins italiens, service de livraison, organisation d'événements culinaires.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm"
  },
  "om_ali_food": {
    "name": "Om Ali Food",
    "founder_info": "Aïcha, connue sous le nom d'Om Ali, est une cuisinière traditionnelle de 45 ans reconnue dans son quartier pour ses spécialités orientales authentiques. Héritière des secrets culinaires familiaux, elle a transformé sa passion pour la cuisine traditionnelle en entreprise, en proposant des plats faits maison avec amour et authenticité, perpétuant ainsi les traditions culinaires orientales.",
    "presentation": "Om Ali Food est un établissement spécialisé dans les spécialités orientales et la cuisine maison. Le restaurant propose des plats traditionnels préparés selon les recettes familiales transmises de génération en génération, offrant une expérience culinaire authentique et chaleureuse.",
    "support": "Om Ali Food a été soutenu par l'INDH dans le cadre du programme d'appui aux femmes entrepreneures. L'accompagnement a inclus des formations en gestion d'entreprise et un soutien financier pour l'aménagement de la cuisine et l'acquisition d'équipements.",
    "products": "Spécialités orientales : couscous, tajines, pastillas, pâtisseries orientales, plats traditionnels, service traiteur pour événements, cours de cuisine traditionnelle.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm"
  },
  "wafae_el_hana": {
    "name": "Wafae El Hana",
    "founder_info": "Wafae, fondatrice de Wafae El Hana, est une pâtissière traditionnelle de 38 ans spécialisée dans les douceurs marocaines et orientales. Formée par les meilleures pâtissières traditionnelles et enrichie par des formations modernes, elle maîtrise l'art délicat de la pâtisserie orientale. Sa passion pour les sucreries traditionnelles et son talent créatif font de sa pâtisserie une référence dans le quartier.",
    "presentation": "Wafae El Hana est une pâtisserie spécialisée dans les douceurs marocaines et orientales. L'établissement propose une large gamme de pâtisseries traditionnelles préparées selon les méthodes artisanales, alliant tradition et innovation pour offrir des créations uniques et savoureuses.",
    "support": "Wafae El Hana a bénéficié du soutien de l'INDH dans le cadre du programme d'appui aux femmes entrepreneures. L'accompagnement a inclus des formations en pâtisserie moderne et un soutien financier pour l'acquisition d'équipements de pâtisserie professionnels.",
    "products": "Pâtisseries orientales : chebakia, makroudh, cornes de gazelle, baklawa, ma'amoul, gâteaux de mariage, commandes personnalisées, service traiteur pour événements.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm"
  },
  "doja_event": {
    "name": "Doja Event",
    "founder_info": "L'équipe de Doja Event est composée d'organisateurs d'événements créatifs et expérimentés, spécialisés dans la création d'expériences événementielles uniques et mémorables. Avec une passion pour l'innovation et l'art événementiel, ils s'attachent à transformer chaque événement en une expérience extraordinaire adaptée aux besoins spécifiques de chaque client.",
    "presentation": "Doja Event est une agence d'organisation d'événements créatifs et personnalisés. L'agence se spécialise dans la création d'expériences événementielles uniques, en proposant des concepts innovants et des réalisations sur mesure pour tous types d'événements.",
    "support": "Doja Event a été accompagné par l'INDH et la Plateforme des Jeunes Irchad. Le soutien a inclus des formations en créativité événementielle et un appui financier pour l'acquisition d'équipements de décoration et de sonorisation.",
    "products": "Organisation d'événements créatifs : événements thématiques, installations artistiques, événements culturels, festivals, expositions, événements de mode, services de décoration créative.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm"
  },
  "mohcin_najmi_production": {
    "name": "Mohcin Najmi Production",
    "founder_info": "Mohcin Najmi est un jeune créateur de contenu et spécialiste en marketing digital, passionné par la production audiovisuelle et la communication créative. Avec une formation en communication et une expérience dans la création de contenu digital, il s'est spécialisé dans la production de contenus visuels impactants pour les réseaux sociaux et les campagnes marketing.",
    "presentation": "Mohcin Najmi Production est un studio de production de contenu digital et de marketing créatif. Le studio accompagne les entreprises et les particuliers dans la création de contenus visuels et audiovisuels pour les réseaux sociaux, les campagnes marketing et la communication digitale.",
    "support": "Mohcin Najmi Production a bénéficié du soutien de l'INDH pour son développement. L'accompagnement a inclus des formations en production audiovisuelle et un soutien financier pour l'acquisition d'équipements de production professionnels.",
    "products": "Production de contenu digital : vidéos promotionnelles, contenus pour réseaux sociaux, photographie professionnelle, montage vidéo, animation graphique, campagnes marketing créatives.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm"
  }
};

// Function to connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/association_najm');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Function to populate project fields
async function populateProjectFields() {
  try {
    console.log('🚀 Starting project fields population...');
    
    let updatedCount = 0;
    let notFoundCount = 0;
    
    // Iterate through each project in the translation data
    for (const [projectKey, projectData] of Object.entries(projectTranslations)) {
      try {
        // Find project by name (case-insensitive)
        const project = await Project.findOne({ 
          name: { $regex: new RegExp('^' + projectData.name + '$', 'i') }
        });
        
        if (project) {
          // Update the project with new fields
          const updateData = {
            founder_info: projectData.founder_info || '',
            presentation: projectData.presentation || '',
            support: projectData.support || '',
            products: projectData.products || '',
            partners: projectData.partners || ''
          };
          
          await Project.findByIdAndUpdate(project._id, updateData, { new: true });
          
          console.log(`✅ Updated project: ${projectData.name}`);
          updatedCount++;
        } else {
          console.log(`⚠️  Project not found: ${projectData.name}`);
          notFoundCount++;
        }
      } catch (error) {
        console.error(`❌ Error updating project ${projectData.name}:`, error.message);
      }
    }
    
    console.log('\n📊 Population Summary:');
    console.log(`✅ Projects updated: ${updatedCount}`);
    console.log(`⚠️  Projects not found: ${notFoundCount}`);
    console.log(`📝 Total projects processed: ${Object.keys(projectTranslations).length}`);
    
    // Display current projects in database for verification
    const allProjects = await Project.find({}, 'name founder_info presentation support products partners').limit(5);
    console.log('\n📋 Sample of updated projects:');
    allProjects.forEach(project => {
      console.log(`\n🏢 ${project.name}:`);
      console.log(`   - Founder Info: ${project.founder_info ? '✅ Set' : '❌ Empty'}`);
      console.log(`   - Presentation: ${project.presentation ? '✅ Set' : '❌ Empty'}`);
      console.log(`   - Support: ${project.support ? '✅ Set' : '❌ Empty'}`);
      console.log(`   - Products: ${project.products ? '✅ Set' : '❌ Empty'}`);
      console.log(`   - Partners: ${project.partners ? '✅ Set' : '❌ Empty'}`);
    });
    
  } catch (error) {
    console.error('❌ Error during population:', error);
    throw error;
  }
}

// Function to create missing projects (optional)
async function createMissingProjects() {
  console.log('\n🔍 Checking for missing projects...');
  
  for (const [projectKey, projectData] of Object.entries(projectTranslations)) {
    const existingProject = await Project.findOne({ 
      name: { $regex: new RegExp('^' + projectData.name + '$', 'i') }
    });
    
    if (!existingProject) {
      console.log(`📝 Creating missing project: ${projectData.name}`);
      
      // Create basic project structure with required fields
      const newProject = new Project({
        name: projectData.name,
        category: 'Restauration', // Default category, can be updated
        location: 'Casablanca', // Default location, can be updated
        coordinates: { lat: 33.5731, lng: -7.5898 }, // Default Casablanca coordinates
        address: projectData.address || 'Adresse à définir',
        description: projectData.description || 'Description à définir',
        founder_info: projectData.founder_info || '',
        presentation: projectData.presentation || '',
        support: projectData.support || '',
        products: projectData.products || '',
        partners: projectData.partners || '',
        status: 'active'
      });
      
      await newProject.save();
      console.log(`✅ Created project: ${projectData.name}`);
    }
  }
}

// Main execution function
async function main() {
  try {
    await connectDB();
    
    console.log('🎯 Project Fields Population Script');
    console.log('=====================================\n');
    
    // Populate existing projects
    await populateProjectFields();
    
    // Optionally create missing projects
    const createMissing = process.argv.includes('--create-missing');
    if (createMissing) {
      await createMissingProjects();
    } else {
      console.log('\n💡 Tip: Use --create-missing flag to create projects that don\'t exist in the database');
    }
    
    console.log('\n🎉 Script completed successfully!');
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { populateProjectFields, projectTranslations };
