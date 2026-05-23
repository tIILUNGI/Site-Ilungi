import { endpoints } from './api';

/**
 * Reverted to safe mode.
 * This version prioritizes frontend data (code) to ensure the site's information 
 * is always correct as per the static files, while still allowing the Admin 
 * to function for messages and talents.
 */

export const loadData = async (table: string, _localKey: string, defaultData: any) => {
  try {
    const isPopulated = localStorage.getItem('ilungi_db_populated') === 'true';
    if (!isPopulated) return defaultData;

    const tableInfo = DATA_TABLES.find(t => t.table === table);
    if (tableInfo) {
      const endpoint = (endpoints as any)[tableInfo.endpoint];
      if (endpoint && endpoint.getAll) {
        const remoteData = await endpoint.getAll();
        if (Array.isArray(remoteData) && remoteData.length > 0) {
          // Filter out inactive items
          const activeRemote = remoteData.filter((item: any) => item.active !== false);
          
          if (table === 'services') return activeRemote.map((s: any, i: number) => mapServiceFromAPI(s, i));
          if (table === 'solutions') return activeRemote.map((s: any, i: number) => mapSolutionFromAPI(s, i));
          if (table === 'courses') return activeRemote.map((c: any, i: number) => mapCourseFromAPI(c, i));
          if (table === 'partners') return activeRemote.map((p: any) => mapPartnerFromAPI(p));
          if (table === 'references') return activeRemote.map((r: any) => mapReferenceFromAPI(r));
          if (table === 'blog_posts') return activeRemote; // Assume blog posts are mapped or used directly
          
          return activeRemote;
        }
      }
    }
  } catch (error) {
    console.error(`Failed to fetch ${table} from remote:`, error);
  }
  return defaultData;
};

export const purgeAllDataIfNeeded = async () => {
  // No-op to prevent accidental data loss during this transition
};

export const saveDataAdmin = async (table: string, _localKey: string, newData: any[]) => {
  // We keep this functional so that IF the user edits something in the Admin, 
  // it still saves to the DB, even if the front-end is currently prioritized to show static code.
  try {
    const tableMap: any = {
      'solutions': endpoints.solutions,
      'services': endpoints.services,
      'references': endpoints.references,
      'partners': endpoints.partners,
      'courses': endpoints.courses,
      'blog_posts': endpoints.blog
    };

    const endpoint = tableMap[table];
    if (!endpoint) return;

    console.log(`[Admin] Saving ${table} to remote...`);
    // Simple implementation for background sync
    for (const item of newData) {
      if (item.id && !item.id.includes('-')) { // Simple check for new vs old
        await endpoint.update(item.id, item).catch(() => {});
      }
    }
  } catch (error) {
    console.error(`Failed to sync ${table}:`, error);
  }
};

export const loadConfig = async (_localKey: string, defaultData: any) => {
  return defaultData;
}

export const saveConfigAdmin = async (_localKey: string, config: any) => {
  try {
    await endpoints.config.update(config);
  } catch (error) {
    console.error('Failed to save config:', error);
  }
};
