import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = () => {
      setIsLoading(true);
      
      // Check localStorage for user data
      const storedUser = localStorage.getItem('najm_user');
      const storedToken = localStorage.getItem('najm_access_token');
      
      if (storedUser && storedToken) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('najm_user');
          localStorage.removeItem('najm_access_token');
          localStorage.removeItem('najm_refresh_token');
        }
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (identifier, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(identifier, password);
      setUser(response.user);
      setIsLoading(false);
      return response;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsLoading(false);
      return response;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setError(null);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole('admin');
  };

  // Check if user is moderator
  const isModerator = () => {
    return hasRole('moderator');
  };

  // Check if user is admin or moderator
  const isAdminOrModerator = () => {
    return isAdmin() || isModerator();
  };

  // Context value
  const value = {
    // State
    user,
    isAuthenticated: !!user,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    clearError,

    // Utility functions
    hasRole,
    isAdmin,
    isModerator,
    isAdminOrModerator,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

export default AuthContext;