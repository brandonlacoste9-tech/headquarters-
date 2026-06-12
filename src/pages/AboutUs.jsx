import React from 'react';
import { ArrowLeft, Building2, Globe2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => navigate('/')} className="btn btn-outline" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Hub
      </button>

      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', marginBottom: '1rem', textTransform: 'uppercase' }}>About The <span className="text-gradient">Empire</span></h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem', lineHeight: 1.8 }}>
        Hell Yeah Games Inc. was forged in the digital fires of the early web. What began as a rogue collective of gamers and hackers has transformed into a globally recognized technology syndicate, pushing the absolute boundaries of digital entertainment, decentralized finance, and developer tooling.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <Building2 size={32} color="#ff2a2a" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Global HQ</h3>
          <p style={{ color: 'var(--text-muted)' }}>Located in a subterranean, climate-controlled bunker beneath the Swiss Alps. We don't take walk-ins.</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <Globe2 size={32} color="#00b3ff" />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>10,000+ Employees</h3>
          <p style={{ color: 'var(--text-muted)' }}>Our engineers span 14 countries, working asynchronously in the dark to keep your servers running.</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <Zap size={32} color="#00ff88" />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Zero Carbon</h3>
          <p style={{ color: 'var(--text-muted)' }}>Our entire edge-network is powered entirely by the kinetic energy of our gamers aggressively clicking their mice.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
