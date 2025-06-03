import { Link } from 'react-router-dom';
import logo2 from '../assets/logo2.png';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo2}
            alt="Logo Association Najm"
            className="h-14 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Burger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Menu Desktop */}
        <ul className="hidden lg:flex space-x-6 font-medium text-gray-700">
          {["/", "about-us", "/Axe", "/project", "#Nos Formations", "/contact"].map((path, i) => {
            const labels = [
              "Accueil", "À propos de nous", "Axe d'intervention",
              "Projets", "Nos Formations", "Contact"
            ];
            const isHash = path.startsWith("#");

            return (
              <li key={path}>
                {isHash ? (
                  <a href={path} className="relative group">
                    <span className="hover:text-blue-600">{labels[i]}</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ) : (
                  <Link to={path} className="relative group">
                    <span className="hover:text-blue-600">{labels[i]}</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-6 pb-4">
          <ul className="flex flex-col space-y-4 mt-4 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
            <li><Link to="/about-us" onClick={() => setIsMenuOpen(false)}>À propos de nous</Link></li>
            <li><Link to="/Axe" onClick={() => setIsMenuOpen(false)}>Axe d'intervention</Link></li>
            <li><Link to="/project" onClick={() => setIsMenuOpen(false)}>Projets</Link></li>
            <li><a href="#Nos Formations" onClick={() => setIsMenuOpen(false)}>Nos Formations</a></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
