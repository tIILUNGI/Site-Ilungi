type ReferenceItem = {
  id?: string;
  name?: string;
  logo?: string;
  service?: string;
  attachments?: string[];
  [key: string]: any;
};

const normalizeReferenceName = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

export const sortReferencesAlphabetically = (references: ReferenceItem[] = []) =>
  [...references].sort((left, right) =>
    normalizeReferenceName(left?.name || '').localeCompare(
      normalizeReferenceName(right?.name || ''),
      'pt',
      { numeric: true, sensitivity: 'base' }
    )
  );

export const mergeAndSortReferences = (
  references: ReferenceItem[] = [],
  localizedDefaults: ReferenceItem[] = []
) => {
  const defaultsById = new Map(
    localizedDefaults
      .filter((reference) => reference?.id)
      .map((reference) => [reference.id, reference])
  );

  const mergedReferences = references.map((reference) => {
    const fallback = reference?.id ? defaultsById.get(reference.id) : undefined;

    if (!fallback) {
      return reference;
    }

    return {
      ...reference,
      ...fallback,
      id: reference.id || fallback.id,
      logo: reference.logo || fallback.logo,
      service: reference.service || fallback.service,
      attachments:
        Array.isArray(reference.attachments) && reference.attachments.length > 0
          ? reference.attachments
          : fallback.attachments || [],
    };
  });

  return sortReferencesAlphabetically(
    mergedReferences.length > 0 ? mergedReferences : localizedDefaults
  );
};
