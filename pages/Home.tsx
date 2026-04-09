import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useAppContext } from '../App';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft, Award, Shield, Zap, Globe, BarChart3, Layers, Cpu, Lock, Briefcase, Settings, TrendingUp } from 'lucide-react';
import { loadData } from '../lib/dataSync';
import { defaultPartners } from '../lib/partnersData';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

const Home: React.FC = () => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroSlides = [
    { bg: "/imagens/Logo Slide.png", title: isPt ? "Excelência em Consultoria" : "Excellence in Consulting", subtitle: isPt ? "Transformamos desafios em oportunidades de crescimento sustentável" : "We transform challenges into sustainable growth opportunities" },
    { bg: "/imagens/Logo Slide.png", title: isPt ? "Gestão de Risco Corporativo" : "Corporate Risk Management", subtitle: isPt ? "Protegemos o futuro do seu negócio" : "We protect your business future" },
    { bg: "/imagens/Logo Slide.png", title: isPt ? "Sistema de Gestão ISO" : "ISO Management System", subtitle: isPt ? "Elevamos os padrões da sua empresa" : "We elevate your company's standards" },
    { bg: "/imagens/Logo Slide.png", title: isPt ? "GRI STANDARD" : "GRI STANDARD", subtitle: isPt ? "Relatório Global de Sustentabilidade" : "Global Sustainability Report" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [partners, setPartners] = useState(defaultPartners);

  const integratedSolutions = [
    { 
      title: isPt ? "SISTEMAS DE GESTÃO ISO" : "ISO MANAGEMENT SYSTEMS", 
      desc: isPt ? "Implementação e certificação de sistemas de gestão ISO 9001, 14001, 45001 e outras directrizes e requisitos." : "Implementation and certification of ISO 9001, 14001, 45001 and other international standards.",
      image: "/imagens/consultoria-icon.png", 
      color: "#1B3C2B", 
      path: "/consultoria/consultoria-e-auditoria-em-sistemas-de-gestao" 
    },
    { 
      title: isPt ? "GRI STANDARD" : "GRI STANDARD", 
      desc: isPt ? "Relatórios de sustentabilidade baseados nos padrões GRI para transparência e responsabilidade corporativa." : "Sustainability reporting based on GRI standards for transparency and corporate accountability.",
      image: "/imagens/gri-icon.png", 
      color: "#2E7D32", 
      path: "/consultoria/gri-sustentabilidade" 
    },
    { 
      title: isPt ? "PROCUREMENT" : "PROCUREMENT", 
      desc: isPt ? "Aquisições e fornecimento de bens e serviços, garantindo eficiência operacional." : "Procurement and supply management of materials and services, ensuring efficiency and compliance.",
      image: "/imagens/procurement-icon.png", 
      color: "#6a00a3", 
      path: "/consultoria/procurement" 
    },
    { 
      title: isPt ? "TECNOLOGIA" : "TECHNOLOGY", 
      desc: isPt ? "Soluções tecnológicas integradas para digitalização e optimização dos processos empresariais." : "Integrated technological solutions for digitization and optimization of business processes.",
      image: "/imagens/tecnologia-icon.png", 
      color: "#0A4D8C", 
      path: "/consultoria/assistencia-e-suporte-de-ti" 
    }
  ];

  // Digital solutions features
  const digitalFeatures = [
    { title: isPt ? "Sistema Unificado" : "Unified System", desc: isPt ? "Sistema unificado para todos os processos" : "Unified system for all processes" },
    { title: isPt ? "Automação Inteligente" : "Smart Automation", desc: isPt ? "Simplifique operações complexas" : "Simplify complex operations" },
    { title: isPt ? "Analytics Avançado" : "Advanced Analytics", desc: isPt ? "Decisões baseadas em dados" : "Data-driven decisions" },
    { title: isPt ? "Protecção de Dados" : "Data Protection", desc: isPt ? "Protecção de dados garantida" : "Guaranteed data protection" }
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadData('partners', 'ilungi_partners_data', defaultPartners).then(data => {
      setPartners(data);
    });
  }, []);

  const getLocalized = (val: any) => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') {
      return val[lang] || val.pt || val.en || '';
    }
    return '';
  };

  const handleServicesScroll = (direction: 'prev' | 'next') => {
    const row = servicesRowRef.current;
    if (!row) return;
    const firstCard = row.querySelector<HTMLElement>('[data-service-card]');
    const gap = 24;
    const cardWidth = firstCard?.offsetWidth ?? 320;
    const amount = cardWidth + gap;
    row.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1a]">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B3C2B] via-[#0f1f17] to-[#0a0f1a]"></div>
              <img src={heroSlides[currentSlide].bg} className="w-full h-full object-cover opacity-15" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/80 via-transparent to-[#6a00a3]/20"></div>
            </motion.div>
          </AnimatePresence>
          
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6a00a3]/30 rounded-full blur-[120px]" />
          <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1B3C2B]/40 rounded-full blur-[100px]" />
        </motion.div>

        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        <motion.div style={{ opacity }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div key={currentSlide} variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={scaleIn} className="mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#6a00a3]/20 border border-[#6a00a3]/40 rounded-full text-white font-semibold text-sm">
                <Award className="w-4 h-4" />
                {isPt ? 'Consultoria de Excelência' : 'Excellence Consulting'}
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
              {heroSlides[currentSlide].title}
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contacto" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[#6a00a3] text-white rounded-full font-bold text-lg overflow-hidden">
                  <span className="relative z-10">{t.home.ctaPrimary}</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/consultoria" className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-all">
                  {t.home.ctaSecondary}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, i) => (
            <motion.button key={i} onClick={() => setCurrentSlide(i)} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-12 bg-[#6a00a3]' : 'w-3 bg-white/30 hover:bg-white/50'}`} />
          ))}
        </motion.div>
      </section>

      {/* INTEGRATED SOLUTIONS SECTION - FLOATING ELEMENTS */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#6a00a3]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1B3C2B]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#1B3C2B]/10 text-[#1B3C2B] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              {isPt ? 'O que fazemos' : 'What we do'}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#1B3C2B] mb-4">{isPt ? 'Soluções Integradas' : 'Integrated Solutions'}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{isPt ? 'Da estratégia à execução, entregamos excelência em cada projecto' : 'From strategy to execution, we deliver excellence in every project'}</p>
          </motion.div>

          {/* Floating Elements - No Cards Design */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative">
              {integratedSolutions.map((solution, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="relative"
                  >
                    {/* Floating Element - No Card */}
                    <Link to={solution.path} className="block group">
                      <motion.div 
                        whileHover={{ y: -15, scale: 1.02 }}
                        className="relative flex flex-col items-center text-center"
                      >
                        {/* Image - No Circle */}
                        <motion.div 
                          className="mb-3"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img 
                            src={solution.image} 
                            alt={solution.title}
                            className="w-20 h-20 object-contain"
                          />
                        </motion.div>

                        {/* Content - No Card Background */}
                        <h3 className="text-lg font-black text-[#1B3C2B] mb-2 group-hover:text-[#6a00a3] transition-colors max-w-xs">
                          {solution.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-3">
                          {solution.desc}
                        </p>
                        
                        {/* Animated arrow */}
                        <motion.div 
                          className="flex items-center gap-2 text-sm font-bold"
                          style={{ color: solution.color }}
                          whileHover={{ x: 5 }}
                        >
                          <span>{isPt ? 'Saber mais' : 'Learn more'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link 
              to="/consultoria" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1B3C2B] text-white rounded-full font-bold hover:bg-[#2a5a3f] transition-all"
            >
              {isPt ? 'Descobrir todas as soluções' : 'Discover all solutions'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDY SECTION */}
      <section className="py-12 bg-[#f8fafc] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block px-4 py-2 bg-[#6a00a3]/10 text-[#6a00a3] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              {isPt ? 'Destaque' : 'Featured'}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1B3C2B] mb-6">{isPt ? 'Estudo de Caso' : 'Case Study'}</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{isPt ? 'Projeto realizado para a Ozango Minerais S.A, empresa do Grupo Pensana.' : 'Project delivered for Ozango Minerais S.A, a Pensana Group company.'}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr]">
              <div className="p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4 w-fit">
                  <Award className="w-4 h-4" />
                  {isPt ? 'Caso de Sucesso' : 'Success Story'}
                </div>
                <h3 className="text-2xl lg:text-[1.65rem] font-black text-[#1B3C2B] mb-4 leading-tight">
                  {isPt ? 'Migração e Configuração de Dados do ERP Cegid Primavera para a Ozango Minerais' : 'ERP Cegid Primavera Data Migration and Configuration for Ozango Minerais'}
                </h3>
                <p className="text-base lg:text-[1.02rem] text-slate-600 mb-6 leading-relaxed text-left lg:text-justify">
                  {isPt 
                    ? 'A ILUNGI foi responsável por entregar um projeto de migração e configuração de dados do ERP Cegid Primavera para a Ozango Minerais S.A, uma empresa do Grupo Pensana, com o objetivo de estruturar e operacionalizar o sistema de gestão financeira e administrativa para suas operações em Angola.'
                    : 'ILUNGI was responsible for delivering a data migration and configuration project of the Cegid Primavera ERP for Ozango Minerais S.A, a company of the Pensana Group, with the objective of structuring and operationalizing the financial and administrative management system for its operations in Angola.'}
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 lg:p-6">
                  <div className="space-y-4">
                    <p className="text-slate-700 leading-relaxed text-left lg:text-justify">
                      {isPt 
                        ? 'Tivemos uma ótima experiência trabalhando com a ILUNGI na nossa migração e configuração do ERP. A equipa foi profissional, experiente e fez com que um processo que poderia ser muito complexo fosse tranquilo e gerível.'
                        : 'We had a great experience working with ILUNGI on our ERP migration and configuration. The team was professional, experienced and made what could be a very complex process smooth and manageable.'}
                    </p>
                    <p className="text-slate-700 leading-relaxed text-left lg:text-justify">
                      {isPt 
                        ? 'Eles nos apoiaram na migração, validação e reconciliação de dados, além de ajudar na configuração de módulos-chave, incluindo contabilidade, tesouraria/bancos, fornecedores, IVA e ativos fixos. A atenção ao detalhe garantiu que nossos dados estivessem corretos, alinhados e prontos para as operações diárias desde o início.'
                        : 'They supported us in data migration, validation and reconciliation, as well as helping configure key modules including accounting, treasury/banks, suppliers, VAT and fixed assets. The attention to detail ensured our data was correct, aligned and ready for daily operations from the start.'}
                    </p>
                    <p className="text-slate-700 leading-relaxed text-left lg:text-justify">
                      {isPt 
                        ? 'Estavam sempre dispostos a ir além para apoiar nossa equipa, seja resolvendo problemas, respondendo perguntas ou ajudando-nos a sentir-nos confortáveis com o sistema. A sua capacidade de resposta e abordagem prática realmente se destacaram.'
                        : 'They were always willing to go above and beyond to support our team, whether solving problems, answering questions or helping us feel comfortable with the system. Their responsiveness and practical approach really stood out.'}
                    </p>
                    <p className="text-slate-700 leading-relaxed text-left lg:text-justify">
                      {isPt 
                        ? 'Estamos muito satisfeitos com o resultado e os recomendaríamos com prazer.'
                        : 'We are very satisfied with the result and would highly recommend them.'}
                    </p>
                    <div className="pt-1">
                      <p className="text-slate-900 font-semibold">{isPt ? 'Atenciosamente,' : 'Sincerely,'}</p>
                      <p className="text-slate-900 font-semibold">Angie Bles (de Oliveira)</p>
                      <p className="text-slate-600 font-medium">{isPt ? 'Financial Manager Angola/Portugal' : 'Financial Manager Angola/Portugal'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[340px] lg:min-h-full bg-gradient-to-br from-[#1B3C2B] to-[#6a00a3] p-6 lg:p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/Nossas%20Refer%C3%AAncias/pensana-logo-sticky-blue-standard.png')] bg-contain bg-no-repeat bg-center opacity-10"></div>
                <Link to="/referencia/pensana?service=pmo" className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl p-5 lg:p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform">
                  <img
                    src="/Nossas%20Refer%C3%AAncias/pensana-logo-sticky-blue-standard.png"
                    alt="Logotipo PENSANA"
                    className="h-[180px] sm:h-[210px] lg:h-[260px] w-auto max-w-full object-contain mb-3"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-32 bg-[#1B3C2B] relative overflow-hidden">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6a00a3]/20 rounded-full blur-[150px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{t.consulting.whyTitle}</h2>
              <div className="space-y-6">
                {t.consulting.features.map((feature: string, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-500 text-sm">✓</span>
                    </div>
                    <span className="text-white text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-[#6a00a3]/20 to-[#1B3C2B]/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-black text-white mb-2">ISO 9001</div>
                    <div className="text-sm text-slate-400">{isPt ? 'Certificação' : 'Certification'}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">88%</div>
                    <div className="text-sm text-slate-400">{isPt ? 'Satisfação' : 'Satisfaction'}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">ISO 29993</div>
                    <div className="text-sm text-slate-400">{isPt ? 'Certificação' : 'Certification'}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">360°</div>
                    <div className="text-sm text-slate-400">{isPt ? 'Acompanhamento' : 'Follow-up'}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DIGITAL SOLUTIONS - SUPER PROFESSIONAL SECTION */}
      <section className="py-40 bg-[#050a14] relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-[#6a00a3]/10 to-transparent rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.3, 1]
            }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#1B3C2B]/10 to-transparent rounded-full blur-3xl"
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Premium Header */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#6a00a3]"></div>
              <span className="text-[#6a00a3] font-semibold text-sm uppercase tracking-[0.3em]">
                {isPt ? 'Transformação Digital' : 'Digital Transformation'}
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#6a00a3]"></div>
            </motion.div>

            {/* Main title with gradient */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black mb-6"
            >
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {isPt ? 'Soluções Digitais' : 'Digital Solutions'}
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a00a3] to-[#a855f7]">
                {isPt ? 'sob medida para sua Gestão' : 'tailored to your Management'}
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="hidden text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
            >
              {isPt 
                ? 'Technologias de ponta que transformam a forma como você gestiona o seu negócio, trazendo eficiência e inovação para cada processo.'
                : 'Cutting-edge technologies that transform how you manage your business, bringing efficiency and innovation to every process.'}
            </motion.p>
          </motion.div>

          {/* Feature Cards - Premium Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {digitalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative h-full"
              >
                {/* Card glow effect */}
                <div className="absolute -inset-px bg-gradient-to-br from-[#6a00a3]/30 to-[#1B3C2B]/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 group-hover:border-[#6a00a3]/30 transition-all duration-500 h-full flex flex-col">
                  {/* Number indicator */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6a00a3] to-[#1B3C2B] flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-white font-bold text-lg">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#a855f7] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">
                    {feature.desc}
                  </p>

                  {/* Animated line */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6a00a3] to-[#a855f7] rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button - Premium Style */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Link 
              to="/solucoes" 
              className="group relative inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-[#6a00a3] to-[#7c3aed] text-white rounded-full font-bold text-lg overflow-hidden"
            >
              <span className="relative z-10">{t.home.solutions.cta}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              {/* Shine effect */}
              <motion.div 
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </Link>
          </motion.div>

          {/* Floating elements decoration */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 left-20 w-20 h-20 border border-[#6a00a3]/20 rounded-2xl rotate-12 opacity-50"
          />
          <motion.div 
            animate={{ y: [15, -15, 15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 right-20 w-16 h-16 border border-white/10 rounded-full opacity-30"
          />
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-slate-400 font-semibold">{t.home.partners}</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1B3C2B] mt-4">{isPt ? 'Parceiros Estratégicos' : 'Strategic Partners'}</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.map((partner, i) => (
              <motion.a href={partner.url} target="_blank" rel="noopener noreferrer" key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100">
                  <div className="h-20 flex items-center justify-center mb-4">
                    <img src={partner.logo} alt={getLocalized(partner.name)} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-slate-700 group-hover:text-[#6a00a3] transition-colors">{getLocalized(partner.name)}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-r from-[#1B3C2B] to-[#0f1f17] relative overflow-hidden">
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -right-32 -top-32 w-96 h-96 border border-[#6a00a3]/20 rounded-full" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{isPt ? 'Pronto para transformar o seu negócio?' : 'Ready to transform your business?'}</h2>
            <p className="text-xl text-slate-300 mb-10">{isPt ? 'Entre em contacto connosco hoje e descubra como podemos ajudar a elevar a sua empresa.' : 'Contact us today and discover how we can help elevate your company.'}</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to="/contacto" className="inline-flex items-center gap-3 px-12 py-5 bg-[#6a00a3] text-white rounded-full font-bold text-lg hover:bg-[#520b7d] transition-all shadow-2xl shadow-purple-900/30">
                {t.home.ctaPrimary}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
