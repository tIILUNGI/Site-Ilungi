import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { loadData } from '../lib/dataSync';

// Animation variants
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

const Consulting: React.FC = () => {
  const { t, lang, isDark } = useAppContext();
  const isPt = lang === 'pt';

  const defaultAreas = [
    {
      id: "iso",
      title: t.consultingAreas.iso.title,
      desc: t.consultingAreas.iso.desc,
      image: "/imagens/ISO.png",
      path: "/consultoria/iso",
      color: "#1B3C2B"
    },
    {
      id: "risk",
      title: t.consultingAreas.risk.title,
      desc: t.consultingAreas.risk.desc,
      image: "/imagens/Notação de Risco.jpg",
      path: "/consultoria/risco",
      color: "#6a00a3"
    },
    {
      id: "procurement",
      title: t.consultingAreas.procurement.title,
      desc: t.consultingAreas.procurement.desc,
      image: "/imagens/procurement.png",
      path: "/consultoria/procurement",
      color: "#0A4D8C"
    },
    {
      id: "pmo",
      title: t.consultingAreas.pmo.title,
      desc: t.consultingAreas.pmo.desc,
      image: "/imagens/Gestão de Projecto.jpg",
      path: "/consultoria/pmo",
      color: "#B31B1B"
    }
  ];

  const [areas, setAreas] = useState(defaultAreas);

  useEffect(() => {
    loadData('services', 'ilungi_services_data', defaultAreas).then(data => {
      setAreas(data);
    });
  }, [t.consultingAreas]);

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
      <motion.div 
        animate={{ 
          x: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-0 w-64 h-64 bg-[#6a00a3]/5 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          x: [0, -30, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 right-0 w-96 h-96 bg-[#1B3C2B]/5 rounded-full blur-3xl"
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
            className="inline-block px-6 py-2 bg-[#1B3C2B]/10 text-[#1B3C2B] rounded-full text-sm font-black uppercase mb-6 tracking-wider"
          >
            {isPt ? 'Especialidades ILUNGI' : 'ILUNGI Specialties'}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-[#1B3C2B] mb-6 relative"
          >
            {t.consulting.title}
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-[#6a00a3] rounded-full"
            />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-3xl mx-auto text-xl text-slate-500 font-light mt-8"
          >
            {t.consulting.subtitle}
          </motion.p>
        </motion.div>

        {/* Áreas de Consultoria */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24"
        >
          {areas.map((area, i) => (
            <motion.div 
              key={i}
              variants={cardVariants}
              custom={i}
              whileHover={{ y: -12 }}
              className="group relative"
            >
              {/* Borda colorida no hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6a00a3] to-[#1B3C2B] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-[22px] m-0.5 shadow-xl group-hover:shadow-2xl transition-all duration-500">
              <Link to={area.path} className="block">
                {/* Container da imagem - quadrado perfeito */}
                <div className="relative aspect-square overflow-hidden rounded-t-[22px]">
                  {/* Overlay gradiente */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"
                    initial={{ opacity: 0.4 }}
                    whileHover={{ opacity: 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Imagem específica da área */}
                  <motion.img 
                    src={area.image} 
                    alt={area.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Título sobre a imagem */}
                  <motion.div 
                    className="absolute bottom-6 left-6 z-20"
                    whileHover={{ y: -3 }}
                  >
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                      {area.title}
                    </h3>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center space-x-2"
                    >
                      <span 
                        className="text-xs px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium"
                        style={{ border: `1px solid ${area.color}60` }}
                      >
                        {isPt ? 'Explorar área' : 'Explore area'}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Badge circular com cor da área */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                    className="absolute top-6 right-6 z-20"
                  >
                    <div 
                      className="w-14 h-14 rounded-full backdrop-blur-sm flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: `${area.color}90` }}
                    >
                      <span className="text-white font-bold text-xl">
                        {i + 1}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Conteúdo em baixo da imagem */}
                <motion.div 
                  className="p-8 bg-white"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-slate-600 leading-relaxed text-base">
                    {area.desc}
                  </p>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 inline-flex items-center space-x-2 font-semibold text-sm"
                    style={{ color: area.color }}
                  >
                    <span>{isPt ? 'Saber mais' : 'Learn more'}</span>
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                  </motion.div>
                </motion.div>

                {/* Linha decorativa na cor da área */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1.5"
                  style={{ backgroundColor: area.color }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section - Porqué a ILUNGI */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-[#1B3C2B] via-[#2E7D5E] to-[#1B3C2B] rounded-[3rem] overflow-hidden p-12 lg:p-20 text-white"
        >
          {/* Animated background elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-0 right-0 w-1/3 h-full bg-[#6a00a3]/20 blur-3xl rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#6a00a3]/10 blur-3xl rounded-full"
          />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-8 relative"
              >
                {t.consulting.whyTitle}
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute -bottom-3 left-0 h-1 bg-[#6a00a3] rounded-full"
                />
              </motion.h2>
              <div className="space-y-5">
                {Array.isArray(t.consulting.features) ? (
                  t.consulting.features.map((item: string, i: number) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                      className="flex items-center space-x-4"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        className="w-3 h-3 bg-[#6a00a3] rounded-full flex-shrink-0"
                      />
                      <span className="text-base md:text-lg font-medium text-slate-200">{item}</span>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-[#6a00a3] rounded-full"></div>
                    <span className="text-base md:text-lg font-medium text-slate-200">{t.consulting.features}</span>
                  </div>
                )}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center lg:text-right"
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(106, 0, 163, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/contacto" 
                  className="inline-block px-12 py-5 bg-[#6a00a3] text-white rounded-full font-bold text-lg hover:bg-[#520b7d] transition-all shadow-2xl shadow-purple-900/40"
                >
                  {t.consulting.cta}
                </Link>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="text-sm text-white/60 mt-4"
              >
                {isPt ? 'Consultoria personalizada para o seu negócio' : 'Tailored consulting for your business'}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default Consulting;
