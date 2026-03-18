import React, { useState, useEffect, useLayoutEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { translations } from './translations';
import { Language } from './types';
import { getContent, syncContentFromRemote } from './lib/contentManager';
import { purgeAllDataIfNeeded, setDataMode } from './lib/dataSync';
import { AlumniAuthProvider } from './lib/authContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Consulting from './pages/Consulting';
import ISOPage from './pages/ISOPage';
import Academy from './pages/Academy';
import AILUNGIPortal from './pages/AILUNGIPortal';
import AILUNGILogin from './pages/AILUNGILogin';
import AILUNGIRegister from './pages/AILUNGIRegister';
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
import CoursePlayer from './pages/CoursePlayer';
import Blog from './pages/Blog';
import { AnimatePresence } from 'framer-motion';

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
  const [isAllowed, setIsAllowed] = useState<boolean>(() => {
    return sessionStorage.getItem('ilungi_admin') === 'true' && !!sessionStorage.getItem('ilungi_admin_token');
  });

  useEffect(() => {
    const sync = () => {
      setIsAllowed(sessionStorage.getItem('ilungi_admin') === 'true' && !!sessionStorage.getItem('ilungi_admin_token'));
    };
    window.addEventListener('storage', sync);
    window.addEventListener('ilungi-admin-auth', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('ilungi-admin-auth', sync);
    };
  }, []);

  if (!isAllowed) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

const AppShell: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [lang, setLangState] = useState<Language>(() => {
    const saved = sessionStorage.getItem('ilungi_lang');
    return (saved as Language) || 'pt';
  });
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('ilungi_dark');
    return saved === 'true';
  });
  const [isEditing, setIsEditing] = useState<boolean>(() => {
    return sessionStorage.getItem('ilungi_editing') === 'true';
  });

  const handleSetIsEditing = (e: boolean) => {
    setIsEditing(e);
    sessionStorage.setItem('ilungi_editing', e ? 'true' : 'false');
  };

  const setLang = (l: Language) => {
    setLangState(l);
    sessionStorage.setItem('ilungi_lang', l);
  };

  const handleSetIsDark = (d: boolean) => {
    setIsDark(d);
    sessionStorage.setItem('ilungi_dark', d ? 'true' : 'false');
  };

  useLayoutEffect(() => {
    setDataMode(isAdminRoute ? 'admin' : 'public');
  }, [isAdminRoute]);

  const [t, setT] = useState<any>(() => getContent(lang));

  useEffect(() => {
    setT(getContent(lang));
  }, [lang]);

  useEffect(() => {
    if (!isAdminRoute) return;
    void purgeAllDataIfNeeded();
  }, [isAdminRoute]);

  useEffect(() => {
    let isMounted = true;
    const handleContentUpdate = () => {
      setT(getContent(lang));
    };
    window.addEventListener('ilungi-content-updated', handleContentUpdate);
    if (!isAdminRoute) {
      syncContentFromRemote().then((updated) => {
        if (!isMounted || !updated) return;
        setT(getContent(lang));
      });
    }
    return () => {
      isMounted = false;
      window.removeEventListener('ilungi-content-updated', handleContentUpdate);
    };
  }, [lang, isAdminRoute]);

  return (
    <AppContext.Provider value={{ lang, setLang, isDark, setIsDark: handleSetIsDark, t, isEditing, setIsEditing: handleSetIsEditing }}>
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
              <Route path="/academia/alumni" element={<AILUNGIPortal />} />
              <Route path="/academia/login" element={<AILUNGILogin />} />
              <Route path="/academia/registar" element={<AILUNGIRegister />} />
              <Route path="/academia/verificar" element={<CertificateVerify />} />
              <Route path="/academia/cursos" element={<CourseCatalog />} />
              <Route path="/academia/curso/:courseId" element={<CoursePlayer />} />
              <Route path="/solucoes" element={<Solutions />} />
              <Route path="/solucoes/salya" element={<ProductDemo productName="Salya" />} />
              <Route path="/solucoes/tocomply" element={<ProductDemo productName="Tocomply360" />} />
              <Route path="/parceiros" element={<Partners />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
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
        
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

const App: React.FC = () => (
  <AlumniAuthProvider>
    <Router>
      <AppShell />
    </Router>
  </AlumniAuthProvider>
);

export default App;
