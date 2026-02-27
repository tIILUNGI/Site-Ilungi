import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useAppContext } from '../App';
import { loadConfig } from '../lib/dataSync';

const Footer: React.FC = () => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';
  const navigate = useNavigate();
  
  const defaultConfig = {
    companyName: "ILUNGI Lda",
    taglineText: "O Melhor e Verdadeiro Parceiro Nacional.",
    address: isPt ? 'Projeto Nova Vida, Prédio E209' : 'Nova Vida Project, Building E209',
    phone: "+244 935 793 270",
    email: "geral@ilungi.ao",
    linkedinBaseUrl: "https://www.linkedin.com/company/33236785/admin/dashboard/"
  };

  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    loadConfig('ilungi_global_config', defaultConfig).then(data => {
      setConfig(data);
    });
  }, [lang]);

  const handleAdminClick = () => {
    navigate('/admin');
  };
  

  return (
    <footer className="bg-[#1B3C2B] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 border-b border-white/10 pb-12 mb-10">
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/imagens/ilungi_logo.jpg" alt="ILUNGI Logo" className="h-14 w-auto bg-white rounded-lg p-1" />
          </Link>
          
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
            <a href={`https://wa.me/${config.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#6a00a3] hover:border-transparent transition-all">
              <MessageCircle className="w-5 h-5" />
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
          <h4 className="font-bold text-lg mb-6">{isPt ? 'Politicas' : 'Policies'}</h4>
          <ul className="space-y-3 text-slate-300">
            <li><a href="/Politica de Qualidade.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isPt ? 'Politica de Qualidade' : 'Quality Policy'}</a></li>
            <li><a href="/Politica de Compliance.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isPt ? 'Politica de Compliance' : 'Compliance Policy'}</a></li>
          </ul>
          <div className="mt-6">
            <Link
              to="/contacto#candidatura"
              className="inline-flex items-center justify-center rounded-lg bg-white text-[#1B3C2B] text-xs font-bold py-2 px-4 hover:bg-white/90 transition-colors"
            >
              {isPt ? 'Candidatura Espontânea' : 'Spontaneous Application'}
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">{t.nav.contact}</h4>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#6a00a3] shrink-0" />
              <span className="text-sm">{config.address}</span>
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
          &copy; {new Date().getFullYear()} 
          <button 
            onClick={handleAdminClick}
            className="cursor-pointer hover:text-white transition-colors ml-1"
            title={isPt ? 'Área de Administração' : 'Administration Area'}
          >
            {config.companyName || 'ILUNGI'}
          </button>. {isPt ? 'Todos os direitos reservados.' : 'All rights reserved.'}
        </p>
        <div className="flex flex-wrap gap-4 sm:space-x-6 mt-4 md:mt-0 items-center justify-center">
          <Link to="/certificacoes" className="hover:text-white font-bold text-white bg-[#6a00a3] px-4 py-2 rounded-lg transition-all">{isPt ? 'Nossas Certificações' : 'Our Certifications'}</Link>
          <a href="#" className="hover:text-white">{isPt ? 'Privacidade' : 'Privacy'}</a>
          <a href="#" className="hover:text-white">{isPt ? 'Termos de Uso' : 'Terms of Use'}</a>
          <a href="#" className="hover:text-white">{isPt ? 'Cookies' : 'Cookies'}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


