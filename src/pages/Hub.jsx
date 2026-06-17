import React, { useState } from 'react';
import { ExternalLink, Gamepad2, TrendingUp, Terminal, ChevronRight, Globe, Server, Shield, Cpu, Activity, Briefcase } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const Hub = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState(''); // 'idle', 'loading', 'success', 'error'
  const [empirePoints, setEmpirePoints] = useState(0);

  React.useEffect(() => {
    if (user) {
      supabase.from('profiles').select('empire_points').eq('id', user.id).single().then(({data}) => {
        if (data) setEmpirePoints(data.empire_points || 0);
      });
    }
  }, [user]);

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setWaitlistStatus('loading');
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email: email, source: 'headquarters' }]);

      if (error) throw error;
      setWaitlistStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error joining waitlist:', error);
      setWaitlistStatus('error');
    }
  };

  const PlatformCard = ({ title, description, url, banner, color, delay }) => (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`glass-panel animate-fade-in ${delay}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid rgba(255,255,255,0.05)`,
        padding: 0
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 10px 40px ${color}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: color,
        zIndex: 2
      }} />
      
      <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
        <img src={banner} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to top, rgba(10,10,20,1), transparent)' }}></div>
      </div>

      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>{title}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', flexGrow: 1, lineHeight: 1.6 }}>{description}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: color, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
          Launch Platform <ExternalLink size={16} />
        </div>
      </div>
    </a>
  );

  // Production URL Environment Variables (with localhost fallbacks for dev)
  const arcadeUrl = import.meta.env.VITE_ARCADE_URL || "https://hellyeah-games.com";
  const gamerGurlsUrl = import.meta.env.VITE_GAMER_GURLS_URL || "https://gamergurls.com";
  const ironClawUrl = import.meta.env.VITE_IRON_CLAW_URL || "https://www.ironclaw.ca";
  const kryptotracUrl = import.meta.env.VITE_KRYPTOTRAC_URL || "https://www.kryptotrac.com";
  const cyborgUrl = import.meta.env.VITE_CYBORG_URL || "https://cyborggamers.com";
  const hackerMediaUrl = import.meta.env.VITE_HACKER_MEDIA_URL || "https://www.hackermedia.fun";

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <header style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/assets/headquarters_logo.png" alt="Headquarters Logo" style={{ height: '50px', borderRadius: '8px' }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '1px' }}>HELL YEAH GAMES INC.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href={`${import.meta.env.VITE_ARCADE_URL || 'http://localhost:5173'}/pricing`} style={{ color: '#00ff88', textDecoration: 'none', fontFamily: 'var(--font-heading)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid #00ff88', padding: '0.4rem 1rem', borderRadius: '4px' }}>
            👑 Go Pro
          </a>
          
          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', padding: '0.4rem 1rem', borderRadius: '2rem', color: '#00ff88', fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                <Shield size={16} /> EMPIRE PASSPORT ACTIVE
              </div>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ color: '#00f3ff', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><TrendingUp size={20}/> {empirePoints} Empire Points</div>
                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>Your Referral Link (500 pts / signup):</div>
                <div 
                  title="Click to copy!"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://www.hellyeahgames-headquarters.com?ref=${user.id}`);
                    alert('Referral link copied to clipboard!');
                  }}
                  style={{ background: '#000', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #333', fontSize: '0.75rem', fontFamily: 'monospace', color: '#00ff88', marginTop: '0.4rem', cursor: 'pointer', display: 'inline-block' }}>
                  https://www.hellyeahgames-headquarters.com?ref={user.id.substring(0,8)}...
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" style={{ background: '#fff', color: '#000', padding: '0.5rem 1.5rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
              Empire Login
            </Link>
          )}

          <button 
            onClick={() => navigate('/admin')}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', opacity: 0.5 }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = 0.5}
          >
            [God Mode]
          </button>
        </div>
      </header>

      {/* Full Page Hero Poster */}
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 4rem', overflow: 'hidden' }}>
        {/* Glow effect behind the poster */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, rgba(0,0,0,1) 80%)', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1800px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src="/assets/hub_poster.jpg" 
            alt="Hell Yeah Games MVP Launch Preview" 
            className="animate-fade-in"
            style={{ 
              width: '100%', 
              height: 'auto',
              borderRadius: '24px', 
              boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255,255,255,0.05)',
            }} 
          />
          
          {/* Real interactive CTA form overlapping the poster's fake button */}
          <div style={{
            position: 'absolute', 
            bottom: '4%', 
            right: '25%', 
            background: 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            minWidth: '350px'
          }}>
            {waitlistStatus === 'success' ? (
              <div style={{ color: '#00ff88', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', padding: '1rem' }}>
                ✓ Access Request Logged.
              </div>
            ) : (
              <>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>JOIN THE ELITE WAITLIST</h3>
                <form onSubmit={handleWaitlistSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      padding: '0.8rem 1rem',
                      borderRadius: '8px',
                      color: '#fff',
                      outline: 'none'
                    }}
                  />
                  <button 
                    type="submit"
                    disabled={waitlistStatus === 'loading'}
                    style={{ 
                      background: 'linear-gradient(90deg, #00ff88, #00b3ff)',
                      color: '#000',
                      padding: '0.8rem 1.5rem', 
                      fontFamily: 'var(--font-heading)', 
                      fontWeight: 900,
                      border: 'none',
                      borderRadius: '8px',
                      cursor: waitlistStatus === 'loading' ? 'wait' : 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {waitlistStatus === 'loading' ? 'SENDING...' : 'REQUEST'}
                  </button>
                </form>
                {waitlistStatus === 'error' && <div style={{ color: '#ff2a2a', fontSize: '0.8rem' }}>Database connection offline. Error 404.</div>}
              </>
            )}
          </div>
        </div>
      </div>



      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', textAlign: 'center' }}>
        {/* The 4 Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', textAlign: 'left' }}>
          
          <PlatformCard 
            title="Hell Yeah Games"
            description="The original gaming destination. Hundreds of free HTML5 games, action, arcade, and puzzle games to play instantly."
            url="https://hellyeah-games.com" 
            banner="/assets/banner_hellyeah.jpg"
            color="#ff8a00"
            delay="delay-1"
          />

          <PlatformCard 
            title="Cyborg Gamers"
            description="Our flagship premium gaming subscription service. 800+ ad-free HTML5 games available everywhere."
            url={cyborgUrl} 
            banner="/assets/banner_cyborg.jpg"
            color="var(--arcade-color)"
            delay="delay-1"
          />

          <PlatformCard 
            title="Kryptotrac"
            description="Real-time cryptocurrency analytics, live charts, and secure portfolio tracking dashboard."
            url={kryptotracUrl} 
            banner="/assets/banner_kryptotrac.jpg"
            color="var(--krypto-color)"
            delay="delay-2"
          />

          <PlatformCard 
            title="Iron Claw"
            description="The ultimate Hacker Core developer suite. 20 client-side utilities including networking and cryptography."
            url={ironClawUrl} 
            banner="/assets/banner_ironclaw.jpg"
            color="var(--iron-color)"
            delay="delay-3"
          />

          <PlatformCard 
            title="Gamer Gurls"
            description="The ultimate girl-power gaming network featuring dress up, simulation, and puzzle games with a Y2K aesthetic."
            url={gamerGurlsUrl} 
            banner="/assets/banner_gamergurls.jpg"
            color="#ff1493"
            delay="delay-3"
          />

          <PlatformCard 
            title="Hacker Media"
            description="World-class digital journalism seamlessly integrated with interactive HTML5 gaming experiences."
            url={hackerMediaUrl} 
            banner="/assets/banner_hackermedia.jpg"
            color="#e63946"
            delay="delay-3"
          />

        </div>



      </div>

      {/* Massive Corporate Footer */}
      <footer style={{ marginTop: 'auto', background: '#020205', padding: '6rem 4rem 2rem', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr repeat(4, 1fr)', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '30px', height: '30px', background: 'var(--hub-gradient)', borderRadius: '6px' }}></div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', color: '#fff', letterSpacing: '1px' }}>HELL YEAH GAMES INC.</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              A global leader in digital infrastructure, powering the world's most demanding applications across gaming, decentralized finance, and developer tooling.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Platforms</h4>
            <a href="https://hellyeah-games.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Hell Yeah Games</a>
            <a href={cyborgUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Cyborg Gamers</a>
            <a href={kryptotracUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Kryptotrac</a>
            <a href={ironClawUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Iron Claw</a>
            <a href={gamerGurlsUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Gamer Gurls</a>
            <a href={hackerMediaUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Hacker Media</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Company</h4>
            <Link to="/about-us" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>About Us</Link>
            <Link to="/careers" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Careers (142)</Link>
            <Link to="/investors" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Investor Relations</Link>
            <Link to="/press" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Press & Media</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Legal</h4>
            <Link to="/privacy" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Terms of Service</Link>
            <Link to="/dpa" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Data Processing Agreement</Link>
            <Link to="/cookies" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Cookie Policy</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Sysadmin</h4>
            <Link to="/admin" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Admin Portal</Link>
            <Link to="/terminal" style={{ color: 'var(--iron-color)', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Terminal size={14}/> Mainframe Access</Link>
            <Link to="/god-mode" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>God Mode</Link>
          </div>
        </div>
        
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '2px' }}>© {new Date().getFullYear()} Hell Yeah Games Inc. All Rights Reserved. Ticker: HYG (NASDAQ)</p>
        </div>
      </footer>
    </div>
  );
};

export default Hub;
