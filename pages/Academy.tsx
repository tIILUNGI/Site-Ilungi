import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { ArrowRight, Clock, GraduationCap, CheckCircle } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const Academy: React.FC = () => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';

  const courses = [
    { 
      title: isPt ? "Lead Auditor ISO 9001" : "Lead Auditor ISO 9001", 
      duration: "40h", 
      level: isPt ? "Expert" : "Expert",
      image: "/imagens/Lead Auditor ISO 9001.png"
    },
    { 
      title: isPt ? "Lean Six Sigma - Green Belt" : "Lean Six Sigma - Green Belt", 
      duration: "60h", 
      level: isPt ? "Expert" : "Expert",
      image: "/imagens/Lean Six Sigma - Green Belt.png"
    },
    { 
      title: isPt ? "Compliance & Integridade" : "Compliance & Integrity", 
      duration: "16h", 
      level: isPt ? "Base" : "Basic",
      image: "/imagens/Compliance & Integridade.jpg"
    },
    { 
      title: isPt ? "Gestão de Riscos Corporativos" : "Corporate Risk Management", 
      duration: "24h", 
      level: isPt ? "Intermédio" : "Intermediate",
      image: "/imagens/Gestão de Riscos Corporativos.png"
    },
  ];

  const features = [
    { 
      title: t.academy.features.cert, 
      desc: t.academy.features.certDesc
    },
    { 
      title: t.academy.features.mentoria, 
      desc: t.academy.features.mentoriaDesc
    },
    { 
      title: t.academy.features.material, 
      desc: t.academy.features.materialDesc
    },
    { 
      title: t.academy.features.networking, 
      desc: t.academy.features.networkingDesc
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
      <motion.div 
        animate={{ x: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-40 left-0 w-64 h-64 bg-[#6a00a3]/5 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ x: [0, -30, 0], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-40 right-0 w-96 h-96 bg-[#1B3C2B]/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2 bg-[#1B3C2B]/10 text-[#1B3C2B] rounded-full text-sm font-bold uppercase mb-6 tracking-widest"
          >
            {isPt ? 'Academia ILUNGI' : 'ILUNGI Academy'}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-[#1B3C2B] mb-6"
          >
            {t.academy.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mx-auto text-xl text-slate-500 font-light"
          >
            {t.academy.subtitle}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              <h3 className="font-bold text-lg text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Courses Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1B3C2B] mb-3">{t.academy.coursesTitle}</h2>
              <p className="text-slate-500">{t.academy.coursesDesc}</p>
            </div>
            <Link 
              to="/academia/cursos" 
              className="inline-flex items-center gap-2 text-[#6a00a3] font-bold hover:gap-3 transition-all"
            >
              {t.academy.viewAll}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col sm:flex-row hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="sm:w-56 h-56 sm:h-auto relative overflow-hidden">
                  <motion.img 
                    src={course.image} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    alt={course.title}
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:hidden"></div>
                </div>
                
                {/* Content */}
                <div className="flex-1 p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold text-[#6a00a3] bg-purple-50 px-3 py-1 rounded-full uppercase">{course.level}</span>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-bold">{course.duration}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-[#6a00a3] transition-colors">{course.title}</h3>
                  </div>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link 
                      to="/contacto" 
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1B3C2B] text-white rounded-full text-sm font-bold hover:bg-[#142d20] transition-all"
                    >
                      {t.academy.viewDetails}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6a00a3] via-[#520b7d] to-[#1B3C2B]"></div>
          
          {/* Decorative elements */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -bottom-32 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          />

          <div className="relative z-10 p-12 md:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-white mb-6"
              >
                {t.academy.banner.title}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-purple-100 mb-10 text-lg"
              >
                {t.academy.banner.desc}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/academia/login" 
                    className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#6a00a3] rounded-full font-bold hover:shadow-2xl transition-all"
                  >
                    <GraduationCap className="w-5 h-5" />
                    {t.academy.banner.portal}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/academia/verificar" 
                    className="inline-flex items-center gap-2 px-10 py-4 border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {t.academy.banner.verify}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Academy;
