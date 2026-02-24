import { translations } from '../translations';
import { Language } from '../types';

// Default content from translations
const defaultContent = translations;

// Get content from localStorage or use defaults
export const getContent = (lang: Language): any => {
  try {
    const saved = localStorage.getItem(`ilungi_content_${lang}`);
    if (saved) {
      return JSON.parse(saved);
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
};

// Reset all content
export const resetAllContent = (): void => {
  localStorage.removeItem('ilungi_content_pt');
  localStorage.removeItem('ilungi_content_en');
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
