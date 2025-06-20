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
import { Helmet } from 'react-helmet';

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
          <Route index element={<><Helmet><title>Home</title></Helmet><Home /></>} />
          <Route path="contact" element={<><Helmet><title>Contact</title></Helmet><Contact /></>} />
          <Route path="project" element={<><Helmet><title>Project</title></Helmet><Projet /></>} />
          <Route path="about-us" element={<><Helmet><title>About Us</title></Helmet><AboutUs /></>} />
          <Route path="login" element={<><Helmet><title>Login</title></Helmet><Login /></>} />
          <Route path="galerie" element={<><Helmet><title>Galerie</title></Helmet><GalerieImage /></>} />
          <Route path="axe" element={<><Helmet><title>Axe</title></Helmet><Axe /></>} />
          <Route path="/" element={<><Helmet><title>Listing Location</title></Helmet><ListingLocationPage /></>} />
          <Route path="/projet/:id" element={<><Helmet><title>Project Details</title></Helmet><PageProjet /></>} />
          <Route path="/rapports/activites-2024" element={<><Helmet><title>Rapport Activites 2024</title></Helmet><RapportActivites2024 /></>} />
          <Route path="/rapports/culture-et-jeunesse" element={<><Helmet><title>Rapport Culture et Jeunesse</title></Helmet><RapportCultureEtJeunesse /></>} />
          <Route path="/rapports/solidarite-developpement" element={<><Helmet><title>Rapport Solidarite Developpement</title></Helmet><RapportSolidariteDev /></>} />
          
          <Route path="*" element={<><Helmet><title>Page Not Found</title></Helmet><h1>Page not found</h1></>} />
          <Route path="/admin/dashboard" element={<><Helmet><title>Dashboard</title></Helmet><Dashboard /></>} />
        </Route>
      </Routes>
    </>
  );
}

export default App