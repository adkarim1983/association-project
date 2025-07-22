// import { Link } from 'react-router-dom';
// import logo2 from '../assets/logo2.png';
// import { useState } from 'react';
// import { useTranslation } from "react-i18next";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

//   const { t, i18n } = useTranslation();

//   const handleLanguageChange = (lang) => {
//     i18n.changeLanguage(lang);
//     document.documentElement.lang = lang;
//     document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
//     setLanguageMenuOpen(false);
//   };

//   return (
//     <header className="bg-white shadow-md fixed top-0 left-0 w-full z-99">
//       <div className="mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
//         {/* Logo */}
//         <Link to="/">
//           <img
//             src={logo2}
//             alt="Logo Association Najm"
//             className="h-14 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
//           />
//         </Link>

//         {/* Menu Desktop */}
//         <ul className="hidden lg:flex items-center space-x-6 font-medium text-gray-700">
//           <li><Link to="/">{t("menu.accueil")}</Link></li>
//           <li><Link to="/about-us">{t("menu.a_propos")}</Link></li>
//           <li><Link to="/Axe">{t("menu.axe")}</Link></li>
//           <li><Link to="/project">{t("menu.projets")}</Link></li>
//           <Link to="/galerie" onClick={() => setIsMenuOpen(false)}>{t("menu.galerie")}
//           </Link>
//           <li><Link to="/contact">{t("menu.contact")}</Link></li>

//           {/* Langue Desktop */}
//           <li className="relative">
//             <button
//               onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
//               className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-blue-100 transition duration-300 shadow-sm"
//               title="Choisir la langue"
//             >
//               🌐
//             </button>

//             {languageMenuOpen && (
//               <div className="absolute right-0 mt-2 w-44 bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-xl z-50">
//                 <button onClick={() => handleLanguageChange("fr")} className="block px-4 py-2 w-full text-left hover:bg-blue-50">FR - Français</button>
//                 <button onClick={() => handleLanguageChange("en")} className="block px-4 py-2 w-full text-left hover:bg-blue-50">EN - English</button>
//                 <button onClick={() => handleLanguageChange("ar")} className="block px-4 py-2 w-full text-left hover:bg-blue-50">AR - العربية</button>
//               </div>
//             )}
//           </li>
//         </ul>

//         {/* Burger Button (mobile) */}
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="lg:hidden text-gray-700"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>

//       {/* Menu Mobile */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-white border-t border-gray-200 px-6 pb-4">
//           <ul className="flex flex-col space-y-4 mt-4 text-gray-700 font-medium">
//             <li><Link to="/" onClick={() => setIsMenuOpen(false)}>{t("menu.accueil")}</Link></li>
//             <li><Link to="/about-us" onClick={() => setIsMenuOpen(false)}>{t("menu.a_propos")}</Link></li>
//             <li><Link to="/Axe" onClick={() => setIsMenuOpen(false)}>{t("menu.axe")}</Link></li>
//             <li><Link to="/project" onClick={() => setIsMenuOpen(false)}>{t("menu.projets")}</Link></li>

//             <li><Link to="/galerie" onClick={() => setIsMenuOpen(false)}>{t("menu.galerie")}</Link></li>

//             <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>{t("menu.contact")}</Link></li>

//             <li className="pt-2 border-t">
//               Langue :
//               <div className="flex gap-4 mt-2">
//                 <button onClick={() => handleLanguageChange("fr")} className="hover:text-blue-600">FR</button>
//                 <button onClick={() => handleLanguageChange("en")} className="hover:text-blue-600">EN</button>
//                 <button onClick={() => handleLanguageChange("ar")} className="hover:text-blue-600">AR</button>
//               </div>
//             </li>
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// }
import { Link } from 'react-router-dom';
import logo2 from '../assets/logo2.png';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    closeMobileMenu(); // ferme tous les menus
  };

  // Fonction pour fermer le menu mobile
  const closeMobileMenu = () => {
    console.log('closeMobileMenu called'); // Debug
    setIsMenuOpen(false);
    setLanguageMenuOpen(false);
  };

  // Effect pour fermer le menu mobile avec diverses interactions
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Vérifier si le clic est en dehors du menu ET ne vient pas du bouton burger
      const burgerButton = document.querySelector('[data-burger-button]');
      const isClickOnBurger = burgerButton && burgerButton.contains(event.target);
      
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) && 
          !isClickOnBurger) {
        closeMobileMenu();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    const handleScroll = () => {
      if (isMenuOpen) {
        closeMobileMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        closeMobileMenu();
      }
    };

    // Ajouter les event listeners
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    }

    // Nettoyer les event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  // get the current language from i18n
  const currentLanguage = i18n.language || 'fr';

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="mx-auto px-4 py-3 flex items-center justify-between max-w-7xl" style={{ direction: 'ltr' }}>
        {/* Logo */}
        <Link to="/">
          <img
            src={logo2}
            alt="Logo Association Najm"
            className="h-20 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Menu Desktop */}
        <ul className={`hidden lg:flex ${currentLanguage === 'ar' ? 'flex-row-reverse' : ''} items-center space-x-6 font-medium text-white`}>
          <li>
            <Link to="/" className="relative group text-black transition-colors duration-300" style={{ '&:hover': { color: '#1B7CC1' } }} onMouseEnter={(e) => e.target.style.color = '#1B7CC1'} onMouseLeave={(e) => e.target.style.color = 'black'}>
              {t("menu.accueil")}
              <span
                className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: '#1B7CC1' }}
              ></span>
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="relative group text-black transition-colors duration-300" onMouseEnter={(e) => e.target.style.color = '#FCBD18'} onMouseLeave={(e) => e.target.style.color = 'black'}>
              {t("menu.a_propos")}
              <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: '#FCBD18' }}
              ></span>
            </Link>
          </li>
          <li>
            <Link to="/Axe" className="relative group text-black transition-colors duration-300" onMouseEnter={(e) => e.target.style.color = '#673D98'} onMouseLeave={(e) => e.target.style.color = 'black'}>
              {t("menu.axe")}
              <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: '#673D98' }}
              ></span>
            </Link>
          </li>
          <li>
            <Link to="/project" className="relative group text-black transition-colors duration-300" onMouseEnter={(e) => e.target.style.color = '#FCBD18'} onMouseLeave={(e) => e.target.style.color = 'black'}>
              {t("menu.projets")}
              <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: '#FCBD18' }}
              ></span>
            </Link>
          </li>
          <li>
            <Link to="/academie-najm" className="relative group text-black transition-colors duration-300" onMouseEnter={(e) => e.target.style.color = '#56B04A'} onMouseLeave={(e) => e.target.style.color = 'black'}>
              {t("menu.academie_najm")}
              <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: '#56B04A' }}
              ></span>
            </Link>
          </li>
          <li>
            <Link to="/galerie" className="relative group text-black transition-colors duration-300" onMouseEnter={(e) => e.target.style.color = '#2D7FC1'} onMouseLeave={(e) => e.target.style.color = 'black'}>
              {t("menu.galerie")}
              <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: '#2D7FC1' }}
              ></span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="relative group text-black transition-colors duration-300" onMouseEnter={(e) => e.target.style.color = '#FCBD18'} onMouseLeave={(e) => e.target.style.color = 'black'}>
              {t("menu.contact")}
              <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: '#FCBD18' }}
              ></span>
            </Link>
          </li>

          {/* Académie Najm */}
          {/* Langue Desktop */}
          <li className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="w-10 h-10 rounded-full bg-white border border-gray-600 flex items-center justify-center hover:bg-white transition duration-300 shadow-sm"
              title="Choisir la langue"
            >
              🌐
            </button>

            {languageMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-md border border-gray-600 shadow-2xl rounded-xl z-50 p-2 space-y-2">
                <button
                  onClick={() => handleLanguageChange("fr")}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-yellow-400 hover:text-black rounded-lg transition text-white"
                >
                  <img src="https://flagcdn.com/fr.svg" alt="Français" className="w-5 h-5 rounded-sm" />
                  Français
                </button>

                <button
                  onClick={() => handleLanguageChange("en")}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-yellow-400 hover:text-black rounded-lg transition text-white"
                >
                  <img src="https://flagcdn.com/gb.svg" alt="English" className="w-5 h-5 rounded-sm" />
                  English
                </button>

                <button
                  onClick={() => handleLanguageChange("ar")}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-yellow-400 hover:text-black rounded-lg transition text-white"
                >
                  <img src="https://flagcdn.com/ma.svg" alt="العربية" className="w-5 h-5 rounded-sm" />
                  العربية
                </button>
              </div>
            )}
          </li>
        </ul>

        {/* Burger Button (mobile) avec animation croix */}
        <button
          data-burger-button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Burger clicked, isMenuOpen:', isMenuOpen); // Debug
            setIsMenuOpen(!isMenuOpen);
          }}
          className="lg:hidden text-white p-2 relative w-10 h-10 focus:outline-none hover:bg-white/10 rounded-lg transition-all duration-200 z-50"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <div className="w-6 h-6 relative flex flex-col justify-center items-center pointer-events-none">
            {/* Ligne du haut */}
            <span
              className={`block h-0.5 w-6 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1.5'
              }`}
            />
            {/* Ligne du milieu */}
            <span
              className={`block h-0.5 w-6 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            {/* Ligne du bas */}
            <span
              className={`block h-0.5 w-6 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1.5'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden relative bg-black border-t border-gray-700 px-6 pb-4 overflow-hidden"
        >
          {/* ✅ Image en arrière-plan (logo2) */}
          <img
            src={logo2}
            alt="Fond mobile"
            className="absolute top-1/2 left-1/2 w-72 opacity-10 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          />
          <ul className="flex flex-col space-y-4 mt-4 text-white font-medium">
            <li>
              <Link 
                to="/" 
                onClick={closeMobileMenu} 
                className="relative group transition-colors duration-300 block py-2" 
                onMouseEnter={(e) => e.target.style.color = '#1B7CC1'} 
                onMouseLeave={(e) => e.target.style.color = 'white'}
                onTouchStart={(e) => e.target.style.color = '#1B7CC1'}
                onTouchEnd={(e) => setTimeout(() => e.target.style.color = 'white', 150)}
              >
                {t("menu.accueil")}
                <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full group-active:w-full" style={{ backgroundColor: '#1B7CC1' }}></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/about-us" 
                onClick={closeMobileMenu} 
                className="relative group transition-colors duration-300 block py-2" 
                onMouseEnter={(e) => e.target.style.color = '#FCBD18'} 
                onMouseLeave={(e) => e.target.style.color = 'white'}
                onTouchStart={(e) => e.target.style.color = '#FCBD18'}
                onTouchEnd={(e) => setTimeout(() => e.target.style.color = 'white', 150)}
              >
                {t("menu.a_propos")}
                <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full group-active:w-full" style={{ backgroundColor: '#FCBD18' }}></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/Axe" 
                onClick={closeMobileMenu} 
                className="relative group transition-colors duration-300 block py-2" 
                onMouseEnter={(e) => e.target.style.color = '#673D98'} 
                onMouseLeave={(e) => e.target.style.color = 'white'}
                onTouchStart={(e) => e.target.style.color = '#673D98'}
                onTouchEnd={(e) => setTimeout(() => e.target.style.color = 'white', 150)}
              >
                {t("menu.axe")}
                <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full group-active:w-full" style={{ backgroundColor: '#673D98' }}></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/project" 
                onClick={closeMobileMenu} 
                className="relative group transition-colors duration-300 block py-2" 
                onMouseEnter={(e) => e.target.style.color = '#FCBD18'} 
                onMouseLeave={(e) => e.target.style.color = 'white'}
                onTouchStart={(e) => e.target.style.color = '#FCBD18'}
                onTouchEnd={(e) => setTimeout(() => e.target.style.color = 'white', 150)}
              >
                {t("menu.projets")}
                <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full group-active:w-full" style={{ backgroundColor: '#FCBD18' }}></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/academie-najm" 
                onClick={closeMobileMenu} 
                className="relative group transition-colors duration-300 block py-2" 
                onMouseEnter={(e) => e.target.style.color = '#56B04A'} 
                onMouseLeave={(e) => e.target.style.color = 'white'}
                onTouchStart={(e) => e.target.style.color = '#56B04A'}
                onTouchEnd={(e) => setTimeout(() => e.target.style.color = 'white', 150)}
              >
                {t("menu.academie_najm")}
                <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full group-active:w-full" style={{ backgroundColor: '#56B04A' }}></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/galerie" 
                onClick={closeMobileMenu} 
                className="relative group transition-colors duration-300 block py-2" 
                onMouseEnter={(e) => e.target.style.color = '#2D7FC1'} 
                onMouseLeave={(e) => e.target.style.color = 'white'}
                onTouchStart={(e) => e.target.style.color = '#2D7FC1'}
                onTouchEnd={(e) => setTimeout(() => e.target.style.color = 'white', 150)}
              >
                {t("menu.galerie")}
                <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full group-active:w-full" style={{ backgroundColor: '#2D7FC1' }}></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                onClick={closeMobileMenu} 
                className="relative group transition-colors duration-300 block py-2" 
                onMouseEnter={(e) => e.target.style.color = '#FCBD18'} 
                onMouseLeave={(e) => e.target.style.color = 'white'}
                onTouchStart={(e) => e.target.style.color = '#FCBD18'}
                onTouchEnd={(e) => setTimeout(() => e.target.style.color = 'white', 150)}
              >
                {t("menu.contact")}
                <span className="absolute left-0 -bottom-1 w-0 h-1 transition-all duration-300 group-hover:w-full group-active:w-full" style={{ backgroundColor: '#FCBD18' }}></span>
              </Link>
            </li>
            
            
            
            


            <li className="pt-2 border-t border-gray-700">
              <p className="mb-2 text-white">Langue :</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => handleLanguageChange("fr")} className="flex items-center gap-2 hover:text-yellow-400 text-white transition-colors duration-300">
                  <img src="https://flagcdn.com/fr.svg" alt="Français" className="w-5 h-5 rounded-sm" />
                  Français
                </button>
                <button onClick={() => handleLanguageChange("en")} className="flex items-center gap-2 hover:text-yellow-400 text-white transition-colors duration-300">
                  <img src="https://flagcdn.com/gb.svg" alt="English" className="w-5 h-5 rounded-sm" />
                  English
                </button>
                <button onClick={() => handleLanguageChange("ar")} className="flex items-center gap-2 hover:text-yellow-400 text-white transition-colors duration-300">
                  <img src="https://flagcdn.com/ma.svg" alt="العربية" className="w-5 h-5 rounded-sm" />
                  العربية
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
