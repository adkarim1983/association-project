import express from 'express';
import Project from '../models/Project.js';
import { getTranslation } from '../config/i18n.js';

const router = express.Router();

// Helper function to translate project fields
const translateProject = (project, language = 'fr') => {
  const projectObj = project.toObject();
  
  // Translate translatable fields
  const translatableFields = ['name', 'category', 'location', 'address', 'description'];
  
  translatableFields.forEach(field => {
    if (projectObj[field] && projectObj[field].startsWith('projects.')) {
      projectObj[field] = getTranslation(projectObj[field], language) || projectObj[field];
    }
  });
  
  return projectObj;
};

// GET /api/projects - Get all projects with optional filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      location,
      status = 'active',
      search,
      featured,
      lat,
      lng,
      radius = 10
    } = req.query;

    const query = { status };
    
    // Add filters
    if (category) query.category = category;
    if (location) query.location = location;
    if (featured !== undefined) query.featured = featured === 'true';
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Nearby search
    if (lat && lng) {
      const radiusInRadians = parseFloat(radius) / 6371;
      query['coordinates.lat'] = {
        $gte: parseFloat(lat) - radiusInRadians,
        $lte: parseFloat(lat) + radiusInRadians
      };
      query['coordinates.lng'] = {
        $gte: parseFloat(lng) - radiusInRadians,
        $lte: parseFloat(lng) + radiusInRadians
      };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const projects = await Project.find(query)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit);

    const total = await Project.countDocuments(query);
    
    // Translate projects
    const translatedProjects = projects.map(project => 
      translateProject(project, req.language)
    );

    res.json({
      projects: translatedProjects,
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
    console.error('Error fetching projects:', error);
    res.status(500).json({
      error: 'Failed to fetch projects',
      message: error.message
    });
  }
});

// GET /api/projects/categories - Get all unique categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Project.distinct('category', { status: 'active' });
    
    // Translate categories
    const translatedCategories = categories.map(category => ({
      key: category,
      label: getTranslation(category, req.language) || category
    }));
    
    res.json({ categories: translatedCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      error: 'Failed to fetch categories',
      message: error.message
    });
  }
});

// GET /api/projects/locations - Get all unique locations
router.get('/locations', async (req, res) => {
  try {
    const locations = await Project.distinct('location', { status: 'active' });
    
    // Translate locations
    const translatedLocations = locations.map(location => ({
      key: location,
      label: getTranslation(location, req.language) || location
    }));
    
    res.json({ locations: translatedLocations });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({
      error: 'Failed to fetch locations',
      message: error.message
    });
  }
});

// GET /api/projects/:id - Get a single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        message: `Project with ID ${req.params.id} does not exist`
      });
    }

    // Increment views
    await project.incrementViews();
    
    const translatedProject = translateProject(project, req.language);
    
    res.json({ project: translatedProject });
  } catch (error) {
    console.error('Error fetching project:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid project ID',
        message: 'The provided ID is not a valid MongoDB ObjectId'
      });
    }
    
    res.status(500).json({
      error: 'Failed to fetch project',
      message: error.message
    });
  }
});

// POST /api/projects - Create a new project
router.post('/', async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      coordinates: {
        lat: req.body.lat || req.body.coordinates?.lat,
        lng: req.body.lng || req.body.coordinates?.lng
      }
    };

    const project = new Project(projectData);
    await project.save();
    
    const translatedProject = translateProject(project, req.language);
    
    res.status(201).json({
      message: 'Project created successfully',
      project: translatedProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        error: 'Validation failed',
        details: validationErrors
      });
    }
    
    res.status(500).json({
      error: 'Failed to create project',
      message: error.message
    });
  }
});

// PUT /api/projects/:id - Update a project
router.put('/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Handle coordinates update
    if (req.body.lat || req.body.lng) {
      updateData.coordinates = {
        lat: req.body.lat || req.body.coordinates?.lat,
        lng: req.body.lng || req.body.coordinates?.lng
      };
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        message: `Project with ID ${req.params.id} does not exist`
      });
    }
    
    const translatedProject = translateProject(project, req.language);
    
    res.json({
      message: 'Project updated successfully',
      project: translatedProject
    });
  } catch (error) {
    console.error('Error updating project:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid project ID',
        message: 'The provided ID is not a valid MongoDB ObjectId'
      });
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        error: 'Validation failed',
        details: validationErrors
      });
    }
    
    res.status(500).json({
      error: 'Failed to update project',
      message: error.message
    });
  }
});

// PATCH /api/projects/:id/like - Increment project likes
router.patch('/:id/like', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        message: `Project with ID ${req.params.id} does not exist`
      });
    }

    await project.incrementLikes();
    
    res.json({
      message: 'Project liked successfully',
      likes: project.metadata.likes
    });
  } catch (error) {
    console.error('Error liking project:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid project ID',
        message: 'The provided ID is not a valid MongoDB ObjectId'
      });
    }
    
    res.status(500).json({
      error: 'Failed to like project',
      message: error.message
    });
  }
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        message: `Project with ID ${req.params.id} does not exist`
      });
    }

    res.json({
      message: 'Project deleted successfully',
      deletedProject: {
        id: project._id,
        name: project.name
      }
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid project ID',
        message: 'The provided ID is not a valid MongoDB ObjectId'
      });
    }
    
    res.status(500).json({
      error: 'Failed to delete project',
      message: error.message
    });
  }
});

export default router;
