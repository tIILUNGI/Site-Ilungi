
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useAppContext } from '../App';

const Footer: React.FC = () => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';
  
  const defaultConfig = {
    companyName: "ILUNGI Lda",
    taglineText: "O Melhor e Verdadeiro Parceiro Nacional.",
    address: isPt ? 'Luanda, Projeto Nova Vida, Prédio E209 Apt 24' : 'Luanda, Nova Vida Project, Building E209 Apt 24',
    phone: "+244 935 793 270",
    email: "geral@ilungi.ao",
    linkedinBaseUrl: "https://www.linkedin.com/company/33236785/admin/dashboard/"
  };

  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    const saved = localStorage.getItem('ilungi_global_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      setConfig({
        ...defaultConfig,
        ...parsed
      });
    }
  }, [lang]);

  return (
    <footer className="bg-[#1B3C2B] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-10">
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/imagens/ilungi_logo.jpg" alt="ILUNGI Logo" className="h-14 w-auto bg-white rounded-lg p-1" />
          </Link>
          <p className="text-slate-300 text-sm leading-relaxed">
            {isPt
              ? 'Especialistas globais em serviços ISO, gestão de riscos e formação executiva.'
              : 'Global specialists in ISO services, risk management, and executive training.'}
            {' '}
            {isPt
              ? config.taglineText || 'Transformamos desafios corporativos em excelência operacional.'
              : 'We turn corporate challenges into operational excellence.'}
          </p>
          <div className="flex space-x-4">
            <a href={config.linkedinBaseUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#6a00a3] hover:border-transparent transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/op_ilungi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#6a00a3] hover:border-transparent transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/op.ilungi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#6a00a3] hover:border-transparent transition-all">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">{t.nav.consulting}</h4>
          <ul className="space-y-3 text-slate-300">
            <li><Link to="/consultoria/iso" className="hover:text-white transition-colors">{t.nav.iso}</Link></li>
            <li><Link to="/consultoria/risco" className="hover:text-white transition-colors">{t.nav.risk}</Link></li>
            <li><Link to="/consultoria/procurement" className="hover:text-white transition-colors">{t.nav.procurement}</Link></li>
            <li><Link to="/consultoria/pmo" className="hover:text-white transition-colors">{t.nav.pmo}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">{t.nav.academy}</h4>
          <ul className="space-y-3 text-slate-300">
            <li><Link to="/academia/cursos" className="hover:text-white transition-colors">{isPt ? 'Catálogo de Cursos' : 'Course Catalog'}</Link></li>
            <li><Link to="/academia/verificar" className="hover:text-white transition-colors">{t.nav.verify}</Link></li>
            <li><Link to="/academia/alumni" className="hover:text-white transition-colors">{isPt ? 'Portal Alumni' : 'Alumni Portal'}</Link></li>
            <li><Link to="/academia/scr" className="hover:text-white transition-colors">{t.nav.scr}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">{t.nav.contact}</h4>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#6a00a3] shrink-0" />
              <span className="text-sm">
                {config.address}
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-[#6a00a3] shrink-0" />
              <span className="text-sm">{config.phone}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-[#6a00a3] shrink-0" />
              <span className="text-sm">{config.email}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs">
        <p>
          &copy; {new Date().getFullYear()} <Link to="/admin" className="cursor-default hover:text-white transition-colors">{config.companyName || 'ILUNGI'}</Link>. {isPt ? 'Todos os direitos reservados.' : 'All rights reserved.'}
        </p>
        <div className="flex flex-wrap gap-4 sm:space-x-6 mt-4 md:mt-0 items-center justify-center">
          <Link to="/certificacoes" className="hover:text-white font-bold">{isPt ? 'Nossas Certificações' : 'Our Certifications'}</Link>
          <a href="#" className="hover:text-white">{isPt ? 'Privacidade' : 'Privacy'}</a>
          <a href="#" className="hover:text-white">{isPt ? 'Termos de Uso' : 'Terms of Use'}</a>
          <a href="#" className="hover:text-white">{isPt ? 'Cookies' : 'Cookies'}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
