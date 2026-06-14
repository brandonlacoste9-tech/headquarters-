import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Activity } from 'lucide-react';

const EmpireAnalytics = () => {
  const [data, setData] = useState([
    { time: '00:00', users: 1250000 },
    { time: '04:00', users: 850000 },
    { time: '08:00', users: 1950000 },
    { time: '12:00', users: 2850000 },
    { time: '16:00', users: 3150000 },
    { time: '20:00', users: 4250000 },
    { time: 'Now', users: 4892050 },
  ]);

  const [liveUsers, setLiveUsers] = useState(4892050);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live fluctuating users
      const fluctuation = Math.floor(Math.random() * 5000) - 2500;
      setLiveUsers(prev => prev + fluctuation);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update the "Now" data point to match liveUsers
    setData(prev => {
      const newData = [...prev];
      newData[newData.length - 1] = { ...newData[newData.length - 1], users: liveUsers };
      return newData;
    });
  }, [liveUsers]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Empire <span className="text-gradient">Analytics</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Live telemetry across all 6 global platforms.</p>
      </div>

      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid #00ff88' }}>
          <div style={{ background: 'rgba(0, 255, 136, 0.1)', padding: '1rem', borderRadius: '12px', color: '#00ff88' }}>
            <Users size={32} />
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Concurrent Users</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>{formatNumber(liveUsers)}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid #00b3ff' }}>
          <div style={{ background: 'rgba(0, 179, 255, 0.1)', padding: '1rem', borderRadius: '12px', color: '#00b3ff' }}>
            <DollarSign size={32} />
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Q3 Projected Revenue</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>$42.5M</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid #ff2a2a' }}>
          <div style={{ background: 'rgba(255, 42, 42, 0.1)', padding: '1rem', borderRadius: '12px', color: '#ff2a2a' }}>
            <Activity size={32} />
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Network Status</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#00ff88', fontFamily: 'monospace' }}>99.99%</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>All Systems Nominal</div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ width: '100%', height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff88" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
              <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                contentStyle={{ background: '#111', border: '1px solid rgba(0,255,136,0.3)', borderRadius: '8px' }}
                itemStyle={{ color: '#00ff88', fontWeight: 'bold' }}
                formatter={(value) => [formatNumber(value), 'Active Users']}
              />
              <Area type="monotone" dataKey="users" stroke="#00ff88" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" animationDuration={1000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EmpireAnalytics;
