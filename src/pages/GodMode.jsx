import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Users, CreditCard, Activity, Database, LogOut, ArrowLeft, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageLoader from '../components/PageLoader';

const StatCard = ({ title, value, icon, color }) => (
  <div className="glass-panel godmode-stat-card">
    <div
      className="godmode-stat-glow"
      style={{ background: `radial-gradient(circle, ${color}33 0%, transparent 70%)` }}
      aria-hidden="true"
    />
    <div className="godmode-stat-label">
      {icon}
      <span>{title}</span>
    </div>
    <div className="godmode-stat-value">{value}</div>
  </div>
);

const formatRelativeTime = (dateString) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const GodMode = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    proUsers: 0,
    totalRevenue: 0,
    activeTrials: 0,
    recentSignups: [],
    chartData: [],
  });

  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      navigate('/admin');
      return;
    }

    try {
      const { data: allProfiles } = await supabase
        .from('profiles')
        .select('id, username, created_at, plan, trial_seconds_remaining');

      if (allProfiles) {
        const totalUsers = allProfiles.length;
        const proUsers = allProfiles.filter((p) => p.plan === 'pro' || p.plan === 'PRO').length;
        const activeTrials = allProfiles.filter(
          (p) => p.plan !== 'pro' && p.plan !== 'PRO' && p.trial_seconds_remaining > 0
        ).length;
        const totalRevenue = proUsers * 8;

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const chartData = [];

        for (let i = 6; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          d.setHours(0, 0, 0, 0);
          const nextDay = new Date(d);
          nextDay.setDate(nextDay.getDate() + 1);

          const signupsOnDay = allProfiles.filter((p) => {
            const createdDate = new Date(p.created_at);
            return createdDate >= d && createdDate < nextDay;
          }).length;

          chartData.push({
            name: i === 0 ? 'Today' : days[d.getDay()],
            signups: signupsOnDay,
          });
        }

        const recentSignups = [...allProfiles]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 8);

        setStats({
          totalUsers,
          proUsers,
          totalRevenue,
          activeTrials,
          recentSignups,
          chartData,
        });
      }
    } catch (err) {
      console.error('Error fetching admin stats', err);
    }

    setLoading(false);
    setRefreshing(false);
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => fetchDashboardData(), 0);
    return () => clearTimeout(timer);
  }, [fetchDashboardData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="godmode-page">
      <header className="godmode-header">
        <div className="godmode-brand">
          <div className="godmode-pulse" aria-hidden="true" />
          <span className="godmode-title">GOD MODE</span>
        </div>
        <div className="godmode-actions">
          <button
            type="button"
            onClick={() => fetchDashboardData(true)}
            className="btn btn-outline btn-godmode"
            disabled={refreshing}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <RefreshCw size={14} className={refreshing ? 'spin' : ''} aria-hidden="true" />
            {refreshing ? 'Syncing...' : 'Refresh'}
          </button>
          <Link to="/" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <ArrowLeft size={14} aria-hidden="true" /> HQ
          </Link>
          <button type="button" onClick={handleLogout} className="btn btn-outline btn-godmode" style={{ padding: '0.5rem 1rem' }}>
            <LogOut size={14} aria-hidden="true" /> Disconnect
          </button>
        </div>
      </header>

      <div className="container godmode-body">
        <div className="godmode-intro">
          <span className="section-eyebrow" style={{ color: 'var(--godmode-accent)' }}>Admin Telemetry</span>
          <h1>Ecosystem Overview</h1>
          <p>Live passport signups and subscription metrics across the Empire network.</p>
        </div>

        <div className="godmode-stats">
          <StatCard title="Total Users" value={stats.totalUsers.toLocaleString()} icon={<Users size={18} color="#00ff88" aria-hidden="true" />} color="#00ff88" />
          <StatCard title="Premium Subs" value={stats.proUsers.toLocaleString()} icon={<CreditCard size={18} color="#ffb300" aria-hidden="true" />} color="#ffb300" />
          <StatCard title="Est. MRR" value={`$${stats.totalRevenue.toLocaleString()}`} icon={<Database size={18} color="#00b3ff" aria-hidden="true" />} color="#00b3ff" />
          <StatCard title="Active Trials" value={stats.activeTrials.toLocaleString()} icon={<Activity size={18} color="#ff00ff" aria-hidden="true" />} color="#ff00ff" />
        </div>

        <div className="godmode-grid">
          <div className="glass-panel godmode-panel">
            <h3 className="godmode-panel-title">
              <Activity size={18} color="#00ff88" aria-hidden="true" />
              Signups — Last 7 Days
            </h3>
            <div className="godmode-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData}>
                  <defs>
                    <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00b3ff" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#00b3ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fontSize: 12 }} />
                  <YAxis stroke="var(--text-muted)" allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#0a0a14',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="signups"
                    name="Signups"
                    stroke="#00b3ff"
                    fill="url(#colorSignups)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel godmode-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="godmode-feed-header">
              <h3 className="godmode-panel-title" style={{ marginBottom: 0 }}>Recent Signups</h3>
              <span className="godmode-live-badge">LIVE</span>
            </div>

            <div className="godmode-feed">
              {stats.recentSignups.map((user) => {
                const isPro = user.plan === 'PRO' || user.plan === 'pro';
                return (
                  <div key={user.id} className={`godmode-feed-item ${isPro ? 'is-pro' : ''}`}>
                    <div>
                      <div className="godmode-feed-name">{user.username || 'Anonymous'}</div>
                      <div className="godmode-feed-time">{formatRelativeTime(user.created_at)}</div>
                    </div>
                    <span className={`godmode-plan-badge ${isPro ? 'pro' : 'free'}`}>
                      {user.plan || 'FREE'}
                    </span>
                  </div>
                );
              })}
              {stats.recentSignups.length === 0 && (
                <div className="godmode-empty">No signups yet. The Empire awaits.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GodMode;