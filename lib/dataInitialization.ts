import { endpoints } from './api';
import { defaultCourses } from './courseCatalogData';
import { getDefaultSolutions } from './solutionsData';
import { getDefaultServices } from './servicesData';
import { translations } from '../translations';

/**
 * DATA_TABLES: mapeamento de tabelas para endpoints.
 * Necessário para loadData em dataSync.ts.
 */
export const DATA_TABLES = [
  { table: 'solutions',   endpoint: 'solutions' },
  { table: 'services',    endpoint: 'services' },
  { table: 'courses',     endpoint: 'courses' },
  { table: 'partners',    endpoint: 'partners' },
  { table: 'references',  endpoint: 'references' },
  { table: 'blog_posts',  endpoint: 'blog' },
  { table: 'certificates', endpoint: 'certificates' },
];

/**
 * pushAllDataToRemote:
 * Sincroniza dados do frontend para a BD de forma SEGURA:
 * - NÃO apaga dados existentes na BD.
 * - Apenas cria itens que ainda não existam (upsert inteligente por code/title).
 * - Nunca faz DELETE automático.
 * 
 * Usar apenas quando necessário via botão manual no Admin.
 */
export const pushAllDataToRemote = async (onProgress?: (msg: string) => void) => {
  const log = (msg: string) => {
    console.log(`[DataInit] ${msg}`);
    if (onProgress) onProgress(msg);
  };

  try {
    log('Sincronizando cursos...');
    let existingCourses: any[] = [];
    try {
      existingCourses = await endpoints.courses.getAll();
    } catch (e) {
      console.warn('[DataInit] Não foi possível obter cursos existentes:', e);
    }

    const existingCodes = new Set(
      (Array.isArray(existingCourses) ? existingCourses : []).map((c: any) => c.code)
    );

    let coursesAdded = 0;
    for (const course of defaultCourses) {
      if (!existingCodes.has(course.code)) {
        try {
          await endpoints.courses.create({
            title: typeof course.name === 'string' ? { pt: course.name, en: course.name } : course.name,
            code: course.code,
            area: typeof course.area === 'string' ? { pt: course.area, en: course.area } : course.area,
            duration: typeof course.hours === 'string' ? course.hours : (course.hours as any).pt || '',
            modality: typeof course.modality === 'string' ? { pt: course.modality, en: course.modality } : course.modality,
            agenda: typeof course.agenda === 'string' ? course.agenda : (course.agenda as any).pt || 'On-demand',
            level: 'Intermediate',
            active: true,
            order: defaultCourses.indexOf(course) + 1
          });
          coursesAdded++;
        } catch (e) {
          console.warn(`[DataInit] Falha ao criar curso ${course.code}:`, e);
        }
      }
    }
    log(`Cursos: ${coursesAdded} adicionados (${existingCodes.size} já existiam).`);

    log('Sincronização concluída!');
    return true;
  } catch (error) {
    console.error('Data initialization failed', error);
    throw error;
  }
};
