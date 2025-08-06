import authService from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ProjectService {
  // Get all projects with optional filters
  async getProjects(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Set a high limit to get all projects (or use a specific limit if provided)
      queryParams.append('limit', filters.limit || '1000');
      queryParams.append('page', filters.page || '1');
      
      // Add other filters to query params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '' && key !== 'limit' && key !== 'page') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/projects?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fr'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch projects');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  // Get a single project by ID
  async getProject(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fr'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch project');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  }

  // Create a new project (requires authentication)
  async createProject(projectData) {
    try {
      const token = authService.getAccessToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept-Language': 'fr'
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend error details:', errorData);
        
        // Handle token expiration
        if (response.status === 401) {
          try {
            await authService.refreshToken();
            return this.createProject(projectData); // Retry with new token
          } catch (refreshError) {
            authService.logout();
            throw new Error('Session expired. Please login again.');
          }
        }
        
        // Provide detailed error message
        const errorMessage = errorData.details ? 
          `Validation failed: ${errorData.details.map(d => d.message).join(', ')}` :
          errorData.message || 'Failed to create project';
        
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Update a project (requires authentication)
  async updateProject(id, projectData) {
    try {
      const token = authService.getAccessToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept-Language': 'fr'
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle token expiration
        if (response.status === 401) {
          try {
            await authService.refreshToken();
            return this.updateProject(id, projectData); // Retry with new token
          } catch (refreshError) {
            authService.logout();
            throw new Error('Session expired. Please login again.');
          }
        }
        
        throw new Error(errorData.message || 'Failed to update project');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // Delete a project (requires authentication)
  async deleteProject(id) {
    try {
      const token = authService.getAccessToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept-Language': 'fr'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle token expiration
        if (response.status === 401) {
          try {
            await authService.refreshToken();
            return this.deleteProject(id); // Retry with new token
          } catch (refreshError) {
            authService.logout();
            throw new Error('Session expired. Please login again.');
          }
        }
        
        throw new Error(errorData.message || 'Failed to delete project');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Get project categories
  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fr'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch categories');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Get project locations
  async getLocations() {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/locations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fr'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch locations');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }

  // Like a project
  async likeProject(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fr'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to like project');
      }

      return await response.json();
    } catch (error) {
      console.error('Error liking project:', error);
      throw error;
    }
  }
}

export const projectService = new ProjectService();
