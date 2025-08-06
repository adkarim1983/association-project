import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './AdminUsers.css';

const AdminUsers = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    role: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters);
      const response = await authFetch(`/api/admin/users?${queryParams}`);

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }

      const data = await response.json();
      setUsers(data.data.users);
      setPagination(data.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification du rôle');
      }

      const data = await response.json();
      
      // Mettre à jour la liste des utilisateurs
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));

      // Afficher un message de succès
      alert(data.message);
    } catch (err) {
      alert('Erreur: ' + err.message);
    }
  };

  const handleStatusChange = async (userId, isActive) => {
    try {
      const response = await authFetch(`/api/admin/users/${userId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ isActive })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification du statut');
      }

      const data = await response.json();
      
      // Mettre à jour la liste des utilisateurs
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isActive } : user
      ));

      alert(data.message);
    } catch (err) {
      alert('Erreur: ' + err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      const response = await authFetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      // Retirer l'utilisateur de la liste
      setUsers(users.filter(user => user._id !== userId));
      alert('Utilisateur supprimé avec succès');
    } catch (err) {
      alert('Erreur: ' + err.message);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value // Reset page when other filters change
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'admin': return 'role-badge admin';
      case 'moderator': return 'role-badge moderator';
      default: return 'role-badge user';
    }
  };

  if (loading) {
    return (
      <div className="admin-users loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users">
      <div className="users-header">
        <h1>Gestion des Utilisateurs</h1>
        <p>Gérer les utilisateurs, rôles et permissions</p>
      </div>

      {/* Filtres et recherche */}
      <div className="users-filters">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
          >
            <option value="">Tous les rôles</option>
            <option value="admin">Administrateur</option>
            <option value="moderator">Modérateur</option>
            <option value="user">Utilisateur</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="createdAt">Date de création</option>
            <option value="name">Nom</option>
            <option value="email">Email</option>
            <option value="role">Rôle</option>
          </select>

          <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
          >
            <option value="desc">Décroissant</option>
            <option value="asc">Croissant</option>
          </select>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Date d'inscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-id">ID: {user._id.slice(-8)}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <select
                    className={getRoleBadgeClass(user.role)}
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="user">Utilisateur</option>
                    <option value="moderator">Modérateur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </td>
                <td>
                  <label className="status-toggle">
                    <input
                      type="checkbox"
                      checked={user.isActive}
                      onChange={(e) => handleStatusChange(user._id, e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="status-text">
                      {user.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </label>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <div className="user-actions">
                    <button
                      className="action-btn view"
                      title="Voir le profil"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="action-btn edit"
                      title="Modifier"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="action-btn delete"
                      title="Supprimer"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={pagination.current === 1}
            onClick={() => handleFilterChange('page', pagination.current - 1)}
          >
            <i className="fas fa-chevron-left"></i>
            Précédent
          </button>

          <div className="page-numbers">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-number ${page === pagination.current ? 'active' : ''}`}
                onClick={() => handleFilterChange('page', page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="page-btn"
            disabled={pagination.current === pagination.pages}
            onClick={() => handleFilterChange('page', pagination.current + 1)}
          >
            Suivant
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}

      {/* Statistiques */}
      <div className="users-stats">
        <div className="stat">
          <span className="stat-label">Total:</span>
          <span className="stat-value">{pagination.total || 0}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Page:</span>
          <span className="stat-value">{pagination.current || 1} / {pagination.pages || 1}</span>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
