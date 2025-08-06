const API_BASE_URL = 'http://localhost:5000/api';

class AuthService {
  constructor() {
    this.tokenKey = 'najm_access_token';
    this.refreshTokenKey = 'najm_refresh_token';
    this.userKey = 'najm_user';
  }

  // Get stored tokens
  getAccessToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  // Store tokens securely
  setTokens(accessToken, refreshToken) {
    localStorage.setItem(this.tokenKey, accessToken);
    if (refreshToken) {
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
  }

  // Get stored user data
  getUser() {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  // Store user data
  setUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Clear all auth data
  clearAuthData() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getAccessToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // Check if user has specific role
  hasRole(role) {
    const user = this.getUser();
    return user && user.role === role;
  }

  // Check if user is admin or moderator
  isAdminOrModerator() {
    const user = this.getUser();
    return user && (user.role === 'admin' || user.role === 'moderator');
  }

  // Login user
  async login(identifier, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store tokens and user data
      this.setTokens(data.accessToken, data.refreshToken);
      this.setUser(data.user);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register user (if needed)
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store tokens and user data
      this.setTokens(data.accessToken, data.refreshToken);
      this.setUser(data.user);

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Refresh access token
  async refreshAccessToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Token refresh failed');
      }

      // Update access token
      this.setTokens(data.accessToken, refreshToken);

      return data.accessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, clear auth data
      this.clearAuthData();
      throw error;
    }
  }

  // Get current user profile
  async getCurrentUser() {
    try {
      const response = await this.makeAuthenticatedRequest(`${API_BASE_URL}/auth/me`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user profile');
      }

      // Update stored user data
      this.setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (refreshToken) {
        // Call logout endpoint to invalidate tokens on server
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getAccessToken()}`,
          },
          body: JSON.stringify({
            refreshToken,
          }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local auth data
      this.clearAuthData();
    }
  }

  // Logout from all devices
  async logoutAll() {
    try {
      await this.makeAuthenticatedRequest(`${API_BASE_URL}/auth/logout-all`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout all error:', error);
    } finally {
      // Always clear local auth data
      this.clearAuthData();
    }
  }

  // Make authenticated request with automatic token refresh
  async makeAuthenticatedRequest(url, options = {}) {
    let accessToken = this.getAccessToken();

    if (!accessToken) {
      throw new Error('No access token available');
    }

    // First attempt with current token
    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // If token is expired, try to refresh
    if (response.status === 401) {
      try {
        accessToken = await this.refreshAccessToken();
        
        // Retry request with new token
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (refreshError) {
        // If refresh fails, redirect to login
        this.clearAuthData();
        window.location.href = '/login';
        throw refreshError;
      }
    }

    return response;
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;
