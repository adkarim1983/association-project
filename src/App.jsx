 import './App.css'
import { Routes, Route } from 'react-router';
import Layout from './components/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs';
import Projet from './pages/Projet';
import ListingLocationPage from "./pages/ListingLocationPage";
import PageProjet from "./pages/PageProjet"; // 👈 importer la page test
import Axe from './pages/Axe';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="project" element={<Projet/>} />
          <Route path="about-us" element={<AboutUs/>} />
          <Route path="*" element={<h1>Page not found</h1>} />
          <Route path="axe" element={<Axe/>} />

          <Route path="/" element={<ListingLocationPage />} />
      <Route path="/projet/:id" element={<PageProjet />} /> {/* 👈 route test */}
        
        </Route>
      </Routes>
    </>
  )
}

export default App