import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InvestorRelations = () => {
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <button onClick={() => navigate('/')} className="btn btn-outline" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Hub
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', textTransform: 'uppercase' }}>Investor <span className="text-gradient">Relations</span></h1>
        <div className="glass-panel" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>NASDAQ: HYG</div>
          <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: '#00ff88', fontWeight: 'bold' }}>$4,192.69 <TrendingUp size={20} /></div>
          <div style={{ color: '#00ff88', fontSize: '0.9rem' }}>+42.0% (Today)</div>
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem', lineHeight: 1.8 }}>
        Hell Yeah Games Inc. has consistently outperformed market expectations by ignoring basic economic principles and operating purely on vibes and high-frequency trading algorithms.
      </p>

      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Q3 2026 Earnings Report</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Gross Revenue</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>$1.4B</div>
          <div style={{ color: '#00ff88' }}>+124% YoY</div>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>EBITDA</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>$890M</div>
          <div style={{ color: '#00ff88' }}>+89% YoY</div>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Active Subscribers</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>14.2M</div>
          <div style={{ color: '#00ff88' }}>+200% YoY</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Letter to Shareholders</h3>
        <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
          "Dear Shareholders, we printed money this quarter. That is all. See you on the yacht." <br/><br/>
          <strong>- The CEO</strong>
        </p>
      </div>

    </div>
  );
};

export default InvestorRelations;
