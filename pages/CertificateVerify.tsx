import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useAppContext } from '../App';
import { Certificate, getStoredCertificates } from '../lib/certificatesData';

const CertificateVerify: React.FC = () => {
  const { lang } = useAppContext();
  const isPt = lang === 'pt';
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState<Certificate | null | 'not_found'>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (!certId.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const searchTerm = certId.trim().toLowerCase();
      const allCerts = getStoredCertificates();

      // Search match by code or student name
      const found = allCerts.find(c => 
        c.code.toLowerCase() === searchTerm ||
        c.id.toLowerCase() === searchTerm ||
        c.student.toLowerCase().includes(searchTerm)
      );

      if (found) {
        setResult(found);
      } else {
        setResult('not_found');
      }
      setLoading(false);
    }, 600);
  };

  const handleDownloadGeneratedCertificate = (cert: Certificate) => {
    if (cert.pdfUrl) {
      const link = document.createElement('a');
      link.href = cert.pdfUrl;
      link.download = cert.pdfFileName || `Certificado_${cert.code}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Create printable certificate window if no PDF attached
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Certificado ${cert.code} - ILUNGI</title>
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; text-align: center; padding: 50px; background: #fafafa; }
              .cert-box { border: 10px solid #1B3C2B; padding: 40px; background: #fff; max-w: 800px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-radius: 20px; }
              h1 { color: #1B3C2B; font-size: 36px; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 2px; }
              h2 { color: #6a00a3; font-size: 24px; font-weight: 300; margin-top: 0; }
              p { color: #475569; font-size: 18px; line-height: 1.6; }
              .student-name { font-size: 32px; font-weight: bold; color: #0f172a; margin: 25px 0; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 10px; }
              .course-title { font-size: 24px; font-weight: bold; color: #6a00a3; }
              .footer { margin-top: 40px; font-size: 14px; color: #94a3b8; display: flex; justify-between; align-items: center; }
              @media print { body { background: none; padding: 0; } .cert-box { box-shadow: none; border-width: 5px; } }
            </style>
          </head>
          <body>
            <div class="cert-box">
              <h1>ILUNGI ACADEMIA</h1>
              <h2>CERTIFICADO DE CONCLUSAO</h2>
              <p>Certificamos para os devidos fins que</p>
              <div class="student-name">${cert.student}</div>
              <p>concluiu com aproveitamento o curso de</p>
              <div class="course-title">${cert.course}</div>
              <p style="margin-top:20px;">Carga Horária: <strong>${cert.hours || '24h'}</strong> | Emitido em: <strong>${cert.issuedDate}</strong></p>
              <div class="footer">
                <div>Código de Verificação: <strong>${cert.code}</strong></div>
                <div>Autenticado por ILUNGI Digital</div>
              </div>
            </div>
            <script>window.onload = function() { window.print(); }</script>
          </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <div className="min-h-[80vh] py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B3C2B] mb-4">
            {isPt ? 'Verificar Certificado' : 'Verify Certificate'}
          </h1>
          <p className="text-slate-500">
            {isPt
              ? 'Valide a autenticidade dos certificados emitidos pela ILUNGI Academia introduzindo o código ou o nome do aluno.'
              : 'Validate the authenticity of certificates issued by ILUNGI Academy by entering code or student name.'}
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
          <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder={isPt ? 'Ex: ILUNGI-FDN-CS-0022026 ou Carlos Silva' : 'e.g., ILUNGI-FDN-CS-0022026 or Carlos Silva'}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-100 border-none focus:ring-2 focus:ring-[#6a00a3] transition-all text-slate-800 font-medium"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 sm:px-10 py-4 bg-[#1B3C2B] text-white rounded-2xl font-bold hover:bg-[#142d20] disabled:opacity-50 transition-all shadow-lg"
            >
              {loading ? (isPt ? 'Verificando...' : 'Verifying...') : (isPt ? 'Verificar' : 'Verify')}
            </button>
          </form>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`p-6 sm:p-8 rounded-3xl border-2 ${result !== 'not_found' && result.status === 'valid' ? 'bg-white border-green-500 shadow-xl' : 'bg-red-50 border-red-200'}`}
            >
              {result !== 'not_found' ? (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`p-3 rounded-2xl ${result.status === 'valid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {result.status === 'valid' ? <CheckCircle className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">
                        {result.status === 'valid' 
                          ? (isPt ? 'Certificado Válido & Autêntico' : 'Valid Certificate')
                          : (isPt ? 'Certificado Revogado / Inválido' : 'Revoked Certificate')}
                      </h3>
                      <p className={`font-medium ${result.status === 'valid' ? 'text-green-600' : 'text-red-600'}`}>
                        {result.status === 'valid' 
                          ? (isPt ? 'Documento autenticado oficialmente na base de dados ILUNGI' : 'Document officially authenticated in ILUNGI database')
                          : (isPt ? 'Este certificado consta como revogado no sistema' : 'This certificate is marked as revoked')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold mb-1">{isPt ? 'Aluno' : 'Student'}</p>
                      <p className="font-bold text-slate-800 text-lg">{result.student}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold mb-1">{isPt ? 'Curso' : 'Course'}</p>
                      <p className="font-bold text-slate-800 text-lg">{result.course}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold mb-1">{isPt ? 'Data de Emissão' : 'Issue Date'}</p>
                      <p className="font-bold text-slate-800">{result.issuedDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold mb-1">{isPt ? 'Código do Certificado' : 'Certificate Code'}</p>
                      <p className="font-bold text-[#6a00a3] break-all">{result.code}</p>
                    </div>
                  </div>

                  {result.status === 'valid' && (
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                      <button 
                        onClick={() => handleDownloadGeneratedCertificate(result)}
                        className="flex-1 flex items-center justify-center space-x-2 py-4 bg-[#6a00a3] text-white rounded-2xl font-bold hover:bg-[#520b7d] transition-all shadow-xl"
                      >
                        <Download className="w-5 h-5" />
                        <span>{isPt ? 'Baixar Certificado (PDF)' : 'Download Certificate (PDF)'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-red-700">{isPt ? 'Certificado não encontrado' : 'Certificate not found'}</h3>
                  <p className="text-red-500 mt-2">{isPt ? 'O código ou nome informado não corresponde a nenhum registro válido na nossa base de dados.' : 'The provided code or name does not match any valid record in our database.'}</p>
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
