import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, Key, ArrowLeft, Mail, Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile?.role === 'admin') {
          navigate('/god-mode');
        }
      }
    };
    checkExistingSession();
  }, [navigate]);

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

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role === 'admin') {
        navigate('/god-mode');
      } else {
        await supabase.auth.signOut();
        setError('Unauthorized: You do not possess God Mode clearance.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-page" style={{ overflow: 'hidden' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255, 42, 42, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 42, 42, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: 0,
        }}
      />

      <div className="glass-panel auth-card animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
        <Link to="/" className="btn btn-outline" style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <ArrowLeft size={14} aria-hidden="true" /> Back to HQ
        </Link>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'rgba(255, 42, 42, 0.1)',
            border: '1px solid var(--godmode-accent)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--godmode-accent)',
            boxShadow: '0 0 20px rgba(255, 42, 42, 0.2)',
          }}>
            <Key size={28} aria-hidden="true" />
          </div>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.75rem', textAlign: 'center', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
          God Mode
        </h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Authenticate to access the master dashboard.
        </p>

        {error && (
          <div className="auth-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={18} aria-hidden="true" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="admin-email" style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Master Email
            </label>
            <div className="input-icon-wrap">
              <Mail size={18} aria-hidden="true" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field input-with-icon"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Encryption Key
            </label>
            <div className="input-icon-wrap">
              <Lock size={18} aria-hidden="true" />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field input-with-icon"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn"
            style={{
              width: '100%',
              background: 'var(--godmode-accent)',
              color: '#fff',
              padding: '1rem',
              marginTop: '0.25rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              textTransform: 'uppercase',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'wait' : 'pointer',
            }}
          >
            {loading ? 'Authenticating...' : 'Initialize'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;