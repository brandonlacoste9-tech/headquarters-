import { Building2, Globe2, Zap, Users, Rocket } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const pillars = [
  {
    icon: Building2,
    color: '#ff2a2a',
    title: 'Global HQ',
    text: 'Headquartered in the digital underground — building the Empire one platform at a time.',
  },
  {
    icon: Globe2,
    color: '#00b3ff',
    title: 'Network Scale',
    text: 'Six live properties spanning gaming, crypto, dev tools, and media — all under one passport.',
  },
  {
    icon: Zap,
    color: '#00ff88',
    title: 'Ship Fast',
    text: 'From HTML5 arcade games to real-time charts — we launch before the pitch deck is finished.',
  },
];

const milestones = [
  { year: '2024', event: 'Hell Yeah Games arcade goes live with 100+ HTML5 titles.' },
  { year: '2025', event: 'Cyborg Gamers subscription and Empire Passport unified auth ship.' },
  { year: '2026', event: 'Headquarters hub launches — Kryptotrac, Iron Claw, and Hacker Media join the network.' },
];

const AboutUs = () => (
  <div className="page-shell">
    <PageHeader
      eyebrow="Company"
      title="About The"
      titleAccent="Empire"
      subtitle="Hell Yeah Games Inc. started as a gaming collective and grew into a multi-platform network — entertainment, finance, and developer tooling under one roof."
    />

    <div className="corp-grid-3" style={{ marginBottom: '3rem' }}>
      {pillars.map(({ icon: Icon, color, title, text }) => (
        <div key={title} className="glass-panel corp-card animate-fade-in">
          <Icon size={28} color={color} className="corp-card-icon" aria-hidden="true" />
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>

    <h2 className="corp-section-title">Timeline</h2>
    <div className="corp-list" style={{ marginBottom: '3rem' }}>
      {milestones.map(({ year, event }) => (
        <div key={year} className="glass-panel corp-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--iron-color)', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0 }}>{year}</span>
          <p style={{ margin: 0 }}>{event}</p>
        </div>
      ))}
    </div>

    <div className="glass-panel corp-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Users size={32} color="var(--krypto-color)" aria-hidden="true" />
      <div>
        <h3 style={{ marginBottom: '0.35rem' }}>Join the Network</h3>
        <p style={{ margin: 0 }}>Create an Empire Passport to earn referral points and access PRO features across every property.</p>
      </div>
      <Rocket size={24} color="var(--iron-color)" style={{ marginLeft: 'auto' }} aria-hidden="true" />
    </div>
  </div>
);

export default AboutUs;