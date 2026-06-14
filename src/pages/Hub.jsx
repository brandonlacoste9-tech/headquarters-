import React from 'react';
import { ExternalLink, Gamepad2, TrendingUp, Terminal, ChevronRight, Globe, Server, Shield, Cpu, Activity, Briefcase } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Hub = () => {
  const navigate = useNavigate();

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
  const arcadeUrl = import.meta.env.VITE_ARCADE_URL || "http://localhost:5173";
  const gamerGurlsUrl = import.meta.env.VITE_GAMER_GURLS_URL || "http://localhost:5174";
  const ironClawUrl = import.meta.env.VITE_IRON_CLAW_URL || "http://localhost:5175";
  const kryptotracUrl = import.meta.env.VITE_KRYPTOTRAC_URL || "http://localhost:5176";
  const gamerNewsUrl = import.meta.env.VITE_GAMER_NEWS_URL || "http://localhost:5178";

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
        
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1400px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/assets/hub_poster.jpg" 
            alt="Hell Yeah Games MVP Launch Preview" 
            className="animate-fade-in"
            style={{ 
              width: '100%', 
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '24px', 
              boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255,255,255,0.05)',
            }} 
          />
          
          {/* Real interactive CTA button overlapping the poster's fake button */}
          <button 
            className="btn animate-fade-in delay-2" 
            style={{ 
              position: 'absolute', 
              bottom: '5%', 
              right: '25%', 
              background: 'linear-gradient(90deg, #00ff88, #00b3ff)',
              color: '#000',
              padding: '1.5rem 3rem', 
              fontSize: '1.5rem', 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 900,
              textTransform: 'uppercase', 
              letterSpacing: '3px', 
              boxShadow: '0 0 60px rgba(0, 255, 136, 0.8), inset 0 0 10px rgba(255,255,255,0.5)', 
              border: '2px solid rgba(255,255,255,0.8)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 0 80px rgba(0, 255, 136, 1), inset 0 0 20px rgba(255,255,255,0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 60px rgba(0, 255, 136, 0.8), inset 0 0 10px rgba(255,255,255,0.5)';
            }}
            onClick={() => alert("MVP Access Request Submitted! Queued for processing.")}
          >
            REQUEST MVP ACCESS
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', textAlign: 'center' }}>
        {/* The 4 Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', textAlign: 'left' }}>
          
          <PlatformCard 
            title="Hell Yeah Games"
            description="The original gaming destination. Hundreds of free HTML5 games, action, arcade, and puzzle games to play instantly."
            url="https://hellyeah-games.com/" 
            banner="/assets/banner_hellyeah.jpg"
            color="#ff8a00"
            delay="delay-1"
          />

          <PlatformCard 
            title="The Arcade"
            description="Our flagship premium gaming subscription service. 800+ ad-free HTML5 games available everywhere."
            url={import.meta.env.VITE_ARCADE_URL || "http://localhost:5173"} 
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
            url={gamerNewsUrl} 
            banner="/assets/banner_hackermedia.jpg"
            color="#e63946"
            delay="delay-3"
          />

        </div>

        {/* Global Infrastructure Section */}
        <div style={{ marginTop: '8rem', textAlign: 'left', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Globe size={24} color="#00b3ff" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#fff', textTransform: 'uppercase' }}>Global Infrastructure Network</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '800px' }}>
            Our proprietary edge-delivery network ensures sub-20ms latency across 4 continents. 99.999% guaranteed uptime for enterprise partners and millions of concurrent users.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { region: 'US East (N. Virginia)', status: 'Operational', ping: '12ms' },
              { region: 'US West (Oregon)', status: 'Operational', ping: '14ms' },
              { region: 'EU Central (Frankfurt)', status: 'Operational', ping: '18ms' },
              { region: 'AP Northeast (Tokyo)', status: 'Operational', ping: '22ms' },
              { region: 'SA East (São Paulo)', status: 'Operational', ping: '25ms' },
            ].map(node => (
              <div key={node.region} className="glass-panel" style={{ padding: '1.5rem', borderLeft: '3px solid #00ff88' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Datacenter</div>
                <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '1rem' }}>{node.region}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                  <span style={{ color: '#00ff88', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', background: '#00ff88', borderRadius: '50%', boxShadow: '0 0 10px #00ff88' }}></div> {node.status}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>{node.ping}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Careers Section */}
        <div style={{ marginTop: '8rem', textAlign: 'left', background: 'rgba(255,255,255,0.02)', padding: '4rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Briefcase size={24} color="#ff2a2a" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#fff', textTransform: 'uppercase' }}>Join The Empire</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '800px' }}>
            With over 1,200 engineers across 14 global offices, we are constantly expanding. Help us build the next generation of financial, gaming, and developer infrastructure.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { role: 'Principal Blockchain Architect', dept: 'Kryptotrac Core', loc: 'New York, NY / Hybrid' },
              { role: 'Senior Engine Programmer', dept: 'The Arcade', loc: 'London, UK / Remote' },
              { role: 'VP of Cybersecurity', dept: 'Iron Claw Labs', loc: 'San Francisco, CA' },
              { role: 'Data Scientist (Machine Learning)', dept: 'Global Infrastructure', loc: 'Toronto, ON' },
            ].map(job => (
              <div key={job.role} onClick={() => navigate('/careers')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}>
                <div>
                  <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>{job.role}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{job.dept} • {job.loc}</div>
                </div>
                <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', borderRadius: '4px' }}>Apply Now</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/careers" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>View all 142 open positions</Link>
          </div>
        </div>

      </div>

      {/* Massive Corporate Footer */}
      <footer style={{ marginTop: 'auto', background: '#020205', padding: '6rem 4rem 2rem', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
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
            <a href="https://hellyeah-games.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Hell Yeah Games</a>
            <a href={import.meta.env.VITE_ARCADE_URL || "http://localhost:5173"} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>The Arcade</a>
            <a href="http://localhost:5174" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Kryptotrac</a>
            <a href="http://localhost:5175" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Iron Claw</a>
            <a href="http://localhost:5177" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Gamer Gurls</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Company</h4>
            <Link to="/about" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>About Us</Link>
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
        </div>
        
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '2px' }}>© {new Date().getFullYear()} Hell Yeah Games Inc. All Rights Reserved. Ticker: HYG (NASDAQ)</p>
        </div>
      </footer>
    </div>
  );
};

export default Hub;
