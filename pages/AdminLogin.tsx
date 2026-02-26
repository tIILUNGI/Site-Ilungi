import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, LogIn } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAppContext } from '../App';

const AdminLogin: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate('/admin');
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    if (!supabase) {
      setStatus('error');
      setError(isPt ? 'Supabase não está configurado.' : 'Supabase is not configured.');
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setStatus('error');
      setError(isPt ? 'Credenciais inválidas.' : 'Invalid credentials.');
      return;
    }

    navigate('/admin');
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-md mx-auto px-4">
        <div className={`rounded-3xl p-8 shadow-xl ${isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#6a00a3]/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#6a00a3]" />
            </div>
            <div>
              <h1 className="text-2xl font-black">{isPt ? 'Acesso Admin' : 'Admin Access'}</h1>
              <p className="text-sm text-slate-500">
                {isPt ? 'Entre com as suas credenciais' : 'Sign in with your credentials'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">
                {isPt ? 'Email' : 'Email'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                placeholder="admin@empresa.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                {isPt ? 'Palavra-passe' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                required
              />
            </div>

            {status === 'error' && (
              <div className="text-sm text-red-500 font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d] transition-all disabled:opacity-60"
            >
              <LogIn className="w-4 h-4" />
              {status === 'loading' ? (isPt ? 'A entrar...' : 'Signing in...') : (isPt ? 'Entrar' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-sm text-slate-500">
            <Link to="/" className="hover:text-[#6a00a3] font-semibold">
              {isPt ? 'Voltar ao site' : 'Back to site'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
