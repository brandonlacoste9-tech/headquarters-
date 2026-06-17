import { ArrowLeft, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PressMedia = () => {
  const navigate = useNavigate();

  const articles = [
    { date: 'Oct 14, 2026', title: 'Hell Yeah Games Inc. Acquires Prominent Web3 Startup for $400 Million in All-Cash Deal', source: 'The Tech Journal' },
    { date: 'Sep 02, 2026', title: 'The Arcade Surpasses 10 Million Active Subscribers, Cementing Dominance in HTML5 Gaming', source: 'Gaming Weekly' },
    { date: 'Aug 18, 2026', title: 'Iron Claw Named "Best Developer Tool of the Year" by Hacker Collective', source: 'DevOps Times' },
    { date: 'Jul 04, 2026', title: 'Kryptotrac Processes Over $1 Trillion in Theoretical Volume During Q2', source: 'Financial Herald' },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => navigate('/')} className="btn btn-outline" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Hub
      </button>

      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Press & <span className="text-gradient">Media</span></h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem', lineHeight: 1.8 }}>
        Stay up to date with the latest acquisitions, product launches, and hostile corporate takeovers from Hell Yeah Games Inc.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {articles.map((article, i) => (
          <div key={i} className="glass-panel" style={{ padding: '2.5rem', borderLeft: '4px solid var(--iron-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              <Megaphone size={16} />
              <span>{article.date}</span>
              <span>•</span>
              <span style={{ color: '#00b3ff' }}>{article.source}</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1rem', lineHeight: 1.3 }}>{article.title}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>"This strategic move further solidifies our monopoly on digital entertainment and finance," stated the CEO from an undisclosed location.</p>
            <div style={{ marginTop: '1.5rem' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Error 404: The truth has been redacted by corporate legal."); }} style={{ color: 'var(--iron-color)', fontWeight: 'bold', textDecoration: 'none' }}>Read Full Press Release →</a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PressMedia;
