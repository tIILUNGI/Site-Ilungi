import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download, Calendar, User, Building } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../App';

const ReferenceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, isDark } = useAppContext();
  const isPt = t.nav.home === 'Início';
  
  const references = t.references?.clients || [];
  const reference = references.find((ref: any) => ref.id === id);

  if (!reference) {
    return (
      <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
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
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          to="/consultoria" 
          className={`inline-flex items-center mb-8 font-medium ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {isPt ? 'Voltar aos serviços' : 'Back to services'}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl p-8 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
        >
          {/* Company Header */}
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
            <div>
              <h1 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {reference.name}
              </h1>
              <p className={`text-lg ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {reference.role}
              </p>
            </div>
          </div>

          {/* Service Description */}
          <div className="mb-8">
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {isPt ? 'Serviço Prestado' : 'Service Provided'}
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {reference.description || (isPt 
                ? `Serviço de ${reference.service} para ${reference.name}.`
                : `${reference.service} service for ${reference.name}.`
              )}
            </p>
          </div>

          {/* Testimonial */}
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
                {isPt ? 'Anexos' : 'Attachments'}
              </h2>
              <div className="space-y-3">
                {reference.attachments.map((attachment: any, index: number) => (
                  <a 
                    key={index}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-4 rounded-xl border transition-all ${
                      isDark 
                        ? 'border-slate-600 hover:border-purple-500 bg-slate-700' 
                        : 'border-slate-200 hover:border-purple-300 bg-slate-50'
                    }`}
                  >
                    <FileText className={`w-8 h-8 mr-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    <div className="flex-1">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {attachment.name}
                      </p>
                    </div>
                    <Download className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ReferenceDetail;
