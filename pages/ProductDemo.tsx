import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2, Cpu, Cloud, Globe } from 'lucide-react';
import { useAppContext } from '../App';

interface ProductDemoProps {
  productName: string;
}

const ProductDemo: React.FC<ProductDemoProps> = ({ productName }) => {
  const { lang } = useAppContext();
  const isPt = lang === 'pt';
  const productHeadline = isPt
    ? productName === 'Salya'
      ? 'Gest\u00e3o de Sal\u00e1rios e Recursos Humanos'
      : productName === 'SICLIC'
        ? 'Compliance Intelligence e Gest\u00e3o Normativa'
        : 'Governan\u00e7a Corporativa e Compliance 360'
    : productName === 'Salya'
      ? 'Payroll and Human Resources'
      : productName === 'SICLIC'
        ? 'Compliance Intelligence and Regulatory Management'
        : 'Corporate Governance and Compliance 360';

  const featureItems = isPt ? [
    {
      title: 'Interface Adaptativa',
      desc: 'Design focado na experi\u00eancia do usu\u00e1rio para m\u00e1xima produtividade e efici\u00eancia operacional.'
    },
    {
      title: 'Compliance Autom\u00e1tico',
      desc: 'Alertas em tempo real sobre desvios normativos e prazos legais com intelig\u00eancia preditiva.'
    },
    {
      title: 'Integra\u00e7\u00e3o API',
      desc: 'Conecte seus sistemas existentes (ERP, CRM, RH) de forma transparente e segura.'
    }
  ] : [
    {
      title: 'Adaptive Interface',
      desc: 'UX-first design for maximum productivity and operational efficiency.'
    },
    {
      title: 'Automated Compliance',
      desc: 'Real-time alerts for regulatory deviations and legal deadlines with predictive intelligence.'
    },
    {
      title: 'API Integration',
      desc: 'Connect your existing systems (ERP, CRM, HR) securely and seamlessly.'
    }
  ];

  const enterpriseFeatures = isPt
    ? ['Suporte 24/7', 'Utilizadores Ilimitados', 'Personaliza\u00e7\u00e3o Total', 'SLA Garantido']
    : ['24/7 Support', 'Unlimited Users', 'Full Customization', 'Guaranteed SLA'];
  // Imagens específicas para cada produto
  const getProductImages = () => {
    switch(productName) {
      case 'Salya':
        return {
          dashboard: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          features: [
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          color: "purple-600",
          gradient: "from-purple-600 to-purple-800"
        };
      case 'SICLIC':
        return {
          dashboard: "/imagens/SICLIC.png",
          features: [
            "/imagens/SICLIC.png",
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          color: "emerald-700",
          gradient: "from-[#1B3C2B] to-[#2E7D5E]"
        };
      case 'Tocomply360':
        return {
          dashboard: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          features: [
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          color: "blue-600",
          gradient: "from-blue-600 to-blue-800"
        };
      default:
        return {
          dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          features: [],
          color: "gray-600",
          gradient: "from-gray-600 to-gray-800"
        };
    }
  };

  const productImages = getProductImages();

  return (
    <div className="py-20 bg-slate-50 relative overflow-hidden">
      {/* ELEMENTOS TECNOLÓGICOS DE FUNDO */}
      
      {/* Grade de circuito digital */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-demo" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6a00a3" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-demo)" />
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
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          {/* Efeito de brilho no header */}
          <div className="absolute -inset-20 bg-gradient-to-r from-[#6a00a3]/5 via-transparent to-[#1B3C2B]/5 blur-3xl rounded-full"></div>
          
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-[#6a00a3]/10 text-[#6a00a3] rounded-full text-sm font-black uppercase mb-6 tracking-wider backdrop-blur-sm border border-[#6a00a3]/20 relative"
          >
            {isPt ? 'SOLU\u00c7\u00d5ES DIGITAIS ILUNGI' : 'ILUNGI DIGITAL SOLUTIONS'}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black text-[#1B3C2B] mb-8 relative"
          >
            {productName}
            {/* Linha decorativa tecnológica */}
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#6a00a3] to-[#1B3C2B] rounded-full"></span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-xl text-slate-500 font-light leading-relaxed relative"
          >
            {isPt
              ? `A plataforma SaaS definitiva para ${productHeadline}.`
              : `The ultimate SaaS platform for ${productHeadline}.`}
          </motion.p>
        </div>

        {/* Mockup Simulation - COM IMAGEM CORPORATIVA */}
        <div className="relative max-w-5xl mx-auto mb-24">
          <div className="absolute -inset-10 bg-gradient-to-tr from-[#6a00a3]/10 via-transparent to-[#1B3C2B]/10 rounded-full blur-3xl opacity-50"></div>
          
          {/* Anel tecnológico ao redor do mockup */}
          <div className="absolute -inset-4 border-2 border-[#6a00a3]/20 rounded-[2rem]"></div>
          <div className="absolute -inset-2 border border-[#1B3C2B]/10 rounded-[2rem]"></div>
          
          <div className={`relative bg-gradient-to-br ${productImages.gradient} rounded-3xl p-4 shadow-2xl border border-white/20 overflow-hidden group`}>
            {/* Overlay de circuito digital */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay">
              <svg width="100%" height="100%">
                <pattern id="circuit-demo" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M10 10 L30 10 M40 20 L20 20 M30 30 L10 30" stroke="white" strokeWidth="0.5" fill="none"/>
                  <circle cx="15" cy="15" r="1" fill="white"/>
                  <circle cx="35" cy="25" r="1" fill="white"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#circuit-demo)"/>
              </svg>
            </div>
            
            <div className="flex items-center space-x-2 px-4 py-2 border-b border-white/10 bg-white/5 backdrop-blur-sm relative z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <div className="flex-1"></div>
              <div className="px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] text-white/80 border border-white/20">
                https://{productName.toLowerCase()}.ilungi.ao/dashboard
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2"></div>
            </div>
            
            <div className="relative">
              <motion.img 
                src={productImages.dashboard} 
                className="w-full h-auto rounded-b-2xl relative z-10"
                alt={isPt ? 'Interface do Produto' : 'Product Interface'}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Overlay tecnológico na imagem */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-b-2xl"></div>
              
              {/* Badge do produto */}
              <div className="absolute top-4 left-4 z-20">
                <div className={`bg-gradient-to-r ${productImages.gradient} px-4 py-2 rounded-xl shadow-lg border border-white/30 backdrop-blur-sm`}>
                  <span className="text-white font-black text-sm">{productName} DEMO</span>
                </div>
              </div>
              
              {/* Indicador de sistema ativo */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-50"></div>
                </div>
                <span className="text-xs text-white font-medium">
                  {isPt ? 'Sistema Online' : 'System Online'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid - COM IMAGENS CORPORATIVAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {featureItems.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img 
                  src={productImages.features[i]} 
                  alt={f.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Ícone tecnológico sobreposto */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                  <span className="text-white font-bold text-sm">{i + 1}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center">
                  {f.title}
                  <span className="ml-2 w-1.5 h-1.5 bg-[#6a00a3] rounded-full animate-pulse"></span>
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
              
              {/* Linha decorativa */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${productImages.gradient.split(' ')[0].replace('from-', '')}, #6a00a3, ${productImages.gradient.split(' ')[1].replace('to-', '')})` 
                }}
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Pricing Mockup */}
        <div className="relative bg-slate-50 p-12 rounded-3xl text-center overflow-hidden">
          {/* Elementos tecnológicos de fundo */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <pattern id="pricing-grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M30 0 L0 0 0 30" fill="none" stroke="#6a00a3" strokeWidth="0.3"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#pricing-grid)"/>
            </svg>
          </div>
          
          <div className="relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-10"
            >
              {isPt ? 'Planos & Demonstração' : 'Plans & Demo'}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-all duration-500 relative group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1B3C2B] to-[#2E7D5E] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h4 className="font-bold text-slate-400 uppercase text-xs mb-4 tracking-wider">Enterprise</h4>
                <p className="text-4xl font-black mb-6 text-[#1B3C2B]">
                  {isPt ? 'Sob Consulta' : 'On Request'}
                </p>
                <ul className="text-left space-y-3 mb-8">
                  {enterpriseFeatures.map(l => (
                    <li key={l} className="flex items-center space-x-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-[#1B3C2B] text-white rounded-xl font-bold hover:bg-black transition-all transform hover:scale-105">
                  {isPt ? 'Solicitar Proposta' : 'Request Proposal'}
                </button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${productImages.gradient} p-8 rounded-3xl text-white relative group shadow-xl`}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h4 className="font-bold text-white/60 uppercase text-xs mb-4 tracking-wider">Trial</h4>
                <p className="text-4xl font-black mb-6">{isPt ? 'Grátis (14 dias)' : 'Free (14 days)'}</p>
                <p className="mb-8 text-white/80 text-sm leading-relaxed">
                  {isPt
                    ? 'Experimente todas as funcionalidades básicas sem compromisso. Inclui suporte por email e acesso à documentação.'
                    : 'Try all core features with no commitment. Includes email support and access to documentation.'}
                </p>
                
                {/* Indicador de disponibilidade */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-50"></div>
                  </div>
                  <span className="text-xs text-white/80">
                    {isPt ? 'Demo disponível imediatamente' : 'Demo available immediately'}
                  </span>
                </div>
                
                <button className="w-full py-3 bg-white text-[#6a00a3] rounded-xl font-bold hover:bg-slate-100 transition-all transform hover:scale-105 shadow-lg">
                  {isPt ? 'Iniciar Demo Gratuita' : 'Start Free Demo'}
                </button>
              </motion.div>
            </div>
            
            {/* Badge tecnológico */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-100"
            >
              <Cpu className="w-4 h-4 text-[#6a00a3]" />
              <span className="text-xs font-medium text-slate-600">
                {isPt ? 'Cloud SaaS • Implementação em 24h' : 'Cloud SaaS • 24h Setup'}
              </span>
              <Cloud className="w-4 h-4 text-[#1B3C2B] ml-2" />
            </motion.div>
          </div>
        </div>
        
        {/* Barra de progresso tecnológica */}
        <div className="mt-20 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#6a00a3] to-[#1B3C2B]"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          ></motion.div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-400 uppercase tracking-wider">
          <span>{isPt ? 'Descoberta' : 'Discovery'}</span>
          <span>{isPt ? 'Configuração' : 'Configuration'}</span>
          <span>{isPt ? 'Integração' : 'Integration'}</span>
          <span>{isPt ? 'Operação' : 'Operations'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDemo;
