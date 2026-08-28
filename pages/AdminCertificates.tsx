import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ArrowLeft, Award, Download, FileText, CheckCircle, Search, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { Certificate, getStoredCertificates, saveStoredCertificates } from '../lib/certificatesData';
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Certificate>(emptyCertificate);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  useEffect(() => {
    // Load certificates
    const loadedCerts = getStoredCertificates();
    setCertificates(loadedCerts);

    // Load available course titles for dropdown
    try {
      const savedCoursesStr = localStorage.getItem('ilungi_courses_data');
      let coursesList = defaultCourses;
      if (savedCoursesStr) {
        const parsed = JSON.parse(savedCoursesStr);
        if (Array.isArray(parsed) && parsed.length > 0) coursesList = parsed;
      }
      const names = coursesList.map(c => typeof c.name === 'string' ? c.name : (c.name.pt || c.name.en || '')).filter(Boolean);
      setAvailableCourses(names);
    } catch (e) {
      console.error('Error loading courses for dropdown:', e);
    }
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

    setUploadingPdf(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      setFormData(prev => ({
        ...prev,
        pdfUrl: base64Data,
        pdfFileName: file.name
      }));
      setUploadingPdf(false);
    };
    reader.onerror = () => {
      alert(isPt ? 'Erro ao ler ficheiro PDF.' : 'Error reading PDF file.');
      setUploadingPdf(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!formData.code || !formData.student || !formData.course) {
      alert(isPt ? 'Por favor preencha o código, aluno e curso.' : 'Please fill code, student, and course.');
      return;
    }

    const certId = editingId || formData.code.trim().toUpperCase();
    const updatedCert: Certificate = {
      ...formData,
      id: certId,
      code: formData.code.trim().toUpperCase(),
      createdAt: formData.createdAt || new Date().toISOString()
    };

    let newCertificatesList: Certificate[];
    if (editingId) {
      newCertificatesList = certificates.map(c => c.id === editingId ? updatedCert : c);
    } else {
      newCertificatesList = [updatedCert, ...certificates];
    }

    setCertificates(newCertificatesList);
    saveStoredCertificates(newCertificatesList);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm(isPt ? 'Tem certeza que deseja excluir este certificado?' : 'Are you sure you want to delete this certificate?')) {
      const newCertificatesList = certificates.filter(c => c.id !== id);
      setCertificates(newCertificatesList);
      saveStoredCertificates(newCertificatesList);
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
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData(emptyCertificate);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/admin"
              className={`inline-flex items-center text-sm font-bold mb-4 hover:underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#1B3C2B]'}`}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {isPt ? 'Voltar ao Painel' : 'Back to Dashboard'}
            </Link>
            <h1
              className={`text-3xl font-black mb-2 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-800'}`}
            >
              <Award className="w-8 h-8 text-[#6a00a3]" />
              {isPt ? 'Gerir Certificados Emitidos' : 'Manage Issued Certificates'}
            </h1>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center px-6 py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d] transition-all shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            {isPt ? 'Novo Certificado' : 'New Certificate'}
          </button>
        </div>

        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl p-8 mb-12 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
          >
            <h2
              className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}
            >
              {editingId ? <Edit className="w-5 h-5 text-[#6a00a3]" /> : <Plus className="w-5 h-5 text-[#6a00a3]" />}
              {editingId ? (isPt ? 'Editar Certificado' : 'Edit Certificate') : (isPt ? 'Cadastrar Novo Certificado' : 'Register Certificate')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Código do Certificado *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className={`flex-1 px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                    placeholder="Ex: ILUNGI-2024-CS-001"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateCode}
                    className="px-4 py-3 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded-xl text-xs font-bold hover:bg-purple-200 transition-colors"
                  >
                    Gerar Código
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Nome do Aluno *</label>
                <input
                  type="text"
                  value={formData.student}
                  onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Ex: Carlos Silva"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Nome do Curso *</label>
                <input
                  type="text"
                  list="course-options"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Selecione ou escreva o nome do curso..."
                />
                <datalist id="course-options">
                  {availableCourses.map((c, i) => (
                    <option key={i} value={c} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Data de Emissão</label>
                <input
                  type="date"
                  value={formData.issuedDate}
                  onChange={(e) => setFormData({ ...formData, issuedDate: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Carga Horária</label>
                <input
                  type="text"
                  value={formData.hours || ''}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Ex: 24h"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Anexar Certificado PDF (Upload)</label>
                <div className={`p-6 rounded-2xl border-2 border-dashed ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'} text-center`}>
                  <Upload className="w-8 h-8 mx-auto text-[#6a00a3] mb-2" />
                  <p className="text-sm font-semibold mb-2">
                    {uploadingPdf ? 'Processando PDF...' : 'Clique para selecionar o ficheiro PDF do Certificado'}
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#6a00a3] file:text-white hover:file:bg-[#520b7d] cursor-pointer"
                  />
                  {formData.pdfFileName && (
                    <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl text-xs font-bold">
                      <FileText className="w-4 h-4" />
                      Ficheiro anexado: {formData.pdfFileName}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Estado do Certificado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'valid' | 'revoked' })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                >
                  <option value="valid">Válido / Autêntico</option>
                  <option value="revoked">Revogado / Invalidados</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={resetForm}
                className={`px-6 py-3 rounded-xl font-bold ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-700'}`}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg"
              >
                Salvar Certificado
              </button>
            </div>
          </motion.div>
        )}

        {/* Search bar */}
        <div className={`p-4 mb-6 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} shadow-sm flex items-center gap-3`}>
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isPt ? "Pesquisar por código, aluno ou curso..." : "Search by code, student, or course..."}
            className="w-full bg-transparent outline-none text-sm font-medium"
          />
        </div>

        {/* Certificates Table */}
        <div className={`rounded-3xl overflow-hidden shadow-xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-white'}`}>
          <div className="overflow-x-auto">
            <table className="min-w-[1000px] w-full">
              <thead className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                <tr className="text-left text-sm font-bold">
                  <th className="px-6 py-4">Código</th>
                  <th className="px-6 py-4">Aluno</th>
                  <th className="px-6 py-4">Curso</th>
                  <th className="px-6 py-4">Data Emissão</th>
                  <th className="px-6 py-4">Ficheiro PDF</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Ações</th>
                </tr>
              </thead>
              <tbody className={isDark ? 'divide-y divide-slate-700' : 'divide-y divide-slate-100'}>
                {filteredCertificates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-slate-500 font-medium">
                      Nenhum certificado cadastrado.
                    </td>
                  </tr>
                ) : (
                  filteredCertificates.map((cert) => (
                    <tr key={cert.id} className={isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50/70'}>
                      <td className={`px-6 py-4 text-sm font-bold whitespace-nowrap ${isDark ? 'text-purple-400' : 'text-[#6a00a3]'}`}>
                        {cert.code}
                      </td>
                      <td className={`px-6 py-4 text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {cert.student}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {cert.course}
                      </td>
                      <td className={`px-6 py-4 text-sm whitespace-nowrap ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {cert.issuedDate}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {cert.pdfUrl ? (
                          <a
                            href={cert.pdfUrl}
                            download={cert.pdfFileName || `Certificado_${cert.code}.pdf`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-green-600 hover:underline"
                          >
                            <Download className="w-4 h-4" />
                            {cert.pdfFileName || 'Descarregar PDF'}
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Sem PDF anexo</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {cert.status === 'valid' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 rounded-full text-xs font-bold">
                            <CheckCircle className="w-3 h-3" />
                            Válido
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 rounded-full text-xs font-bold">
                            Revogado
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(cert)}
                            className={`p-2 rounded-lg ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
                            aria-label="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(cert.id)}
                            className={`p-2 rounded-lg ${isDark ? 'bg-red-900/40 hover:bg-red-900/60 text-red-300' : 'bg-red-100 hover:bg-red-200 text-red-600'}`}
                            aria-label="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCertificates;
