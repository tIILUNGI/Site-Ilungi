import React, { useState, useEffect, useLayoutEffect, createContext, useContext, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { translations } from './translations';
import { Language } from './types';
import { getContent, syncContentFromRemote } from './lib/contentManager';
import { purgeAllDataIfNeeded } from './lib/dataSync';
import { AlumniAuthProvider } from './lib/authContext';
import { trackPageView } from './lib/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AnimatePresence } from 'framer-motion';
import { RouteSeoManager } from './components/Seo';

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

const Home = lazy(() => import('./pages/Home'));
const Consulting = lazy(() => import('./pages/Consulting'));
const ISOPage = lazy(() => import('./pages/ISOPage'));
const Academy = lazy(() => import('./pages/Academy'));
const AILUNGIPortal = lazy(() => import('./pages/AILUNGIPortal'));
const AILUNGILogin = lazy(() => import('./pages/AILUNGILogin'));
const AILUNGIRegister = lazy(() => import('./pages/AILUNGIRegister'));
const CertificateVerify = lazy(() => import('./pages/CertificateVerify'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductDemo = lazy(() => import('./pages/ProductDemo'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Partners = lazy(() => import('./pages/Partners'));
const ReferenceDetail = lazy(() => import('./pages/ReferenceDetail'));
const AdminReferences = lazy(() => import('./pages/AdminReferences'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminSolutions = lazy(() => import('./pages/AdminSolutions'));
const AdminPartners = lazy(() => import('./pages/AdminPartners'));
const AdminServices = lazy(() => import('./pages/AdminServices'));
const AdminCourses = lazy(() => import('./pages/AdminCourses'));
const AdminBlog = lazy(() => import('./pages/AdminBlog'));
const AdminConfig = lazy(() => import('./pages/AdminConfig'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics'));
const Certifications = lazy(() => import('./pages/Certifications'));
const CourseCatalog = lazy(() => import('./pages/CourseCatalog'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const Blog = lazy(() => import('./pages/Blog'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Track page view on route change
    trackPageView();
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
    console.log(`[APP] Editing mode: ${e}`);
    setIsEditing(e);
    sessionStorage.setItem('ilungi_editing', e ? 'true' : 'false');
  };

  const setLang = (l: Language) => {
    console.log(`[APP] Language changed to: ${l}`);
    setLangState(l);
    sessionStorage.setItem('ilungi_lang', l);
  };

  const handleSetIsDark = (d: boolean) => {
    console.log(`[APP] Theme changed to: ${d ? 'dark' : 'light'}`);
    setIsDark(d);
    sessionStorage.setItem('ilungi_dark', d ? 'true' : 'false');
  };



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
        <RouteSeoManager />
        <Navbar />
        <main className="pt-20">
          <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-slate-500">A carregar...</div>}>
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
                <Route path="/admin/analytics" element={<RequireAdmin><AdminAnalytics /></RequireAdmin>} />
                <Route path="/certificacoes" element={<Certifications />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
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
