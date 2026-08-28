import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, CheckCircle, AlertCircle, FileText, RefreshCw } from 'lucide-react';
import { useAppContext } from '../App';
import { endpoints } from '../lib/api';

interface CertResult {
  valid: boolean;
  revoked?: boolean;
  student?: string;
  course?: string;
  issuedDate?: string;
  hours?: string;
  code?: string;
  pdfUrl?: string;
  pdfFileName?: string;
}

const CertificateVerify: React.FC = () => {
  const { lang } = useAppContext();
  const isPt = lang === 'pt';
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState<CertResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!certId.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      // Tenta buscar por código direto
      const allCerts = await (endpoints as any).certificates.getAll().catch(() => []);
      const searchTerm = certId.trim().toLowerCase();

      let found: any = null;
      if (Array.isArray(allCerts)) {
        found = allCerts.find((c: any) =>
          (c.code || '').toLowerCase() === searchTerm ||
          (c.id || '').toLowerCase() === searchTerm ||
          (c.student || c.student_name || '').toLowerCase().includes(searchTerm)
        );
      }

      if (found) {
        setResult({
          valid: true,
          revoked: found.status === 'revoked',
          student: found.student || found.student_name || '',
          course: found.course || found.course_name || '',
          issuedDate: found.issuedDate || found.issued_date || found.date || '',
          hours: found.hours || '',
          code: found.code || found.id,
          pdfUrl: found.pdfUrl || found.pdf_url || '',
          pdfFileName: found.pdfFileName || found.pdf_file_name || '',
        });
      } else {
        setResult({ valid: false });
      }
    } catch (e) {
      console.error('[CertificateVerify] Error:', e);
      setResult({ valid: false });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (res: CertResult) => {
    if (res.pdfUrl) {
      const link = document.createElement('a');
      link.href = res.pdfUrl;
      link.download = res.pdfFileName || `Certificado_${res.code}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    // Fallback: janela de impressão formatada
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificado ${res.code} - ILUNGI</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; text-align: center; padding: 60px; background: #fafafa; }
            .cert-box { border: 10px solid #1B3C2B; padding: 50px; background: #fff; max-width: 800px; margin: 0 auto; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.12); }
            h1 { color: #1B3C2B; font-size: 32px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 4px; }
            h2 { color: #6a00a3; font-size: 20px; font-weight: 300; margin-top: 0; }
            .student-name { font-size: 36px; font-weight: bold; color: #0f172a; margin: 30px 0; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 10px; }
            .course-title { font-size: 22px; font-weight: bold; color: #6a00a3; margin: 10px 0 20px; }
            p { color: #475569; font-size: 16px; }
            .footer { margin-top: 40px; font-size: 13px; color: #94a3b8; display: flex; justify-content: space-between; }
            @media print { body { background: none; } .cert-box { box-shadow: none; } }
          </style>
        </head>
        <body>
          <div class="cert-box">
            <h1>ILUNGI ACADEMIA</h1>
            <h2>CERTIFICADO DE CONCLUSÃO</h2>
            <p>Certificamos que</p>
            <div class="student-name">${res.student}</div>
            <p>concluiu com aproveitamento o curso de</p>
            <div class="course-title">${res.course}</div>
            <p>Carga Horária: <strong>${res.hours || '—'}</strong> &nbsp;|&nbsp; Data de Emissão: <strong>${res.issuedDate}</strong></p>
            <div class="footer">
              <span>Código de Verificação: <strong>${res.code}</strong></span>
              <span>Autenticado em ilungi.ao</span>
            </div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
        </html>
      `);
      printWindow.document.close();
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
              ? 'Valide a autenticidade dos certificados emitidos pela ILUNGI Academia introducindo o código ou o nome do aluno.'
              : 'Validate the authenticity of certificates issued by ILUNGI Academy by entering code or student name.'}
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 mb-8">
          <form onSubmit={e => { e.preventDefault(); handleVerify(); }} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={certId}
                onChange={e => setCertId(e.target.value)}
                placeholder={isPt ? 'Código do certificado ou nome do aluno...' : 'Certificate code or student name...'}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-100 border-none focus:ring-2 focus:ring-[#6a00a3] transition-all font-medium text-slate-800"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-[#1B3C2B] text-white rounded-2xl font-bold hover:bg-[#142d20] disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : null}
              {loading ? (isPt ? 'Verificando...' : 'Verifying...') : (isPt ? 'Verificar' : 'Verify')}
            </button>
          </form>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-6 sm:p-8 rounded-3xl border-2 ${
                result.valid && !result.revoked
                  ? 'bg-white border-green-500 shadow-xl'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              {result.valid ? (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`p-3 rounded-2xl ${result.revoked ? 'bg-red-100' : 'bg-green-100'}`}>
                      {result.revoked
                        ? <AlertCircle className="w-8 h-8 text-red-500" />
                        : <CheckCircle className="w-8 h-8 text-green-500" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">
                        {result.revoked
                          ? (isPt ? 'Certificado Revogado' : 'Revoked Certificate')
                          : (isPt ? 'Certificado Válido & Autêntico' : 'Valid Certificate')}
                      </h3>
                      <p className={`font-medium ${result.revoked ? 'text-red-500' : 'text-green-600'}`}>
                        {result.revoked
                          ? (isPt ? 'Este certificado consta como revogado no sistema ILUNGI.' : 'This certificate is marked as revoked.')
                          : (isPt ? 'Documento autenticado oficialmente na base de dados ILUNGI.' : 'Document officially authenticated in the ILUNGI database.')}
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
                      <p className="text-xs text-slate-400 uppercase font-bold mb-1">{isPt ? 'Código' : 'Code'}</p>
                      <p className="font-bold text-[#6a00a3] break-all">{result.code}</p>
                    </div>
                  </div>

                  {!result.revoked && (
                    <button
                      onClick={() => handleDownload(result)}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-[#6a00a3] text-white rounded-2xl font-bold hover:bg-[#520b7d] transition-all shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      {result.pdfUrl
                        ? (isPt ? 'Baixar Certificado PDF' : 'Download Certificate PDF')
                        : (isPt ? 'Imprimir Certificado' : 'Print Certificate')}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-red-700">{isPt ? 'Certificado não encontrado' : 'Certificate not found'}</h3>
                  <p className="text-red-500 mt-2 text-sm">{isPt ? 'O código ou nome informado não corresponde a nenhum registo válido na nossa base de dados.' : 'The provided code or name does not match any valid record in our database.'}</p>
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
