import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ShieldAlert, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-24 font-sans text-sm">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-2xl glow-border-pink relative overflow-hidden shadow-2xl shadow-black"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center mx-auto mb-4 text-brand-pink">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">CMS Control Login</h1>
          <p className="text-zinc-500 text-xs">
            Authenticate to manage classes, leads, blogs, and gallery uploads.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-semibold mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-700 focus:outline-none focus:border-brand-pink transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-700 focus:outline-none focus:border-brand-pink transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 mt-6 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-zinc-500">
          <p className="flex items-center justify-center gap-1">
            <ShieldAlert className="w-4 h-4 text-brand-purple animate-pulse" />
            Demo User: <strong className="text-zinc-300">admin</strong> / Pass: <strong className="text-zinc-300">admin123</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
