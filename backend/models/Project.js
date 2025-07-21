import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
      min: -90,
      max: 90
    },
    lng: {
      type: Number,
      required: true,
      min: -180,
      max: 180
    }
  },
  contact: {
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    website: {
      type: String,
      trim: true
    }
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  hours: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  metadata: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
projectSchema.index({ name: 'text', description: 'text' });
projectSchema.index({ category: 1 });
projectSchema.index({ location: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });

// Virtual for full address
projectSchema.virtual('fullAddress').get(function() {
  return `${this.address}, ${this.location}`;
});

// Method to increment views
projectSchema.methods.incrementViews = function() {
  this.metadata.views += 1;
  return this.save();
};

// Method to increment likes
projectSchema.methods.incrementLikes = function() {
  this.metadata.likes += 1;
  return this.save();
};

// Static method to find projects by category
projectSchema.statics.findByCategory = function(category) {
  return this.find({ category, status: 'active' });
};

// Static method to find projects by location
projectSchema.statics.findByLocation = function(location) {
  return this.find({ location, status: 'active' });
};

// Static method to find projects within radius
projectSchema.statics.findNearby = function(lat, lng, radiusInKm = 10) {
  const radiusInRadians = radiusInKm / 6371; // Earth's radius in km
  
  return this.find({
    'coordinates.lat': {
      $gte: lat - radiusInRadians,
      $lte: lat + radiusInRadians
    },
    'coordinates.lng': {
      $gte: lng - radiusInRadians,
      $lte: lng + radiusInRadians
    },
    status: 'active'
  });
};

const Project = mongoose.model('Project', projectSchema);

export default Project;
