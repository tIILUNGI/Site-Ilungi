import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { useAlumniAuth } from '../lib/authContext';

const AILUNGILogin: React.FC = () => {
  const { t, lang } = useAppContext();
  const { signIn } = useAlumniAuth();
  const isPt = lang === 'pt';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (email && password) {
      setLoading(true);
      const { error: apiError } = await signIn(email, password);
      setLoading(false);
      
      if (!apiError) {
        navigate('/academia/alumni');
      } else {
        setError(apiError.message);
      }
    } else {
      setError(isPt ? 'Por favor, insira um email e password válida.' : 'Please enter a valid email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#1B3C2B] to-slate-900 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6a00a3]/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1B3C2B]/30 rounded-full blur-[100px]"></div>
      </div>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <img src="/imagens/ilungi_logo.jpg" alt="ILUNGI Logo" className="h-16 w-auto rounded-lg" />
          </Link>
          <p className="mt-4 text-slate-300">{isPt ? 'Portal AILUNGI' : 'AILUNGI Portal'}</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6a00a3] to-[#1B3C2B] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-900/30">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">{t.alumni.login.title}</h1>
            <p className="text-slate-300 text-sm mt-2">{t.alumni.login.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/20 text-red-300 text-sm rounded-lg border border-red-500/30">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-200">{t.alumni.login.email}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#6a00a3] focus:border-transparent"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-200">{t.alumni.login.password}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#6a00a3] focus:border-transparent"
                  autoComplete="off"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-slate-500 bg-white/5 text-[#6a00a3] focus:ring-[#6a00a3]" />
                <span className="ml-2 text-slate-300">{t.alumni.login.remember}</span>
              </label>
              <a href="#" className="text-[#a855f7] hover:text-white">{t.alumni.login.forgot}</a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#6a00a3] to-[#7c3aed] text-white rounded-xl font-bold hover:from-[#520b7d] hover:to-[#6a00a3] transition-all shadow-lg shadow-purple-900/30 disabled:opacity-50"
            >
              {loading ? (isPt ? 'A entrar...' : 'Signing in...') : t.alumni.login.button}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-300 text-sm">
              {t.alumni.login.noAccount} <Link to="/academia/registar" className="text-[#a855f7] font-bold hover:text-white">{t.alumni.login.register}</Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-slate-400 text-xs">
          © {new Date().getFullYear()} ILUNGI Academy. {isPt ? 'Todos os direitos reservados.' : 'All rights reserved.'}
        </p>
      </motion.div>
    </div>
  );
};

export default AILUNGILogin;
