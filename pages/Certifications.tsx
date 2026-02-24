import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../App';

const Certifications: React.FC = () => {
  const { lang } = useAppContext();
  const isPt = lang === 'pt';

  const certs = [
    {
      title: 'ISO 9001:2015',
      subtitle: isPt ? 'Sistema de Gestão ISO' : 'ISO Management System',
      desc: isPt ? 'Certificação internacional que garante a excelência dos nossos processos e a satisfação dos nossos clientes.' : 'International certification that guarantees the excellence of our processes and customer satisfaction.',
      date: '2024',
      validity: '2028',
      color: '#1B3C2B',
      badge: isPt ? 'Certificado' : 'Certified'
    },
    {
      title: 'ANPG',
      subtitle: isPt ? 'Indústria Petrolífera' : 'Petroleum Industry',
      desc: isPt ? 'Certificação pela ANPG para prestação de serviços à indústria petrolífera.' : 'ANPG certification for petroleum industry services.',
      date: '2024',
      validity: '2028',
      color: '#6a00a3',
      badge: isPt ? 'Certificado' : 'Certified'
    },
    {
      title: 'INEFOP',
      subtitle: isPt ? 'Formação Profissional' : 'Professional Training',
      desc: isPt ? 'Licença pelo INEFOP para prestação de serviços de formação profissional.' : 'INEFOP license for professional training services.',
      date: '2024',
      validity: '2028',
      color: '#0A4D8C',
      badge: isPt ? 'Licença' : 'License'
    },
    {
      title: 'CPD UK',
      subtitle: isPt ? 'Cursos Profissionais' : 'Professional Courses',
      desc: isPt ? 'Registo pelo CPD UK para ministração de cursos profissionais no Reino Unido.' : 'CPD UK registration for professional courses in the United Kingdom.',
      date: '2024',
      validity: '2028',
      color: '#B31B1B',
      badge: isPt ? 'Registo' : 'Registered'
    },
    {
      title: 'INIQ',
      subtitle: isPt ? 'Sistemas de Gestão de Qualidade' : 'Quality Management Systems',
      desc: isPt ? 'Registo e formação em sistemas de gestão de qualidade.' : 'Registration and training in quality management systems.',
      date: '2024',
      validity: '2028',
      color: '#dc6516',
      badge: isPt ? 'Registo' : 'Registered'
    },
    {
      title: 'GPMOi',
      subtitle: isPt ? 'Formação Profissional' : 'Professional Training',
      desc: isPt ? 'Parceria estratégica para cursos de formação profissional e certificação.' : 'Strategic partnership for professional training courses and certification.',
      date: '2024',
      validity: '2028',
      color: '#4c0253',
      badge: isPt ? 'Acreditado' : 'Accredited'
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen relative overflow-hidden">
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
            {isPt ? 'Credibilidade & Excelência' : 'Credibility & Excellence'}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-[#1B3C2B] mb-6"
          >
            {isPt ? 'Nossas Certificações' : 'Our Certifications'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-3xl mx-auto text-xl text-slate-500 font-light"
          >
            {isPt 
              ? 'O compromisso da ILUNGI com a excelência, transparência e segurança é validado pelas nossas certificações e acreditações internacionais.' 
              : "ILUNGI's commitment to excellence, transparency, and security is validated by our international certifications and accreditations."}
          </motion.p>
        </motion.div>

        {/* Certifications Grid - Professional Certificate Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              {/* Certificate Card - Professional Design */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                {/* Top Ribbon with Color */}
                <div 
                  className="h-3"
                  style={{ backgroundColor: cert.color }}
                />
                
                {/* Seal Circle - No Icon, Just Design */}
                <div className="flex justify-center -mt-8 relative z-10">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center"
                    style={{ border: `3px solid ${cert.color}` }}
                  >
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${cert.color}15` }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cert.color }}></div>
                    </div>
                  </motion.div>
                </div>

                {/* Certificate Body */}
                <div className="pt-8 pb-8 px-6">
                  {/* Badge label */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-center mb-4"
                  >
                    <span 
                      className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${cert.color}15`, color: cert.color }}
                    >
                      {cert.badge}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-center text-slate-800 mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-semibold text-center mb-4" style={{ color: cert.color }}>
                    {cert.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-slate-500 text-sm leading-relaxed text-center mb-6">
                    {cert.desc}
                  </p>

                  {/* Certificate Details - Ano e Validade */}
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <div className="text-center">
                      <span className="text-xs font-bold text-slate-400 uppercase block">
                        {isPt ? 'Ano' : 'Year'}
                      </span>
                      <span className="text-sm font-black text-slate-700">{cert.date}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-bold text-slate-400 uppercase block">
                        {isPt ? 'Validade' : 'Validity'}
                      </span>
                      <span className="text-sm font-black" style={{ color: cert.color }}>{cert.validity}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div 
                  className="h-1 transition-all duration-300 group-hover:h-2"
                  style={{ backgroundColor: cert.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-slate-500 mb-8 font-medium">
            {isPt 
              ? 'As nossas certificações são reconhecidas internacionalmente' 
              : 'Our certifications are internationally recognized'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {['ISO', 'IAF', 'CPD', 'ANPG', 'INEFOP'].map((item, i) => (
              <div key={i} className="text-3xl font-black text-slate-300 tracking-wider">{item}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;
