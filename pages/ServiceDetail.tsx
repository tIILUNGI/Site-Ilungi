
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import ReferenceCard from '../components/ReferenceCard';
import { loadData } from '../lib/dataSync';

interface ServiceDetailProps {
  type: 'risk' | 'procurement' | 'pmo';
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ type }) => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';
  const content = t.services[type];

  const images = {
    risk: "/imagens/Notação de Risco.jpg",
    procurement: "/imagens/procurement.png",
    pmo: "/imagens/Gestão de Projecto.jpg"
  };

  const [references, setReferences] = useState<any[]>([]);
  const serviceReferences = references.filter((ref: any) => ref.service === type);

  useEffect(() => {
    loadData('references', 'ilungi_references_data', t.references?.clients || []).then(data => {
      setReferences(data);
    });
  }, [t.references?.clients]);

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
      <div className="absolute top-40 left-0 w-72 h-72 bg-[#6a00a3]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-[#1B3C2B]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl font-black text-[#1B3C2B] leading-tight">{content.title}</h1>
              <p className="text-xl text-slate-500 font-light leading-relaxed">{content.desc}</p>
              <p className="text-lg text-slate-600 leading-relaxed text-justify">{content.content}</p>
              
              <div className="pt-8">
                <Link to="/contacto" className="px-10 py-4 bg-[#6a00a3] text-white rounded-full font-bold text-lg hover:bg-[#520b7d] transition-all inline-flex items-center group">
                  {isPt ? 'Solicitar Proposta' : 'Request Proposal'}
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

        {/* References Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#1B3C2B]/10 text-[#1B3C2B] rounded-full text-sm font-black uppercase mb-4 tracking-wider">
                {t.references?.title || (isPt ? 'Nossas Referências' : 'Our References')}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#1B3C2B] mb-4">
                {isPt ? 'Empresas que Confiaram' : 'Companies That Trusted'}
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                {t.references?.subtitle || (isPt ? 'Empresas que confiaram nos nossos serviços' : 'Companies that trusted our services')}
              </p>
          </div>
          {serviceReferences.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceReferences.slice(0, 3).map((ref: any, i: number) => (
                <ReferenceCard key={ref.id} reference={ref} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
