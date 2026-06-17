import { Megaphone, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useToast } from '../hooks/useToast';

const articles = [
  {
    date: 'Jun 2026',
    title: 'Hell Yeah Games Headquarters Hub Launches as Empire Network Command Center',
    source: 'Internal',
    excerpt: 'The new HQ site unifies six properties under a single passport, referral system, and admin dashboard.',
  },
  {
    date: 'May 2026',
    title: 'Cyborg Gamers Subscription Hits 800+ Ad-Free HTML5 Games',
    source: 'Gaming Weekly',
    excerpt: 'The premium tier expands the Hell Yeah Games catalog with cross-platform access and PRO features.',
  },
  {
    date: 'Apr 2026',
    title: 'Iron Claw Developer Suite Adds 20 Client-Side Utilities',
    source: 'DevOps Times',
    excerpt: 'Networking, crypto, and encoding tools ship entirely in the browser — no backend required.',
  },
  {
    date: 'Mar 2026',
    title: 'Kryptotrac Launches Real-Time Crypto Analytics Dashboard',
    source: 'Financial Herald',
    excerpt: 'Live charts and portfolio tracking join the Empire network alongside gaming and media properties.',
  },
];

const PressMedia = () => {
  const { showToast } = useToast();

  return (
    <div className="page-shell page-shell-wide">
      <PageHeader
        eyebrow="Media"
        title="Press &"
        titleAccent="Media"
        subtitle="Product launches, network updates, and announcements from Hell Yeah Games Inc. and the Empire."
      />

      <div className="corp-list" style={{ gap: '1.25rem' }}>
        {articles.map((article) => (
          <article key={article.title} className="glass-panel corp-press-card">
            <div className="corp-press-meta">
              <Megaphone size={14} aria-hidden="true" />
              <time>{article.date}</time>
              <span aria-hidden="true">•</span>
              <span className="corp-press-source">{article.source}</span>
            </div>
            <h2 className="corp-press-title">{article.title}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{article.excerpt}</p>
            <button
              type="button"
              className="corp-press-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onClick={() => showToast('Full press release coming soon.')}
            >
              Read release <ArrowRight size={14} aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PressMedia;