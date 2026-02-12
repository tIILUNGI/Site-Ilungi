
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AlumniLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Simular login com sucesso
      localStorage.setItem('alumni_logged_in', 'true');
      localStorage.setItem('alumni_email', email);
      navigate('/academia/alumni');
    } else {
      setError('Por favor, preencha todos os campos');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <img src="/imagens/ilungi_logo.jpg" alt="ILUNGI Logo" className="h-16 w-auto" />
          </Link>
          <p className="mt-4 text-slate-500">Portal Alumni ILUNGI</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1B3C2B] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#1B3C2B]">Bem-vindo Alumni</h1>
            <p className="text-slate-500 text-sm mt-2">Aceda à sua área exclusiva</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#6a00a3]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Palavra-passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#6a00a3]"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-slate-300 text-[#6a00a3] focus:ring-[#6a00a3]" />
                <span className="ml-2 text-slate-500">Lembrar-me</span>
              </label>
              <a href="#" className="text-[#6a00a3] hover:underline">Esqueci a palavra-passe</a>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d] transition-all shadow-lg shadow-purple-500/20"
            >
              Aceder
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Ainda não tens conta? <Link to="/academia/alumni" className="text-[#6a00a3] font-bold hover:underline">Regista-te aqui</Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-slate-400 text-xs">
          © {new Date().getFullYear()} ILUNGI Academy. Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
};

export default AlumniLogin;
