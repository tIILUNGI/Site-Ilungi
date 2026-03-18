import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { endpoints } from './api';

export interface AlumniUser {
  id: string;
  email: string;
  nome_completo: string;
  receber_notificacoes: boolean;
  email_confirmado: boolean;
  role?: string;
  created_at?: string;
}

type Session = { token: string } | null;

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

const STORAGE_TOKEN = 'alumni_token';

export const AlumniAuthProvider: React.FC<AlumniAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AlumniUser | null>(null);
  const [session, setSession] = useState<Session>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (token: string) => {
    try {
      // endpoints.auth.profile automatically uses the token from sessionStorage in API client
      const profileData = await endpoints.auth.profile();
      setUser(profileData);
      setSession({ token });
    } catch (error) {
      console.error('Failed to fetch alumni profile:', error);
      sessionStorage.removeItem(STORAGE_TOKEN);
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sync = () => {
      const token = sessionStorage.getItem(STORAGE_TOKEN);
      if (token) {
        fetchProfile(token);
      } else {
        setUser(null);
        setSession(null);
        setLoading(false);
      }
    };

    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('ilungi-alumni-auth', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('ilungi-alumni-auth', sync);
    };
  }, []);

  const signUp = async (email: string, password: string, nomeCompleto: string, receberNotificacoes: boolean): Promise<{ error: Error | null }> => {
    try {
      const response = await endpoints.auth.register({
        email,
        password,
        nome_completo: nomeCompleto,
        receber_notificacoes: receberNotificacoes
      });
      
      if (response.token) {
        sessionStorage.setItem(STORAGE_TOKEN, response.token);
        setUser({
          id: response.id,
          email: response.email,
          nome_completo: response.nome_completo,
          receber_notificacoes: response.receber_notificacoes,
          email_confirmado: response.email_confirmado,
          role: response.role
        });
        setSession({ token: response.token });
        window.dispatchEvent(new Event('ilungi-alumni-auth'));
        return { error: null };
      }
      return { error: new Error('Token não recebido após o registo.') };
    } catch (error: any) {
      return { error: new Error(error.message || 'Erro ao criar conta.') };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    try {
      const response = await endpoints.auth.login({ email, password });
      
      if (response.token) {
        sessionStorage.setItem(STORAGE_TOKEN, response.token);
        setUser({
          id: response.id,
          email: response.email,
          nome_completo: response.nome_completo,
          receber_notificacoes: response.receber_notificacoes,
          email_confirmado: response.email_confirmado,
          role: response.role
        });
        setSession({ token: response.token });
        window.dispatchEvent(new Event('ilungi-alumni-auth'));
        return { error: null };
      }
      return { error: new Error('Token não recebido após o login.') };
    } catch (error: any) {
      return { error: new Error(error.message || 'Credenciais inválidas.') };
    }
  };

  const signOut = async () => {
    sessionStorage.removeItem(STORAGE_TOKEN);
    setUser(null);
    setSession(null);
    window.dispatchEvent(new Event('ilungi-alumni-auth'));
  };

  const resetPassword = async (email: string): Promise<{ error: Error | null }> => {
    // Requires backend implementation for /auth/forgot-password if needed via endpoints
    return { error: new Error('Funcionalidade não implementada.') };
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
