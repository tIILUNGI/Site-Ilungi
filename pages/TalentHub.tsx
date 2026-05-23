import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Briefcase, Users, Building2, MapPin, FileText, ExternalLink, Globe, X, Mail, Phone, Linkedin, Filter, GraduationCap } from 'lucide-react';
import { useAppContext } from '../App';
import { endpoints } from '../lib/api';

interface TalentProfile {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  availability: string;
  category: string;
  skills: string[];
  about?: string;
  bio?: string;
  education?: string;
  additionalCourses?: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
  website?: string;
}

interface TalentPartner {
  id: string;
  name: string;
  type: string;
  description: string;
  website?: string;
  image?: string;
}

const TalentHub: React.FC = () => {
  const { t, lang, isDark } = useAppContext();
  const navigate = useNavigate();
  const isPt = lang === 'pt';
  const [activeTab, setActiveTab] = useState<'talents' | 'partners'>('talents');
  const [selectedTalent, setSelectedTalent] = useState<TalentProfile | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [talentsData, setTalentsData] = useState<TalentProfile[]>([]);
  const [partnersData, setPartnersData] = useState<TalentPartner[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [talents, partners] = await Promise.all([
          endpoints.talents.getAll().catch(() => []),
          endpoints.partners.getAll().catch(() => [])
        ]);
        setTalentsData(Array.isArray(talents) ? talents : []);
        setPartnersData(Array.isArray(partners) ? partners : []);
      } catch (error) {
        console.error('Failed to fetch Talent Hub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = Object.entries(
    talentsData.reduce((acc: Record<string, number>, talent) => {
      acc[talent.category] = (acc[talent.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, count]) => ({ label, count }));

  const filteredTalents = talentsData.filter((talent) => {
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = talent.location.toLowerCase().includes(locationQuery.toLowerCase());
    const matchesCategory = selectedCategory ? talent.category === selectedCategory : true;
    return matchesSearch && matchesLocation && matchesCategory;
  });

  const hasTalentFilters = Boolean(searchQuery.trim() || locationQuery.trim() || selectedCategory);
  const hasCategories = categories.length > 0;

  const resetFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSelectedCategory(null);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-black mb-6 tracking-tight">
              {t.alumni?.talent?.title || (isPt ? 'Hub de Talentos' : 'Talent Hub')}
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium">
              {t.alumni?.talent?.subtitle || (isPt
                ? 'Conectamos empresas aos melhores profissionais certificados pela ILUNGI.'
                : 'We connect companies with ILUNGI-certified professionals.')}
            </p>

            <button
              onClick={() => navigate('/talent-hub/registar')}
              className="px-10 py-4 bg-[#6a00a3] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-purple-900/40 mb-12"
            >
              {isPt ? 'Criar Meu Curriculo Digital' : 'Create My Digital CV'}
            </button>
          </motion.div>

          <div className="max-w-5xl mx-auto mb-20">
            <div className={`flex flex-col lg:flex-row gap-2 p-2 rounded-3xl border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'} shadow-2xl`}>
              <div className="flex-1 flex items-center px-4 gap-3 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/5">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isPt ? 'Pesquisar por nome ou cargo...' : 'Search by name or role...'}
                  className="w-full py-4 bg-transparent border-none outline-none font-bold"
                />
              </div>

              <div className="flex-1 flex items-center px-4 gap-3 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/5">
                <MapPin className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder={isPt ? 'Localizacao' : 'Location'}
                  className="w-full py-4 bg-transparent border-none outline-none font-bold"
                />
              </div>

              <div className="flex items-center gap-2 p-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  disabled={!hasCategories}
                  className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${showFilters ? 'bg-[#6a00a3] text-white shadow-lg' : 'bg-slate-100 dark:bg-white/5 text-slate-600'} ${!hasCategories ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Filter className="w-4 h-4" />
                  {isPt ? 'Filtros' : 'Filters'}
                </button>
                <button className="px-10 py-3 bg-slate-950 text-white dark:bg-white dark:text-black rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all">
                  {t.alumni?.talent?.searchTalent || (isPt ? 'Procurar Talentos' : 'Search Talent')}
                </button>
              </div>

              <AnimatePresence>
                {showFilters && hasCategories && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 p-6 rounded-2xl border z-50 ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} shadow-2xl`}
                  >
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                      {isPt ? 'Especialidade' : 'Specialty'}
                    </h4>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.label}
                          onClick={() => {
                            setSelectedCategory(selectedCategory === cat.label ? null : cat.label);
                            setShowFilters(false);
                          }}
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
              <button
                onClick={() => setActiveTab('talents')}
                className={`px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'talents' ? 'bg-[#6a00a3] text-white shadow-lg shadow-purple-900/20' : 'text-slate-500'}`}
              >
                {isPt ? 'Talentos' : 'Talents'}
              </button>
              <button
                onClick={() => setActiveTab('partners')}
                className={`px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'partners' ? 'bg-[#6a00a3] text-white shadow-lg shadow-purple-900/20' : 'text-slate-500'}`}
              >
                {isPt ? 'Parceiros' : 'Partners'}
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-[#6a00a3]/20 border-t-[#6a00a3] rounded-full animate-spin mb-4" />
                <p className="text-slate-500 font-bold">{isPt ? 'Carregando talentos...' : 'Loading talents...'}</p>
              </div>
            ) : (
              activeTab === 'talents' ? (
              talentsData.length > 0 ? (
                filteredTalents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTalents.map((talent) => (
                      <motion.div
                        key={talent.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -8 }}
                        className={`flex flex-col rounded-[2.5rem] border overflow-hidden transition-all duration-500 ${isDark ? 'bg-slate-900 border-white/5 hover:border-[#6a00a3]/30' : 'bg-white border-slate-200 hover:shadow-2xl'}`}
                      >
                        <div className="p-8 flex-1">
                          <div className="flex justify-between items-start mb-6">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6a00a3] to-teal-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                              {talent.name.charAt(0)}
                            </div>
                            <div className="px-3 py-1 bg-teal-500/10 text-teal-500 rounded-lg text-[10px] font-black uppercase">
                              {talent.availability}
                            </div>
                          </div>

                          <h3 className="text-xl font-black mb-1 leading-tight">{talent.name}</h3>
                          <p className="text-sm text-[#6a00a3] font-bold mb-4">{talent.role}</p>

                          <div className="flex flex-col gap-2 mb-6">
                            <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {talent.location}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {talent.experience}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-8">
                            {talent.skills.slice(0, 3).map((skill) => (
                              <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[10px] font-black uppercase text-slate-500">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 pt-0 mt-auto">
                          <button
                            onClick={() => setSelectedTalent(talent)}
                            className="w-full py-4 bg-slate-950 text-white dark:bg-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            {isPt ? 'Ver Curriculo' : 'View Resume'}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className={`max-w-3xl mx-auto text-center rounded-[3rem] border px-8 py-16 ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-xl'}`}>
                    <Search className="w-12 h-12 mx-auto mb-6 text-slate-400" />
                    <h3 className="text-2xl font-black mb-3">{isPt ? 'Nenhum talento encontrado' : 'No talent found'}</h3>
                    <p className="text-slate-500 mb-8">{isPt ? 'Ajuste os filtros para encontrar perfis disponiveis.' : 'Adjust the filters to find available profiles.'}</p>
                    {hasTalentFilters && (
                      <button
                        onClick={resetFilters}
                        className="px-8 py-4 bg-[#6a00a3] text-white rounded-2xl font-black text-xs uppercase tracking-widest"
                      >
                        {isPt ? 'Limpar Filtros' : 'Clear Filters'}
                      </button>
                    )}
                  </div>
                )
              ) : (
                <div className={`max-w-3xl mx-auto text-center rounded-[3rem] border px-8 py-16 ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-xl'}`}>
                  <Users className="w-12 h-12 mx-auto mb-6 text-slate-400" />
                  <h3 className="text-2xl font-black mb-8">{isPt ? 'Nenhum talento publicado ainda' : 'No talent published yet'}</h3>
                  <button
                    onClick={() => navigate('/talent-hub/registar')}
                    className="px-8 py-4 bg-[#6a00a3] text-white rounded-2xl font-black text-xs uppercase tracking-widest"
                  >
                    {isPt ? 'Criar Meu Curriculo Digital' : 'Create My Digital CV'}
                  </button>
                </div>
              )
            ) : (
              partnersData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {partnersData.map((partner) => (
                    <div key={partner.id} className={`p-10 rounded-[3rem] border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-xl'}`}>
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 bg-white rounded-2xl p-3 shadow-inner">
                          {partner.image ? <img src={partner.image} className="w-full h-full object-contain" alt={partner.name} /> : <Building2 className="w-full h-full text-slate-400" />}
                        </div>
                        <div>
                          <h4 className="text-2xl font-black">{partner.name}</h4>
                          <p className="text-[#6a00a3] font-bold text-sm uppercase tracking-widest">{partner.type}</p>
                        </div>
                      </div>
                      <p className="text-slate-500 mb-8 text-lg">{partner.description}</p>
                      {partner.website && (
                        <button
                          onClick={() => window.open(partner.website, '_blank')}
                          className="w-full py-4 bg-[#6a00a3] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#520b7d] transition-all flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {isPt ? 'Visitar Website' : 'Visit Website'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`max-w-3xl mx-auto text-center rounded-[3rem] border px-8 py-16 ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-xl'}`}>
                  <Building2 className="w-12 h-12 mx-auto mb-6 text-slate-400" />
                  <h3 className="text-2xl font-black mb-3">{isPt ? 'Nenhum parceiro publicado ainda' : 'No partner published yet'}</h3>
                  <p className="text-slate-500">{isPt ? 'A area de parceiros continua disponivel, mas neste momento nao ha empresas publicas listadas.' : 'The partners area remains available, but there are currently no public companies listed.'}</p>
                </div>
              )
            )
          )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedTalent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTalent(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className={`relative w-full max-w-4xl rounded-[3rem] border ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} shadow-2xl p-8 md:p-12`}
            >
              <button onClick={() => setSelectedTalent(null)} className="absolute top-8 right-8 p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-[#6a00a3] to-teal-400 flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                  {selectedTalent.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-black mb-2">{selectedTalent.name}</h2>
                  <p className="text-[#6a00a3] text-xl font-bold mb-4">{selectedTalent.role}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-medium mb-8">
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedTalent.location}</span>
                    <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {selectedTalent.experience}</span>
                    <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> {selectedTalent.availability}</span>
                  </div>

                  {selectedTalent.about && (
                    <div className="mb-8">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{isPt ? 'Resumo Profissional' : 'Professional Summary'}</h3>
                      <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>{selectedTalent.about}</p>
                    </div>
                  )}

                  {selectedTalent.skills.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{isPt ? 'Competencias' : 'Skills'}</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTalent.skills.map((skill) => (
                          <span key={skill} className="px-3 py-2 rounded-xl bg-[#6a00a3]/10 text-[#6a00a3] text-xs font-black uppercase tracking-widest">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTalent.email && (
                      <button onClick={() => window.location.href = `mailto:${selectedTalent.email}`} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                        <Mail className="w-5 h-5 text-[#6a00a3]" />
                        <span className="font-bold">{selectedTalent.email}</span>
                      </button>
                    )}
                    {selectedTalent.phone && (
                      <button onClick={() => window.location.href = `tel:${selectedTalent.phone}`} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                        <Phone className="w-5 h-5 text-[#6a00a3]" />
                        <span className="font-bold">{selectedTalent.phone}</span>
                      </button>
                    )}
                    {selectedTalent.linkedin && (
                      <button onClick={() => window.open(selectedTalent.linkedin, '_blank')} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                        <Linkedin className="w-5 h-5 text-[#0a66c2]" />
                        <span className="font-bold">LinkedIn</span>
                      </button>
                    )}
                    {selectedTalent.website && (
                      <button onClick={() => window.open(selectedTalent.website, '_blank')} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                        <ExternalLink className="w-5 h-5 text-slate-500" />
                        <span className="font-bold">{isPt ? 'Website' : 'Website'}</span>
                      </button>
                    )}
                  </div>

                  {selectedTalent.education && (
                    <div className="mt-8 p-6 rounded-3xl bg-slate-50 dark:bg-white/5">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#6a00a3]" />
                        {isPt ? 'Formacao' : 'Education'}
                      </h3>
                      <p className="font-bold">{selectedTalent.education}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TalentHub;
