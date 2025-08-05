import express from 'express';
import Joi from 'joi';
import Contact from '../models/Contact.js';
import { authMiddleware, adminMiddleware, moderatorMiddleware } from '../middleware/auth.js';
import { sendContactNotification, sendUserConfirmation } from '../config/email.js';

const router = express.Router();

// Validation schemas
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20).optional().allow(''),
  subject: Joi.string().min(5).max(200).required(),
  message: Joi.string().min(10).max(2000).required(),
  category: Joi.string().valid('general', 'project', 'partnership', 'volunteer', 'complaint', 'suggestion').optional(),
  language: Joi.string().valid('fr', 'en', 'ar').optional()
});

const updateContactSchema = Joi.object({
  status: Joi.string().valid('new', 'read', 'replied', 'archived').optional(),
  priority: Joi.string().valid('low', 'normal', 'high', 'urgent').optional(),
  category: Joi.string().valid('general', 'project', 'partnership', 'volunteer', 'complaint', 'suggestion').optional(),
  adminNotes: Joi.string().max(1000).optional().allow(''),
  isSpam: Joi.boolean().optional()
});

// Rate limiting middleware for contact form
const contactRateLimit = (req, res, next) => {
  const key = req.ip;
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 3; // Max 3 contact forms per 15 minutes per IP
  
  if (!req.app.locals.contactAttempts) {
    req.app.locals.contactAttempts = new Map();
  }
  
  const attempts = req.app.locals.contactAttempts;
  const now = Date.now();
  
  // Clean old attempts
  if (attempts.has(key)) {
    const userAttempts = attempts.get(key).filter(
      timestamp => now - timestamp < windowMs
    );
    attempts.set(key, userAttempts);
  }
  
  const currentAttempts = attempts.get(key) || [];
  
  if (currentAttempts.length >= maxRequests) {
    return res.status(429).json({
      error: 'Too many contact requests',
      message: 'Vous avez envoyé trop de messages. Veuillez patienter 15 minutes avant de réessayer.',
      retryAfter: Math.ceil(windowMs / 1000)
    });
  }
  
  // Add current attempt
  currentAttempts.push(now);
  attempts.set(key, currentAttempts);
  
  next();
};

// POST /api/contact - Submit contact form
router.post('/', contactRateLimit, async (req, res) => {
  try {
    // Validate input
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    // Create contact message
    const contact = new Contact({
      ...value,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      language: value.language || req.language || 'fr'
    });

    await contact.save();

    // Send email notifications (async, don't wait for completion)
    if (!contact.isSpam) {
      // Send admin notification
      sendContactNotification(contact).catch(error => {
        console.error('Failed to send admin notification:', error);
      });
      
      // Send user confirmation
      sendUserConfirmation(contact).catch(error => {
        console.error('Failed to send user confirmation:', error);
      });
    }

    // Return success response (don't expose internal details)
    res.status(201).json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
      contactId: contact._id
    });

    // Log for admin monitoring
    console.log(`📧 New contact message from ${contact.email} - Subject: ${contact.subject}`);
    if (contact.isSpam) {
      console.log(`⚠️  Message marked as potential spam`);
    }

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Failed to send message',
      message: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.'
    });
  }
});

// GET /api/contact - Get all contact messages (admin/moderator only)
router.get('/', authMiddleware, moderatorMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      priority,
      category,
      search,
      isSpam = 'false'
    } = req.query;

    const query = { isSpam: isSpam === 'true' };
    
    // Add filters
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const contacts = await Contact.find(query)
      .populate('repliedBy', 'username email firstName lastName')
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit);

    const total = await Contact.countDocuments(query);

    res.json({
      contacts,
      pagination: {
        currentPage: options.page,
        totalPages: Math.ceil(total / options.limit),
        totalItems: total,
        itemsPerPage: options.limit,
        hasNext: options.page < Math.ceil(total / options.limit),
        hasPrev: options.page > 1
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      error: 'Failed to get contacts',
      message: error.message
    });
  }
});

// GET /api/contact/stats - Get contact statistics (admin/moderator only)
router.get('/stats', authMiddleware, moderatorMiddleware, async (req, res) => {
  try {
    const stats = await Contact.getStats();
    
    // Additional stats
    const recentContacts = await Contact.find({ isSpam: false })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject createdAt status priority');

    const categoryStats = await Contact.aggregate([
      { $match: { isSpam: false } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      overview: stats,
      recentContacts,
      categoryBreakdown: categoryStats
    });

  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      error: 'Failed to get contact statistics',
      message: error.message
    });
  }
});

// GET /api/contact/:id - Get specific contact message (admin/moderator only)
router.get('/:id', authMiddleware, moderatorMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('repliedBy', 'username email firstName lastName');
    
    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found',
        message: 'Message de contact introuvable'
      });
    }

    // Mark as read if it's new
    if (contact.status === 'new') {
      await contact.markAsRead();
    }

    res.json({ contact });

  } catch (error) {
    console.error('Get contact error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid contact ID',
        message: 'ID de contact invalide'
      });
    }
    
    res.status(500).json({
      error: 'Failed to get contact',
      message: error.message
    });
  }
});

// PUT /api/contact/:id - Update contact message (admin/moderator only)
router.put('/:id', authMiddleware, moderatorMiddleware, async (req, res) => {
  try {
    // Validate input
    const { error, value } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found',
        message: 'Message de contact introuvable'
      });
    }

    // Update fields
    Object.keys(value).forEach(key => {
      contact[key] = value[key];
    });

    // If marking as replied, set replied info
    if (value.status === 'replied') {
      contact.repliedAt = new Date();
      contact.repliedBy = req.user._id;
    }

    await contact.save();

    const updatedContact = await Contact.findById(contact._id)
      .populate('repliedBy', 'username email firstName lastName');

    res.json({
      message: 'Contact updated successfully',
      contact: updatedContact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid contact ID',
        message: 'ID de contact invalide'
      });
    }
    
    res.status(500).json({
      error: 'Failed to update contact',
      message: error.message
    });
  }
});

// DELETE /api/contact/:id - Delete contact message (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found',
        message: 'Message de contact introuvable'
      });
    }

    res.json({
      message: 'Contact deleted successfully',
      deletedContact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject
      }
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid contact ID',
        message: 'ID de contact invalide'
      });
    }
    
    res.status(500).json({
      error: 'Failed to delete contact',
      message: error.message
    });
  }
});

// POST /api/contact/:id/reply - Mark contact as replied (admin/moderator only)
router.post('/:id/reply', authMiddleware, moderatorMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found',
        message: 'Message de contact introuvable'
      });
    }

    await contact.markAsReplied(req.user._id);

    res.json({
      message: 'Contact marked as replied',
      contact: await Contact.findById(contact._id)
        .populate('repliedBy', 'username email firstName lastName')
    });

  } catch (error) {
    console.error('Reply contact error:', error);
    res.status(500).json({
      error: 'Failed to mark as replied',
      message: error.message
    });
  }
});

// POST /api/contact/:id/spam - Mark contact as spam (admin/moderator only)
router.post('/:id/spam', authMiddleware, moderatorMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found',
        message: 'Message de contact introuvable'
      });
    }

    await contact.markAsSpam();

    res.json({
      message: 'Contact marked as spam',
      contact
    });

  } catch (error) {
    console.error('Mark spam error:', error);
    res.status(500).json({
      error: 'Failed to mark as spam',
      message: error.message
    });
  }
});

export default router;
