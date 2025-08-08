import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo2.png';

function Splash() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const handleClick = () => {
    navigate('/');
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguageMenuOpen(false);
  };

  const currentLanguage = i18n.language || 'fr';

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center select-none overflow-hidden"
      style={{ cursor: 'pointer' }}
    >
      {/* Disable scroll */}
      <style>{`
        body { overflow: hidden; }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .fade-in-up-delay { animation: fadeInUp 0.8s ease-out 0.3s both; }
        .fade-in-up-delay-2 { animation: fadeInUp 0.8s ease-out 0.6s both; }
      `}</style>

      {/* Language Selector - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLanguageMenuOpen(!languageMenuOpen);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-white"
          >
            <span className="text-2xl">🌐</span>
            <span className="font-medium">{currentLanguage.toUpperCase()}</span>
          </button>

          {languageMenuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl z-50 p-3 space-y-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLanguageChange("fr");
                }}
                className="flex items-center gap-3 px-4 py-3 w-full hover:bg-blue-50 rounded-xl transition-all duration-200 group"
              >
                <img src="https://flagcdn.com/fr.svg" alt="Français" className="w-8 h-8 rounded-md shadow-sm" />
                <span className="font-medium text-gray-800 group-hover:text-blue-600">Français</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLanguageChange("en");
                }}
                className="flex items-center gap-3 px-4 py-3 w-full hover:bg-blue-50 rounded-xl transition-all duration-200 group"
              >
                <img src="https://flagcdn.com/gb.svg" alt="English" className="w-8 h-8 rounded-md shadow-sm" />
                <span className="font-medium text-gray-800 group-hover:text-blue-600">English</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLanguageChange("ar");
                }}
                className="flex items-center gap-3 px-4 py-3 w-full hover:bg-blue-50 rounded-xl transition-all duration-200 group"
              >
                <img src="https://flagcdn.com/ma.svg" alt="العربية" className="w-8 h-8 rounded-md shadow-sm" />
                <span className="font-medium text-gray-800 group-hover:text-blue-600">العربية</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '80%',
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="text-center">
          {/* Logo */}
          <div className="fade-in-up mb-12">
            <div className="relative inline-block">
              <img
                src={logo}
                alt="Association Najm"
                className="w-80 h-80 md:w-96 md:h-96 object-contain mx-auto filter drop-shadow-2xl"
              />
              <div className="absolute inset-0 shimmer rounded-full" />
            </div>
          </div>

          {/* Title */}
          <div className="fade-in-up-delay mb-8">
            <h1 className="text-5xl md:text-7xl font-light text-white mb-4 leading-tight">
              {currentLanguage === 'ar' ? 'مرحباً بكم في' : currentLanguage === 'en' ? 'Welcome to' : 'Bienvenue à'}
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              {currentLanguage === 'ar' ? 'جمعية نجم' : 'Association Najm'}
            </h2>
          </div>

          {/* Pillars */}
          <div className="fade-in-up-delay-2 mb-10">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
              <span className="px-6 py-3 text-lg md:text-xl rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-white/20 text-white font-medium">
                {currentLanguage === 'ar' ? 'الثقافة' : currentLanguage === 'en' ? 'Culture' : 'Culture'}
              </span>
              <span className="px-6 py-3 text-lg md:text-xl rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 text-white font-medium">
                {currentLanguage === 'ar' ? 'الشباب' : currentLanguage === 'en' ? 'Youth' : 'Jeunesse'}
              </span>
              <span className="px-6 py-3 text-lg md:text-xl rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-white/20 text-white font-medium">
                {currentLanguage === 'ar' ? 'الإدماج' : currentLanguage === 'en' ? 'Inclusion' : 'Inclusion'}
              </span>
            </div>

            <p className="text-xl md:text-2xl text-gray-200 font-light italic max-w-4xl mx-auto leading-relaxed">
              {currentLanguage === 'ar' 
                ? '"متحدون لنلهم ونبدع ونبني مستقبلاً أفضل"'
                : currentLanguage === 'en'
                ? '"United to inspire, create and build a better future"'
                : '"Unis pour inspirer, créer et construire un avenir meilleur"'
              }
            </p>
          </div>

          {/* Call to Action */}
          <div className="fade-in-up-delay-2">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300">
              <span className="text-lg font-medium">
                {currentLanguage === 'ar' ? 'انقر للدخول' : currentLanguage === 'en' ? 'Click to enter' : 'Cliquez pour entrer'}
              </span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Splash;
