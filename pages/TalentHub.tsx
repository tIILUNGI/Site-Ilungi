import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Briefcase, Users, Building2, MapPin, Star, ChevronRight, FileText, Download, MessageCircle, ExternalLink, Globe, ShieldCheck, GraduationCap, X, Mail, Phone, Linkedin, Calendar, Award, Filter, ArrowUpRight } from 'lucide-react';
import { useAppContext } from '../App';

const TalentHub: React.FC = () => {
  const { t, lang, isDark } = useAppContext();
  const navigate = useNavigate();
  const isPt = lang === 'pt';
  const [activeTab, setActiveTab] = useState<'talents' | 'partners'>('talents');
  const [selectedTalent, setSelectedTalent] = useState<any | null>(null);
  const [showContact, setShowContact] = useState<any | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data for talents
  const talentsData = [
    {
      id: 1,
      name: "Ricardo Mendes",
      role: "Especialista em Cibersegurança",
      location: "Luanda, AO",
      experience: "8 anos",
      skills: ["ISO 27001", "Pentesting", "GDPR", "Network Security"],
      category: "Cibersegurança",
      rating: 4.9,
      verified: true,
      email: "ricardo.mendes@email.com",
      phone: "+244 923 000 000",
      linkedin: "https://linkedin.com",
      bio: "Profissional dedicado com vasta experiência em auditoria de segurança e implementação de normas ISO. Palestrante e entusiasta de novas tecnologias de proteção de dados.",
      education: "Mestrado em Engenharia Informática - UAN"
    },
    {
      id: 2,
      name: "Ana Paula Silva",
      role: "Gestora de Projectos PMO",
      location: "Lisboa, PT",
      experience: "5 anos",
      skills: ["PMP", "Agile", "Risk Management", "Scrum"],
      category: "Gestão de Projectos",
      rating: 4.8,
      verified: true,
      email: "ana.paula@email.com",
      phone: "+351 912 000 000",
      linkedin: "https://linkedin.com",
      bio: "Especialista em liderança de equipas multidisciplinares e gestão de portfolios complexos. Focada em resultados e otimização de processos corporativos.",
      education: "Certificação PMP, MBA em Gestão de Projectos"
    },
    {
      id: 3,
      name: "João Cabral",
      role: "Auditor de Qualidade ISO 9001",
      location: "Benguela, AO",
      experience: "10 anos",
      skills: ["ISO 9001", "Qualidade", "Auditoria Interna"],
      category: "Qualidade & ISO",
      rating: 4.7,
      verified: true,
      email: "j.cabral@email.com",
      phone: "+244 911 000 000",
      linkedin: "https://linkedin.com",
      bio: "Especialista em sistemas de gestão da qualidade com foco em melhoria contínua e eficiência operacional.",
      education: "Engenharia de Produção"
    }
  ];

  // Mock data for partners
  const partnersData = [
    {
      id: 1,
      name: "Standard Bank Angola",
      type: "Instituição Financeira",
      location: "Luanda",
      needs: ["Cibersegurança", "Auditores ISO"],
      image: "/imagens/partner1.png",
      description: "Buscamos constantemente talentos certificados para fortalecer nossa infraestrutura de segurança e conformidade."
    },
    {
      id: 2,
      name: "Unitel Money",
      type: "Fintech",
      location: "Luanda",
      needs: ["Desenvolvedores", "Project Managers"],
      image: "/imagens/partner2.png",
      description: "Parceiro estratégico da ILUNGI na busca por inovação e excelência em gestão de projectos tecnológicos."
    }
  ];

  const categories = [
    { label: "Cibersegurança", count: 42 },
    { label: "Gestão de Projectos", count: 28 },
    { label: "Qualidade & ISO", count: 35 },
    { label: "Compliance", count: 19 }
  ];

  // Filtering logic
  const filteredTalents = talentsData.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         talent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         talent.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = talent.location.toLowerCase().includes(locationQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? talent.category === selectedCategory : true;

    return matchesSearch && matchesLocation && matchesCategory;
  });

  const handleContactAction = (type: string, value: string) => {
    if (type === 'email') window.location.href = `mailto:${value}`;
    if (type === 'linkedin') window.open(value, '_blank');
    if (type === 'phone') window.location.href = `tel:${value}`;
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6a00a3]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#6a00a3]/10 text-[#6a00a3] text-sm font-bold uppercase tracking-wider mb-6 border border-[#6a00a3]/20">
              Talent & Networking Hub
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#6a00a3] to-teal-400 bg-clip-text text-transparent">
              {t.alumni.talent.title}
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-12">
              {isPt ? "Conectamos empresas aos melhores profissionais do mercado" : "Connecting companies with the best professionals in the market"}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigate('/talent-hub/registar')}
                className="px-8 py-4 bg-[#6a00a3] text-white rounded-2xl font-bold hover:bg-[#520b7d] transition-all flex items-center gap-2 shadow-xl shadow-purple-900/20"
              >
                <FileText className="w-5 h-5" />
                {isPt ? 'Cadastrar-se como Talento' : 'Register as Talent'}
              </button>
              <button 
                onClick={() => navigate('/contacto')}
                className={`px-8 py-4 rounded-2xl font-bold border transition-all flex items-center gap-2 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
              >
                <Building2 className="w-5 h-5" />
                {isPt ? 'Tornar-se Parceiro' : 'Become a Partner'}
              </button>
            </div>
          </motion.div>

          {/* Search Bar */}
          <div className={`max-w-4xl mx-auto p-2 rounded-3xl border ${isDark ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200'} shadow-2xl backdrop-blur-xl mb-20`}>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 w-full relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isPt ? "Pesquisar por cargo ou habilidade..." : "Search by role or skill..."}
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none font-medium"
                />
              </div>
              <div className="h-8 w-px bg-slate-200 hidden md:block" />
              <div className="flex-1 w-full relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder={isPt ? "Localização..." : "Location..."}
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none font-medium"
                />
              </div>
              <button 
                className="w-full md:w-auto px-10 py-4 bg-[#6a00a3] text-white rounded-2xl font-bold hover:bg-[#520b7d] transition-all"
              >
                {isPt ? 'Pesquisar' : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-12">
            <div className={`p-1.5 rounded-2xl border ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} flex gap-2`}>
              <button 
                onClick={() => setActiveTab('talents')}
                className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'talents' ? 'bg-[#6a00a3] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}
              >
                <Users className="w-5 h-5" />
                {isPt ? 'Talentos' : 'Talents'}
              </button>
              <button 
                onClick={() => setActiveTab('partners')}
                className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'partners' ? 'bg-[#6a00a3] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}
              >
                <Building2 className="w-5 h-5" />
                {isPt ? 'Parceiros' : 'Partners'}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'talents' ? (
              <motion.div 
                key="talents-grid"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Sidebar Filters */}
                <div className="lg:col-span-1 space-y-6">
                  <div className={`p-8 rounded-[2rem] border ${isDark ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Filter className="w-5 h-5 text-[#6a00a3]" />
                      {isPt ? 'Filtros de Área' : 'Area Filters'}
                    </h3>
                    
                    {/* Categories */}
                    <div className="space-y-4">
                      {categories.map((cat, i) => (
                        <label 
                          key={i} 
                          className="flex items-center justify-between group cursor-pointer"
                          onClick={() => setSelectedCategory(selectedCategory === cat.label ? null : cat.label)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${selectedCategory === cat.label ? 'bg-[#6a00a3] border-[#6a00a3]' : 'border-slate-300 group-hover:border-[#6a00a3]'}`}>
                              {selectedCategory === cat.label && <X className="w-3 h-3 text-white" />}
                            </div>
                            <span className={`font-medium transition-all ${selectedCategory === cat.label ? 'text-[#6a00a3]' : 'text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{cat.label}</span>
                          </div>
                          <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-md text-slate-400">{cat.count}</span>
                        </label>
                      ))}
                    </div>

                    <div className="h-px bg-slate-200 dark:bg-white/5 my-8" />

                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setLocationQuery('');
                        setSelectedCategory(null);
                      }}
                      className="w-full py-4 border-2 border-[#6a00a3] text-[#6a00a3] rounded-2xl font-bold hover:bg-[#6a00a3] hover:text-white transition-all"
                    >
                      {isPt ? 'Limpar Filtros' : 'Clear Filters'}
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-2 space-y-6">
                  {filteredTalents.length > 0 ? (
                    filteredTalents.map((talent) => (
                      <motion.div 
                        key={talent.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -4 }}
                        className={`p-8 rounded-[2.5rem] border transition-all group ${isDark ? 'bg-slate-900/50 border-white/10 hover:border-[#6a00a3]/50' : 'bg-white border-slate-200 hover:border-[#6a00a3]/20 shadow-lg'}`}
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#6a00a3] to-teal-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-purple-500/20">
                            {talent.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                              <div>
                                <h4 className="text-2xl font-bold flex items-center gap-2">
                                  {talent.name}
                                  {talent.verified && <ShieldCheck className="w-5 h-5 text-teal-400" />}
                                </h4>
                                <p className="text-[#6a00a3] font-bold">{talent.role}</p>
                              </div>
                              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm font-black">
                                <Star className="w-4 h-4 fill-yellow-500" />
                                {talent.rating}
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6 font-medium">
                              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {talent.location}</span>
                              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {talent.experience}</span>
                              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> {isPt ? 'Disponível Remoto' : 'Remote Available'}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                              {talent.skills.map((skill: string, i: number) => (
                                <span key={i} className={`px-4 py-1.5 rounded-xl text-xs font-bold ${isDark ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                                  {skill}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-4">
                              <button 
                                onClick={() => setShowContact(talent)}
                                className="px-8 py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d] transition-all flex items-center gap-2 shadow-lg shadow-purple-900/20"
                              >
                                <MessageCircle className="w-4 h-4" />
                                {isPt ? 'Entrar em Contacto' : 'Get in Touch'}
                              </button>
                              <button 
                                onClick={() => setSelectedTalent(talent)}
                                className={`px-8 py-3 rounded-xl font-bold border transition-all flex items-center gap-2 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                              >
                                <FileText className="w-4 h-4" />
                                {isPt ? 'Ver CV Digital' : 'View Digital CV'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                      <p className="text-xl text-slate-500">{isPt ? 'Nenhum talento encontrado com os filtros actuais.' : 'No talent found with current filters.'}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="partners-grid"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {partnersData.map((partner) => (
                  <div 
                    key={partner.id}
                    className={`p-10 rounded-[3rem] border transition-all hover:shadow-2xl ${isDark ? 'bg-slate-900 border-white/5 hover:border-[#6a00a3]/30' : 'bg-white border-slate-200 hover:shadow-slate-200'}`}
                  >
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-3 shadow-inner">
                        <img src={partner.image} alt={partner.name} className="w-full h-auto object-contain" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{partner.name}</h3>
                        <p className="text-[#6a00a3] font-bold">{partner.type}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 mb-8 leading-relaxed text-lg">
                      {partner.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {partner.needs.map((need, i) => (
                        <span key={i} className="px-3 py-1 bg-teal-500/10 text-teal-500 rounded-full text-xs font-black uppercase">
                          {need}
                        </span>
                      ))}
                    </div>
                    <button className="w-full py-4 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white rounded-2xl font-bold hover:bg-[#6a00a3] hover:text-white transition-all flex items-center justify-center gap-2">
                      {isPt ? 'Visitar Website' : 'Visit Website'}
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CV Modal */}
      <AnimatePresence>
        {selectedTalent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTalent(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} shadow-2xl p-8 md:p-12`}
            >
              <button 
                onClick={() => setSelectedTalent(null)}
                className="absolute top-8 right-8 p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-10 mb-10">
                <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-br from-[#6a00a3] to-teal-400 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-purple-500/20">
                  {selectedTalent.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-black mb-2">{selectedTalent.name}</h2>
                  <p className="text-[#6a00a3] text-xl font-bold mb-4">{selectedTalent.role}</p>
                  <div className="flex flex-wrap gap-4 text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><MapPin className="w-5 h-5" /> {selectedTalent.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-5 h-5" /> {selectedTalent.experience}</span>
                    <span className="flex items-center gap-1.5 text-teal-500"><ShieldCheck className="w-5 h-5" /> {isPt ? 'Perfil Verificado' : 'Verified Profile'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" /> {isPt ? 'Resumo Profissional' : 'Professional Summary'}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-lg">
                      {selectedTalent.bio}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" /> {isPt ? 'Formação Académica' : 'Education'}
                    </h3>
                    <p className="text-slate-500 font-bold">{selectedTalent.education}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" /> {isPt ? 'Competências' : 'Skills'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTalent.skills.map((skill: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-[#6a00a3]/10 text-[#6a00a3] rounded-xl text-sm font-bold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`p-6 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-slate-50'} border border-[#6a00a3]/10`}>
                    <p className="text-sm font-bold text-[#6a00a3] mb-2">{isPt ? 'Interessado neste perfil?' : 'Interested in this profile?'}</p>
                    <button 
                      onClick={() => {
                        setSelectedTalent(null);
                        setShowContact(selectedTalent);
                      }}
                      className="w-full py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d] transition-all"
                    >
                      {isPt ? 'Obter Contactos' : 'Get Contact Info'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContact(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`relative w-full max-w-md rounded-[2.5rem] border ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} shadow-2xl p-8`}
            >
              <button 
                onClick={() => setShowContact(null)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#6a00a3]/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-[#6a00a3]" />
                </div>
                <h3 className="text-2xl font-black">{isPt ? 'Dados de Contacto' : 'Contact Details'}</h3>
                <p className="text-slate-500">{isPt ? 'Entre em contacto com' : 'Get in touch with'} {showContact.name}</p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => handleContactAction('email', showContact.email)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-50 hover:bg-slate-100'}`}
                >
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email</p>
                    <p className="font-bold">{showContact.email}</p>
                  </div>
                </button>
                <button 
                  onClick={() => handleContactAction('phone', showContact.phone)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-50 hover:bg-slate-100'}`}
                >
                  <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{isPt ? 'Telefone' : 'Phone'}</p>
                    <p className="font-bold">{showContact.phone}</p>
                  </div>
                </button>
                <button 
                  onClick={() => handleContactAction('linkedin', showContact.linkedin)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-50 hover:bg-slate-100'}`}
                >
                  <div className="p-2 bg-[#0077b5]/20 text-[#0077b5] rounded-lg">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">LinkedIn</p>
                    <p className="font-bold">{showContact.linkedin.split('/').pop()}</p>
                  </div>
                </button>
              </div>

              <button 
                onClick={() => setShowContact(null)}
                className="w-full mt-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all"
              >
                {isPt ? 'Fechar' : 'Close'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TalentHub;
