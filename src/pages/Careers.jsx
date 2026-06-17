import { Briefcase, MapPin, DollarSign } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useToast } from '../hooks/useToast';

const jobs = [
  { title: 'Principal Web3 Architect', team: 'Kryptotrac', loc: 'Remote', salary: '$180k – $240k' },
  { title: 'Senior Frontend Engineer', team: 'Headquarters', loc: 'Remote', salary: '$140k – $190k' },
  { title: 'HTML5 Game Developer', team: 'Hell Yeah Games', loc: 'Remote', salary: '$120k – $160k' },
  { title: 'Security Engineer', team: 'Iron Claw', loc: 'Remote', salary: '$150k – $200k' },
  { title: 'Content Editor', team: 'Hacker Media', loc: 'Remote', salary: '$80k – $110k' },
  { title: 'Community Manager', team: 'Gamer Gurls', loc: 'Remote', salary: '$70k – $95k' },
];

const perks = [
  'Remote-first across all time zones',
  'Empire Passport PRO included',
  'Referral bonus program',
  'Build things people actually use',
];

const Careers = () => {
  const { showToast } = useToast();

  const handleApply = (title) => {
    showToast(`Application pipeline for "${title}" opens soon — check back!`);
  };

  return (
    <div className="page-shell page-shell-wide">
      <PageHeader
        eyebrow="We're Hiring"
        title={<>Careers <span className="corp-count">({jobs.length})</span></>}
        subtitle="Help us build the Empire. We're a small, fast-moving team shipping real products across gaming, crypto, and developer tools."
      />

      <div className="glass-panel corp-card" style={{ marginBottom: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem' }}>
        {perks.map((perk) => (
          <span key={perk} style={{ color: 'var(--iron-color)', fontSize: '0.9rem', fontWeight: 600 }}>
            ✓ {perk}
          </span>
        ))}
      </div>

      <div className="corp-list">
        {jobs.map((job) => (
          <div key={job.title} className="glass-panel corp-job-card">
            <div>
              <h3 className="corp-job-title">{job.title}</h3>
              <div className="corp-job-meta">
                <span><Briefcase size={14} aria-hidden="true" /> {job.team}</span>
                <span><MapPin size={14} aria-hidden="true" /> {job.loc}</span>
                <span className="corp-job-salary"><DollarSign size={14} aria-hidden="true" /> {job.salary}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleApply(job.title)}
              className="btn btn-outline"
              style={{ borderColor: 'var(--arcade-color)', color: 'var(--arcade-color)', flexShrink: 0 }}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;