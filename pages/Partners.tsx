import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../App';
import { Link } from 'react-router-dom';
import { loadData } from '../lib/dataSync';
import { defaultPartners } from '../lib/partnersData';

const Partners: React.FC = () => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [isHoveringCTA, setIsHoveringCTA] = React.useState(false);
  const [partnerList, setPartnerList] = useState(defaultPartners);

  useEffect(() => {
    loadData('partners', 'ilungi_partners_data', defaultPartners).then(data => {
      setPartnerList(data);
    });
  }, []);

  // Função para truncar texto com elegância
  const truncateText = (text: string, maxLength: number = 90) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getLocalized = (val: any) => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') {
      return val[lang] || val.pt || val.en || '';
    }
    return '';
  };

  return (
    <div className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-partners" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6a00a3" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-partners)" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 bg-[#6a00a3]/10 text-[#6a00a3] rounded-full text-sm font-black uppercase mb-6 tracking-wider"
          >
            {lang === 'pt' ? 'ECOSSISTEMA DE PARCERIAS' : 'PARTNERSHIP ECOSYSTEM'}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-black text-[#1B3C2B] mb-6"
          >
            {t.partners.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-slate-500 font-light"
          >
            {t.partners.subtitle}
          </motion.p>
        </div>

        {/* Grid de Parceiros */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-24">
          {partnerList.map((p, i) => {
            const isHovered = hoveredIndex === i;
            const isNovaSelect = p.name === "Nova Select";
            
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative h-full"
              >
                {/* Linha da esquerda para direita */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-current z-10"
                  style={{ color: p.color }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: isHovered ? '100%' : 0,
                    transition: { 
                      duration: 0.4,
                      ease: [0.23, 1, 0.32, 1]
                    }
                  }}
                />
                
                {/* Card principal */}
                <motion.a 
                  href={p.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-full group"
                  animate={{
                    y: isHovered ? -8 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/40 flex flex-col items-center relative overflow-hidden h-full">
                    
                    {/* Quadrado com foto de lado */}
                    <div className="w-full aspect-square p-6 relative">
                      <motion.div 
                        className="w-full h-full relative flex items-center justify-center"
                      >
                        {/* Borda completa com cor do parceiro */}
                        <div 
                          className="absolute inset-0 border-2 rounded-xl partner-border"
                        />
                        
                        {/* Container da imagem */}
                        <div className="w-full h-full relative z-10 p-2">
                          <img 
                            src={p.logo} 
                            alt={getLocalized(p.name)} 
                            className="w-full h-full object-contain transition-all duration-500 partner-logo"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Informações do parceiro */}
                    <div className="w-full p-5 pt-0 text-center flex-grow flex flex-col">
                      <motion.h3 
                        className="text-lg font-bold text-slate-800 mb-2"
                        animate={{ 
                          color: isHovered ? p.color : '#1e293b'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {getLocalized(p.name)}
                      </motion.h3>
                      
                      {/* Descrição com altura dinâmica */}
                      <AnimatePresence mode="wait">
                        {isHovered && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden"
                          >
                            <p className={`text-xs text-slate-500 leading-relaxed ${isNovaSelect ? 'font-light' : ''}`}>
                              {isNovaSelect ? (
                                <>
                                  {isPt ? (
                                    <span>Crescimento</span>
                                  ) : (
                                    <span>Measurable</span>
                                  )}
                                </>
                              ) : (
                                truncateText(getLocalized(p.desc), 85)
                              )}
                            </p>
                            
                            {/* Badge sutil para Nova Select */}
                            {isNovaSelect && isHovered && (
                              <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="inline-block mt-2 px-2 py-0.5 bg-amber-50 rounded-full"
                              >
                                <span className="text-[10px] font-medium text-amber-700">
                                  Digital Growth Partners
                                </span>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Ícone de external link */}
                      <motion.div 
                        className="inline-flex mt-2 justify-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: isHovered ? 1 : 0,
                          x: isHovered ? 0 : -10
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-medium uppercase tracking-wider partner-link-text">
                            Visitar
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Overlay gradiente */}
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
        </div>

        {/* SEÇÃO TORNE-SE NOSSO PARCEIRO - BONITA E CHAMATIVA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] overflow-hidden"
          onHoverStart={() => setIsHoveringCTA(true)}
          onHoverEnd={() => setIsHoveringCTA(false)}
        >
          {/* Fundo com gradiente animado */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B3C2B] via-[#2E5E4A] to-[#6a00a3]"></div>
          
          {/* Overlay com padrão geométrico */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="partner-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="2" fill="white"/>
                  <circle cx="40" cy="30" r="2" fill="white"/>
                  <circle cx="20" cy="50" r="2" fill="white"/>
                  <path d="M30 10 L50 30 M10 40 L30 50" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#partner-pattern)"/>
            </svg>
          </div>
          
          {/* Círculos decorativos animados */}
          <motion.div 
            className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute -bottom-32 -left-20 w-64 h-64 bg-[#6a00a3]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Conteúdo principal */}
          <div className="relative z-20 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Coluna da esquerda - Texto e CTA */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-6">
                  <span className="text-xs font-medium text-white uppercase tracking-wider">
                    {lang === 'pt' ? 'OPORTUNIDADE EXCLUSIVA' : 'EXCLUSIVE OPPORTUNITY'}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                  {lang === 'pt' ? 'Torne-se Nosso Parceiro' : 'Become Our Partner'}
                </h2>
                
                <p className="text-white/80 text-base lg:text-lg mb-6 leading-relaxed">
                  {lang === 'pt' 
                    ? 'Junte-se ao nosso ecossistema de parcerias e leve soluções de excelência para seus clientes. Acesso a treinamentos, certificações e oportunidades exclusivas.'
                    : 'Join our partnership ecosystem and bring excellence solutions to your clients. Access to training, certifications, and exclusive opportunities.'}
                </p>

                {/* Botão CTA principal */}
                <Link to="/contacto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-white rounded-full shadow-2xl overflow-hidden"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-[#6a00a3] to-[#1B3C2B] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    <span className="relative z-10 flex items-center space-x-3 text-base font-black text-[#1B3C2B] group-hover:text-white transition-colors duration-500">
                      {lang === 'pt' ? 'QUERO SER PARCEIRO' : 'BECOME A PARTNER'}
                    </span>
                  </motion.button>
                </Link>

                {/* Texto adicional */}
                <p className="text-white/50 text-sm mt-3 flex items-center space-x-1">
                  <span>✓</span>
                  <span>{lang === 'pt' ? 'Sem compromisso • Respondemos em até 24h' : 'No commitment • We reply within 24h'}</span>
                </p>
              </motion.div>

              {/* Coluna da direita - Selo de confiança */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;
