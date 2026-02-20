import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, ArrowLeft, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { loadData, saveDataAdmin } from '../lib/dataSync';

interface PartnerForm {
  id: string;
  name: string;
  url: string;
  desc: { pt: string; en: string };
  logo: string;
  color: string;
}

const defaultPartners = [
  { id: 'p1', name: "GPMOi", url: "https://gpmoi.org/", desc: { pt: "Especialistas em Governança de Projectos.", en: "Specialists in Project Governance." }, logo: "/imagens/GPMoi.png", color: "#6a00a3" },
  { id: 'p2', name: "CFC Institute", url: "https://cfc-institute.org/", desc: { pt: "Líder em certificação financeira.", en: "Leader in financial certification." }, logo: "/imagens/CFC-institute.png", color: "#0A4D8C" },
  { id: 'p3', name: "Universal Certification and Services", url: "https://unicertservices.com/", desc: { pt: "Serviços de conformidade internacional.", en: "International compliance services." }, logo: "/imagens/UCS.png", color: "#6c0606" },
  { id: 'p4', name: "Nova Select", url: "https://novaselect.co/index.html", desc: { pt: "Design bem elaborado e criatividade.", en: "Thoughtful design and creativity." }, logo: "/imagens/Nova Select.png", color: "#f06d16" },
  { id: 'p5', name: "Ixi Ambiental", url: "https://www.ixiambiental.co.ao/", desc: { pt: "Sustentabilidade em Angola.", en: "Sustainability in Angola." }, logo: "/imagens/Ixi Ambiental.png", color: "#2E7D5E" }
];

const AdminPartners: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';
  
  const [partners, setPartners] = useState<PartnerForm[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<PartnerForm>({
    id: '', name: '', url: '', desc: { pt: '', en: '' }, logo: '', color: '#6a00a3'
  });

  useEffect(() => {
    loadData('partners', 'ilungi_partners_data', defaultPartners).then(data => {
      setPartners(data);
    });
  }, []);

  const saveToStorage = (newData: PartnerForm[]) => {
    setPartners(newData);
    saveDataAdmin('partners', 'ilungi_partners_data', newData);
  };

  const handleSave = () => {
    if (editingId) {
      saveToStorage(partners.map(p => p.id === editingId ? formData : p));
      setEditingId(null);
    } else if (isAdding) {
      saveToStorage([...partners, { ...formData, id: `part-${Date.now()}` }]);
      setIsAdding(false);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm(isPt ? 'Tem certeza que deseja excluir?' : 'Are you sure?')) {
      saveToStorage(partners.filter(p => p.id !== id));
    }
  };

  const handleEdit = (p: PartnerForm) => {
    setFormData(p);
    setEditingId(p.id);
    setIsAdding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ id: '', name: '', url: '', desc: { pt: '', en: '' }, logo: '', color: '#6a00a3' });
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ id: '', name: '', url: '', desc: { pt: '', en: '' }, logo: '', color: '#6a00a3' });
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
              <Building className="w-8 h-8 text-orange-500" />
              {isPt ? 'Gerir Parceiros' : 'Manage Partners'}
            </h1>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            {isPt ? 'Novo Parceiro' : 'New Partner'}
          </button>
        </div>

        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl p-8 mb-12 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
          >
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {editingId ? <Edit className="w-5 h-5 text-orange-500" /> : <Plus className="w-5 h-5 text-orange-500" />}
              {editingId ? (isPt ? 'Editar Parceiro' : 'Edit Partner') : (isPt ? 'Adicionar Parceiro' : 'Add Partner')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Url</label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Logo (URL)</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Cor (Hex)</label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full h-12 rounded-xl cursor-pointer"
                />
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Descrição (PT)</label>
                  <textarea
                    value={formData.desc.pt}
                    onChange={(e) => setFormData({ ...formData, desc: { ...formData.desc, pt: e.target.value } })}
                    rows={2}
                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Description (EN)</label>
                  <textarea
                    value={formData.desc.en}
                    onChange={(e) => setFormData({ ...formData, desc: { ...formData.desc, en: e.target.value } })}
                    rows={2}
                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg border border-slate-200 relative group text-center`}
              style={{ borderBottom: `4px solid ${p.color}` }}
            >
              <div className="h-20 mb-4 flex justify-center items-center">
                <img src={p.logo} alt={p.name} className="h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2">{p.name}</h3>
              
              <div className="flex gap-2 justify-center mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 text-slate-800"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
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

export default AdminPartners;
