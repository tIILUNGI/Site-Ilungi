import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Tag, Clock, TrendingUp, PlayCircle, Volume2, VolumeX, Play, Filter, X } from 'lucide-react';
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
  
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const featuredVideoPost = posts.find(p => p.video);
  const otherPosts = posts.filter(p => p.id !== featuredVideoPost?.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isPt ? date.toLocaleDateString('pt-AO', { day: '2-digit', month: 'long', year: 'numeric' }) 
               : date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  // Single post view
  if (selectedPost) {
    return (
      <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
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
            className={`rounded-[3rem] overflow-hidden ${isDark ? 'bg-slate-900 border border-white/5 shadow-2xl' : 'bg-white border border-slate-200 shadow-xl'}`}
          >
            {selectedPost.video ? (
              <div className="aspect-video w-full bg-black relative">
                <video 
                  src={selectedPost.video} 
                  controls 
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            ) : selectedPost.image && (
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
                <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-[#6a00a3]/10 text-[#6a00a3] border border-[#6a00a3]/20 uppercase tracking-widest">
                  {selectedPost.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <User className="w-4 h-4" />
                  {selectedPost.author}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                {getLocalized(selectedPost.title)}
              </h1>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-xl leading-relaxed mb-8 font-medium text-slate-700 dark:text-slate-300">
                  {getLocalized(selectedPost.excerpt)}
                </p>
                {selectedPost.content && (
                  <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-slate-600 dark:text-slate-400">
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

  return (
    <div className={`min-h-screen pt-24 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Newspaper Style Header */}
      <div className={`border-b-4 border-[#6a00a3] ${isDark ? 'bg-slate-900' : 'bg-white'} mb-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
          <h1 className={`text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <span className="text-[#6a00a3]">ILUNGI</span> HUB
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-[0.25em] sm:tracking-[0.4em]">Knowledge Center</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Featured Video Section - Highlighted before explore */}
        {featuredVideoPost && selectedCategory === 'all' && !searchTerm && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <PlayCircle className="w-6 h-6 text-[#6a00a3]" />
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                {isPt ? 'Destaque em Vídeo' : 'Video Highlight'}
              </h2>
            </div>
            
            <div className={`group relative rounded-[3rem] overflow-hidden border ${isDark ? 'bg-slate-900 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'} flex flex-col lg:flex-row h-auto lg:h-[450px]`}>
              <div className="lg:w-3/5 relative bg-black">
                <video 
                  src={featuredVideoPost.video} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
              </div>
              <div className="lg:w-2/5 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-lg text-[10px] font-black bg-[#6a00a3]/10 text-[#6a00a3] uppercase tracking-widest mb-4 w-fit">
                  {featuredVideoPost.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 leading-tight group-hover:text-[#6a00a3] transition-colors cursor-pointer" onClick={() => setSelectedPost(featuredVideoPost)}>
                  {getLocalized(featuredVideoPost.title)}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                  {getLocalized(featuredVideoPost.excerpt)}
                </p>
                <button 
                  onClick={() => setSelectedPost(featuredVideoPost)}
                  className="w-fit flex items-center gap-3 text-[#6a00a3] font-black group/btn"
                >
                  {isPt ? 'VER AGORA' : 'WATCH NOW'}
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* Search and Filters */}
        <div className={`p-6 rounded-[2rem] mb-12 flex flex-col md:flex-row items-stretch md:items-center gap-4 ${isDark ? 'bg-slate-900 border border-white/5' : 'bg-white border border-slate-200'} shadow-xl`}>
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isPt ? "Pesquisar artigos..." : "Search articles..."}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-white/5 rounded-xl border-none outline-none font-bold"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${selectedCategory === cat ? 'bg-[#6a00a3] text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200'}`}
              >
                {cat === 'all' ? (isPt ? 'Tudo' : 'All') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        <section className="pb-32">
          <div className="flex items-center gap-3 mb-10">
            <TrendingUp className="w-6 h-6 text-[#6a00a3]" />
            <h2 className="text-3xl font-black uppercase tracking-tighter">
              {isPt ? 'Explorar Conteúdo' : 'Explore Content'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.filter(p => p.id !== featuredVideoPost?.id).map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer"
              >
                <div className="h-64 rounded-[2rem] overflow-hidden relative mb-6 shadow-lg border border-transparent group-hover:border-[#6a00a3]/20 transition-all">
                  <img 
                    src={post.image || internetImages.default} 
                    alt={getLocalized(post.title)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-[#6a00a3] text-white uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </div>
                  <h3 className="text-xl font-black mb-3 line-clamp-2 leading-tight group-hover:text-[#6a00a3] transition-colors">
                    {getLocalized(post.title)}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
                    {getLocalized(post.excerpt)}
                  </p>
                  <span className="text-xs font-black text-[#6a00a3] flex items-center gap-2 group-hover:gap-3 transition-all">
                    {isPt ? 'LER MAIS' : 'READ MORE'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
