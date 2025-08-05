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

// Import routes
import projectRoutes from './routes/projects.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import uploadRoutes from './routes/upload.js';
import adminRoutes from './routes/admin.js';
import { initializeI18n } from './config/i18n.js';

// Load environment variables
dotenv.config();

// ES6 modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize server function
const startServer = async () => {
  try {
    console.log('🔄 Starting Association Najm Backend Server...');
    
    // Initialize i18next
    console.log('🌐 Initializing i18next...');
    await initializeI18n();
    console.log('✅ i18next initialized');

    // Security middleware
    app.use(helmet());

    // Rate limiting
    const limiter = rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
      message: {
        error: 'Too many requests from this IP, please try again later.'
      }
    });
    app.use(limiter);

    // CORS configuration
    app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5174',
      credentials: true
    }));

    // Compression middleware
    app.use(compression());

    // Logging middleware
    app.use(morgan('combined'));

    // Body parsing middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Static files middleware for uploads
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Language middleware
    app.use((req, res, next) => {
      const lang = req.headers['accept-language'] || req.query.lang || process.env.DEFAULT_LANGUAGE || 'fr';
      req.language = lang.split(',')[0].split('-')[0]; // Extract primary language
      next();
    });

    // MongoDB connection
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/association');
    console.log('✅ Connected to MongoDB');

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/contact', contactRoutes);
    app.use('/api/projects', projectRoutes);
    app.use('/api/upload', uploadRoutes);
    app.use('/api/admin', adminRoutes);

    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
      });
    });

    // Root endpoint
    app.get('/', (req, res) => {
      res.json({
        message: 'Association Najm Backend API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
          health: '/api/health',
          auth: '/api/auth',
          contact: '/api/contact',
          projects: '/api/projects',
          upload: '/api/upload',
          admin: '/api/admin'
        }
      });
    });

    // 404 handler
    app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Endpoint not found',
        message: `The endpoint ${req.originalUrl} does not exist.`
      });
    });

    // Global error handler
    app.use((error, req, res, next) => {
      console.error('❌ Server Error:', error);
      
      res.status(error.status || 500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
      });
    });

    // Start server
    app.listen(PORT, () => {
      console.log('🎉 Server started successfully!');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5174'}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}`);
      console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
      console.log('✨ All systems operational!');
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown handlers
process.on('SIGTERM', async () => {
  console.log('🔄 SIGTERM received, shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🔄 SIGINT received, shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

// Start the server
startServer();

export default app;
