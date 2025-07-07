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
import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    setLanguageMenuOpen(false);
    setIsMenuOpen(false); // ferme le menu mobile aussi
  };

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
        <ul className="hidden lg:flex items-center space-x-6 font-medium text-gray-700">
          <li><Link to="/">{t("menu.accueil")}</Link></li>
          <li><Link to="/about-us">{t("menu.a_propos")}</Link></li>
          <li><Link to="/Axe">{t("menu.axe")}</Link></li>
          <li><Link to="/project">{t("menu.projets")}</Link></li>
          <li><Link to="/galerie">{t("menu.galerie")}</Link></li>
          <li><Link to="/contact">{t("menu.contact")}</Link></li>

          {/* Langue Desktop */}
          <li className="relative">
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-blue-100 transition duration-300 shadow-sm"
              title="Choisir la langue"
            >
              🌐
            </button>

            {languageMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-xl z-50 p-2 space-y-2">
                <button
                  onClick={() => handleLanguageChange("fr")}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-blue-100 rounded-lg transition"
                >
                  <img src="https://flagcdn.com/fr.svg" alt="Français" className="w-5 h-5 rounded-sm" />
                  Français
                </button>

                <button
                  onClick={() => handleLanguageChange("en")}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-blue-100 rounded-lg transition"
                >
                  <img src="https://flagcdn.com/gb.svg" alt="English" className="w-5 h-5 rounded-sm" />
                  English
                </button>

                <button
                  onClick={() => handleLanguageChange("ar")}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-blue-100 rounded-lg transition"
                >
                  <img src="https://flagcdn.com/ma.svg" alt="العربية" className="w-5 h-5 rounded-sm" />
                  العربية
                </button>
              </div>
            )}
          </li>
        </ul>

        {/* Burger Button (mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div
          className="lg:hidden relative bg-white border-t border-gray-200 px-6 pb-4 overflow-hidden"
        >
          {/* ✅ Image en arrière-plan (logo2) */}
          <img
            src={logo2}
            alt="Fond mobile"
            className="absolute top-1/2 left-1/2 w-72 opacity-10 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          />
          <ul className="flex flex-col space-y-4 mt-4 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>{t("menu.accueil")}</Link></li>
            <li><Link to="/about-us" onClick={() => setIsMenuOpen(false)}>{t("menu.a_propos")}</Link></li>
            <li><Link to="/Axe" onClick={() => setIsMenuOpen(false)}>{t("menu.axe")}</Link></li>
            <li><Link to="/project" onClick={() => setIsMenuOpen(false)}>{t("menu.projets")}</Link></li>
            <li><Link to="/galerie" onClick={() => setIsMenuOpen(false)}>{t("menu.galerie")}</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>{t("menu.contact")}</Link></li>

            <li className="pt-2 border-t">
              <p className="mb-2">Langue :</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => handleLanguageChange("fr")} className="flex items-center gap-2 hover:text-blue-600">
                  <img src="https://flagcdn.com/fr.svg" alt="Français" className="w-5 h-5 rounded-sm" />
                  Français
                </button>
                <button onClick={() => handleLanguageChange("en")} className="flex items-center gap-2 hover:text-blue-600">
                  <img src="https://flagcdn.com/gb.svg" alt="English" className="w-5 h-5 rounded-sm" />
                  English
                </button>
                <button onClick={() => handleLanguageChange("ar")} className="flex items-center gap-2 hover:text-blue-600">
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
