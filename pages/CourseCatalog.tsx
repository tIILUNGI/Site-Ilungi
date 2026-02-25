import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { useAppContext } from '../App';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgeknpd';

type Course = {
  code: string;
  name: string;
  area: string;
  hours: string;
  modality: string;
  agenda: string;
};

type CourseSeed = {
  name: string;
  area: string;
};

const courseSeeds: CourseSeed[] = [
  { name: 'Interpretação e Auditor Interno normas ISO 37001 e ISO 37301', area: 'Compliance & Antissuborno' },
  { name: 'Interpretação e Implementação da ISO/UNDP PAS 53002:2024', area: 'Compliance & Antissuborno' },
  { name: 'Gestão de Riscos com base na Norma ISO 31008:2018', area: 'Gestão de Riscos' },
  { name: 'Auditoria e Investigações Internas com base nas normas ISO 19011 e 37008', area: 'Auditoria & Investigações' },
  { name: 'Framework Princípios ESG ISO IW48:2024', area: 'ESG' },
  { name: 'Curso Avançado de ESG de Impacto Reputacional', area: 'ESG & Reputação' },
  { name: 'Gestão de Risco de Fraude', area: 'Risco & Fraude' },
  { name: 'Curso Executivo: Direito e Finanças Para Gestores', area: 'Direito & Finanças' },
  { name: 'Curso Executivo: Governança, Risco, Compliance e Reputação Empresarial', area: 'Governança & Compliance' },
  { name: 'Implementação e Gestão de Escritórios de Projectos (PMO)', area: 'Projectos (PMO)' },
  { name: 'Gestão da Mudança', area: 'Mudança Organizacional' },
  { name: 'Curso Global Gestão Financeira e Controlo de Gestão', area: 'Finanças & Controlo' },
  { name: 'Análise de Investimento Custo-Benefício', area: 'Finanças & Investimentos' },
  { name: 'Ética nas Negociações e Contratações', area: 'Ética & Contratações' },
  { name: 'Gestão de Tesouraria', area: 'Tesouraria' },
  { name: 'Gestão de Património', area: 'Património' },
  { name: 'Segurança da Informação e Risco Cibernético', area: 'Segurança da Informação' },
  { name: 'Regulamentação e Compliance no Mercado de Capitais', area: 'Mercado de Capitais & Compliance' },
  { name: 'Prevenção e Combate à Procrastinação, Sedentarismo e Esgotamento Mental', area: 'Bem-estar & Produtividade' },
  { name: 'Curso de Especialização em Prevenção e Combate à Corrupção, Branqueamento de Capitais e Contrabando de Produtos Petrolíferos em Angola', area: 'Compliance & Anticorrupção' },
  { name: 'Green Compliance', area: 'Compliance Ambiental' },
  { name: 'Compliance Officer', area: 'Compliance Profissional' },
  { name: 'Governance Officer', area: 'Governança Profissional' },
  { name: 'Auditoria Contabilística e Financeira', area: 'Auditoria & Contabilidade' },
  { name: 'Secretariado Executivo', area: 'Administração' },
  { name: 'Gestão de Tempo, Foco e Produtividade', area: 'Produtividade' },
  { name: 'Liderança e Gestão de Equipas', area: 'Liderança' },
  { name: 'Gestão de Carreiras e Plano de Sucessão', area: 'Gestão de Pessoas' },
  { name: 'Curso Global Avançado Governança Corporativa e Compliance', area: 'Governança Corporativa' },
  { name: 'Fundamentos em Gestão de Projectos', area: 'Projectos' },
  { name: 'Balanced ScoreCard + OKR Master', area: 'Estratégia & Performance' },
  { name: 'Gestão de Fundo Social / Caixa de Previdência', area: 'Previdência' },
  { name: 'Contabilidade para Instituições Financeiras: IFRS e regulação específica', area: 'Contabilidade & IFRS' },
  { name: 'Administração de Contas a Pagar e a Receber', area: 'Finanças Operacionais' },
];

const CourseCatalog: React.FC = () => {
  const { lang } = useAppContext();
  const isPt = lang === 'pt';

  const courses = useMemo<Course[]>(() => {
    return courseSeeds.map((course, idx) => ({
      code: `CC-${String(idx + 1).padStart(3, '0')}`,
      hours: 'A definir',
      modality: 'A definir',
      agenda: 'On-demand',
      ...course,
    }));
  }, []);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const openForm = (course: Course) => {
    setSelectedCourse(course);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setStatus('idle');
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    setStatus('sending');

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      course: selectedCourse.name,
      code: selectedCourse.code,
      area: selectedCourse.area,
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const emailBody = `Curso: ${selectedCourse.name} (${selectedCourse.code})\nÁrea: ${selectedCourse.area}\n\nNome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${formData.phone}\nMensagem:\n${formData.message}`;
        const mailtoLink = `mailto:devfront0ilungui@gmail.com?subject=${encodeURIComponent(`Catálogo de Cursos: ${selectedCourse.name}`)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      const emailBody = `Curso: ${selectedCourse.name} (${selectedCourse.code})\nÁrea: ${selectedCourse.area}\n\nNome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${formData.phone}\nMensagem:\n${formData.message}`;
      const mailtoLink = `mailto:devfront0ilungui@gmail.com?subject=${encodeURIComponent(`Catálogo de Cursos: ${selectedCourse.name}`)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
      <motion.div
        animate={{ x: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-40 left-0 w-64 h-64 bg-[#6a00a3]/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 0], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-40 right-0 w-96 h-96 bg-[#1B3C2B]/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2 bg-[#1B3C2B]/10 text-[#1B3C2B] rounded-full text-sm font-bold uppercase mb-6 tracking-widest"
          >
            {isPt ? 'Catálogo de Cursos' : 'Course Catalog'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-[#1B3C2B] mb-6"
          >
            {isPt ? 'Catálogo de Cursos Disponíveis' : 'Available Courses Catalog'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-4xl mx-auto text-lg md:text-xl text-slate-500 font-light"
          >
            Os nossos programas foram desenvolvidos no intuito de ajudar a melhorar os processos de proteção da reputação das organizações com referência as melhores práticas de gestão, ao mesmo tempo, gerando conhecimento capaz de ajudar os líderes a enfrentarem os desafios mais difíceis em um mercado cada vez mais global e em constante mudança.
          </motion.p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm font-bold text-slate-600">
                  <th className="px-6 py-4">Código</th>
                  <th className="px-6 py-4">Nome do Curso</th>
                  <th className="px-6 py-4">Especialidade / Área</th>
                  <th className="px-6 py-4">Carga Horária</th>
                  <th className="px-6 py-4">Modalidade</th>
                  <th className="px-6 py-4">Agenda</th>
                  <th className="px-6 py-4">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => (
                  <tr key={course.code} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">{course.code}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">{course.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{course.area}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{course.hours}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{course.modality}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{course.agenda}</td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openForm(course)}
                        className="px-4 py-2 bg-[#6a00a3] text-white text-sm font-bold rounded-full hover:bg-[#520b7d] transition-all"
                      >
                        Saber mais
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100"
            >
              <div className="flex items-start justify-between p-6 border-b border-slate-100">
                <div>
                  <p className="text-sm font-bold text-[#6a00a3] uppercase tracking-widest">Saber mais</p>
                  <h3 className="text-2xl font-black text-slate-800 mt-2">{selectedCourse.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{selectedCourse.code} • {selectedCourse.area}</p>
                </div>
                <button
                  onClick={closeForm}
                  aria-label="Fechar"
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {status === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl">
                    Mensagem enviada com sucesso!
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
                    Erro ao enviar. Tente novamente.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nome</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Seu nome completo"
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#6a00a3] focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="seu@email.com"
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#6a00a3] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Número de telefone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="Ex: +244 9xx xxx xxx"
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#6a00a3] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Mensagem</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Escreva sua mensagem..."
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#6a00a3] focus:bg-white transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#1B3C2B] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#142d20] shadow-2xl shadow-[#1B3C2B]/20 transition-all disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <span>Enviar</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseCatalog;
