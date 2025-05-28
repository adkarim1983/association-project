// src/components/Navbar.jsx
import { Link } from 'react-router';
import logo from '../assets/logo.png';
import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md fixed inset-x-0 top-0 z-50 h-20">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src={logo} alt="Logo Association Najm" className="h-16 w-auto cursor-pointer hover:scale-105 transition-transform duration-300" />
          </Link>
        </div>
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <nav
          className={`${isMenuOpen ? "bg-white flex flex-col items-center justify-center" : "hidden"
            } lg:flex space-x-6 text-gray-700 font-medium`}
        >
          {isMenuOpen && (
            <button
              className="absolute top-4 right-4 text-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <ul className="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
            <li>
              <Link to="/" className="relative group">
                <span className="hover:text-blue-600">Accueil</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="about-us" className="relative group">
                <span className="hover:text-blue-600">À propos de nous</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/Axe" className="relative group">
                <span className="hover:text-blue-600">Axe d'intervention</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/project" className="relative group">
                <span className="hover:text-blue-600">Projets</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <a href="#Nos Formations" className="relative group">
                <span className="hover:text-blue-600">Nos Formations</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <Link to="/contact" className="relative group">
                <span className="hover:text-blue-600">Contact</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
