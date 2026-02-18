import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Upload, Building } from 'lucide-react';
import { useAppContext } from '../App';
import { translations } from '../translations';

interface ReferenceForm {
  id: string;
  name: string;
  logo: string;
  role: string;
  comment: string;
  person: string;
  service: string;
  description: string;
}

const AdminReferences: React.FC = () => {
  const { t, lang, isDark } = useAppContext();
  const isPt = lang === 'pt';
  
  const [references, setReferences] = useState<ReferenceForm[]>(
    (t.references?.clients || []).map((ref: any) => ({
      id: ref.id,
      name: ref.name,
      logo: ref.logo,
      role: ref.role,
      comment: ref.comment,
      person: ref.person,
      service: ref.service,
      description: ref.description || ''
    }))
  );
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<ReferenceForm>({
    id: '',
    name: '',
    logo: '',
    role: '',
    comment: '',
    person: '',
    service: 'iso',
    description: ''
  });

  const handleSave = () => {
    if (editingId) {
      setReferences(references.map(ref => ref.id === editingId ? formData : ref));
      setEditingId(null);
    } else if (isAdding) {
      setReferences([...references, { ...formData, id: `ref-${Date.now()}` }]);
      setIsAdding(false);
    }
    setFormData({
      id: '',
      name: '',
      logo: '',
      role: '',
      comment: '',
      person: '',
      service: 'iso',
      description: ''
    });
  };

  const handleDelete = (id: string) => {
    if (confirm(isPt ? 'Tem certeza que deseja excluir?' : 'Are you sure you want to delete?')) {
      setReferences(references.filter(ref => ref.id !== id));
    }
  };

  const handleEdit = (ref: ReferenceForm) => {
    setFormData(ref);
    setEditingId(ref.id);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      id: '',
      name: '',
      logo: '',
      role: '',
      comment: '',
      person: '',
      service: 'iso',
      description: ''
    });
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      id: '',
      name: '',
      logo: '',
      role: '',
      comment: '',
      person: '',
      service: 'iso',
      description: ''
    });
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {isPt ? 'Admin - Nossas Referências' : 'Admin - Our References'}
            </h1>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              {isPt ? 'Gerencie as referências de clientes' : 'Manage client references'}
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            {isPt ? 'Nova Referência' : 'New Reference'}
          </button>
        </div>

        {/* Form */}
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-6 mb-8 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
          >
            <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {editingId ? (isPt ? 'Editar Referência' : 'Edit Reference') : (isPt ? 'Nova Referência' : 'New Reference')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Nome da Empresa' : 'Company Name'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder={isPt ? 'Ex: Sonangol' : 'Ex: Sonangol'}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Logo (URL)' : 'Logo (URL)'}
                </label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="/imagens/logo.png"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Cargo/Posição' : 'Role/Position'}
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder={isPt ? 'Ex: Gerente de Qualidade' : 'Ex: Quality Manager'}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Nome da Pessoa' : 'Person Name'}
                </label>
                <input
                  type="text"
                  value={formData.person}
                  onChange={(e) => setFormData({ ...formData, person: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder={isPt ? 'Ex: João Miguel' : 'Ex: John Smith'}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Serviço' : 'Service'}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                >
                  <option value="iso">ISO</option>
                  <option value="risk">{isPt ? 'Gestão de Riscos' : 'Risk Management'}</option>
                  <option value="procurement">Procurement</option>
                  <option value="pmo">PMO</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Comentário/Testemunho' : 'Comment/Testimonial'}
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder={isPt ? 'Ex: Excelente trabalho...' : 'Ex: Excellent work...'}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Descrição do Serviço' : 'Service Description'}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder={isPt ? 'Descrição detalhada do serviço...' : 'Detailed service description...'}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCancel}
                className="flex items-center px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-all"
              >
                <X className="w-5 h-5 mr-2" />
                {isPt ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
              >
                <Save className="w-5 h-5 mr-2" />
                {isPt ? 'Salvar' : 'Save'}
              </button>
            </div>
          </motion.div>
        )}

        {/* References List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {references.map((ref) => (
            <motion.div
              key={ref.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg border border-slate-200 dark:border-slate-700`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  {ref.logo ? (
                    <img src={ref.logo} alt={ref.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <Building className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(ref)}
                    className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} transition-all`}
                  >
                    <Edit className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                  </button>
                  <button
                    onClick={() => handleDelete(ref.id)}
                    className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} transition-all`}
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
              
              <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {ref.name}
              </h3>
              <p className={`text-sm mb-3 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {ref.role}
              </p>
              <p className={`text-sm line-clamp-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                "{ref.comment}"
              </p>
            </motion.div>
          ))}
        </div>

        {references.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Building className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>{isPt ? 'Nenhuma referência encontrada' : 'No references found'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReferences;
