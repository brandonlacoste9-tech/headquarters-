import React from 'react';

const NetworkBar = () => {
  const links = [
    { name: "HQ", url: "http://localhost:5179" },
    { name: "Hell Yeah Games", url: import.meta.env.VITE_HELL_YEAH_URL || "https://hellyeah-games.com" },
    { name: "Cyborg Gamers", url: import.meta.env.VITE_CYBORG_URL || "https://cyborggamers.com" },
    { name: "Kryptotrac", url: import.meta.env.VITE_KRYPTOTRAC_URL || "https://kryptotrac.com" },
    { name: "Iron Claw", url: import.meta.env.VITE_IRON_CLAW_URL || "https://ironclaw.ca" },
    { name: "Gamer Gurls", url: import.meta.env.VITE_GAMER_GURLS_URL || "https://gamergurls.com" },
    { name: "Hacker Media", url: import.meta.env.VITE_HACKER_MEDIA_URL || "https://hackermedia.ca" },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '30px',
      background: '#0a0a0a',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      zIndex: 9999,
      fontFamily: 'monospace',
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    }}>
      <span style={{ color: '#00ff88', fontWeight: 'bold' }}>NETWORK ONLINE:</span>
      {links.map((link, i) => (
        <React.Fragment key={i}>
          <a 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            {link.name}
          </a>
          {i < links.length - 1 && <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default NetworkBar;
