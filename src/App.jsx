import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Hub from './pages/Hub';
import AdminLogin from './pages/AdminLogin';
import GodMode from './pages/GodMode';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import InvestorRelations from './pages/InvestorRelations';
import PressMedia from './pages/PressMedia';
import Legal from './pages/Legal';

import useKonamiCode from './hooks/useKonamiCode';
import SecretGame from './components/SecretGame';
import NetworkBar from './components/NetworkBar';
import EmpireBar from './components/EmpireBar';
import Terminal from './pages/Terminal';
import EmpireLogin from './pages/EmpireLogin';

function App() {
  const isKonamiUnlocked = useKonamiCode();
  const [isGlitching, setIsGlitching] = useState(false);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (ref && uuidPattern.test(ref)) {
      sessionStorage.setItem('empire_ref', ref);
    }
  }, []);

  useEffect(() => {
    if (!isKonamiUnlocked || showGame) return;

    const glitchTimer = setTimeout(() => setIsGlitching(true), 0);
    const showTimer = setTimeout(() => {
      setIsGlitching(false);
      setShowGame(true);
    }, 2000);

    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(showTimer);
    };
  }, [isKonamiUnlocked, showGame]);

  const handleCloseGame = () => {
    setShowGame(false);
    // Force a reload to clear the Konami hook state easily, or just hide the game. 
    // Hiding it is fine. The user can refresh to do it again since useKonamiCode will still be true.
    window.location.reload(); 
  };

  return (
    <div className={isGlitching ? 'glitch-active' : ''}>
      <EmpireBar />
      <BrowserRouter>
        <NetworkBar />
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/god-mode" element={<GodMode />} />
          <Route path="/login" element={<EmpireLogin />} />
          <Route path="/about-us" element={<AboutUs />} />
          
          <Route path="/careers" element={<Careers />} />
          <Route path="/investors" element={<InvestorRelations />} />
          <Route path="/press" element={<PressMedia />} />
          
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/dpa" element={<Legal />} />
          <Route path="/cookies" element={<Legal />} />
        </Routes>
      </BrowserRouter>
      {showGame && <SecretGame onClose={handleCloseGame} />}
    </div>
  );
}

export default App;
