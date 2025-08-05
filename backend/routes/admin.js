import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Contact from '../models/Contact.js';
import mongoose from 'mongoose';

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Dashboard avec statistiques générales
// @access  Private (Admin/Moderator)
router.get('/dashboard',
  authenticateToken,
  requireRole(['admin', 'moderator']),
  async (req, res) => {
    try {
      // Statistiques des utilisateurs
      const totalUsers = await User.countDocuments();
      const activeUsers = await User.countDocuments({ isActive: true });
      const adminUsers = await User.countDocuments({ role: 'admin' });
      const moderatorUsers = await User.countDocuments({ role: 'moderator' });

      // Statistiques des projets
      const totalProjects = await Project.countDocuments();
      const activeProjects = await Project.countDocuments({ status: 'active' });
      const featuredProjects = await Project.countDocuments({ featured: true });

      // Statistiques des contacts
      const totalContacts = await Contact.countDocuments();
      const newContacts = await Contact.countDocuments({ status: 'new' });
      const repliedContacts = await Contact.countDocuments({ status: 'replied' });
      const spamContacts = await Contact.countDocuments({ isSpam: true });

      // Activité récente (derniers 7 jours)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const recentUsers = await User.countDocuments({ createdAt: { $gte: weekAgo } });
      const recentProjects = await Project.countDocuments({ createdAt: { $gte: weekAgo } });
      const recentContacts = await Contact.countDocuments({ createdAt: { $gte: weekAgo } });

      // Projets les plus vus
      const topProjects = await Project.find()
        .sort({ 'metadata.views': -1 })
        .limit(5)
        .select('name metadata.views metadata.likes');

      // Contacts par priorité
      const contactsByPriority = await Contact.aggregate([
        { $group: { _id: '$priority', count: { $sum: 1 } } }
      ]);

      // Contacts par catégorie
      const contactsByCategory = await Contact.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);

      res.json({
        success: true,
        data: {
          users: {
            total: totalUsers,
            active: activeUsers,
            admins: adminUsers,
            moderators: moderatorUsers,
            recent: recentUsers
          },
          projects: {
            total: totalProjects,
            active: activeProjects,
            featured: featuredProjects,
            recent: recentProjects,
            topViewed: topProjects
          },
          contacts: {
            total: totalContacts,
            new: newContacts,
            replied: repliedContacts,
            spam: spamContacts,
            recent: recentContacts,
            byPriority: contactsByPriority,
            byCategory: contactsByCategory
          }
        }
      });
    } catch (error) {
      console.error('Erreur dashboard admin:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des statistiques'
      });
    }
  }
);

// @route   GET /api/admin/users
// @desc    Liste tous les utilisateurs avec pagination
// @access  Private (Admin)
router.get('/users',
  authenticateToken,
  requireRole(['admin']),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'createdAt';
      const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
      const search = req.query.search || '';
      const role = req.query.role || '';

      // Construction de la requête de recherche
      let query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }
      if (role) {
        query.role = role;
      }

      const skip = (page - 1) * limit;
      
      const users = await User.find(query)
        .select('-password -refreshTokens')
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit);

      const total = await User.countDocuments(query);

      res.json({
        success: true,
        data: {
          users,
          pagination: {
            current: page,
            pages: Math.ceil(total / limit),
            total,
            limit
          }
        }
      });
    } catch (error) {
      console.error('Erreur liste utilisateurs:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des utilisateurs'
      });
    }
  }
);

// @route   PUT /api/admin/users/:id/role
// @desc    Modifier le rôle d'un utilisateur
// @access  Private (Admin)
router.put('/users/:id/role',
  authenticateToken,
  requireRole(['admin']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!['user', 'moderator', 'admin'].includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Rôle invalide'
        });
      }

      // Empêcher de modifier son propre rôle
      if (id === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'Vous ne pouvez pas modifier votre propre rôle'
        });
      }

      const user = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      ).select('-password -refreshTokens');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      res.json({
        success: true,
        message: `Rôle mis à jour vers ${role}`,
        data: { user }
      });
    } catch (error) {
      console.error('Erreur modification rôle:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la modification du rôle'
      });
    }
  }
);

// @route   PUT /api/admin/users/:id/status
// @desc    Activer/Désactiver un utilisateur
// @access  Private (Admin)
router.put('/users/:id/status',
  authenticateToken,
  requireRole(['admin']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      // Empêcher de désactiver son propre compte
      if (id === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'Vous ne pouvez pas désactiver votre propre compte'
        });
      }

      const user = await User.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
      ).select('-password -refreshTokens');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      res.json({
        success: true,
        message: `Utilisateur ${isActive ? 'activé' : 'désactivé'}`,
        data: { user }
      });
    } catch (error) {
      console.error('Erreur modification statut:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la modification du statut'
      });
    }
  }
);

// @route   DELETE /api/admin/users/:id
// @desc    Supprimer un utilisateur
// @access  Private (Admin)
router.delete('/users/:id',
  authenticateToken,
  requireRole(['admin']),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Empêcher de supprimer son propre compte
      if (id === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'Vous ne pouvez pas supprimer votre propre compte'
        });
      }

      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      res.json({
        success: true,
        message: 'Utilisateur supprimé avec succès'
      });
    } catch (error) {
      console.error('Erreur suppression utilisateur:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression de l\'utilisateur'
      });
    }
  }
);

// @route   GET /api/admin/projects
// @desc    Liste tous les projets avec gestion avancée
// @access  Private (Admin/Moderator)
router.get('/projects',
  authenticateToken,
  requireRole(['admin', 'moderator']),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'createdAt';
      const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
      const search = req.query.search || '';
      const category = req.query.category || '';
      const status = req.query.status || '';

      // Construction de la requête
      let query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      if (category) query.category = category;
      if (status) query.status = status;

      const skip = (page - 1) * limit;
      
      const projects = await Project.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .populate('images.uploadedBy', 'name email');

      const total = await Project.countDocuments(query);

      res.json({
        success: true,
        data: {
          projects,
          pagination: {
            current: page,
            pages: Math.ceil(total / limit),
            total,
            limit
          }
        }
      });
    } catch (error) {
      console.error('Erreur liste projets admin:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des projets'
      });
    }
  }
);

// @route   PUT /api/admin/projects/:id/featured
// @desc    Marquer/Démarquer un projet comme mis en avant
// @access  Private (Admin/Moderator)
router.put('/projects/:id/featured',
  authenticateToken,
  requireRole(['admin', 'moderator']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { featured } = req.body;

      const project = await Project.findByIdAndUpdate(
        id,
        { featured },
        { new: true }
      );

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Projet non trouvé'
        });
      }

      res.json({
        success: true,
        message: `Projet ${featured ? 'mis en avant' : 'retiré de la mise en avant'}`,
        data: { project }
      });
    } catch (error) {
      console.error('Erreur modification featured:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la modification'
      });
    }
  }
);

// @route   GET /api/admin/contacts/manage
// @desc    Interface de gestion des contacts
// @access  Private (Admin/Moderator)
router.get('/contacts/manage',
  authenticateToken,
  requireRole(['admin', 'moderator']),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const status = req.query.status || '';
      const priority = req.query.priority || '';
      const category = req.query.category || '';
      const search = req.query.search || '';

      // Construction de la requête
      let query = {};
      if (status) query.status = status;
      if (priority) query.priority = priority;
      if (category) query.category = category;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { message: { $regex: search, $options: 'i' } }
        ];
      }

      const skip = (page - 1) * limit;
      
      const contacts = await Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Contact.countDocuments(query);

      // Statistiques rapides
      const stats = {
        total: await Contact.countDocuments(),
        new: await Contact.countDocuments({ status: 'new' }),
        read: await Contact.countDocuments({ status: 'read' }),
        replied: await Contact.countDocuments({ status: 'replied' }),
        spam: await Contact.countDocuments({ isSpam: true })
      };

      res.json({
        success: true,
        data: {
          contacts,
          stats,
          pagination: {
            current: page,
            pages: Math.ceil(total / limit),
            total,
            limit
          }
        }
      });
    } catch (error) {
      console.error('Erreur gestion contacts:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des contacts'
      });
    }
  }
);

// @route   GET /api/admin/system/health
// @desc    Vérification de l'état du système
// @access  Private (Admin)
router.get('/system/health',
  authenticateToken,
  requireRole(['admin']),
  async (req, res) => {
    try {
      // Vérification de la base de données
      const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
      
      // Vérification de l'espace disque (simulation)
      const diskUsage = {
        total: '100GB',
        used: '45GB',
        free: '55GB',
        percentage: 45
      };

      // Statistiques système
      const systemStats = {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        platform: process.platform
      };

      res.json({
        success: true,
        data: {
          database: {
            status: dbStatus,
            host: process.env.MONGODB_URI ? 'configured' : 'not configured'
          },
          disk: diskUsage,
          system: systemStats,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Erreur health check:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la vérification du système'
      });
    }
  }
);

export default router;
