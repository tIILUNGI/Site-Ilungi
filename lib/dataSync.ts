import { endpoints } from './api';
import { DATA_TABLES } from './dataInitialization';
import { filterCleanCCCourses, defaultCourses } from './courseCatalogData';

const mapCertificateFromAPI = (cert: any) => ({
  id: cert.id,
  code: cert.code || cert.id,
  student: cert.student || cert.student_name || '',
  course: cert.course || cert.course_name || '',
  issuedDate: cert.issuedDate || cert.issued_date || cert.date || '',
  hours: cert.hours || '',
  status: cert.status || 'valid',
  pdfUrl: cert.pdfUrl || cert.pdf_url || '',
  pdfFileName: cert.pdfFileName || cert.pdf_file_name || '',
  createdAt: cert.createdAt || cert.created_at || '',
});

// ─── Tabelas estáticas (frontend como fonte de verdade) ─────────────────────────
// Cursos, Soluções, Serviços, Parceiros, Referências, Blog -> dados limpos do código/local.
// Certificados -> carrega da API de BD.
const STATIC_TABLES = new Set(['solutions', 'services', 'partners', 'references', 'blog_posts', 'alumni_profiles', 'courses']);

// ─── loadData ──────────────────────────────────────────────────────────────────

export const loadData = async (table: string, _localKey: string, defaultData: any) => {
  if (table === 'courses') {
    let list = Array.isArray(defaultData) && defaultData.length > 0 ? defaultData : defaultCourses;
    try {
      const saved = localStorage.getItem(_localKey || 'ilungi_courses_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
        }
      }
    } catch (e) {}
    return filterCleanCCCourses(list);
  }

  // Outras tabelas estáticas: sempre retornam os dados estáticos do frontend
  if (STATIC_TABLES.has(table)) {
    return defaultData;
  }

  // Tabelas dinâmicas (Certificados): busca na API
  try {
    const tableInfo = DATA_TABLES.find(t => t.table === table);
    if (!tableInfo) return defaultData;

    const endpoint = (endpoints as any)[tableInfo.endpoint];
    if (!endpoint?.getAll) return defaultData;

    const remoteData = await endpoint.getAll();
    if (!Array.isArray(remoteData) || remoteData.length === 0) return defaultData;

    if (table === 'certificates') {
      return remoteData.map(mapCertificateFromAPI);
    }

    return remoteData;
  } catch (error) {
    console.error(`Failed to fetch ${table} from remote:`, error);
  }
  return defaultData;
};

export const purgeAllDataIfNeeded = async () => {
  // No-op — sem purge automático
};

export const saveDataAdmin = async (table: string, _localKey: string, newData: any[]) => {
  try {
    const tableMap: any = {
      solutions:    endpoints.solutions,
      services:     endpoints.services,
      references:   endpoints.references,
      partners:     endpoints.partners,
      courses:      endpoints.courses,
      blog_posts:   endpoints.blog,
      certificates: (endpoints as any).certificates,
    };
    const endpoint = tableMap[table];
    if (!endpoint) return;
    for (const item of newData) {
      if (item.id && !item.id.includes('-')) {
        await endpoint.update(item.id, item).catch(() => {});
      }
    }
  } catch (error) {
    console.error(`Failed to sync ${table}:`, error);
  }
};

export const loadConfig = async (_localKey: string, defaultData: any) => defaultData;

export const saveConfigAdmin = async (_localKey: string, config: any) => {
  try {
    await endpoints.config.update(config);
  } catch (error) {
    console.error('Failed to save config:', error);
  }
};
