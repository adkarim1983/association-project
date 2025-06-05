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
    className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-blue-100 transition duration-300 shadow-sm"
    title="Choisir la langue"
  >
    <svg
      className="w-5 h-5 text-blue-600"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.93-11.36a6.978 6.978 0 013-5.36 8.017 8.017 0 00-1.14 6.72 8.017 8.017 0 00-1.14 1.64zM4.07 10a6.962 6.962 0 011.45-4.45A8.008 8.008 0 0010 12c-2.21 0-4.2-.9-5.65-2.35A6.962 6.962 0 014.07 10z" />
    </svg>
  </button>

  {languageMenuOpen && (
    <div className="absolute right-0 mt-2 w-44 bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-xl z-50">
      <button
        onClick={() => handleLanguageChange("Français")}
        className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition"
      >
        FR Français
      </button>
      <button
        onClick={() => handleLanguageChange("English")}
        className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition"
      >
        ENG English
      </button>
      <button
        onClick={() => handleLanguageChange("العربية")}
        className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition"
      >
        MA العربية
      </button>
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
