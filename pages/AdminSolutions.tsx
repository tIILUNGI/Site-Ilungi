import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, ArrowLeft, PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { loadData, saveDataAdmin } from '../lib/dataSync';

interface SolutionForm {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  image: string;
  path?: string;
  url?: string;
  color: string;
  bgColor: string;
}

const defaultProducts = [
  {
    id: 's1',
    name: "Salya",
    tagline: "Gestão de Salários & RH",
    desc: "Plataforma para gestão e emissão de recibos de salário e controle completo de recursos humanos. Automatização de folhas de pagamento, benefícios e compliance trabalhista.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    path: "/solucoes/salya",
    color: "from-[#1B3C2B] to-[#2E7D5E]",
    bgColor: "bg-[#1B3C2B]"
  },
  {
    id: 's2',
    name: "SICLIC",
    tagline: "Inteligência de Compliance",
    desc: "Sistema inteligente para gestão de compliance legal, contratual e normativo em tempo real. Monitoramento contínuo de obrigações legais e normativas.",
    image: "/imagens/SICLIC.png",
    url: "https://siclic.ao/",
    color: "from-[#6a00a3] to-[#8000c4]",
    bgColor: "bg-[#6a00a3]"
  },
  {
    id: 's3',
    name: "Tocomply360",
    tagline: "Framework de Governança",
    desc: "Solução 360 graus para governança corporativa, integrando ética, risco e transparência. Framework completo para gestão de compliance e integridade.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    path: "/solucoes/tocomply",
    color: "from-slate-700 to-slate-900",
    bgColor: "bg-slate-800"
  }
];

const AdminSolutions: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';
  
  const [solutions, setSolutions] = useState<SolutionForm[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<SolutionForm>({
    id: '', name: '', tagline: '', desc: '', image: '', path: '', url: '', color: 'from-[#1B3C2B] to-[#2E7D5E]', bgColor: 'bg-[#1B3C2B]'
  });

  // Carregar as solucções guardadas ou defaut
  useEffect(() => {
    loadData('solutions', 'ilungi_solutions_data', defaultProducts).then(data => {
      setSolutions(data);
    });
  }, []);

  const saveToStorage = (newData: SolutionForm[]) => {
    setSolutions(newData);
    saveDataAdmin('solutions', 'ilungi_solutions_data', newData);
  };

  const handleSave = () => {
    if (editingId) {
      saveToStorage(solutions.map(sol => sol.id === editingId ? formData : sol));
      setEditingId(null);
    } else if (isAdding) {
      saveToStorage([...solutions, { ...formData, id: `sol-${Date.now()}` }]);
      setIsAdding(false);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm(isPt ? 'Tem certeza que deseja excluir esta solução?' : 'Are you sure you want to delete this solution?')) {
      saveToStorage(solutions.filter(sol => sol.id !== id));
    }
  };

  const handleEdit = (sol: SolutionForm) => {
    setFormData(sol);
    setEditingId(sol.id);
    setIsAdding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      id: '', name: '', tagline: '', desc: '', image: '', path: '', url: '', color: 'from-[#1B3C2B] to-[#2E7D5E]', bgColor: 'bg-[#1B3C2B]'
    });
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      id: '', name: '', tagline: '', desc: '', image: '', path: '', url: '', color: 'from-[#1B3C2B] to-[#2E7D5E]', bgColor: 'bg-[#1B3C2B]'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/admin" className={`inline-flex items-center text-sm font-bold mb-4 hover:underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#1B3C2B]'}`}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              {isPt ? 'Voltar ao Painel' : 'Back to Dashboard'}
            </Link>
            <h1 className={`text-3xl font-black mb-2 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <PackageSearch className="w-8 h-8 text-[#6a00a3]" />
              {isPt ? 'Gerir Soluções (SaaS)' : 'Manage Solutions (SaaS)'}
            </h1>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              {isPt ? 'Adicione, edite ou remova os produtos da empresa' : 'Add, edit or remove company products'}
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center px-6 py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#8000c4] transition-all shadow-lg hover:shadow-xl w-fit"
          >
            <Plus className="w-5 h-5 mr-2" />
            {isPt ? 'Nova Solução' : 'New Solution'}
          </button>
        </div>

        {/* Formulario */}
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl p-8 mb-12 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl border border-slate-100 dark:border-slate-700`}
          >
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {editingId ? <Edit className="w-5 h-5 text-[#6a00a3]" /> : <Plus className="w-5 h-5 text-[#6a00a3]" />}
              {editingId ? (isPt ? 'Editar Solução' : 'Edit Solution') : (isPt ? 'Criar Nova Solução' : 'Create New Solution')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Nome do Produto' : 'Product Name'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 focus:border-[#6a00a3] focus:ring-1 focus:ring-[#6a00a3] outline-none outline-none'}`}
                  placeholder="Ex: Salya"
                />
              </div>

              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Tagline (Slogan curto)' : 'Tagline (Short Slogan)'}
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 outline-none'}`}
                  placeholder="Ex: Gestão de RH"
                />
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Descrição Completa' : 'Full Description'}
                </label>
                <textarea
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 outline-none'}`}
                  placeholder="Descrição da solução..."
                />
              </div>

              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Imagem (URL)' : 'Image (URL)'}
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 outline-none'}`}
                  placeholder="/imagens/app.png ou https://..."
                />
              </div>

              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Caminho Interno (Opcional)' : 'Internal Path (Optional)'}
                </label>
                <input
                  type="text"
                  value={formData.path || ''}
                  onChange={(e) => setFormData({ ...formData, path: e.target.value, url: '' })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 outline-none'}`}
                  placeholder="Ex: /solucoes/nova-demo"
                />
              </div>

              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Link Externo (Se não tiver Demo)' : 'External Link (If no Demo)'}
                </label>
                <input
                  type="text"
                  value={formData.url || ''}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value, path: '' })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 outline-none'}`}
                  placeholder="https://exemplo.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isPt ? 'Tema de Cor Principal' : 'Main Color Theme'}
                </label>
                <select
                  value={formData.color}
                  onChange={(e) => {
                    const val = e.target.value;
                    let bg = 'bg-[#1B3C2B]';
                    if (val.includes('#6a00a3')) bg = 'bg-[#6a00a3]';
                    if (val.includes('slate-700')) bg = 'bg-slate-800';
                    if (val.includes('blue-600')) bg = 'bg-blue-600';
                    setFormData({ ...formData, color: val, bgColor: bg });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 outline-none'}`}
                >
                  <option value="from-[#1B3C2B] to-[#2E7D5E]">Verde Corporativo (ILUNGI)</option>
                  <option value="from-[#6a00a3] to-[#8000c4]">Roxo Corporativo</option>
                  <option value="from-slate-700 to-slate-900">Escuro (Dark/Slate)</option>
                  <option value="from-blue-600 to-blue-800">Azul Clássico</option>
                </select>
              </div>

            </div>
            
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={resetForm}
                className="flex items-center px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-all shadow-sm"
              >
                <X className="w-5 h-5 mr-2" />
                {isPt ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Save className="w-5 h-5 mr-2" />
                {isPt ? 'Salvar Edição' : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Lista Existente */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, i) => (
            <motion.div 
              key={sol.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border hover:shadow-2xl transition-all duration-500`}
            >
              <div className="absolute -inset-0.5 bg-slate-200 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative h-56 overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="absolute inset-0 z-5 opacity-20 mix-blend-overlay">
                  <svg width="100%" height="100%">
                    <pattern id={`circuit-${i}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M10 10 L30 10 M40 20 L20 20 M30 30 L10 30" stroke="white" strokeWidth="0.3" fill="none"/>
                      <circle cx="15" cy="15" r="1" fill="white"/>
                      <circle cx="35" cy="25" r="1" fill="white"/>
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#circuit-${i})`}/>
                  </svg>
                </div>
                
                <motion.img 
                  src={sol.image} 
                  alt={sol.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Ações de Edição sobre a imagem - MODO ADMIN */}
                <div className="absolute top-4 right-4 flex gap-2 z-30">
                  <button
                    onClick={() => handleEdit(sol)}
                    className="p-3 bg-white/90 backdrop-blur-md rounded-xl hover:bg-white text-slate-800 transition-all shadow-xl hover:scale-110"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(sol.id)}
                    className="p-3 bg-red-500/90 backdrop-blur-md rounded-xl hover:bg-red-500 text-white transition-all shadow-xl hover:scale-110"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <motion.div className="absolute top-6 left-6 z-20" whileHover={{ scale: 1.05 }}>
                  <div className={`bg-gradient-to-r ${sol.color || 'from-[#1B3C2B] to-[#2E7D5E]'} px-5 py-2.5 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm`}>
                    <span className="text-white font-black text-xl">{sol.name}</span>
                  </div>
                </motion.div>

                <motion.div className="absolute bottom-6 left-6 z-20" whileHover={{ y: -3 }}>
                  <span className="text-xs px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium inline-block border border-white/30 shadow-lg">
                    {sol.tagline}
                  </span>
                </motion.div>
              </div>

              <div className={`p-8 ${isDark ? 'bg-slate-800' : 'bg-white'} relative`}>
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
                
                <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-800'} mb-3`}>
                  {sol.name}
                </h3>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} leading-relaxed mb-6 text-sm line-clamp-3`}>
                  {sol.desc}
                </p>
              </div>

              <motion.div 
                className="absolute bottom-0 left-0 h-2 bg-gradient-to-r"
                style={{ backgroundImage: `linear-gradient(to right, ${sol.bgColor?.replace('bg-', '') || '#1B3C2B'}, #6a00a3, ${sol.bgColor?.replace('bg-', '') || '#1B3C2B'})` }}
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>

        {solutions.length === 0 && (
          <div className={`text-center py-16 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <PackageSearch className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">{isPt ? 'Nenhuma solução adicionada. Clique em "Nova Solução" para começar.' : 'No solutions added yet.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSolutions;
