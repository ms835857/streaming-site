import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.login(username, password);

      if (res.success) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('user_id', res.user.id);
        
        if (res.user.role === 'admin' || res.user.username === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
        window.location.reload();
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper glass">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-card"
      >
        <h1 className="text-gold">Welcome Back</h1>
        <p className="subtitle">Enter your details to access your universe.</p>
        
        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="e.g. admin"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-msg">{error}</motion.p>}
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register" className="text-gold">Register now</Link></p>
          <div className="hint-box">
             <small>Demo Hint: <strong>admin</strong> / <strong>password</strong></small>
          </div>
        </div>
      </motion.div>

      <style>{`
        .auth-wrapper {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2rem;
          border-radius: var(--radius-lg);
        }
        .auth-card {
          width: 100%;
          max-width: 450px;
          padding: 3rem;
          text-align: center;
        }
        .auth-card h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .subtitle { color: var(--text-muted); margin-bottom: 2.5rem; }
        .auth-form { text-align: left; }
        .input-group { margin-bottom: 1.5rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem; }
        .input-group input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 1rem;
          border-radius: var(--radius-md);
          color: white;
          outline: none;
          transition: var(--transition);
        }
        .input-group input:focus { border-color: var(--accent); background: rgba(255, 215, 0, 0.05); }
        .btn-primary {
          width: 100%;
          background: var(--primary);
          color: white;
          padding: 1rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 1rem;
          margin-top: 1rem;
          transition: var(--transition);
        }
        .btn-primary:hover:not(:disabled) { background: var(--primary-light); transform: translateY(-2px); }
        .error-msg { color: #ff4d4d; font-size: 0.85rem; margin-top: 1rem; font-weight: 600; }
        .auth-footer { margin-top: 2rem; border-top: 1px solid var(--glass-border); padding-top: 2rem; }
        .hint-box { margin-top: 1rem; padding: 0.5rem; background: rgba(255, 215, 0, 0.1); border-radius: 8px; border: 1px dashed var(--accent); }
      `}</style>
    </div>
  );
}

export default Login;
