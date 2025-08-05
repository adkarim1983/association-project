import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();
      setDashboardData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard error">
        <div className="error-message">
          <h3>Erreur</h3>
          <p>{error}</p>
          <button onClick={fetchDashboardData} className="retry-btn">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Tableau de Bord Administrateur</h1>
        <p>Vue d'ensemble de la plateforme Association Najm</p>
      </div>

      {/* Statistiques principales */}
      <div className="stats-grid">
        <div className="stat-card users">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>Utilisateurs</h3>
            <div className="stat-number">{dashboardData?.users?.total || 0}</div>
            <div className="stat-details">
              <span className="active">Actifs: {dashboardData?.users?.active || 0}</span>
              <span className="recent">Nouveaux: {dashboardData?.users?.recent || 0}</span>
            </div>
          </div>
        </div>

        <div className="stat-card projects">
          <div className="stat-icon">
            <i className="fas fa-project-diagram"></i>
          </div>
          <div className="stat-content">
            <h3>Projets</h3>
            <div className="stat-number">{dashboardData?.projects?.total || 0}</div>
            <div className="stat-details">
              <span className="active">Actifs: {dashboardData?.projects?.active || 0}</span>
              <span className="featured">Mis en avant: {dashboardData?.projects?.featured || 0}</span>
            </div>
          </div>
        </div>

        <div className="stat-card contacts">
          <div className="stat-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <div className="stat-content">
            <h3>Messages</h3>
            <div className="stat-number">{dashboardData?.contacts?.total || 0}</div>
            <div className="stat-details">
              <span className="new">Nouveaux: {dashboardData?.contacts?.new || 0}</span>
              <span className="replied">Traités: {dashboardData?.contacts?.replied || 0}</span>
            </div>
          </div>
        </div>

        <div className="stat-card activity">
          <div className="stat-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-content">
            <h3>Activité (7j)</h3>
            <div className="stat-number">
              {(dashboardData?.users?.recent || 0) + 
               (dashboardData?.projects?.recent || 0) + 
               (dashboardData?.contacts?.recent || 0)}
            </div>
            <div className="stat-details">
              <span className="trend">↗️ En hausse</span>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques et tableaux */}
      <div className="dashboard-content">
        <div className="dashboard-row">
          {/* Projets les plus vus */}
          <div className="dashboard-widget">
            <div className="widget-header">
              <h3>Projets les Plus Vus</h3>
              <i className="fas fa-eye"></i>
            </div>
            <div className="widget-content">
              {dashboardData?.projects?.topViewed?.length > 0 ? (
                <div className="top-projects-list">
                  {dashboardData.projects.topViewed.map((project, index) => (
                    <div key={project._id} className="project-item">
                      <div className="project-rank">#{index + 1}</div>
                      <div className="project-info">
                        <div className="project-name">{project.name}</div>
                        <div className="project-stats">
                          <span className="views">👁️ {project.metadata.views}</span>
                          <span className="likes">❤️ {project.metadata.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">Aucune donnée disponible</p>
              )}
            </div>
          </div>

          {/* Répartition des contacts */}
          <div className="dashboard-widget">
            <div className="widget-header">
              <h3>Contacts par Catégorie</h3>
              <i className="fas fa-chart-pie"></i>
            </div>
            <div className="widget-content">
              {dashboardData?.contacts?.byCategory?.length > 0 ? (
                <div className="category-list">
                  {dashboardData.contacts.byCategory.map((category) => (
                    <div key={category._id} className="category-item">
                      <div className="category-name">{category._id}</div>
                      <div className="category-count">{category.count}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">Aucune donnée disponible</p>
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-row">
          {/* Répartition des rôles */}
          <div className="dashboard-widget">
            <div className="widget-header">
              <h3>Répartition des Rôles</h3>
              <i className="fas fa-user-shield"></i>
            </div>
            <div className="widget-content">
              <div className="roles-chart">
                <div className="role-item">
                  <div className="role-label">Administrateurs</div>
                  <div className="role-bar">
                    <div 
                      className="role-fill admin" 
                      style={{width: `${(dashboardData?.users?.admins / dashboardData?.users?.total * 100) || 0}%`}}
                    ></div>
                  </div>
                  <div className="role-count">{dashboardData?.users?.admins || 0}</div>
                </div>
                <div className="role-item">
                  <div className="role-label">Modérateurs</div>
                  <div className="role-bar">
                    <div 
                      className="role-fill moderator" 
                      style={{width: `${(dashboardData?.users?.moderators / dashboardData?.users?.total * 100) || 0}%`}}
                    ></div>
                  </div>
                  <div className="role-count">{dashboardData?.users?.moderators || 0}</div>
                </div>
                <div className="role-item">
                  <div className="role-label">Utilisateurs</div>
                  <div className="role-bar">
                    <div 
                      className="role-fill user" 
                      style={{width: `${((dashboardData?.users?.total - dashboardData?.users?.admins - dashboardData?.users?.moderators) / dashboardData?.users?.total * 100) || 0}%`}}
                    ></div>
                  </div>
                  <div className="role-count">
                    {(dashboardData?.users?.total - dashboardData?.users?.admins - dashboardData?.users?.moderators) || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="dashboard-widget">
            <div className="widget-header">
              <h3>Actions Rapides</h3>
              <i className="fas fa-bolt"></i>
            </div>
            <div className="widget-content">
              <div className="quick-actions">
                <button className="action-btn users" onClick={() => window.location.href = '/admin/users'}>
                  <i className="fas fa-users"></i>
                  Gérer les Utilisateurs
                </button>
                <button className="action-btn projects" onClick={() => window.location.href = '/admin/projects'}>
                  <i className="fas fa-project-diagram"></i>
                  Gérer les Projets
                </button>
                <button className="action-btn contacts" onClick={() => window.location.href = '/admin/contacts'}>
                  <i className="fas fa-envelope"></i>
                  Gérer les Messages
                </button>
                <button className="action-btn uploads" onClick={() => window.location.href = '/admin/uploads'}>
                  <i className="fas fa-cloud-upload-alt"></i>
                  Gérer les Uploads
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
