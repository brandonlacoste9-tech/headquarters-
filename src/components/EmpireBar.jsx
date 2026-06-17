const empireLinks = [
  { emoji: '🤖', label: 'CYBORG GAMERS', url: 'https://cyborggamers.com', color: '#00f3ff' },
  { emoji: '🔥', label: 'HELL YEAH GAMES', url: 'https://hellyeah-games.com', color: '#ff003c' },
  { emoji: '💅', label: 'GAMER GURLS', url: 'https://gamergurls.com', color: '#ff00ff' },
  { emoji: '📈', label: 'KRYPTOTRAC', url: 'https://www.kryptotrac.com', color: '#f7931a' },
  { emoji: '⚡', label: 'IRON CLAW', url: 'https://www.ironclaw.ca', color: '#00ffaa' },
  { emoji: '📰', label: 'HACKER MEDIA', url: 'https://www.hackermedia.fun', color: '#00ff00' },
  { emoji: '🌀', label: 'ZYEUTE', url: 'https://www.zyeute.com', color: '#9b59b6' },
  { emoji: '🌊', label: 'FLOGURU', url: 'https://www.floguru.com', color: '#3498db' },
];

const EmpireBar = () => (
  <div className="empire-bar" role="navigation" aria-label="The Empire properties">
    <span className="empire-bar-label">THE EMPIRE:</span>
    {empireLinks.map((link) => (
      <a
        key={link.label}
        href={link.url}
        className="empire-bar-link"
        style={{ color: link.color }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span aria-hidden="true">{link.emoji}</span> {link.label}
      </a>
    ))}
  </div>
);

export default EmpireBar;