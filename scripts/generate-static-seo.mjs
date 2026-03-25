import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  DEFAULT_SITE_URL,
  PRIVATE_DISALLOW_PATHS,
  getRouteSeo,
  getSitemapEntries,
  serializeSchemaGraph,
} from '../seo/routeSeo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const siteUrl = (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');

const replaceOrInsert = (html, matcher, replacement) => {
  if (matcher.test(html)) {
    return html.replace(matcher, replacement);
  }

  return html.replace('</head>', `    ${replacement}\n</head>`);
};

const injectSeoIntoHtml = (html, seo) => {
  let output = html;

  output = output.replace(/<html[^>]*lang="[^"]*"[^>]*>/i, `<html lang="${seo.langCode}">`);
  output = replaceOrInsert(output, /<title>.*?<\/title>/is, `<title>${seo.title}</title>`);
  output = replaceOrInsert(
    output,
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${seo.description}">`
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="keywords"[^>]*>/i,
    `<meta name="keywords" content="${seo.keywords.join(', ')}">`
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="robots"[^>]*>/i,
    `<meta name="robots" content="${seo.robots}">`
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="theme-color"[^>]*>/i,
    `<meta name="theme-color" content="${seo.themeColor}">`
  );
  output = replaceOrInsert(
    output,
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${seo.canonicalUrl}">`
  );

  const propertyTags = {
    'og:site_name': seo.siteName,
    'og:locale': seo.ogLocale,
    'og:type': seo.type,
    'og:title': seo.title,
    'og:description': seo.description,
    'og:url': seo.canonicalUrl,
    'og:image': seo.image,
    'og:image:alt': seo.title,
  };

  for (const [property, content] of Object.entries(propertyTags)) {
    output = replaceOrInsert(
      output,
      new RegExp(`<meta\\s+property="${property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'i'),
      `<meta property="${property}" content="${content}">`
    );
  }

  const twitterTags = {
    'twitter:card': 'summary_large_image',
    'twitter:title': seo.title,
    'twitter:description': seo.description,
    'twitter:image': seo.image,
    'twitter:url': seo.canonicalUrl,
  };

  for (const [name, content] of Object.entries(twitterTags)) {
    output = replaceOrInsert(
      output,
      new RegExp(`<meta\\s+name="${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'i'),
      `<meta name="${name}" content="${content}">`
    );
  }

  output = replaceOrInsert(
    output,
    /<script\s+id="ilungi-seo-schema"[^>]*>[\s\S]*?<\/script>/i,
    `<script id="ilungi-seo-schema" type="application/ld+json">\n${serializeSchemaGraph(
      seo.schema
    )}\n    </script>`
  );

  return output;
};

const routeToFilePath = (routePath) => {
  if (routePath === '/') {
    return path.join(distDir, 'index.html');
  }

  const segments = routePath.replace(/^\//, '').split('/');
  return path.join(distDir, ...segments, 'index.html');
};

const removeLegacyBlogAssets = async () => {
  await fs.rm(path.join(distDir, 'BLOG'), { recursive: true, force: true });
};

const generateStaticHtmlRoutes = async () => {
  const templatePath = path.join(distDir, 'index.html');
  const templateHtml = await fs.readFile(templatePath, 'utf8');
  const routes = getSitemapEntries(siteUrl, 'pt').map((entry) => entry.path);

  for (const routePath of routes) {
    const outputPath = routeToFilePath(routePath);
    const seo = getRouteSeo(routePath, 'pt', siteUrl);
    const html = injectSeoIntoHtml(templateHtml, seo);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, html, 'utf8');
  }
};

const generateSitemap = async () => {
  const today = new Date().toISOString().slice(0, 10);
  const entries = getSitemapEntries(siteUrl, 'pt');
  const body = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
};

const generateRobots = async () => {
  const robots = [
    'User-agent: *',
    'Allow: /',
    ...PRIVATE_DISALLOW_PATHS.map((entry) => `Disallow: ${entry}`),
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n');

  await fs.writeFile(path.join(distDir, 'robots.txt'), robots, 'utf8');
};

const main = async () => {
  await removeLegacyBlogAssets();
  await generateStaticHtmlRoutes();
  await generateSitemap();
  await generateRobots();
};

main().catch((error) => {
  console.error('[SEO BUILD] Failed to generate SEO assets.', error);
  process.exitCode = 1;
});
