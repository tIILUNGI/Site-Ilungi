
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
import { AnimatePresence } from 'framer-motion';

// Context for Language and Dark Mode
interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  isDark: boolean;
  setIsDark: (d: boolean) => void;
  t: typeof translations.pt;
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
  const [isDark, setIsDark] = useState(false);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('ilungi_lang', l);
  };

  const t = translations[lang];

  return (
    <AppContext.Provider value={{ lang, setLang, isDark, setIsDark, t }}>
      <Router>
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
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
                <Route path="/solucoes" element={<Solutions />} />
                <Route path="/solucoes/salya" element={<ProductDemo productName="Salya" />} />
                <Route path="/solucoes/tocomply" element={<ProductDemo productName="Tocomply360" />} />
                <Route path="/parceiros" element={<Partners />} />
                <Route path="/contacto" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
