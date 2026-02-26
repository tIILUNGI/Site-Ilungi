import { translations } from '../translations';
import { Language } from '../types';
import { supabase } from './supabase';

// Default content from translations
const defaultContent = translations;

const isObject = (value: any) => value && typeof value === 'object' && !Array.isArray(value);

const REMOTE_TABLE = 'site_content';
const REMOTE_ROW_ID = 1;

const deepMerge = (base: any, override: any): any => {
  if (Array.isArray(base)) {
    return override !== undefined ? override : base;
  }
  if (isObject(base)) {
    const result: any = { ...base };
    if (isObject(override)) {
      Object.keys(override).forEach((key) => {
        result[key] = deepMerge(base[key], override[key]);
      });
    }
    return result;
  }
  return override !== undefined ? override : base;
};

const getStoredContent = (lang: Language): any => {
  try {
    const saved = localStorage.getItem(`ilungi_content_${lang}`);
    return saved ? JSON.parse(saved) : defaultContent[lang];
  } catch (e) {
    return defaultContent[lang];
  }
};

export const syncContentFromRemote = async (): Promise<boolean> => {
  if (!supabase) return false;
  try {
    const { data, error } = await supabase
      .from(REMOTE_TABLE)
      .select('pt,en')
      .eq('id', REMOTE_ROW_ID)
      .single();
    if (error || !data) return false;

    if (data.pt) {
      localStorage.setItem('ilungi_content_pt', JSON.stringify(data.pt));
    }
    if (data.en) {
      localStorage.setItem('ilungi_content_en', JSON.stringify(data.en));
    }
    return true;
  } catch (e) {
    console.error('Error loading remote content:', e);
    return false;
  }
};

const saveAllContentRemote = async (): Promise<void> => {
  if (!supabase) return;
  try {
    const pt = getStoredContent('pt');
    const en = getStoredContent('en');
    await supabase.from(REMOTE_TABLE).upsert(
      { id: REMOTE_ROW_ID, pt, en },
      { onConflict: 'id' }
    );
  } catch (e) {
    console.error('Error saving remote content:', e);
  }
};

// Get content from localStorage or use defaults
export const getContent = (lang: Language): any => {
  try {
    const saved = localStorage.getItem(`ilungi_content_${lang}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      return deepMerge(defaultContent[lang], parsed);
    }
  } catch (e) {
    console.error('Error loading content:', e);
  }
  return defaultContent[lang];
};

// Save content to localStorage
export const saveContent = (lang: Language, content: any): void => {
  try {
    localStorage.setItem(`ilungi_content_${lang}`, JSON.stringify(content));
    void saveAllContentRemote();
  } catch (e) {
    console.error('Error saving content:', e);
  }
};

// Update a specific field in the content
export const updateContentField = (lang: Language, path: string, value: string): void => {
  const content = getContent(lang);
  const keys = path.split('.');
  let current: any = content;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (current[keys[i]] === undefined) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  saveContent(lang, content);
};

// Reset content to defaults
export const resetContent = (lang: Language): void => {
  localStorage.removeItem(`ilungi_content_${lang}`);
  void saveAllContentRemote();
};

// Reset all content
export const resetAllContent = (): void => {
  localStorage.removeItem('ilungi_content_pt');
  localStorage.removeItem('ilungi_content_en');
  void saveAllContentRemote();
};

// Export content for backup
export const exportContent = (): string => {
  const pt = getContent('pt');
  const en = getContent('en');
  return JSON.stringify({ pt, en }, null, 2);
};

// Import content from backup
export const importContent = (data: string): void => {
  try {
    const { pt, en } = JSON.parse(data);
    if (pt) saveContent('pt', pt);
    if (en) saveContent('en', en);
  } catch (e) {
    console.error('Error importing content:', e);
  }
};
