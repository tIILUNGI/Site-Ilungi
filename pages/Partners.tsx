import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useAppContext } from '../App';

const partners = [
  { 
    name: "GPMOi", 
    url: "https://gpmoi.org/", 
    desc: "Especialistas em Governança de Projectos e Gestão Estratégica.",
    logo: "/imagens/GPMoi.png",
    color: "#1B3C2B"
  },
  { 
    name: "CFC Institute", 
    url: "https://cfc-institute.org/", 
    desc: "Instituição líder em certificação financeira e compliance.",
    logo: "/imagens/CFC-institute.png",
    color: "#0A4D8C"
  },
  { 
    name: "UCS", 
    url: "https://www.ucs.br/site", 
    desc: "Universidade de Caxias do Sul - Parceria em investigação académica.",
    logo: "/imagens/UCS.png",
    color: "#B31B1B"
  },
  { 
    name: "Nova Select", 
    url: "https://novaselect.co/index.html", 
    desc: "Desde a primeira conversa até a entrega final, entregamos crescimento mensurável. Especialistas em enfrentar desafios digitais complexos com design bem elaborado, criatividade e engenharia de precisão.",
    logo: "/imagens/Nova Select.png",
    color: "#5A3E2B"
  },
  { 
    name: "Ixi Ambiental", 
    url: "https://www.ixiambiental.co.ao/", 
    desc: "Parceiro estratégico para soluções de sustentabilidade em Angola.",
    logo: "/imagens/Ixi Ambiental.png",
    color: "#2E7D5E"
  }
];

const Partners: React.FC = () => {
  const { t, lang } = useAppContext();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  // Função para truncar texto com elegância
  const truncateText = (text: string, maxLength: number = 90) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((p, i) => {
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
                        animate={{
                          borderColor: isHovered ? p.color : '#f1f5f9'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Borda animada */}
                        <motion.div 
                          className="absolute inset-0 border-2 rounded-xl"
                          style={{ borderColor: p.color }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ 
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.95
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Container da imagem */}
                        <div className="w-full h-full relative z-10 p-2">
                          <img 
                            src={p.logo} 
                            alt={p.name} 
                            className="w-full h-full object-contain transition-all duration-500"
                            style={{
                              filter: isHovered ? 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' : 'none',
                              transform: isHovered ? 'scale(1.02)' : 'scale(1)'
                            }}
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
                        {p.name}
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
                                  <span className="font-medium text-slate-700">Crescimento mensurável</span>
                                  {" · "}Design estratégico · Engenharia de precisão
                                </>
                              ) : (
                                truncateText(p.desc, 85)
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
                          <span 
                            className="text-[10px] font-medium uppercase tracking-wider"
                            style={{ color: p.color }}
                          >
                            Visitar
                          </span>
                          <ExternalLink 
                            size={14} 
                            style={{ color: p.color }}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Overlay gradiente */}
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${p.color}08 0%, transparent 70%)`
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
    </div>
  );
};

export default Partners;