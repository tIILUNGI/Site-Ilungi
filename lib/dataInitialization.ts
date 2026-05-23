import { endpoints } from './api';
import { defaultCourses } from './courseCatalogData';
import { getDefaultSolutions } from './solutionsData';
import { defaultPartners } from './partnersData';
import { getDefaultBlogPosts } from './blogData';
import { getDefaultServices } from './servicesData';
import { translations } from '../translations';

/**
 * Utility to push all frontend static data to the remote database.
 * This is used to "supply" the database with the initial content.
 */
export const pushAllDataToRemote = async (onProgress?: (msg: string) => void) => {
  const log = (msg: string) => {
    console.log(`[DataInit] ${msg}`);
    if (onProgress) onProgress(msg);
  };

  try {
    // Helper to clear a table
    const clearTable = async (endpoint: any, name: string) => {
      log(`Clearing ${name}...`);
      try {
        const existing = await endpoint.getAll();
        if (Array.isArray(existing)) {
          for (const item of existing) {
            try {
              await endpoint.delete(item.id);
            } catch (e) {
              console.warn(`[DataInit] Could not delete item ${item.id} in ${name}, it might be protected.`, e);
            }
          }
        }
      } catch (e) {
        console.error(`Failed to clear ${name}`, e);
      }
    };

    // 1. Push Solutions
    await clearTable(endpoints.solutions, 'solutions');
    log('Pushing solutions...');
    const solutionsPt = getDefaultSolutions(true);
    const solutionsEn = getDefaultSolutions(false);
    for (let i = 0; i < solutionsPt.length; i++) {
      const solPt = solutionsPt[i];
      const solEn = solutionsEn[i];
      const payload = {
        title: { pt: solPt.name, en: solEn.name },
        tagline: { pt: solPt.tagline, en: solEn.tagline },
        description: { pt: solPt.desc, en: solEn.desc },
        featured_image: solPt.image,
        demo_url: solPt.url || '',
        path: solPt.path || '',
        active: true,
        order: i + 1
      };
      await endpoints.solutions.create(payload);
    }

    // 2. Push Services
    await clearTable(endpoints.services, 'services');
    log('Pushing services...');
    const servicesPt = getDefaultServices(translations.pt);
    const servicesEn = getDefaultServices(translations.en);
    for (let i = 0; i < servicesPt.length; i++) {
      const sPt = servicesPt[i];
      const sEn = servicesEn[i];
      const payload = {
        title: { pt: (sPt.title as any).pt || sPt.title, en: (sEn.title as any).en || sEn.title },
        description: { pt: (sPt.desc as any).pt || sPt.desc, en: (sEn.desc as any).en || sEn.desc },
        image: sPt.image,
        path: sPt.path,
        color: sPt.color,
        active: true,
        order: i + 1
      };
      await endpoints.services.create(payload);
    }

    // 3. Push Courses
    await clearTable(endpoints.courses, 'courses');
    log('Pushing courses...');
    for (const course of defaultCourses) {
      const payload = {
        title: { pt: course.name, en: course.name },
        code: course.code,
        area: { pt: course.area, en: course.area },
        duration: course.hours,
        modality: { pt: course.modality, en: course.modality },
        level: 'Intermediate',
        active: true,
        order: defaultCourses.indexOf(course) + 1
      };
      await endpoints.courses.create(payload);
    }

    // 4. Push Partners
    await clearTable(endpoints.partners, 'partners');
    log('Pushing partners...');
    for (const partner of defaultPartners) {
      const payload = {
        name: partner.name,
        website_url: partner.url,
        logo: partner.logo,
        desc: typeof partner.desc === 'object' ? partner.desc : { pt: partner.desc, en: partner.desc },
        color: partner.color,
        active: true
      };
      await endpoints.partners.create(payload);
    }

    // 5. Push Blog Posts
    await clearTable(endpoints.blog, 'blog');
    log('Pushing blog posts...');
    const postsPt = getDefaultBlogPosts(true);
    const postsEn = getDefaultBlogPosts(false);
    for (let i = 0; i < postsPt.length; i++) {
      const pPt = postsPt[i];
      const pEn = postsEn[i];
      const payload = {
        title: { pt: pPt.title, en: pEn.title },
        excerpt: { pt: pPt.excerpt, en: pEn.excerpt },
        content: { pt: pPt.content, en: pEn.content },
        author: pPt.author,
        category: pPt.category,
        image: pPt.image,
        video_url: pPt.video || '',
        published_at: pPt.date,
        status: pPt.status
      };
      await endpoints.blog.create(payload);
    }

    // 6. Push References
    await clearTable(endpoints.references, 'references');
    log('Pushing references...');
    const refsPt = translations.pt.references.clients;
    const refsEn = translations.en.references.clients;
    for (let i = 0; i < refsPt.length; i++) {
      const rPt = refsPt[i];
      const rEn = refsEn[i];
      const payload = {
        client_name: rPt.name,
        person: rPt.person,
        client_position: { pt: rPt.role, en: rEn.role },
        testimonial: { pt: rPt.comment, en: rEn.comment },
        client_image: rPt.logo,
        service_type: rPt.service,
        description: { pt: rPt.description, en: rEn.description },
        active: true,
        order: i + 1
      };
      await endpoints.references.create(payload);
    }

    // 7. Config
    log('Pushing global config...');
    await endpoints.config.update(translations);

    log('Data initialization complete!');
    return true;
  } catch (error) {
    console.error('Data initialization failed', error);
    throw error;
  }
};
