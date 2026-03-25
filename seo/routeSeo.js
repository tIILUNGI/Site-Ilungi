export const DEFAULT_SITE_URL = 'https://ilungi.ao';
export const DEFAULT_OG_IMAGE = '/imagens/Logo Slide.png';
export const DEFAULT_THEME_COLOR = '#1B3C2B';
export const INDEX_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
export const NOINDEX_ROBOTS = 'noindex, nofollow';

export const PRIVATE_DISALLOW_PATHS = [
  '/admin',
  '/academia/login',
  '/academia/registar',
  '/academia/alumni',
  '/academia/curso/',
];

const LANG_CODES = {
  pt: 'pt-AO',
  en: 'en',
};

const OG_LOCALES = {
  pt: 'pt_AO',
  en: 'en_US',
};

const sharedKeywords = {
  pt: [
    'ILUNGI',
    'consultoria em Angola',
    'consultoria ISO',
    'gestao de riscos',
    'formacao profissional',
    'compliance',
    'solucoes digitais',
    'procurement',
    'PMO',
  ],
  en: [
    'ILUNGI',
    'consulting in Angola',
    'ISO consulting',
    'risk management',
    'professional training',
    'compliance',
    'digital solutions',
    'procurement',
    'PMO',
  ],
};

const organizationDescriptions = {
  pt: 'Consultoria empresarial, implementacao ISO, gestao de riscos, formacao profissional e solucoes digitais para empresas em Angola.',
  en: 'Business consulting, ISO implementation, risk management, professional training, and digital solutions for companies in Angola.',
};

const makeOrganizationSchema = (siteUrl, lang) => ({
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'ILUNGI',
  url: siteUrl,
  logo: `${siteUrl}/imagens/ilungi_logo.jpg`,
  image: `${siteUrl}${DEFAULT_OG_IMAGE}`,
  description: organizationDescriptions[lang],
  email: 'geral@ilungi.ao',
  telephone: '+244935793270',
  areaServed: 'AO',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: '+244935793270',
      email: 'geral@ilungi.ao',
      availableLanguage: ['Portuguese', 'English'],
      areaServed: 'AO',
    },
  ],
});

const makeWebsiteSchema = (siteUrl, lang) => ({
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'ILUNGI',
  description: organizationDescriptions[lang],
  inLanguage: LANG_CODES[lang],
  publisher: { '@id': `${siteUrl}/#organization` },
});

const makeWebPageSchema = (siteUrl, path, lang, title, description, type = 'WebPage') => ({
  '@type': type,
  '@id': `${siteUrl}${path}#webpage`,
  url: `${siteUrl}${path}`,
  name: title,
  description,
  inLanguage: LANG_CODES[lang],
  isPartOf: { '@id': `${siteUrl}/#website` },
  about: { '@id': `${siteUrl}/#organization` },
});

const makeServiceSchema = (siteUrl, path, lang, name, description) => ({
  '@type': 'Service',
  '@id': `${siteUrl}${path}#service`,
  serviceType: name,
  name,
  description,
  provider: { '@id': `${siteUrl}/#organization` },
  areaServed: 'AO',
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${siteUrl}${path}`,
  },
  inLanguage: LANG_CODES[lang],
});

const exactRouteSeo = {
  '/': {
    title: {
      pt: 'ILUNGI | Soluções e serviços',
      en: 'ILUNGI | Soluções e serviços',
    },
    description: {
      pt: 'Consultoria empresarial, implementacao ISO, gestao de riscos, academia corporativa e solucoes digitais para acelerar resultados.',
      en: 'Business consulting, ISO implementation, risk management, corporate academy, and digital solutions to accelerate results.',
    },
    keywords: sharedKeywords,
    image: '/imagens/Logo Slide.png',
    changefreq: 'weekly',
    priority: '1.0',
    schema: (siteUrl, lang, entry) => [
      makeOrganizationSchema(siteUrl, lang),
      makeWebsiteSchema(siteUrl, lang),
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
    ],
  },
  '/consultoria': {
    title: {
      pt: 'Consultoria Empresarial e ISO | ILUNGI',
      en: 'Business and ISO Consulting | ILUNGI',
    },
    description: {
      pt: 'Servicos de consultoria para sistemas de gestao, ISO, riscos, procurement e PMO com foco em previsibilidade e reputacao.',
      en: 'Consulting services for management systems, ISO, risks, procurement, and PMO focused on predictability and reputation.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'consultoria empresarial', 'sistemas de gestao'],
      en: [...sharedKeywords.en, 'business consulting', 'management systems'],
    },
    image: '/imagens/consultoria-iso.jpg',
    changefreq: 'monthly',
    priority: '0.9',
    schema: (siteUrl, lang, entry) => [
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description, 'CollectionPage'),
    ],
  },
  '/consultoria/iso': {
    title: {
      pt: 'Consultoria ISO e Sistemas de Gestao | ILUNGI',
      en: 'ISO Consulting and Management Systems | ILUNGI',
    },
    description: {
      pt: 'Implementacao, melhoria e certificacao de sistemas de gestao ISO com abordagem pratica para empresas em Angola.',
      en: 'Implementation, improvement, and certification of ISO management systems with a practical approach for companies in Angola.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'ISO 9001', 'ISO 14001', 'ISO 45001', 'certificacao ISO'],
      en: [...sharedKeywords.en, 'ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO certification'],
    },
    image: '/imagens/gri-sustentabilidade.jpg',
    changefreq: 'monthly',
    priority: '0.9',
    schema: (siteUrl, lang, entry) => [
      makeServiceSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
    ],
  },
  '/consultoria/risco': {
    title: {
      pt: 'Gestao e Notacao de Riscos | ILUNGI',
      en: 'Risk Management and Rating | ILUNGI',
    },
    description: {
      pt: 'Avaliacao, classificacao e mitigacao de riscos corporativos para fortalecer governanca, compliance e resiliencia empresarial.',
      en: 'Assessment, classification, and mitigation of corporate risks to strengthen governance, compliance, and business resilience.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'gestao de riscos', 'riscos corporativos', 'notacao de riscos'],
      en: [...sharedKeywords.en, 'risk management', 'corporate risk', 'risk rating'],
    },
    image: '/imagens/procurement.jpg',
    changefreq: 'monthly',
    priority: '0.8',
    schema: (siteUrl, lang, entry) => [
      makeServiceSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
    ],
  },
  '/consultoria/procurement': {
    title: {
      pt: 'Consultoria de Procurement | ILUNGI',
      en: 'Procurement Consulting | ILUNGI',
    },
    description: {
      pt: 'Otimizacao de compras, governance de aquisicoes e melhoria de processos de procurement para organizacoes mais eficientes.',
      en: 'Procurement optimization, acquisition governance, and process improvement for more efficient organizations.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'procurement', 'compras', 'aquisicoes'],
      en: [...sharedKeywords.en, 'procurement', 'purchasing', 'sourcing'],
    },
    image: '/imagens/suporte-ti.jpg',
    changefreq: 'monthly',
    priority: '0.8',
    schema: (siteUrl, lang, entry) => [
      makeServiceSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
    ],
  },
  '/consultoria/pmo': {
    title: {
      pt: 'PMO e Suporte de TI | ILUNGI',
      en: 'PMO and IT Support | ILUNGI',
    },
    description: {
      pt: 'Estruturacao de PMO, apoio operacional e suporte de TI para projetos e equipas com maior controlo e desempenho.',
      en: 'PMO structuring, operational support, and IT support for projects and teams with greater control and performance.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'PMO', 'gestao de projetos', 'suporte de TI'],
      en: [...sharedKeywords.en, 'PMO', 'project management', 'IT support'],
    },
    image: '/imagens/suporte-ti.jpg',
    changefreq: 'monthly',
    priority: '0.8',
    schema: (siteUrl, lang, entry) => [
      makeServiceSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
    ],
  },
  '/academia': {
    title: {
      pt: 'Academia ILUNGI | Formacao e Certificacao Profissional',
      en: 'ILUNGI Academy | Professional Training and Certification',
    },
    description: {
      pt: 'Programas de formacao, certificacao e desenvolvimento profissional para compliance, riscos, ESG, financas e gestao.',
      en: 'Training, certification, and professional development programs for compliance, risk, ESG, finance, and management.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'academia', 'formacao', 'cursos', 'certificacao profissional'],
      en: [...sharedKeywords.en, 'academy', 'training', 'courses', 'professional certification'],
    },
    image: '/imagens/Lead Auditor ISO 9001.png',
    changefreq: 'monthly',
    priority: '0.8',
    schema: (siteUrl, lang, entry) => [
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description, 'CollectionPage'),
    ],
  },
  '/academia/verificar': {
    title: {
      pt: 'Verificar Certificado | ILUNGI Academia',
      en: 'Verify Certificate | ILUNGI Academy',
    },
    description: {
      pt: 'Valide a autenticidade de certificados emitidos pela ILUNGI Academia com verificacao online.',
      en: 'Validate the authenticity of certificates issued by ILUNGI Academy with online verification.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'verificar certificado', 'certificado ILUNGI'],
      en: [...sharedKeywords.en, 'verify certificate', 'ILUNGI certificate'],
    },
    image: '/imagens/UCS.png',
    changefreq: 'monthly',
    priority: '0.7',
    schema: (siteUrl, lang, entry) => [
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description, 'ContactPage'),
    ],
  },
  '/academia/cursos': {
    title: {
      pt: 'Catalogo de Cursos | ILUNGI Academia',
      en: 'Course Catalog | ILUNGI Academy',
    },
    description: {
      pt: 'Explore o catalogo de cursos da ILUNGI Academia em compliance, ESG, financas, riscos, governance e lideranca.',
      en: 'Explore the ILUNGI Academy course catalog in compliance, ESG, finance, risk, governance, and leadership.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'catalogo de cursos', 'cursos executivos', 'cursos de compliance'],
      en: [...sharedKeywords.en, 'course catalog', 'executive courses', 'compliance courses'],
    },
    image: '/imagens/Lead Auditor ISO 9001.png',
    changefreq: 'weekly',
    priority: '0.8',
    schema: (siteUrl, lang, entry) => [
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description, 'CollectionPage'),
    ],
  },
  '/solucoes': {
    title: {
      pt: 'Solucoes Digitais Empresariais | ILUNGI',
      en: 'Business Digital Solutions | ILUNGI',
    },
    description: {
      pt: 'Conheca as solucoes digitais da ILUNGI para compliance, RH, sistemas ISO e produtividade empresarial.',
      en: 'Discover ILUNGI digital solutions for compliance, HR, ISO systems, and business productivity.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'solucoes digitais', 'software empresarial', 'compliance digital'],
      en: [...sharedKeywords.en, 'digital solutions', 'business software', 'digital compliance'],
    },
    image: '/imagens/Logo Slide.png',
    changefreq: 'monthly',
    priority: '0.8',
    schema: (siteUrl, lang, entry) => [
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description, 'CollectionPage'),
    ],
  },
  '/solucoes/salya': {
    title: {
      pt: 'Salya | Gestao de Salarios e RH',
      en: 'Salya | Payroll and HR Management',
    },
    description: {
      pt: 'Conheca a plataforma Salya para gestao de salarios e recursos humanos com foco em eficiencia operacional.',
      en: 'Discover Salya, the payroll and human resources platform focused on operational efficiency.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'Salya', 'recursos humanos', 'salarios'],
      en: [...sharedKeywords.en, 'Salya', 'human resources', 'payroll'],
    },
    image: '/imagens/Salya.png',
    changefreq: 'monthly',
    priority: '0.7',
    schema: (siteUrl, lang, entry) => [
      makeServiceSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
    ],
  },
  '/solucoes/tocomply': {
    title: {
      pt: 'Tocomply360 | Gestao de Sistemas ISO',
      en: 'Tocomply360 | ISO Systems Management',
    },
    description: {
      pt: 'Plataforma digital para acompanhamento, controlo e melhoria de sistemas de gestao e compliance.',
      en: 'Digital platform for monitoring, control, and improvement of management and compliance systems.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'Tocomply360', 'compliance', 'gestao ISO'],
      en: [...sharedKeywords.en, 'Tocomply360', 'compliance', 'ISO management'],
    },
    image: '/imagens/Tocomply360.png',
    changefreq: 'monthly',
    priority: '0.7',
    schema: (siteUrl, lang, entry) => [
      makeServiceSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
    ],
  },
  '/parceiros': {
    title: {
      pt: 'Parceiros Estrategicos | ILUNGI',
      en: 'Strategic Partners | ILUNGI',
    },
    description: {
      pt: 'Conheca os parceiros estrategicos da ILUNGI e o ecossistema de colaboracao que reforca a entrega de valor.',
      en: 'Meet ILUNGI strategic partners and the collaboration ecosystem that strengthens value delivery.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'parceiros', 'parcerias estrategicas'],
      en: [...sharedKeywords.en, 'partners', 'strategic partnerships'],
    },
    image: '/imagens/CFC-institute.png',
    changefreq: 'monthly',
    priority: '0.6',
    schema: (siteUrl, lang, entry) => [
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description, 'CollectionPage'),
    ],
  },
  '/contacto': {
    title: {
      pt: 'Contacto | ILUNGI',
      en: 'Contact | ILUNGI',
    },
    description: {
      pt: 'Fale com a ILUNGI para solicitar proposta, agendar reuniao ou obter informacoes sobre consultoria, academia e solucoes.',
      en: 'Talk to ILUNGI to request a proposal, schedule a meeting, or get information about consulting, academy, and solutions.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'contacto', 'solicitar proposta', 'consultoria em Angola'],
      en: [...sharedKeywords.en, 'contact', 'request proposal', 'consulting in Angola'],
    },
    image: '/imagens/ilungi_logo.jpg',
    changefreq: 'monthly',
    priority: '0.8',
    schema: (siteUrl, lang, entry) => [
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description, 'ContactPage'),
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'geral@ilungi.ao',
        telephone: '+244935793270',
        areaServed: 'AO',
        availableLanguage: ['Portuguese', 'English'],
      },
    ],
  },
  '/blog': {
    title: {
      pt: 'Blog ILUNGI HUB | Insights e Tendencias',
      en: 'ILUNGI HUB Blog | Insights and Trends',
    },
    description: {
      pt: 'Artigos sobre compliance, RFID, gestao de stocks, ISO, tecnologia, governance e reputacao corporativa.',
      en: 'Articles about compliance, RFID, stock management, ISO, technology, governance, and corporate reputation.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'blog', 'artigos', 'insights empresariais'],
      en: [...sharedKeywords.en, 'blog', 'articles', 'business insights'],
    },
    image: '/blog-assets/inventario.jpeg',
    changefreq: 'weekly',
    priority: '0.7',
    schema: (siteUrl, lang, entry) => [
      {
        '@type': 'Blog',
        '@id': `${siteUrl}${entry.canonicalPath}#blog`,
        name: entry.title,
        description: entry.description,
        url: `${siteUrl}${entry.canonicalPath}`,
        inLanguage: LANG_CODES[lang],
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description, 'CollectionPage'),
    ],
  },
  '/certificacoes': {
    title: {
      pt: 'Certificacoes e Credenciais | ILUNGI',
      en: 'Certifications and Credentials | ILUNGI',
    },
    description: {
      pt: 'Veja as certificacoes e credenciais institucionais da ILUNGI que reforcam qualidade, conformidade e confianca.',
      en: 'View ILUNGI institutional certifications and credentials that reinforce quality, compliance, and trust.',
    },
    keywords: {
      pt: [...sharedKeywords.pt, 'certificacoes', 'credenciais', 'qualidade'],
      en: [...sharedKeywords.en, 'certifications', 'credentials', 'quality'],
    },
    image: '/imagens/UCS.png',
    changefreq: 'monthly',
    priority: '0.7',
    schema: (siteUrl, lang, entry) => [
      makeWebPageSchema(siteUrl, entry.canonicalPath, lang, entry.title, entry.description),
    ],
  },
};

const dynamicRouteSeo = [
  {
    match: (pathname) => pathname.startsWith('/referencia/'),
    entry: {
      title: {
        pt: 'Referencia de Cliente | ILUNGI',
        en: 'Client Reference | ILUNGI',
      },
      description: {
        pt: 'Caso de referencia e resultado de entrega da ILUNGI para clientes em consultoria, ISO, procurement e riscos.',
        en: 'Reference case and delivery outcome from ILUNGI for consulting, ISO, procurement, and risk clients.',
      },
      keywords: {
        pt: [...sharedKeywords.pt, 'referencias', 'casos de clientes'],
        en: [...sharedKeywords.en, 'references', 'client cases'],
      },
      image: '/imagens/ilungi_logo.jpg',
      changefreq: 'monthly',
      priority: '0.5',
    },
  },
  {
    match: (pathname) =>
      pathname === '/academia/login' ||
      pathname === '/academia/registar' ||
      pathname === '/academia/alumni' ||
      pathname.startsWith('/academia/curso/'),
    entry: {
      title: {
        pt: 'Area Restrita | ILUNGI',
        en: 'Restricted Area | ILUNGI',
      },
      description: {
        pt: 'Area autenticada da ILUNGI.',
        en: 'Authenticated ILUNGI area.',
      },
      keywords: {
        pt: sharedKeywords.pt,
        en: sharedKeywords.en,
      },
      noindex: true,
      image: '/imagens/ilungi_logo.jpg',
    },
  },
  {
    match: (pathname) => pathname.startsWith('/admin'),
    entry: {
      title: {
        pt: 'Administracao | ILUNGI',
        en: 'Administration | ILUNGI',
      },
      description: {
        pt: 'Area administrativa da ILUNGI.',
        en: 'ILUNGI administrative area.',
      },
      keywords: {
        pt: sharedKeywords.pt,
        en: sharedKeywords.en,
      },
      noindex: true,
      image: '/imagens/ilungi_logo.jpg',
    },
  },
];

export const normalizePathname = (pathname = '/') => {
  if (!pathname) return '/';
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return normalized.startsWith('/') ? normalized : `/${normalized}`;
};

export const toAbsoluteUrl = (siteUrl, value) => {
  if (!value) return siteUrl;
  if (/^https?:\/\//i.test(value)) return encodeURI(value);
  const path = value.startsWith('/') ? value : `/${value}`;
  return encodeURI(`${siteUrl}${path}`);
};

const localize = (value, lang) => {
  if (!value) return value;
  if (Array.isArray(value)) return value;
  if (typeof value === 'object') return value[lang] || value.pt || value.en;
  return value;
};

const resolveRouteEntry = (pathname) => {
  const normalized = normalizePathname(pathname);
  if (exactRouteSeo[normalized]) {
    return { path: normalized, entry: exactRouteSeo[normalized] };
  }

  for (const dynamicRoute of dynamicRouteSeo) {
    if (dynamicRoute.match(normalized)) {
      return { path: normalized, entry: dynamicRoute.entry };
    }
  }

  return {
    path: normalized,
    entry: {
      title: {
        pt: 'ILUNGI | Pagina',
        en: 'ILUNGI | Page',
      },
      description: {
        pt: organizationDescriptions.pt,
        en: organizationDescriptions.en,
      },
      keywords: sharedKeywords,
      noindex: true,
      image: DEFAULT_OG_IMAGE,
    },
  };
};

export const serializeSchemaGraph = (schemaItems = []) => {
  if (!schemaItems || schemaItems.length === 0) return '';
  const cleanedItems = schemaItems.map((item) => {
    const clone = { ...item };
    delete clone['@context'];
    return clone;
  });

  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': cleanedItems,
    },
    null,
    2
  );
};

export const getRouteSeo = (pathname, lang = 'pt', siteUrl = DEFAULT_SITE_URL) => {
  const safeLang = lang === 'en' ? 'en' : 'pt';
  const { path, entry } = resolveRouteEntry(pathname);
  const title = localize(entry.title, safeLang);
  const description = localize(entry.description, safeLang);
  const keywords = localize(entry.keywords, safeLang) || sharedKeywords[safeLang];
  const canonicalPath = entry.canonicalPath || path;
  const image = toAbsoluteUrl(siteUrl, entry.image || DEFAULT_OG_IMAGE);
  const schema =
    typeof entry.schema === 'function'
      ? entry.schema(siteUrl, safeLang, {
          title,
          description,
          canonicalPath,
          image,
        })
      : [
          makeWebPageSchema(siteUrl, canonicalPath, safeLang, title, description),
        ];

  return {
    path,
    title,
    description,
    keywords,
    image,
    canonicalPath,
    canonicalUrl: toAbsoluteUrl(siteUrl, canonicalPath),
    type: entry.type || 'website',
    noindex: Boolean(entry.noindex),
    robots: entry.noindex ? NOINDEX_ROBOTS : INDEX_ROBOTS,
    langCode: LANG_CODES[safeLang],
    ogLocale: OG_LOCALES[safeLang],
    siteName: 'ILUNGI',
    themeColor: DEFAULT_THEME_COLOR,
    schema,
    changefreq: entry.changefreq || 'monthly',
    priority: entry.priority || '0.5',
  };
};

export const getSitemapEntries = (siteUrl = DEFAULT_SITE_URL, lang = 'pt') =>
  Object.keys(exactRouteSeo).map((routePath) => {
    const seo = getRouteSeo(routePath, lang, siteUrl);
    return {
      path: routePath,
      loc: seo.canonicalUrl,
      changefreq: seo.changefreq,
      priority: seo.priority,
    };
  });
