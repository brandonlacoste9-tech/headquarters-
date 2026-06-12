import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Key } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Verify Admin Role
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile && profile.role === 'admin') {
        navigate('/godmode');
      } else {
        await supabase.auth.signOut();
        setError("Unauthorized: You do not possess God Mode clearance.");
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Grid Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255, 42, 42, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 42, 42, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: -1 }}></div>

      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '450px', padding: '3rem', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '60px', height: '60px', background: 'rgba(255, 42, 42, 0.1)', border: '1px solid #ff2a2a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff2a2a', boxShadow: '0 0 20px rgba(255, 42, 42, 0.2)' }}>
            <Key size={30} />
          </div>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '2rem', textAlign: 'center', marginBottom: '0.5rem', textTransform: 'uppercase' }}>God Mode</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>Authenticate to access the Master Dashboard.</p>

        {error && (
          <div style={{ background: 'rgba(255,42,42,0.1)', borderLeft: '4px solid #ff2a2a', color: '#ff8a8a', padding: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={20} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Master Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', color: '#fff', padding: '1rem', borderRadius: '8px', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Encryption Key</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', color: '#fff', padding: '1rem', borderRadius: '8px', outline: 'none' }}
            />
          </div>
          
          <button type="submit" disabled={loading} style={{ width: '100%', background: '#ff2a2a', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', fontFamily: 'var(--font-heading)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '0.5rem' }}>
            {loading ? 'Authenticating...' : 'Initialize'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
