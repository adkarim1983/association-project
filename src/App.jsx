import './App.css'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs';
import Projet from './pages/Projet';
import ListingLocationPage from "./pages/ListingLocationPage";
import PageProjet from "./pages/PageProjet";
import Axe from './pages/Axe';
import RapportActivites2024 from "./pages/RapportActivites2024";
import RapportCultureEtJeunesse from "./pages/RapportCultureEtJeunesse";
import RapportSolidariteDev from "./pages/RapportSolidariteDev";
import GalerieImage from "./pages/GalerieImage";
import Login from './pages/admin/Login';
import { useEffect, useState } from 'react';
import Dashboard from './pages/admin/Dashboard';
import ArticleForms from './pages/admin/ArticleForms';
import AcademieNajm from "./components/AcademieNajm";
import Unauthorized from './pages/Unauthorized';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute, { AdminRoute } from './components/PrivateRoute';
import Splash from './pages/Splash';

// Mission pages
import GestionPlateformes from './pages/missions/GestionPlateformes';
import EconomieSociale from './pages/missions/EconomieSociale';
import Entrepreneuriat from './pages/missions/Entrepreneuriat';
import Incubation from './pages/missions/Incubation';
import DeveloppementCapacites from './pages/missions/DeveloppementCapacites';

function App() {
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/intro" element={<Splash />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/intro" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="project" element={<Projet />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="galerie" element={<GalerieImage />} />
          <Route path="axe" element={<Axe />} />
          <Route path="/" element={<ListingLocationPage />} />
          <Route path="/projet/:id" element={<PageProjet />} />
          <Route path="/rapports/activites-2024" element={<RapportActivites2024 />} />
          <Route path="/rapports/culture-et-jeunesse" element={<RapportCultureEtJeunesse />} />
          <Route path="/rapports/solidarite-developpement" element={<RapportSolidariteDev />} />
          
          <Route path="academie-najm" element={<AcademieNajm />} />
          
          {/* Mission Routes */}
          <Route path="missions/gestion-plateformes" element={<GestionPlateformes />} />
          <Route path="missions/economie-sociale" element={<EconomieSociale />} />
          <Route path="missions/entrepreneuriat" element={<Entrepreneuriat />} />
          <Route path="missions/incubation" element={<Incubation />} />
          <Route path="missions/developpement-capacites" element={<DeveloppementCapacites />} />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="addArticle" 
            element={
              <AdminRoute>
                <ArticleForms />
              </AdminRoute>
            } 
          />

          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App