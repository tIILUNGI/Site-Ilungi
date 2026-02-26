import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { translations } from './translations';
import { Language } from './types';
import { getContent, syncContentFromRemote } from './lib/contentManager';
import { supabase } from './lib/supabase';
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
import AdminCourses from './pages/AdminCourses';
import AdminBlog from './pages/AdminBlog';
import AdminConfig from './pages/AdminConfig';
import AdminLogin from './pages/AdminLogin';
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

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang } = useAppContext();
  const isPt = lang === 'pt';
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!supabase) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setHasSession(!!data.session);
      setChecking(false);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
    });
    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  if (!supabase) {
    return (
      <div className="pt-32 text-center text-slate-500">
        {isPt ? 'Supabase não está configurado.' : 'Supabase is not configured.'}
      </div>
    );
  }

  if (checking) {
    return (
      <div className="pt-32 text-center text-slate-500">
        {isPt ? 'A carregar...' : 'Loading...'}
      </div>
    );
  }

  if (!hasSession) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
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

  const [t, setT] = useState<any>(() => getContent(lang));

  useEffect(() => {
    setT(getContent(lang));
  }, [lang]);

  useEffect(() => {
    let isMounted = true;
    syncContentFromRemote().then((updated) => {
      if (!isMounted || !updated) return;
      setT(getContent(lang));
    });
    const handleContentUpdate = () => {
      setT(getContent(lang));
    };
    window.addEventListener('ilungi-content-updated', handleContentUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('ilungi-content-updated', handleContentUpdate);
    };
  }, [lang]);

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
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
                <Route path="/admin/solucoes" element={<RequireAdmin><AdminSolutions /></RequireAdmin>} />
                <Route path="/admin/parceiros" element={<RequireAdmin><AdminPartners /></RequireAdmin>} />
                <Route path="/admin/servicos" element={<RequireAdmin><AdminServices /></RequireAdmin>} />
                <Route path="/admin/cursos" element={<RequireAdmin><AdminCourses /></RequireAdmin>} />
                <Route path="/admin/blog" element={<RequireAdmin><AdminBlog /></RequireAdmin>} />
                <Route path="/admin/configuracoes" element={<RequireAdmin><AdminConfig /></RequireAdmin>} />
                <Route path="/admin/referencias" element={<RequireAdmin><AdminReferences /></RequireAdmin>} />
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
