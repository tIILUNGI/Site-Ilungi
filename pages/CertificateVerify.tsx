
import React, { useState } from 'react';
import { Search, ShieldCheck, ShieldAlert, Download, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../App';

const CertificateVerify: React.FC = () => {
  const { lang } = useAppContext();
  const isPt = lang === 'pt';
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (!certId) return;
    setLoading(true);
    setResult(null);

    // Mock search logic
    setTimeout(() => {
      if (certId.toUpperCase() === 'ILUNGI-2024-001') {
        setResult({
          valid: true,
          student: "André Manuel Silveira",
          course: "Lead Auditor ISO 27001",
          issued: "15/05/2024",
          id: "ILUNGI-2024-001"
        });
      } else {
        setResult({ valid: false });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-[#1B3C2B] mb-4">
              {isPt ? 'Verificar Certificado' : 'Verify Certificate'}
            </h1>
            <p className="text-slate-500">
              {isPt
                ? 'Valide a autenticidade dos certificados emitidos pela ILUNGI Academia.'
                : 'Validate the authenticity of certificates issued by ILUNGI Academy.'}
            </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                        placeholder={isPt ? 'Ex: ILUNGI-2024-001' : 'e.g., ILUNGI-2024-001'}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-100 border-none focus:ring-2 focus:ring-[#6a00a3] transition-all"
                    />
                </div>
                <button 
                    onClick={handleVerify}
                    disabled={loading}
                    className="px-10 py-4 bg-[#1B3C2B] text-white rounded-2xl font-bold hover:bg-[#142d20] disabled:opacity-50 transition-all"
                >
                    {loading ? (isPt ? 'Verificando...' : 'Verifying...') : (isPt ? 'Verificar' : 'Verify')}
                </button>
            </div>
        </div>

        <AnimatePresence>
            {result && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-8 rounded-3xl border-2 ${result.valid ? 'bg-white border-green-500' : 'bg-red-50 border-red-200'}`}
                >
                    {result.valid ? (
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                                    <ShieldCheck className="w-10 h-10" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800">
                                      {isPt ? 'Certificado V\u00e1lido' : 'Valid Certificate'}
                                    </h3>
                                    <p className="text-green-600 font-medium">{isPt ? 'Documento autenticado no sistema ILUNGI' : 'Document authenticated in the ILUNGI system'}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-100">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">{isPt ? 'Aluno' : 'Student'}</p>
                                    <p className="font-bold text-slate-800">{result.student}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">{isPt ? 'Curso' : 'Course'}</p>
                                    <p className="font-bold text-slate-800">{result.course}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">{isPt ? 'Data Emiss\u00e3o' : 'Issue Date'}</p>
                                    <p className="font-bold text-slate-800">{result.issued}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">{isPt ? 'ID Certificado' : 'Certificate ID'}</p>
                                    <p className="font-bold text-slate-800">{result.id}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                                <button className="flex-1 flex items-center justify-center space-x-2 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
                                    <Download className="w-5 h-5" />
                                    <span>{isPt ? 'Baixar PDF' : 'Download PDF'}</span>
                                </button>
                                <div className="p-2 border border-slate-200 rounded-2xl flex items-center justify-center">
                                    <QrCode className="w-10 h-10 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldAlert className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-red-700">{isPt ? 'Certificado n\u00e3o encontrado' : 'Certificate not found'}</h3>
                            <p className="text-red-500 mt-2">{isPt ? 'O c\u00f3digo informado n\u00e3o corresponde a nenhum registro v\u00e1lido em nossa base de dados.' : 'The provided code does not match any valid record in our database.'}</p>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CertificateVerify;
