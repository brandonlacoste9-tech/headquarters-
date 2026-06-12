import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Hub from './pages/Hub';
import AdminLogin from './pages/AdminLogin';
import GodMode from './pages/GodMode';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import InvestorRelations from './pages/InvestorRelations';
import PressMedia from './pages/PressMedia';
import Legal from './pages/Legal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/godmode" element={<GodMode />} />
        
        <Route path="/about" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/investors" element={<InvestorRelations />} />
        <Route path="/press" element={<PressMedia />} />
        
        <Route path="/privacy" element={<Legal />} />
        <Route path="/terms" element={<Legal />} />
        <Route path="/dpa" element={<Legal />} />
        <Route path="/cookies" element={<Legal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
