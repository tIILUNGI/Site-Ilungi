
import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Database, ShieldCheck, Zap, ChevronRight, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';

const Solutions: React.FC = () => {
  const { t, lang } = useAppContext();

  const products = [
    {
      name: "Salya",
      tagline: "GRC & Audit Management",
      desc: "Plataforma robusta para gestão de riscos, controlos internos e automação de auditorias ISO.",
      icon: <Database className="w-10 h-10" />,
      path: "/solucoes/salya",
      color: "bg-purple-600"
    },
    {
      name: "SICLIC",
      tagline: "Compliance Intelligence",
      desc: "Sistema inteligente para gestão de compliance legal, contratual e normativo em tempo real.",
      icon: <ShieldCheck className="w-10 h-10" />,
      url: "https://siclic.ao/",
      color: "bg-[#1B3C2B]"
    },
    {
      name: "Tocomply360",
      tagline: "Governance Framework",
      desc: "Solução 360 graus para governança corporativa, integrando ética, risco e transparência.",
      icon: <Zap className="w-10 h-10" />,
      path: "/solucoes/tocomply",
      color: "bg-blue-600"
    }
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 bg-[#6B0FA3]/10 text-[#6B0FA3] rounded-full text-sm font-black uppercase mb-6"
          >
            {lang === 'pt' ? 'Ecossistema Digital ILUNGI' : 'ILUNGI Digital Ecosystem'}
          </motion.span>
          <h1 className="text-5xl md:text-6xl font-black text-[#1B3C2B] mb-8">
            {t.solutions.title}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-500 font-light leading-relaxed">
            {t.solutions.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          {products.map((product, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 ${product.color} rounded-[2rem] flex items-center justify-center text-white mb-8 transform group-hover:rotate-6 transition-transform duration-500`}>
                {product.icon}
              </div>
              <h2 className="text-3xl font-black mb-2">{product.name}</h2>
              <p className="text-[#6B0FA3] font-bold text-sm uppercase tracking-widest mb-6">{product.tagline}</p>
              <p className="text-slate-500 mb-10 leading-relaxed">{product.desc}</p>
              
              {product.url ? (
                <a 
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center space-x-2 font-black text-lg text-slate-800 hover:text-[#6B0FA3] transition-colors"
                >
                  <img src="/imagens/SICLIC.png" alt="SICLIC" className="h-8" />
                  <ChevronRight className="w-6 h-6" />
                </a>
              ) : (
                <Link 
                  to={product.path || '#'}
                  className="mt-auto flex items-center space-x-2 font-black text-lg text-slate-800 hover:text-[#6B0FA3] transition-colors"
                >
                  <span>{lang === 'pt' ? 'Solicitar Demo' : 'Request Demo'}</span>
                  <ChevronRight className="w-6 h-6" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-black text-[#1B3C2B] mb-8 leading-tight">
              {lang === 'pt' ? 'Implementação Ágil & Suporte Especializado' : 'Agile Implementation & Specialized Support'}
            </h2>
            <div className="space-y-8">
              {[
                { title: lang === 'pt' ? "Segurança de Dados" : "Data Security", desc: lang === 'pt' ? "Infraestrutura em nuvem com criptografia de ponta a ponta e compliance ISO 27001." : "Cloud infrastructure with end-to-end encryption and ISO 27001 compliance." },
                { title: lang === 'pt' ? "Customização" : "Customization", desc: lang === 'pt' ? "Módulos adaptáveis aos processos específicos da sua indústria." : "Modules adaptable to your industry's specific processes." },
                { title: lang === 'pt' ? "Escalabilidade" : "Scalability", desc: lang === 'pt' ? "Cresça sua operação sem preocupações com performance ou limites técnicos." : "Grow your operation without worrying about performance or technical limits." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6B0FA3] shadow-lg shrink-0">
                    <Layout className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                    <p className="text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="/imagens/ISO.png"
              className="rounded-[3rem] shadow-2xl border-8 border-white" 
              alt="Technology dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
