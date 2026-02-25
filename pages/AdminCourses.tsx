import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ArrowLeft, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { loadData, saveDataAdmin } from '../lib/dataSync';
import { Course, defaultCourses } from '../lib/courseCatalogData';

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

  useEffect(() => {
    loadData('courses', 'ilungi_courses_data', defaultCourses).then((data) => {
      setCourses(data);
    });
  }, []);

  const saveToStorage = (newData: Course[]) => {
    setCourses(newData);
    saveDataAdmin('courses', 'ilungi_courses_data', newData);
  };

  const handleSave = () => {
    if (editingId) {
      saveToStorage(courses.map((course) => (course.id === editingId ? formData : course)));
      setEditingId(null);
    } else if (isAdding) {
      saveToStorage([...courses, { ...formData, id: `course-${Date.now()}` }]);
      setIsAdding(false);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm(isPt ? 'Tem certeza que deseja excluir?' : 'Are you sure?')) {
      saveToStorage(courses.filter((course) => course.id !== id));
    }
  };

  const handleEdit = (course: Course) => {
    setFormData(course);
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
              <GraduationCap className="w-8 h-8 text-[#6a00a3]" />
              {isPt ? 'Gerir Cursos' : 'Manage Courses'}
            </h1>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center px-6 py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d] transition-all shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            {isPt ? 'Novo Curso' : 'New Course'}
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
              {editingId ? (isPt ? 'Editar Curso' : 'Edit Course') : (isPt ? 'Adicionar Curso' : 'Add Course')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Código</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="CC-001"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Nome do Curso</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Especialidade / Área</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Carga Horária</label>
                <input
                  type="text"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Ex: 24h"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Modalidade</label>
                <input
                  type="text"
                  value={formData.modality}
                  onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="Presencial / Online"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Agenda</label>
                <input
                  type="text"
                  value={formData.agenda}
                  onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="On-demand ou data"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8 pt-6">
              <button
                onClick={resetForm}
                className={`px-6 py-3 rounded-xl font-bold ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-700'}`}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700"
              >
                Salvar
              </button>
            </div>
          </motion.div>
        )}

        <div className={`rounded-3xl overflow-hidden shadow-xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-white'}`}>
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                <tr className="text-left text-sm font-bold">
                  <th className="px-6 py-4">Código</th>
                  <th className="px-6 py-4">Nome do Curso</th>
                  <th className="px-6 py-4">Especialidade / Área</th>
                  <th className="px-6 py-4">Carga Horária</th>
                  <th className="px-6 py-4">Modalidade</th>
                  <th className="px-6 py-4">Agenda</th>
                  <th className="px-6 py-4">Ações</th>
                </tr>
              </thead>
              <tbody className={isDark ? 'divide-y divide-slate-700' : 'divide-y divide-slate-100'}>
                {courses.map((course) => (
                  <tr key={course.id} className={isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50/70'}>
                    <td className={`px-6 py-4 text-sm font-semibold whitespace-nowrap ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
                      {course.code}
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {course.name}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{course.area}</td>
                    <td className={`px-6 py-4 text-sm whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{course.hours}</td>
                    <td className={`px-6 py-4 text-sm whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{course.modality}</td>
                    <td className={`px-6 py-4 text-sm whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{course.agenda}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className={`p-2 rounded-lg ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
                          aria-label="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className={`p-2 rounded-lg ${isDark ? 'bg-red-900/40 hover:bg-red-900/60 text-red-300' : 'bg-red-100 hover:bg-red-200 text-red-600'}`}
                          aria-label="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
