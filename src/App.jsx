import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Hub from './pages/Hub';
import NetworkBar from './components/NetworkBar';
import EmpireBar from './components/EmpireBar';
import PageLoader from './components/PageLoader';
import ScrollToTop from './components/ScrollToTop';
import useKonamiCode from './hooks/useKonamiCode';

const Terminal = lazy(() => import('./pages/Terminal'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const GodMode = lazy(() => import('./pages/GodMode'));
const EmpireLogin = lazy(() => import('./pages/EmpireLogin'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Careers = lazy(() => import('./pages/Careers'));
const InvestorRelations = lazy(() => import('./pages/InvestorRelations'));
const PressMedia = lazy(() => import('./pages/PressMedia'));
const Legal = lazy(() => import('./pages/Legal'));
const SecretGame = lazy(() => import('./components/SecretGame'));

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
    window.location.reload();
  };

  return (
    <div className={`app-shell ${isGlitching ? 'glitch-active' : ''}`}>
      <NetworkBar />
      <EmpireBar />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter>
      {showGame && (
        <Suspense fallback={null}>
          <SecretGame onClose={handleCloseGame} />
        </Suspense>
      )}
    </div>
  );
}

export default App;