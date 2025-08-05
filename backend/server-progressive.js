import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
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
    console.log('🔄 Starting progressive server...');

    // Basic middleware
    app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5174',
      credentials: true
    }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Static files middleware for uploads
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // MongoDB connection
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/association');
    console.log('✅ Connected to MongoDB');

    // Test basic routes first
    console.log('🔄 Loading basic routes...');
    
    // Try importing auth routes (most stable)
    try {
      const { default: authRoutes } = await import('./routes/auth.js');
      app.use('/api/auth', authRoutes);
      console.log('✅ Auth routes loaded');
    } catch (error) {
      console.error('❌ Error loading auth routes:', error.message);
    }

    // Try importing project routes
    try {
      const { default: projectRoutes } = await import('./routes/projects.js');
      app.use('/api/projects', projectRoutes);
      console.log('✅ Project routes loaded');
    } catch (error) {
      console.error('❌ Error loading project routes:', error.message);
    }

    // Try importing contact routes
    try {
      const { default: contactRoutes } = await import('./routes/contact.js');
      app.use('/api/contact', contactRoutes);
      console.log('✅ Contact routes loaded');
    } catch (error) {
      console.error('❌ Error loading contact routes:', error.message);
    }

    // Try importing upload routes (most likely problematic)
    try {
      const { default: uploadRoutes } = await import('./routes/upload.js');
      app.use('/api/upload', uploadRoutes);
      console.log('✅ Upload routes loaded');
    } catch (error) {
      console.error('❌ Error loading upload routes:', error.message);
      console.error('Upload routes error details:', error);
    }

    // Try importing admin routes
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
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
      });
    });

    // Root endpoint
    app.get('/', (req, res) => {
      res.json({
        message: 'Association Najm Backend API - Progressive Server',
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
      console.log('🎉 Progressive server started successfully!');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5174'}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}`);
      console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
      console.log('✨ Server operational with loaded routes!');
    });

  } catch (error) {
    console.error('❌ Failed to start progressive server:', error);
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
