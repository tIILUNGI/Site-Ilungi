import { createClient } from '@supabase/supabase-js';

// Obtenha estas chaves criando um projeto gratuito em: https://supabase.com
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Inicializamos o "Modo Real" se você tiver colocado as chaves no ficheiro '.env.local'
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
