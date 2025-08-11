import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// ES6 modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('🚀 Starting Association Najm Backend Server...');
    console.log('='.repeat(50));

    // Security middleware
    app.use(helmet());

    // Rate limiting
    const limiter = rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
      message: {
        error: 'Too many requests from this IP, please try again later.'
      }
    });
    app.use(limiter);

    // CORS configuration
    app.use(cors({
      origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174'
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
      optionsSuccessStatus: 200
    }));

    // Compression middleware
    app.use(compression());

    // Logging middleware (only in development)
    if (process.env.NODE_ENV !== 'production') {
      app.use(morgan('dev'));
    }

    // Body parsing middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Static files middleware for uploads
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Language middleware
    app.use((req, res, next) => {
      const lang = req.headers['accept-language'] || req.query.lang || process.env.DEFAULT_LANGUAGE || 'fr';
      req.language = lang.split(',')[0].split('-')[0];
      next();
    });

    // MongoDB connection
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/association');
    console.log('✅ Connected to MongoDB');

    // Initialize i18next (optional, can be skipped if causing issues)
    try {
      const { initializeI18n } = await import('./config/i18n.js');
      await initializeI18n();
      console.log('✅ i18next initialized');
    } catch (error) {
      console.log('⚠️ i18next initialization skipped:', error.message);
    }

    // Load routes with error handling
    console.log('🔄 Loading API routes...');

    // Auth routes (essential)
    try {
      const { default: authRoutes } = await import('./routes/auth.js');
      app.use('/api/auth', authRoutes);
      console.log('✅ Auth routes loaded');
    } catch (error) {
      console.error('❌ Error loading auth routes:', error.message);
    }

    // Project routes
    try {
      const { default: projectRoutes } = await import('./routes/projects.js');
      app.use('/api/projects', projectRoutes);
      console.log('✅ Project routes loaded');
    } catch (error) {
      console.error('❌ Error loading project routes:', error.message);
    }

    // Contact routes
    try {
      const { default: contactRoutes } = await import('./routes/contact.js');
      app.use('/api/contact', contactRoutes);
      console.log('✅ Contact routes loaded');
    } catch (error) {
      console.error('❌ Error loading contact routes:', error.message);
    }

    // Upload routes
    try {
      const { default: uploadRoutes } = await import('./routes/upload.js');
      app.use('/api/upload', uploadRoutes);
      console.log('✅ Upload routes loaded');
    } catch (error) {
      console.error('❌ Error loading upload routes:', error.message);
    }

    // Admin routes
    try {
      const { default: adminRoutes } = await import('./routes/admin.js');
      app.use('/api/admin', adminRoutes);
      console.log('✅ Admin routes loaded');
    } catch (error) {
      console.error('❌ Error loading admin routes:', error.message);
    }

    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.json({
        status: 'OK',
        message: 'Association Najm Backend is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
      });
    });

    // Root endpoint
    app.get('/', (req, res) => {
      res.json({
        message: 'Association Najm Backend API',
        version: '1.0.0',
        status: 'running',
        description: 'Backend API for Association Najm with multilingual support',
        endpoints: {
          health: '/api/health',
          auth: '/api/auth (login, register, users)',
          contact: '/api/contact (messages, management)',
          projects: '/api/projects (CRUD, geolocation)',
          upload: '/api/upload (images, files)',
          admin: '/api/admin (dashboard, management)'
        },
        features: [
          'JWT Authentication',
          'Multilingual Support (FR/EN/AR)',
          'Image Upload & Processing',
          'Contact Form Management',
          'Admin Dashboard',
          'Project Management',
          'Geolocation Support'
        ]
      });
    });

    // 404 handler
    app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Endpoint not found',
        message: `The endpoint ${req.method} ${req.originalUrl} does not exist.`,
        availableEndpoints: [
          'GET /',
          'GET /api/health',
          'POST /api/auth/login',
          'GET /api/projects',
          'POST /api/contact',
          'GET /api/admin/dashboard'
        ]
      });
    });

    // Global error handler
    app.use((error, req, res, next) => {
      console.error('❌ Server Error:', error);
      
      // Don't leak error details in production
      const isDevelopment = process.env.NODE_ENV !== 'production';
      
      res.status(error.status || 500).json({
        error: isDevelopment ? error.message : 'Internal Server Error',
        ...(isDevelopment && { 
          stack: error.stack,
          timestamp: new Date().toISOString()
        })
      });
    });

    // Start server
    app.listen(PORT, () => {
      console.log('🎉 Server started successfully!');
      console.log('='.repeat(50));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5174'}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}`);
      console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`📁 Static Files: http://localhost:${PORT}/uploads`);
      console.log('='.repeat(50));
      console.log('✨ Association Najm Backend - All systems operational!');
      console.log('📋 Available APIs:');
      console.log('   🔐 Authentication: /api/auth');
      console.log('   🏗️ Projects: /api/projects');
      console.log('   📧 Contact: /api/contact');
      console.log('   📸 Upload: /api/upload');
      console.log('   👨‍💼 Admin: /api/admin');
      console.log('='.repeat(50));
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

// Graceful shutdown handlers
const gracefulShutdown = async (signal) => {
  console.log(`\n🔄 ${signal} received, shutting down gracefully...`);
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    console.log('👋 Server shutdown complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer();

export default app;
