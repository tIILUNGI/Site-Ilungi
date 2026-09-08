import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ArrowLeft, GraduationCap, Search, Filter, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { endpoints } from '../lib/api';
import { loadData } from '../lib/dataSync';
import { Course, defaultCourses, filterCleanCCCourses, addDeletedCourseId, removeDeletedCourseId } from '../lib/courseCatalogData';

const emptyCourse: Course = {
  id: '',
  code: '',
  name: '',
  area: '',
  hours: '',
  modality: '',
  agenda: '',
};

const AdminCourses: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';

  const [courses, setCourses] = useState<Course[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Course>(emptyCourse);

  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');

  const COURSES_PER_PAGE = 25;
  const [currentPage, setCurrentPage] = useState(1);

  const getLocalized = (val: any) => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') {
      return val[lang] || val.pt || val.en || '';
    }
    return '';
  };

  const fetchCourses = async () => {
    const data = await loadData('courses', 'ilungi_courses_data', defaultCourses);
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, [lang]);

  const saveCoursesToStorage = (newCourses: Course[]) => {
    const clean = filterCleanCCCourses(newCourses);
    setCourses(clean);
    localStorage.setItem('ilungi_courses_data', JSON.stringify(clean));
    window.dispatchEvent(new Event('ilungi-courses-updated'));
  };

  const handleSave = async () => {
    const courseName = getLocalized(formData.name);
    const courseArea = getLocalized(formData.area);

    if (!courseName || !formData.code) {
      alert(isPt ? 'Por favor preencha o código e o nome do curso.' : 'Please enter course code and name.');
      return;
    }

    try {
      const courseId = editingId || `course-${Date.now()}`;
      const newCourse: Course = {
        id: courseId,
        code: formData.code.trim().toUpperCase(),
        name: courseName,
        area: courseArea || 'Geral',
        hours: getLocalized(formData.hours) || 'A definir',
        modality: getLocalized(formData.modality) || 'A definir',
        agenda: getLocalized(formData.agenda) || 'On-demand',
        enrollUrl: formData.enrollUrl || ''
      };

      removeDeletedCourseId(newCourse.code);
      if (newCourse.id) removeDeletedCourseId(newCourse.id);

      let updatedCourses: Course[];
      if (editingId) {
        updatedCourses = courses.map(c => c.id === editingId ? newCourse : c);
      } else {
        updatedCourses = [newCourse, ...courses];
      }

      saveCoursesToStorage(updatedCourses);

      const apiData = {
        title: { pt: courseName, en: courseName },
        name: { pt: courseName, en: courseName },
        code: newCourse.code,
        area: { pt: courseArea, en: courseArea },
        description: { pt: courseName, en: courseName },
        duration: getLocalized(newCourse.hours),
        hours: getLocalized(newCourse.hours),
        modality: { pt: getLocalized(newCourse.modality), en: getLocalized(newCourse.modality) },
        agenda: typeof newCourse.agenda === 'string' ? { pt: newCourse.agenda, en: newCourse.agenda } : newCourse.agenda,
        enrollUrl: newCourse.enrollUrl || '',
        level: 'intermediate',
        active: true,
        order: updatedCourses.length
      };

      if (editingId && !editingId.startsWith('course-')) {
        await endpoints.courses.update(editingId, apiData).catch(async (err) => {
          console.warn('[AdminCourses] Update failed, attempting create fallback...', err);
          await endpoints.courses.create(apiData).catch((createErr) => {
            console.error('[AdminCourses] Fallback create also failed:', createErr);
          });
        });
      } else {
        await endpoints.courses.create(apiData).catch((err) => {
          console.error('[AdminCourses] Failed to create course in remote API:', err);
        });
      }

      await fetchCourses();
      resetForm();
    } catch (error) {
      console.error('Failed to save course:', error);
      alert(isPt ? 'Erro ao salvar.' : 'Error saving.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(isPt ? 'Tem certeza que deseja excluir este curso?' : 'Are you sure you want to delete this course?')) {
      try {
        const target = courses.find(c => c.id === id);
        if (id) addDeletedCourseId(id);
        if (target?.code) addDeletedCourseId(target.code);

        const updatedCourses = courses.filter(c => c.id !== id);
        saveCoursesToStorage(updatedCourses);

        if (id) {
          let deleteSuccess = false;
          try {
            await endpoints.courses.delete(id);
            deleteSuccess = true;
          } catch (err) {
            console.warn('[AdminCourses] API HTTP DELETE failed/forbidden (403), falling back to PUT active:false...', err);
          }

          // Soft-delete on server via PUT active:false so it persists across all devices
          if (!deleteSuccess && target) {
            try {
              const apiData = {
                title: typeof target.name === 'string' ? { pt: target.name, en: target.name } : target.name,
                code: target.code,
                area: typeof target.area === 'string' ? { pt: target.area, en: target.area } : target.area,
                active: false
              };
              await endpoints.courses.update(id, apiData);
            } catch (err2) {
              console.warn('[AdminCourses] API soft-delete active:false also failed:', err2);
            }
          }
        }
        await fetchCourses();
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  };

  const handleEdit = (course: Course) => {
    setFormData({
      ...course,
      name: getLocalized(course.name),
      area: getLocalized(course.area),
      modality: getLocalized(course.modality),
      hours: getLocalized(course.hours),
      agenda: getLocalized(course.agenda)
    });
    setEditingId(course.id);
    setIsAdding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyCourse);
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData(emptyCourse);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lista de Áreas Únicas
  const areas = useMemo(() => {
    const uniqueAreas = Array.from(new Set(courses.map(c => getLocalized(c.area)).filter(Boolean)));
    return ['all', ...uniqueAreas];
  }, [courses, lang]);

  // Cursos Filtrados por Pesquisa e Área
  const filteredCourses = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return courses.filter(course => {
      const areaMatch = areaFilter === 'all' || getLocalized(course.area) === areaFilter;
      if (!areaMatch) return false;
      if (!term) return true;

      const name = getLocalized(course.name).toLowerCase();
      const code = course.code.toLowerCase();
      const area = getLocalized(course.area).toLowerCase();

      return name.includes(term) || code.includes(term) || area.includes(term);
    });
  }, [courses, searchTerm, areaFilter, lang]);

  // Paginação
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / COURSES_PER_PAGE));
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * COURSES_PER_PAGE;
    return filteredCourses.slice(start, start + COURSES_PER_PAGE);
  }, [filteredCourses, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, areaFilter]);

  return (
    <div className={`min-h-screen pt-28 pb-20 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/admin"
              className={`inline-flex items-center text-sm font-bold mb-3 hover:underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#1B3C2B]'}`}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {isPt ? 'Voltar ao Painel Admin' : 'Back to Admin Dashboard'}
            </Link>
            <h1 className={`text-3xl md:text-4xl font-black flex items-center gap-3 ${isDark ? 'text-white' : 'text-[#1B3C2B]'}`}>
              <GraduationCap className="w-8 h-8 text-[#6a00a3]" />
              {isPt ? 'Gerir Catálogo de Cursos' : 'Manage Course Catalog'}
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {isPt ? `Catálogo Oficial: ${courses.length} cursos cadastrados (CC-001 até CC-063)` : `Official Catalog: ${courses.length} courses registered (CC-001 to CC-063)`}
            </p>
          </div>

          <button
            onClick={handleAddNew}
            className="flex items-center justify-center px-6 py-3 bg-[#6a00a3] text-white rounded-full font-bold hover:bg-[#520b7d] transition-all shadow-lg text-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            {isPt ? 'Adicionar Curso' : 'Add Course'}
          </button>
        </div>

        {/* Formulário de Adicionar / Editar */}
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl p-6 md:p-8 mb-8 shadow-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}
          >
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {editingId ? <Edit className="w-5 h-5 text-[#6a00a3]" /> : <Plus className="w-5 h-5 text-[#6a00a3]" />}
              {editingId ? (isPt ? 'Editar Curso' : 'Edit Course') : (isPt ? 'Adicionar Novo Curso' : 'Add New Course')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Código *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Ex: CC-064"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Nome do Curso *</label>
                <input
                  type="text"
                  value={getLocalized(formData.name)}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Especialidade / Área</label>
                <input
                  type="text"
                  value={getLocalized(formData.area)}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Ex: Compliance & Antissuborno"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Carga Horária</label>
                <input
                  type="text"
                  value={getLocalized(formData.hours)}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Ex: 24h ou A definir"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Modalidade</label>
                <input
                  type="text"
                  value={getLocalized(formData.modality)}
                  onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Ex: Presencial / Online / Google Meet"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Agenda / Horário</label>
                <input
                  type="text"
                  value={getLocalized(formData.agenda)}
                  onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Ex: On-demand ou Datas específicas"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={resetForm}
                className={`px-6 py-3 rounded-xl font-bold text-sm ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-700'}`}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d] transition-all text-sm shadow-md"
              >
                {isPt ? 'Salvar Curso' : 'Save Course'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Content Box Identical to CourseCatalog.tsx */}
        <div className={`rounded-3xl shadow-xl border overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
          {/* Top Filter Bar */}
          <div className={`p-6 border-b ${isDark ? 'border-slate-700 bg-slate-800/80' : 'border-slate-100 bg-white'}`}>
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1">
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Pesquisar curso' : 'Search course'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={isPt ? 'Digite o nome, código ou área...' : 'Type name, code, or area...'}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all outline-none ${
                      isDark 
                        ? 'bg-slate-700 border-transparent text-white focus:border-[#6a00a3] focus:bg-slate-800' 
                        : 'bg-slate-50 border-transparent focus:border-[#6a00a3] focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="w-full md:w-64">
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Filtrar por área' : 'Filter by area'}
                </label>
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all outline-none ${
                    isDark 
                      ? 'bg-slate-700 border-transparent text-white focus:border-[#6a00a3]' 
                      : 'bg-slate-50 border-transparent focus:border-[#6a00a3]'
                  }`}
                >
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area === 'all' ? (isPt ? 'Todas as áreas' : 'All areas') : area}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead className={isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                <tr className="text-left text-sm font-bold">
                  <th className="px-6 py-4">{isPt ? 'Código' : 'Code'}</th>
                  <th className="px-6 py-4">{isPt ? 'Nome do Curso' : 'Course Name'}</th>
                  <th className="px-6 py-4">{isPt ? 'Especialidade / área' : 'Specialty / Area'}</th>
                  <th className="px-6 py-4">{isPt ? 'Carga Horária' : 'Hours'}</th>
                  <th className="px-6 py-4">{isPt ? 'Modalidade' : 'Format'}</th>
                  <th className="px-6 py-4">{isPt ? 'Agenda' : 'Schedule'}</th>
                  <th className="px-6 py-4 text-right">{isPt ? 'Ação' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-700' : 'divide-slate-100'}`}>
                {paginatedCourses.map((course) => (
                  <tr key={course.id} className={isDark ? 'hover:bg-slate-700/50 transition-colors' : 'hover:bg-slate-50/60 transition-colors'}>
                    <td className={`px-6 py-4 text-sm font-bold whitespace-nowrap ${isDark ? 'text-purple-400' : 'text-[#6a00a3]'}`}>
                      {getLocalized(course.code)}
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {getLocalized(course.name)}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {getLocalized(course.area)}
                    </td>
                    <td className={`px-6 py-4 text-sm whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {getLocalized(course.hours)}
                    </td>
                    <td className={`px-6 py-4 text-sm whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {getLocalized(course.modality)}
                    </td>
                    <td className={`px-6 py-4 text-sm whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {getLocalized(course.agenda)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className={`p-2 rounded-xl transition-all ${
                            isDark 
                              ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          }`}
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className={`p-2 rounded-xl transition-all ${
                            isDark 
                              ? 'bg-red-900/40 hover:bg-red-900/60 text-red-300' 
                              : 'bg-red-100 hover:bg-red-200 text-red-600'
                          }`}
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredCourses.length === 0 && (
              <div className="px-6 py-12 text-center text-slate-500 font-medium">
                {isPt ? 'Nenhum curso encontrado.' : 'No courses found.'}
              </div>
            )}
          </div>

          {/* Mobile View */}
          <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-700">
            {paginatedCourses.map((course) => (
              <div key={course.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-[#6a00a3] dark:text-purple-300 rounded-full text-xs font-black">
                    {course.code}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className={`p-2 rounded-lg ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-800'}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-2 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {getLocalized(course.name)}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <div>
                    <span className="font-semibold text-slate-400 block">{isPt ? 'Área:' : 'Area:'}</span>
                    {getLocalized(course.area)}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 block">{isPt ? 'Carga Horária:' : 'Duration:'}</span>
                    {getLocalized(course.hours)}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 block">{isPt ? 'Modalidade:' : 'Modality:'}</span>
                    {getLocalized(course.modality)}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 block">{isPt ? 'Agenda:' : 'Schedule:'}</span>
                    {getLocalized(course.agenda)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls identical to CourseCatalog.tsx */}
          {totalPages > 1 && (
            <div className={`flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t gap-4 ${isDark ? 'border-slate-700 bg-slate-800/80 text-slate-300' : 'border-slate-100 bg-slate-50 text-slate-500'}`}>
              <div className="text-sm font-medium">
                {isPt 
                  ? `Página ${currentPage} de ${totalPages} (${filteredCourses.length} cursos)` 
                  : `Page ${currentPage} of ${totalPages} (${filteredCourses.length} courses)`}
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: currentPage > 1 ? 1.05 : 1 }}
                  whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    currentPage === 1 
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                      : 'bg-[#6a00a3] text-white hover:bg-[#520b7d]'
                  }`}
                >
                  {isPt ? 'Anterior' : 'Previous'}
                </motion.button>

                <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                        currentPage === page
                          ? 'bg-[#6a00a3] text-white'
                          : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-white text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: currentPage < totalPages ? 1.05 : 1 }}
                  whileTap={{ scale: currentPage < totalPages ? 0.95 : 1 }}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    currentPage === totalPages 
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                      : 'bg-[#6a00a3] text-white hover:bg-[#520b7d]'
                  }`}
                >
                  {isPt ? 'Próximo' : 'Next'}
                </motion.button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminCourses;
