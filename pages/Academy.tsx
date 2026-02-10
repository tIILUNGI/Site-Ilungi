
import React from 'react';
import { GraduationCap, Award, BookOpen, UserCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';

const Academy: React.FC = () => {
  const { t, lang } = useAppContext();

  const courses = [
    { 
      title: lang === 'pt' ? "Lead Auditor ISO 9001" : "Lead Auditor ISO 9001", 
      duration: "40h", 
      level: lang === 'pt' ? "Expert" : "Expert",
      image: "/imagens/Lead Auditor ISO 9001.png"
    },
    { 
      title: lang === 'pt' ? "Lean Six Sigma - Green Belt" : "Lean Six Sigma - Green Belt", 
      duration: "60h", 
      level: lang === 'pt' ? "Expert" : "Expert",
      image: "/imagens/Lean Six Sigma - Green Belt.png"
    },
    { 
      title: lang === 'pt' ? "Compliance & Integridade" : "Compliance & Integrity", 
      duration: "16h", 
      level: lang === 'pt' ? "Base" : "Basic",
      image: "/imagens/Compliance & Integridade.jpg"
    },
    { 
      title: lang === 'pt' ? "Gestão de Riscos Corporativos" : "Corporate Risk Management", 
      duration: "24h", 
      level: lang === 'pt' ? "Intermédio" : "Intermediate",
      image: "/imagens/Gestão de Riscos Corporativos.png"
    },
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
            <h1 className="text-5xl font-black text-[#1B3C2B] mb-6">{t.academy.title}</h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-500 font-light">
                {t.academy.subtitle}
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
                { icon: <GraduationCap />, title: t.academy.features.cert, desc: t.academy.features.certDesc },
                { icon: <Award />, title: t.academy.features.mentoria, desc: t.academy.features.mentoriaDesc },
                { icon: <BookOpen />, title: t.academy.features.material, desc: t.academy.features.materialDesc },
                { icon: <UserCheck />, title: t.academy.features.networking, desc: t.academy.features.networkingDesc },
            ].map((box, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 text-center">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-[#6B0FA3] mx-auto mb-6">
                        {box.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{box.title}</h3>
                    <p className="text-sm text-slate-500">{box.desc}</p>
                </div>
            ))}
        </div>

        <div className="flex justify-between items-end mb-10">
            <div>
                <h2 className="text-3xl font-bold">{t.academy.coursesTitle}</h2>
                <p className="text-slate-500">{t.academy.coursesDesc}</p>
            </div>
            <Link to="/academia/cursos" className="text-[#6B0FA3] font-bold flex items-center hover:underline">
                {t.academy.viewAll} <ChevronRight className="w-5 h-5" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {courses.map((course, i) => (
                <div key={i} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col sm:flex-row hover:shadow-2xl transition-all">
                    <div className="sm:w-48 h-48 bg-slate-200">
                        <img 
                            src={course.image} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                            alt={course.title}
                        />
                    </div>
                    <div className="flex-1 p-8">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold text-[#6B0FA3] bg-purple-50 px-3 py-1 rounded-full uppercase">{course.level}</span>
                            <span className="text-xs font-bold text-slate-400">{course.duration}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 group-hover:text-[#6B0FA3] transition-colors">{course.title}</h3>
                        <Link to="/contacto" className="px-6 py-2 bg-[#1B3C2B] text-white rounded-full text-sm font-bold hover:bg-[#142d20] transition-all inline-block">
                            {t.academy.viewDetails}
                        </Link>
                    </div>
                </div>
            ))}
        </div>

        <div className="bg-[#6B0FA3] rounded-[3rem] p-12 text-center text-white">
            <h2 className="text-4xl font-black mb-6">{t.academy.banner.title}</h2>
            <p className="text-purple-100 mb-10 text-lg">{t.academy.banner.desc}</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/academia/login" className="px-10 py-4 bg-white text-[#6B0FA3] rounded-full font-bold hover:shadow-2xl transition-all">{t.academy.banner.portal}</Link>
                <Link to="/academia/verificar" className="px-10 py-4 border border-white/30 rounded-full font-bold hover:bg-white/10 transition-all">{t.academy.banner.verify}</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Academy;
