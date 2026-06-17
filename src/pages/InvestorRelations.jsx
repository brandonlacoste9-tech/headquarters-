import { TrendingUp, FileText, Download } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useToast } from '../hooks/useToast';

const metrics = [
  { label: 'Network Properties', value: '6', delta: 'Live platforms' },
  { label: 'Empire Passports', value: 'Growing', delta: 'Unified auth' },
  { label: 'PRO Subscribers', value: '$8/mo', delta: 'Per platform tier' },
];

const InvestorRelations = () => {
  const { showToast } = useToast();

  return (
    <div className="page-shell page-shell-wide">
      <PageHeader
        eyebrow="Investors"
        title="Investor"
        titleAccent="Relations"
        subtitle="Hell Yeah Games Inc. is a privately held company building a network of consumer and developer-facing digital products."
      >
        <div className="glass-panel corp-ticker">
          <div className="corp-ticker-label">Status</div>
          <div className="corp-ticker-price">
            Private <TrendingUp size={18} aria-hidden="true" />
          </div>
          <div className="corp-ticker-change">Not publicly traded</div>
        </div>
      </PageHeader>

      <h2 className="corp-section-title">Network Overview</h2>
      <div className="corp-grid-stats" style={{ marginBottom: '3rem' }}>
        {metrics.map(({ label, value, delta }) => (
          <div key={label} className="glass-panel corp-card">
            <div className="corp-stat-label">{label}</div>
            <div className="corp-stat-value">{value}</div>
            <div className="corp-stat-delta">{delta}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel corp-quote" style={{ marginBottom: '2rem' }}>
        <FileText size={28} color="var(--krypto-color)" style={{ marginBottom: '1rem' }} aria-hidden="true" />
        <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '1rem' }}>Investor Inquiries</h3>
        <p>
          We&apos;re focused on product growth across the Empire network. For partnership or investment inquiries,
          reach out through our headquarters contact channels.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => showToast('Investor deck will be available soon.')}
        >
          <Download size={16} aria-hidden="true" /> Request Deck
        </button>
        <a href="mailto:investors@hellyeahgames.com" className="btn btn-primary">
          Contact IR
        </a>
      </div>
    </div>
  );
};

export default InvestorRelations;