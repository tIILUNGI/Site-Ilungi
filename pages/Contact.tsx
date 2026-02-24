import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useAppContext } from '../App';

const teamMembers = [
  { name: "Amarilda", role: "Assistente Administrativa", image: "/imagens/Amarilda.png" },
  { name: "Emanuel", role: "Tecnico de Marketing", image: "/imagens/Plinio.png" },
  { name: "Didier", role: "Contabilista", image: "/imagens/Didier.png" },
  { name: "Estefânio", role: "Gestor de Projetos", image: "/imagens/Estefanio.png" },
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgeknpd';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const Contact: React.FC = () => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const emailBody = isPt
          ? `Nome: ${formData.name}\nEmail: ${formData.email}\nAssunto: ${formData.subject}\nMensagem:\n${formData.message}`
          : `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage:\n${formData.message}`;
        const mailtoLink = `mailto:devfront0ilungui@gmail.com?subject=${encodeURIComponent(`${isPt ? 'Contacto' : 'Contact'}: ${formData.subject}`)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      const emailBody = isPt
        ? `Nome: ${formData.name}\nEmail: ${formData.email}\nAssunto: ${formData.subject}\nMensagem:\n${formData.message}`
        : `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:devfront0ilungui@gmail.com?subject=${encodeURIComponent(`${isPt ? 'Contacto' : 'Contact'}: ${formData.subject}`)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
      <motion.div 
        animate={{ 
          x: [0, 30, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-40 left-0 w-64 h-64 bg-[#6a00a3]/5 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          x: [0, -30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-40 right-0 w-96 h-96 bg-[#1B3C2B]/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2 bg-[#1B3C2B]/10 text-[#1B3C2B] rounded-full text-sm font-bold uppercase mb-6 tracking-widest"
          >
            {isPt ? 'Fale Connosco' : 'Get in Touch'}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-[#1B3C2B] mb-6"
          >
            {t.contact.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mx-auto text-xl text-slate-500 font-light"
          >
            {t.contact.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Contact Info */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact Cards */}
            {[
              {
                icon: Phone,
                title: isPt ? 'Telefone' : 'Phone',
                details: ['+244 935 793 270'],
                desc: t.contact.phoneDesc,
                color: '#6a00a3'
              },
              {
                icon: Mail,
                title: t.contact.email,
                details: ['geral@ilungi.ao'],
                desc: t.contact.emailDesc,
                color: '#1B3C2B'
              },
              {
                icon: MapPin,
                title: t.contact.location,
                details: [isPt ? 'Projeto Nova Vida, Prédio E209' : 'Nova Vida Project, Building E209'],
                desc: 'Luanda, Angola',
                color: '#6a00a3'
              },
              {
                icon: Clock,
                title: isPt ? 'Horário de Trabalho' : 'Working Hours',
                details: [isPt ? 'Seg - Sex: 08:00 - 17:30' : 'Mon - Fri: 08:00 - 17:30'],
                desc: isPt ? 'Horário de Luanda' : 'Luanda Timezone',
                color: '#1B3C2B'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-slate-800 mb-1">{item.title}</h4>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-slate-600 font-medium">{detail}</p>
                    ))}
                    <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map */}
            <motion.div
              variants={itemVariants}
              className="w-full h-64 rounded-2xl overflow-hidden shadow-lg"
            >
              <iframe 
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19462.754567515738!2d13.231722997657545!3d-8.895976417122492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f55202e2690f%3A0x2af97cd8291c9610!2sPr%C3%A9dio%20E209!5e1!3m2!1spt-PT!2sao!4v1770723339579!5m2!1spt-PT!2sao"
                width="100%" 
                height="100%" 
                className="border-0"
                allowFullScreen 
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#6a00a3]/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#1B3C2B]/10 rounded-full blur-2xl"></div>
              
              <form onSubmit={handleSubmit} className="relative bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 space-y-8">
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">✓</div>
                    <span className="font-medium">{isPt ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!'}</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <div className="p-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
                    <span>{isPt ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Please try again.'}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">{t.contact.formName}</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      placeholder={isPt ? 'Seu nome completo' : 'Your full name'}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#6a00a3] focus:bg-white transition-all" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">{t.contact.formEmail}</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      placeholder={isPt ? 'seu@email.com' : 'you@email.com'}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#6a00a3] focus:bg-white transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">{t.contact.formSubject}</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    title={isPt ? 'Selecione um assunto' : 'Select a subject'}
                    aria-label={isPt ? 'Selecione um assunto' : 'Select a subject'}
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#6a00a3] focus:bg-white transition-all"
                  >
                    <option value="">{isPt ? 'Selecione um assunto' : 'Select a subject'}</option>
                    <option value={isPt ? 'Consultoria ISO' : 'ISO Consulting'}>{isPt ? 'Consultoria ISO' : 'ISO Consulting'}</option>
                    <option value={isPt ? 'Gestão de Projectos' : 'Project Management'}>{isPt ? 'Gestão de Projectos' : 'Project Management'}</option>
                    <option value={isPt ? 'Academia & Cursos' : 'Academy & Courses'}>{isPt ? 'Academia & Cursos' : 'Academy & Courses'}</option>
                    <option value={isPt ? 'Soluções Digitais' : 'Digital Solutions'}>{isPt ? 'Soluções Digitais' : 'Digital Solutions'}</option>
                    <option value={isPt ? 'Outros' : 'Others'}>{isPt ? 'Outros' : 'Others'}</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">{t.contact.formMessage}</label>
                  <textarea 
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    placeholder={isPt ? 'Como podemos ajudar? Descreva o seu projeto ou dúvida...' : 'How can we help? Describe your project or question...'}
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#6a00a3] focus:bg-white transition-all resize-none"
                  />
                </div>

                <motion.button 
                  type="submit" 
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-[#1B3C2B] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#142d20] shadow-2xl shadow-[#1B3C2B]/20 transition-all disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <span>{isPt ? 'Enviando...' : 'Sending...'}</span>
                  ) : (
                    <>
                      <span>{t.contact.formSubmit}</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Team */}
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-100">
                  <div className="flex -space-x-3">
                    {teamMembers.map((member, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        className="relative"
                      >
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-12 h-12 rounded-full border-3 border-white object-cover shadow-md"
                          title={`${member.name} - ${member.role}`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-700">{t.contact.teamOnline}</p>
                    <p className="text-xs text-slate-400">{isPt ? 'Respondemos em 24h' : 'We reply within 24h'}</p>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
