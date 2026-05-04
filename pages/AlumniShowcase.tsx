import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, GraduationCap, Award, MessageSquare, ChevronRight, User, Filter, Globe, Linkedin, Mail, X, Calendar, Briefcase, ShieldCheck, FileCheck, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { loadData } from '../lib/dataSync';

interface AlumniProfile {
  id: string;
  name: string;
  course: string;
  year: string;
  comment: string;
  image?: string;
  certificateUrl?: string;
  linkedin?: string;
  email?: string;
  role?: string;
  company?: string;
  bio?: string;
}

const AlumniShowcase: React.FC = () => {
  const { t, lang, isDark } = useAppContext();
  const navigate = useNavigate();
  const isPt = lang === 'pt';
  const [searchTerm, setSearchTerm] = useState('');
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<AlumniProfile[]>([]);
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);

  useEffect(() => {
    const mockAlumni: AlumniProfile[] = [
      {
        id: '1',
        name: 'Ana Paula Santos',
        course: 'Especialista em ISO 27001',
        year: '2023',
        comment: 'A formação na ILUNGI abriu portas incríveis na minha carreira. O conteúdo é extremamente prático e aplicável.',
        role: 'CISO',
        company: 'Tech Solutions Ltd',
        linkedin: 'https://linkedin.com',
        email: 'ana.santos@email.com',
        bio: 'Profissional com mais de 10 anos de experiência em segurança da informação, focada em conformidade e gestão de riscos.',
        certificateUrl: '/imagens/ISO.png' // Simulating a certificate image
      },
      {
        id: '2',
        name: 'Ricardo Oliveira',
        course: 'Gestão de Projectos Estratégicos',
        year: '2022',
        comment: 'Uma experiência transformadora. Os mentores são profissionais de topo com visão global.',
        role: 'Senior Project Manager',
        company: 'Global Infra',
        linkedin: 'https://linkedin.com',
        email: 'ricardo.o@email.com',
        bio: 'Especialista em metodologias ágeis e gestão de grandes infraestruturas críticas.',
        certificateUrl: '/imagens/Lead Auditor ISO 9001.png'
      },
      {
        id: '3',
        name: 'Maria João',
        course: 'GRI - Sustentabilidade Corporativa',
        year: '2024',
        comment: 'O melhor curso de sustentabilidade que já fiz. A certificação internacional foi o diferencial.',
        role: 'Sustainability Officer',
        company: 'Green Future',
        linkedin: 'https://linkedin.com',
        email: 'm.joao@email.com',
        bio: 'Comprometida com o desenvolvimento sustentável e relatórios de impacto social e ambiental.',
        certificateUrl: '/imagens/Lean Six Sigma - Green Belt.png'
      }
    ];

    loadData('alumni_profiles', 'ilungi_alumni_profiles', mockAlumni).then(data => {
      setAlumni(data);
      setFilteredAlumni(data);
    });
  }, []);

  useEffect(() => {
    const results = alumni.filter(a => 
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.role && a.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (a.company && a.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredAlumni(results);
  }, [searchTerm, alumni]);

  const handleContactEmail = (email?: string) => {
    if (email) window.location.href = `mailto:${email}`;
  };

  const handleLinkedin = (url?: string) => {
    if (url && url !== '#') window.open(url, '_blank');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#6a00a3]/5 blur-[120px] rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#6a00a3]/10 border border-[#6a00a3]/20 mb-6">
              <GraduationCap className="w-5 h-5 text-[#6a00a3]" />
              <span className="text-sm font-bold text-[#6a00a3] uppercase tracking-wider">Comunidade AILUNGI</span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.alumni?.showcase?.title || 'Nossos Alumni'}
            </h1>
            <p className={`text-xl mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.alumni?.showcase?.subtitle || 'Conheça os profissionais formados pela ILUNGI que estão transformando o mercado.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className={`py-12 border-y sticky top-20 z-40 backdrop-blur-xl ${isDark ? 'bg-slate-900/80 border-white/5' : 'bg-white/80 border-slate-200'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder={isPt ? 'Pesquise por nome, curso, cargo ou empresa...' : 'Search by name, course, role or company...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all outline-none focus:ring-2 focus:ring-[#6a00a3] ${
                  isDark 
                    ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' 
                    : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {filteredAlumni.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAlumni.map((profile, idx) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl ${
                    isDark 
                      ? 'bg-slate-900 border-white/5 hover:border-[#6a00a3]/50 hover:shadow-purple-900/20' 
                      : 'bg-white border-slate-200 hover:border-[#6a00a3]/30 hover:shadow-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-[#6a00a3]/10 flex items-center justify-center overflow-hidden border border-[#6a00a3]/20 shadow-inner">
                      {profile.image ? (
                        <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-[#6a00a3]" />
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {profile.linkedin && (
                        <button 
                          onClick={() => handleLinkedin(profile.linkedin)}
                          className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                        >
                          <Linkedin className="w-5 h-5" />
                        </button>
                      )}
                      {profile.email && (
                        <button 
                          onClick={() => handleContactEmail(profile.email)}
                          className={`p-2.5 rounded-xl transition-all shadow-sm ${isDark ? 'bg-white/5 text-slate-400 hover:text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          <Mail className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{profile.name}</h3>
                    <p className="text-[#6a00a3] font-bold text-sm uppercase tracking-wider">{profile.role} {profile.company ? `@ ${profile.company}` : ''}</p>
                  </div>

                  <div className={`p-5 rounded-2xl mb-6 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {isPt ? 'Curso Concluído' : 'Completed Course'}
                      </span>
                    </div>
                    <p className={`font-bold text-sm leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{profile.course}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <p className="text-xs text-slate-500">{isPt ? 'Turma de' : 'Class of'} {profile.year}</p>
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <MessageSquare className="absolute -left-1 -top-1 w-8 h-8 text-[#6a00a3]/10" />
                    <p className={`italic relative z-10 leading-relaxed line-clamp-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      "{profile.comment}"
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                    <button 
                      onClick={() => setSelectedAlumni(profile)}
                      className="text-sm font-bold text-[#6a00a3] flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>{isPt ? 'Ver Perfil Completo' : 'View Full Profile'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    {profile.certificateUrl && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[9px] font-black uppercase rounded-full">
                        Verificado
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-xl text-slate-500">{isPt ? 'Nenhum alumni encontrado com os critérios actuais.' : 'No alumni found with current criteria.'}</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 text-[#6a00a3] font-bold hover:underline"
              >
                {isPt ? 'Limpar Pesquisa' : 'Clear Search'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Alumni Detail Modal */}
      <AnimatePresence>
        {selectedAlumni && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAlumni(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} shadow-2xl p-8 md:p-12`}
            >
              <button 
                onClick={() => setSelectedAlumni(null)}
                className="absolute top-8 right-8 p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-8 mb-10 items-center md:items-start text-center md:text-left">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-gradient-to-br from-[#6a00a3] to-teal-400 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-purple-500/20 overflow-hidden">
                  {selectedAlumni.image ? <img src={selectedAlumni.image} className="w-full h-full object-cover" /> : selectedAlumni.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-black mb-2">{selectedAlumni.name}</h2>
                  <p className="text-[#6a00a3] text-xl font-bold mb-4">{selectedAlumni.role} @ {selectedAlumni.company}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-sm">
                      <Award className="w-4 h-4 text-amber-500" /> {selectedAlumni.course}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-sm">
                      <Calendar className="w-4 h-4" /> {selectedAlumni.year}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-wider text-[#6a00a3] mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" /> {isPt ? 'Sobre o Profissional' : 'About the Professional'}
                    </h3>
                    <p className={`leading-relaxed text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {selectedAlumni.bio || selectedAlumni.comment}
                    </p>
                  </div>
                  
                  {/* Certificate Section */}
                  {selectedAlumni.certificateUrl && (
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-wider text-[#6a00a3] mb-4 flex items-center gap-2">
                        <FileCheck className="w-5 h-5" /> {isPt ? 'Certificado de Formação' : 'Training Certificate'}
                      </h3>
                      <div className={`relative group rounded-3xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                        <img 
                          src={selectedAlumni.certificateUrl} 
                          alt="Certificate" 
                          className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <button 
                            onClick={() => window.open(selectedAlumni.certificateUrl, '_blank')}
                            className="px-6 py-3 bg-white text-[#6a00a3] rounded-xl font-bold flex items-center gap-2 shadow-xl"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {isPt ? 'Ver em Tamanho Real' : 'View Full Size'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-black uppercase tracking-wider text-[#6a00a3] mb-4">{isPt ? 'Contactos' : 'Contact'}</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => handleLinkedin(selectedAlumni.linkedin)}
                      className="w-full p-4 rounded-2xl bg-[#0077b5]/10 text-[#0077b5] flex items-center gap-3 font-bold hover:bg-[#0077b5] hover:text-white transition-all group"
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                      <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => handleContactEmail(selectedAlumni.email)}
                      className={`w-full p-4 rounded-2xl flex items-center gap-3 font-bold transition-all group ${isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                    >
                      <Mail className="w-5 h-5" />
                      Email
                      <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className={`p-6 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-purple-50'} border border-purple-500/10`}>
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-green-500" /> {isPt ? 'Certificação Validada' : 'Validated Certification'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {isPt 
                        ? 'Este profissional concluiu com sucesso todos os módulos e requisitos da certificação emitida pela ILUNGI Academy.' 
                        : 'This professional has successfully completed all modules and requirements of the certification issued by ILUNGI Academy.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[3.5rem] p-16 overflow-hidden bg-gradient-to-br from-[#6a00a3] to-[#4a0072] text-white text-center shadow-2xl shadow-purple-900/40">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Globe className="w-full h-full transform scale-150" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-5xl font-black mb-6">
                {isPt ? 'Faça parte desta rede' : 'Join this network'}
              </h2>
              <p className="text-xl text-purple-100 mb-10 leading-relaxed">
                {isPt 
                  ? 'Se já concluiu uma formação na ILUNGI, crie o seu perfil e conecte-se com o mercado.' 
                  : 'If you have completed a training at ILUNGI, create your profile and connect with the market.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/academia/alumni')}
                  className="px-10 py-5 bg-white text-[#6a00a3] rounded-2xl font-black text-lg hover:shadow-2xl transition-all shadow-purple-950/20"
                >
                  {isPt ? 'Criar Perfil / Entrar' : 'Create Profile / Login'}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/academia/registar')}
                  className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-lg hover:bg-white/20 transition-all"
                >
                  {isPt ? 'Registar-se Agora' : 'Register Now'}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlumniShowcase;
