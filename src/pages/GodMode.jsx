import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Users, CreditCard, Activity, Database, LogOut, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GodMode = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    proUsers: 0,
    cryptoPortfolios: 0,
    recentSignups: []
  });

  // Mock data for the chart to make it look alive
  const mockChartData = [
    { name: 'Mon', active: 120, signups: 40 },
    { name: 'Tue', active: 180, signups: 65 },
    { name: 'Wed', active: 250, signups: 80 },
    { name: 'Thu', active: 210, signups: 55 },
    { name: 'Fri', active: 390, signups: 120 },
    { name: 'Sat', active: 480, signups: 160 },
    { name: 'Sun', active: 520, signups: 210 },
  ];

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
        const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        const { count: proUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('plan', 'PRO');
        const { count: cryptoPortfolios } = await supabase.from('crypto_portfolio').select('*', { count: 'exact', head: true });
        
        const { data: recentSignups } = await supabase
          .from('profiles')
          .select('id, username, created_at, plan')
          .order('created_at', { ascending: false })
          .limit(8);

        setStats({
          totalUsers: totalUsers || 0,
          proUsers: proUsers || 0,
          cryptoPortfolios: cryptoPortfolios || 0,
          recentSignups: recentSignups || []
        });
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
          <StatCard title="Active Portfolios" value={stats.cryptoPortfolios} icon={<Database size={20} color="#00b3ff" />} color="#00b3ff" />
          <StatCard title="Server Health" value="99.9%" icon={<Activity size={20} color="#ff00ff" />} color="#ff00ff" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          {/* Chart */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={20} color="#00ff88" /> Growth Velocity (7 Days)
            </h3>
            <div style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
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
                  <YAxis stroke="var(--text-muted)" />
                  <Tooltip contentStyle={{ background: '#0a0a14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="active" stroke="#00ff88" fillOpacity={1} fill="url(#colorActive)" strokeWidth={3} />
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
              {stats.recentSignups.map((user, i) => (
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
