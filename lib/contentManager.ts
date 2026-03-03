import { translations } from '../translations';
import { Language } from '../types';
import { supabase } from './supabase';

// Default content from translations
const defaultContent = translations;

const CONTENT_VERSION = '2026-03-03-5';
const CONTENT_VERSION_KEY = 'ilungi_content_version';
const CONTENT_BASE_KEY_PREFIX = 'ilungi_content_base_';

const isContentVersionCurrent = () => {
  try {
    return localStorage.getItem(CONTENT_VERSION_KEY) === CONTENT_VERSION;
  } catch {
    return true;
  }
};

const markContentVersion = () => {
  try {
    localStorage.setItem(CONTENT_VERSION_KEY, CONTENT_VERSION);
  } catch {}
};

const isObject = (value: any) => value && typeof value === 'object' && !Array.isArray(value);

const REMOTE_TABLE = 'site_content';
const REMOTE_ROW_ID = 1;

const mergeArrayById = (base: any[], override: any[]) => {
  const baseById = new Map<string, any>();
  base.forEach((item) => {
    if (item?.id) baseById.set(item.id, item);
  });
  const merged: any[] = [];
  const used = new Set<string>();

  override.forEach((item) => {
    if (item?.id && baseById.has(item.id)) {
      merged.push(deepMerge(baseById.get(item.id), item));
      used.add(item.id);
    } else {
      merged.push(item);
    }
  });

  base.forEach((item) => {
    if (item?.id && !used.has(item.id)) {
      merged.push(item);
    }
  });

  return merged;
};

const getBaseSnapshot = (lang: Language): any | null => {
  try {
    const saved = localStorage.getItem(`${CONTENT_BASE_KEY_PREFIX}${lang}`);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const setBaseSnapshot = (lang: Language): void => {
  try {
    localStorage.setItem(`${CONTENT_BASE_KEY_PREFIX}${lang}`, JSON.stringify(defaultContent[lang]));
  } catch {}
};

const isStringArray = (value: any[]): value is string[] =>
  value.every((item) => typeof item === 'string');

const mergeStringArray = (base: string[], override: string[]) => {
  const merged = [...override];
  const seen = new Set(override);
  base.forEach((item) => {
    if (!seen.has(item)) {
      seen.add(item);
      merged.push(item);
    }
  });
  return merged;
};

const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }
  return false;
};

const mergeArrayByIdWithBase = (base: any[], local: any[], incoming: any[]) => {
  const baseById = new Map<string, any>();
  base.forEach((item) => {
    if (item?.id) baseById.set(item.id, item);
  });
  const incomingById = new Map<string, any>();
  incoming.forEach((item) => {
    if (item?.id) incomingById.set(item.id, item);
  });

  const merged: any[] = [];
  const used = new Set<string>();

  local.forEach((item) => {
    if (!item?.id) {
      merged.push(item);
      return;
    }
    const baseItem = baseById.get(item.id);
    const incomingItem = incomingById.get(item.id);
    if (!incomingItem) {
      merged.push(item);
      used.add(item.id);
      return;
    }
    if (baseItem) {
      merged.push(mergeWithBase(baseItem, item, incomingItem));
    } else {
      merged.push(item);
    }
    used.add(item.id);
  });

  incoming.forEach((item) => {
    if (item?.id && !used.has(item.id)) {
      merged.push(item);
    }
  });

  return merged;
};

const mergeWithBase = (base: any, local: any, incoming: any): any => {
  if (deepEqual(local, base)) {
    return incoming !== undefined ? incoming : local;
  }
  if (Array.isArray(base) && Array.isArray(local) && Array.isArray(incoming)) {
    if (isStringArray(base) && isStringArray(local) && isStringArray(incoming)) {
      return mergeStringArray(incoming, local);
    }
    const baseHasIds = base.every((item) => isObject(item) && 'id' in item);
    const localAreObjects = local.every((item) => isObject(item));
    const incomingAreObjects = incoming.every((item) => isObject(item));
    if (baseHasIds && localAreObjects && incomingAreObjects) {
      return mergeArrayByIdWithBase(base, local, incoming);
    }
    return local;
  }
  if (isObject(base) && isObject(local) && isObject(incoming)) {
    const result: any = {};
    const keys = new Set([
      ...Object.keys(base),
      ...Object.keys(local),
      ...Object.keys(incoming)
    ]);
    keys.forEach((key) => {
      const hasLocal = Object.prototype.hasOwnProperty.call(local, key);
      const hasBase = Object.prototype.hasOwnProperty.call(base, key);
      const hasIncoming = Object.prototype.hasOwnProperty.call(incoming, key);
      if (!hasLocal) {
        if (hasIncoming) result[key] = incoming[key];
        return;
      }
      if (!hasBase) {
        result[key] = local[key];
        return;
      }
      result[key] = mergeWithBase(base[key], local[key], hasIncoming ? incoming[key] : undefined);
    });
    return result;
  }
  return local;
};

const applyReferenceOverrides = (lang: Language, content: any) => {
  if (!content?.references?.clients || !defaultContent[lang]?.references?.clients) return content;
  const defaultsById = new Map<string, any>();
  defaultContent[lang].references.clients.forEach((client: any) => {
    if (client?.id) defaultsById.set(client.id, client);
  });
  content.references.clients = content.references.clients.map((client: any) => {
    if (!client?.id) return client;
    if (client.id === 'petromar') {
      const def = defaultsById.get('petromar');
      if (!def) return client;
      return {
        ...client,
        service: def.service,
        role: def.role,
        comment: def.comment,
        description: def.description,
        logo: def.logo
      };
    }
    return client;
  });
  return content;
};

const applyIsoTextOverrides = (lang: Language, content: any) => {
  const legacyBenefitPrefixes: Record<string, Record<string, string>> = {
    pt: {
      "9001": "A certificação ISO 9001 é o padrão global de excelência!",
      "14001": "Demonstre seu compromisso com o planeta",
      "45001": "Crie um ambiente de trabalho",
      "27001": "Na era digital",
      "22301": "Esteja preparado para o inesperado",
      "37001": "Combata a corrupção",
      "37301": "Transforme o compliance",
      "31000": "Tome decisões informadas",
      "22000": "Garanta a segurança de cada produto"
    },
    en: {
      "9001": "ISO 9001 certification is the global standard of excellence!",
      "14001": "Demonstrate your commitment to the planet",
      "45001": "Create a work environment where every employee feels protected",
      "27001": "In the digital age, information is your most valuable asset!",
      "22301": "Be prepared for the unexpected!",
      "37001": "Combat corruption in a structured and demonstrable way!",
      "37301": "Turn compliance into a competitive advantage!",
      "31000": "Make informed and strategic decisions!",
      "22000": "Guarantee the safety of every product leaving your facilities!"
    }
  };

  if (content?.services?.iso?.items) {
    const prefixes = legacyBenefitPrefixes[lang] || {};
    Object.keys(prefixes).forEach((key) => {
      const current = content.services.iso.items?.[key]?.benefit;
      const prefix = prefixes[key];
      if (typeof current === 'string' && current.startsWith(prefix)) {
        content.services.iso.items[key].benefit =
          defaultContent[lang].services.iso.items[key].benefit;
      }
    });
  }

  if (lang !== 'pt') return content;
  const legacyServiceContent =
    "Actuamos na implementação a medida e cirúrgica de sistemas de gestão baseada na normas ISSO, acompanhamos nossos parceiros até a auditoria de certificação, bem como realizamos auditorias de internas e de fornecedores.\nIMPLEMENTAÇAO E AUDITORIA EM SISTEMAS DE GESTÃO:\nGestão de Qualidade ISO 9001\nGestão Ambiental ISO 14001\nGestão de Saúde e Segurança Ocupacional ISO 45001 \nGestão de Informação ISO 27001\nGestão de Compliance e Antissuborno ISO 37001 e ISO 37301\nGestão da Segurança Alimentar ISO 22000 / HACCP\nGestão de Risco ISO 31000 e COSO";
  const legacyIsoSubtitle =
    "Actuamos na implementação a medida e cirúrgica de sistemas de gestão baseada na normas ISO, acompanhamos nossos parceiros até a auditoria de certificação, bem como realizamos auditorias internas e de fornecedores.";

  if (content?.services?.iso?.content === legacyServiceContent) {
    content.services.iso.content = defaultContent[lang].services.iso.content;
  }
  if (content?.iso?.subtitle === legacyIsoSubtitle) {
    content.iso.subtitle = defaultContent[lang].iso.subtitle;
  }
  return content;
};

const applyContentOverrides = (lang: Language, content: any) => {
  return applyIsoTextOverrides(lang, applyReferenceOverrides(lang, content));
};

const deepMerge = (base: any, override: any): any => {
  if (Array.isArray(base) && Array.isArray(override)) {
    if (isStringArray(base) && isStringArray(override)) {
      return mergeStringArray(base, override);
    }
    const baseHasIds = base.every((item) => isObject(item) && 'id' in item);
    const overrideAreObjects = override.every((item) => isObject(item));
    if (baseHasIds && overrideAreObjects) {
      return mergeArrayById(base, override);
    }
    return override;
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
  const didBump = ensureContentVersion();
  if (!supabase) return didBump;
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
    ensureContentVersion();
    const saved = localStorage.getItem(`ilungi_content_${lang}`);
    const baseSnapshot = getBaseSnapshot(lang);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (baseSnapshot) {
        const merged = mergeWithBase(baseSnapshot, parsed, defaultContent[lang]);
        const normalized = applyContentOverrides(lang, merged);
        if (!deepEqual(parsed, merged)) {
          localStorage.setItem(`ilungi_content_${lang}`, JSON.stringify(merged));
        }
        setBaseSnapshot(lang);
        return normalized;
      }
      const merged = deepMerge(defaultContent[lang], parsed);
      const normalized = applyContentOverrides(lang, merged);
      setBaseSnapshot(lang);
      return normalized;
    }
    setBaseSnapshot(lang);
  } catch (e) {
    console.error('Error loading content:', e);
  }
  return applyContentOverrides(lang, defaultContent[lang]);
};

// Save content to localStorage
export const saveContent = (lang: Language, content: any): void => {
  try {
    localStorage.setItem(`ilungi_content_${lang}`, JSON.stringify(content));
    setBaseSnapshot(lang);
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
  setBaseSnapshot(lang);
  void saveAllContentRemote();
};

// Reset all content
export const resetAllContent = (): void => {
  localStorage.removeItem('ilungi_content_pt');
  localStorage.removeItem('ilungi_content_en');
  setBaseSnapshot('pt');
  setBaseSnapshot('en');
  void saveAllContentRemote();
};

const ensureContentVersion = (): boolean => {
  if (isContentVersionCurrent()) return false;
  resetAllContent();
  markContentVersion();
  return true;
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
