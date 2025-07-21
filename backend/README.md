# Association Najm Backend API

A robust Express.js backend server with MongoDB integration for managing projects with full CRUD operations and multilingual support.

## Features

- 🚀 **Express.js Server** with modern ES6+ modules
- 🗄️ **MongoDB Integration** with Mongoose ODM
- 🌍 **Internationalization (i18n)** support with automatic translation
- 🔒 **Security Features** (Helmet, CORS, Rate Limiting)
- 📊 **Project Management** with full CRUD operations
- 🗺️ **Geolocation Support** for nearby project searches
- 📱 **RESTful API** with comprehensive error handling
- 🌱 **Database Seeding** from existing project data

## Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

4. Seed the database with project data:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects with filtering and pagination |
| GET | `/api/projects/:id` | Get a single project by ID |
| POST | `/api/projects` | Create a new project |
| PUT | `/api/projects/:id` | Update a project |
| PATCH | `/api/projects/:id/like` | Increment project likes |
| DELETE | `/api/projects/:id` | Delete a project |
| GET | `/api/projects/categories` | Get all unique categories |
| GET | `/api/projects/locations` | Get all unique locations |

### Query Parameters for GET /api/projects

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `location` - Filter by location
- `status` - Filter by status (default: 'active')
- `search` - Text search in name and description
- `featured` - Filter featured projects (true/false)
- `lat`, `lng`, `radius` - Nearby search (radius in km)

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health status |

## Project Schema

```javascript
{
  name: String,           // Project name (translatable)
  category: String,       // Project category (translatable)
  location: String,       // Project location (translatable)
  coordinates: {
    lat: Number,          // Latitude
    lng: Number           // Longitude
  },
  contact: {
    phone: String,        // Contact phone
    email: String,        // Contact email
    website: String       // Project website
  },
  address: String,        // Full address (translatable)
  hours: String,          // Operating hours
  description: String,    // Project description (translatable)
  image: String,          // Project image URL
  status: String,         // 'active', 'inactive', 'pending'
  featured: Boolean,      // Featured project flag
  tags: [String],         // Project tags
  metadata: {
    views: Number,        // View count
    likes: Number         // Like count
  }
}
```

## Translation Support

The API supports automatic translation of project fields using i18next. Translatable fields include:
- `name`
- `category`
- `location`
- `address`
- `description`

Translation keys are stored in `locales/fr/translation.json` and can be extended for other languages.

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with project data

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/association_najm
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
DEFAULT_LANGUAGE=fr
```

## Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API request throttling
- **Input Validation** - Mongoose schema validation
- **Error Handling** - Comprehensive error responses

## Development

The backend is structured as follows:

```
backend/
├── config/          # Configuration files
├── locales/         # Translation files
├── models/          # Mongoose models
├── routes/          # Express routes
├── scripts/         # Utility scripts
├── .env             # Environment variables
├── .gitignore       # Git ignore rules
├── package.json     # Dependencies and scripts
├── README.md        # This file
└── server.js        # Main server file
```

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Ensure all environment variables are documented

## License

MIT License - see LICENSE file for details
