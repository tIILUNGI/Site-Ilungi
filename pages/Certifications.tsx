import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Shield, Globe, Star } from 'lucide-react';
import { useAppContext } from '../App';

const Certifications: React.FC = () => {
  const { lang } = useAppContext();
  const isPt = lang === 'pt';

  const certs = [
    {
      title: isPt ? 'ISO 9001:2015' : 'ISO 9001:2015',
      subtitle: isPt ? 'Gestão da Qualidade' : 'Quality Management',
      desc: isPt ? 'Certificação internacional que garante a excelência dos nossos processos e a satisfação dos nossos clientes.' : 'International certification that guarantees the excellence of our processes and customer satisfaction.',
      date: '2024',
      org: isPt ? ' Bureau Veritas' : 'Bureau Veritas',
      icon: Award,
      color: '#1B3C2B',
      badge: isPt ? 'Certificado' : 'Certified'
    },
    {
      title: isPt ? 'ANPG' : 'ANPG',
      subtitle: isPt ? 'Indústria Petrolífera' : 'Petroleum Industry',
      desc: isPt ? 'Certificação pela ANPG para prestação de serviços à indústria petrolífera.' : 'ANPG certification for petroleum industry services.',
      date: '2024',
      org: isPt ? 'Agência Nacional de Petróleo e Gás' : 'National Petroleum and Gas Agency',
      icon: Shield,
      color: '#6a00a3',
      badge: isPt ? 'Acreditado' : 'Accredited'
    },
    {
      title: isPt ? 'INEFOP' : 'INEFOP',
      subtitle: isPt ? 'Acreditação' : 'Accreditation',
      desc: isPt ? 'Acreditação pelo INEFOP para prestação de serviços de formação profissional.' : 'INEFOP accreditation for professional training services.',
      date: '2024',
      org: isPt ? 'Instituto Nacional de Emprego e Formação Profissional' : 'National Employment and Vocational Training Institute',
      icon: CheckCircle,
      color: '#0A4D8C',
      badge: isPt ? 'Acreditado' : 'Accredited'
    },
    {
      title: isPt ? 'CPD UK' : 'CPD UK',
      subtitle: isPt ? 'Cursos Profissionais' : 'Professional Courses',
      desc: isPt ? 'Acreditação pelo CPD UK para ministração de cursos profissionais no Reino Unido.' : 'CPD UK accreditation for professional courses in the United Kingdom.',
      date: '2024',
      org: isPt ? 'Continuing Professional Development' : 'Continuing Professional Development',
      icon: Globe,
      color: '#B31B1B',
      badge: isPt ? 'Acreditado' : 'Accredited'
    },
    {
      title: isPt ? 'INIQ' : 'INIQ',
      subtitle: isPt ? 'Sistemas de Gestão de Qualidade' : 'Quality Management Systems',
      desc: isPt ? 'Certificação e formação em sistemas de gestão de qualidade.' : 'Certification and training in quality management systems.',
      date: '2024',
      org: isPt ? 'Instituto Nacional de Qualidade' : 'National Quality Institute',
      icon: Star,
      color: '#dc6516',
      badge: isPt ? 'Certificado' : 'Certified'
    },
    {
      title: isPt ? 'GPMOi' : 'GPMOi',
      subtitle: isPt ? 'Formação Profissional' : 'Professional Training',
      desc: isPt ? 'Parceria estratégica para cursos de formação profissional e certificação.' : 'Strategic partnership for professional training courses and certification.',
      date: '2024',
      org: isPt ? 'GPMOi - Gestão de Projectos do Ministério das Obras Públicas' : 'PMO - Public Works Projects Management',
      icon: Award,
      color: '#4c0253',
      badge: isPt ? 'Parceiro' : 'Partner'
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
      <motion.div 
        animate={{ 
          x: [0, 30, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-40 left-0 w-64 h-64 bg-[#6a00a3]/5 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          x: [0, -30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
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
              : 'ILUNGI\'s commitment to excellence, transparency, and security is validated by our international certifications and accreditations.'}
          </motion.p>
        </motion.div>

        {/* Certifications Grid - Certificate Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              {/* Certificate Card */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                {/* Certificate Header - Ribbon Style */}
                <div 
                  className="relative h-28 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${cert.color} 0%, ${cert.color}dd 100%)` }}
                >
                  {/* Decorative elements */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white/30 rounded-tl-3xl"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white/30 rounded-tr-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white/30 rounded-bl-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white/30 rounded-br-3xl"></div>
                  </div>
                  
                  {/* Badge */}
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <cert.icon className="w-8 h-8" style={{ color: cert.color }} />
                    </div>
                  </motion.div>
                  
                  {/* Corner decorations */}
                  <div className="absolute top-3 left-3">
                    <Shield className="w-6 h-6 text-white/40" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Award className="w-6 h-6 text-white/40" />
                  </div>
                </div>

                {/* Certificate Body */}
                <div className="pt-10 pb-8 px-6">
                  {/* Badge label */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-center mb-4"
                  >
                    <span 
                      className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{ 
                        backgroundColor: `${cert.color}15`, 
                        color: cert.color 
                      }}
                    >
                      {cert.badge}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-center text-slate-800 mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-semibold text-center mb-4" style={{ color: cert.color }}>
                    {cert.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-slate-500 text-sm leading-relaxed text-center mb-6">
                    {cert.desc}
                  </p>

                  {/* Certificate Details */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        {isPt ? 'Ano' : 'Year'}
                      </span>
                      <span className="text-sm font-black text-slate-700">{cert.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        {isPt ? 'Organismo' : 'Issuer'}
                      </span>
                      <span className="text-sm font-semibold text-slate-700 text-right max-w-[150px]">
                        {cert.org}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative corner lines on hover */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: cert.color }}></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 rounded-tr-2xl" style={{ borderColor: cert.color }}></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 rounded-bl-2xl" style={{ borderColor: cert.color }}></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: cert.color }}></div>
                </motion.div>
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
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="text-2xl font-black text-slate-400">ISO</div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-2xl font-black text-slate-400">IAF</div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-2xl font-black text-slate-400">CPD</div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-2xl font-black text-slate-400">ANPG</div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-2xl font-black text-slate-400">INEFOP</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;
