
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppContext } from '../App';

const teamMembers = [
  { name: "Amarilda", role: "Assistente Administrativa", image: "/imagens/Amarilda.png" },
  { name: "Emanuel", role: "Tecnico de Marketing", image: "/imagens/Plinio.png" },
  { name: "Didier", role: "Contabilista", image: "/imagens/Didier.png" },
  { name: "Estefânio", role: "Gestor de Projetos", image: "/imagens/Estefanio.png" },
];

// IMPORTANTE: Substitua pelo seu endpoint do Formspree
// Vá a https://formspree.io, crie uma conta e um formulário
// Depois substitua FORMSPREE_ENDPOINT pelo seu endpoint
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgeknpd';

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
        // Se Formspree não estiver configurado, usa mailto como backup
        const emailBody = isPt
          ? `
Nome: ${formData.name}
Email: ${formData.email}
Assunto: ${formData.subject}
Mensagem:
${formData.message}
          `
          : `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message:
${formData.message}
          `;
        const mailtoLink = `mailto:devfront0ilungui@gmail.com?subject=${encodeURIComponent(`${isPt ? 'Contacto' : 'Contact'}: ${formData.subject}`)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      // Se houver erro, usa mailto como backup
      const emailBody = isPt
        ? `
Nome: ${formData.name}
Email: ${formData.email}
Assunto: ${formData.subject}
Mensagem:
${formData.message}
        `
        : `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message:
${formData.message}
        `;
      const mailtoLink = `mailto:devfront0ilungui@gmail.com?subject=${encodeURIComponent(`${isPt ? 'Contacto' : 'Contact'}: ${formData.subject}`)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl font-black text-[#1B3C2B] mb-6 leading-tight">{t.contact.title}</h1>
            <p className="text-xl text-slate-500 mb-12 font-light">{t.contact.subtitle}</p>

            <div className="space-y-10">
                <div className="flex items-start space-x-6">
                    <div className="p-4 bg-slate-50 rounded-2xl text-[#6a00a3]">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">{isPt ? 'Telefone' : 'Phone'}</h4>
                        <p className="text-slate-500">+244 935 793 270</p>
                        <p className="text-slate-400 text-sm mt-1">{t.contact.phoneDesc}</p>
                    </div>
                </div>

                <div className="flex items-start space-x-6">
                    <div className="p-4 bg-slate-50 rounded-2xl text-[#6a00a3]">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">{t.contact.email}</h4>
                        <p className="text-slate-500">geral@ilungi.ao</p>
                        <p className="text-slate-400 text-sm mt-1">{t.contact.emailDesc}</p>
                    </div>
                </div>

                <div className="flex items-start space-x-6">
                    <div className="p-4 bg-slate-50 rounded-2xl text-[#6a00a3]">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">{t.contact.location}</h4>
                        <p className="text-slate-500 leading-relaxed">
                          {isPt ? 'Projeto Nova Vida, Prédio E209' : 'Nova Vida Project, Building E209'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16 w-full h-80 bg-slate-100 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <iframe 
                    title="Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19462.754567515738!2d13.231722997657545!3d-8.895976417122492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f55202e2690f%3A0x2af97cd8291c9610!2sPr%C3%A9dio%20E209!5e1!3m2!1spt-PT!2sao!4v1770723339579!5m2!1spt-PT!2sao"
                    width="100%" 
                    height="100%" 
                    className="border-0"
                    allowFullScreen 
                    loading="lazy"
                ></iframe>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-[#6a00a3]/5 rounded-3xl blur-2xl"></div>
            <form onSubmit={handleSubmit} className="relative bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 space-y-6">
                {status === 'success' && (
                    <div className="p-4 bg-green-50 text-green-700 rounded-xl flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>{isPt ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!'}</span>
                    </div>
                )}
                {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5" />
                        <span>{isPt ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Please try again.'}</span>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">{t.contact.formName}</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            placeholder={isPt ? 'Seu nome completo' : 'Your full name'}
                            className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#6a00a3]" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">{t.contact.formEmail}</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            placeholder={isPt ? 'seu@email.com' : 'you@email.com'}
                            className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#6a00a3]" 
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t.contact.formSubject}</label>
                    <select 
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        title={isPt ? 'Selecione um assunto' : 'Select a subject'}
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#6a00a3]"
                    >
                        <option value="">{isPt ? 'Selecione um assunto' : 'Select a subject'}</option>
                        <option value={isPt ? 'Consultoria ISO' : 'ISO Consulting'}>{isPt ? 'Consultoria ISO' : 'ISO Consulting'}</option>
                        <option value={isPt ? 'Gestão de Projectos' : 'Project Management'}>{isPt ? 'Gestão de Projectos' : 'Project Management'}</option>
                        <option value={isPt ? 'Academia & Cursos' : 'Academy & Courses'}>{isPt ? 'Academia & Cursos' : 'Academy & Courses'}</option>
                        <option value={isPt ? 'Soluções Digitais' : 'Digital Solutions'}>{isPt ? 'Soluções Digitais' : 'Digital Solutions'}</option>
                        <option value={isPt ? 'Outros' : 'Others'}>{isPt ? 'Outros' : 'Others'}</option>
                        </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t.contact.formMessage}</label>
                    <textarea 
                        name="message"
                        rows={5} 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                        placeholder={isPt ? 'Como podemos ajudar?' : 'How can we help?'}
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#6a00a3]"></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full py-4 bg-[#1B3C2B] text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#142d20] shadow-xl shadow-green-900/10 transition-all disabled:opacity-50"
                >
                    {status === 'sending' ? (
                        <span>{isPt ? 'Enviando...' : 'Sending...'}</span>
                    ) : (
                        <>
                            <span>{t.contact.formSubmit}</span>
                            <Send className="w-5 h-5" />
                        </>
                    )}
                </button>

                {/* Team images with hover zoom effect */}
                <div className="flex items-center justify-center space-x-4 pt-4">
                    <div className="flex -space-x-4">
                        {teamMembers.map((member, i) => (
                            <div 
                                key={i} 
                                className="relative group cursor-pointer"
                            >
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-12 h-12 rounded-full border-2 border-white object-cover transition-transform duration-300 group-hover:scale-125 group-hover:z-10"
                                    title={member.name}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-400">{t.contact.teamOnline}</p>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
