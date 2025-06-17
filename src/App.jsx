import './App.css'
import { Routes, Route } from 'react-router';
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

function App() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="project" element={<Projet />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="login" element={<Login />} />
          <Route path="galerie" element={<GalerieImage />} />
          <Route path="axe" element={<Axe />} />
          <Route path="/" element={<ListingLocationPage />} />
          <Route path="/projet/:id" element={<PageProjet />} />
          <Route path="/rapports/activites-2024" element={<RapportActivites2024 />} />
          <Route path="/rapports/culture-et-jeunesse" element={<RapportCultureEtJeunesse />} />
          <Route path="/rapports/solidarite-developpement" element={<RapportSolidariteDev />} />
          
          <Route path="*" element={<h1>Page not found</h1>} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

        </Route>
      </Routes>
    </>
  );
}

export default App