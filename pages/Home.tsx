import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Target, Users, BarChart, ChevronRight, ExternalLink } from 'lucide-react';
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

const serviceImages = [
  { 
    src: "/imagens/ilungi_logo.jpg", 
    title: "ILUNGI", 
    subtitle: "Excelência em Consultoria",
    heroTitle: "Consultoria de Excelência",
    heroSubtitle: "Soluções integradas para impulsionar a competitividade e sustentabilidade da sua empresa."
  },
  { 
    src: "/imagens/ISO.png", 
    title: "ISO 9001", 
    subtitle: "Gestão da Qualidade",
    heroTitle: "Excelência em Consultoria",
    heroSubtitle: "Transformamos desafios em oportunidades de crescimento sustentável para sua empresa."
  },
  { 
    src: "/imagens/Notação de Risco.jpg", 
    title: "Gestão de Risco", 
    subtitle: "Análise Estratégica",
    heroTitle: "Gestão de Riscos Corporativos",
    heroSubtitle: "Identificamos e mitigamos riscos para proteger o futuro do seu negócio."
  },
  { 
    src: "/imagens/Gestão de Projecto.jpg", 
    title: "PMO", 
    subtitle: "Gestão de Projetos",
    heroTitle: "Gestão de Projetos Estratégicos",
    heroSubtitle: "Impulsionamos a execução de projetos com metodologia comprovada e resultados mensuráveis."
  },
];

const services = [
  { 
    title: "Consultoria ISO", 
    desc: "Implementação e certificação de normas ISO. Garantia de conformidade, eficiência operacional e reconhecimento internacional.",
    image: "/imagens/Consultoria.png",
    color: "#1B3C2B",
    path: "/consultoria/iso"
  },
  { 
    title: "Gestão de Projectos", 
    desc: "Metodologias ágeis e tradicionais para entregar resultados com excelência. Planeamento, execução e controlo de projetos complexos.",
    image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "#6a00a3",
    path: "/consultoria/pmo"
  },
  { 
    title: "SaaS & Tech", 
    desc: "Soluções tecnológicas escaláveis para transformar digitalmente o seu negócio. Desenvolvimento de software, cloud computing e arquitetura de sistemas.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "#0A4D8C",
    path: "/solucoes"
  },
  { 
    title: "Academia ILUNGI", 
    desc: "Formação executiva e capacitação profissional. Cursos certificados nas áreas de gestão, tecnologia e desenvolvimento de lideranças.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "#B31B1B",
    path: "/academia"
  },
];

const Home: React.FC = () => {
  const { t, lang } = useAppContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Auto-rotate service images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % serviceImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Service Slider */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-[#1B3C2B]">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img 
                src={serviceImages[currentSlide].src} 
                className="w-full h-full object-cover opacity-30"
                alt={serviceImages[currentSlide].title}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C2B] via-[#1B3C2B]/70 to-transparent"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 text-white text-center w-full">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              {serviceImages[currentSlide].heroTitle}
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              {serviceImages[currentSlide].heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
              <Link to="/contacto" className="px-10 py-4 bg-[#6a00a3] rounded-full font-bold text-lg hover:bg-[#520b7d] transition-all transform hover:scale-105 shadow-2xl shadow-purple-900/40">
                {t.home.ctaPrimary}
              </Link>
              <Link to="/consultoria" className="px-10 py-4 border border-white/30 backdrop-blur-md rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center space-x-2">
                <span>{t.home.ctaSecondary}</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {serviceImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Services Section - COM IMAGENS REAIS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.2em] text-[#6a00a3] font-semibold"
            >
              Nossas Competências
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-[#1B3C2B] mt-4 mb-6"
            >
              Soluções Integradas
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg text-slate-500 font-light"
            >
              Da estratégia à execução, entregamos excelência em cada projeto
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const isHovered = hoveredService === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredService(index)}
                  onHoverEnd={() => setHoveredService(null)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/40 hover:shadow-2xl transition-shadow duration-500"
                >
                  <Link to={service.path} className="block">
                    {/* Container da imagem */}
                    <div className="relative h-56 overflow-hidden">
                      {/* Overlay gradiente */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"
                        animate={{
                          opacity: isHovered ? 0.9 : 0.7
                        }}
                      />
                      
                      {/* Imagem */}
                      <motion.img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: isHovered ? 1.1 : 1
                        }}
                        transition={{ duration: 0.7 }}
                      />
                      
                      {/* Título sobre a imagem */}
                      <motion.div 
                        className="absolute bottom-4 left-4 z-20"
                        animate={{
                          y: isHovered ? -5 : 0
                        }}
                      >
                        <h3 className="text-xl font-bold text-white mb-1">
                          {service.title}
                        </h3>
                        <span 
                          className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white inline-block"
                        >
                          Saber mais
                        </span>
                      </motion.div>
                    </div>

                    {/* Conteúdo expandido no hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div 
                          className="absolute inset-0 bg-white z-30 p-6 flex flex-col justify-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 
                            className="text-2xl font-bold mb-3"
                            style={{ color: service.color }}
                          >
                            {service.title}
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            {service.desc}
                          </p>
                          
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center text-sm font-semibold"
                            style={{ color: service.color }}
                          >
                            Ver serviço
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="ml-2"
                            >
                              →
                            </motion.span>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Linha decorativa na cor do serviço */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1"
                      style={{ backgroundColor: service.color }}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: isHovered ? '100%' : '0%'
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section - TAMANHO PEQUENO COM EFEITO DE LINHA */}
      <section className="py-16 bg-[#1B3C2B]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-white/60 font-semibold">
              {t.home.partners}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-4 mb-4">
              Parceiros Estratégicos
            </h2>
            <div className="w-20 h-1.5 bg-[#6a00a3] mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.map((partner, i) => {
              const isHovered = hoveredPartner === i;
              
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onHoverStart={() => setHoveredPartner(i)}
                  onHoverEnd={() => setHoveredPartner(null)}
                  className="relative"
                >
                  {/* Linha da esquerda para direita */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-current z-10"
                    style={{ color: partner.color }}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: isHovered ? '100%' : 0
                    }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  />
                  
                  <motion.a 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full group"
                    animate={{
                      y: isHovered ? -5 : 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center relative overflow-hidden border border-white/10 hover:bg-white/10 transition-colors">
                      
                      {/* Quadrado com foto de lado - estilo revista */}
                      <div className="w-28 h-28 mb-4 relative flex items-center justify-center">
                        {/* Borda animada que aparece no hover */}
                        <motion.div 
                          className="absolute inset-0 border-2 rounded-xl"
                          style={{ borderColor: partner.color }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ 
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.95
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Container da imagem com fundo branco suave */}
                        <div className="w-full h-full relative z-10 bg-white rounded-xl overflow-hidden">
                          <img 
                            src={partner.logo} 
                            alt={partner.name} 
                            className="w-full h-full object-contain transition-all duration-500 p-1"
                            style={{
                              filter: isHovered ? 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' : 'none',
                              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                            }}
                          />
                        </div>
                      </div>

                      {/* Nome do parceiro */}
                      <motion.h3 
                        className="text-lg font-bold text-white/90 text-center mb-2"
                        animate={{ 
                          color: isHovered ? partner.color : 'rgba(255,255,255,0.9)'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {partner.name}
                      </motion.h3>
                      
                      {/* Ícone de external link animado */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div 
                            className="inline-flex items-center gap-1 mt-1"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span 
                              className="text-xs font-medium uppercase tracking-wider"
                              style={{ color: partner.color }}
                            >
                              Visitar
                            </span>
                            <ExternalLink 
                              size={14} 
                              style={{ color: partner.color }}
                              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Overlay gradiente sutil no hover */}
                      <motion.div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${partner.color}15 0%, transparent 70%)`
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </motion.a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Digital Solutions with Image */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-[#6a00a3]/10 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" 
              className="relative z-10 rounded-2xl shadow-xl w-full h-auto" 
              alt="ILUNGI Solutions"
            />
          </div>
          <div>
            <span className="text-[#6a00a3] font-bold uppercase tracking-widest text-sm mb-4 block">
              {lang === 'pt' ? 'Tecnologia & inovação' : 'Technology & Innovation'}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-6 leading-tight">
              {t.home.solutions.title}
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-base">
              {t.home.solutions.desc}
            </p>
            <div className="space-y-3 mb-8">
              {[t.home.solutions.feature1, t.home.solutions.feature2, t.home.solutions.feature3].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <ChevronRight className="w-3 h-3" />
                  </div>
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/solucoes" className="px-8 py-3 bg-[#1B3C2B] text-white rounded-full font-bold hover:bg-[#142d20] transition-all inline-block">
              {t.home.solutions.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
