import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PackageSearch, Users, Briefcase, FileText, Settings, Building, GraduationCap } from 'lucide-react';
import { useAppContext } from '../App';

const AdminDashboard: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';

  const menuItems = [
    {
      title: isPt ? 'Gerir Soluções' : 'Manage Solutions',
      desc: isPt ? 'Adicionar ou editar produtos, SaaS e demos.' : 'Add or edit products, SaaS and demos.',
      icon: <PackageSearch className="w-8 h-8 mb-4 text-[#6a00a3]" />,
      path: '/admin/solucoes',
      color: 'bg-[#6a00a3]/10 border-[#6a00a3]/20'
    },
    {
      title: isPt ? 'Gerir Serviços' : 'Manage Services',
      desc: isPt ? 'Áreas de consultoria e especialidades.' : 'Consulting areas and specialties.',
      icon: <Briefcase className="w-8 h-8 mb-4 text-[#1B3C2B]" />,
      path: '/admin/servicos',
      color: 'bg-[#1B3C2B]/10 border-[#1B3C2B]/20'
    },
    {
      title: isPt ? 'Gerir Cursos' : 'Manage Courses',
      desc: isPt ? 'Catálogo de cursos e informações.' : 'Course catalog and details.',
      icon: <GraduationCap className="w-8 h-8 mb-4 text-[#6a00a3]" />,
      path: '/admin/cursos',
      color: 'bg-[#6a00a3]/10 border-[#6a00a3]/20'
    },
    {
      title: isPt ? 'Referências de Clientes' : 'Client References',
      desc: isPt ? 'Testemunhos e logotipos de parceiros.' : 'Testimonials and partner logos.',
      icon: <Users className="w-8 h-8 mb-4 text-blue-500" />,
      path: '/admin/referencias',
      color: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: isPt ? 'Gerir Parceiros' : 'Manage Partners',
      desc: isPt ? 'Empresas parceiras e patrocínios.' : 'Partner companies and sponsorships.',
      icon: <Building className="w-8 h-8 mb-4 text-orange-500" />,
      path: '/admin/parceiros',
      color: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      title: isPt ? 'Artigos do Blog' : 'Blog Articles',
      desc: isPt ? 'Notícias e publicações.' : 'News and publications.',
      icon: <FileText className="w-8 h-8 mb-4 text-teal-500" />,
      path: '/admin/blog',
      color: 'bg-teal-500/10 border-teal-500/20'
    },
    {
      title: isPt ? 'Configuração do Site' : 'Site Configuration',
      desc: isPt ? 'Textos globais, contactos e redes sociais.' : 'Global texts, contacts and social media.',
      icon: <Settings className="w-8 h-8 mb-4 text-slate-500" />,
      path: '/admin/configuracoes',
      color: 'bg-slate-500/10 border-slate-500/20'
    }
  ];

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900 border-none' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}
          >
            {isPt ? 'Painel de Administração (CMS)' : 'Administration Panel (CMS)'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            {isPt 
              ? 'Selecione abaixo o módulo que pretende editar para alterar o conteúdo do site.' 
              : 'Select the module below you wish to edit to change the website content.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={item.path} className="block h-full group">
                <div className={`p-8 rounded-3xl border ${item.color} ${isDark ? 'bg-slate-800' : 'bg-white'} backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-2`}>
                  {item.icon}
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
