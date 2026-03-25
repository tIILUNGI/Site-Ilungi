import {
  DEFAULT_SITE_URL,
  DEFAULT_THEME_COLOR,
  getRouteSeo,
  serializeSchemaGraph,
} from '../seo/routeSeo.js';

type SeoState = ReturnType<typeof getRouteSeo>;

const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');
const SEO_SCHEMA_ID = 'ilungi-seo-schema';

const upsertMetaByName = (name: string, content: string) => {
  let element = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertMetaByProperty = (property: string, content: string) => {
  let element = document.head.querySelector(
    `meta[property="${property}"]`
  ) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const upsertSchema = (schemaMarkup: string) => {
  let element = document.getElementById(SEO_SCHEMA_ID) as HTMLScriptElement | null;
  if (!schemaMarkup) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement('script');
    element.id = SEO_SCHEMA_ID;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = schemaMarkup;
};

const normalizeKeywords = (keywords: SeoState['keywords']) =>
  Array.isArray(keywords) ? keywords.join(', ') : keywords;

export const resolveRouteSeo = (pathname: string, lang: 'pt' | 'en' = 'pt') =>
  getRouteSeo(pathname, lang, SITE_URL);

export const applySeo = (seo: SeoState) => {
  document.title = seo.title;
  document.documentElement.lang = seo.langCode;

  upsertMetaByName('description', seo.description);
  upsertMetaByName('keywords', normalizeKeywords(seo.keywords));
  upsertMetaByName('robots', seo.robots);
  upsertMetaByName('theme-color', seo.themeColor || DEFAULT_THEME_COLOR);

  upsertLink('canonical', seo.canonicalUrl);

  upsertMetaByProperty('og:site_name', seo.siteName);
  upsertMetaByProperty('og:locale', seo.ogLocale);
  upsertMetaByProperty('og:type', seo.type);
  upsertMetaByProperty('og:title', seo.title);
  upsertMetaByProperty('og:description', seo.description);
  upsertMetaByProperty('og:url', seo.canonicalUrl);
  upsertMetaByProperty('og:image', seo.image);
  upsertMetaByProperty('og:image:alt', seo.title);

  upsertMetaByName('twitter:card', 'summary_large_image');
  upsertMetaByName('twitter:title', seo.title);
  upsertMetaByName('twitter:description', seo.description);
  upsertMetaByName('twitter:image', seo.image);
  upsertMetaByName('twitter:url', seo.canonicalUrl);

  upsertSchema(serializeSchemaGraph(seo.schema));
};

export type { SeoState };
