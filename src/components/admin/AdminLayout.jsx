import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import './AdminLayout.css';

const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoadUser();
  }, []);

  const checkAuthAndLoadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Token invalide');
      }

      const data = await response.json();
      
      // Vérifier que l'utilisateur a les droits admin/moderator
      if (!['admin', 'moderator'].includes(data.data.user.role)) {
        throw new Error('Accès non autorisé');
      }

      setUser(data.data.user);
    } catch (err) {
      console.error('Erreur d\'authentification:', err);
      setError(err.message);
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="admin-layout loading">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <h3>Chargement de l'interface d'administration...</h3>
          <p>Vérification des permissions en cours</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout error">
        <div className="error-container">
          <div className="error-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3>Accès Refusé</h3>
          <p>{error}</p>
          <button 
            className="retry-btn"
            onClick={() => navigate('/login')}
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminNav user={user} onLogout={handleLogout} />
      
      <main className="admin-main">
        <div className="admin-content">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/projects" element={<AdminProjects />} />
            <Route path="/contacts" element={<AdminContacts />} />
            <Route path="/uploads" element={<AdminUploads />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Composants temporaires pour les routes manquantes
const AdminProjects = () => (
  <div className="admin-page">
    <div className="page-header">
      <h1>Gestion des Projets</h1>
      <p>Interface de gestion des projets en cours de développement</p>
    </div>
    <div className="coming-soon">
      <i className="fas fa-tools"></i>
      <h3>Bientôt disponible</h3>
      <p>Cette fonctionnalité sera disponible dans une prochaine mise à jour.</p>
    </div>
  </div>
);

const AdminContacts = () => (
  <div className="admin-page">
    <div className="page-header">
      <h1>Gestion des Messages</h1>
      <p>Interface de gestion des messages de contact en cours de développement</p>
    </div>
    <div className="coming-soon">
      <i className="fas fa-tools"></i>
      <h3>Bientôt disponible</h3>
      <p>Cette fonctionnalité sera disponible dans une prochaine mise à jour.</p>
    </div>
  </div>
);

const AdminUploads = () => (
  <div className="admin-page">
    <div className="page-header">
      <h1>Gestion des Uploads</h1>
      <p>Interface de gestion des fichiers uploadés en cours de développement</p>
    </div>
    <div className="coming-soon">
      <i className="fas fa-tools"></i>
      <h3>Bientôt disponible</h3>
      <p>Cette fonctionnalité sera disponible dans une prochaine mise à jour.</p>
    </div>
  </div>
);

const AdminSettings = () => (
  <div className="admin-page">
    <div className="page-header">
      <h1>Paramètres Système</h1>
      <p>Configuration et paramètres du système en cours de développement</p>
    </div>
    <div className="coming-soon">
      <i className="fas fa-tools"></i>
      <h3>Bientôt disponible</h3>
      <p>Cette fonctionnalité sera disponible dans une prochaine mise à jour.</p>
    </div>
  </div>
);

export default AdminLayout;
