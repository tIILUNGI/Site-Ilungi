import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, ArrowLeft, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { loadData, saveDataAdmin } from '../lib/dataSync';

interface ServiceForm {
  id: string;
  title: string;
  desc: string;
  image: string;
  path: string;
  color: string;
}

const AdminServices: React.FC = () => {
  const { lang, isDark, t } = useAppContext();
  const isPt = lang === 'pt';

  const defaultAreas = [
    { id: "iso", title: t.consultingAreas.iso.title, desc: t.consultingAreas.iso.desc, image: "/imagens/ISO.png", path: "/consultoria/iso", color: "#1B3C2B" },
    { id: "risk", title: t.consultingAreas.risk.title, desc: t.consultingAreas.risk.desc, image: "/imagens/Notação de Risco.jpg", path: "/consultoria/risco", color: "#6a00a3" },
    { id: "procurement", title: t.consultingAreas.procurement.title, desc: t.consultingAreas.procurement.desc, image: "/imagens/procurement.png", path: "/consultoria/procurement", color: "#0A4D8C" },
    { id: "pmo", title: t.consultingAreas.pmo.title, desc: t.consultingAreas.pmo.desc, image: "/imagens/Gestão de Projecto.jpg", path: "/consultoria/pmo", color: "#B31B1B" }
  ];
  
  const [services, setServices] = useState<ServiceForm[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<ServiceForm>({
    id: '', title: '', desc: '', image: '', path: '', color: '#1B3C2B'
  });

  useEffect(() => {
    loadData('services', 'ilungi_services_data', defaultAreas).then(data => {
      setServices(data);
    });
  }, [lang]);

  const saveToStorage = (newData: ServiceForm[]) => {
    setServices(newData);
    saveDataAdmin('services', 'ilungi_services_data', newData);
  };

  const handleSave = () => {
    if (editingId) {
      saveToStorage(services.map(s => s.id === editingId ? formData : s));
      setEditingId(null);
    } else if (isAdding) {
      saveToStorage([...services, { ...formData, id: `serv-${Date.now()}` }]);
      setIsAdding(false);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm(isPt ? 'Tem certeza que deseja excluir?' : 'Are you sure?')) {
      saveToStorage(services.filter(s => s.id !== id));
    }
  };

  const handleEdit = (s: ServiceForm) => {
    setFormData(s);
    setEditingId(s.id);
    setIsAdding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ id: '', title: '', desc: '', image: '', path: '', color: '#1B3C2B' });
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ id: '', title: '', desc: '', image: '', path: '', color: '#1B3C2B' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/admin" className={`inline-flex items-center text-sm font-bold mb-4 hover:underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#1B3C2B]'}`}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              {isPt ? 'Voltar ao Painel' : 'Back to Dashboard'}
            </Link>
            <h1 className={`text-3xl font-black mb-2 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <Briefcase className="w-8 h-8 text-[#1B3C2B]" />
              {isPt ? 'Gerir Serviços de Consultoria' : 'Manage Consulting Services'}
            </h1>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center px-6 py-3 bg-[#1B3C2B] text-white rounded-xl font-bold hover:bg-[#2E7D5E] transition-all shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            {isPt ? 'Novo Serviço' : 'New Service'}
          </button>
        </div>

        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl p-8 mb-12 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
          >
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {editingId ? <Edit className="w-5 h-5 text-[#1B3C2B]" /> : <Plus className="w-5 h-5 text-[#1B3C2B]" />}
              {editingId ? (isPt ? 'Editar Serviço' : 'Edit Service') : (isPt ? 'Adicionar Serviço' : 'Add Service')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Imagem (URL)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="/imagens/ISO.png"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Caminho / Rota</label>
                <input
                  type="text"
                  value={formData.path}
                  onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="/consultoria/risco"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Cor de Destaque (Hex)</label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full h-12 rounded-xl cursor-pointer"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Descrição Curta</label>
                <textarea
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  rows={2}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-8 pt-6">
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg border border-slate-200 relative group`}
              style={{ borderTop: `4px solid ${s.color}` }}
            >
              <h3 className="font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2">{s.desc}</p>
              
              <div className="flex gap-2 justify-end mt-4">
                <button
                  onClick={() => handleEdit(s)}
                  className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 text-slate-800"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-2 bg-red-100 rounded-lg hover:bg-red-200 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminServices;
