import { useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, Terminal, Shield, Copy, Check } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

import { supabase } from '../supabaseClient';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

const PlatformCard = ({ title, description, url, banner, color, delay }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`glass-panel platform-card animate-fade-in ${delay}`}
    style={{ '--card-accent': color }}
  >
    <div className="platform-card-accent" style={{ background: color }} />
    <div className="platform-card-image-wrap">
      <img src={banner} alt={`${title} platform preview`} loading="lazy" />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to top, rgba(10,10,20,1), transparent)' }} />
    </div>
    <div className="platform-card-body">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="platform-card-cta" style={{ color }}>
        Launch Platform <ExternalLink size={16} aria-hidden="true" />
      </div>
    </div>
  </a>
);

const Hub = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState('');
  const [empirePoints, setEmpirePoints] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('empire_points').eq('id', user.id).single().then(({ data }) => {
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
        .insert([{ email, source: 'headquarters' }]);

      if (error) {
        if (error.code === '23505') {
          setWaitlistStatus('duplicate');
          return;
        }
        throw error;
      }
      setWaitlistStatus('success');
      setEmail('');
      showToast('You\'re on the list. Welcome to the Empire.');
    } catch (error) {
      console.error('Error joining waitlist:', error);
      setWaitlistStatus('error');
    }
  };

  const handleCopyReferral = async () => {
    const link = `https://www.hellyeahgames-headquarters.com?ref=${user.id}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      showToast('Referral link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy — try selecting the link manually', 'error');
    }
  };

  const gamerGurlsUrl = import.meta.env.VITE_GAMER_GURLS_URL || 'https://gamergurls.com';
  const ironClawUrl = import.meta.env.VITE_IRON_CLAW_URL || 'https://www.ironclaw.ca';
  const kryptotracUrl = import.meta.env.VITE_KRYPTOTRAC_URL || 'https://www.kryptotrac.com';
  const cyborgUrl = import.meta.env.VITE_CYBORG_URL || 'https://cyborggamers.com';
  const hackerMediaUrl = import.meta.env.VITE_HACKER_MEDIA_URL || 'https://www.hackermedia.fun';

  return (
    <div className="hub-page">
      <header className="hub-header">
        <div className="hub-brand">
          <img src="/assets/headquarters_logo.png" alt="Hell Yeah Games Headquarters" />
          <span className="hub-brand-name">HELL YEAH GAMES INC.</span>
        </div>

        <div className="hub-actions">
          <a
            href={`${import.meta.env.VITE_ARCADE_URL || 'https://hellyeah-games.com'}/pricing`}
            className="badge-pro"
          >
            Go Pro
          </a>

          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end' }}>
              <div className="passport-pill">
                <Shield size={16} aria-hidden="true" /> Empire Passport Active
              </div>
              <div className="passport-panel">
                <div style={{ color: '#00f3ff', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <TrendingUp size={18} aria-hidden="true" /> {empirePoints.toLocaleString()} Empire Points
                </div>
                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>Referral link — 500 pts per signup</div>
                <button
                  type="button"
                  onClick={handleCopyReferral}
                  className={`referral-link ${copied ? 'copied' : ''}`}
                  aria-label="Copy referral link"
                >
                  {copied ? (
                    <><Check size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />Copied!</>
                  ) : (
                    <><Copy size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />?ref={user.id.substring(0, 8)}...</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '2rem', fontSize: '0.9rem' }}>
              Empire Login
            </Link>
          )}

          <button type="button" onClick={() => navigate('/admin')} className="ghost-btn">
            [God Mode]
          </button>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-inner">
          <img
            src="/assets/hub_poster.jpg"
            alt="Hell Yeah Games MVP launch preview"
            className="hero-poster animate-fade-in"
            loading="eager"
          />

          <aside className="hero-cta animate-fade-in delay-1">
            {waitlistStatus === 'success' ? (
              <div className="waitlist-success">Access request logged. Stand by.</div>
            ) : waitlistStatus === 'duplicate' ? (
              <div className="waitlist-success">You&apos;re already on the waitlist.</div>
            ) : (
              <>
                <h3>Join the Elite Waitlist</h3>
                <form onSubmit={handleWaitlistSubmit} className="waitlist-form">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setWaitlistStatus('');
                      setEmail(e.target.value);
                    }}
                    required
                    className="input-field"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    disabled={waitlistStatus === 'loading'}
                    className="btn btn-gradient"
                    style={{ padding: '0.85rem 1.5rem', whiteSpace: 'nowrap' }}
                  >
                    {waitlistStatus === 'loading' ? 'Sending...' : 'Request Access'}
                  </button>
                </form>
                {waitlistStatus === 'error' && (
                  <p className="waitlist-error">Could not reach the server. Please try again.</p>
                )}
              </>
            )}
          </aside>
        </div>
      </section>

      <section className="container platforms-section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-eyebrow">The Network</span>
          <h2 className="section-title">Six Platforms. <span className="text-gradient">One Empire.</span></h2>
          <p className="section-subtitle">
            Gaming, crypto analytics, developer tools, and media — unified under a single passport and referral economy.
          </p>
        </div>

        <div className="platforms-grid">
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
            delay="delay-2"
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
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '30px', height: '30px', background: 'var(--hub-gradient)', borderRadius: '6px' }} aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', color: '#fff', letterSpacing: '1px' }}>HELL YEAH GAMES INC.</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              A global leader in digital infrastructure, powering demanding applications across gaming, decentralized finance, and developer tooling.
            </p>
          </div>

          <div className="footer-col">
            <h4>Platforms</h4>
            <a href="https://hellyeah-games.com" target="_blank" rel="noopener noreferrer" className="footer-link">Hell Yeah Games</a>
            <a href={cyborgUrl} target="_blank" rel="noopener noreferrer" className="footer-link">Cyborg Gamers</a>
            <a href={kryptotracUrl} target="_blank" rel="noopener noreferrer" className="footer-link">Kryptotrac</a>
            <a href={ironClawUrl} target="_blank" rel="noopener noreferrer" className="footer-link">Iron Claw</a>
            <a href={gamerGurlsUrl} target="_blank" rel="noopener noreferrer" className="footer-link">Gamer Gurls</a>
            <a href={hackerMediaUrl} target="_blank" rel="noopener noreferrer" className="footer-link">Hacker Media</a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about-us" className="footer-link">About Us</Link>
            <Link to="/careers" className="footer-link">Careers</Link>
            <Link to="/investors" className="footer-link">Investor Relations</Link>
            <Link to="/press" className="footer-link">Press &amp; Media</Link>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/dpa" className="footer-link">Data Processing Agreement</Link>
            <Link to="/cookies" className="footer-link">Cookie Policy</Link>
          </div>

          <div className="footer-col">
            <h4>Sysadmin</h4>
            <Link to="/admin" className="footer-link">Admin Portal</Link>
            <Link to="/terminal" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--iron-color)' }}>
              <Terminal size={14} aria-hidden="true" /> Mainframe Access
            </Link>
            <Link to="/god-mode" className="footer-link">God Mode</Link>
          </div>
        </div>

        <div className="container footer-bottom">
          <p style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            © {new Date().getFullYear()} Hell Yeah Games Inc. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Hub;