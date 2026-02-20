import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, ArrowLeft, FileText, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { loadData, saveDataAdmin } from '../lib/dataSync';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  status: 'published' | 'draft';
}

const AdminBlog: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';
  
  const defaultPosts: BlogPost[] = [
    {
      id: 'blog-1',
      title: isPt ? 'A Importância do Compliance em Angola' : 'The Importance of Compliance in Angola',
      excerpt: isPt ? 'Descubra como as novas normas estão a mudar o panorama empresarial.' : 'Discover how new standards are changing the corporate landscape.',
      content: 'Conteúdo completo do artigo virá aqui...',
      author: 'Equipa ILUNGI',
      date: new Date().toISOString().split('T')[0],
      category: 'Compliance',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80',
      status: 'published'
    }
  ];

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<BlogPost>({
    id: '', title: '', excerpt: '', content: '', author: 'Equipa ILUNGI', date: new Date().toISOString().split('T')[0], category: 'Geral', image: '', status: 'draft'
  });

  useEffect(() => {
    loadData('blog_posts', 'ilungi_blog_data', defaultPosts).then(data => {
      setPosts(data);
    });
  }, []);

  const saveToStorage = (newData: BlogPost[]) => {
    setPosts(newData);
    saveDataAdmin('blog_posts', 'ilungi_blog_data', newData);
  };

  const handleSave = () => {
    if (editingId) {
      saveToStorage(posts.map(p => p.id === editingId ? formData : p));
      setEditingId(null);
    } else if (isAdding) {
      saveToStorage([...posts, { ...formData, id: `blog-${Date.now()}` }]);
      setIsAdding(false);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm(isPt ? 'Tem certeza que deseja excluir esta publicação?' : 'Are you sure you want to delete this post?')) {
      saveToStorage(posts.filter(p => p.id !== id));
    }
  };

  const handleEdit = (p: BlogPost) => {
    setFormData(p);
    setEditingId(p.id);
    setIsAdding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      id: '', title: '', excerpt: '', content: '', author: 'Equipa ILUNGI', date: new Date().toISOString().split('T')[0], category: 'Geral', image: '', status: 'draft'
    });
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      id: '', title: '', excerpt: '', content: '', author: 'Equipa ILUNGI', date: new Date().toISOString().split('T')[0], category: 'Geral', image: '', status: 'draft'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['Geral', 'Compliance', 'Tecnologia', 'Sustentabilidade', 'Gestão', 'ISO'];

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
              <FileText className="w-8 h-8 text-teal-500" />
              {isPt ? 'Artigos do Blog' : 'Blog Articles'}
            </h1>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center px-6 py-3 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-600 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            {isPt ? 'Novo Artigo' : 'New Article'}
          </button>
        </div>

        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl p-8 mb-12 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
          >
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {editingId ? <Edit className="w-5 h-5 text-teal-500" /> : <Plus className="w-5 h-5 text-teal-500" />}
              {editingId ? (isPt ? 'Editar Artigo' : 'Edit Article') : (isPt ? 'Escrever Artigo' : 'Write Article')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Título do Artigo</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'} text-lg font-medium`}
                  placeholder={isPt ? "Título chamativo..." : "Catchy title..."}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Resumo (Excerto)</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder={isPt ? "Pequeno parágrafo de introdução..." : "Short intro paragraph..."}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Categoria</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Autor</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Data de Publicação</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                >
                  <option value="published">Publicado</option>
                  <option value="draft">Rascunho</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Imagem de Capa (URL)</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className={`flex-1 px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'}`}
                    placeholder="https://..."
                  />
                  {formData.image && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Conteúdo do Artigo (Markdown/HTML Simples)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200'} font-mono text-sm`}
                  placeholder="Escreva aqui..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 shadow-lg"
              >
                Salvar Artigo
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-lg border relative flex flex-col`}
            >
              <div className="h-48 overflow-hidden relative bg-slate-100">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${p.status === 'published' ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}`}>
                    {p.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-800 shadow-md">
                    {p.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-xl mb-2 line-clamp-2">{p.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-1">{p.excerpt}</p>
                
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span>{new Date(p.date).toLocaleDateString()}</span>
                  <span>{p.author}</span>
                </div>
                
                <div className="flex gap-2 justify-end">
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
              </div>
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Ainda não há publicações. Escreva o primeiro artigo!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
