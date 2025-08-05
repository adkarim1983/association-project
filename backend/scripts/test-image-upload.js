import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// ES6 modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const SERVER_URL = 'http://localhost:5000';

// Fonction pour créer une image de test
const createTestImage = async (filename, width = 300, height = 200) => {
  const testImagePath = path.join(__dirname, 'test-images', filename);
  await fs.ensureDir(path.dirname(testImagePath));
  
  // Créer une image simple en base64 (PNG 1x1 pixel transparent)
  const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  const buffer = Buffer.from(base64Data, 'base64');
  
  await fs.writeFile(testImagePath, buffer);
  return testImagePath;
};

// Fonction pour obtenir un token d'authentification
const getAuthToken = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@associationnajm.ma',
        password: 'Admin123!'
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur de connexion: ${response.status}`);
    }

    const data = await response.json();
    return data.data.accessToken;
  } catch (error) {
    console.error('❌ Erreur lors de l\'authentification:', error.message);
    return null;
  }
};

// Test d'upload d'image pour un projet
const testProjectImageUpload = async (token) => {
  console.log('\n📸 Test 1: Upload d\'image pour projet');
  
  try {
    // Créer une image de test
    const testImagePath = await createTestImage('test-project.png');
    
    // Créer le FormData
    const form = new FormData();
    form.append('images', fs.createReadStream(testImagePath));
    form.append('alt', 'Image de test pour projet');
    form.append('isMain', 'true');
    
    const response = await fetch(`${SERVER_URL}/api/upload/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      },
      body: form
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Upload réussi pour projet');
      console.log(`   - Nombre d'images uploadées: ${result.data.uploadedImages.length}`);
      console.log(`   - Première image: ${result.data.uploadedImages[0]?.filename}`);
      return result.data.uploadedImages[0];
    } else {
      const error = await response.json();
      console.log('❌ Erreur upload projet:', error.message);
    }
  } catch (error) {
    console.log('❌ Erreur test upload projet:', error.message);
  }
  
  return null;
};

// Test d'upload d'avatar utilisateur
const testUserAvatarUpload = async (token) => {
  console.log('\n👤 Test 2: Upload d\'avatar utilisateur');
  
  try {
    // Créer une image de test
    const testImagePath = await createTestImage('test-avatar.jpg');
    
    // Créer le FormData
    const form = new FormData();
    form.append('avatar', fs.createReadStream(testImagePath));
    
    const response = await fetch(`${SERVER_URL}/api/upload/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      },
      body: form
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Upload avatar réussi');
      console.log(`   - Fichier: ${result.data.filename}`);
      console.log(`   - URL: ${result.data.url}`);
      return result.data;
    } else {
      const error = await response.json();
      console.log('❌ Erreur upload avatar:', error.message);
    }
  } catch (error) {
    console.log('❌ Erreur test upload avatar:', error.message);
  }
  
  return null;
};

// Test d'upload pour la galerie
const testGalleryUpload = async (token) => {
  console.log('\n🖼️ Test 3: Upload d\'images pour galerie');
  
  try {
    // Créer plusieurs images de test
    const testImage1 = await createTestImage('gallery-1.png');
    const testImage2 = await createTestImage('gallery-2.jpg');
    
    // Créer le FormData
    const form = new FormData();
    form.append('images', fs.createReadStream(testImage1));
    form.append('images', fs.createReadStream(testImage2));
    form.append('category', 'events');
    form.append('description', 'Images de test pour la galerie');
    
    const response = await fetch(`${SERVER_URL}/api/upload/gallery`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      },
      body: form
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Upload galerie réussi');
      console.log(`   - Nombre d'images: ${result.data.uploadedImages.length}`);
      result.data.uploadedImages.forEach((img, index) => {
        console.log(`   - Image ${index + 1}: ${img.filename}`);
      });
      return result.data.uploadedImages;
    } else {
      const error = await response.json();
      console.log('❌ Erreur upload galerie:', error.message);
    }
  } catch (error) {
    console.log('❌ Erreur test upload galerie:', error.message);
  }
  
  return null;
};

// Test de récupération des statistiques d'upload
const testUploadStats = async (token) => {
  console.log('\n📊 Test 4: Statistiques d\'upload');
  
  try {
    const response = await fetch(`${SERVER_URL}/api/upload/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Statistiques récupérées');
      console.log(`   - Total fichiers: ${result.data.totalFiles}`);
      console.log(`   - Taille totale: ${(result.data.totalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   - Images projets: ${result.data.projectImages}`);
      console.log(`   - Avatars: ${result.data.userAvatars}`);
      console.log(`   - Images galerie: ${result.data.galleryImages}`);
    } else {
      const error = await response.json();
      console.log('❌ Erreur récupération stats:', error.message);
    }
  } catch (error) {
    console.log('❌ Erreur test stats:', error.message);
  }
};

// Test de validation des fichiers
const testFileValidation = async (token) => {
  console.log('\n🔍 Test 5: Validation des fichiers');
  
  try {
    // Créer un fichier non-image pour tester la validation
    const invalidFilePath = path.join(__dirname, 'test-images', 'invalid.txt');
    await fs.ensureDir(path.dirname(invalidFilePath));
    await fs.writeFile(invalidFilePath, 'Ceci n\'est pas une image');
    
    const form = new FormData();
    form.append('images', fs.createReadStream(invalidFilePath));
    
    const response = await fetch(`${SERVER_URL}/api/upload/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      },
      body: form
    });

    if (!response.ok) {
      const error = await response.json();
      console.log('✅ Validation fonctionne - fichier rejeté');
      console.log(`   - Message: ${error.message}`);
    } else {
      console.log('❌ Validation échouée - fichier accepté');
    }
  } catch (error) {
    console.log('❌ Erreur test validation:', error.message);
  }
};

// Test de vérification des dossiers d'upload
const testUploadDirectories = async () => {
  console.log('\n📁 Test 6: Vérification des dossiers d\'upload');
  
  const uploadDirs = [
    'uploads/projects',
    'uploads/users', 
    'uploads/gallery',
    'uploads/temp'
  ];
  
  for (const dir of uploadDirs) {
    const fullPath = path.join(__dirname, '..', dir);
    try {
      const exists = await fs.pathExists(fullPath);
      if (exists) {
        const files = await fs.readdir(fullPath);
        console.log(`✅ ${dir}: ${files.length} fichiers`);
      } else {
        console.log(`❌ ${dir}: Dossier n'existe pas`);
      }
    } catch (error) {
      console.log(`❌ ${dir}: Erreur - ${error.message}`);
    }
  }
};

// Fonction principale de test
const runImageUploadTests = async () => {
  console.log('🧪 Tests du système d\'upload d\'images\n');
  console.log('='.repeat(50));
  
  // Vérifier que le serveur est démarré
  try {
    const healthCheck = await fetch(`${SERVER_URL}/api/health`);
    if (!healthCheck.ok) {
      console.log('❌ Serveur non accessible. Assurez-vous que le serveur backend est démarré.');
      return;
    }
    console.log('✅ Serveur backend accessible');
  } catch (error) {
    console.log('❌ Impossible de se connecter au serveur. Démarrez le serveur avec: npm start');
    return;
  }
  
  // Test des dossiers d'upload
  await testUploadDirectories();
  
  // Authentification
  console.log('\n🔐 Authentification...');
  const token = await getAuthToken();
  if (!token) {
    console.log('❌ Impossible de s\'authentifier. Vérifiez les credentials.');
    return;
  }
  console.log('✅ Authentification réussie');
  
  // Tests d'upload
  await testProjectImageUpload(token);
  await testUserAvatarUpload(token);
  await testGalleryUpload(token);
  await testUploadStats(token);
  await testFileValidation(token);
  
  // Nettoyage
  console.log('\n🧹 Nettoyage des fichiers de test...');
  try {
    const testImagesDir = path.join(__dirname, 'test-images');
    await fs.remove(testImagesDir);
    console.log('✅ Fichiers de test supprimés');
  } catch (error) {
    console.log('⚠️ Erreur lors du nettoyage:', error.message);
  }
  
  console.log('\n🎉 Tests d\'upload d\'images terminés !');
  console.log('='.repeat(50));
};

// Exécuter les tests
runImageUploadTests().catch(console.error);
