import { translations } from '../translations';
import { endpoints } from './api';

// Content storage - strictly using in-memory or backend
let currentContent: any = { ...translations };

export const getContent = (lang: 'pt' | 'en') => {
  return currentContent[lang] || currentContent.pt;
};

export const saveContent = async (lang: 'pt' | 'en', newContent: any) => {
  currentContent[lang] = newContent;
  await saveAllContentRemote(currentContent);
};

export const resetContent = async (lang: 'pt' | 'en') => {
  currentContent[lang] = JSON.parse(JSON.stringify(translations[lang]));
  await saveAllContentRemote(currentContent);
};

export const resetAllContent = async () => {
  currentContent = JSON.parse(JSON.stringify(translations));
  await saveAllContentRemote(currentContent);
};

export const exportContent = () => {
  return JSON.stringify(currentContent, null, 2);
};

export const importContent = async (json: string) => {
  try {
    const imported = JSON.parse(json);
    currentContent = imported;
    await saveAllContentRemote(currentContent);
  } catch (e) {
    console.error('Failed to import content', e);
    throw e;
  }
};

export const syncContentFromRemote = async () => {
  try {
    const remoteConfig = await endpoints.config.get();
    if (remoteConfig) {
       currentContent = { ...currentContent, ...remoteConfig };
       return true;
    }
  } catch (error) {
    console.error('Failed to sync content from remote', error);
  }
  return false;
};

export const saveAllContentRemote = async (allContent: any) => {
  try {
    await endpoints.config.update(allContent);
  } catch (error) {
    console.error('Failed to save content to remote', error);
  }
};
