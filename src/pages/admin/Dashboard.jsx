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

  const handleAddProject = async (projectData) => {
    if (!projectData.name.trim() || !projectData.category || !projectData.location || !projectData.description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const processedProjectData = {
        ...projectData,
        coordinates: {
          lat: parseFloat(projectData.coordinates?.lat) || 33.5731,
          lng: parseFloat(projectData.coordinates?.lng) || -7.5898
        }
      };

      await projectService.createProject(processedProjectData);
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

  const handleUpdateProject = async (projectData) => {
    if (!projectData.name.trim() || !projectData.category || !projectData.location || !projectData.description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const processedProjectData = {
        ...projectData,
        coordinates: {
          lat: parseFloat(projectData.coordinates?.lat) || 33.5731,
          lng: parseFloat(projectData.coordinates?.lng) || -7.5898
        }
      };

      await projectService.updateProject(editingProject._id, processedProjectData);
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

  const ProjectForm = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: project?.name || '',
      category: project?.category || '',
      location: project?.location || '',
      description: project?.description || '',
      contact: {
        phone: project?.contact?.phone || project?.phone || '',
        email: project?.contact?.email || project?.email || '',
        website: project?.contact?.website || project?.website || ''
      },
      address: project?.address || '',
      hours: project?.hours || '',
      image: project?.image || '',
      coordinates: {
        lat: project?.coordinates?.lat || 33.5731,
        lng: project?.coordinates?.lng || -7.5898
      }
    });

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

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          {project ? 'Modifier le projet' : 'Nouveau projet'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom du projet *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Catégorie *</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Restauration">Restauration</option>
                <option value="Marketing Digital">Marketing Digital</option>
                <option value="Événementiel">Événementiel</option>
                <option value="Design">Design</option>
                <option value="Production">Production</option>
                <option value="Commerce">Commerce</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Localisation *</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone</label>
              <input
                type="tel"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="contact.email"
                value={formData.contact.email}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Site web</label>
              <input
                type="url"
                name="contact.website"
                value={formData.contact.website}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Horaires</label>
            <input
              type="text"
              name="hours"
              placeholder="ex: 09:00 - 18:00"
              value={formData.hours}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL de l'image</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              required
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {project ? 'Mettre à jour' : 'Créer'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    );
  };

  const ProjectList = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Liste des projets ({projects.length})</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localisation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {project.image && (
                      <img className="h-10 w-10 rounded-full mr-3" src={project.image} alt={project.name} />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500">{project.description.substring(0, 50)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {project.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{project.phone}</div>
                  <div>{project.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun projet trouvé. Créez votre premier projet !
          </div>
        )}
      </div>
    </div>
  );

  const Overview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Total Projets</h3>
        <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Catégories</h3>
        <p className="text-3xl font-bold text-green-600">
          {new Set(projects.map(p => p.category)).size}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Localisations</h3>
        <p className="text-3xl font-bold text-purple-600">
          {new Set(projects.map(p => p.location)).size}
        </p>
      </div>
      {projects.length > 0 && (
        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Projets récents</h3>
          <div className="space-y-3">
            {projects.slice(-5).reverse().map(project => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h4 className="font-medium">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.category} • {project.location}</p>
                </div>
                <button
                  onClick={() => handleEditProject(project)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Voir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-600">Bienvenue, {user?.name || user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView('overview')}
            className={`px-4 py-2 rounded ${
              view === 'overview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Vue d'ensemble
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded ${
              view === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Projets ({projects.length})
          </button>
          <button
            onClick={() => {
              resetForm();
              setView('form');
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Nouveau projet
          </button>
        </div>

        {/* Content */}
        <div>
          {view === 'overview' && <Overview />}
          {view === 'list' && <ProjectList />}
          {view === 'form' && (
            <ProjectForm
              project={editingProject}
              onSave={editingProject ? handleUpdateProject : handleAddProject}
              onCancel={() => {
                resetForm();
                setView('list');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
