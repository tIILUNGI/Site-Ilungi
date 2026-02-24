import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useAppContext } from '../App';
import { Link } from 'react-router-dom';

const partners = [
  { 
    name: "GPMOi", 
    url: "https://gpmoi.org/", 
    logo: "/imagens/GPMoi.png",
    color: "#4c0253"
  },
  { 
    name: "CFC Institute", 
    url: "https://cfc-institute.org/", 
    logo: "/imagens/CFC-institute.png",
    color: "#031f3a"
  },
  { 
    name: "Universal Certification and Services", 
    url: "https://unicertservices.com/", 
    logo: "/imagens/UCS.png",
    color: "#550b06"
  },
  { 
    name: "Nova Select", 
    url: "https://novaselect.co/index.html", 
    logo: "/imagens/Nova Select.png",
    color: "#dc6516"
  },
  { 
    name: "Ixi Ambiental", 
    url: "https://www.ixiambiental.co.ao/", 
    logo: "/imagens/Ixi Ambiental.png",
    color: "#2E7D5E"
  }
];

// Animation variants for professional transitions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const heroTextVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const Home: React.FC = () => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const serviceImages = [
    {
      src: "/imagens/ilungi_logo.jpg",
      title: "ILUNGI",
      subtitle: isPt ? "Excel\u00eancia em Consultoria" : "Consulting Excellence",
      heroTitle: isPt ? "Consultoria de Excel\u00eancia" : "Excellence Consulting",
      heroSubtitle: isPt
        ? "Solu\u00e7\u00f5es integradas para impulsionar a competitividade e sustentabilidade da sua empresa."
        : "Integrated solutions to boost your company's competitiveness and sustainability."
    },
    {
      src: "/Silde.jpg",
      title: "ILUNGI",
      subtitle: isPt ? "Excel\u00eancia em Consultoria" : "Consulting Excellence",
      heroTitle: isPt ? "Consultoria de Excel\u00eancia" : "Excellence Consulting",
      heroSubtitle: isPt
        ? "Solu\u00e7\u00f5es integradas para impulsionar a competitividade e sustentabilidade da sua empresa."
        : "Integrated solutions to boost your company's competitiveness and sustainability."
    },
    {
      src: "/imagens/ISO.png",
      title: "ISO 9001",
      subtitle: isPt ? "Gest\u00e3o da Qualidade" : "Quality Management",
      heroTitle: isPt ? "Excel\u00eancia em Consultoria" : "Excellence Consulting",
      heroSubtitle: isPt
        ? "Transformamos desafios em oportunidades de crescimento sustent\u00e1vel para sua empresa."
        : "We turn challenges into sustainable growth opportunities for your company."
    },
    {
      src: "/imagens/Nota\u00e7\u00e3o de Risco.jpg",
      title: isPt ? "Gest\u00e3o de Risco" : "Risk Management",
      subtitle: isPt ? "An\u00e1lise Estrat\u00e9gica" : "Strategic Analysis",
      heroTitle: isPt ? "Gest\u00e3o de Riscos Corporativos" : "Corporate Risk Management",
      heroSubtitle: isPt
        ? "Identificamos e mitigamos riscos para proteger o futuro do seu neg\u00f3cio."
        : "We identify and mitigate risks to protect your business future."
    },
    {
      src: "/imagens/Gest\u00e3o de Projecto.jpg",
      title: "PMO",
      subtitle: isPt ? "Gest\u00e3o de Projetos" : "Project Management",
      heroTitle: isPt ? "Gest\u00e3o de Projetos Estrat\u00e9gicos" : "Strategic Project Management",
      heroSubtitle: isPt
        ? "Impulsionamos a execu\u00e7\u00e3o de projetos com metodologia comprovada e resultados mensur\u00e1veis."
        : "We accelerate project delivery with proven methods and measurable results."
    },
  ];

  const services = [
    {
      title: t.home.services.iso,
      desc: t.home.services.isoDesc,
      image: "/imagens/Consultoria.png",
      color: "#1B3C2B",
      path: "/consultoria/iso"
    },
    {
      title: t.home.services.projects,
      desc: t.home.services.projectsDesc,
      image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#6a00a3",
      path: "/consultoria/pmo"
    },
    {
      title: t.home.services.tech,
      desc: t.home.services.techDesc,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#0A4D8C",
      path: "/solucoes"
    },
    {
      title: t.home.services.academy,
      desc: t.home.services.academyDesc,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#B31B1B",
      path: "/academia"
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);

  // Auto-rotate service images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % serviceImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax and Enhanced Animations */}
      <section ref={heroRef} className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#1B3C2B]">
        {/* Animated Background Elements */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img 
                src={serviceImages[currentSlide].src} 
                className="w-full h-full object-cover opacity-25"
                alt={serviceImages[currentSlide].title}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C2B] via-[#1B3C2B]/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3C2B] via-transparent to-transparent"></div>
            </motion.div>
          </AnimatePresence>
          
          {/* Floating decorative elements */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 w-32 h-32 bg-[#6a00a3]/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-10 w-48 h-48 bg-[#1B3C2B]/30 rounded-full blur-3xl"
          />
        </motion.div>

        {/* Content */}
        <motion.div style={{ opacity }} className="relative z-20 max-w-7xl mx-auto px-4 text-white text-center w-full">
          <motion.div
            key={currentSlide}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={heroTextVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6 tracking-tight"
            >
              {serviceImages[currentSlide].heroTitle}
            </motion.h1>
            <motion.p 
              variants={heroTextVariants}
              className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed font-light max-w-3xl mx-auto"
            >
              {serviceImages[currentSlide].heroSubtitle}
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(106, 0, 163, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/contacto" className="inline-block px-12 py-5 bg-[#6a00a3] rounded-full font-bold text-lg hover:bg-[#520b7d] transition-all shadow-2xl shadow-purple-900/40 btn-shine">
                  {t.home.ctaPrimary}
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/consultoria" className="inline-block px-12 py-5 border border-white/30 backdrop-blur-md rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center space-x-2">
                  <span>{t.home.ctaSecondary}</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >→</motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Slide indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3"
        >
          {serviceImages.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentSlide(i)}
              title={`Slide ${i + 1}`}
              className={`rounded-full transition-all ${i === currentSlide ? 'bg-white w-12' : 'bg-white/40 w-3 hover:bg-white/70'}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 right-10 z-20 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/50 text-sm font-medium"
          >
            <span className="block text-center mb-2">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white/70 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section - Enhanced with Professional Cards */}
      <section className="py-28 bg-white relative">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
        <div className="absolute top-20 -left-32 w-64 h-64 bg-[#6a00a3]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-[#1B3C2B]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-block px-6 py-2 bg-[#1B3C2B]/10 text-[#1B3C2B] rounded-full text-sm font-bold uppercase mb-6 tracking-widest"
            >
              {isPt ? 'Nossas Competências' : 'Our Capabilities'}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl font-black text-[#1B3C2B] mt-4 mb-6"
            >
              {isPt ? 'Soluções Integradas' : 'Integrated Solutions'}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-2xl mx-auto text-xl text-slate-500 font-light"
            >
              {isPt
                ? 'Da estratégia à execução, entregamos excelência em cada projeto'
                : 'From strategy to execution, we deliver excellence in every project'}
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={cardVariants}
                >
                  <Link to={service.path} className="block group">
                    <motion.div 
                      className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl professional-card bg-white"
                      whileHover={{ y: -12 }}
                    >
                      {/* Image container with reveal effect */}
                      <div className="relative h-56 lg:h-64 img-hover-zoom">
                        <motion.img 
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.7 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                            {service.title}
                          </h3>
                          <p className="text-white/90 text-base leading-relaxed line-clamp-2 mb-5">
                            {service.desc}
                          </p>
                          <motion.div 
                            whileHover={{ x: 8 }}
                            className="inline-flex items-center space-x-2"
                          >
                            <span className="inline-block px-6 py-3 bg-[#6a00a3] text-white rounded-xl font-bold text-sm">
                              {isPt ? 'Saber mais' : 'Learn more'}
                            </span>
                            <motion.span 
                              className="text-white text-xl"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >→</motion.span>
                          </motion.div>
                        </div>
                      </div>

                      {/* Decorative line */}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-1"
                        style={{ backgroundColor: service.color }}
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - Enhanced */}
      <section className="py-24 bg-[#1B3C2B] relative overflow-hidden">
        {/* Background effects */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-[#6a00a3]/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-[#1B3C2B]/50 rounded-full blur-3xl"
        />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-white/50 font-semibold">
              {t.home.partners}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-6 mb-6">
              {isPt ? 'Parceiros Estratégicos' : 'Strategic Partners'}
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1.5 bg-[#6a00a3] mx-auto rounded-full"
            />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {partners.map((partner, i) => {
              const isHovered = hoveredPartner === i;
              
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onHoverStart={() => setHoveredPartner(i)}
                  onHoverEnd={() => setHoveredPartner(null)}
                  className="relative"
                >
                  {/* Animated line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[3px] z-10"
                    style={{ color: partner.color }}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: isHovered ? '100%' : 0
                    }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  />
                  
                  <motion.a 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full group"
                    animate={{
                      y: isHovered ? -8 : 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    <motion.div 
                      className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center relative overflow-hidden border border-white/10 hover:bg-white/15 transition-colors"
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      {/* Logo container with glow effect */}
                      <motion.div 
                        className="w-32 h-32 mb-6 relative flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div 
                          className="absolute inset-0 border-2 rounded-2xl"
                          style={{ borderColor: partner.color }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ 
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.9
                          }}
                          transition={{ duration: 0.4 }}
                        />
                        
                        <div className="w-full h-full relative z-10 bg-white rounded-2xl overflow-hidden p-3">
                          <img 
                            src={partner.logo} 
                            alt={partner.name} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </motion.div>

                      {/* Name */}
                      <motion.h3 
                        className="text-lg font-bold text-white/90 text-center"
                        animate={{ 
                          color: isHovered ? partner.color : 'rgba(255,255,255,0.9)'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {partner.name}
                      </motion.h3>
                      
                      {/* Visit link */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div 
                            className="flex items-center gap-1 mt-2"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: partner.color }}>
                              {isPt ? 'Visitar' : 'Visit'}
                            </span>
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >→</motion.span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Digital Solutions Section - Enhanced */}
      <section className="py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6a00a3]/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image with reveal animation */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <motion.div 
              animate={{ 
                boxShadow: ["0 0 0 rgba(106, 0, 163, 0)", "0 0 40px rgba(106, 0, 163, 0.2)", "0 0 0 rgba(106, 0, 163, 0)"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-[#6a00a3]/10 rounded-full blur-3xl"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <motion.img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" 
                  className="w-full h-auto"
                  alt="ILUNGI Solutions"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </motion.div>
            
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#6a00a3] font-bold uppercase tracking-widest text-sm mb-6 block"
            >
              {isPt ? 'Tecnologia & inovação' : 'Technology & Innovation'}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-8 leading-tight"
            >
              {t.home.solutions.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-slate-600 mb-10 leading-relaxed text-lg"
            >
              {t.home.solutions.desc}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-5 mb-10"
            >
              {[t.home.solutions.feature1, t.home.solutions.feature2, t.home.solutions.feature3].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0"
                  >
                    <span className="text-green-600 text-sm">✓</span>
                  </motion.div>
                  <span className="font-semibold text-slate-700 text-lg">{item}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/solucoes" className="inline-block px-10 py-4 bg-[#1B3C2B] text-white rounded-full font-bold hover:bg-[#142d20] transition-all shadow-xl hover:shadow-2xl">
                {t.home.solutions.cta}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
