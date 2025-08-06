import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../services/projectService';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [view, setView] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
    contact: {
      phone: '',
      email: '',
      website: ''
    },
    address: '',
    hours: '',
    image: '',
    coordinates: {
      lat: 33.5731,
      lng: -7.5898
    }
  });

  // Load projects from backend API
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectService.getProjects();
      setProjects(response.projects || []);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      location: '',
      description: '',
      contact: {
        phone: '',
        email: '',
        website: ''
      },
      address: '',
      hours: '',
      image: '',
      coordinates: {
        lat: 33.5731,
        lng: -7.5898
      }
    });
    setEditingProject(null);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.category || !formData.location || !formData.description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const projectData = {
        ...formData,
        coordinates: {
          lat: parseFloat(formData.coordinates.lat) || 33.5731,
          lng: parseFloat(formData.coordinates.lng) || -7.5898
        }
      };

      await projectService.createProject(projectData);
      await loadProjects();
      resetForm();
      setView('list');
    } catch (err) {
      console.error('Error adding project:', err);
      setError(err.message || 'Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name || '',
      category: project.category || '',
      location: project.location || '',
      description: project.description || '',
      contact: {
        phone: project.contact?.phone || '',
        email: project.contact?.email || '',
        website: project.contact?.website || ''
      },
      address: project.address || '',
      hours: project.hours || '',
      image: project.image || '',
      coordinates: {
        lat: project.coordinates?.lat || 33.5731,
        lng: project.coordinates?.lng || -7.5898
      }
    });
    setView('form');
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.category || !formData.location || !formData.description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const projectData = {
        ...formData,
        coordinates: {
          lat: parseFloat(formData.coordinates.lat) || 33.5731,
          lng: parseFloat(formData.coordinates.lng) || -7.5898
        }
      };

      await projectService.updateProject(editingProject._id, projectData);
      await loadProjects();
      resetForm();
      setView('list');
    } catch (err) {
      console.error('Error updating project:', err);
      setError(err.message || 'Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId, projectName) => {
    if (window.confirm(`Are you sure you want to delete "${projectName}"?`)) {
      try {
        setLoading(true);
        setError(null);
        await projectService.deleteProject(projectId);
        await loadProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
        setError(err.message || 'Failed to delete project');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your projects</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-medium">{user?.name || user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setView('overview')}
            className={`px-4 py-2 rounded ${view === 'overview' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`}
          >
            Projects
          </button>
          <button
            onClick={() => {
              resetForm();
              setView('form');
            }}
            className={`px-4 py-2 rounded ${view === 'form' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`}
          >
            Add Project
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Content Views */}
        {!loading && view === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900">Total Projects</h3>
                <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-900">Categories</h3>
                <p className="text-3xl font-bold text-green-600">{[...new Set(projects.map(p => p.category))].length}</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900">Locations</h3>
                <p className="text-3xl font-bold text-purple-600">{[...new Set(projects.map(p => p.location))].length}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && view === 'list' && (
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">All Projects</h3>
                <button
                  onClick={() => setView('form')}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add New Project
                </button>
              </div>
            </div>
            
            {projects.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project._id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {project.image && (
                              <img className="h-10 w-10 rounded-full mr-3 object-cover" src={project.image} alt={project.name} />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{project.name}</div>
                              <div className="text-sm text-gray-500">{project.description?.substring(0, 50)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{project.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{project.location}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div>{project.contact?.phone}</div>
                          <div>{project.contact?.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project._id, project.name)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No projects found</p>
                <button
                  onClick={() => setView('form')}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Your First Project
                </button>
              </div>
            )}
          </div>
        )}

        {!loading && view === 'form' && (
          <div className="bg-white rounded-lg border p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
            </div>

            <form onSubmit={editingProject ? handleUpdateProject : handleAddProject} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Restauration">Restauration</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                    <option value="Événementiel">Événementiel</option>
                    <option value="Design">Design</option>
                    <option value="Production">Production</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    name="contact.website"
                    value={formData.contact.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
                  <input
                    type="text"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    placeholder="e.g., 9:00 - 18:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setView('list');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
