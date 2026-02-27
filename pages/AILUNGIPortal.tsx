
import React, { useEffect } from 'react';
import { LayoutDashboard, BookOpen, Award, History, MessageCircle, LogOut, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const AILUNGIPortal: React.FC = () => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';
  const navigate = useNavigate();
  
  // Verificar se está logado (simulado)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('alumni_logged_in');
    if (!isLoggedIn) {
      navigate('/academia/login');
    }
  }, [navigate]);

  // Se não está logado, não renderiza nada (vai redirecionar)
  return (
    <div className="min-h-screen bg-slate-950 text-white flex pt-0">
      {/* Sidebar Simulation */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col hidden lg:flex">
        <div className="mb-10 flex items-center space-x-2">
            <img src="/imagens/ilungi_logo.jpg" alt="ILUNGI Logo" className="h-8 w-auto" />
            <span className="font-bold text-lg tracking-tight">{isPt ? 'Portal AILUNGI' : 'AILUNGI Portal'}</span>
        </div>
        
        <nav className="flex-1 space-y-2">
            {[
                { icon: <LayoutDashboard className="w-5 h-5" />, label: t.alumni.portal.dashboard, active: true },
                { icon: <BookOpen className="w-5 h-5" />, label: t.alumni.portal.courses },
                { icon: <Award className="w-5 h-5" />, label: t.alumni.portal.certificates },
                { icon: <History className="w-5 h-5" />, label: t.alumni.portal.history },
                { icon: <MessageCircle className="w-5 h-5" />, label: t.alumni.portal.support },
            ].map((item, i) => (
                <div key={i} className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${item.active ? 'bg-[#6a00a3] text-white shadow-lg shadow-purple-900/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                </div>
            ))}
        </nav>

        <div className="pt-6 border-t border-white/10">
            <button 
              onClick={() => {
                localStorage.removeItem('alumni_logged_in');
                localStorage.removeItem('alumni_email');
                navigate('/academia/login');
              }}
              className="flex items-center space-x-3 text-slate-400 hover:text-red-400 cursor-pointer w-full"
            >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">{t.alumni.portal.logout}</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto mt-20 lg:mt-0">
        <header className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-3xl font-bold">{t.alumni.portal.welcome}, André Manuel</h1>
                <p className="text-slate-400 mt-1">{t.alumni.portal.welcomeDesc}</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative p-2 bg-white/5 rounded-full cursor-pointer hover:bg-white/10">
                    <Bell className="w-6 h-6" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <img src="/imagens/ilungi_logo.jpg" className="w-10 h-10 rounded-full border border-white/20 object-cover" alt="Avatar" />
            </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
                { label: t.alumni.portal.stats.active, value: "02", color: "bg-blue-500" },
                { label: t.alumni.portal.stats.certs, value: "05", color: "bg-purple-500" },
                { label: t.alumni.portal.stats.hours, value: "128h", color: "bg-green-500" },
            ].map((stat, i) => (
                <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10"
                >
                    <p className="text-slate-400 text-sm font-bold uppercase mb-2">{stat.label}</p>
                    <h3 className="text-4xl font-black">{stat.value}</h3>
                </motion.div>
            ))}
        </div>

        {/* Course Card */}
        <h2 className="text-xl font-bold mb-6">{t.alumni.portal.inProgress}</h2>
        <div className="grid grid-cols-1 gap-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-48 h-28 bg-slate-800 rounded-2xl overflow-hidden">
                    <img src="/imagens/ISO.png" className="w-full h-full object-cover" alt="Course" />
                </div>
                <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold uppercase tracking-tight">
                          {isPt ? 'Especialista em ISO 27001 - Segurança da Informação' : 'ISO 27001 Information Security Specialist'}
                        </h4>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase">
                          65% {t.alumni.portal.completed}
                        </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-[#6a00a3]" style={{ width: '65%' }}></div>
                    </div>
                    <button className="px-6 py-2 bg-[#6a00a3] rounded-full text-sm font-bold hover:bg-[#520b7d] transition-all">
                      {t.alumni.portal.continue}
                    </button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AILUNGIPortal;
