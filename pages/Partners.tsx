
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useAppContext } from '../App';

const partners = [
  { 
    name: "GPMOi", 
    url: "https://gpmoi.org/", 
    desc: "Especialistas em Governança de Projectos e Gestão Estratégica.",
    logo: "/imagens/GPMoi.png"
  },
  { 
    name: "CFC Institute", 
    url: "https://cfc-institute.org/", 
    desc: "Instituição líder em certificação financeira e compliance.",
    logo: "/imagens/CFC-institute.png"
  },
  { 
    name: "UCS", 
    url: "https://www.ucs.br/site", 
    desc: "Universidade de Caxias do Sul - Parceria em investigação académica.",
    logo: "/imagens/Captura de Ecrã (30).png"
  },
  { 
    name: "Nova Select", 
    url: "https://novaselect.co/index.html", 
    desc: "Consultoria em Capital Humano e recrutamento executivo.",
    logo: "/imagens/Captura de Ecrã (31).png"
  },
  { 
    name: "Ixi Ambiental", 
    url: "https://www.ixiambiental.co.ao/", 
    desc: "Parceiro estratégico para soluções de sustentabilidade em Angola.",
    logo: "/imagens/Captura de Ecrã (32).png"
  }
];

const Partners: React.FC = () => {
  const { t, lang } = useAppContext();

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-[#1B3C2B] mb-6">{t.partners.title}</h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-500 font-light">
            {t.partners.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col items-center"
            >
              <a 
                href={p.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex flex-col items-center"
              >
                <div className="w-28 h-28 bg-slate-50 rounded-xl flex items-center justify-center mb-4 p-3 border border-slate-100">
                  <img 
                    src={p.logo} 
                    alt={p.name} 
                    className="w-full h-full object-contain hover:opacity-80 transition-opacity"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#1B3C2B]">{p.name}</h3>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
