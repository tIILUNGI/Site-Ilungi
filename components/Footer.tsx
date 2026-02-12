
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useAppContext } from '../App';

const Footer: React.FC = () => {
  const { t } = useAppContext();
  
  return (
    <footer className="bg-[#1B3C2B] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-10">
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/imagens/ilungi_logo.jpg" alt="ILUNGI Logo" className="h-14 w-auto bg-white rounded-lg p-1" />
          </Link>
          <p className="text-slate-300 text-sm leading-relaxed">
            Especialistas globais em consultoria ISO, gestão de riscos e formação executiva. 
            Transformamos desafios corporativos em excelência operacional.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/company/33236785/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#6a00a3] hover:border-transparent transition-all">
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
          <h4 className="font-bold text-lg mb-6">Consultoria</h4>
          <ul className="space-y-3 text-slate-300">
            <li><Link to="/consultoria/iso" className="hover:text-white transition-colors">Sistemas ISO</Link></li>
            <li><Link to="/consultoria/risco" className="hover:text-white transition-colors">Notação de Risco</Link></li>
            <li><Link to="/consultoria/procurement" className="hover:text-white transition-colors">Procurement</Link></li>
            <li><Link to="/consultoria/pmo" className="hover:text-white transition-colors">Project Management</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Academia</h4>
          <ul className="space-y-3 text-slate-300">
            <li><Link to="/academia/cursos" className="hover:text-white transition-colors">Catálogo de Cursos</Link></li>
            <li><Link to="/academia/verificar" className="hover:text-white transition-colors">Validar Certificado</Link></li>
            <li><Link to="/academia/alumni" className="hover:text-white transition-colors">Portal Alumni</Link></li>
            <li><Link to="/academia/scr" className="hover:text-white transition-colors">School of Reputation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Contacto</h4>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#6a00a3] shrink-0" />
              <span className="text-sm">Luanda, Projeto Nova Vida, Prédio E209 Apt 24</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-[#6a00a3] shrink-0" />
              <span className="text-sm">+244 935 793 270</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-[#6a00a3] shrink-0" />
              <span className="text-sm">geral@ilungi.ao</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs">
        <p>&copy; {new Date().getFullYear()} ILUNGI Corporate. Todos os direitos reservados.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacidade</a>
          <a href="#" className="hover:text-white">Termos de Uso</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
