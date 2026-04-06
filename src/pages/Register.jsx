import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await api.register(username, password);

      if (res.success) {
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Registration failed.');
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
        <h1 className="text-gold">Create Account</h1>
        <p className="subtitle">Join the elite community of anime lovers.</p>
        
        <form onSubmit={handleRegister} className="auth-form">
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Pick a unique name"
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
          {success && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="success-msg">{success}</motion.p>}
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Continue'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have a universe? <Link to="/login" className="text-gold">Login here</Link></p>
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
        .success-msg { color: #43a047; font-size: 0.85rem; margin-top: 1rem; font-weight: 600; }
        .auth-footer { margin-top: 2rem; border-top: 1px solid var(--glass-border); padding-top: 2rem; }
      `}</style>
    </div>
  );
}

export default Register;
