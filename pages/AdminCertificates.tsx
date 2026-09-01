import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ArrowLeft, Award, Download, FileText, CheckCircle, Search, Upload, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { endpoints } from '../lib/api';
import { Certificate } from '../lib/certificatesData';
import { defaultCourses } from '../lib/courseCatalogData';

const emptyCertificate: Certificate = {
  id: '',
  code: '',
  student: '',
  course: '',
  issuedDate: new Date().toISOString().split('T')[0],
  hours: '24h',
  status: 'valid',
  pdfUrl: '',
  pdfFileName: ''
};

const AdminCertificates: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Certificate>(emptyCertificate);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);

  // Helper para obter cursos disponíveis
  useEffect(() => {
    try {
      const names = defaultCourses.map(c => typeof c.name === 'string' ? c.name : (c.name.pt || c.name.en || '')).filter(Boolean);
      setAvailableCourses(names);
    } catch (e) {}
  }, []);

  // Carregar certificados da BD
  const fetchCertificates = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const data = await (endpoints as any).certificates.getAll();
      if (Array.isArray(data)) {
        const mapped: Certificate[] = data.map((c: any) => ({
          id: c.id,
          code: c.code || c.id,
          student: c.student || c.student_name || '',
          course: c.course || c.course_name || '',
          issuedDate: c.issuedDate || c.issued_date || c.date || '',
          hours: c.hours || '',
          status: c.status || 'valid',
          pdfUrl: c.pdfUrl || c.pdf_url || '',
          pdfFileName: c.pdfFileName || c.pdf_file_name || '',
          createdAt: c.createdAt || c.created_at || '',
        }));
        setCertificates(mapped);
      }
    } catch (e: any) {
      setApiError(isPt ? 'Erro ao carregar certificados da base de dados. Verifique se o endpoint /certificates está disponível no servidor.' : 'Error loading certificates from database. Check if /certificates endpoint is available.');
      console.error('[AdminCertificates] Error fetching:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleGenerateCode = () => {
    const year = new Date().getFullYear();
    const seq = Math.floor(1000 + Math.random() * 9000);
    const initials = formData.student
      ? formData.student.split(' ').map(n => n.charAt(0).toUpperCase()).join('').slice(0, 3)
      : 'IL';
    const newCode = `ILUNGI-${year}-${initials}-${seq}`;
    setFormData(prev => ({ ...prev, code: newCode }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert(isPt ? 'Por favor selecione apenas ficheiros PDF.' : 'Please select PDF files only.');
      return;
    }
    // Guardar o ficheiro localmente; o upload real acontece em handleSave
    setSelectedPdfFile(file);
    setFormData(prev => ({ ...prev, pdfFileName: file.name }));
  };

  const handleSave = async () => {
    if (!formData.code || !formData.student || !formData.course) {
      alert(isPt ? 'Por favor preencha o código, aluno e curso.' : 'Please fill code, student and course.');
      return;
    }
    setSaving(true);
    try {
      let pdfUrl = formData.pdfUrl || '';
      let pdfFileName = formData.pdfFileName || '';

      // Se há um novo ficheiro PDF selecionado, fazer upload primeiro
      if (selectedPdfFile) {
        setUploadingPdf(true);
        try {
          const uploadResult = await (endpoints as any).certificates.uploadPdf(selectedPdfFile);
          pdfUrl = uploadResult.pdfUrl || pdfUrl;
          pdfFileName = uploadResult.pdfFileName || pdfFileName;
        } finally {
          setUploadingPdf(false);
        }
      }

      const payload = {
        code: formData.code.trim().toUpperCase(),
        student: formData.student.trim(),
        student_name: formData.student.trim(),
        course: formData.course.trim(),
        course_name: formData.course.trim(),
        issuedDate: formData.issuedDate,
        issued_date: formData.issuedDate,
        hours: formData.hours || '',
        status: formData.status,
        pdfUrl,
        pdf_url: pdfUrl,
        pdfFileName,
        pdf_file_name: pdfFileName,
      };

      if (editingId) {
        await (endpoints as any).certificates.update(editingId, payload);
      } else {
        await (endpoints as any).certificates.create(payload);
      }
      await fetchCertificates();
      resetForm();
    } catch (e: any) {
      alert(isPt ? `Erro ao salvar certificado: ${e.message || 'Verifique o servidor.'}` : `Error saving certificate: ${e.message || 'Check the server.'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isPt ? 'Tem certeza que deseja excluir este certificado?' : 'Delete this certificate?')) return;
    try {
      await (endpoints as any).certificates.delete(id);
      await fetchCertificates();
    } catch (e: any) {
      alert(isPt ? 'Erro ao excluir certificado.' : 'Error deleting certificate.');
    }
  };

  const handleEdit = (cert: Certificate) => {
    setFormData(cert);
    setEditingId(cert.id);
    setIsAdding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyCertificate);
    setSelectedPdfFile(null);
  };

  const filteredCertificates = certificates.filter(c => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      c.code.toLowerCase().includes(term) ||
      c.student.toLowerCase().includes(term) ||
      c.course.toLowerCase().includes(term)
    );
  });

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/admin" className={`inline-flex items-center text-sm font-bold mb-4 hover:underline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <ArrowLeft className="w-4 h-4 mr-1" /> {isPt ? 'Voltar ao Painel' : 'Back to Dashboard'}
            </Link>
            <h1 className={`text-3xl font-black flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <Award className="w-8 h-8 text-[#6a00a3]" />
              {isPt ? 'Gerir Certificados Emitidos' : 'Manage Issued Certificates'}
            </h1>
            <p className="text-sm text-slate-400 mt-1">Base de dados: <span className="font-bold text-green-500">API /certificates</span></p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchCertificates} className="flex items-center px-4 py-3 bg-slate-200 dark:bg-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-all text-sm">
              <RefreshCw className="w-4 h-4 mr-2" /> {isPt ? 'Recarregar' : 'Reload'}
            </button>
            <button
              onClick={() => { setIsAdding(true); setEditingId(null); setFormData(emptyCertificate); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center px-6 py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d] transition-all shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" /> {isPt ? 'Novo Certificado' : 'New Certificate'}
            </button>
          </div>
        </div>

        {/* API Error Banner */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
            ⚠️ {apiError}
          </div>
        )}

        {/* Form */}
        {(isAdding || editingId) && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl p-8 mb-12 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}>
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {editingId ? <Edit className="w-5 h-5 text-[#6a00a3]" /> : <Plus className="w-5 h-5 text-[#6a00a3]" />}
              {editingId ? (isPt ? 'Editar Certificado' : 'Edit Certificate') : (isPt ? 'Cadastrar Novo Certificado' : 'Register New Certificate')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Código do Certificado *</label>
                <div className="flex gap-2">
                  <input type="text" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })}
                    className={`flex-1 px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                    placeholder="Ex: ILUNGI-2024-CS-001" />
                  <button type="button" onClick={handleGenerateCode}
                    className="px-3 py-2 bg-purple-100 text-purple-700 rounded-xl text-xs font-bold hover:bg-purple-200">
                    Gerar
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Nome do Aluno *</label>
                <input type="text" value={formData.student} onChange={e => setFormData({ ...formData, student: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Ex: Carlos Silva" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Nome do Curso *</label>
                <input type="text" list="course-options" value={formData.course} onChange={e => setFormData({ ...formData, course: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Selecione ou escreva o nome do curso..." />
                <datalist id="course-options">{availableCourses.map((c, i) => <option key={i} value={c} />)}</datalist>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Data de Emissão</label>
                <input type="date" value={formData.issuedDate} onChange={e => setFormData({ ...formData, issuedDate: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Carga Horária</label>
                <input type="text" value={formData.hours || ''} onChange={e => setFormData({ ...formData, hours: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Ex: 24h" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Estado</label>
                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as 'valid' | 'revoked' })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}>
                  <option value="valid">Válido</option>
                  <option value="revoked">Revogado</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Ficheiro PDF do Certificado (Upload)</label>
                <div className={`p-6 rounded-2xl border-2 border-dashed ${isDark ? 'border-slate-700' : 'border-slate-200 bg-slate-50'} text-center`}>
                  <Upload className="w-8 h-8 mx-auto text-[#6a00a3] mb-2" />
                  <p className="text-sm font-semibold mb-2 text-slate-500">
                    {uploadingPdf
                      ? (isPt ? 'A enviar PDF para o servidor...' : 'Uploading PDF to server...')
                      : (isPt ? 'Selecionar ficheiro PDF do certificado' : 'Select certificate PDF file')}
                  </p>
                  <p className="text-xs text-slate-400 mb-3">{isPt ? 'Tamanho máximo: 20 MB' : 'Max size: 20 MB'}</p>
                  <input type="file" accept="application/pdf" onChange={handleFileUpload}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-[#6a00a3] file:text-white hover:file:bg-[#520b7d] cursor-pointer" />
                  {selectedPdfFile && (
                    <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-xs font-bold">
                      <FileText className="w-4 h-4" /> {selectedPdfFile.name}
                      <span className="text-blue-500">({(selectedPdfFile.size / 1024 / 1024).toFixed(1)} MB) — {isPt ? 'será enviado ao guardar' : 'will upload on save'}</span>
                    </div>
                  )}
                  {!selectedPdfFile && formData.pdfFileName && (
                    <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl text-xs font-bold">
                      <FileText className="w-4 h-4" /> {formData.pdfFileName}
                      <span className="text-green-500">{isPt ? '(já guardado)' : '(already saved)'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
              <button onClick={resetForm} className={`px-6 py-3 rounded-xl font-bold ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-700'}`}>
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 transition-all shadow-lg flex items-center gap-2">
                {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
                {saving ? (isPt ? 'Salvando...' : 'Saving...') : (isPt ? 'Salvar Certificado' : 'Save Certificate')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Search */}
        <div className={`p-4 mb-6 rounded-2xl border flex items-center gap-3 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} shadow-sm`}>
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            placeholder={isPt ? 'Pesquisar por código, aluno ou curso...' : 'Search by code, student or course...'}
            className="w-full bg-transparent outline-none text-sm font-medium" />
        </div>

        {/* Table */}
        <div className={`rounded-3xl overflow-hidden shadow-xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-white'}`}>
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span className="font-medium">{isPt ? 'A carregar certificados da base de dados...' : 'Loading certificates from database...'}</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1000px] w-full">
                <thead className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                  <tr className="text-left text-sm font-bold">
                    <th className="px-6 py-4">Código</th>
                    <th className="px-6 py-4">Aluno</th>
                    <th className="px-6 py-4">Curso</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">PDF</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Ações</th>
                  </tr>
                </thead>
                <tbody className={isDark ? 'divide-y divide-slate-700' : 'divide-y divide-slate-100'}>
                  {filteredCertificates.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-slate-400 font-medium">
                        {apiError ? '⚠️ Erro ao carregar — verifique o servidor' : 'Nenhum certificado cadastrado.'}
                      </td>
                    </tr>
                  ) : filteredCertificates.map(cert => (
                    <tr key={cert.id} className={isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50/70'}>
                      <td className={`px-6 py-4 text-sm font-bold whitespace-nowrap ${isDark ? 'text-purple-400' : 'text-[#6a00a3]'}`}>{cert.code}</td>
                      <td className={`px-6 py-4 text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{cert.student}</td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{cert.course}</td>
                      <td className={`px-6 py-4 text-sm whitespace-nowrap ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{cert.issuedDate}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {cert.pdfUrl ? (
                          <a href={cert.pdfUrl} download={cert.pdfFileName || `Cert_${cert.code}.pdf`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-green-600 hover:underline">
                            <Download className="w-4 h-4" /> {cert.pdfFileName || 'PDF'}
                          </a>
                        ) : <span className="text-xs text-slate-400 italic">Sem PDF</span>}
                      </td>
                      <td className="px-6 py-4">
                        {cert.status === 'valid' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            <CheckCircle className="w-3 h-3" /> Válido
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">Revogado</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(cert)} className={`p-2 rounded-lg ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'}`}>
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(cert.id)} className={`p-2 rounded-lg ${isDark ? 'bg-red-900/40 hover:bg-red-900/60 text-red-300' : 'bg-red-100 hover:bg-red-200 text-red-600'}`}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCertificates;
