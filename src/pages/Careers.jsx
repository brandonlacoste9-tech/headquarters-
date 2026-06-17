
import { ArrowLeft, Briefcase, MapPin, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Careers = () => {
  const navigate = useNavigate();

  const jobs = [
    { title: "Principal Web3 Architect", team: "Kryptotrac", loc: "Dubai, UAE", salary: "$450k - $600k" },
    { title: "VP of Global Cybersecurity", team: "Iron Claw", loc: "Remote (Earth Orbit)", salary: "$300k + Equity" },
    { title: "Senior HTML5 Engine Programmer", team: "The Arcade", loc: "Tokyo, JP", salary: "$250k - $350k" },
    { title: "Director of Memes & Propaganda", team: "Marketing", loc: "New York, NY", salary: "$180k - $220k" },
    { title: "Quantum Computing Researcher", team: "R&D", loc: "Geneva, CH", salary: "$500k+" },
    { title: "Junior Coffee Fetcher", team: "Interns", loc: "San Francisco, CA", salary: "$15/hr" }
  ];

  return (
    <div className="page-shell">
      <button onClick={() => navigate('/')} className="btn btn-outline" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Hub
      </button>

      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Careers <span style={{ color: 'var(--text-muted)', fontSize: '2rem' }}>(142)</span></h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem', lineHeight: 1.8 }}>
        Stop working for boring corporate monoliths and start working for a cool, dangerous corporate monolith. We offer infinite PTO, catered caviar, and a 401k that vests entirely in Dogecoin.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {jobs.map((job, i) => (
          <div key={i} className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>{job.title}</h3>
              <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Briefcase size={14} /> {job.team}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {job.loc}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#00ff88' }}><DollarSign size={14} /> {job.salary}</span>
              </div>
            </div>
            <button onClick={() => alert("DNA processing module offline. Please mail a vial of blood to P.O. Box 666.")} className="btn btn-outline" style={{ borderColor: '#ff2a2a', color: '#ff2a2a' }}>Submit DNA Sample</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;
