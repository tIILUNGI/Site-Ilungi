const DATA_VERSION = '2026-03-13-1';
const DATA_VERSION_KEY_PREFIX = 'ilungi_data_version_';
const DATA_BASE_KEY_PREFIX = 'ilungi_data_base_';
const DATA_PURGE_KEY = 'ilungi_data_purge_version';
const CONFIG_VERSION = '2026-03-13-1';
const CONFIG_VERSION_KEY_PREFIX = 'ilungi_config_version_';

let dataMode: 'admin' | 'public' = 'public';

export const setDataMode = (mode: 'admin' | 'public') => {
  dataMode = mode;
};

const canWriteLocal = () => dataMode === 'admin';

const DATA_TABLES = [
  { table: 'solutions', key: 'ilungi_solutions_data' },
  { table: 'services', key: 'ilungi_services_data' },
  { table: 'references', key: 'ilungi_references_data' },
  { table: 'partners', key: 'ilungi_partners_data' },
  { table: 'courses', key: 'ilungi_courses_data' },
  { table: 'blog_posts', key: 'ilungi_blog_data' }
];

const getDataVersionKey = (table: string) => `${DATA_VERSION_KEY_PREFIX}${table}`;
const getConfigVersionKey = (key: string) => `${CONFIG_VERSION_KEY_PREFIX}${key}`;
const getBaseSnapshotKey = (table: string) => `${DATA_BASE_KEY_PREFIX}${table}`;

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

const getBaseSnapshot = (table: string): any | null => {
  try {
    const saved = localStorage.getItem(getBaseSnapshotKey(table));
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const setBaseSnapshot = (table: string, data: any): void => {
  try {
    localStorage.setItem(getBaseSnapshotKey(table), JSON.stringify(data));
  } catch {}
};

export const loadData = async (table: string, localKey: string, defaultData: any) => {
  const versionStale = !isDataVersionCurrent(table);
  const saved = localStorage.getItem(localKey);
  const sourceData = saved ? JSON.parse(saved) : defaultData;
  const baseSnapshot = getBaseSnapshot(table);

  const merged = versionStale
    ? defaultData
    : baseSnapshot
      ? mergeWithBase(baseSnapshot, sourceData, defaultData)
      : mergeData(defaultData, sourceData);

  const mergedChanged = versionStale || JSON.stringify(merged) !== JSON.stringify(sourceData);

  if (mergedChanged || versionStale) {
    try {
      localStorage.setItem(localKey, JSON.stringify(merged));
    } catch {}
  }

  setBaseSnapshot(table, defaultData);
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
      localStorage.removeItem(getBaseSnapshotKey(table));
    } catch {}
  });

  try {
    localStorage.setItem(DATA_PURGE_KEY, DATA_VERSION);
  } catch {}
};

export const saveDataAdmin = async (table: string, localKey: string, newData: any[]) => {
  if (!canWriteLocal()) return;
  localStorage.setItem(localKey, JSON.stringify(newData));
  markDataVersion(table);
};

export const loadConfig = async (localKey: string, defaultData: any) => {
  const versionKey = getConfigVersionKey(localKey);
  const versionOk = localStorage.getItem(versionKey) === CONFIG_VERSION;
  if (!versionOk) {
    try {
      localStorage.setItem(localKey, JSON.stringify(defaultData));
      localStorage.setItem(versionKey, CONFIG_VERSION);
    } catch {}
    return defaultData;
  }
  const saved = localStorage.getItem(localKey);
  if (saved) {
    return { ...defaultData, ...JSON.parse(saved) };
  }
  return defaultData;
}

export const saveConfigAdmin = async (localKey: string, config: any) => {
  if (!canWriteLocal()) return;
  localStorage.setItem(localKey, JSON.stringify(config));
  try {
    localStorage.setItem(getConfigVersionKey(localKey), CONFIG_VERSION);
  } catch {}
};
