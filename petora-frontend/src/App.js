import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import PetList from './components/PetList.jsx';
import PetDetail from './components/PetDetail.jsx';
import PetCard from './components/PetCard.jsx';
import ShelterLogin from './components/ShelterLogin.jsx'; 
import AdminDashboard from './components/AdminDashboard.jsx';
import ToTheTop from './components/ToTheTop.js'; 
import Footer from './components/Footer.jsx';
import AboutUS from './components/AboutUs.jsx';
import ContactUs from './components/ContactUs.jsx';

function AppLayout() {
  const location = useLocation();

  // Hide footer only on login page
  const noFooterRoutes = ["/login"];
  const noToTheTop = ["/login"];

  return (
    <>
      {/* Navbar is always visible */}
      <Navbar />

      <main className="container mx-auto p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/pets" element={<PetList />} /> 
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/login" element={<ShelterLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/AboutUs" element={<AboutUS />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/" element={<ToTheTop />} />
        </Routes>
      </main>
      {/* ToTheTop is hidde only on /login */}
      {!noToTheTop.includes(location.pathname) && <ToTheTop />}

      {/* Footer is hidden only on /login */}
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;