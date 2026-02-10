
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, ShoppingBag, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';

const Consulting: React.FC = () => {
  const { t, lang } = useAppContext();

  const areas = [
    {
      title: t.consultingAreas.iso.title,
      desc: t.consultingAreas.iso.desc,
      icon: <Shield className="w-8 h-8" />,
      path: "/consultoria/iso"
    },
    {
      title: t.consultingAreas.risk.title,
      desc: t.consultingAreas.risk.desc,
      icon: <BarChart3 className="w-8 h-8" />,
      path: "/consultoria/risco"
    },
    {
      title: t.consultingAreas.procurement.title,
      desc: t.consultingAreas.procurement.desc,
      icon: <ShoppingBag className="w-8 h-8" />,
      path: "/consultoria/procurement"
    },
    {
      title: t.consultingAreas.pmo.title,
      desc: t.consultingAreas.pmo.desc,
      icon: <Briefcase className="w-8 h-8" />,
      path: "/consultoria/pmo"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-[#1B3C2B] mb-6"
          >
            {t.consulting.title}
          </motion.h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-500 font-light">
            {t.consulting.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {areas.map((area, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-purple-500/10 transition-all group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#6B0FA3] mb-8 shadow-sm group-hover:bg-[#6B0FA3] group-hover:text-white transition-all">
                {area.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{area.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-8">{area.desc}</p>
              <Link to={area.path} className="inline-flex items-center space-x-2 font-bold text-[#1B3C2B] hover:text-[#6B0FA3] transition-colors">
                <span>{t.consulting.explore}</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="relative bg-[#1B3C2B] rounded-[3rem] overflow-hidden p-12 lg:p-20 text-white">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#6B0FA3]/20 blur-3xl rounded-full"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">{t.consulting.whyTitle}</h2>
              <div className="space-y-6">
                {t.consulting.features.map((item: string, i: number) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-medium text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center lg:text-right">
              <Link to="/contacto" className="inline-block px-12 py-5 bg-[#6B0FA3] text-white rounded-full font-bold text-xl hover:bg-[#520b7d] transition-all transform hover:scale-105 shadow-2xl shadow-purple-900/40">
                {t.consulting.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consulting;
