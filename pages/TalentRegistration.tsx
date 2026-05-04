import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, MapPin, Mail, Phone, Linkedin, FileText, Plus, X, Save, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../App';

const TalentRegistration: React.FC = () => {
  const { t, lang, isDark } = useAppContext();
  const navigate = useNavigate();
  const isPt = lang === 'pt';

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    location: '',
    experience: '',
    bio: '',
    email: '',
    phone: '',
    linkedin: '',
    skills: [] as string[],
    education: ''
  });

  const [currentSkill, setCurrentSkill] = useState('');

  const handleAddSkill = () => {
    if (currentSkill && !formData.skills.includes(currentSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, currentSkill] });
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save to a database
    // For now, we'll simulate success and go back to the hub
    alert(isPt ? 'Perfil profissional criado com sucesso! Agora está visível no Hub de Talentos.' : 'Professional profile created successfully! You are now visible on the Talent Hub.');
    navigate('/academia/talent-hub');
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.button 
          onClick={() => navigate('/academia/talent-hub')}
          className="flex items-center gap-2 text-slate-500 hover:text-[#6a00a3] transition-all mb-8 font-bold"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          {isPt ? 'Voltar para o Hub' : 'Back to Hub'}
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-10 rounded-[2.5rem] border ${isDark ? 'bg-slate-900/50 border-white/10 shadow-2xl shadow-purple-950/20' : 'bg-white border-slate-200 shadow-xl'}`}
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 bg-[#6a00a3] rounded-3xl text-white">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black">{isPt ? 'Criar Currículo Digital' : 'Create Digital CV'}</h1>
              <p className="text-slate-500">{isPt ? 'Preencha suas informações profissionais para o mercado.' : 'Fill in your professional information for the market.'}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 flex items-center gap-2"><User className="w-4 h-4" /> {isPt ? 'Nome Completo' : 'Full Name'}</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6a00a3] outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 flex items-center gap-2"><Briefcase className="w-4 h-4" /> {isPt ? 'Cargo / Especialidade' : 'Role / Specialty'}</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Gestor de Projectos"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6a00a3] outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 flex items-center gap-2"><MapPin className="w-4 h-4" /> {isPt ? 'Localização' : 'Location'}</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Luanda, AO"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6a00a3] outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 flex items-center gap-2"><Briefcase className="w-4 h-4" /> {isPt ? 'Anos de Experiência' : 'Years of Experience'}</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: 5 anos"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6a00a3] outline-none transition-all" 
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-6 rounded-3xl bg-[#6a00a3]/5 border border-[#6a00a3]/10 space-y-6">
              <h3 className="font-bold flex items-center gap-2 text-[#6a00a3]">
                <ShieldCheck className="w-5 h-5" />
                {isPt ? 'Informações de Contacto' : 'Contact Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"><Mail className="w-3 h-3" /> Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#6a00a3] outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"><Phone className="w-3 h-3" /> {isPt ? 'Telefone' : 'Phone'}</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#6a00a3] outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"><Linkedin className="w-3 h-3" /> LinkedIn</label>
                  <input 
                    type="text" 
                    value={formData.linkedin}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#6a00a3] outline-none" 
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">{isPt ? 'Resumo Profissional / Bio' : 'Professional Summary / Bio'}</label>
              <textarea 
                required
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder={isPt ? 'Descreva sua trajetória e conquistas...' : 'Describe your journey and achievements...'}
                className="w-full bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6a00a3] outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-400">{isPt ? 'Competências / Skills' : 'Skills'}</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  placeholder={isPt ? 'Adicionar competência...' : 'Add skill...'}
                  className="flex-1 bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6a00a3] outline-none transition-all" 
                />
                <button 
                  type="button"
                  onClick={handleAddSkill}
                  className="px-6 bg-[#6a00a3] text-white rounded-xl hover:bg-[#520b7d] transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-[#6a00a3]/10 text-[#6a00a3] rounded-full text-xs font-bold flex items-center gap-2">
                    {skill}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemoveSkill(skill)} />
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-white/10">
              <button 
                type="submit"
                className="w-full py-5 bg-[#6a00a3] text-white rounded-2xl font-black text-lg hover:bg-[#520b7d] transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-900/20"
              >
                <Save className="w-6 h-6" />
                {isPt ? 'Publicar Currículo Digital' : 'Publish Digital CV'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default TalentRegistration;
