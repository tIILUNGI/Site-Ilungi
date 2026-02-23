import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../App';

const Certifications: React.FC = () => {
  const { lang } = useAppContext();
  const isPt = lang === 'pt';

  const certs = [
    {
      title: isPt ? 'ISO 9001:2015 - Gestão da Qualidade' : 'ISO 9001:2015 - Quality Management',
      desc: isPt ? 'Certificação internacional que garante a excelência dos nossos processos e a satisfação dos nossos clientes.' : 'International certification that guarantees the excellence of our processes and customer satisfaction.',
      date: '2024',
    },
    {
      title: isPt ? 'ANPG - Indústria Petrolífera' : 'ANPG - Petroleum Industry',
      desc: isPt ? 'Certificação pela ANPG para prestação de serviços à indústria petrolífera.' : 'ANPG certification for petroleum industry services.',
      date: '2024',
    },
    {
      title: isPt ? 'INEFOP - Acreditação' : 'INEFOP - Accreditation',
      desc: isPt ? 'Acreditação pelo INEFOP para prestação de serviços de formação profissional.' : 'INEFOP accreditation for professional training services.',
      date: '2024',
    },
    {
      title: isPt ? 'CPD UK - Cursos Profissionais' : 'CPD UK - Professional Courses',
      desc: isPt ? 'Acreditação pelo CPD UK para ministração de cursos profissionais no Reino Unido.' : 'CPD UK accreditation for professional courses in the United Kingdom.',
      date: '2024',
    },
    {
      title: isPt ? 'INIQ - Sistemas de Gestão de Qualidade' : 'INIQ - Quality Management Systems',
      desc: isPt ? 'Certificação e formação em sistemas de gestão de qualidade.' : 'Certification and training in quality management systems.',
      date: '2024',
    }
  ];

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-[#1B3C2B] mb-6"
          >
            {isPt ? 'Nossas Certificações' : 'Our Certifications'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-slate-500 font-light"
          >
            {isPt 
              ? 'O compromisso da ILUNGI com a excelência, transparência e segurança é validado pelas nossas certificações.' 
              : 'ILUNGI\'s commitment to excellence, transparency, and security is validated by our certifications.'}
          </motion.p>
        </div>

        {/* Grid de Certificações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/40 border border-slate-100 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-[#6a00a3]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{cert.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{cert.desc}</p>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">{isPt ? 'Conquistado em' : 'Achieved in'}</span>
                <span className="text-sm font-black text-[#1B3C2B]">{cert.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
