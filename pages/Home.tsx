
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Target, Users, BarChart, ChevronRight } from 'lucide-react';
import { useAppContext } from '../App';
import { Link } from 'react-router-dom';

const partnerLogos = [
  { name: "GPMOi", url: "https://gpmoi.org/", logo: "/imagens/GPMoi.png" },
  { name: "CFC Institute", url: "https://cfc-institute.org/", logo: "/imagens/CFC-institute.png" },
  { name: "UCS", url: "https://www.ucs.br/site", logo: "/imagens/Captura de Ecrã (30).png" },
  { name: "Nova Select", url: "https://novaselect.co/index.html", logo: "/imagens/Captura de Ecrã (31).png" },
  { name: "Ixi Ambiental", url: "https://www.ixiambiental.co.ao/", logo: "/imagens/Captura de Ecrã (32).png" },
];

const serviceImages = [
  { src: "/imagens/ISO.png", title: "ISO 9001", subtitle: "Gestão da Qualidade" },
  { src: "/imagens/Notação de Risco.jpg", title: "Gestão de Risco", subtitle: "Análise Estratégica" },
  { src: "/imagens/Gestão de Projecto.jpg", title: "PMO", subtitle: "Gestão de Projetos" },
  { src: "/imagens/ilungi_logo.jpg", title: "ILUNGI", subtitle: "Excelência em Consultoria" },
];

const Home: React.FC = () => {
  const { t, lang } = useAppContext();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate service images (includes logo)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % serviceImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { title: t.home.services.iso, desc: t.home.services.isoDesc, icon: <Shield className="w-8 h-8" />, path: "/consultoria/iso" },
    { title: t.home.services.projects, desc: t.home.services.projectsDesc, icon: <Target className="w-8 h-8" />, path: "/consultoria/pmo" },
    { title: t.home.services.tech, desc: t.home.services.techDesc, icon: <BarChart className="w-8 h-8" />, path: "/solucoes" },
    { title: t.home.services.academy, desc: t.home.services.academyDesc, icon: <Users className="w-8 h-8" />, path: "/academia" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Service Slider (includes logo) */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-[#1B3C2B]">
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                    {t.home.heroTitle}
                </h1>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
                    {t.home.heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
                    <Link to="/contacto" className="px-10 py-4 bg-[#6B0FA3] rounded-full font-bold text-lg hover:bg-[#520b7d] transition-all transform hover:scale-105 shadow-2xl shadow-purple-900/40">
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

      {/* Services Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B3C2B] mb-4">
                  {lang === 'pt' ? 'Nossos Serviços' : 'Our Services'}
                </h2>
                <div className="w-20 h-1.5 bg-[#6B0FA3] mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((s, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-purple-500/10 transition-all group"
                    >
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#1B3C2B] mb-4 shadow-sm group-hover:bg-[#1B3C2B] group-hover:text-white transition-all">
                            {s.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                        <Link to={s.path} className="text-[#6B0FA3] font-bold flex items-center text-sm group-hover:translate-x-2 transition-transform">
                            {lang === 'pt' ? 'Ver mais' : 'Learn more'} <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Partners Carousel - All at once */}
      <section className="py-8 bg-[#1B3C2B]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-white/60 text-sm mb-6">
            {t.home.partners}
          </p>
          <div className="flex justify-center items-center flex-wrap gap-8">
            {partnerLogos.map((partner, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.15, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <a 
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-20 w-auto object-contain rounded-2xl border-2 border-[#1B3C2B] hover:opacity-80 transition-opacity bg-white/50"
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Solutions with Image */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
                <div className="absolute -inset-4 bg-[#6B0FA3]/10 rounded-full blur-3xl"></div>
                <img 
                    src="/imagens/Soluções Digitasi.png" 
                    className="relative z-10 rounded-2xl shadow-xl w-full h-auto" 
                    alt="ILUNGI Solutions"
                />
            </div>
            <div>
                <span className="text-[#6B0FA3] font-bold uppercase tracking-widest text-sm mb-4 block">
                  {lang === 'pt' ? 'Tecnologia & Inovação' : 'Technology & Innovation'}
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
