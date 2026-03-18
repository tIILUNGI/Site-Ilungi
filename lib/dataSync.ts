import { endpoints } from './api';

const DATA_VERSION = '2026-03-13-1';

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
  
  try {
    const tableInfo = DATA_TABLES.find(t => t.table === table);
    if (!tableInfo) return;
    const endpoint = (endpoints as any)[tableInfo.endpoint];
    if (!endpoint || !endpoint.getAll) return;

    console.log(`Synchronizing ${table} with remote database...`);
    const remoteData = await endpoint.getAll();
    if (!Array.isArray(remoteData)) return;

    const remoteMap = new Map(remoteData.map(item => [item.id, item]));
    const newMap = new Map(newData.map(item => [item.id, item]));

    // Delete items that exist in remote but not in new
    for (const [id] of remoteMap) {
      if (!newMap.has(id)) {
        if (endpoint.delete) {
          try { await endpoint.delete(id); } catch (e) { console.error('Delete error', e); }
        }
      }
    }

    // Create or Update items
    for (const item of newData) {
      if (remoteMap.has(item.id)) {
        // Update existing
        if (endpoint.update) {
          try { await endpoint.update(item.id, item); } catch (e) { console.error('Update error', e); }
        }
      } else {
        // Create new
        if (endpoint.create) {
          try { await endpoint.create(item); } catch (e) { console.error('Create error', e); }
        }
      }
    }
  } catch (error) {
    console.error(`Failed to bulk sync ${table} to remote:`, error);
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
  try {
    await endpoints.config.update(config);
  } catch (error) {
    console.error('Failed to save config to remote:', error);
  }
};


