
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import ReferenceCard from '../components/ReferenceCard';
import { loadData } from '../lib/dataSync';
import { mergeAndSortReferences } from '../lib/referenceDisplay';

const ISOPage: React.FC = () => {
  const { t, lang } = useAppContext();
  const isPt = lang === 'pt';
  const [showAllStandards, setShowAllStandards] = useState(false);
  const localizedDefaultReferences = t.references?.clients || [];
  const defaultReferences = mergeAndSortReferences(
    localizedDefaultReferences,
    localizedDefaultReferences
  );
  const [references, setReferences] = useState<any[]>(defaultReferences);
  
  const allIsoKeys = ["9001", "14001", "45001", "27001", "22301", "37001", "37301", "31000", "22000", "29993", "20700"] as const;
  const displayedIsoKeys = showAllStandards ? allIsoKeys : allIsoKeys.slice(0, 3);

  useEffect(() => {
    let isMounted = true;
    setReferences(defaultReferences);
    loadData('references', 'ilungi_references_data', localizedDefaultReferences).then((data) => {
      if (!isMounted) return;
      setReferences(mergeAndSortReferences(data || [], localizedDefaultReferences));
    });
    return () => {
      isMounted = false;
    };
  }, [lang]);

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <div className="flex-1">
                <span className="text-[#6a00a3] font-black tracking-widest uppercase text-sm mb-4 block">
                    {isPt ? 'Especialidade ILUNGI' : 'ILUNGI Specialization'}
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-[#1B3C2B] mb-8 leading-tight">{t.iso.title}</h1>
                <p className="text-lg sm:text-xl text-slate-500 font-light leading-relaxed mb-8 text-left lg:text-justify">
                    {t.iso.subtitle}
                </p>
            </div>
            <div className="flex-1 relative">
                <img src="/imagens/consultoria-iso.jpg" className="w-full rounded-3xl shadow-2xl" alt={isPt ? 'Consultoria ISO' : 'ISO Consulting'} />
            </div>
        </div>

        <h2 className="text-3xl font-bold mb-12 text-center">
          {isPt ? 'Normas que Implementamos' : 'Standards We Implement'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {displayedIsoKeys.map((key, i) => (
                <div key={i} className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:border-[#6a00a3]/20 transition-all">
                    <h4 className="text-xs font-black text-[#6a00a3] uppercase mb-1">{key}</h4>
                    <h3 className="text-xl font-bold mb-4">{t.services.iso.items[key].title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{t.services.iso.items[key].benefit}</p>
                    <Link to="/contacto" className="text-sm font-bold text-[#1B3C2B] hover:text-[#6a00a3]">
                        {t.home.ctaPrimary}
                    </Link>
                </div>
            ))}
        </div>
        <div className="text-center mb-24">
          <button 
            onClick={() => setShowAllStandards(!showAllStandards)}
            className="text-sm font-bold text-[#6a00a3] hover:text-[#520b7d] flex items-center justify-center mx-auto transition-colors"
          >
            {isPt ? (showAllStandards ? 'Ver menos' : 'Estas e muitas mais.') : (showAllStandards ? 'Show less' : 'These and many more.')}
          </button>
        </div>

        {/* References Section */}
        {references.length > 0 && (
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-[#1B3C2B] mb-4">
                {t.references?.title || (isPt ? 'Nossas Referências' : 'Our References')}
              </h2>
              <p className="text-slate-500">
                {t.references?.subtitle || (isPt ? 'Empresas que confiaram nos nossos serviços' : 'Companies that trusted our services')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {references
                .filter((ref: any) => ref.service === 'iso')
                .map((ref: any, i: number) => (
                  <ReferenceCard key={ref.id} reference={ref} index={i} />
                ))}
            </div>
          </div>
        )}

        <div className="bg-[#1B3C2B] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-20 text-white flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-12">
            <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t.iso.methodology}</h2>
                <div className="space-y-6">
                    {[
                        { title: t.iso.steps.gap, desc: t.iso.steps.gapDesc },
                        { title: t.iso.steps.planning, desc: t.iso.steps.planningDesc },
                        { title: t.iso.steps.training, desc: t.iso.steps.trainingDesc },
                        { title: t.iso.steps.internalAudit, desc: t.iso.steps.internalAuditDesc },
                        { title: t.iso.steps.report, desc: t.iso.steps.reportDesc },
                        { title: t.iso.steps.goLive, desc: t.iso.steps.goLiveDesc }
                    ].map((step, i) => (
                        <div key={i} className="flex gap-4">
                            <div>
                                <h4 className="font-bold">{step.title}</h4>
                                <p className="text-slate-300 text-sm">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full lg:w-auto shrink-0">
                <Link to="/contacto" className="inline-flex w-full items-center justify-center rounded-full bg-[#6a00a3] px-6 py-4 text-center text-base font-bold leading-snug text-white shadow-xl shadow-purple-900/40 transition-all hover:bg-white hover:text-[#6a00a3] sm:px-10 sm:py-5 sm:text-lg lg:w-auto lg:px-12">
                    {t.iso.cta}
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ISOPage;
