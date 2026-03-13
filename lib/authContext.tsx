import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AlumniUser {
  id: string;
  email: string;
  nome_completo: string;
  receber_notificacoes: boolean;
  email_confirmado: boolean;
  created_at: string;
}

type Session = null;

interface AuthContextType {
  user: AlumniUser | null;
  session: Session;
  loading: boolean;
  signUp: (email: string, password: string, nomeCompleto: string, receberNotificacoes: boolean) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAlumniAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAlumniAuth must be used within AlumniAuthProvider");
  }
  return context;
};

interface AlumniAuthProviderProps {
  children: ReactNode;
}

const STORAGE_PROFILE = 'alumni_profile';
const STORAGE_EMAIL = 'alumni_email';
const STORAGE_LOGGED = 'alumni_logged_in';

const readStoredUser = (): AlumniUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_PROFILE);
    if (raw) return JSON.parse(raw) as AlumniUser;
    const email = localStorage.getItem(STORAGE_EMAIL);
    if (!email) return null;
    return {
      id: `local-${email}`,
      email,
      nome_completo: email.split('@')[0] || 'Aluno',
      receber_notificacoes: false,
      email_confirmado: false,
      created_at: new Date().toISOString()
    };
  } catch {
    return null;
  }
};

const storeUser = (user: AlumniUser) => {
  try {
    localStorage.setItem(STORAGE_PROFILE, JSON.stringify(user));
    localStorage.setItem(STORAGE_EMAIL, user.email);
  } catch {}
};

const setLoggedIn = (value: boolean) => {
  try {
    localStorage.setItem(STORAGE_LOGGED, value ? 'true' : 'false');
  } catch {}
};

export const AlumniAuthProvider: React.FC<AlumniAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AlumniUser | null>(null);
  const [session, setSession] = useState<Session>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sync = () => {
      const logged = localStorage.getItem(STORAGE_LOGGED) === 'true';
      const stored = readStoredUser();
      setUser(logged ? stored : null);
      setLoading(false);
    };

    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('ilungi-alumni-auth', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('ilungi-alumni-auth', sync);
    };
  }, []);

  const signUp = async (email: string, _password: string, nomeCompleto: string, receberNotificacoes: boolean): Promise<{ error: Error | null }> => {
    try {
      const profile: AlumniUser = {
        id: `local-${Date.now()}`,
        email,
        nome_completo: nomeCompleto,
        receber_notificacoes: receberNotificacoes,
        email_confirmado: false,
        created_at: new Date().toISOString()
      };
      storeUser(profile);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, _password: string): Promise<{ error: Error | null }> => {
    try {
      const profile =
        readStoredUser() ||
        ({
          id: `local-${Date.now()}`,
          email,
          nome_completo: email.split('@')[0] || 'Aluno',
          receber_notificacoes: false,
          email_confirmado: false,
          created_at: new Date().toISOString()
        } as AlumniUser);

      storeUser(profile);
      setLoggedIn(true);
      setUser(profile);
      window.dispatchEvent(new Event('ilungi-alumni-auth'));
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem(STORAGE_PROFILE);
      localStorage.removeItem(STORAGE_EMAIL);
      localStorage.removeItem(STORAGE_LOGGED);
    } catch {}
    setUser(null);
    setSession(null);
    window.dispatchEvent(new Event('ilungi-alumni-auth'));
  };

  const resetPassword = async (_email: string): Promise<{ error: Error | null }> => {
    return { error: null };
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
