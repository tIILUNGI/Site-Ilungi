import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../App';
import { Link } from 'react-router-dom';

/* ── Reusable Animation Variants (Unicert-style) ── */
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── Data ── */
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

const Home: React.FC = () => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';

  const serviceImages = [
    {
      src: "/imagens/ilungi_logo.jpg",
      title: "ILUNGI",
      subtitle: isPt ? "Excelência em Consultoria" : "Consulting Excellence",
      heroTitle: isPt ? "Consultoria de Excelência" : "Excellence Consulting",
      heroSubtitle: isPt
        ? "Soluções integradas para impulsionar a competitividade e sustentabilidade da sua empresa."
        : "Integrated solutions to boost your company's competitiveness and sustainability."
    },
    {
      src: "/Silde.jpg",
      title: "ILUNGI",
      subtitle: isPt ? "Excelência em Consultoria" : "Consulting Excellence",
      heroTitle: isPt ? "Consultoria de Excelência" : "Excellence Consulting",
      heroSubtitle: isPt
        ? "Soluções integradas para impulsionar a competitividade e sustentabilidade da sua empresa."
        : "Integrated solutions to boost your company's competitiveness and sustainability."
    },
    {
      src: "/imagens/ISO.png",
      title: "ISO 9001",
      subtitle: isPt ? "Gestão da Qualidade" : "Quality Management",
      heroTitle: isPt ? "Excelência em Consultoria" : "Excellence Consulting",
      heroSubtitle: isPt
        ? "Transformamos desafios em oportunidades de crescimento sustentável para sua empresa."
        : "We turn challenges into sustainable growth opportunities for your company."
    },
    {
      src: "/imagens/Notação de Risco.jpg",
      title: isPt ? "Gestão de Risco" : "Risk Management",
      subtitle: isPt ? "Análise Estratégica" : "Strategic Analysis",
      heroTitle: isPt ? "Gestão de Riscos Corporativos" : "Corporate Risk Management",
      heroSubtitle: isPt
        ? "Identificamos e mitigamos riscos para proteger o futuro do seu negócio."
        : "We identify and mitigate risks to protect your business future."
    },
    {
      src: "/imagens/Gestão de Projecto.jpg",
      title: "PMO",
      subtitle: isPt ? "Gestão de Projetos" : "Project Management",
      heroTitle: isPt ? "Gestão de Projetos Estratégicos" : "Strategic Project Management",
      heroSubtitle: isPt
        ? "Impulsionamos a execução de projetos com metodologia comprovada e resultados mensuráveis."
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % serviceImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#1B3C2B]">
        {/* Background image with subtle zoom */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <img
                src={serviceImages[currentSlide].src}
                className="w-full h-full object-cover opacity-30"
                alt={serviceImages[currentSlide].title}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C2B] via-[#1B3C2B]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3C2B] via-transparent to-[#1B3C2B]/40" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero text with Unicert-style staggered entrance */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-white text-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
              className="flex flex-col items-center"
            >
              {/* Overline tag */}
              <motion.span
                variants={staggerItem}
                className="inline-block text-sm uppercase tracking-[0.3em] text-white/60 font-semibold mb-6 border border-white/20 px-5 py-2 rounded-full backdrop-blur-sm"
              >
                {serviceImages[currentSlide].title} &mdash; {serviceImages[currentSlide].subtitle}
              </motion.span>

              {/* Main title - large, bold, Unicert-style */}
              <motion.h1
                variants={staggerItem}
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] mb-8 tracking-tight text-balance"
              >
                {serviceImages[currentSlide].heroTitle}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={staggerItem}
                className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light max-w-2xl mx-auto"
              >
                {serviceImages[currentSlide].heroSubtitle}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-5 justify-center"
              >
                <Link
                  to="/contacto"
                  className="px-10 py-4 bg-[#6a00a3] rounded-full font-bold text-lg hover:bg-[#520b7d] transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-900/40"
                >
                  {t.home.ctaPrimary}
                </Link>
                <Link
                  to="/consultoria"
                  className="px-10 py-4 border border-white/30 backdrop-blur-md rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>{t.home.ctaSecondary}</span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {serviceImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              title={`Slide ${i + 1}`}
              className={`h-3 rounded-full transition-all duration-500 ${
                i === currentSlide ? 'bg-white w-10' : 'bg-white/40 w-3 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 right-8 z-20 hidden lg:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ SERVICES SECTION ═══════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section header with scroll-reveal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.span
              variants={staggerItem}
              className="text-sm uppercase tracking-[0.2em] text-[#6a00a3] font-semibold"
            >
              {isPt ? 'Nossas Competências' : 'Our Capabilities'}
            </motion.span>
            <motion.h2
              variants={staggerItem}
              className="text-4xl md:text-5xl font-black text-[#1B3C2B] mt-4 mb-6"
            >
              {isPt ? 'Soluções Integradas' : 'Integrated Solutions'}
            </motion.h2>
            <motion.div variants={staggerItem} className="flex justify-center mb-6">
              <div className="w-16 h-1.5 bg-[#6a00a3] rounded-full" />
            </motion.div>
            <motion.p
              variants={staggerItem}
              className="max-w-2xl mx-auto text-lg text-slate-500 font-light"
            >
              {isPt
                ? 'Da estratégia à execução, entregamos excelência em cada projeto'
                : 'From strategy to execution, we deliver excellence in every project'}
            </motion.p>
          </motion.div>

          {/* Service cards with staggered scroll-reveal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Link to={service.path} className="block group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                    <div className="relative h-48 lg:h-56">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2 block">
                          {isPt ? 'Solução' : 'Solution'} {index + 1} / {services.length}
                        </span>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed line-clamp-2 mb-4">
                          {service.desc}
                        </p>
                        <span className="inline-block px-4 py-2 bg-[#6a00a3] text-white rounded-lg font-semibold text-sm group-hover:bg-[#520b7d] transition-colors duration-300">
                          {isPt ? 'Saber mais' : 'Learn more'} &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PARTNERS SECTION ═══════════════ */}
      <section className="py-20 bg-[#1B3C2B]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section header with scroll-reveal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={staggerItem}
              className="text-sm uppercase tracking-[0.2em] text-white/60 font-semibold"
            >
              {t.home.partners}
            </motion.span>
            <motion.h2
              variants={staggerItem}
              className="text-3xl md:text-4xl font-black text-white mt-4 mb-4"
            >
              {isPt ? 'Parceiros Estratégicos' : 'Strategic Partners'}
            </motion.h2>
            <motion.div variants={staggerItem} className="w-20 h-1.5 bg-[#6a00a3] mx-auto rounded-full" />
          </motion.div>

          {/* Partner cards with staggered scroll-reveal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {partners.map((partner, i) => {
              const isHovered = hoveredPartner === i;

              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  onHoverStart={() => setHoveredPartner(i)}
                  onHoverEnd={() => setHoveredPartner(null)}
                  className="relative"
                >
                  {/* Bottom line animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-current z-10"
                    style={{ color: partner.color }}
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  />

                  <motion.a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full group"
                    animate={{ y: isHovered ? -5 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center relative overflow-hidden border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="w-28 h-28 mb-4 relative flex items-center justify-center">
                        <motion.div
                          className="absolute inset-0 border-2 rounded-xl"
                          style={{ borderColor: partner.color }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.95,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="w-full h-full relative z-10 bg-white rounded-xl overflow-hidden">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-full h-full object-contain transition-all duration-500 p-1 partner-logo"
                          />
                        </div>
                      </div>

                      <motion.h3
                        className="text-lg font-bold text-white/90 text-center mb-2"
                        animate={{ color: isHovered ? partner.color : 'rgba(255,255,255,0.9)' }}
                        transition={{ duration: 0.3 }}
                      >
                        {partner.name}
                      </motion.h3>

                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="inline-flex items-center gap-1 mt-1"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="text-xs font-medium uppercase tracking-wider partner-link-text">
                              {isPt ? 'Visitar' : 'Visit'}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div
                        className="absolute inset-0 pointer-events-none partner-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </motion.a>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ DIGITAL SOLUTIONS ═══════════════ */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image - slide in from left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInLeft}
            custom={0}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#6a00a3]/10 rounded-full blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
              className="relative z-10 rounded-2xl shadow-xl w-full h-auto"
              alt="ILUNGI Solutions"
            />
          </motion.div>

          {/* Text content - slide in from right, staggered children */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInRight}
              custom={0}
              className="text-[#6a00a3] font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              {isPt ? 'Tecnologia & inovação' : 'Technology & Innovation'}
            </motion.span>

            <motion.h2
              variants={fadeInRight}
              custom={0.1}
              className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6 leading-tight"
            >
              {t.home.solutions.title}
            </motion.h2>

            <motion.p
              variants={fadeInRight}
              custom={0.2}
              className="text-slate-600 mb-8 leading-relaxed text-base"
            >
              {t.home.solutions.desc}
            </motion.p>

            <motion.div variants={fadeInRight} custom={0.3} className="flex flex-col gap-3 mb-10">
              {[t.home.solutions.feature1, t.home.solutions.feature2, t.home.solutions.feature3].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-700">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInRight} custom={0.6}>
              <Link
                to="/solucoes"
                className="px-8 py-3 bg-[#1B3C2B] text-white rounded-full font-bold hover:bg-[#142d20] transition-all duration-300 inline-block hover:shadow-lg transform hover:scale-105"
              >
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
