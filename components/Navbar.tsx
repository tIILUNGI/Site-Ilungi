import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { useAppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { lang, setLang, t, isDark } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const isPt = lang === 'pt';
  const navigate = useNavigate();

  const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');

  const menuItems = [
    {
      label: t.nav.consulting,
      id: 'consulting',
      path: '/consultoria',
      description: isPt ? 'Consultoria especializada para o seu negócio' : 'Specialized consulting for your business',
      mega: [
        { title: t.nav.iso, desc: isPt ? 'Certificação e implementação de normas ISO' : 'Certification and implementation of ISO standards', path: '/consultoria/iso' },
        { title: t.nav.risk, desc: isPt ? 'Gestão e mitigação de riscos corporativos' : 'Corporate risk management and mitigation', path: '/consultoria/risco' },
        { title: t.nav.procurement, desc: isPt ? 'Otimização de processos de aquisição' : 'Optimization of procurement processes', path: '/consultoria/procurement' },
        { title: t.nav.pmo, desc: isPt ? 'Gestão estratégica de projetos' : 'Strategic project management', path: '/consultoria/pmo' },
      ]
    },
    {
      label: t.nav.academy,
      id: 'academy',
      path: '/academia',
      description: isPt ? 'Formação e certificação profissional' : 'Professional training and certification',
      mega: [
        { title: t.nav.alumni, desc: isPt ? 'Portal de ex-alunos e certificações' : 'Alumni portal and certifications', path: '/academia/alumni' },
        { title: "GPMOi (Cursos)", desc: isPt ? 'Cursos online e formação contínua' : 'Online courses and continuing education', href: "https://gpmoi.org/" },
        { title: t.nav.verify, desc: isPt ? 'Verifique a autenticidade de certificados' : 'Verify certificate authenticity', path: '/academia/verificar' },
        { title: "School of Reputation", desc: isPt ? 'Formação em gestão de reputação' : 'Reputation management training', href: "https://scr.ilungi.ao/" },
      ]
    },
    {
      label: t.nav.solutions,
      id: 'solutions',
      path: '/solucoes',
      description: isPt ? 'Tecnologia para a sua gestão' : 'Technology for your management',
      mega: [
        { title: "Salya", desc: isPt ? 'Plataforma de gestão e compliance' : 'Management and compliance platform', path: '/solucoes/salya' },
        { title: "SICLIC", desc: isPt ? 'Sistema de compliance legal' : 'Legal compliance system', href: "https://siclic.ao/" },
        { title: "Tocomply360", desc: isPt ? 'Framework de governança corporativa' : 'Corporate governance framework', path: '/solucoes/tocomply' },
      ]
    },
    { label: t.nav.partners, id: 'partners', path: '/parceiros' },
    { label: t.nav.contact, id: 'contact', path: '/contacto' },
  ];

  const handleClick = (e: React.MouseEvent, item: any) => {
    if (item.mega) {
      e.preventDefault();
      navigate(item.path);
      setActiveMenu(null);
    }
  };

  const handleMouseEnter = (id: string) => {
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-xl border-b ${isDark ? 'border-slate-700/50' : 'border-slate-200/50'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.img 
            src="/imagens/ilungi_logo.jpg" 
            alt="ILUNGI Logo" 
            className="h-14 w-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center h-20">
          <Link to="/" className="font-medium px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            {t.nav.home}
          </Link>
          
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="relative h-full"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              {item.mega ? (
                <Link 
                  to={item.path}
                  onClick={(e) => handleClick(e, item)}
                  className={`flex items-center gap-1 font-medium px-4 py-2 h-full ${activeMenu === item.id ? 'text-[#6a00a3]' : ''} hover:text-[#6a00a3] transition-colors cursor-pointer`}
                >
                  <span>{item.label}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === item.id ? 'rotate-180' : ''}`} />
                </Link>
              ) : (
                <Link 
                  to={item.path}
                  className="flex items-center gap-1 font-medium px-4 py-2 h-full hover:text-[#6a00a3] transition-colors"
                >
                  <span>{item.label}</span>
                </Link>
              )}

              {/* Mega Menu */}
              {item.mega && (
                <AnimatePresence>
                  {activeMenu === item.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-4"
                    >
                      <div className={`w-[600px] ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl shadow-2xl border overflow-hidden`}>
                        {/* Header Description */}
                        <div className={`px-6 py-4 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'} border-b ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                          <p className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.description}</p>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="p-3">
                          <div className="grid grid-cols-1 gap-1">
                            {item.mega.map((sub: any, idx) => (
                              <div key={idx}>
                                {sub.href ? (
                                  <a 
                                    href={sub.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`flex flex-col p-4 rounded-xl transition-all group ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
                                  >
                                    <span className={`font-bold text-lg mb-1 group-hover:text-[#6a00a3] transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                      {sub.title}
                                    </span>
                                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                      {sub.desc}
                                    </span>
                                  </a>
                                ) : (
                                  <Link 
                                    to={sub.path} 
                                    className={`flex flex-col p-4 rounded-xl transition-all group ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
                                  >
                                    <span className={`font-bold text-lg mb-1 group-hover:text-[#6a00a3] transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                      {sub.title}
                                    </span>
                                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                      {sub.desc}
                                    </span>
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Translate Button */}
          <motion.button 
            onClick={toggleLang}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm border transition-all ${
              isDark 
                ? 'border-slate-600 hover:border-[#6a00a3] text-slate-300 hover:text-[#6a00a3]' 
                : 'border-slate-300 hover:border-[#6a00a3] text-slate-600 hover:text-[#6a00a3]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="w-4 h-4" />
            <span>{lang.toUpperCase()}</span>
          </motion.button>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link to="/contacto" className="hidden sm:block px-6 py-2.5 bg-[#6a00a3] text-white rounded-full font-semibold hover:bg-[#520b7d] transition-all shadow-lg shadow-purple-500/25">
              {t.home.ctaPrimary}
            </Link>
          </motion.div>

          <motion.button 
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Only main tabs, no sub-menus */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} border-t overflow-hidden`}
          >
            <div className="px-6 py-4 space-y-1">
              <Link 
                to="/" 
                onClick={() => setIsOpen(false)} 
                className={`block font-semibold text-lg py-3 ${isDark ? 'text-white' : 'text-slate-800'}`}
              >
                {t.nav.home}
              </Link>
              {menuItems.map(item => (
                <Link 
                  key={item.id}
                  to={item.path || '#'} 
                  onClick={() => setIsOpen(false)} 
                  className={`block font-semibold text-lg py-3 border-b border-slate-200/10 ${isDark ? 'text-white' : 'text-slate-800'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
