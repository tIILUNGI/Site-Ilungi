import { supabase } from './supabase';

const DATA_VERSION = '2026-03-03-5';
const DATA_VERSION_KEY_PREFIX = 'ilungi_data_version_';
const DATA_PURGE_KEY = 'ilungi_data_purge_version';

const DATA_TABLES = [
  { table: 'solutions', key: 'ilungi_solutions_data' },
  { table: 'services', key: 'ilungi_services_data' },
  { table: 'references', key: 'ilungi_references_data' },
  { table: 'partners', key: 'ilungi_partners_data' },
  { table: 'courses', key: 'ilungi_courses_data' },
  { table: 'blog_posts', key: 'ilungi_blog_data' }
];

const getDataVersionKey = (table: string) => `${DATA_VERSION_KEY_PREFIX}${table}`;

const isDataVersionCurrent = (table: string) => {
  try {
    return localStorage.getItem(getDataVersionKey(table)) === DATA_VERSION;
  } catch {
    return true;
  }
};

const markDataVersion = (table: string) => {
  try {
    localStorage.setItem(getDataVersionKey(table), DATA_VERSION);
  } catch {}
};

const isObject = (value: any) => value && typeof value === 'object' && !Array.isArray(value);

const mergeDeep = (base: any, override: any): any => {
  if (Array.isArray(base) && Array.isArray(override)) {
    const baseHasIds = base.every((item) => isObject(item) && 'id' in item);
    const overrideAreObjects = override.every((item) => isObject(item));
    if (baseHasIds && overrideAreObjects) {
      return mergeArrayById(base, override);
    }
    return override;
  }
  if (isObject(base) && isObject(override)) {
    const result: any = { ...base };
    Object.keys(override).forEach((key) => {
      result[key] = mergeDeep(base[key], override[key]);
    });
    return result;
  }
  return override !== undefined ? override : base;
};

const mergeArrayById = (base: any[], override: any[]) => {
  const baseById = new Map<string, any>();
  base.forEach((item) => {
    if (item?.id) baseById.set(item.id, item);
  });
  const merged: any[] = [];
  const used = new Set<string>();

  override.forEach((item) => {
    if (item?.id && baseById.has(item.id)) {
      merged.push(mergeDeep(baseById.get(item.id), item));
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

const mergeData = (defaultData: any, existingData: any) => {
  if (Array.isArray(defaultData) && Array.isArray(existingData)) {
    const defaultHasIds = defaultData.every((item) => isObject(item) && 'id' in item);
    const existingAreObjects = existingData.every((item) => isObject(item));
    if (defaultHasIds && existingAreObjects) {
      return mergeArrayById(defaultData, existingData);
    }
    return existingData;
  }
  if (isObject(defaultData) && isObject(existingData)) {
    return mergeDeep(defaultData, existingData);
  }
  return existingData ?? defaultData;
};

export const loadData = async (table: string, localKey: string, defaultData: any) => {
  const versionStale = !isDataVersionCurrent(table);
  let sourceData: any = null;
  if (supabase) {
    try {
      const { data, error } = await supabase.from(table).select('*');
      if (!error && data && data.length > 0) {
        sourceData = data;
      }
    } catch(e) {}
  }
  if (!sourceData) {
    const saved = localStorage.getItem(localKey);
    sourceData = saved ? JSON.parse(saved) : defaultData;
  }

  const merged = versionStale ? defaultData : mergeData(defaultData, sourceData);
  const mergedChanged = versionStale || JSON.stringify(merged) !== JSON.stringify(sourceData);

  if (mergedChanged || versionStale) {
    try {
      localStorage.setItem(localKey, JSON.stringify(merged));
    } catch {}
    if (supabase) {
      try {
        await supabase.from(table).delete().neq('id', '0');
        if (Array.isArray(merged) && merged.length > 0) {
          await supabase.from(table).insert(merged);
        }
      } catch (e) {}
    }
  }

  markDataVersion(table);
  return merged;
};

export const purgeAllDataIfNeeded = async () => {
  try {
    if (localStorage.getItem(DATA_PURGE_KEY) === DATA_VERSION) return;
  } catch {
    return;
  }

  // Clear local caches so defaults rehydrate on next load
  DATA_TABLES.forEach(({ table, key }) => {
    try {
      localStorage.removeItem(key);
      localStorage.removeItem(getDataVersionKey(table));
    } catch {}
  });

  // Clear remote tables (will be re-populated with defaults)
  if (supabase) {
    for (const { table } of DATA_TABLES) {
      try {
        await supabase.from(table).delete().neq('id', '0');
      } catch {}
    }
  }

  try {
    localStorage.setItem(DATA_PURGE_KEY, DATA_VERSION);
  } catch {}
};

export const saveDataAdmin = async (table: string, localKey: string, newData: any[]) => {
  localStorage.setItem(localKey, JSON.stringify(newData));
  markDataVersion(table);
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
