import React, { useEffect, useState } from 'react';
import { LayoutDashboard, BookOpen, Award, History, MessageCircle, LogOut, Bell, Play, GraduationCap, ChevronRight, Search, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { useAlumniAuth } from '../lib/authContext';
import { defaultCourses } from '../lib/courseCatalogData';
import { loadData } from '../lib/dataSync';

const AILUNGIPortal: React.FC = () => {
  const { t, lang } = useAppContext();
  const { user } = useAlumniAuth();
  const isPt = lang === 'pt';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState(defaultCourses);
  
  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('alumni_logged_in') || user;
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    loadData('courses', 'ilungi_courses_data', defaultCourses).then((data) => {
      setCourses(data);
    });
  }, []);

  // Filter courses based on search
  const availableCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.area.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 6);

  // Show welcome page when not logged in
  if (!isLoading && !localStorage.getItem('alumni_logged_in') && !user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="w-24 h-24 bg-[#6a00a3] rounded-3xl flex items-center justify-center mx-auto">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-black">
              {isPt ? 'Bem-vindo ao Portal AILUNGI' : 'Welcome to AILUNGI Portal'}
            </h1>
            
            <p className="text-xl text-slate-400">
              {isPt 
                ? 'Acede aos teus cursos, certificados e materiais de estudo.' 
                : 'Access your courses, certificates and study materials.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button 
                onClick={() => navigate('/academia/login')}
                className="px-8 py-4 bg-[#6a00a3] text-white rounded-2xl font-bold hover:bg-[#520b7d] transition-all text-lg"
              >
                {isPt ? 'Entrar' : 'Login'}
              </button>
              <button 
                onClick={() => navigate('/academia/registar')}
                className="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all text-lg border border-white/20"
              >
                {isPt ? 'Criar Conta' : 'Create Account'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6a00a3]"></div>
      </div>
    );
  }

  // Logged in view
  const userName = localStorage.getItem('alumni_email')?.split('@')[0] || 'Aluno';

  return (
    <div className="min-h-screen bg-slate-950 text-white flex pt-0">
      {/* Sidebar */}
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
                <h1 className="text-3xl font-bold">{t.alumni.portal.welcome}, {userName}</h1>
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
                    <button 
                      onClick={() => navigate('/academia/curso/demo')}
                      className="px-6 py-2 bg-[#6a00a3] rounded-full text-sm font-bold hover:bg-[#520b7d] transition-all flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>{t.alumni.portal.continue}</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Available Courses Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{isPt ? 'Cursos Disponíveis' : 'Available Courses'}</h2>
            <Link to="/academia/cursos" className="text-sm font-bold text-[#6a00a3] hover:text-[#a855f7] flex items-center gap-1">
              {isPt ? 'Ver todos' : 'View all'}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isPt ? 'Pesquisar cursos...' : 'Search courses...'}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#6a00a3] focus:border-transparent"
            />
          </div>
          
          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableCourses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#6a00a3]/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-[#6a00a3]/20 rounded-lg">
                    <BookOpen className="w-5 h-5 text-[#6a00a3]" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-white/5 px-2 py-1 rounded">
                    {course.code}
                  </span>
                </div>
                <h4 className="font-bold text-white mb-2 group-hover:text-[#a855f7] transition-colors line-clamp-2">
                  {course.name}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.hours}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {course.area}
                  </span>
                </div>
                <button className="w-full py-2 bg-white/10 rounded-lg text-sm font-bold text-white group-hover:bg-[#6a00a3] transition-all">
                  {isPt ? 'Inscrever-se' : 'Enroll'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AILUNGIPortal;
