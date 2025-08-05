import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Authentication middleware - verify JWT token
export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'No token provided or invalid format. Use: Authorization: Bearer <token>'
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: 'Token expired',
          message: 'Access token has expired. Please refresh your token.'
        });
      } else if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({
          error: 'Invalid token',
          message: 'Access token is invalid or malformed.'
        });
      } else {
        return res.status(401).json({
          error: 'Token verification failed',
          message: 'Unable to verify access token.'
        });
      }
    }

    // Find user
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        error: 'User not found',
        message: 'User associated with token no longer exists.'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        error: 'Account disabled',
        message: 'Your account has been disabled. Please contact support.'
      });
    }

    // Add user to request object
    req.user = user;
    req.token = token;
    
    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      error: 'Authentication failed',
      message: 'Internal server error during authentication.'
    });
  }
};

// Admin middleware - check if user has admin role
export const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be authenticated to access this resource.'
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Access forbidden',
        message: 'Admin privileges required to access this resource.'
      });
    }

    next();

  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({
      error: 'Authorization failed',
      message: 'Internal server error during authorization.'
    });
  }
};

// Moderator middleware - check if user has moderator or admin role
export const moderatorMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be authenticated to access this resource.'
      });
    }

    if (!['moderator', 'admin'].includes(req.user.role)) {
      return res.status(403).json({
        error: 'Access forbidden',
        message: 'Moderator or admin privileges required to access this resource.'
      });
    }

    next();

  } catch (error) {
    console.error('Moderator middleware error:', error);
    res.status(500).json({
      error: 'Authorization failed',
      message: 'Internal server error during authorization.'
    });
  }
};

// Role-based middleware factory
export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required',
          message: 'You must be authenticated to access this resource.'
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          error: 'Access forbidden',
          message: `Required role: ${allowedRoles.join(' or ')}. Your role: ${req.user.role}`
        });
      }

      next();

    } catch (error) {
      console.error('Role middleware error:', error);
      res.status(500).json({
        error: 'Authorization failed',
        message: 'Internal server error during authorization.'
      });
    }
  };
};

// Optional auth middleware - doesn't fail if no token, but adds user if token is valid
export const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided, continue without user
      return next();
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const user = await User.findById(decoded.id);
      
      if (user && user.isActive) {
        req.user = user;
        req.token = token;
      }
    } catch (jwtError) {
      // Invalid token, but don't fail - just continue without user
      console.warn('Optional auth - invalid token:', jwtError.message);
    }

    next();

  } catch (error) {
    console.error('Optional auth middleware error:', error);
    // Don't fail on error, just continue without user
    next();
  }
};

// Rate limiting middleware for auth routes
export const authRateLimit = (windowMs = 15 * 60 * 1000, max = 5) => {
  const attempts = new Map();
  
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    
    // Clean old attempts
    if (attempts.has(key)) {
      const userAttempts = attempts.get(key).filter(
        timestamp => now - timestamp < windowMs
      );
      attempts.set(key, userAttempts);
    }
    
    const currentAttempts = attempts.get(key) || [];
    
    if (currentAttempts.length >= max) {
      return res.status(429).json({
        error: 'Too many attempts',
        message: `Too many authentication attempts. Try again in ${Math.ceil(windowMs / 60000)} minutes.`,
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
    
    // Add current attempt
    currentAttempts.push(now);
    attempts.set(key, currentAttempts);
    
    next();
  };
};

export default {
  authMiddleware,
  adminMiddleware,
  moderatorMiddleware,
  roleMiddleware,
  optionalAuthMiddleware,
  authRateLimit
};
