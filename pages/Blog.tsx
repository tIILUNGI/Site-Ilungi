import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Tag, Clock, TrendingUp, PlayCircle } from 'lucide-react';
import { useAppContext } from '../App';
import { loadData } from '../lib/dataSync';

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

const Blog: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';
  
  // Images from public/BLOG folder
  const blogImages: { [key: string]: string } = {
    ilungi: '/BLOG/Dia da mulher Angolana.jpeg',
    rfid: '/BLOG/Modernização RFID.jpeg',
    stock: '/BLOG/Gestão de Stock.jpeg',
    inventario: '/BLOG/inventario.jpeg'
  };

  // Internet images for other services
  const internetImages: { [key: string]: string } = {
    iso: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    projectos: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80',
    compliance: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
    formacao: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
    tecnologia: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
    default: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80'
  };

  const defaultPosts: BlogPost[] = [
    {
      id: 'blog-1',
      title: isPt ? 'ILUNGI: Tradição e Inovação em Angola' : 'ILUNGI: Tradition and Innovation in Angola',
      excerpt: isPt ? 'Conhecida por sua força e visão, transforma desafios em conquistas e constrói futuros entre tradição e inovação.' : 'Known for its strength and vision, it transforms challenges into achievements and builds futures between tradition and innovation.',
      content: '',
      author: 'Equipa ILUNGI',
      date: new Date().toISOString().split('T')[0],
      category: 'ILUNGI',
      image: blogImages.ilungi,
      status: 'published'
    },
    {
      id: 'blog-2',
      title: isPt ? 'A sua empresa ainda depende exclusivamente de contagens manuais?' : 'Does your company still rely exclusively on manual counts?',
      excerpt: isPt ? 'RFID (Identificação por Radiofrequência) é uma tecnologia que permite identificar e rastrear ativos automaticamente, sem contacto físico e em tempo real.' : 'RFID (Radio Frequency Identification) is a technology that allows you to identify and track assets automatically, without physical contact and in real time.',
      content: isPt ? 'RFID (Identificação por Radiofrequência) é uma tecnologia que permite identificar e rastrear ativos automaticamente, sem contacto físico e em tempo real.\n\nNa prática, significa:\n\n1. Inventários mais rápidos\n2. Menos erros humanos\n3. Maior controlo operacional\n4. Dados estratégicos automáticos\n\nGrandes indústrias nacionais e internacionais já utilizam esta solução há anos.\nA questão é: quando a sua empresa vai dar esse passo?\n\n#IndústriaAngolana #RFID #TransformaçãoIndustrial' : 'RFID (Radio Frequency Identification) is a technology that allows you to identify and track assets automatically, without physical contact and in real time.\n\nIn practice, it means:\n\n1. Faster inventories\n2. Less human errors\n3. Greater operational control\n4. Automatic strategic data\n\nMajor national and international industries have been using this solution for years.\nThe question is: when will your company take this step?',
      author: 'Equipa ILUNGI',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'RFID',
      image: blogImages.rfid,
      status: 'published'
    },
    {
      id: 'blog-3',
      title: isPt ? 'O custo silencioso do inventário manual' : 'The silent cost of manual inventory',
      excerpt: isPt ? 'Perdas pequenas diárias geram impactos grandes anuais. Em indústrias como: Petrolíferas, Cimenteiras, Plásticos, Logística pesada.' : 'Small daily losses generate large annual impacts. In industries like: Oil, Cement, Plastics, Heavy logistics.',
      content: isPt ? 'Perdas pequenas diárias geram impactos grandes anuais.\n\nEm indústrias como:\n1. Petrolíferas\n2. Cimenteiras\n3. Plásticos\n4. Logística pesada\n\nErros de contagem, extravios e divergências de stock são comuns.\n\nSem um sistema automatizado, a empresa:\n1. Perde tempo\n2. Perde dinheiro\n3. Perde controlo\n\nRFID reduz drasticamente essas vulnerabilidades.\nControlo não é custo. É protecção financeira.\n\n#IndústriaAngolana #RFID #TransformaçãoIndustrial' : 'Small daily losses generate large annual impacts.\n\nIn industries like:\n1. Oil\n2. Cement\n3. Plastics\n4. Heavy logistics\n\nCounting errors, losses and stock discrepancies are common.\n\nWithout an automated system, the company:\n1. Loses time\n2. Loses money\n3. Loses control\n\nRFID drastically reduces these vulnerabilities.\nControl is not cost. It is financial protection.',
      author: 'Equipa ILUNGI',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'RFID',
      image: blogImages.inventario,
      status: 'published'
    },
    {
      id: 'blog-4',
      title: isPt ? 'Inventário em segundos' : 'Inventory in seconds',
      excerpt: isPt ? 'Imagine realizar inventário completo de um armazém em minutos. Sem interromper operações. Sem mobilizar equipas extensas. RFID torna isso possível.' : 'Imagine performing a complete inventory of a warehouse in minutes. Without interrupting operations. Without mobilizing extensive teams. RFID makes this possible.',
      content: isPt ? 'Inventário em segundos.\nImagine realizar inventário completo de um armazém em minutos.\n\n- Sem interromper operações.\n- Sem mobilizar equipas extensas.\n\nRFID torna isso possível.\n\n#IndústriaAngolana #RFID #TransformaçãoIndustrial #inventário #tecnologiaRFID' : 'Inventory in seconds.\nImagine performing a complete inventory of a warehouse in minutes.\n\n- Without interrupting operations.\n- Without mobilizing extensive teams.\n\nRFID makes this possible.',
      author: 'Equipa ILUNGI',
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'RFID',
      image: blogImages.stock,
      status: 'published'
    },
    {
      id: 'blog-5',
      title: isPt ? 'Gestão Eficiente de Stocks para Empresas Angolanas' : 'Efficient Stock Management for Angolan Companies',
      excerpt: isPt ? 'Uma gestão de stock eficiente é crucial para o sucesso de qualquer empresa. Descubra as melhores práticas para otimizar os seus inventários.' : 'Efficient stock management is crucial for the success of any company. Discover the best practices to optimize your inventories.',
      content: '',
      author: 'Equipa ILUNGI',
      date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'Gestão de Stocks',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',
      status: 'published'
    },
    {
      id: 'blog-6',
      title: isPt ? 'Consultoria ISO: Implementação e Certificação' : 'ISO Consulting: Implementation and Certification',
      excerpt: isPt ? 'A ILUNGI oferece serviços especializados de consultoria ISO para empresas que buscam certificação em normas internacionais de gestão.' : 'ILUNGI offers specialized ISO consulting services for companies seeking certification in international management standards.',
      content: '',
      author: 'Equipa ILUNGI',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'Consultoria ISO',
      image: internetImages.iso,
      status: 'published'
    },
    {
      id: 'blog-7',
      title: isPt ? 'Gestão de Projetos e PMO' : 'Project Management and PMO',
      excerpt: isPt ? 'Serviços de Gestão de Projetos e PMO para garantir o sucesso das suas iniciativas empresariais em Angola.' : 'Project Management and PMO services to ensure the success of your business initiatives in Angola.',
      content: '',
      author: 'Equipa ILUNGI',
      date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'Gestão de Projectos',
      image: internetImages.projectos,
      status: 'published'
    },
    {
      id: 'blog-8',
      title: isPt ? 'Compliance e Regulamentações em Angola' : 'Compliance and Regulations in Angola',
      excerpt: isPt ? 'Mantenha a sua empresa em conformidade com as regulamentações angolanas através dos nossos serviços de compliance.' : 'Keep your company in compliance with Angolan regulations through our compliance services.',
      content: '',
      author: 'Equipa ILUNGI',
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'Compliance',
      image: internetImages.compliance,
      status: 'published'
    },
    {
      id: 'blog-9',
      title: isPt ? 'Formação Profissional e Certificação' : 'Professional Training and Certification',
      excerpt: isPt ? 'Descubra os nossos cursos de formação profissional e certificação internacional em diversas áreas.' : 'Discover our professional training and international certification courses in various areas.',
      content: '',
      author: 'Equipa ILUNGI',
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'Formação',
      image: internetImages.formacao,
      status: 'published'
    },
    {
      id: 'blog-10',
      title: isPt ? 'Transformação Digital na Indústria Angolana' : 'Digital Transformation in the Angolan Industry',
      excerpt: isPt ? 'A transformação digital está a revolucionar a forma como as empresas angolanas operam e competitam no mercado global.' : 'Digital transformation is revolutionizing how Angolan companies operate and compete in the global market.',
      content: '',
      author: 'Equipa ILUNGI',
      date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'Tecnologia',
      image: internetImages.tecnologia,
      status: 'published'
    },
    {
      id: 'blog-11',
      title: isPt ? 'Notação de Riscos Corporativos' : 'Corporate Risk Rating',
      excerpt: isPt ? 'Serviços especializados de notação de riscos para ajudar as empresas angolanas a tomar decisões informadas.' : 'Specialized risk rating services to help Angolan companies make informed decisions.',
      content: '',
      author: 'Equipa ILUNGI',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'Gestão de Riscos',
      image: internetImages.default,
      status: 'published'
    }
  ];

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['all', 'ILUNGI', 'RFID', 'Gestão de Stocks', 'Consultoria ISO', 'Gestão de Projetos', 'Compliance', 'Formação', 'Tecnologia', 'Gestão de Riscos'];

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
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
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
            className={`inline-flex items-center gap-2 mb-6 font-bold transition-colors ${isDark ? 'text-teal-500 hover:text-teal-400' : 'text-teal-600 hover:text-teal-700'}`}
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
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-700'}`}>
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
                {selectedPost.title}
              </h1>

              <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {selectedPost.excerpt}
                </p>
                {selectedPost.content && (
                  <div className={`mt-8 whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {selectedPost.content}
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
      <div className={`border-b-4 border-teal-500 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            </div>
            <h1 className={`text-5xl md:text-6xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className="text-teal-600">ILUNGI</span> BLOG
            </h1>
            <p className={`text-lg mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isPt ? 'As suas notícias, análises e tendências sobre gestão, compliance e tecnologia' : 'Your news, analysis and trends on management, compliance and technology'}
            </p>
            <div className={`flex items-center justify-center gap-4 mt-4 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>{isPt ? 'Publicação diária' : 'Daily publication'}</span>
              <span>•</span>
              <span>{isPt ? 'Angola & Portugal' : 'Angola & Portugal'}</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString(isPt ? 'pt-AO' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Featured Article - Main Headline */}
        {featuredPost && selectedCategory === 'all' && !searchTerm && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-teal-500" />
              <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">
                {isPt ? 'Destaque' : 'Featured'}
              </span>
            </div>
            
            <div 
              onClick={() => setSelectedPost(featuredPost)}
              className={`group cursor-pointer rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-2xl`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-80 overflow-hidden">
                  <img 
                    src={featuredPost.image || internetImages.default} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500 text-white">
                      {featuredPost.category}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {formatDate(featuredPost.date)}
                    </span>
                  </div>
                  
                  <h2 className={`text-2xl lg:text-3xl font-black mb-4 leading-tight group-hover:text-teal-600 transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {featuredPost.title}
                  </h2>
                  
                  <p className={`text-base mb-6 line-clamp-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-teal-500" />
                      </div>
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2 text-teal-600 font-bold group-hover:translate-x-2 transition-transform">
                      {isPt ? 'Ler artigo' : 'Read article'}
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Recent Articles - Sidebar Style */}
        {recentPosts.length > 0 && selectedCategory === 'all' && !searchTerm && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <PlayCircle className="w-5 h-5 text-teal-500" />
              <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">
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
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded text-xs font-bold bg-teal-500 text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className={`text-lg font-bold mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {post.title}
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
                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === cat 
                      ? 'bg-teal-500 text-white' 
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
            <Tag className="w-5 h-5 text-teal-500" />
            <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">
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
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded text-xs font-bold bg-teal-500/90 text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className={`text-base font-bold mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {post.title}
                  </h3>
                  
                  <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {post.excerpt}
                  </p>

                  <div className={`flex items-center justify-between text-xs pt-3 border-t ${isDark ? 'border-slate-700 text-slate-500' : 'border-slate-100 text-slate-400'}`}>
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1 text-teal-500 font-medium">
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
