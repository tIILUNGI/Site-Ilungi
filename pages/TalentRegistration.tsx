import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, MapPin, Mail, Phone, Linkedin, FileText, Plus, X, Save, ArrowLeft, ShieldCheck, GraduationCap, Award, Globe, Twitter, Instagram, Paperclip, Upload, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../App';

const TalentRegistration: React.FC = () => {
  const { t, lang, isDark } = useAppContext();
  const navigate = useNavigate();
  const isPt = lang === 'pt';

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    headline: '',
    location: '',
    experience: '',
    availability: 'Remoto',
    bio: '',
    about: '',
    email: '',
    phone: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    website: '',
    education: '',
    skills: [] as string[],
    additionalCourses: [] as string[],
    files: {
      cv: null as File | null,
      certificates: [] as File[]
    }
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [currentCourse, setCurrentCourse] = useState('');

  const handleAddSkill = () => {
    if (currentSkill && !formData.skills.includes(currentSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, currentSkill] });
      setCurrentSkill('');
    }
  };

  const handleAddCourse = () => {
    if (currentCourse && !formData.additionalCourses.includes(currentCourse)) {
      setFormData({ ...formData, additionalCourses: [...formData.additionalCourses, currentCourse] });
      setCurrentCourse('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleRemoveCourse = (course: string) => {
    setFormData({ ...formData, additionalCourses: formData.additionalCourses.filter(c => c !== course) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    alert(isPt ? 'Currículo Digital publicado com sucesso! Suas informações agora estão disponíveis para empresas parceiras.' : 'Digital CV published successfully! Your information is now available to partner companies.');
    navigate('/academia/talent-hub');
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.button 
          onClick={() => navigate('/academia/talent-hub')}
          className="flex items-center gap-2 text-slate-500 hover:text-[#6a00a3] transition-all mb-8 font-bold"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          {isPt ? 'Voltar ao Hub de Talentos' : 'Back to Talent Hub'}
        </motion.button>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4 tracking-tight">{isPt ? 'Criar Currículo Digital' : 'Create Digital CV'}</h1>
          <p className="text-xl text-slate-500 font-medium">Preencha o formulário para se destacar perante o mercado e empresas parceiras.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Section 1: Personal & Professional Identity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-10 rounded-[3rem] border ${isDark ? 'bg-slate-900/50 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}
          >
            <h3 className="text-lg font-black uppercase tracking-[0.2em] text-[#6a00a3] mb-8 flex items-center gap-3">
              <User className="w-6 h-6" /> Identidade Profissional
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Nome Completo</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Cargo Principal</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Auditor de Cibersegurança"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-bold" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Headline Profissional (Curto)</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Especialista ISO 27001 | 8 anos de experiência em TI"
                  value={formData.headline}
                  onChange={(e) => setFormData({...formData, headline: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Localização</label>
                <input 
                  required
                  type="text" 
                  placeholder="Luanda, Angola"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Disponibilidade</label>
                <select 
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-bold appearance-none"
                >
                  <option value="Remoto">Remoto</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Anos de Experiência</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: 10 anos"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Graduação Académica</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Licenciatura em Engenharia Informática"
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-bold" 
                />
              </div>
            </div>
          </motion.div>

          {/* Section 2: Summary & Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-10 rounded-[3rem] border ${isDark ? 'bg-slate-900/50 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}
          >
            <h3 className="text-lg font-black uppercase tracking-[0.2em] text-[#6a00a3] mb-8 flex items-center gap-3">
              <FileText className="w-6 h-6" /> Resumo e Competências
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Sobre (Resumo Profissional)</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.about}
                  onChange={(e) => setFormData({...formData, about: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-medium resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Competências Técnicas</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                      className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" 
                    />
                    <button type="button" onClick={handleAddSkill} className="p-3 bg-[#6a00a3] text-white rounded-xl"><Plus /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#6a00a3]/10 text-[#6a00a3] rounded-lg text-xs font-black flex items-center gap-2">
                        {s} <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemoveSkill(s)} />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Cursos e Certificações Extras</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={currentCourse}
                      onChange={(e) => setCurrentCourse(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCourse())}
                      className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" 
                    />
                    <button type="button" onClick={handleAddCourse} className="p-3 bg-[#6a00a3] text-white rounded-xl"><Plus /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.additionalCourses.map((c, i) => (
                      <span key={i} className="px-3 py-1.5 bg-teal-500/10 text-teal-600 rounded-lg text-xs font-black flex items-center gap-2">
                        {c} <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemoveCourse(c)} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Contacts & Social */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-10 rounded-[3rem] border ${isDark ? 'bg-slate-900/50 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}
          >
            <h3 className="text-lg font-black uppercase tracking-[0.2em] text-[#6a00a3] mb-8 flex items-center gap-3">
              <Globe className="w-6 h-6" /> Contactos e Redes Sociais
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Mail className="w-4 h-4" /> Email Profissional</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Phone className="w-4 h-4" /> Telemóvel</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn (URL)</label>
                <input 
                  type="text" 
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Globe className="w-4 h-4" /> Website / Portefólio</label>
                <input 
                  type="text" 
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#6a00a3] outline-none font-bold" 
                />
              </div>
            </div>
          </motion.div>

          {/* Section 4: Attachments */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-10 rounded-[3rem] border ${isDark ? 'bg-slate-900/50 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}
          >
            <h3 className="text-lg font-black uppercase tracking-[0.2em] text-[#6a00a3] mb-8 flex items-center gap-3">
              <Paperclip className="w-6 h-6" /> Anexar Documentos
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem] text-center hover:border-[#6a00a3] transition-all cursor-pointer bg-slate-50 dark:bg-white/5">
                <Upload className="w-10 h-10 mx-auto text-[#6a00a3] mb-4" />
                <p className="font-bold mb-2">Upload Curriculum Vitae (PDF)</p>
                <p className="text-xs text-slate-500">Arraste seu ficheiro aqui ou clique para selecionar.</p>
              </div>
              <div className="p-8 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem] text-center hover:border-[#6a00a3] transition-all cursor-pointer bg-slate-50 dark:bg-white/5">
                <Award className="w-10 h-10 mx-auto text-[#6a00a3] mb-4" />
                <p className="font-bold mb-2">Certificados e Formações</p>
                <p className="text-xs text-slate-500">Pode anexar múltiplos ficheiros de certificação.</p>
              </div>
            </div>
          </motion.div>

          {/* Submit Action */}
          <div className="flex flex-col items-center gap-6 pt-10">
            <div className="flex items-center gap-3 text-teal-500 font-bold bg-teal-500/10 px-6 py-3 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
              Suas informações serão validadas pela equipa ILUNGI.
            </div>
            
            <button 
              type="submit"
              className="w-full max-w-xl py-6 bg-[#6a00a3] text-white rounded-[2rem] font-black text-xl uppercase tracking-widest hover:bg-[#520b7d] transition-all shadow-2xl shadow-purple-900/30 flex items-center justify-center gap-4 group"
            >
              <CheckCircle2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
              Publicar Meu Currículo Digital
            </button>
            <p className="text-slate-500 text-sm font-medium">Ao publicar, você concorda com os nossos Termos de Privacidade e Uso de Dados.</p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TalentRegistration;
