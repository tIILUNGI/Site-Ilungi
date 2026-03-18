import { endpoints } from './api';

const DATA_VERSION = '2026-03-13-1';

let dataMode: 'admin' | 'public' = 'public';

export const setDataMode = (mode: 'admin' | 'public') => {
  dataMode = mode;
};

const canWriteLocal = () => dataMode === 'admin';

const DATA_TABLES = [
  { table: 'solutions', key: 'ilungi_solutions_data', endpoint: 'solutions' },
  { table: 'services', key: 'ilungi_services_data', endpoint: 'services' },
  { table: 'references', key: 'ilungi_references_data', endpoint: 'references' },
  { table: 'partners', key: 'ilungi_partners_data', endpoint: 'partners' },
  { table: 'courses', key: 'ilungi_courses_data', endpoint: 'courses' },
  { table: 'blog_posts', key: 'ilungi_blog_data', endpoint: 'blog' }
];

export const loadData = async (table: string, _localKey: string, defaultData: any) => {
  try {
    const tableInfo = DATA_TABLES.find(t => t.table === table);
    if (tableInfo) {
      const endpoint = (endpoints as any)[tableInfo.endpoint];
      if (endpoint && endpoint.getAll) {
        const remoteData = await endpoint.getAll();
        if (Array.isArray(remoteData)) {
          return remoteData;
        }
      }
    }
  } catch (error) {
    console.error(`Failed to fetch ${table} from remote:`, error);
  }
  return defaultData;
};

export const purgeAllDataIfNeeded = async () => {
  // Logic not strictly needed if we don't use localStorage for data anymore
};

export const saveDataAdmin = async (table: string, _localKey: string, newData: any[]) => {
  if (!canWriteLocal()) return;
  
  try {
    const tableInfo = DATA_TABLES.find(t => t.table === table);
    if (tableInfo) {
      const endpoint = (endpoints as any)[tableInfo.endpoint];
      if (endpoint && endpoint.update) {
         // This still needs individual or bulk update implementation in the backend
         console.log(`Saving ${table} to remote...`);
      }
    }
  } catch (error) {
    console.error(`Failed to save ${table} to remote:`, error);
  }
};

export const loadConfig = async (_localKey: string, defaultData: any) => {
  try {
    const remoteConfig = await endpoints.config.get();
    if (remoteConfig) {
      return { ...defaultData, ...remoteConfig };
    }
  } catch (error) {
    console.error('Failed to fetch config from remote:', error);
  }
  return defaultData;
}

export const saveConfigAdmin = async (_localKey: string, config: any) => {
  if (!canWriteLocal()) return;
  try {
    await endpoints.config.update(config);
  } catch (error) {
    console.error('Failed to save config to remote:', error);
  }
};


