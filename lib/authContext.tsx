import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from './supabase';
import { User, Session } from '@supabase/supabase-js';

interface AlumniUser {
  id: string;
  email: string;
  nome_completo: string;
  receber_notificacoes: boolean;
  email_confirmado: boolean;
  created_at: string;
}

interface AuthContextType {
  user: AlumniUser | null;
  session: Session | null;
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

export const AlumniAuthProvider: React.FC<AlumniAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AlumniUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    const initializeAuth = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session?.user) {
        // Fetch user profile from custom table
        const { data: profile } = await supabase
          .from('alunos')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setUser(profile);
        }
      }
      setLoading(false);
    };

    initializeAuth();

    // Listen for auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('alunos')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser(profile);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const signUp = async (email: string, password: string, nomeCompleto: string, receberNotificacoes: boolean): Promise<{ error: Error | null }> => {
    if (!supabase) {
      return { error: new Error('Supabase não está configurado') };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome_completo: nomeCompleto,
            receber_notificacoes: receberNotificacoes
          }
        }
      });

      if (error) throw error;

      // Create profile in alumni table
      if (data.user) {
        await supabase.from('alunos').insert({
          id: data.user.id,
          email,
          nome_completo: nomeCompleto,
          receber_notificacoes: receberNotificacoes,
          email_confirmado: false
        });
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    if (!supabase) {
      return { error: new Error('Supabase não está configurado') };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    if (!supabase) return;
    
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email: string): Promise<{ error: Error | null }> => {
    if (!supabase) {
      return { error: new Error('Supabase não está configurado') };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/academia/reset-password`
      });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
