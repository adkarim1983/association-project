import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { 
  upload, 
  validateUpload, 
  processUploadedFiles, 
  deleteImage 
} from '../config/upload.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/upload/projects
// @desc    Upload d'images pour les projets
// @access  Private (Admin/Moderator)
router.post('/projects', 
  authenticateToken,
  requireRole(['admin', 'moderator']),
  validateUpload('projects'),
  upload.array('images', 5),
  processUploadedFiles,
  async (req, res) => {
    try {
      const { projectId } = req.body;
      
      if (!projectId) {
        return res.status(400).json({
          success: false,
          message: 'ID du projet requis'
        });
      }

      // Vérifier que le projet existe
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Projet non trouvé'
        });
      }

      // Ajouter les nouvelles images au projet
      const newImages = req.processedFiles.map(file => ({
        url: file.path,
        filename: file.filename,
        size: file.size,
        uploadedAt: new Date(),
        uploadedBy: req.user.id
      }));

      project.images = project.images || [];
      project.images.push(...newImages);
      await project.save();

      res.json({
        success: true,
        message: `${newImages.length} image(s) uploadée(s) avec succès`,
        data: {
          projectId: project._id,
          images: newImages
        }
      });
    } catch (error) {
      console.error('Erreur upload projet:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'upload des images'
      });
    }
  }
);

// @route   POST /api/upload/users
// @desc    Upload d'avatar utilisateur
// @access  Private
router.post('/users',
  authenticateToken,
  validateUpload('users'),
  upload.single('avatar'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Aucun fichier fourni'
        });
      }

      const { saveImage } = await import('../config/upload.js');
      const savedFile = await saveImage(
        req.file.buffer,
        'users',
        req.file.originalname
      );

      // Supprimer l'ancien avatar s'il existe
      const user = await User.findById(req.user.id);
      if (user.avatar && user.avatar !== '/uploads/users/default-avatar.png') {
        await deleteImage(user.avatar);
      }

      // Mettre à jour l'avatar de l'utilisateur
      user.avatar = savedFile.path;
      await user.save();

      res.json({
        success: true,
        message: 'Avatar mis à jour avec succès',
        data: {
          avatar: savedFile.path
        }
      });
    } catch (error) {
      console.error('Erreur upload avatar:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'upload de l\'avatar'
      });
    }
  }
);

// @route   POST /api/upload/gallery
// @desc    Upload d'images pour la galerie
// @access  Private (Admin/Moderator)
router.post('/gallery',
  authenticateToken,
  requireRole(['admin', 'moderator']),
  validateUpload('gallery'),
  upload.array('images', 10),
  processUploadedFiles,
  async (req, res) => {
    try {
      const { title, description, category } = req.body;

      const galleryImages = req.processedFiles.map(file => ({
        url: file.path,
        filename: file.filename,
        title: title || 'Image de galerie',
        description: description || '',
        category: category || 'general',
        size: file.size,
        uploadedAt: new Date(),
        uploadedBy: req.user.id
      }));

      // Ici vous pouvez créer un modèle Gallery si nécessaire
      // Pour l'instant, on retourne juste les informations

      res.json({
        success: true,
        message: `${galleryImages.length} image(s) ajoutée(s) à la galerie`,
        data: {
          images: galleryImages
        }
      });
    } catch (error) {
      console.error('Erreur upload galerie:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'upload des images de galerie'
      });
    }
  }
);

// @route   DELETE /api/upload/projects/:projectId/images/:imageId
// @desc    Supprimer une image de projet
// @access  Private (Admin/Moderator)
router.delete('/projects/:projectId/images/:imageId',
  authenticateToken,
  requireRole(['admin', 'moderator']),
  async (req, res) => {
    try {
      const { projectId, imageId } = req.params;

      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Projet non trouvé'
        });
      }

      const imageIndex = project.images.findIndex(img => img._id.toString() === imageId);
      if (imageIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Image non trouvée'
        });
      }

      const image = project.images[imageIndex];
      
      // Supprimer le fichier physique
      await deleteImage(image.url);
      
      // Supprimer de la base de données
      project.images.splice(imageIndex, 1);
      await project.save();

      res.json({
        success: true,
        message: 'Image supprimée avec succès'
      });
    } catch (error) {
      console.error('Erreur suppression image:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression de l\'image'
      });
    }
  }
);

// @route   GET /api/upload/projects/:projectId/images
// @desc    Récupérer les images d'un projet
// @access  Public
router.get('/projects/:projectId/images', async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).select('images name');
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    res.json({
      success: true,
      data: {
        projectId: project._id,
        projectName: project.name,
        images: project.images || []
      }
    });
  } catch (error) {
    console.error('Erreur récupération images:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des images'
    });
  }
});

// @route   GET /api/upload/stats
// @desc    Statistiques des uploads
// @access  Private (Admin)
router.get('/stats',
  authenticateToken,
  requireRole(['admin']),
  async (req, res) => {
    try {
      const fs = await import('fs-extra');
      const path = await import('path');
      const { UPLOAD_DIRS } = await import('../config/upload.js');

      const stats = {};

      for (const [category, dir] of Object.entries(UPLOAD_DIRS)) {
        const fullPath = path.join(__dirname, '..', dir);
        try {
          const files = await fs.readdir(fullPath);
          stats[category] = {
            count: files.length,
            path: dir
          };
        } catch (error) {
          stats[category] = {
            count: 0,
            path: dir,
            error: 'Dossier non accessible'
          };
        }
      }

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Erreur stats upload:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des statistiques'
      });
    }
  }
);

export default router;
