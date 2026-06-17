import { Fragment } from 'react';

const NetworkBar = () => {
  const links = [
    { name: "HQ", url: import.meta.env.VITE_HQ_URL || "https://www.hellyeahgames-headquarters.com" },
    { name: "Hell Yeah Games", url: import.meta.env.VITE_HELL_YEAH_URL || "https://hellyeah-games.com" },
    { name: "Cyborg Gamers", url: import.meta.env.VITE_CYBORG_URL || "https://cyborggamers.com" },
    { name: "Kryptotrac", url: import.meta.env.VITE_KRYPTOTRAC_URL || "https://www.kryptotrac.com" },
    { name: "Iron Claw", url: import.meta.env.VITE_IRON_CLAW_URL || "https://www.ironclaw.ca" },
    { name: "Gamer Gurls", url: import.meta.env.VITE_GAMER_GURLS_URL || "https://gamergurls.com" },
    { name: "Hacker Media", url: import.meta.env.VITE_HACKER_MEDIA_URL || "https://www.hackermedia.fun" },
  ];

  return (
    <nav className="network-bar" aria-label="Empire network links">
      <div className="network-bar-inner">
        <span className="network-bar-label">Network Online</span>
        {links.map((link, i) => (
          <Fragment key={link.name}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="network-bar-link"
            >
              {link.name}
            </a>
            {i < links.length - 1 && <span className="network-bar-divider" aria-hidden="true">|</span>}
          </Fragment>
        ))}
      </div>
    </nav>
  );
};

export default NetworkBar;