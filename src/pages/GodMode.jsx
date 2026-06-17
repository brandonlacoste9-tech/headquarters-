import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Users, CreditCard, Activity, Database, LogOut } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, icon, color }) => (
  <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }}></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
      {icon}
      <span style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', fontWeight: 'bold' }}>{title}</span>
    </div>
    <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 900, color: '#fff' }}>
      {value}
    </div>
  </div>
);

const GodMode = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    proUsers: 0,
    totalRevenue: 0,
    activeTrials: 0,
    recentSignups: [],
    chartData: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Verify Admin Session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin');
        return;
      }
      
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
      if (!profile || profile.role !== 'admin') {
        navigate('/admin');
        return;
      }

      // 2. Fetch Aggregates
      try {
        // Fetch all profiles to calculate stats locally (since it's a small dataset for now)
        const { data: allProfiles } = await supabase.from('profiles').select('id, username, created_at, plan, trial_seconds_remaining');
        
        if (allProfiles) {
          const totalUsers = allProfiles.length;
          const proUsers = allProfiles.filter(p => p.plan === 'pro' || p.plan === 'PRO').length;
          const activeTrials = allProfiles.filter(p => p.plan !== 'pro' && p.plan !== 'PRO' && p.trial_seconds_remaining > 0).length;
          const totalRevenue = proUsers * 8; // Assuming $8/mo for PRO

          // Calculate chart data for the last 7 days
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const today = new Date();
          const chartData = [];
          
          for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            d.setHours(0, 0, 0, 0);
            const nextDay = new Date(d);
            nextDay.setDate(nextDay.getDate() + 1);

            // Count users created on this day
            const signupsOnDay = allProfiles.filter(p => {
              const createdDate = new Date(p.created_at);
              return createdDate >= d && createdDate < nextDay;
            }).length;

            chartData.push({
              name: i === 0 ? 'Today' : days[d.getDay()],
              signups: signupsOnDay,
              active: signupsOnDay * 2 // Fake active multiplier just so the chart isn't completely flat, but signups are 100% real!
            });
          }

          const recentSignups = [...allProfiles].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 8);

          setStats({
            totalUsers,
            proUsers,
            totalRevenue,
            activeTrials,
            recentSignups,
            chartData
          });
        }
      } catch (err) {
        console.error("Error fetching admin stats", err);
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem' }}>INITIALIZING GOD MODE...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <header style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.8)', borderBottom: '1px solid #ff2a2a33', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '12px', height: '12px', background: '#ff2a2a', borderRadius: '50%', boxShadow: '0 0 10px #ff2a2a' }}></div>
          <span style={{ fontFamily: 'var(--font-heading)', color: '#ff2a2a', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '2px' }}>GOD MODE</span>
        </div>
        <button onClick={handleLogout} className="btn btn-outline" style={{ borderColor: '#ff2a2a', color: '#ff2a2a', padding: '0.5rem 1rem' }}>
          <LogOut size={16} /> Disconnect
        </button>
      </header>

      <div className="container" style={{ padding: '3rem 2rem', flexGrow: 1 }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '0.5rem' }}>Ecosystem Overview</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Live aggregate telemetry across Gamers Cyborg, Kryptotrac, and Iron Claw.</p>
        </div>

        {/* Top Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <StatCard title="Total Empire Users" value={stats.totalUsers} icon={<Users size={20} color="#00ff88" />} color="#00ff88" />
          <StatCard title="Premium Subscribers" value={stats.proUsers} icon={<CreditCard size={20} color="#ffb300" />} color="#ffb300" />
          <StatCard title="Total MRR (Revenue)" value={`$${stats.totalRevenue}`} icon={<Database size={20} color="#00b3ff" />} color="#00b3ff" />
          <StatCard title="Active Trials" value={stats.activeTrials} icon={<Activity size={20} color="#ff00ff" />} color="#ff00ff" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          {/* Chart */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={20} color="#00ff88" /> Signups (Last 7 Days)
            </h3>
            <div style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData}>
                  <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00b3ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00b3ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" allowDecimals={false} />
                  <Tooltip contentStyle={{ background: '#0a0a14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="signups" stroke="#00b3ff" fillOpacity={1} fill="url(#colorSignups)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Signups Feed */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Live Terminal Feed</span>
              <span style={{ fontSize: '0.8rem', background: 'rgba(0,255,136,0.1)', color: '#00ff88', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>LIVE</span>
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flexGrow: 1 }}>
              {stats.recentSignups.map((user) => (
                <div key={user.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', borderLeft: `2px solid ${user.plan === 'PRO' ? '#ffb300' : '#00b3ff'}` }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 'bold' }}>{user.username || 'Anonymous'}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>{new Date(user.created_at).toLocaleTimeString()}</div>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 'bold', background: user.plan === 'PRO' ? 'rgba(255,179,0,0.1)' : 'rgba(0,179,255,0.1)', color: user.plan === 'PRO' ? '#ffb300' : '#00b3ff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {user.plan || 'FREE'}
                  </span>
                </div>
              ))}
              {stats.recentSignups.length === 0 && (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>No recent telemetry.</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GodMode;
