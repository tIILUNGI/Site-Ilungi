import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, GraduationCap, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { useAlumniAuth } from '../lib/authContext';

const AILUNGIRegister: React.FC = () => {
  const { t, lang } = useAppContext();
  const { signUp } = useAlumniAuth();
  const isPt = lang === 'pt';
  const navigate = useNavigate();

  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [aceitarTermos, setAceitarTermos] = useState(false);
  const [receberNotificacoes, setReceberNotificacoes] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validatePassword = (pwd: string): boolean => {
    return pwd.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!nomeCompleto.trim()) {
      setError(isPt ? 'Nome completo é obrigatório' : 'Full name is required');
      return;
    }

    if (!email.trim()) {
      setError(isPt ? 'Email é obrigatório' : 'Email is required');
      return;
    }

    if (!validatePassword(password)) {
      setError(isPt ? 'Senha deve ter pelo menos 6 caracteres' : 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError(isPt ? 'As senhas não coincidem' : 'Passwords do not match');
      return;
    }

    if (!aceitarTermos) {
      setError(isPt ? 'Deve aceitar os Termos de Serviço e Política de Privacidade' : 'You must accept the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);

    const { error: signUpError } = await signUp(email, password, nomeCompleto, receberNotificacoes);

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#1B3C2B] mb-4">
              {isPt ? 'Conta Criada com Sucesso!' : 'Account Created Successfully!'}
            </h1>
            <p className="text-slate-600 mb-6">
              {isPt 
                ? 'Um email de confirmação foi enviado para o seu endereço de email. Por favor, verifique a sua caixa de spam e clique no link para confirmar a sua conta.'
                : 'A confirmation email has been sent to your email address. Please check your spam folder and click the link to confirm your account.'
              }
            </p>
            <Link 
              to="/academia/login"
              className="inline-block px-6 py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d] transition-all"
            >
              {isPt ? 'Ir para Login' : 'Go to Login'}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
          <p className="mt-4 text-slate-500">{isPt ? 'Portal AILUNGI' : 'AILUNGI Portal'}</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1B3C2B] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#1B3C2B]">
              {isPt ? 'Criar Conta' : 'Create Account'}
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {isPt 
                ? 'Comece sua jornada de aprendizado na ILUNGI hoje' 
                : 'Start your learning journey at ILUNGI today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* Nome Completo */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                {isPt ? 'Nome Completo' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text"
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  placeholder={isPt ? 'Nome completo é obrigatório' : 'Full name is required'}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#6a00a3]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#6a00a3]"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                {isPt ? 'Senha' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isPt ? 'Mínimo 6 caracteres' : 'Minimum 6 characters'}
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
              <p className="text-xs text-slate-400">
                {isPt 
                  ? 'Mínimo 6 caracteres, mistura de letras, números e símbolos recomendada' 
                  : 'Minimum 6 characters, mix of letters, numbers and symbols recommended'}
              </p>
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                {isPt ? 'Confirmar Senha' : 'Confirm Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={isPt ? 'Confirme a sua senha' : 'Confirm your password'}
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#6a00a3]"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={aceitarTermos}
                  onChange={(e) => setAceitarTermos(e.target.checked)}
                  className="mt-1 rounded border-slate-300 text-[#6a00a3] focus:ring-[#6a00a3]"
                />
                <span className="text-sm text-slate-600">
                  {isPt 
                    ? 'Concordo com os ' 
                    : 'I agree to the '}
                  <a href="#" className="text-[#6a00a3] hover:underline">
                    {isPt ? 'Termos de Serviço' : 'Terms of Service'}
                  </a>
                  {' '}{isPt ? 'e' : 'and'}{' '}
                  <a href="#" className="text-[#6a00a3] hover:underline">
                    {isPt ? 'Política de Privacidade' : 'Privacy Policy'}
                  </a>
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={receberNotificacoes}
                  onChange={(e) => setReceberNotificacoes(e.target.checked)}
                  className="mt-1 rounded border-slate-300 text-[#6a00a3] focus:ring-[#6a00a3]"
                />
                <span className="text-sm text-slate-600">
                  {isPt 
                    ? 'Gostaria de receber atualizações sobre novas certificações, cursos e novidades da ILUNGI'
                    : 'I would like to receive updates about new certifications, courses and ILUNGI news'}
                </span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d] transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
            >
              {loading 
                ? (isPt ? 'A criar conta...' : 'Creating account...')
                : (isPt ? 'Criar Conta' : 'Create Account')
              }
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              {isPt ? 'Já tem uma conta?' : 'Already have an account?'}{' '}
              <Link to="/academia/login" className="text-[#6a00a3] font-bold hover:underline">
                {isPt ? 'Entre em sua conta' : 'Sign in to your account'}
              </Link>
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

export default AILUNGIRegister;
