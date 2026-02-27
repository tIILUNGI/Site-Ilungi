import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useAppContext } from '../App';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft, Award, Shield, Zap, Globe, BarChart3, Layers, Cpu, Lock } from 'lucide-react';

const partners = [
  { name: "GPMOi", url: "https://gpmoi.org/", logo: "/imagens/GPMoi.png", color: "#4c0253" },
  { name: "CFC Institute", url: "https://cfc-institute.org/", logo: "/imagens/CFC-institute.png", color: "#031f3a" },
  { name: "UCS", url: "https://unicertservices.com/", logo: "/imagens/UCS.png", color: "#550b06" },
  { name: "Nova Select", url: "https://novaselect.co/index.html", logo: "/imagens/Nova Select.png", color: "#dc6516" },
  { name: "Ixi Ambiental", url: "https://www.ixiambiental.co.ao/", logo: "/imagens/Ixi Ambiental.png", color: "#2E7D5E" }
];

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
    { bg: "/Silde.jpg", title: isPt ? "Gestão de Risco Corporativo" : "Corporate Risk Management", subtitle: isPt ? "Protegemos o futuro do seu negócio" : "We protect your business future" },
    { bg: "/imagens/ISO.png", title: isPt ? "Sistema de Gestão ISO" : "ISO Management System", subtitle: isPt ? "Elevamos os padrões da sua empresa" : "We elevate your company's standards" },
    { bg: "/imagens/Gestão de Projecto.jpg", title: isPt ? "Gestão de Projetos" : "Project Management", subtitle: isPt ? "Resultados mensuráveis e eficiência" : "Measurable results and efficiency" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const integratedSolutions = [
    { 
      title: isPt ? "CONSULTORIA E AUDITORIA EM SISTEMAS DE GESTÃO & PROJECTOS" : "CONSULTING AND AUDITING IN MANAGEMENT SYSTEMS & PROJECTS", 
      desc: isPt ? "Serviços especializados de consultoria e auditoria para sistemas de gestão ISO, gestão de projetos e compliance empresarial." : "Specialized consulting and auditing services for ISO management systems, project management and business compliance.",
      icon: "/CSG e Projecto .png", 
      color: "#1B3C2B", 
      path: "/consultoria/iso" 
    },
    { 
      title: isPt ? "PROCUREMENT" : "PROCUREMENT", 
      desc: isPt ? "Gestão de aquisições e fornecimento de materiais e serviços, garantindo eficiência e conformidade nos processos." : "Procurement and supply management of materials and services, ensuring efficiency and compliance in processes.",
      icon: "/imagens/procurement.png", 
      color: "#6a00a3", 
      path: "/consultoria/procurement" 
    },
    { 
      title: isPt ? "ASSISTÊNCIA E SUPORTE DE T.I" : "IT ASSISTANCE AND SUPPORT", 
      desc: isPt ? "Suporte técnico especializado e manutenção de sistemas de informação para garantir a continuidade dos seus negócios." : "Specialized technical support and maintenance of information systems to ensure business continuity.",
      icon: "/Assistencia de TI.png", 
      color: "#0A4D8C", 
      path: "/solucoes" 
    }
  ];

  // Digital solutions features
  const digitalFeatures = [
    { title: isPt ? "Gestão Integrada" : "Integrated Management", desc: isPt ? "Plataforma unificada para todos os processos" : "Unified platform for all processes" },
    { title: isPt ? "Automação Inteligente" : "Smart Automation", desc: isPt ? "Simplifique operações complexas" : "Simplify complex operations" },
    { title: isPt ? "Analytics Avançado" : "Advanced Analytics", desc: isPt ? "Decisões baseadas em dados" : "Data-driven decisions" },
    { title: isPt ? "Segurança Total" : "Total Security", desc: isPt ? "Protecção de dados garantida" : "Guaranteed data protection" }
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 7000);
    return () => clearInterval(interval);
  }, []);

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

      {/* INTEGRATED SOLUTIONS SECTION */}
      <section className="py-32 bg-gradient-to-b from-white to-slate-50 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-[#1B3C2B]/10 text-[#1B3C2B] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              {isPt ? 'O que fazemos' : 'What we do'}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#1B3C2B] mb-6">{isPt ? 'Soluções Integradas' : 'Integrated Solutions'}</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{isPt ? 'Da estratégia à execução, entregamos excelência em cada projeto' : 'From strategy to execution, we deliver excellence in every project'}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integratedSolutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={solution.path} className="block group h-full">
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                    {/* Icon at top */}
                    <div className="p-10 pb-6" style={{ backgroundColor: solution.color }}>
                      <div className="w-40 h-40 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <img src={solution.icon} alt={solution.title} className="w-32 h-32 object-contain p-2" />
                      </div>
                      <div className="text-sm font-bold opacity-80 text-white">{String(index + 1).padStart(2, '0')}</div>
                      <h3 className="text-xl font-bold mb-2 text-white">{solution.title}</h3>
                    </div>
                    {/* Content at bottom */}
                    <div className="p-6 flex-1 flex flex-col" style={{ backgroundColor: solution.color }}>
                      <p className="text-sm text-white/90 leading-relaxed flex-1">{solution.desc}</p>
                      <div className="mt-4 flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                        <span>{isPt ? 'Saber mais' : 'Learn more'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY SECTION */}
      <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#6a00a3]/10 text-[#6a00a3] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              {isPt ? 'Featured' : 'Featured'}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1B3C2B] mb-6">{isPt ? 'Estudo de Caso' : 'Case Study'}</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{isPt ? 'Descubra como ajudaros os nossos clientes a alcançar resultados extraordinários' : 'Discover how we help our clients achieve extraordinary results'}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6 w-fit">
                  <Award className="w-4 h-4" />
                  {isPt ? 'Sucesso comprovado' : 'Proven Success'}
                </div>
                <h3 className="text-3xl lg:text-4xl font-black text-[#1B3C2B] mb-6">{isPt ? 'Transformação Digital Completa' : 'Complete Digital Transformation'}</h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {isPt 
                    ? 'Ajudamos uma empresa de referência no setor industrial a implementar um sistema de gestão integrado que resultou em 45% de aumento na eficiência operacional e 30% de redução de custos.'
                    : 'We helped a leading company in the industrial sector implement an integrated management system that resulted in 45% increase in operational efficiency and 30% cost reduction.'}
                </p>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#6a00a3]">45%</div>
                    <div className="text-sm text-slate-500">{isPt ? 'Eficiência' : 'Efficiency'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#6a00a3]">30%</div>
                    <div className="text-sm text-slate-500">{isPt ? 'Redução de custos' : 'Cost reduction'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#6a00a3]">100%</div>
                    <div className="text-sm text-slate-500">{isPt ? 'Conformidade ISO' : 'ISO Compliance'}</div>
                  </div>
                </div>
                <Link 
                  to="/contacto" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#6a00a3] text-white rounded-full font-bold hover:bg-[#520b7d] transition-all w-fit"
                >
                  {isPt ? 'Solicitar informações' : 'Request information'}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-64 lg:h-auto bg-gradient-to-br from-[#1B3C2B] to-[#6a00a3] p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/imagens/Consultoria.png')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-white font-bold text-xl">{isPt ? 'Caso de Sucesso' : 'Success Story'}</div>
                  <div className="text-white/70 text-sm mt-2">2024</div>
                </div>
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
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-black text-white mb-2">ISO 9001</div>
                    <div className="text-sm text-slate-400">{isPt ? 'Certificação' : 'Certification'}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">88%</div>
                    <div className="text-sm text-slate-400">{isPt ? 'Satisfação' : 'Satisfaction'}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">ISO 37301</div>
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
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
                    <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-slate-700 group-hover:text-[#6a00a3] transition-colors">{partner.name}</span>
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
