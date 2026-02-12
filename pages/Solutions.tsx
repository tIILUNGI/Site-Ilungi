import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Layout, Cpu, Globe, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';

const Solutions: React.FC = () => {
  const { t, lang } = useAppContext();

  const products = [
    {
      name: "Salya",
      tagline: "Gestão de Salários & RH",
      desc: "Plataforma para gestão e emissão de recibos de salário e controle completo de recursos humanos. Automatização de folhas de pagamento, benefícios e compliance trabalhista.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      path: "/solucoes/salya",
      color: "from-purple-600 to-purple-800",
      bgColor: "bg-purple-600"
    },
    {
      name: "SICLIC",
      tagline: "Compliance Intelligence",
      desc: "Sistema inteligente para gestão de compliance legal, contratual e normativo em tempo real. Monitoramento contínuo de obrigações legais e normativas.",
      image: "/imagens/SICLIC.png",
      url: "https://siclic.ao/",
      color: "from-[#1B3C2B] to-[#2E7D5E]",
      bgColor: "bg-[#1B3C2B]"
    },
    {
      name: "Tocomply360",
      tagline: "Governance Framework",
      desc: "Solução 360 graus para governança corporativa, integrando ética, risco e transparência. Framework completo para gestão de compliance e integridade.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      path: "/solucoes/tocomply",
      color: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-600"
    }
  ];

  return (
    <div className="py-20 bg-slate-50 relative overflow-hidden">
      {/* ELEMENTOS TECNOLÓGICOS DE FUNDO - APENAS DECORATIVOS */}
      
      {/* Grade de circuito digital */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6a00a3" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Linhas de conexão tecnológicas */}
      <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6a00a3]/30 to-transparent"></div>
      <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1B3C2B]/30 to-transparent"></div>
      
      {/* Pontos de dados flutuantes */}
      <div className="absolute top-40 left-[10%] w-1 h-1 bg-[#6a00a3]/40 rounded-full animate-pulse"></div>
      <div className="absolute top-60 left-[15%] w-1.5 h-1.5 bg-[#1B3C2B]/40 rounded-full animate-ping opacity-30"></div>
      <div className="absolute bottom-40 right-[10%] w-1 h-1 bg-[#6a00a3]/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-60 right-[15%] w-1.5 h-1.5 bg-[#1B3C2B]/40 rounded-full animate-ping opacity-30"></div>
      
      {/* Círculos concêntricos tecnológicos */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 border border-[#6a00a3]/10 rounded-full"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 border border-[#6a00a3]/5 rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 border border-[#1B3C2B]/10 rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 border border-[#1B3C2B]/5 rounded-full"></div>
      
      {/* Ícones tecnológicos sutis */}
      <div className="absolute top-20 right-[20%] text-[#6a00a3]/5 rotate-12">
        <Cpu size={80} />
      </div>
      <div className="absolute bottom-20 left-[20%] text-[#1B3C2B]/5 -rotate-12">
        <Cloud size={80} />
      </div>
      <div className="absolute top-1/2 left-[5%] text-[#6a00a3]/5">
        <Globe size={60} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header com brilho tecnológico */}
        <div className="text-center mb-24 relative">
          {/* Efeito de brilho no header */}
          <div className="absolute -inset-20 bg-gradient-to-r from-[#6a00a3]/5 via-transparent to-[#1B3C2B]/5 blur-3xl rounded-full"></div>
          
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-[#6a00a3]/10 text-[#6a00a3] rounded-full text-sm font-black uppercase mb-6 tracking-wider backdrop-blur-sm border border-[#6a00a3]/20 relative"
          >
            {lang === 'pt' ? 'Ecossistema Digital ILUNGI' : 'ILUNGI Digital Ecosystem'}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-[#1B3C2B] mb-8 relative"
          >
            {t.solutions.title}
            {/* Linha decorativa tecnológica */}
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#6a00a3] to-[#1B3C2B] rounded-full"></span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-xl text-slate-500 font-light leading-relaxed relative"
          >
            {t.solutions.subtitle}
          </motion.p>
        </div>

        {/* Products Grid - COM IMAGENS CORPORATIVAS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {products.map((product, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl transition-all duration-500"
            >
              {/* Efeito de borda tecnológica no hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6a00a3]/0 via-[#6a00a3]/0 to-[#1B3C2B]/0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              {/* Container da imagem */}
              <div className="relative h-56 overflow-hidden">
                {/* Overlay gradiente com efeito tecnológico */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Overlay de circuito digital na imagem */}
                <div className="absolute inset-0 z-5 opacity-20 mix-blend-overlay">
                  <svg width="100%" height="100%">
                    <pattern id={`circuit-${i}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M10 10 L30 10 M40 20 L20 20 M30 30 L10 30" stroke="white" strokeWidth="0.3" fill="none"/>
                      <circle cx="15" cy="15" r="1" fill="white"/>
                      <circle cx="35" cy="25" r="1" fill="white"/>
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#circuit-${i})`}/>
                  </svg>
                </div>
                
                {/* Imagem corporativa */}
                <motion.img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Logo/Badge sobre a imagem com efeito glassmorphism */}
                <motion.div 
                  className="absolute top-6 left-6 z-20"
                  whileHover={{ scale: 1.05 }}
                >
                  {product.name === "SICLIC" ? (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/30 shadow-xl">
                      <img 
                        src="/imagens/SICLIC.png" 
                        alt="SICLIC" 
                        className="h-10 w-auto brightness-0 invert"
                      />
                    </div>
                  ) : (
                    <div className={`bg-gradient-to-r ${product.color} px-5 py-2.5 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm`}>
                      <span className="text-white font-black text-xl">{product.name}</span>
                    </div>
                  )}
                </motion.div>

                {/* Tagline sobre a imagem */}
                <motion.div 
                  className="absolute bottom-6 left-6 z-20"
                  whileHover={{ y: -3 }}
                >
                  <span className="text-xs px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium inline-block border border-white/30 shadow-lg">
                    {product.tagline}
                  </span>
                </motion.div>

                {/* Indicador tecnológico (pulso) */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-50"></div>
                  </div>
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-8 bg-white relative">
                {/* Linha tecnológica superior */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-3 flex items-center">
                  {product.name}
                  {/* Ícone de verificação tecnológica */}
                  <span className="ml-2 w-5 h-5 bg-gradient-to-r from-[#6a00a3] to-[#1B3C2B] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </span>
                </h3>
                <p className="text-slate-500 leading-relaxed mb-6 text-sm">
                  {product.desc}
                </p>
                
                {/* Call to action com efeito tecnológico */}
                <div className="flex items-center justify-between">
                  {product.url ? (
                    <a 
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 font-bold text-[#1B3C2B] hover:text-[#6a00a3] transition-colors group/link"
                    >
                      <span>Visitar SICLIC</span>
                      <ChevronRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <Link 
                      to={product.path || '#'}
                      className="inline-flex items-center space-x-2 font-bold text-[#1B3C2B] hover:text-[#6a00a3] transition-colors group/link"
                    >
                      <span>{lang === 'pt' ? 'Solicitar Demo' : 'Request Demo'}</span>
                      <ChevronRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  
                  {/* Indicador de tecnologia */}
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${product.bgColor} animate-pulse`}></div>
                    <div className={`w-2 h-2 rounded-full ${product.bgColor} animate-pulse delay-75`}></div>
                    <div className={`w-2 h-2 rounded-full ${product.bgColor} animate-pulse delay-150`}></div>
                  </div>
                </div>
              </div>

              {/* Linha decorativa com gradiente tecnológico */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${product.bgColor.replace('bg-', '')}, #6a00a3, ${product.bgColor.replace('bg-', '')})` 
                }}
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Implementação & Suporte */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
          {/* Elemento tecnológico de fundo */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="w-full h-full bg-gradient-to-r from-[#6a00a3]/5 via-transparent to-[#1B3C2B]/5 blur-3xl rounded-full"></div>
          </div>
          
          <div className="order-2 lg:order-1 relative">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-[#1B3C2B] mb-8 leading-tight relative"
            >
              {lang === 'pt' ? 'Implementação Ágil & Suporte Especializado' : 'Agile Implementation & Specialized Support'}
              {/* Linha decorativa tecnológica */}
              <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-[#6a00a3] to-[#1B3C2B] rounded-full"></span>
            </motion.h2>
            
            <div className="space-y-8">
              {[
                { 
                  title: lang === 'pt' ? "Segurança de Dados" : "Data Security", 
                  desc: lang === 'pt' ? "Infraestrutura em nuvem com criptografia de ponta a ponta e compliance ISO 27001." : "Cloud infrastructure with end-to-end encryption and ISO 27001 compliance.",
                  image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                { 
                  title: lang === 'pt' ? "Customização" : "Customization", 
                  desc: lang === 'pt' ? "Módulos adaptáveis aos processos específicos da sua indústria." : "Modules adaptable to your industry's specific processes.",
                  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                { 
                  title: lang === 'pt' ? "Escalabilidade" : "Scalability", 
                  desc: lang === 'pt' ? "Cresça sua operação sem preocupações com performance ou limites técnicos." : "Grow your operation without worrying about performance or technical limits.",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-5 group"
                >
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-lg relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6a00a3]/20 to-[#1B3C2B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2 flex items-center">
                      {item.title}
                      <span className="ml-2 w-1.5 h-1.5 bg-[#6a00a3] rounded-full animate-pulse"></span>
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Badge tecnológico */}
            <div className="mt-8 inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-100">
              <Cpu className="w-4 h-4 text-[#6a00a3]" />
              <span className="text-xs font-medium text-slate-600">Tecnologia cloud-native</span>
              <Cloud className="w-4 h-4 text-[#1B3C2B] ml-2" />
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            {/* Anel tecnológico ao redor da imagem */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#6a00a3]/20 to-[#1B3C2B]/20 rounded-[3rem] blur-2xl animate-pulse"></div>
            <div className="absolute -inset-1 border-2 border-[#6a00a3]/20 rounded-[3rem]"></div>
            <div className="absolute -inset-2 border border-[#1B3C2B]/10 rounded-[3rem]"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              className="relative z-10 rounded-[2.5rem] shadow-2xl border-8 border-white w-full h-auto object-cover" 
              alt="Technology dashboard"
            />
            
            {/* Overlay tecnológico na imagem */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#6a00a3]/10 via-transparent to-[#1B3C2B]/10 rounded-[2.5rem] pointer-events-none"></div>
          </motion.div>
        </div>

        {/* Trust Indicators com estilo tecnológico */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center relative"
        >
          {/* Fundo tecnológico */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6a00a3]/5 via-transparent to-[#1B3C2B]/5 blur-3xl rounded-full"></div>
          
          <div className="relative inline-flex flex-wrap items-center justify-center gap-6 p-6 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-50"></div>
              </div>
              <span className="text-sm font-medium text-slate-600">+50 empresas confiam</span>
            </div>
            <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-2 h-2 bg-[#6a00a3] rounded-full"></div>
                <div className="absolute inset-0 w-2 h-2 bg-[#6a00a3] rounded-full animate-ping opacity-50"></div>
              </div>
              <span className="text-sm font-medium text-slate-600">ISO 27001 Certified</span>
            </div>
            <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-2 h-2 bg-[#1B3C2B] rounded-full"></div>
                <div className="absolute inset-0 w-2 h-2 bg-[#1B3C2B] rounded-full animate-ping opacity-50"></div>
              </div>
              <span className="text-sm font-medium text-slate-600">Suporte 24/7</span>
            </div>
          </div>
        </motion.div>
        
        {/* Barra de progresso tecnológica animada */}
        <div className="mt-16 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#6a00a3] to-[#1B3C2B]"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          ></motion.div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-400 uppercase tracking-wider">
          <span>Inovação</span>
          <span>Segurança</span>
          <span>Escalabilidade</span>
          <span>Performance</span>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
