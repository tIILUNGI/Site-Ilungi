import { endpoints } from './api';

const DATA_VERSION = '2026-03-13-1';

// Helper to extract localized value from JSONB fields
const getLocalized = (val: any) => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') return val.pt || val.en || '';
  return '';
};

const DATA_TABLES = [
  { table: 'solutions', key: 'ilungi_solutions_data', endpoint: 'solutions' },
  { table: 'services', key: 'ilungi_services_data', endpoint: 'services' },
  { table: 'references', key: 'ilungi_references_data', endpoint: 'references' },
  { table: 'partners', key: 'ilungi_partners_data', endpoint: 'partners' },
  { table: 'courses', key: 'ilungi_courses_data', endpoint: 'courses' },
  { table: 'blog_posts', key: 'ilungi_blog_data', endpoint: 'blog' }
];

// Map API data to frontend expected format
const mapServiceFromAPI = (service: any, index: number) => {
  // Default colors for services based on order
  const defaultColors = ['#1B3C2B', '#6a00a3', '#0A4D8C', '#B31B1B', '#2A9D8F', '#E63946'];
  const color = service.color || defaultColors[(service.order || index) - 1] || defaultColors[0];
  
  // Get image - use order-based mapping for Consulting page areas
  // order 1 = iso (Consultoria de Sistemas de Gestão)
  // order 2 = risk (GRI - Sustentabilidade)
  // order 3 = procurement
  // order 4 = pmo (Assistência e suporte de TI)
  const orderImages = [
    '/imagens/consultoria-iso.jpg',  // order 1 - iso
    '/imagens/gri-sustentabilidade.jpg',  // order 2 - risk (GRI)
    '/imagens/procurement.jpg',  // order 3 - procurement
    '/imagens/suporte-ti.jpg'  // order 4 - pmo
  ];
  let image = service.image || orderImages[(service.order || index) - 1] || '';
  
  return {
    id: service.id,
    title: getLocalized(service.title),
    desc: getLocalized(service.description),
    description: service.description,
    content: service.content,
    image: image,
    path: service.path || `/consultoria/${(service.order === 1 ? 'iso' : service.order === 2 ? 'risco' : service.order === 3 ? 'procurement' : service.order === 4 ? 'pmo' : `service-${index + 1}`)}`,
    color: color,
    icon: service.icon || 'ShieldCheck',
    items: service.items || {},
    order: service.order || index + 1,
    active: service.active !== false
  };
};

const mapSolutionFromAPI = (solution: any, index: number) => {
  // Default colors for solutions based on order
  const defaultColors = [
    { color: 'from-[#e65100] to-[#ff9800]', bgColor: 'bg-[#e65100]' },
    { color: 'from-[#1B3C2B] to-[#2E7D5E]', bgColor: 'bg-[#1B3C2B]' },
    { color: 'from-[#6a00a3] to-[#8000c4]', bgColor: 'bg-[#6a00a3]' },
    { color: 'from-slate-700 to-slate-900', bgColor: 'bg-slate-800' }
  ];
  const defaults = defaultColors[(solution.order || index) - 1] || defaultColors[0];
  
  // Get image - fallback to default images based on name
  let image = solution.featured_image || solution.image || '';
  if (!image) {
    const name = (solution.title?.pt || solution.title?.en || solution.name || '').toLowerCase();
    if (name.includes('primavera')) {
      image = '/imagens/primavera.png';
    } else if (name.includes('salya')) {
      image = '/imagens/Salya.png';
    } else if (name.includes('siclic')) {
      image = '/imagens/SICLIC.png';
    } else if (name.includes('tocomply')) {
      image = '/imagens/Tocomply360.png';
    }
  }
  
  return {
    id: solution.id,
    name: getLocalized(solution.title),
    title: solution.title,
    tagline: getLocalized(solution.tagline),
    desc: getLocalized(solution.description),
    description: solution.description,
    image: image,
    featured_image: image,
    path: solution.path || `/solucoes/${(solution.order === 1 ? 'primavera' : solution.order === 2 ? 'salya' : solution.order === 3 ? 'siclic' : solution.order === 4 ? 'tocomply' : `solution-${index + 1}`)}`,
    url: solution.demo_url || solution.url || '',
    demo_url: solution.demo_url || solution.url || '',
    color: solution.color || defaults.color,
    bgColor: solution.bgColor || defaults.bgColor,
    order: solution.order || index + 1,
    active: solution.active !== false
  };
};

// Map frontend data to API format
const mapServiceToAPI = (service: any) => {
  return {
    title: { pt: service.title || service.name || '', en: service.title || service.name || '' },
    description: { pt: service.desc || service.description || '', en: service.desc || service.description || '' },
    content: service.content || { pt: '', en: '' },
    image: service.image || '',
    icon: service.icon || 'ShieldCheck',
    order: service.order || 0,
    active: service.active !== false,
    items: service.items || {}
  };
};

const mapSolutionToAPI = (solution: any) => {
  return {
    title: { pt: solution.name || solution.title || '', en: solution.name || solution.title || '' },
    tagline: { pt: solution.tagline || '', en: solution.tagline || '' },
    description: { pt: solution.desc || solution.description || '', en: solution.desc || solution.description || '' },
    featured_image: solution.image || solution.featured_image || '',
    demo_url: solution.url || solution.demo_url || '',
    order: solution.order || 0,
    active: solution.active !== false
  };
};

// Map course data from API to frontend format
const mapCourseFromAPI = (course: any, index: number) => {
  // Helper to extract localized value
  const getLocalized = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') return val.pt || val.en || '';
    return '';
  };
  
  return {
    id: course.id || `course-${index + 1}`,
    code: course.code || `CC-${String(index + 1).padStart(3, '0')}`,
    name: getLocalized(course.title),
    title: course.title,
    area: getLocalized(course.area),
    hours: course.duration ? course.duration + 'h' : 'A definir',
    duration: course.duration || course.hours || 'A definir',
    modality: getLocalized(course.modality),
    level: course.level || 'Intermediário',
    description: course.description,
    agenda: course.agenda || 'On-demand',
    order: course.order || index + 1,
    active: course.active !== false
  };
};

// Map course data from frontend to API format
const mapCourseToAPI = (course: any) => {
  return {
    title: { pt: course.name || course.title || '', en: course.name || course.title || '' },
    code: course.code,
    area: course.area || '',
    description: { pt: course.description || '', en: course.description || '' },
    duration: course.duration || course.hours || '16',
    hours: course.duration ? course.duration + 'h' : '16',
    modality: course.modality || 'Presencial / Online',
    level: course.level || 'intermediate',
    order: course.order || 0,
    active: course.active !== false
  };
};

// Map partner data from API to frontend format
const mapPartnerFromAPI = (partner: any) => {
  // Helper to extract localized value
  const getLocalized = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') return val.pt || val.en || '';
    return '';
  };
  
  return {
    id: partner.id,
    name: partner.name,
    desc: getLocalized(partner.desc),
    description: partner.desc,
    logo: partner.logo,
    url: partner.website_url || partner.url || '',
    website_url: partner.website_url,
    color: partner.color || '#1B3C2B',
    order: partner.order || 0,
    active: partner.active !== false
  };
};

// Map reference data from API to frontend format
const mapReferenceFromAPI = (ref: any) => {
  // Helper to extract localized value
  const getLocalized = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') return val.pt || val.en || '';
    return '';
  };

  // Extract service type - can be string or JSONB
  const serviceTypeStr = getLocalized(ref.service_type);
  // Normalize service to lowercase for comparison
  let service = serviceTypeStr.toLowerCase().trim();
  
  // Map various ISO formats to 'iso'
  if (service === 'iso' || serviceTypeStr.toUpperCase().includes('ISO') || service.includes('9001') || service.includes('14001') || service.includes('45001')) {
    service = 'iso';
  }
  // Map 'risco', 'risk', 'gri' to 'risk'
  else if (service.includes('risco') || service.includes('risk') || service.includes('gri')) {
    service = 'risk';
  }
  // procurement should stay as is
  else if (service.includes('procurement') || service.includes('procura')) {
    service = 'procurement';
  }
  // pmo should stay as is
  else if (service.includes('pmo') || service.includes('project')) {
    service = 'pmo';
  }

  return {
    id: ref.id,
    name: ref.client_name || ref.name,
    client_name: ref.client_name,
    person: ref.person || '',
    project_name: ref.project_name || '',
    testimonial: getLocalized(ref.testimonial),
    comment: ref.comment,
    role: getLocalized(ref.client_position),
    client_position: ref.client_position,
    logo: ref.logo || ref.client_image || '',
    client_image: ref.client_image,
    service_type: ref.service_type,
    service: service,
    description: getLocalized(ref.description),
    order: ref.order || 0,
    active: ref.active !== false
  };
};

export const loadData = async (table: string, _localKey: string, defaultData: any) => {
  // For courses, always use default data first and merge with remote
  if (table === 'courses') {
    try {
      const tableInfo = DATA_TABLES.find(t => t.table === table);
      if (tableInfo) {
        const endpoint = (endpoints as any)[tableInfo.endpoint];
        if (endpoint && endpoint.getAll) {
          const remoteData = await endpoint.getAll();
          if (Array.isArray(remoteData) && remoteData.length > 0) {
            // Map remote data but use default courses as base
            const mappedCourses = remoteData.filter((c: any) => c.active !== false).map((c: any, i: number) => mapCourseFromAPI(c, i));
            // Merge: use default courses and update with remote data where available
            const mergedCourses = defaultData.map((defaultCourse: any) => {
              const remoteCourse = mappedCourses.find((rc: any) => rc.code === defaultCourse.code);
              if (remoteCourse) {
                return { ...defaultCourse, ...remoteCourse };
              }
              return defaultCourse;
            });
            return mergedCourses;
          }
        }
      }
    } catch (error) {
      console.error(`Failed to fetch courses from remote:`, error);
    }
    return defaultData;
  }
  
  // For other tables, try to fetch from remote
  try {
    const tableInfo = DATA_TABLES.find(t => t.table === table);
    if (tableInfo) {
      const endpoint = (endpoints as any)[tableInfo.endpoint];
      if (endpoint && endpoint.getAll) {
        const remoteData = await endpoint.getAll();
        if (Array.isArray(remoteData)) {
          // Map data to frontend format
          if (table === 'services') {
            return remoteData.filter((s: any) => s.active !== false).map((s: any, i: number) => mapServiceFromAPI(s, i));
          }
          if (table === 'solutions') {
            return remoteData.filter((s: any) => s.active !== false).map((s: any, i: number) => mapSolutionFromAPI(s, i));
          }
          if (table === 'courses') {
            return remoteData.filter((c: any) => c.active !== false).map((c: any, i: number) => mapCourseFromAPI(c, i));
          }
          if (table === 'partners') {
            return remoteData.filter((p: any) => p.active !== false).map((p: any) => mapPartnerFromAPI(p));
          }
          if (table === 'references') {
            return remoteData.filter((r: any) => r.active !== false).map((r: any) => mapReferenceFromAPI(r));
          }
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
    
    // Check if IDs are local (not UUIDs) - these need special handling
    const isLocalId = (id: string) => id && !id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

    // Map new data to API format
    const mappedData = newData.map((item, index) => {
      if (table === 'services') {
        return { ...mapServiceToAPI(item), order: item.order || index + 1 };
      }
      if (table === 'solutions') {
        return { ...mapSolutionToAPI(item), order: item.order || index + 1 };
      }
      if (table === 'courses') {
        return { ...mapCourseToAPI(item), order: item.order || index + 1 };
      }
      return item;
    });

    const newMap = new Map(mappedData.map(item => [item.id, item]));
    const newIdMap = new Map(newData.map((item, idx) => [item.id, mappedData[idx]]));

    // Delete items that exist in remote but not in new (only for items with UUIDs)
    for (const [id] of remoteMap) {
      if (!newIdMap.has(id) && !isLocalId(id)) {
        if (endpoint.delete) {
          try { await endpoint.delete(id); } catch (e) { console.error('Delete error', e); }
        }
      }
    }

    // Create or Update items
    for (let i = 0; i < newData.length; i++) {
      const item = newData[i];
      const mappedItem = mappedData[i];
      
      // Check if this is a new local item (has local ID format)
      if (isLocalId(item.id)) {
        // This is a new item from frontend - create it
        if (endpoint.create) {
          try { 
            const created = await endpoint.create(mappedItem);
            console.log('Created new item:', created);
          } catch (e) { console.error('Create error', e); }
        }
      } else if (remoteMap.has(item.id)) {
        // Update existing
        if (endpoint.update) {
          try { await endpoint.update(item.id, mappedItem); } catch (e) { console.error('Update error', e); }
        }
      } else {
        // New item with UUID - create it
        if (endpoint.create) {
          try { await endpoint.create(mappedItem); } catch (e) { console.error('Create error', e); }
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
      // Map API config field names to frontend expected names
      return { 
        ...defaultData, 
        ...remoteConfig,
        email: remoteConfig.contact_email || defaultData.email,
        phone: remoteConfig.contact_phone || defaultData.phone,
        address: remoteConfig.address || defaultData.address
      };
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


