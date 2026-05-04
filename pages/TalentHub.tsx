import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Briefcase, Users, Building2, MapPin, Star, ChevronRight, FileText, Download, MessageCircle, ExternalLink, Globe, ShieldCheck, GraduationCap, X, Mail, Phone, Linkedin, Calendar, Award, Filter, ArrowUpRight, MoreHorizontal, UserPlus, Send, ChevronDown, CheckCircle2, Facebook, Twitter, Instagram, Paperclip, FileCheck } from 'lucide-react';
import { useAppContext } from '../App';

const TalentHub: React.FC = () => {
  const { t, lang, isDark } = useAppContext();
  const navigate = useNavigate();
  const isPt = lang === 'pt';
  const [activeTab, setActiveTab] = useState<'talents' | 'partners'>('talents');
  const [selectedTalent, setSelectedTalent] = useState<any | null>(null);
  const [showContact, setShowContact] = useState<any | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Expanded mock data for talents
  const talentsData = [
    {
      id: 1,
      name: "Ricardo Manuel Mendes",
      role: "Especialista em Cibersegurança",
      headline: "ISO 27001 Lead Auditor | Cybersecurity Expert",
      location: "Luanda, Angola",
      experience: "8 anos",
      skills: ["ISO 27001", "Pentesting", "GDPR", "Firewalls", "SIEM"],
      category: "Cibersegurança",
      rating: 4.9,
      verified: true,
      email: "ricardo.mendes@email.com",
      phone: "+244 923 000 000",
      linkedin: "https://linkedin.com/in/ricardo",
      twitter: "https://twitter.com/ricardo",
      website: "https://ricardomendes.com",
      bio: "Profissional dedicado com vasta experiência em auditoria de segurança e implementação de normas ISO.",
      education: "Mestrado em Engenharia Informática - UAN",
      additionalCourses: ["Certified Ethical Hacker (CEH)", "CISM", "CompTIA Security+"],
      connections: "500+",
      about: "Especialista focado em proteger infraestruturas críticas e garantir a conformidade normativa.",
      availability: "Remoto", // Remoto, Presencial, Híbrido
      attachments: [
        { name: "Curriculum Vitae.pdf", type: "cv", url: "#" },
        { name: "Certificado ISO 27001.png", type: "cert", url: "#" }
      ]
    },
    {
      id: 2,
      name: "Ana Paula Silva",
      role: "Gestora de Projectos PMO",
      headline: "PMP Certified | Transformação Digital",
      location: "Lisboa, Portugal",
      experience: "5 anos",
      skills: ["PMP", "Agile", "Scrum", "Risk Management"],
      category: "Gestão de Projectos",
      rating: 4.8,
      verified: true,
      email: "ana.paula@email.com",
      phone: "+351 912 000 000",
      linkedin: "https://linkedin.com/in/ana",
      bio: "Especialista em liderança de equipas multidisciplinares e gestão de portfolios complexos.",
      education: "MBA em Gestão de Projectos - ISCTE",
      additionalCourses: ["Scrum Master Certified", "Prince2 Foundation"],
      connections: "320+",
      about: "Líder orientada a resultados com histórico comprovado na entrega de projetos tecnológicos.",
      availability: "Híbrido",
      attachments: [
        { name: "Ana_Silva_CV.pdf", type: "cv", url: "#" }
      ]
    },
    {
      id: 3,
      name: "João Carlos Cabral",
      role: "Auditor de Qualidade ISO 9001",
      headline: "Qualidade Industrial | Lean Six Sigma",
      location: "Benguela, Angola",
      experience: "10 anos",
      skills: ["ISO 9001", "Lean", "Process Mapping", "Auditoria de Qualidade"],
      category: "Qualidade & ISO",
      rating: 4.7,
      verified: true,
      email: "j.cabral@email.com",
      phone: "+244 911 000 000",
      linkedin: "https://linkedin.com/in/joao",
      bio: "Especialista em sistemas de gestão da qualidade com foco em melhoria contínua.",
      education: "Engenharia de Produção - UKB",
      additionalCourses: ["Lean Six Sigma Green Belt", "Total Quality Management"],
      connections: "450+",
      about: "Profissional experiente em implementação de sistemas de gestão em grandes indústrias.",
      availability: "Presencial",
      attachments: [
        { name: "Certificação Lean.pdf", type: "cert", url: "#" }
      ]
    }
  ];

  const partnersData = [
    {
      id: 1,
      name: "Standard Bank Angola",
      type: "Instituição Financeira",
      location: "Luanda",
      needs: ["Cibersegurança", "Auditores ISO"],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Standard_Bank_logo.svg/1200px-Standard_Bank_logo.svg.png",
      description: "Buscamos constantemente talentos certificados para fortalecer nossa infraestrutura.",
      website: "https://www.standardbank.co.ao"
    },
    {
      id: 2,
      name: "Unitel Money",
      type: "Fintech",
      location: "Luanda",
      needs: ["Desenvolvedores", "Project Managers"],
      image: "https://unitelmoney.ao/wp-content/uploads/2021/08/Logo-Unitel-Money.png",
      description: "Parceiro estratégico da ILUNGI na busca por inovação.",
      website: "https://unitelmoney.ao"
    }
  ];

  const categories = [
    { label: "Cibersegurança", count: 42 },
    { label: "Gestão de Projectos", count: 28 },
    { label: "Qualidade & ISO", count: 35 },
    { label: "Compliance", count: 19 }
  ];

  const filteredTalents = talentsData.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         talent.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = talent.location.toLowerCase().includes(locationQuery.toLowerCase());
    const matchesCategory = selectedCategory ? talent.category === selectedCategory : true;
    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-black mb-6 tracking-tight">
              Professional Talent Hub
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium">
              A plataforma definitiva para encontrar e contratar talentos certificados com currículos digitais verificados.
            </p>
            
            <button 
              onClick={() => navigate('/talent-hub/registar')}
              className="px-10 py-4 bg-[#6a00a3] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-purple-900/40 mb-12"
            >
              {isPt ? 'Criar Meu Currículo Digital' : 'Create My Digital CV'}
            </button>
          </motion.div>

          {/* Integrated Search with Location and Filter */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className={`flex flex-col lg:flex-row gap-2 p-2 rounded-3xl border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'} shadow-2xl`}>
              <div className="flex-1 flex items-center px-4 gap-3 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/5">
                <Search className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar por nome ou cargo..."
                  className="w-full py-4 bg-transparent border-none outline-none font-bold"
                />
              </div>
              
              <div className="flex-1 flex items-center px-4 gap-3 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/5">
                <MapPin className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Localização (Luanda, Lisboa...)"
                  className="w-full py-4 bg-transparent border-none outline-none font-bold"
                />
              </div>

              <div className="flex items-center gap-2 p-2">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${showFilters ? 'bg-[#6a00a3] text-white shadow-lg' : 'bg-slate-100 dark:bg-white/5 text-slate-600'}`}
                >
                  <Filter className="w-4 h-4" />
                  {isPt ? 'Filtros' : 'Filters'}
                </button>
                <button className="px-10 py-3 bg-slate-950 text-white dark:bg-white dark:text-black rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all">
                  {isPt ? 'Pesquisar' : 'Search'}
                </button>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 p-6 rounded-2xl border z-50 ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} shadow-2xl`}
                  >
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Especialidade</h4>
                    <div className="space-y-2">
                      {categories.map((cat, i) => (
                        <button 
                          key={i}
                          onClick={() => {setSelectedCategory(selectedCategory === cat.label ? null : cat.label); setShowFilters(false);}}
                          className={`w-full text-left px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat.label ? 'bg-[#6a00a3]/10 text-[#6a00a3]' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500'}`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center mb-16">
            <div className={`p-1.5 rounded-2xl flex gap-2 border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
              <button onClick={() => setActiveTab('talents')} className={`px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'talents' ? 'bg-[#6a00a3] text-white shadow-lg shadow-purple-900/20' : 'text-slate-500'}`}>Talentos</button>
              <button onClick={() => setActiveTab('partners')} className={`px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'partners' ? 'bg-[#6a00a3] text-white shadow-lg shadow-purple-900/20' : 'text-slate-500'}`}>Parceiros</button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            {activeTab === 'talents' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTalents.map((talent) => (
                  <motion.div 
                    key={talent.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8 }}
                    className={`flex flex-col rounded-[2.5rem] border overflow-hidden transition-all duration-500 ${isDark ? 'bg-slate-900 border-white/5 hover:border-[#6a00a3]/30' : 'bg-white border-slate-200 hover:shadow-2xl'}`}
                  >
                    <div className="p-8 flex-1">
                      <div className="flex justify-between items-start mb-6">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6a00a3] to-teal-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {talent.name.charAt(0)}
                          </div>
                          {talent.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white p-1.5 rounded-lg shadow-lg">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="px-3 py-1 bg-teal-500/10 text-teal-500 rounded-lg text-[10px] font-black uppercase">
                          {talent.availability}
                        </div>
                      </div>

                      <h3 className="text-xl font-black mb-1 leading-tight">{talent.name}</h3>
                      <p className="text-sm text-[#6a00a3] font-bold mb-4">{talent.role}</p>
                      
                      <div className="flex flex-col gap-2 mb-6">
                        <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {talent.location}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {talent.experience} exp.</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {talent.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[10px] font-black uppercase text-slate-500">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-auto flex gap-3">
                      <button 
                        onClick={() => setSelectedTalent(talent)}
                        className="flex-1 py-4 bg-slate-950 text-white dark:bg-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Ver Currículo
                      </button>
                      <button 
                        onClick={() => setShowContact(talent)}
                        className="p-4 border-2 border-slate-100 dark:border-white/5 rounded-2xl hover:bg-[#6a00a3] hover:text-white transition-all group"
                      >
                        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {partnersData.map((partner) => (
                  <div key={partner.id} className={`p-10 rounded-[3rem] border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-xl'}`}>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 bg-white rounded-2xl p-3 shadow-inner"><img src={partner.image} className="w-full h-full object-contain" /></div>
                      <div>
                        <h4 className="text-2xl font-black">{partner.name}</h4>
                        <p className="text-[#6a00a3] font-bold text-sm uppercase tracking-widest">{partner.type}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 mb-8 text-lg">{partner.description}</p>
                    <button 
                      onClick={() => window.open(partner.website, '_blank')}
                      className="w-full py-4 bg-[#6a00a3] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#520b7d] transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visitar Website
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CV Modal - ENHANCED WITH ALL REQUESTED INFO */}
      <AnimatePresence>
        {selectedTalent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTalent(null)} className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 50 }} 
              className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] border ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} shadow-2xl p-8 md:p-16`}
            >
              <button onClick={() => setSelectedTalent(null)} className="absolute top-8 right-8 p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all"><X className="w-8 h-8" /></button>
              
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row gap-12 mb-16 items-center md:items-start text-center md:text-left">
                <div className="relative">
                  <div className="w-44 h-44 rounded-[3rem] bg-gradient-to-br from-[#6a00a3] to-teal-400 flex items-center justify-center text-white text-6xl font-black shadow-2xl">
                    {selectedTalent.name.charAt(0)}
                  </div>
                  {selectedTalent.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-teal-500 text-white p-3 rounded-2xl border-8 border-white dark:border-slate-900 shadow-xl">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-5xl font-black mb-3">{selectedTalent.name}</h2>
                  <p className="text-2xl text-[#6a00a3] font-bold mb-6">{selectedTalent.role}</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-6">
                    <div className="flex items-center gap-2 text-slate-500 font-bold"><MapPin className="w-5 h-5" /> {selectedTalent.location}</div>
                    <div className="flex items-center gap-2 text-slate-500 font-bold"><Briefcase className="w-5 h-5" /> {selectedTalent.experience} de Experiência</div>
                    <div className="flex items-center gap-2 text-teal-500 font-black uppercase tracking-widest"><Globe className="w-5 h-5" /> {selectedTalent.availability}</div>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Left Column: About & Education */}
                <div className="lg:col-span-7 space-y-12">
                  <section>
                    <h3 className="text-lg font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                      <FileText className="w-6 h-6 text-[#6a00a3]" /> Resumo Profissional
                    </h3>
                    <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                      {selectedTalent.about}
                    </p>
                    <p className="mt-6 text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                      {selectedTalent.bio}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-[#6a00a3]" /> Formação e Cursos
                    </h3>
                    <div className="space-y-6">
                      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                        <p className="font-black text-xl mb-1">{selectedTalent.education}</p>
                        <p className="text-sm text-[#6a00a3] font-bold uppercase tracking-widest">Graduação Principal</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedTalent.additionalCourses.map((course: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-white/5">
                            <Award className="w-5 h-5 text-amber-500" />
                            <span className="font-bold text-sm">{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Documents Section */}
                  <section>
                    <h3 className="text-lg font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                      <Paperclip className="w-6 h-6 text-[#6a00a3]" /> Documentos Anexos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedTalent.attachments.map((doc: any, i: number) => (
                        <button key={i} className="flex items-center justify-between p-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-[#6a00a3] transition-all group">
                          <div className="flex items-center gap-3">
                            <FileCheck className="w-6 h-6 text-[#6a00a3]" />
                            <div className="text-left">
                              <p className="font-bold text-sm">{doc.name}</p>
                              <p className="text-[10px] text-slate-400 uppercase font-black">{doc.type === 'cv' ? 'Currículo Vitae' : 'Certificado'}</p>
                            </div>
                          </div>
                          <Download className="w-5 h-5 text-slate-300 group-hover:text-[#6a00a3] transition-colors" />
                        </button>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right Column: Skills & Contacts */}
                <div className="lg:col-span-5 space-y-12">
                  <section>
                    <h3 className="text-lg font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#6a00a3]" /> Competências Profissionais
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedTalent.skills.map((skill: string, i: number) => (
                        <div key={i} className="px-5 py-2.5 rounded-2xl bg-[#6a00a3]/10 border border-[#6a00a3]/20 text-[#6a00a3] font-black text-xs uppercase tracking-widest">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                      <Send className="w-6 h-6 text-[#6a00a3]" /> Contactos e Redes
                    </h3>
                    <div className="space-y-4">
                      <button onClick={() => window.location.href = `mailto:${selectedTalent.email}`} className="w-full flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                        <Mail className="w-6 h-6 text-[#6a00a3]" />
                        <div className="text-left">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Email</p>
                          <p className="font-bold">{selectedTalent.email}</p>
                        </div>
                      </button>
                      <button onClick={() => window.location.href = `tel:${selectedTalent.phone}`} className="w-full flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                        <Phone className="w-6 h-6 text-[#6a00a3]" />
                        <div className="text-left">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Telefone</p>
                          <p className="font-bold">{selectedTalent.phone}</p>
                        </div>
                      </button>
                      <div className="flex gap-4">
                        {selectedTalent.linkedin && (
                          <button onClick={() => window.open(selectedTalent.linkedin, '_blank')} className="flex-1 flex items-center justify-center p-5 rounded-2xl bg-[#0a66c2]/10 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white transition-all">
                            <Linkedin className="w-6 h-6" />
                          </button>
                        )}
                        {selectedTalent.twitter && (
                          <button onClick={() => window.open(selectedTalent.twitter, '_blank')} className="flex-1 flex items-center justify-center p-5 rounded-2xl bg-[#1da1f2]/10 text-[#1da1f2] hover:bg-[#1da1f2] hover:text-white transition-all">
                            <Twitter className="w-6 h-6" />
                          </button>
                        )}
                        {selectedTalent.website && (
                          <button onClick={() => window.open(selectedTalent.website, '_blank')} className="flex-1 flex items-center justify-center p-5 rounded-2xl bg-slate-500/10 text-slate-500 hover:bg-slate-500 hover:text-white transition-all">
                            <Globe className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                    </div>
                  </section>

                  <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#6a00a3] to-[#4a0072] text-white">
                    <p className="text-lg font-bold mb-2">Interessado neste perfil?</p>
                    <p className="text-white/70 text-sm mb-8 leading-relaxed">Este profissional tem as competências validadas pela ILUNGI. Pode entrar em contacto directo ou solicitar uma entrevista mediada.</p>
                    <button className="w-full py-4 bg-white text-[#6a00a3] rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">
                      Solicitar Entrevista
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Modal (Legacy) */}
      <AnimatePresence>
        {showContact && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowContact(null)} className="absolute inset-0 bg-slate-950/80" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`relative w-full max-w-md rounded-[2.5rem] border ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} shadow-2xl p-10 text-center`}>
              <div className="w-20 h-20 bg-[#6a00a3]/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6"><MessageCircle className="w-10 h-10 text-[#6a00a3]" /></div>
              <h3 className="text-2xl font-black mb-8">Informações Directas</h3>
              <div className="space-y-4 text-left">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Email</p>
                  <p className="font-bold">{showContact.email}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Telefone</p>
                  <p className="font-bold">{showContact.phone}</p>
                </div>
              </div>
              <button onClick={() => setShowContact(null)} className="mt-8 text-xs font-black text-slate-400 uppercase hover:text-[#6a00a3]">Fechar</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TalentHub;
