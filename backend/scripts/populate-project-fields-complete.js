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
    "address": "321 Rue du Design, Casablanca",
    "description": "Studio de design graphique et production visuelle.",
    "founder_info": "L'équipe de Pixel Prod est constituée de designers graphiques créatifs et passionnés, spécialisés dans la communication visuelle. Avec une formation en arts appliqués et plusieurs années d'expérience dans le domaine du design, ils se sont lancés dans ce projet pour offrir des solutions créatives aux entreprises et particuliers de la région.",
    "presentation": "Pixel Prod est un studio de design graphique qui propose des services de création visuelle pour tous types de supports. Le projet vise à accompagner les entreprises dans leur communication visuelle en créant des identités graphiques, des supports de communication et des contenus visuels impactants. L'objectif est de démocratiser l'accès au design de qualité pour les petites et moyennes entreprises.",
    "support": "Le studio bénéficie du soutien de l'INDH pour l'acquisition d'équipements professionnels et de logiciels de design. La Plateforme des Jeunes a également fourni une formation en gestion d'entreprise créative et un accompagnement dans le développement du portefeuille client.",
    "products": "Pixel Prod propose la création de logos et identités visuelles, la conception de supports print (flyers, brochures, cartes de visite), le design web et digital, la création d'illustrations personnalisées, la retouche photo professionnelle et la conception d'emballages produits.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm, Imprimeries locales, Agences de communication"
  },
  "az_event_733": {
    "name": "AZ Event 733",
    "address": "987 Place de la Fête, Casablanca",
    "description": "Organisation d'événements sur mesure pour professionnels et particuliers.",
    "founder_info": "L'équipe d'AZ Event 733 est composée d'organisateurs d'événements expérimentés, passionnés par la création d'expériences mémorables. Avec plusieurs années d'expérience dans l'événementiel, ils se sont spécialisés dans l'organisation d'événements corporatifs et privés de haute qualité.",
    "presentation": "AZ Event 733 est une agence événementielle complète qui propose des services d'organisation d'événements sur mesure. Le projet vise à accompagner clients particuliers et entreprises dans la conception et la réalisation de leurs événements, en offrant une approche personnalisée et un service de qualité premium.",
    "support": "L'agence bénéficie du soutien de l'INDH et de la Plateforme des Jeunes pour le développement de son réseau de fournisseurs et l'acquisition de matériel événementiel. Un accompagnement en gestion commerciale et marketing a également été fourni.",
    "products": "AZ Event 733 propose l'organisation de mariages, séminaires d'entreprise, lancements de produits, conférences, soirées de gala, anniversaires, et offre des services de location de matériel, décoration, traiteur, animation et coordination le jour J.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm, Traiteurs, Décorateurs, Salles de réception"
  },
  "erregyby_event": {
    "name": "ERREGYBY EVENT",
    "address": "789 Boulevard des Célébrations, Casablanca",
    "description": "Organisation d'événements d'entreprise et de lancements de produits.",
    "founder_info": "Rachid, fondateur d'ERREGYBY EVENT, est un entrepreneur de 32 ans spécialisé dans l'événementiel corporate. Fort de son expérience en communication d'entreprise et en marketing événementiel, il a créé cette agence pour répondre aux besoins spécifiques des entreprises en matière d'organisation d'événements professionnels et de communication corporate.",
    "presentation": "ERREGYBY EVENT est une agence spécialisée dans l'organisation d'événements corporate et de lancements de produits. Le projet vise à accompagner les entreprises dans la communication événementielle en créant des expériences uniques qui renforcent leur image de marque et fidélisent leur clientèle. L'objectif est de devenir le partenaire privilégié des entreprises pour tous leurs besoins événementiels.",
    "support": "L'agence bénéficie du soutien financier de l'INDH pour l'acquisition d'équipements audiovisuels et de matériel événementiel. La Plateforme des Jeunes a fourni une formation en communication d'entreprise et un accompagnement dans le développement de partenariats stratégiques.",
    "products": "ERREGYBY EVENT propose l'organisation de lancements de produits, séminaires d'entreprise, conférences, team building, soirées de gala, événements de networking, ainsi que des services de communication événementielle, location d'équipements et coordination technique.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm, Centres de conférences, Entreprises de communication"
  },
  "snack_yacout": {
    "name": "Snack Yacout",
    "address": "654 Avenue Industrielle, Casablanca",
    "description": "Restauration rapide pour les travailleurs de la zone industrielle.",
    "founder_info": "Yacout, fondateur du Snack Yacout, est un entrepreneur de 35 ans qui a identifié un besoin de restauration de qualité dans la zone industrielle. Fort de son expérience dans la restauration et de sa connaissance des besoins des travailleurs, il a créé ce concept pour offrir des repas rapides, nutritifs et abordables aux employés de la zone industrielle.",
    "presentation": "Snack Yacout est un établissement de restauration rapide stratégiquement situé dans la zone industrielle pour servir les travailleurs et employés du secteur. Le projet vise à fournir des repas équilibrés, rapides et abordables, en s'adaptant aux horaires et contraintes des travailleurs industriels tout en maintenant une qualité constante.",
    "support": "Le projet bénéficie du soutien de l'INDH pour l'équipement de la cuisine et l'aménagement de l'espace de restauration. Un accompagnement spécialisé a été fourni pour répondre aux normes d'hygiène spécifiques à la restauration collective et industrielle.",
    "products": "Snack Yacout propose des menus ouvriers équilibrés, sandwichs garnis, plats du jour, soupes chaudes, salades, boissons énergisantes, cafés et thés, avec un service de restauration rapide adapté aux horaires de travail et des tarifs préférentiels pour les groupes.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm, Entreprises de la zone industrielle"
  },
  "foratino": {
    "name": "Foratino",
    "address": "123 Rue de l'Italie, Casablanca",
    "description": "Pizzeria et restaurant italien.",
    "founder_info": "Antonio, fondateur de Foratino, est un chef italien de 34 ans passionné par la cuisine méditerranéenne authentique. Formé dans les meilleures écoles culinaires d'Italie, il a immigré au Maroc avec le rêve de partager les saveurs authentiques de son pays natal. Son expertise en cuisine italienne traditionnelle et sa passion pour les produits de qualité font de Foratino une référence en matière de cuisine italienne au Maroc.",
    "presentation": "Foratino est une pizzeria-restaurant italien qui propose une cuisine méditerranéenne authentique dans une ambiance chaleureuse. Le projet vise à offrir une expérience culinaire italienne complète, des pizzas cuites au feu de bois aux pâtes fraîches, en utilisant des ingrédients importés d'Italie et des techniques traditionnelles de préparation.",
    "support": "Foratino bénéficie du soutien de l'INDH pour l'acquisition d'un four à pizza traditionnel et l'aménagement du restaurant dans le style italien. Un accompagnement spécialisé en importation de produits alimentaires et en gestion de restaurant thématique a également été fourni.",
    "products": "Foratino propose des pizzas artisanales cuites au feu de bois, pâtes fraîches maison, risottos, antipasti italiens, tiramisus et gelatos artisanaux, vins italiens sélectionnés, ainsi que des menus dégustation et des soirées thématiques italiennes.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm, Importateurs de produits italiens, Chambre de commerce italo-marocaine"
  },
  "om_ali_food": {
    "name": "Om Ali Food",
    "address": "789 Boulevard El Harouiyine, Casablanca",
    "description": "Spécialités orientales et cuisine maison.",
    "founder_info": "Aïcha, connue sous le nom d'Om Ali, est une cuisinière traditionnelle de 45 ans reconnue dans son quartier pour ses spécialités orientales authentiques. Héritière des secrets culinaires familiaux, elle a transformé sa passion pour la cuisine traditionnelle en entreprise, en proposant des plats faits maison avec amour et authenticité, perpétuant ainsi les traditions culinaires orientales.",
    "presentation": "Om Ali Food est un établissement spécialisé dans la cuisine orientale traditionnelle et les plats faits maison. Le projet vise à préserver et transmettre l'art culinaire oriental authentique, en proposant des plats préparés selon les recettes ancestrales dans le respect des traditions et avec des ingrédients naturels de qualité.",
    "support": "Om Ali Food bénéficie du soutien de l'INDH pour l'équipement de la cuisine traditionnelle et la formation en gestion de petite entreprise alimentaire. Un accompagnement spécialisé en hygiène alimentaire et en valorisation du patrimoine culinaire a également été fourni.",
    "products": "Om Ali Food propose des plats orientaux traditionnels, couscous aux légumes de saison, tajines familiaux, soupes traditionnelles, pâtisseries orientales faites maison, conserves et confitures artisanales, ainsi que des plateaux repas pour événements familiaux.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm, Coopératives de femmes rurales, Producteurs locaux"
  },
  "wafae_el_hana": {
    "name": "Wafae El Hana",
    "address": "654 Avenue El Rajae, Casablanca",
    "description": "Pâtisserie marocaine et orientale.",
    "founder_info": "Wafae, fondatrice de Wafae El Hana, est une pâtissière traditionnelle de 38 ans spécialisée dans les douceurs marocaines et orientales. Formée par les meilleures pâtissières traditionnelles et enrichie par des formations modernes, elle maîtrise l'art délicat de la pâtisserie orientale. Sa passion pour les sucreries traditionnelles et son talent créatif font de sa pâtisserie une référence dans le quartier.",
    "presentation": "Wafae El Hana est une pâtisserie spécialisée dans les douceurs marocaines et orientales traditionnelles. Le projet vise à préserver l'art de la pâtisserie orientale authentique tout en proposant des créations modernes, en utilisant des ingrédients de qualité et des techniques artisanales pour créer des moments de bonheur gustatif.",
    "support": "La pâtisserie bénéficie du soutien de l'INDH pour l'acquisition d'équipements de pâtisserie professionnels et l'aménagement du laboratoire de production. Un accompagnement en techniques de conservation et en développement de gammes de produits a également été fourni.",
    "products": "Wafae El Hana propose des pâtisseries marocaines traditionnelles (chebakia, makroudh, cornes de gazelle), baklawas variés, ma'amoul et dattes fourrées, gâteaux de fête personnalisés, ainsi que des créations modernes inspirées de la tradition et des coffrets cadeaux.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm, Coopératives de production de miel et fruits secs"
  },
  "doja_event": {
    "name": "Doja Event",
    "address": "Sidi Othmane, Casablanca",
    "description": "Organisation d'événements créatifs et personnalisés.",
    "founder_info": "L'équipe de Doja Event est composée d'organisateurs d'événements créatifs et expérimentés, spécialisés dans la création d'expériences événementielles uniques et mémorables. Avec une passion pour l'innovation et l'art événementiel, ils s'attachent à transformer chaque événement en une expérience extraordinaire adaptée aux besoins spécifiques de chaque client.",
    "presentation": "Doja Event est une agence événementielle créative qui se spécialise dans l'organisation d'événements personnalisés et innovants. Le projet vise à offrir des services événementiels complets, allant de la conception créative à l'exécution parfaite, en mettant l'accent sur l'originalité et l'attention aux détails pour créer des moments inoubliables.",
    "support": "Doja Event bénéficie du soutien de l'INDH pour l'acquisition de matériel événementiel et l'aménagement des espaces de travail. Un accompagnement en gestion événementielle et en développement commercial a été fourni par la Plateforme des Jeunes.",
    "products": "Doja Event propose l'organisation de mariages sur mesure, événements corporate créatifs, fêtes d'anniversaire thématiques, baby showers et gender reveals, événements culturels et artistiques, ainsi que des services de décoration et de mise en scène événementielle.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm, Prestataires événementiels, Décorateurs"
  },
  "mohcin_najmi_production": {
    "name": "Mohcin Najmi Production",
    "address": "Sidi Othmane, Casablanca",
    "description": "Production de contenu digital et marketing créatif.",
    "founder_info": "Mohcin Najmi est un jeune créateur de contenu et spécialiste en marketing digital, passionné par la production audiovisuelle et la communication créative. Avec une formation en communication et une expérience dans la création de contenu digital, il s'est spécialisé dans la production de contenus visuels impactants pour les réseaux sociaux et les campagnes marketing.",
    "presentation": "Mohcin Najmi Production est un studio de création de contenu digital spécialisé dans la production de contenu visuel et marketing créatif. Le projet vise à accompagner les entreprises et les particuliers dans leur communication digitale en créant des contenus visuels engageants, des campagnes publicitaires créatives et des stratégies de communication sur mesure.",
    "support": "Le studio bénéficie du soutien de l'INDH pour l'acquisition d'équipements de production et de logiciels professionnels. Un accompagnement en marketing digital et en gestion de studio créatif a été fourni par la Plateforme des Jeunes.",
    "products": "Mohcin Najmi Production propose la création de contenus pour réseaux sociaux, production de vidéos publicitaires, photographie professionnelle, création de campagnes marketing digitales, montage vidéo et motion design, ainsi que des services de conseil en stratégie de communication digitale.",
    "partners": "INDH, Plateforme des jeunes Irchad, Association Najm, Agences de communication, Influenceurs locaux"
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
