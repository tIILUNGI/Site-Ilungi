import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { loadData } from '../lib/dataSync';

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
      <div className="absolute top-20 left-0 w-64 h-64 bg-[#6a00a3]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#1B3C2B]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-[#1B3C2B]/10 text-[#1B3C2B] rounded-full text-sm font-black uppercase mb-6 tracking-wider"
          >
            {isPt ? 'Especialidades ILUNGI' : 'ILUNGI Specialties'}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-[#1B3C2B] mb-6 relative"
          >
            {t.consulting.title}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#6a00a3] rounded-full"></span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-xl text-slate-500 font-light mt-8"
          >
            {t.consulting.subtitle}
          </motion.p>
        </div>

        {/* Áreas de Consultoria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {areas.map((area, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white"
            >
              {/* Borda colorida no hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6a00a3] to-[#1B3C2B] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-[22px] m-0.5">
              <Link to={area.path} className="block">
                {/* Container da imagem - quadrado perfeito */}
                <div className="relative aspect-square overflow-hidden">
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
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                      {area.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span 
                        className="text-xs px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium inline-flex items-center"
                        style={{ border: `1px solid ${area.color}60` }}
                      >
                        {isPt ? 'Explorar área' : 'Explore area'}
                      </span>
                    </div>
                  </motion.div>

                  {/* Badge circular com cor da área */}
                  <div className="absolute top-6 right-6 z-20">
                    <div 
                      className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center"
                      style={{ backgroundColor: `${area.color}80` }}
                    >
                      <span className="text-white font-bold text-lg">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo em baixo da imagem - aparece no hover */}
                <motion.div 
                  className="p-6 bg-white"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {area.desc}
                  </p>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 inline-flex items-center space-x-1 font-semibold text-sm"
                    style={{ color: area.color }}
                  >
                    <span>{isPt ? 'Saber mais' : 'Learn more'}</span>
                  </motion.div>
                </motion.div>

                {/* Linha decorativa na cor da área */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1"
                  style={{ backgroundColor: area.color }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section - Porqué a ILUNGI */}
        <div className="relative bg-gradient-to-r from-[#1B3C2B] via-[#2E7D5E] to-[#1B3C2B] rounded-[3rem] overflow-hidden p-12 lg:p-20 text-white">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#6a00a3]/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#6a00a3]/10 blur-3xl rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-transparent via-transparent to-black/20"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-8 relative"
              >
                {t.consulting.whyTitle}
                <span className="absolute -bottom-3 left-0 w-20 h-1 bg-[#6a00a3] rounded-full"></span>
              </motion.h2>
              <div className="space-y-5">
                {Array.isArray(t.consulting.features) ? (
                  t.consulting.features.map((item: string, i: number) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-2 h-2 bg-[#6a00a3] rounded-full"></div>
                      <span className="text-base md:text-lg font-medium text-slate-200">{item}</span>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-[#6a00a3] rounded-full"></div>
                    <span className="text-base md:text-lg font-medium text-slate-200">{t.consulting.features}</span>
                  </div>
                )}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center lg:text-right"
            >
              <Link 
                to="/contacto" 
                className="inline-block px-10 py-4 bg-[#6a00a3] text-white rounded-full font-bold text-lg hover:bg-[#520b7d] transition-all transform hover:scale-105 shadow-2xl shadow-purple-900/40"
              >
                {t.consulting.cta}
              </Link>
              <p className="text-sm text-white/60 mt-3">
                {isPt ? 'Consultoria personalizada para o seu negócio' : 'Tailored consulting for your business'}
              </p>
            </motion.div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Consulting;
