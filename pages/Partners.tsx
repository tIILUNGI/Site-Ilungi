import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Handshake, ArrowRight, Star, Shield, TrendingUp, Users, ChevronRight } from 'lucide-react';
import { useAppContext } from '../App';
import { Link } from 'react-router-dom';
import { loadData } from '../lib/dataSync';

const partners = [
  { 
    name: "GPMOi", 
    url: "https://gpmoi.org/", 
    desc: {
      pt: "Especialistas em Governan\u00e7a de Projectos e Gest\u00e3o Estrat\u00e9gica.",
      en: "Specialists in Project Governance and Strategic Management."
    },
    logo: "/imagens/GPMoi.png",
    color: "#6a00a3"
  },
  { 
    name: "CFC Institute", 
    url: "https://cfc-institute.org/", 
    desc: {
      pt: "Institui\u00e7\u00e3o l\u00edder em certifica\u00e7\u00e3o financeira e compliance.",
      en: "Leading institution in financial certification and compliance."
    },
    logo: "/imagens/CFC-institute.png",
    color: "#0A4D8C"
  },
  { 
    name: "Universal Certification and Services", 
    url: "https://unicertservices.com/", 
    desc: {
      pt: "L\u00edder em certifica\u00e7\u00e3o e servi\u00e7os de conformidade internacional.",
      en: "Leader in certification and international compliance services."
    },
    logo: "/imagens/UCS.png",
    color: "#6c0606"
  },
  { 
    name: "Nova Select", 
    url: "https://novaselect.co/index.html", 
    desc: {
      pt: "Desde a primeira conversa at\u00e9 a entrega final, entregamos crescimento mensur\u00e1vel. Especialistas em enfrentar desafios digitais complexos com design bem elaborado, criatividade e engenharia de precis\u00e3o.",
      en: "From the first conversation to final delivery, we deliver measurable growth. Specialists in tackling complex digital challenges with thoughtful design, creativity, and precision engineering."
    },
    logo: "/imagens/Nova Select.png",
    color: "#f06d16"
  },
  { 
    name: "Ixi Ambiental", 
    url: "https://www.ixiambiental.co.ao/", 
    desc: {
      pt: "Parceiro estrat\u00e9gico para solu\u00e7\u00f5es de sustentabilidade em Angola.",
      en: "Strategic partner for sustainability solutions in Angola."
    },
    logo: "/imagens/Ixi Ambiental.png",
    color: "#2E7D5E"
  }
];

const Partners: React.FC = () => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [isHoveringCTA, setIsHoveringCTA] = React.useState(false);
  const [partnerList, setPartnerList] = useState(partners);

  useEffect(() => {
    loadData('partners', 'ilungi_partners_data', partners).then(data => {
      setPartnerList(data);
    });
  }, []);

  // Função para truncar texto com elegância
  const truncateText = (text: string, maxLength: number = 90) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Benefícios de ser parceiro
  const benefits = [
    { icon: <TrendingUp className="w-5 h-5" />, title: "Crescimento Mútuo", desc: "Expanda seu portfólio com nossas soluções" },
    { icon: <Shield className="w-5 h-5" />, title: "Certificação Oficial", desc: "Torne-se um parceiro certificado ILUNGI" },
    { icon: <Users className="w-5 h-5" />, title: "Rede Exclusiva", desc: "Acesso a eventos e networking estratégico" },
    { icon: <Star className="w-5 h-5" />, title: "Suporte Prioritário", desc: "Equipe dedicada para parceiros" }
  ];

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
                            alt={p.name} 
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
                                  {isPt ? (
                                    <span>Crescimento</span>
                                  ) : (
                                    <span>Measurable</span>
                                  )}
                                </>
                              ) : (
                                truncateText(isPt ? p.desc.pt : p.desc.en, 85)
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
                          <ExternalLink size={14} className="partner-link-icon transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
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
          className="relative rounded-[3rem] overflow-hidden"
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
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
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
            className="absolute -bottom-32 -left-20 w-80 h-80 bg-[#6a00a3]/20 rounded-full blur-3xl"
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
          <div className="relative z-20 p-12 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Coluna da esquerda - Texto e CTA */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-8">
                  <Handshake className="w-4 h-4 text-white" />
                  <span className="text-xs font-medium text-white uppercase tracking-wider">
                    {lang === 'pt' ? 'OPORTUNIDADE EXCLUSIVA' : 'EXCLUSIVE OPPORTUNITY'}
                  </span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                  {lang === 'pt' ? 'Torne-se Nosso Parceiro' : 'Become Our Partner'}
                </h2>
                
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  {lang === 'pt' 
                    ? 'Junte-se ao nosso ecossistema de parcerias e leve soluções de excelência para seus clientes. Acesso a treinamentos, certificações e oportunidades exclusivas.'
                    : 'Join our partnership ecosystem and bring excellence solutions to your clients. Access to training, certifications, and exclusive opportunities.'}
                </p>

                {/* Benefícios em grid */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {benefits.map((benefit, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                        <div className="text-white">
                          {benefit.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{benefit.title}</h4>
                        <p className="text-white/60 text-xs">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Botão CTA principal */}
                <Link to="/contacto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-10 py-5 bg-white rounded-full shadow-2xl overflow-hidden"
                  >
                    {/* Efeito de brilho no hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-[#6a00a3] to-[#1B3C2B] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    <span className="relative z-10 flex items-center space-x-3">
                      <span className="text-lg font-black text-[#1B3C2B] group-hover:text-white transition-colors duration-500">
                        {lang === 'pt' ? 'QUERO SER PARCEIRO' : 'BECOME A PARTNER'}
                      </span>
                      <motion.div
                        animate={{ x: isHoveringCTA ? [0, 5, 0] : 0 }}
                        transition={{ duration: 1.5, repeat: isHoveringCTA ? Infinity : 0 }}
                      >
                        <ArrowRight className="w-6 h-6 text-[#1B3C2B] group-hover:text-white transition-colors duration-500" />
                      </motion.div>
                    </span>
                  </motion.button>
                </Link>

                {/* Texto adicional */}
                <p className="text-white/50 text-sm mt-4 flex items-center space-x-1">
                  <span>✓</span>
                  <span>{lang === 'pt' ? 'Sem compromisso • Respondemos em até 24h' : 'No commitment • We reply within 24h'}</span>
                </p>
              </motion.div>

              {/* Coluna da direita - Estatísticas e Destaques */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                {/* Card de estatísticas */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <h3 className="text-white font-bold text-xl mb-6 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-300 fill-yellow-300" />
                    {lang === 'pt' ? 'Impacto da Rede' : 'Network Impact'}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-black text-white">15+</div>
                      <div className="text-white/60 text-sm">{lang === 'pt' ? 'Parceiros Ativos' : 'Active Partners'}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white">+50</div>
                      <div className="text-white/60 text-sm">{lang === 'pt' ? 'Projetos Conjuntos' : 'Joint Projects'}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white">100%</div>
                      <div className="text-white/60 text-sm">{lang === 'pt' ? 'Satisfação' : 'Satisfaction'}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white">24/7</div>
                      <div className="text-white/60 text-sm">{lang === 'pt' ? 'Suporte VIP' : 'VIP Support'}</div>
                    </div>
                  </div>
                </div>

                {/* Depoimento/Chamada secundária */}
                <div className="bg-gradient-to-br from-[#6a00a3]/30 to-[#1B3C2B]/30 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white/90 text-sm italic mb-2">
                        "A parceria com ILUNGI transformou nosso portfólio e abriu novas oportunidades de negócio."
                      </p>
                      <p className="text-white font-bold text-xs">— Parceiro Certificado</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <Link to="/contacto" className="flex items-center justify-between group/link">
                      <span className="text-white font-medium text-sm">
                        {lang === 'pt' ? 'Saiba mais sobre o programa' : 'Learn more about the program'}
                      </span>
                      <ChevronRight className="w-5 h-5 text-white group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Selo de confiança */}
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/50 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">IL</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-white/60 text-xs">
                    {lang === 'pt' ? 'Junte-se a empresas que já confiam' : 'Join companies that already trust us'}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;
