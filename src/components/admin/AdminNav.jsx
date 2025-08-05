import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminNav.css';

const AdminNav = ({ user, onLogout }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: 'fas fa-tachometer-alt',
      label: 'Tableau de Bord',
      description: 'Vue d\'ensemble et statistiques'
    },
    {
      path: '/admin/users',
      icon: 'fas fa-users',
      label: 'Utilisateurs',
      description: 'Gestion des utilisateurs et rôles'
    },
    {
      path: '/admin/projects',
      icon: 'fas fa-project-diagram',
      label: 'Projets',
      description: 'Gestion des projets'
    },
    {
      path: '/admin/contacts',
      icon: 'fas fa-envelope',
      label: 'Messages',
      description: 'Gestion des contacts'
    },
    {
      path: '/admin/uploads',
      icon: 'fas fa-cloud-upload-alt',
      label: 'Uploads',
      description: 'Gestion des fichiers'
    },
    {
      path: '/admin/settings',
      icon: 'fas fa-cog',
      label: 'Paramètres',
      description: 'Configuration système'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="admin-nav">
      <div className="admin-nav-header">
        <div className="admin-logo">
          <i className="fas fa-shield-alt"></i>
          <span>Admin Panel</span>
        </div>
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      <div className={`admin-nav-content ${isMenuOpen ? 'open' : ''}`}>
        {/* User Info */}
        <div className="admin-user-info">
          <div className="user-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
            )}
          </div>
          <div className="user-details">
            <div className="user-name">{user?.name || 'Administrateur'}</div>
            <div className="user-role">{user?.role || 'admin'}</div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="admin-nav-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="nav-icon">
                <i className={item.icon}></i>
              </div>
              <div className="nav-content">
                <div className="nav-label">{item.label}</div>
                <div className="nav-description">{item.description}</div>
              </div>
              {isActive(item.path) && <div className="nav-indicator"></div>}
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="admin-quick-actions">
          <h4>Actions Rapides</h4>
          <div className="quick-action-buttons">
            <button className="quick-btn" title="Nouveau projet">
              <i className="fas fa-plus"></i>
              <span>Nouveau</span>
            </button>
            <button className="quick-btn" title="Statistiques">
              <i className="fas fa-chart-bar"></i>
              <span>Stats</span>
            </button>
            <button className="quick-btn" title="Sauvegarde">
              <i className="fas fa-download"></i>
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="admin-system-status">
          <div className="status-item">
            <div className="status-indicator online"></div>
            <span>Système en ligne</span>
          </div>
          <div className="status-item">
            <div className="status-indicator"></div>
            <span>Base de données OK</span>
          </div>
        </div>

        {/* Logout */}
        <div className="admin-nav-footer">
          <Link to="/" className="back-to-site">
            <i className="fas fa-arrow-left"></i>
            Retour au site
          </Link>
          <button className="logout-btn" onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
