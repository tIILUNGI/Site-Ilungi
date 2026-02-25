import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { translations } from './translations';
import { Language } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Consulting from './pages/Consulting';
import ISOPage from './pages/ISOPage';
import Academy from './pages/Academy';
import AlumniPortal from './pages/AlumniPortal';
import AlumniLogin from './pages/AlumniLogin';
import CertificateVerify from './pages/CertificateVerify';
import Solutions from './pages/Solutions';
import Contact from './pages/Contact';
import ProductDemo from './pages/ProductDemo';
import ServiceDetail from './pages/ServiceDetail';
import Partners from './pages/Partners';
import ReferenceDetail from './pages/ReferenceDetail';
import AdminReferences from './pages/AdminReferences';
import AdminDashboard from './pages/AdminDashboard';
import AdminSolutions from './pages/AdminSolutions';
import AdminPartners from './pages/AdminPartners';
import AdminServices from './pages/AdminServices';
import AdminBlog from './pages/AdminBlog';
import AdminConfig from './pages/AdminConfig';
import Certifications from './pages/Certifications';
import CourseCatalog from './pages/CourseCatalog';
import { AnimatePresence } from 'framer-motion';

// Context for Language and Dark Mode
interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  isDark: boolean;
  setIsDark: (d: boolean) => void;
  t: typeof translations.pt;
  isEditing: boolean;
  setIsEditing: (d: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('ilungi_lang');
    return (saved as Language) || 'pt';
  });
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('ilungi_dark');
    return saved === 'true';
  });
  const [isEditing, setIsEditing] = useState<boolean>(() => {
    return localStorage.getItem('ilungi_editing') === 'true';
  });

  const handleSetIsEditing = (e: boolean) => {
    setIsEditing(e);
    localStorage.setItem('ilungi_editing', e ? 'true' : 'false');
  };

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('ilungi_lang', l);
  };

  const handleSetIsDark = (d: boolean) => {
    setIsDark(d);
    localStorage.setItem('ilungi_dark', d ? 'true' : 'false');
  };

  const t = translations[lang];

  return (
    <AppContext.Provider value={{ lang, setLang, isDark, setIsDark: handleSetIsDark, t, isEditing, setIsEditing: handleSetIsEditing }}>
      <Router>
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'theme-dark bg-gray-900 text-white' : 'theme-light bg-slate-50 text-slate-900'}`}>
          <ScrollToTop />
          <Navbar />
          <main className="pt-20">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/consultoria" element={<Consulting />} />
                <Route path="/consultoria/iso" element={<ISOPage />} />
                <Route path="/consultoria/risco" element={<ServiceDetail type="risk" />} />
                <Route path="/consultoria/procurement" element={<ServiceDetail type="procurement" />} />
                <Route path="/consultoria/pmo" element={<ServiceDetail type="pmo" />} />
                <Route path="/academia" element={<Academy />} />
                <Route path="/academia/alumni" element={<AlumniPortal />} />
                <Route path="/academia/login" element={<AlumniLogin />} />
                <Route path="/academia/verificar" element={<CertificateVerify />} />
                <Route path="/academia/cursos" element={<CourseCatalog />} />
                <Route path="/solucoes" element={<Solutions />} />
                <Route path="/solucoes/salya" element={<ProductDemo productName="Salya" />} />
                <Route path="/solucoes/tocomply" element={<ProductDemo productName="Tocomply360" />} />
                <Route path="/parceiros" element={<Partners />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/referencia/:id" element={<ReferenceDetail />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/solucoes" element={<AdminSolutions />} />
                <Route path="/admin/parceiros" element={<AdminPartners />} />
                <Route path="/admin/servicos" element={<AdminServices />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/configuracoes" element={<AdminConfig />} />
                <Route path="/admin/referencias" element={<AdminReferences />} />
                <Route path="/certificacoes" element={<Certifications />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          {/* Floating WhatsApp Button */}
          <a 
            href="https://wa.me/244935793270" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 transition-all transform hover:scale-110 animate-bounce"
            aria-label="WhatsApp"
          >
            <img 
              src="/imagens/whatsapp-icon.jpg" 
              alt="WhatsApp" 
              className="w-16 h-16 rounded-full shadow-2xl hover:shadow-green-500/50"
            />
          </a>
          
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
