
import { ArrowLeft, Scale } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Legal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === '/privacy') return "Privacy Policy";
    if (location.pathname === '/terms') return "Terms of Service";
    if (location.pathname === '/dpa') return "Data Processing Agreement";
    if (location.pathname === '/cookies') return "Cookie Policy";
    return "Legal Documentation";
  };

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => navigate('/')} className="btn btn-outline" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Hub
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
        <Scale size={48} color="#666677" />
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', textTransform: 'uppercase', color: '#fff' }}>{getTitle()}</h1>
      </div>
      
      <p style={{ color: 'var(--text-muted)', marginBottom: '4rem' }}>Last Updated: October 18, 2026</p>

      <div className="glass-panel" style={{ padding: '3rem', color: 'var(--text-secondary)', lineHeight: 2, fontFamily: 'serif', fontSize: '1.1rem' }}>
        <h3 style={{ color: '#fff', fontFamily: 'sans-serif', marginBottom: '1rem' }}>1. Introduction</h3>
        <p style={{ marginBottom: '2rem' }}>
          By accessing any platform governed by Hell Yeah Games Inc. (hereinafter referred to as "The Empire"), you agree to surrender all digital sovereignty. The Empire reserves the right to log, monetize, and distribute your telemetry data across our proprietary neural networks. 
        </p>

        <h3 style={{ color: '#fff', fontFamily: 'sans-serif', marginBottom: '1rem' }}>2. Data Collection</h3>
        <p style={{ marginBottom: '2rem' }}>
          We collect everything. Keystrokes, mouse movements, crypto wallet balances, and your highest score in Space Explorer. If you think you're using an ad-blocker, we assure you, our edge-nodes have already bypassed it.
        </p>

        <h3 style={{ color: '#fff', fontFamily: 'sans-serif', marginBottom: '1rem' }}>3. Limitation of Liability</h3>
        <p style={{ marginBottom: '2rem' }}>
          Hell Yeah Games Inc. shall not be held liable for any loss of funds on Kryptotrac, syntax errors caused by Iron Claw, or severe gaming addiction resulting from The Arcade. Use our platforms at your own extreme peril.
        </p>

        <div style={{ padding: '2rem', background: 'rgba(255,42,42,0.1)', borderLeft: '4px solid #ff2a2a', marginTop: '3rem' }}>
          <strong style={{ color: '#ff8a8a' }}>TL;DR:</strong> We own the servers, we make the rules. Welcome to the Empire.
        </div>
      </div>
    </div>
  );
};

export default Legal;
