
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Layers, Target, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import ReferenceCard from '../components/ReferenceCard';

interface ServiceDetailProps {
  type: 'risk' | 'procurement' | 'pmo';
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ type }) => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';
  const content = t.services[type];

  const icons = {
    risk: <Activity className="w-12 h-12" />,
    procurement: <Layers className="w-12 h-12" />,
    pmo: <Target className="w-12 h-12" />
  };

  const images = {
    risk: "/imagens/Notação de Risco.jpg",
    procurement: "/imagens/procurement.png",
    pmo: "/imagens/Gestão de Projecto.jpg"
  };

  const [references, setReferences] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ilungi_references_data');
    if (saved) {
      setReferences(JSON.parse(saved));
    } else {
      setReferences(t.references?.clients || []);
    }
  }, [t.references?.clients]);

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="p-3 bg-purple-100 text-[#6a00a3] rounded-2xl w-fit">
                {icons[type]}
              </div>
              <h1 className="text-5xl font-black text-[#1B3C2B] leading-tight">{content.title}</h1>
              <p className="text-xl text-slate-500 font-light leading-relaxed">{content.desc}</p>
              <p className="text-lg text-slate-600 leading-relaxed text-justify">{content.content}</p>
              
              <div className="pt-8">
                <Link to="/contacto" className="px-10 py-4 bg-[#6a00a3] text-white rounded-full font-bold text-lg hover:bg-[#520b7d] transition-all inline-flex items-center group">
                  {isPt ? 'Solicitar Proposta' : 'Request Proposal'}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[#1B3C2B]/5 rounded-[3rem] blur-3xl"></div>
              <img 
                src={images[type]} 
                className="relative z-10 rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
                alt={content.title} 
              />
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {(isPt ? [
            { title: "Metodologia ILUNGI", desc: "Processos refinados por anos de prática no mercado Angolano e Internacional." },
            { title: "Diferenciais", desc: "Abordagem focada em resultados práticos e redução de desperdícios." },
            { title: "Sectores Atendidos", desc: "Experiência em Petróleo & Gás, Finanças, Construção e Sector Público." }
          ] : [
            { title: "ILUNGI Methodology", desc: "Refined processes built through years of practice in Angolan and international markets." },
            { title: "Differentials", desc: "An approach focused on practical results and waste reduction." },
            { title: "Sectors Served", desc: "Experience in Oil & Gas, Finance, Construction, and Public Sector." }
          ]).map((item, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-[#6a00a3] mr-2" />
                {item.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* References Section */}
        {references.filter((ref: any) => ref.service === type).length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-[#1B3C2B] mb-4">
                {t.references?.title || (isPt ? 'Nossas Referências' : 'Our References')}
              </h2>
              <p className="text-slate-500">
                {t.references?.subtitle || (isPt ? 'Empresas que confiaram nos nossos serviços' : 'Companies that trusted our services')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {references
                .filter((ref: any) => ref.service === type)
                .slice(0, 3)
                .map((ref: any, i: number) => (
                  <ReferenceCard key={ref.id} reference={ref} index={i} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
