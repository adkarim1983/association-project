import { Link } from 'react-router-dom';
import logo2 from '../assets/logo2.png';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [language, setLanguage] = useState("Français");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setLanguageMenuOpen(false);
  };

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

        {/* Menu Desktop */}
        <ul className="hidden lg:flex items-center space-x-6 font-medium text-gray-700">
          {["/", "about-us", "/Axe", "/project", "/contact"].map((path, i) => {
            const labels = [
              "Accueil", "À propos de nous", "Axe d'intervention",
              "Projets", "Contact"
            ];
            return (
              <li key={path}>
                <Link to={path} className="relative group">
                  <span className="hover:text-blue-600">{labels[i]}</span>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            );
          })}

          {/* Bouton langue (desktop) */}
          <li className="relative">
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="text-gray-700 font-medium border border-gray-300 px-3 py-1 rounded-md hover:text-blue-600"
            >
              {language}
            </button>

            {languageMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-50">
                <button onClick={() => handleLanguageChange("Français")} className="block w-full text-left px-4 py-2 hover:text-blue-600">Français</button>
                <button onClick={() => handleLanguageChange("English")} className="block w-full text-left px-4 py-2 hover:text-blue-600">English</button>
                <button onClick={() => handleLanguageChange("العربية")} className="block w-full text-left px-4 py-2 hover:text-blue-600">العربية</button>
              </div>
            )}
          </li>
        </ul>

        {/* Burger Button (mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-700 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-6 pb-4">
          <ul className="flex flex-col space-y-4 mt-4 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
            <li><Link to="/about-us" onClick={() => setIsMenuOpen(false)}>À propos de nous</Link></li>
            <li><Link to="/Axe" onClick={() => setIsMenuOpen(false)}>Axe d'intervention</Link></li>
            <li><Link to="/project" onClick={() => setIsMenuOpen(false)}>Projets</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>

            {/* Langue Mobile */}
            <li className="pt-2 border-t">
              Langue :
              <div className="flex gap-4 mt-2">
                <button onClick={() => handleLanguageChange("Français")} className="hover:text-blue-600">FR</button>
                <button onClick={() => handleLanguageChange("English")} className="hover:text-blue-600">EN</button>
                <button onClick={() => handleLanguageChange("العربية")} className="hover:text-blue-600">AR</button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
