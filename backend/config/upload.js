import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

// ES6 modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration des dossiers d'upload
const UPLOAD_DIRS = {
  projects: 'uploads/projects',
  users: 'uploads/users',
  gallery: 'uploads/gallery',
  temp: 'uploads/temp'
};

// Créer les dossiers s'ils n'existent pas
const ensureUploadDirs = async () => {
  try {
    for (const dir of Object.values(UPLOAD_DIRS)) {
      await fs.ensureDir(path.join(__dirname, '..', dir));
    }
    console.log('✅ Upload directories created successfully');
  } catch (error) {
    console.error('❌ Error creating upload directories:', error);
  }
};

// Configuration Multer pour stockage temporaire
const storage = multer.memoryStorage();

// Filtres de fichiers autorisés
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers images (JPEG, JPG, PNG, GIF, WebP) sont autorisés'), false);
  }
};

// Configuration Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 5 // Maximum 5 fichiers à la fois
  },
  fileFilter: fileFilter
});

// Fonction de traitement et redimensionnement d'image
const processImage = async (buffer, options = {}) => {
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'jpeg'
  } = options;

  try {
    const processedBuffer = await sharp(buffer)
      .resize(width, height, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality })
      .toBuffer();

    return processedBuffer;
  } catch (error) {
    throw new Error(`Erreur lors du traitement de l'image: ${error.message}`);
  }
};

// Fonction de sauvegarde d'image
const saveImage = async (buffer, category, originalName) => {
  try {
    const fileExtension = path.extname(originalName).toLowerCase() || '.jpg';
    const fileName = `${uuidv4()}${fileExtension}`;
    const uploadDir = UPLOAD_DIRS[category] || UPLOAD_DIRS.temp;
    const filePath = path.join(__dirname, '..', uploadDir, fileName);

    // Traiter l'image selon la catégorie
    let processedBuffer;
    switch (category) {
      case 'projects':
        processedBuffer = await processImage(buffer, { width: 800, height: 600, quality: 85 });
        break;
      case 'users':
        processedBuffer = await processImage(buffer, { width: 300, height: 300, quality: 90 });
        break;
      case 'gallery':
        processedBuffer = await processImage(buffer, { width: 1200, height: 800, quality: 85 });
        break;
      default:
        processedBuffer = await processImage(buffer);
    }

    // Sauvegarder le fichier
    await fs.writeFile(filePath, processedBuffer);

    // Retourner les informations du fichier
    return {
      filename: fileName,
      path: `/${uploadDir}/${fileName}`,
      size: processedBuffer.length,
      category: category
    };
  } catch (error) {
    throw new Error(`Erreur lors de la sauvegarde: ${error.message}`);
  }
};

// Fonction de suppression d'image
const deleteImage = async (imagePath) => {
  try {
    const fullPath = path.join(__dirname, '..', imagePath.replace(/^\//, ''));
    await fs.remove(fullPath);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return false;
  }
};

// Middleware de validation d'upload
const validateUpload = (category) => {
  return (req, res, next) => {
    if (!Object.keys(UPLOAD_DIRS).includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Catégorie d\'upload invalide'
      });
    }
    req.uploadCategory = category;
    next();
  };
};

// Middleware de traitement des fichiers uploadés
const processUploadedFiles = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier fourni'
      });
    }

    const processedFiles = [];
    
    for (const file of req.files) {
      const savedFile = await saveImage(
        file.buffer, 
        req.uploadCategory, 
        file.originalname
      );
      processedFiles.push(savedFile);
    }

    req.processedFiles = processedFiles;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Initialisation
ensureUploadDirs();

export {
  upload,
  processImage,
  saveImage,
  deleteImage,
  validateUpload,
  processUploadedFiles,
  UPLOAD_DIRS
};
