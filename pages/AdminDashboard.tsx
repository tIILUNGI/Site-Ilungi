import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, PackageSearch, Users, Briefcase, FileText, Settings, 
  Building, GraduationCap, LogOut, Mail, RefreshCw, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useAppContext } from '../App';
import { pushAllDataToRemote } from '../lib/dataInitialization';
import { endpoints } from '../lib/api';

const AdminDashboard: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';
  const navigate = useNavigate();
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState('');
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [stats, setStats] = useState({ visitors: 0, messages: 0 });

  const fetchStats = async () => {
    try {
      const analytics = await endpoints.analytics.getOverview().catch(() => ({ totalVisitors: 0 }));
      const messages = await endpoints.contact.getMessages().catch(() => []);
      setStats({
        visitors: analytics?.totalVisitors || 0,
        messages: Array.isArray(messages) ? messages.length : 0
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchRecentMessages = async () => {
    try {
      setLoadingMessages(true);
      const data = await endpoints.contact.getMessages();
      if (Array.isArray(data)) {
        setRecentMessages(data.slice(0, 5)); // Get last 5
      }
    } catch (error) {
      console.error('Failed to fetch recent messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleForceSync = async () => {
    if (!confirm(isPt 
      ? 'Atenção: Isso irá apagar todos os dados atuais na base de dados e substituir pelos dados configurados no código do frontend. Deseja continuar?' 
      : 'Warning: This will delete all current data in the database and replace it with data from the frontend code. Continue?')) {
      return;
    }

    setSyncing(true);
    setSyncStatus('syncing');
    try {
      await pushAllDataToRemote((msg) => {
        setSyncMessage(msg);
      });
      setSyncStatus('success');
      localStorage.setItem('ilungi_db_populated', 'true');
      fetchStats(); // Refresh stats after sync
      setTimeout(() => setSyncStatus('idle'), 5000);
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('error');
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    const runAutoSync = async () => {
      const isPopulated = localStorage.getItem('ilungi_db_populated');
      const token = sessionStorage.getItem('ilungi_admin_token');
      
      if (token && isPopulated !== 'true') {
        setSyncing(true);
        setSyncStatus('syncing');
        try {
          await pushAllDataToRemote((msg) => setSyncMessage(msg));
          localStorage.setItem('ilungi_db_populated', 'true');
          setSyncStatus('success');
          setTimeout(() => setSyncStatus('idle'), 5000);
        } catch (error) {
          setSyncStatus('error');
        } finally {
          setSyncing(false);
        }
      }
    };
    
    runAutoSync();
    fetchRecentMessages();
    fetchStats();
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem('ilungi_admin');
    sessionStorage.removeItem('ilungi_admin_token');
    sessionStorage.removeItem('ilungi_admin_email');
    window.dispatchEvent(new Event('ilungi-admin-auth'));
    navigate('/admin/login');
  };

  const menuItems = [
    {
      title: isPt ? 'Gerir Soluções' : 'Manage Solutions',
      desc: isPt ? 'Produtos, SaaS e demos.' : 'Products, SaaS and demos.',
      icon: <PackageSearch className="w-6 h-6 mb-3 text-[#6a00a3]" />,
      path: '/admin/solucoes',
      color: 'bg-[#6a00a3]/10 border-[#6a00a3]/20'
    },
    {
      title: isPt ? 'Gerir Serviços' : 'Manage Services',
      desc: isPt ? 'Áreas de consultoria.' : 'Consulting areas.',
      icon: <Briefcase className="w-6 h-6 mb-3 text-[#1B3C2B]" />,
      path: '/admin/servicos',
      color: 'bg-[#1B3C2B]/10 border-[#1B3C2B]/20'
    },
    {
      title: isPt ? 'Gerir Cursos' : 'Manage Courses',
      desc: isPt ? 'Catálogo de cursos.' : 'Course catalog.',
      icon: <GraduationCap className="w-6 h-6 mb-3 text-[#6a00a3]" />,
      path: '/admin/cursos',
      color: 'bg-[#6a00a3]/10 border-[#6a00a3]/20'
    },
    {
      title: isPt ? 'Referências' : 'References',
      desc: isPt ? 'Testemunhos e logos.' : 'Testimonials and logos.',
      icon: <Users className="w-6 h-6 mb-3 text-blue-500" />,
      path: '/admin/referencias',
      color: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: isPt ? 'Parceiros' : 'Partners',
      desc: isPt ? 'Empresas parceiras.' : 'Partner companies.',
      icon: <Building className="w-6 h-6 mb-3 text-orange-500" />,
      path: '/admin/parceiros',
      color: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      title: isPt ? 'Mensagens' : 'Messages',
      desc: isPt ? 'Contactos recebidos.' : 'Received contacts.',
      icon: <Mail className="w-6 h-6 mb-3 text-[#6a00a3]" />,
      path: '/admin/mensagens',
      color: 'bg-[#6a00a3]/10 border-[#6a00a3]/20'
    }
  ];

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-black mb-4 tracking-tight"
            >
              {isPt ? 'Painel de Controlo' : 'Control Panel'}
            </motion.h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl">
              {isPt 
                ? `Bem-vindo ao CMS da ILUNGI (${sessionStorage.getItem('ilungi_admin_email') || 'Admin'}). Aqui pode gerir todo o conteúdo do seu site em tempo real.` 
                : `Welcome to ILUNGI CMS (${sessionStorage.getItem('ilungi_admin_email') || 'Admin'}). Here you can manage all your website content in real time.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleForceSync}
              disabled={syncing}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                syncing ? 'bg-slate-200 text-slate-400' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20'
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
              {isPt ? 'Sincronizar Dados do Front' : 'Sync Front Data'}
            </button>
            <button
              onClick={handleSignOut}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-200 hover:bg-slate-300'
              }`}
            >
              <LogOut className="w-5 h-5" />
              {isPt ? 'Sair' : 'Sign Out'}
            </button>
          </div>
        </div>

        {/* Sync Progress Banner */}
        <AnimatePresence>
          {syncStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 p-6 rounded-3xl flex items-center justify-between border ${
                syncStatus === 'syncing' ? 'bg-orange-500/10 border-orange-500/30' :
                syncStatus === 'success' ? 'bg-green-500/10 border-green-500/30' :
                'bg-red-500/10 border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-4">
                {syncStatus === 'syncing' && <RefreshCw className="w-6 h-6 text-orange-500 animate-spin" />}
                {syncStatus === 'success' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                {syncStatus === 'error' && <AlertCircle className="w-6 h-6 text-red-500" />}
                <div>
                  <h4 className="font-bold">
                    {syncStatus === 'syncing' ? (isPt ? 'Sincronização em curso...' : 'Syncing in progress...') :
                     syncStatus === 'success' ? (isPt ? 'Sincronização concluída!' : 'Sync complete!') :
                     (isPt ? 'Erro na sincronização' : 'Sync failed')}
                  </h4>
                  <p className="text-sm opacity-70">{syncMessage || (syncStatus === 'success' ? (isPt ? 'Todos os dados foram atualizados.' : 'All data has been updated.') : '')}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Grid - Modules */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={item.path} className="block h-full group">
                  <div className={`p-8 rounded-[2.5rem] border ${item.color} ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-2`}>
                    {item.icon}
                    <h3 className="text-xl font-black mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            {/* Extended Modules row */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: isPt ? 'Blog' : 'Blog', path: '/admin/blog', icon: <FileText className="w-5 h-5" />, color: 'bg-teal-500/10' },
                { title: isPt ? 'Talentos' : 'Talents', path: '/admin/talentos', icon: <Users className="w-5 h-5" />, color: 'bg-orange-500/10' },
                { title: isPt ? 'Config' : 'Config', path: '/admin/configuracoes', icon: <Settings className="w-5 h-5" />, color: 'bg-slate-500/10' },
              ].map((item, i) => (
                <Link key={i} to={item.path} className={`p-6 rounded-3xl border border-transparent ${item.color} flex items-center gap-4 hover:shadow-lg transition-all`}>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl">{item.icon}</div>
                  <span className="font-bold">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar - Recent Messages */}
          <div className="lg:col-span-4">
            <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-slate-900 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'} h-full`}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black flex items-center gap-3">
                  <Mail className="w-6 h-6 text-[#6a00a3]" />
                  {isPt ? 'Mensagens Recentes' : 'Recent Messages'}
                </h3>
                <Link to="/admin/mensagens" className="text-xs font-black text-[#6a00a3] hover:underline uppercase tracking-widest">
                  {isPt ? 'Ver todas' : 'View all'}
                </Link>
              </div>

              {loadingMessages ? (
                <div className="flex flex-col items-center py-12 opacity-50">
                  <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                  <span className="text-sm font-bold">Carregando...</span>
                </div>
              ) : recentMessages.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <p className="font-medium">{isPt ? 'Nenhuma mensagem nova.' : 'No new messages.'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentMessages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'} hover:border-[#6a00a3]/50 transition-all cursor-pointer`}
                      onClick={() => navigate('/admin/mensagens')}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-black uppercase tracking-tighter text-[#6a00a3]">
                          {msg.type === 'contact' ? 'Contacto' : 'Candidatura'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm truncate">{msg.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{msg.subject || msg.email}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-8 p-6 bg-gradient-to-br from-[#6a00a3] to-[#1B3C2B] rounded-[2rem] text-white">
                <h4 className="font-bold mb-2">{isPt ? 'Estado do Sistema' : 'System Status'}</h4>
                <div className="flex items-center gap-2 text-xs font-medium opacity-80 mb-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Conectado à API Principal
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="block text-[10px] uppercase font-black opacity-60">
                      {isPt ? 'Total Visitas' : 'Total Visitors'}
                    </span>
                    <span className="text-lg font-black">{stats.visitors}</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="block text-[10px] uppercase font-black opacity-60">
                      {isPt ? 'Mensagens' : 'Messages'}
                    </span>
                    <span className="text-lg font-black">{stats.messages}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
