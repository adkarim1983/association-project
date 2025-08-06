import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

function Unauthorized() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {/* Error Icon */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {t('unauthorized.title', 'Access Denied')}
            </h2>

            {/* Message */}
            <p className="mt-2 text-sm text-gray-600">
              {t('unauthorized.message', 'You do not have permission to access this page.')}
            </p>

            {/* User Info */}
            {user && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">
                    {t('unauthorized.currentUser', 'Current user:')}
                  </span>{' '}
                  {user.name || user.email}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">
                    {t('unauthorized.currentRole', 'Role:')}
                  </span>{' '}
                  <span className="capitalize">{user.role}</span>
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <Link
                to="/"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('unauthorized.goHome', 'Go to Home Page')}
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('unauthorized.logout', 'Logout and Login as Different User')}
              </button>
            </div>

            {/* Help Text */}
            <p className="mt-6 text-xs text-gray-500">
              {t('unauthorized.help', 'If you believe this is an error, please contact your administrator.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
