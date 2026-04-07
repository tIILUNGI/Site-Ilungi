import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../App';
import { SEO } from '../components/Seo';
import { loadData } from '../lib/dataSync';
import { DEFAULT_SITE_URL, toAbsoluteUrl } from '../seo/routeSeo.js';

// Mapping of ISO references to their acquired norms/seals
// Use client name slug for matching
const isoNorms: Record<string, { norms: string[], asib: boolean }> = {
  'esmac': { norms: ['9001', '45001', '14001'], asib: true },
  'aclean': { norms: ['9001', '45001', '14001'], asib: true },
  'imovias-urbanismo-e-construcao-sa': { norms: ['9001', '45001'], asib: true },
  'imovias-energy-sa': { norms: ['9001', '45001'], asib: true },
  'diway': { norms: ['9001'], asib: true },
  'velonet': { norms: ['9001'], asib: true },
  'interseguros-corretores-de-seguros-sa': { norms: ['9001'], asib: true },
  'gold-procurement': { norms: [], asib: false },
  'bureau-veritas': { norms: [], asib: false },
  'petromar': { norms: [], asib: false },
  'pensana': { norms: [], asib: false },
  'bioprev': { norms: [], asib: false }
};

// ISO norm image paths
const isoImages: Record<string, string> = {
  '9001': '/imagens/ISO 9001_2015.png',
  '45001': '/imagens/ISO 45001_2018.png',
  '14001': '/imagens/ISO 14001_2015.png',
  'asib': '/imagens/ASIB.png'
};

const ReferenceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const { t, isDark, lang } = useAppContext();
  const isPt = lang === 'pt';
  const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Determine the back link based on service parameter
  const getBackLink = () => {
    if (serviceParam === 'iso') return '/consultoria/consultoria-e-auditoria-em-sistemas-de-gestao';
    if (serviceParam === 'risk') return '/consultoria/gri-sustentabilidade';
    if (serviceParam === 'procurement') return '/consultoria/procurement';
    if (serviceParam === 'pmo') return '/consultoria/assistencia-e-suporte-de-ti';
    return '/consultoria';
  };
  
  const defaultReferences = t.references?.clients || [];
  const [references, setReferences] = useState<any[]>(defaultReferences);
  useEffect(() => {
    let isMounted = true;
    setReferences(defaultReferences);
    loadData('references', 'ilungi_references_data', defaultReferences).then((data) => {
      if (!isMounted) return;
      setReferences(data || []);
    });
    return () => {
      isMounted = false;
    };
  }, [lang]);

  const reference = references.find((ref: any) => ref.id === id);
  
  // Find client norms by matching client name slug
  const getClientNorms = () => {
    if (!reference) return null;
    const clientName = (reference.client_name || reference.name || '').toLowerCase();
    const slug = clientName
      .replace(/[,.]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[-]+/g, '-');
    
    // Try different slug variations
    for (const key of Object.keys(isoNorms)) {
      if (slug.includes(key) || key.includes(slug)) {
        return isoNorms[key];
      }
    }
    // Also check if service_type contains ISO info
    const serviceType = reference.service_type || {};
    const serviceStr = typeof serviceType === 'string' ? serviceType : (serviceType.pt || serviceType.en || '');
    if (serviceStr.toLowerCase().includes('iso')) {
      const norms: string[] = [];
      if (serviceStr.includes('9001')) norms.push('9001');
      if (serviceStr.includes('14001')) norms.push('14001');
      if (serviceStr.includes('45001')) norms.push('45001');
      if (serviceStr.includes('27001')) norms.push('27001');
      if (serviceStr.includes('22301')) norms.push('22301');
      if (serviceStr.includes('37001') || serviceStr.includes('37301')) norms.push('37001');
      if (serviceStr.includes('31000')) norms.push('31000');
      if (serviceStr.includes('22000')) norms.push('22000');
      return { norms, asib: norms.length > 0 };
    }
    return null;
  };
  
  const clientNorms = getClientNorms();
  const canonicalPath = id ? `/referencia/${id}` : '/referencia';
  const referenceTitle = reference
    ? `${reference.name} | ILUNGI`
    : isPt
      ? 'Referencia nao encontrada | ILUNGI'
      : 'Reference not found | ILUNGI';
  const referenceDescription = reference
    ? clientNorms
      ? isPt
        ? `Referencia da ILUNGI para ${reference.name}, com destaque para certificacoes e normas implementadas.`
        : `ILUNGI reference for ${reference.name}, highlighting implemented certifications and standards.`
      : reference.description || (isPt
        ? `Caso de cliente da ILUNGI para ${reference.name}.`
        : `ILUNGI client case for ${reference.name}.`)
    : isPt
      ? 'A referencia solicitada nao foi encontrada.'
      : 'The requested reference could not be found.';
  const referenceImage = reference?.logo
    ? toAbsoluteUrl(siteUrl, reference.logo)
    : toAbsoluteUrl(siteUrl, '/imagens/ilungi_logo.jpg');
  const seoSchema = reference
    ? [
        {
          '@type': 'WebPage',
          name: referenceTitle,
          description: referenceDescription,
          url: `${siteUrl}${canonicalPath}`,
          inLanguage: isPt ? 'pt-AO' : 'en',
        },
      ]
    : [];

  if (!reference) {
    return (
      <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <SEO
          override={{
            title: referenceTitle,
            description: referenceDescription,
            canonicalPath,
            canonicalUrl: `${siteUrl}${canonicalPath}`,
            image: referenceImage,
            noindex: true,
            robots: 'noindex, nofollow',
            schema: seoSchema,
          }}
        />
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {isPt ? 'Referência não encontrada' : 'Reference not found'}
          </h1>
          <Link to="/" className="text-purple-600 hover:underline">
            {isPt ? 'Voltar ao início' : 'Back to home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <SEO
        override={{
          title: referenceTitle,
          description: referenceDescription,
          canonicalPath,
          canonicalUrl: `${siteUrl}${canonicalPath}`,
          image: referenceImage,
          schema: seoSchema,
        }}
      />
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          to={getBackLink()} 
          className={`inline-flex items-center mb-8 font-medium ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
        >
          {isPt ? 'Voltar ao serviço' : 'Back to service'}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl p-8 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
        >
          {/* Company Header - Only Name and Logo for ISO clients, no text */}
          <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
              <img 
                src={reference.logo} 
                alt={reference.name}
                className="w-full h-full object-contain p-3"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50%" x="50%" dominant-baseline="middle" text-anchor="middle" font-size="40">' + reference.name.charAt(0) + '</text></svg>';
                }}
              />
            </div>
            <h1 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {reference.name}
            </h1>
          </div>

          {/* Service Description or ISO Norms */}
          <div className="mb-8">
            {clientNorms ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clientNorms.norms.map((norm: string) => (
                  <motion.div 
                    key={norm}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                    onClick={() => setSelectedImage(isoImages[norm])}
                  >
                    <img 
                      src={isoImages[norm]} 
                      alt={`ISO ${norm}`}
                      className="w-full h-32 object-contain p-4 bg-white"
                    />
                  </motion.div>
                ))}
                {clientNorms.asib && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                    onClick={() => setSelectedImage(isoImages['asib'])}
                  >
                    <img 
                      src={isoImages['asib']} 
                      alt="ASIB"
                      className="w-full h-32 object-contain p-4 bg-white"
                    />
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {isPt ? 'Serviço Prestado' : 'Service Provided'}
                </h2>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {reference.description || (isPt 
                    ? `Serviço de ${reference.service} para ${reference.name}.`
                    : `${reference.service} service for ${reference.name}.`
                  )}
                </p>
              </>
            )}
          </div>

          {/* Testimonial and Attachments - only for non-ISO clients or PMO services */}
          {(!clientNorms || serviceParam === 'pmo') && (
            <>
              <div className={`rounded-2xl p-6 mb-8 ${isDark ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {isPt ? 'Testemunho' : 'Testimonial'}
                </h2>
                <p className={`text-lg italic leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  "{reference.comment}"
                </p>
                <p className={`mt-4 font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  — {reference.person}
                </p>
              </div>

              {/* Attachments */}
              {reference.attachments && reference.attachments.length > 0 && (
                <div>
                  <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {isPt ? 'Certificados' : 'Certificates'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reference.attachments.map((attachment: any, index: number) => (
                      <div 
                        key={index}
                        className={`relative rounded-xl overflow-hidden cursor-pointer group ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}
                        onClick={() => setSelectedImage(attachment)}
                      >
                        <img 
                          src={attachment} 
                          alt={isPt ? 'Certificado' : 'Certificate'}
                          className="w-full h-48 object-contain p-2"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold">+</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-purple-400 transition-colors"
            title={isPt ? 'Fechar' : 'Close'}
            onClick={() => setSelectedImage(null)}
          >
            <span className="text-2xl font-bold">×</span>
          </button>
          <motion.img 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedImage} 
            alt={isPt ? 'Certificado' : 'Certificate'}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ReferenceDetail;
