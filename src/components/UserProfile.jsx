import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

function UserProfile() {
  const { t } = useTranslation();
  const { user, logout, isAdminOrModerator } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return (
      <Link
        to="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
      >
        {t('auth.login', 'Login')}
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </span>
        </div>
        
        {/* User Name */}
        <span className="hidden md:block text-sm font-medium">
          {user.name || user.email}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          {/* User Info */}
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user.name || user.email}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user.role}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* Profile Link */}
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {t('auth.profile', 'Profile')}
            </Link>

            {/* Admin Dashboard Link */}
            {isAdminOrModerator() && (
              <Link
                to="/admin/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {t('auth.adminDashboard', 'Admin Dashboard')}
              </Link>
            )}

            {/* Settings Link */}
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {t('auth.settings', 'Settings')}
            </Link>

            {/* Divider */}
            <div className="border-t border-gray-100 my-1"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
            >
              {t('auth.logout', 'Logout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
