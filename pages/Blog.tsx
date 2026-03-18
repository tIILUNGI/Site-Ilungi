import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Tag, Clock, TrendingUp, PlayCircle } from 'lucide-react';
import { useAppContext } from '../App';
import { loadData } from '../lib/dataSync';
import { BlogPost, getDefaultBlogPosts, internetImages } from '../lib/blogData';

const Blog: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';
  
  const defaultPosts: BlogPost[] = getDefaultBlogPosts(isPt);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['all', 'ILUNGI', 'RFID', 'Gestão de Stocks', 'Consultoria ISO', 'Gestão de Projetos', 'Compliance', 'Formação', 'Tecnologia', 'Gestão de Riscos'];

  const getLocalized = (val: any) => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') {
      return val[lang] || val.pt || val.en || '';
    }
    return '';
  };

  useEffect(() => {
    loadData('blog_posts', 'ilungi_blog_data', defaultPosts).then(data => {
      const published = data.filter((p: BlogPost) => p.status === 'published');
      const allPosts = [...published];
      defaultPosts.forEach(defaultPost => {
        if (!allPosts.find(p => p.id === defaultPost.id)) {
          allPosts.push(defaultPost);
        }
      });
      setPosts(allPosts);
    });
  }, []);

  const filteredPosts = posts.filter(post => {
    const titleMatch = getLocalized(post.title).toLowerCase().includes(searchTerm.toLowerCase());
    const excerptMatch = getLocalized(post.excerpt).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || excerptMatch;
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);
  const olderPosts = posts.slice(4);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isPt ? date.toLocaleDateString('pt-AO', { day: '2-digit', month: 'long', year: 'numeric' }) 
               : date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  // Single post view
  if (selectedPost) {
    return (
      <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-4xl mx-auto px-4">
          <button 
            onClick={() => setSelectedPost(null)}
            className={`inline-flex items-center gap-2 mb-6 font-bold transition-colors ${isDark ? 'text-[#6a00a3] hover:text-[#520b7d]' : 'text-[#6a00a3] hover:text-[#520b7d]'}`}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            {isPt ? 'Voltar ao Blog' : 'Back to Blog'}
          </button>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
          >
            {selectedPost.image && (
              <div className="h-64 md:h-96 overflow-hidden">
                <img 
                  src={selectedPost.image} 
                  alt={getLocalized(selectedPost.title)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${isDark ? 'bg-[#6a00a3]/20 text-[#6a00a3]' : 'bg-[#6a00a3]/10 text-[#6a00a3]'}`}>
                  {selectedPost.category}
                </span>
                <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedPost.date)}
                </div>
                <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <User className="w-4 h-4" />
                  {selectedPost.author}
                </div>
              </div>

              <h1 className={`text-3xl md:text-4xl font-black mb-6 leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {getLocalized(selectedPost.title)}
              </h1>

              <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {getLocalized(selectedPost.excerpt)}
                </p>
                {selectedPost.content && (
                  <div className={`mt-8 whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {getLocalized(selectedPost.content)}
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    );
  }

  // Blog listing view - Show ALL posts when "all" is selected
  const displayPosts = selectedCategory === 'all' && !searchTerm ? posts : filteredPosts;

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header Style Newspaper */}
      <div className={`border-b-4 border-[#6a00a3] ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-[#6a00a3] rounded-full"></div>
              <div className="w-3 h-3 bg-[#6a00a3] rounded-full"></div>
              <div className="w-3 h-3 bg-[#6a00a3] rounded-full"></div>
            </div>
            <h1 className={`text-5xl md:text-6xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className="text-[#6a00a3]">ILUNGI</span> HUB
            </h1>
            
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Featured Articles - Banner Carousel */}
        {featuredPost && selectedCategory === 'all' && !searchTerm && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            {/* Banner visual only - not clickable */}
            <div className="rounded-3xl overflow-hidden relative h-[500px] shadow-2xl">
              {/* Background Image */}
              <img 
                src={featuredPost.image || internetImages.default} 
                alt={getLocalized(featuredPost.title)}
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#6a00a3] text-white">
                    {featuredPost.category}
                  </span>
                  <span className="text-white/70 text-sm">
                    {formatDate(featuredPost.date)}
                  </span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-black mb-4 leading-tight text-white">
                  {getLocalized(featuredPost.title)}
                </h2>
                
                <p className="text-base mb-6 text-white/80 max-w-2xl">
                  {getLocalized(featuredPost.excerpt)}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <div className="w-8 h-8 rounded-full bg-[#6a00a3]/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-[#6a00a3]" />
                  </div>
                  {featuredPost.author}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Recent Articles - Sidebar Style */}
        {recentPosts.length > 0 && selectedCategory === 'all' && !searchTerm && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <PlayCircle className="w-5 h-5 text-[#6a00a3]" />
              <span className="text-[#6a00a3] font-bold uppercase tracking-wider text-sm">
                {isPt ? 'Mais recentes' : 'Most recent'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPost(post)}
                  className={`group cursor-pointer rounded-xl overflow-hidden ${isDark ? 'bg-slate-800 hover:bg-slate-750' : 'bg-white hover:bg-slate-50'} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={post.image || internetImages.default} 
                      alt={getLocalized(post.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded text-xs font-bold bg-[#6a00a3] text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className={`text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#6a00a3] transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {getLocalized(post.title)}
                    </h3>
                    
                    <div className={`flex items-center justify-between text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {isPt ? '5 min' : '5 min'}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-6 mb-12 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isPt ? 'Pesquisar artigos...' : 'Search articles...'}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-[#6a00a3]`}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === cat 
                      ? 'bg-[#6a00a3] text-white' 
                      : isDark 
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? (isPt ? 'Todos' : 'All') : cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* All Articles Grid */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-5 h-5 text-[#6a00a3]" />
            <span className="text-[#6a00a3] font-bold uppercase tracking-wider text-sm">
              {selectedCategory === 'all' && !searchTerm 
                ? (isPt ? 'Todos os artigos' : 'All articles') 
                : (isPt ? `Artigos de ${selectedCategory}` : `Articles in ${selectedCategory}`)}
            </span>
            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              ({displayPosts.length} {isPt ? 'artigos' : 'articles'})
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedPost(post)}
                className={`group cursor-pointer rounded-xl overflow-hidden ${isDark ? 'bg-slate-800 hover:bg-slate-750' : 'bg-white hover:bg-slate-50'} shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={post.image || internetImages.default} 
                    alt={getLocalized(post.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded text-xs font-bold bg-[#6a00a3]/90 text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className={`text-base font-bold mb-2 line-clamp-2 group-hover:text-[#6a00a3] transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {getLocalized(post.title)}
                  </h3>
                  
                  <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {getLocalized(post.excerpt)}
                  </p>

                  <div className={`flex items-center justify-between text-xs pt-3 border-t ${isDark ? 'border-slate-700 text-slate-500' : 'border-slate-100 text-slate-400'}`}>
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1 text-[#6a00a3] font-medium">
                      {isPt ? 'Ler mais' : 'Read more'}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {displayPosts.length === 0 && (
            <div className="text-center py-16">
              <div className={`text-6xl mb-4 ${isDark ? 'text-slate-700' : 'text-slate-200'}`}>
                <Tag className="w-24 h-24 mx-auto" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {isPt ? 'Nenhum artigo encontrado' : 'No articles found'}
              </h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                {isPt 
                  ? 'Tente ajustar os filtros ou pesquisar por outro termo.' 
                  : 'Try adjusting your filters or search for another term.'}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Blog;
