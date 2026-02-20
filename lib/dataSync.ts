import { supabase } from './supabase';

export const loadData = async (table: string, localKey: string, defaultData: any) => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from(table).select('*');
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch(e) {}
  }
  const saved = localStorage.getItem(localKey);
  return saved ? JSON.parse(saved) : defaultData;
};

export const saveDataAdmin = async (table: string, localKey: string, newData: any[]) => {
  localStorage.setItem(localKey, JSON.stringify(newData));
  if (supabase) {
    try {
      await supabase.from(table).delete().neq('id', '0');
      if (newData.length > 0) {
        await supabase.from(table).insert(newData);
      }
    } catch(e) {}
  }
};

export const loadConfig = async (localKey: string, defaultData: any) => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('global_config').select('*').eq('id', 1).single();
      if (!error && data) {
         return data;
      }
    } catch (e) {}
  }
  const saved = localStorage.getItem(localKey);
  if (saved) {
     return { ...defaultData, ...JSON.parse(saved) };
  }
  return defaultData;
}

export const saveConfigAdmin = async (localKey: string, config: any) => {
  localStorage.setItem(localKey, JSON.stringify(config));
  if (supabase) {
    try {
      const { data } = await supabase.from('global_config').select('id').eq('id', 1).single();
      if (data) {
        await supabase.from('global_config').update(config).eq('id', 1);
      } else {
        await supabase.from('global_config').insert({ id: 1, ...config });
      }
    } catch(e) {}
  }
};
