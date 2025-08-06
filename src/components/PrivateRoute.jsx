import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

// Private route component that requires authentication
function PrivateRoute({ children, requiredRole = null, requiredRoles = [] }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role requirements if specified
  if (requiredRole || requiredRoles.length > 0) {
    const userRole = user?.role;
    
    // Check single required role
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
    
    // Check multiple required roles
    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and has required role
  return children;
}

// Admin route component (requires admin or moderator role)
export function AdminRoute({ children }) {
  return (
    <PrivateRoute requiredRoles={['admin', 'moderator']}>
      {children}
    </PrivateRoute>
  );
}

// Super admin route component (requires admin role only)
export function SuperAdminRoute({ children }) {
  return (
    <PrivateRoute requiredRole="admin">
      {children}
    </PrivateRoute>
  );
}

export default PrivateRoute;
