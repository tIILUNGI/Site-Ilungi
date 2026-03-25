import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../App';
import { applySeo, resolveRouteSeo, type SeoState } from '../lib/seo';

type SeoOverride = Partial<SeoState>;

const mergeSeo = (base: SeoState, override?: SeoOverride): SeoState => {
  if (!override) return base;

  return {
    ...base,
    ...override,
    keywords: override.keywords ?? base.keywords,
    schema: override.schema ?? base.schema,
    canonicalPath: override.canonicalPath ?? base.canonicalPath,
    canonicalUrl: override.canonicalUrl ?? base.canonicalUrl,
    image: override.image ?? base.image,
    robots: override.robots ?? (override.noindex ? 'noindex, nofollow' : base.robots),
  };
};

export const RouteSeoManager: React.FC = () => {
  const location = useLocation();
  const { lang } = useAppContext();

  useLayoutEffect(() => {
    applySeo(resolveRouteSeo(location.pathname, lang));
  }, [location.pathname, lang]);

  return null;
};

export const SEO: React.FC<{ override: SeoOverride }> = ({ override }) => {
  const location = useLocation();
  const { lang } = useAppContext();

  const schemaKey = useMemo(() => JSON.stringify(override.schema ?? null), [override.schema]);
  const keywordsKey = useMemo(
    () => JSON.stringify(override.keywords ?? null),
    [override.keywords]
  );

  useEffect(() => {
    const base = resolveRouteSeo(location.pathname, lang);
    applySeo(mergeSeo(base, override));
  }, [
    location.pathname,
    lang,
    override.title,
    override.description,
    override.canonicalPath,
    override.canonicalUrl,
    override.image,
    override.noindex,
    override.robots,
    override.type,
    schemaKey,
    keywordsKey,
  ]);

  return null;
};
