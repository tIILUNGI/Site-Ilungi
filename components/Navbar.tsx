
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Globe, Menu, X, Shield, BarChart3, ShoppingBag, Briefcase, GraduationCap, Laptop, Users, ExternalLink, Sun, Moon, Home } from 'lucide-react';
import { useAppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { lang, setLang, t, isDark, setIsDark } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');
  const toggleDarkMode = () => setIsDark(!isDark);

  const menuItems = [
    {
      label: t.nav.consulting,
      id: 'consulting',
      path: '/consultoria',
      mega: [
        {
          title: t.nav.iso,
          icon: <Shield className="w-5 h-5" />,
          path: '/consultoria/iso',
       
        },
        { title: t.nav.risk, icon: <BarChart3 className="w-5 h-5" />, path: '/consultoria/risco' },
        { title: t.nav.procurement, icon: <ShoppingBag className="w-5 h-5" />, path: '/consultoria/procurement' },
        { title: t.nav.pmo, icon: <Briefcase className="w-5 h-5" />, path: '/consultoria/pmo' },
      ]
    },
    {
      label: t.nav.academy,
      id: 'academy',
      path: '/academia',
      mega: [
        { title: t.nav.alumni, icon: <Users className="w-5 h-5" />, path: '/academia/alumni' },
        { title: "GPMOi (Cursos)", icon: <ExternalLink className="w-4 h-4" />, href: "https://gpmoi.org/" },
        { title: t.nav.verify, icon: <Shield className="w-5 h-5" />, path: '/academia/verificar' },
        { title: "School of Reputation", icon: <ExternalLink className="w-4 h-4" />, href: "https://scr.ilungi.ao/" },
      ]
    },
    {
      label: t.nav.solutions,
      id: 'solutions',
      path: '/solucoes',
      mega: [
        { title: "Salya (GRC Platform)", icon: <Laptop className="w-5 h-5" />, path: '/solucoes/salya' },
        { title: "SICLIC (Compliance)", icon: <ExternalLink className="w-4 h-4" />, href: "https://siclic.ao/" },
        { title: "Tocomply360", icon: <Laptop className="w-5 h-5" />, path: '/solucoes/tocomply' },
      ]
    },
    { label: t.nav.partners, id: 'partners', path: '/parceiros' },
    { label: t.nav.contact, id: 'contact', path: '/contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 glass ${isDark ? 'glass-dark text-white' : 'text-slate-900'} border-b border-slate-200/50`}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/imagens/ilungi_logo.jpg" alt="ILUNGI Logo" className="h-16 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-1 font-medium hover:text-[#6a00a3] transition-colors">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="relative group h-20 flex items-center"
              onMouseEnter={() => setActiveMenu(item.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link to={item.path || '#'} className="flex items-center space-x-1 font-medium hover:text-[#6a00a3] transition-colors">
                <span>{item.label}</span>
                {item.mega && <ChevronDown className="w-4 h-4" />}
              </Link>

              {/* Mega Menu */}
              {item.mega && (
                <AnimatePresence>
                  {activeMenu === item.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] glass p-8 rounded-2xl mega-menu-shadow border border-slate-200"
                    >
                      <div className="grid grid-cols-2 gap-8">
                        {item.mega.map((sub, idx) => (
                          <div key={idx} className="space-y-3">
                            {sub.href ? (
                              <a href={sub.href} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group/sub">
                                <div className="p-2 bg-slate-100 rounded-lg group-hover/sub:bg-[#6a00a3] group-hover/sub:text-white transition-all">
                                  {sub.icon}
                                </div>
                                <h4 className="font-bold text-slate-800 flex items-center">
                                  {sub.title}
                                </h4>
                              </a>
                            ) : (
                              <Link to={sub.path} className="flex items-center space-x-3 group/sub">
                                <div className="p-2 bg-slate-100 rounded-lg group-hover/sub:bg-[#6a00a3] group-hover/sub:text-white transition-all">
                                  {sub.icon}
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-800 flex items-center">
                                    {sub.title}
                                  </h4>
                                  {sub.subItems && (
                                    <ul className="mt-2 space-y-1">
                                      {sub.subItems.map((si, sidx) => (
                                        <li key={sidx} className="text-sm text-slate-500 hover:text-[#6a00a3] cursor-pointer transition-colors">
                                          • {si}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={toggleLang} 
            className="flex items-center space-x-1 px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{lang}</span>
          </button>
          
          <Link to="/contacto" className="hidden sm:block px-6 py-2.5 bg-[#6a00a3] text-white rounded-full font-bold hover:bg-[#520b7d] transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20">
            {t.home.ctaPrimary}
          </Link>

          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-slate-200 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {menuItems.map(item => (
                <div key={item.id}>
                  <Link to={item.path || '#'} onClick={() => setIsOpen(false)} className="block font-bold text-lg py-2 border-b border-slate-100">{item.label}</Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
