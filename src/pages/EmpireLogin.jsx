import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Globe, Shield, Activity, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const EmpireLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        setSuccess('Check your email to confirm, then sign in.');
        showToast('Empire ID created — check your inbox');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;

        const ref = sessionStorage.getItem('empire_ref');
        const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (ref && uuidPattern.test(ref)) {
          const { error: rpcError } = await supabase.rpc('process_referral', { referrer: ref });
          if (rpcError) {
            console.error('Referral failed:', rpcError);
          } else {
            sessionStorage.removeItem('empire_ref');
            showToast('Referral applied — points awarded');
          }
        } else if (ref) {
          sessionStorage.removeItem('empire_ref');
        }

        showToast('Welcome back to the Empire');
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="glass-panel auth-card">
        <Link to="/" className="btn btn-outline" style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <ArrowLeft size={14} aria-hidden="true" /> Back to HQ
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Globe size={32} color="#fff" aria-hidden="true" />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', letterSpacing: '1px', fontFamily: 'var(--font-heading)' }}>
            Empire <span style={{ color: 'var(--iron-color)' }}>Passport</span>
          </h1>
          <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '0.9rem' }}>One account. Access the entire network.</p>
        </div>

        {success && <div className="auth-success">{success}</div>}
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-icon-wrap">
            <Mail size={20} aria-hidden="true" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field input-with-icon"
              autoComplete="email"
            />
          </div>

          <div className="input-icon-wrap">
            <Lock size={20} aria-hidden="true" />
            <input
              type="password"
              placeholder="Secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field input-with-icon"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ marginTop: '0.5rem', padding: '1rem' }}
          >
            {loading ? 'Authenticating...' : (isSignUp ? 'Create Empire ID' : 'Access Network')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setError(null); setSuccess(null); }}
            className="link-btn"
          >
            {isSignUp ? 'Already have an ID? Sign in' : 'Need an Empire ID? Create one'}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
          <Shield size={20} color="#444" aria-hidden="true" />
          <Activity size={20} color="#444" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default EmpireLogin;