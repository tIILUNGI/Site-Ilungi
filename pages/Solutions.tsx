import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Edit, Plus, Trash2, Save, Image as ImageIcon, ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';
import { useAppContext } from '../App';
import { loadData, saveDataAdmin } from '../lib/dataSync';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.6 }
  })
};

const Solutions: React.FC = () => {
  const { t, lang, isEditing } = useAppContext();
  const isPt = lang === 'pt';
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultProducts = [
    {
      name: "Salya",
      tagline: isPt ? "Gestão de Salários & RH" : "Payroll & HR Management",
      desc: isPt
        ? "Plataforma para gestão e emissão de recibos de salário e controle completo de recursos humanos. Automatização de folhas de pagamento, benefícios e compliance trabalhista."
        : "Platform for payroll management, payslip issuance, and complete HR control. Automation of payroll, benefits, and labor compliance.",
      image: "/imagens/Salya.png",
      path: "/solucoes/salya",
      color: "from-[#1B3C2B] to-[#2E7D5E]",
      bgColor: "bg-[#1B3C2B]"
    },
    {
      name: "SICLIC",
      tagline: isPt ? "Inteligência de Compliance" : "Compliance Intelligence",
      desc: isPt
        ? "Sistema inteligente para gestão de compliance legal, contratual e normativo em tempo real. Monitoramento contínuo de obrigações legais e normativas."
        : "Smart system for real-time legal, contractual, and regulatory compliance management. Continuous monitoring of legal and regulatory obligations.",
      image: "/imagens/SICLIC.png",
      url: "https://siclic.ao/",
      color: "from-[#6a00a3] to-[#8000c4]",
      bgColor: "bg-[#6a00a3]"
    },
    {
      name: "Tocomply360",
      tagline: isPt ? "Framework de Governança" : "Governance Framework",
      desc: isPt
        ? "Solução 360 graus para governança corporativa, integrando ética, risco e transparência. Framework completo para gestão de compliance e integridade."
        : "360-degree solution for corporate governance, integrating ethics, risk, and transparency. Complete framework for compliance and integrity management.",
      image: "/imagens/Tocomply360.png",
      path: "/solucoes/tocomply",
      color: "from-slate-700 to-slate-900",
      bgColor: "bg-slate-800"
    }
  ];

  const [products, setProducts] = useState(defaultProducts);

  useEffect(() => {
    loadData('solutions', 'ilungi_solutions_data', defaultProducts).then(data => {
      const normalizeText = (value: any) => {
        if (!value) return "";
        return String(value)
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      };
      let changed = false;
      const normalized = data.map((product: any) => {
        const name = normalizeText(product.name);
        const tagline = normalizeText(product.tagline);
        const desc = normalizeText(product.desc);
        const path = normalizeText(product.path);

        const isSalyaProduct =
          name.includes("salya") ||
          tagline.includes("gestao de salarios") ||
          tagline.includes("payroll") ||
          desc.includes("folhas de pagamento") ||
          desc.includes("payroll") ||
          path.includes("salya");

        const isTocomplyProduct =
          name.includes("tocomply") ||
          tagline.includes("governanca") ||
          desc.includes("governanca") ||
          desc.includes("compliance 360") ||
          path.includes("tocomply");

        if (isSalyaProduct && product.image !== "/imagens/Salya.png") {
          changed = true;
          return { ...product, image: "/imagens/Salya.png" };
        }
        if (isTocomplyProduct && product.image !== "/imagens/Tocomply360.png") {
          changed = true;
          return { ...product, image: "/imagens/Tocomply360.png" };
        }
        return product;
      });
      setProducts(normalized);
      if (changed) {
        saveDataAdmin('solutions', 'ilungi_solutions_data', normalized);
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [products.length]);

  const handleProductChange = (index: number, field: string, value: string) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
    saveDataAdmin('solutions', 'ilungi_solutions_data', updated);
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: `sol-${Date.now()}`,
      name: "Nova Solução",
      tagline: "Slogan",
      desc: "Descrição curta",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3",
      path: "",
      url: "",
      color: "from-[#6a00a3] to-[#8000c4]",
      bgColor: "bg-[#6a00a3]"
    };
    const updated = [...products, newProduct];
    setProducts(updated);
    saveDataAdmin('solutions', 'ilungi_solutions_data', updated);
  };

  const handleDeleteProduct = (index: number) => {
    if (window.confirm("Atenção: Eliminar solução?")) {
      const updated = products.filter((_, i) => i !== index);
      setProducts(updated);
      saveDataAdmin('solutions', 'ilungi_solutions_data', updated);
    }
  };

  const editStyles = isEditing ? "hover:outline hover:outline-2 hover:outline-dashed hover:outline-[#6a00a3] hover:bg-white/50 cursor-text transition-all rounded p-1 -m-1" : "";

  return (
    <div className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6a00a3]/20 to-transparent"></div>
      <motion.div 
        animate={{ x: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-0 w-64 h-64 bg-[#6a00a3]/5 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ x: [0, -30, 0], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 right-0 w-96 h-96 bg-[#1B3C2B]/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2 bg-[#1B3C2B]/10 text-[#1B3C2B] rounded-full text-sm font-bold uppercase mb-6 tracking-widest"
          >
            {isPt ? 'Ecossistema Digital ILUNGI' : 'ILUNGI Digital Ecosystem'}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-[#1B3C2B] mb-6"
          >
            {t.solutions.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-3xl mx-auto text-xl text-slate-500 font-light"
          >
            {t.solutions.subtitle}
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {products.map((product, i) => {
            const isSiclic = product.name === "SICLIC";
            const isSalya = product.name === "Salya";
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                custom={i}
                whileHover={{ y: isSiclic ? -8 : -12 }}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-500 ${isSiclic ? 'hover:shadow-[0_24px_60px_-30px_rgba(106,0,163,0.45)]' : 'hover:shadow-2xl'}`}
              >
                {/* Gradient border on hover */}
                {!isSiclic && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6a00a3] to-[#1B3C2B] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                )}
                
                <div className="relative bg-white rounded-[22px] m-0.5">
                  {isSiclic ? (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="SICLIC"
                      className="block relative h-56 sm:h-64 rounded-[22px] bg-white overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,0,163,0.08),transparent_60%)]"></div>
                      <motion.img 
                        src={product.image} 
                        alt={product.name}
                        className="relative z-10 w-full h-full object-contain"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.6 }}
                      />
                    </a>
                  ) : (
                    <>
                      {/* Image Container */}
                      <div className="relative h-44 overflow-hidden rounded-t-[22px]">
                        <motion.div 
                          className={`absolute inset-0 ${isSalya ? 'bg-gradient-to-t from-black/40 via-black/10 to-transparent' : 'bg-gradient-to-t from-black/70 via-black/30 to-transparent'} z-10`}
                          initial={{ opacity: 0.5 }}
                          whileHover={{ opacity: 0.8 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <motion.img 
                          src={product.image} 
                          alt={product.name}
                          className={`w-full h-full ${isSalya ? 'object-contain p-5 bg-white' : 'object-cover'}`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        
                        {/* Badge */}
                        <motion.div 
                          className="absolute top-5 left-5 z-20"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className={`bg-gradient-to-r ${product.color} px-5 py-2.5 rounded-xl shadow-lg border border-white/20`}>
                            <span className="text-white font-black text-lg">
                              {product.name}
                            </span>
                          </div>
                        </motion.div>

                        {/* Tagline */}
                        <div className="absolute bottom-5 left-5 z-20">
                          <span className="text-xs px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium border border-white/30">
                            {product.tagline}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                    <div className="p-5 bg-white">
                        <p className="text-slate-500 leading-relaxed mb-6 text-sm line-clamp-3">
                          {product.desc}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          {product.url ? (
                            <motion.a 
                              href={product.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ x: 5 }}
                              className="inline-flex items-center gap-2 font-bold text-[#1B3C2B] hover:text-[#6a00a3] transition-colors"
                            >
                              <span>{isPt ? 'Visitar' : 'Visit'}</span>
                              <ArrowRight className="w-4 h-4" />
                            </motion.a>
                          ) : (
                            <motion.div whileHover={{ x: 5 }}>
                              <Link 
                                to={product.path || '#'}
                                className="inline-flex items-center gap-2 font-bold text-[#1B3C2B] hover:text-[#6a00a3] transition-colors"
                              >
                                <span>{isPt ? 'Saber mais' : 'Learn more'}</span>
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Decorative line */}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-1"
                        style={{ background: `linear-gradient(to right, ${product.bgColor.replace('bg-', '')}, #6a00a3)` }}
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.4 }}
                      />
                    </>
                  )}
                </div>

                {/* Admin Tools */}
                {isEditing && (
                  <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        const newImg = prompt("URL da Imagem:", product.image);
                        if(newImg) handleProductChange(i, 'image', newImg);
                      }}
                      className="p-2 bg-white/90 shadow-lg text-slate-800 rounded-lg hover:bg-[#6a00a3] hover:text-white transition-all"
                      title="Alterar Imagem"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(i)}
                      className="p-2 bg-red-500/90 shadow-lg text-white rounded-lg hover:bg-red-600 transition-all"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
          
          {/* Add New Button (Admin) */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleAddProduct}
              className="group relative bg-[#6a00a3]/5 rounded-3xl border-2 border-dashed border-[#6a00a3]/30 hover:bg-[#6a00a3]/10 hover:border-[#6a00a3]/50 transition-all duration-500 flex flex-col items-center justify-center min-h-[400px] cursor-pointer"
            >
              <div className="w-16 h-16 bg-[#6a00a3] rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 shadow-lg shadow-[#6a00a3]/30 transition-transform">
                <Plus className="w-8 h-8" />
              </div>
              <span className="font-bold text-[#6a00a3] text-lg">Nova Solução</span>
            </motion.div>
          )}
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-[#1B3C2B] mb-8"
            >
              {isPt ? 'Implementação Ágil & Suporte Especializado' : 'Agile Implementation & Specialized Support'}
            </motion.h2>
            
            <div className="space-y-8">
              {[
                { 
                  title: isPt ? "Segurança de Dados" : "Data Security", 
                  desc: isPt ? "Infraestrutura em nuvem com criptografia de ponta a ponta e compliance ISO 27001." : "Cloud infrastructure with end-to-end encryption and ISO 27001 compliance."
                },
                { 
                  title: isPt ? "Customização" : "Customization", 
                  desc: isPt ? "Módulos adaptáveis aos processos específicos da sua indústria." : "Modules adaptable to your industry's specific processes."
                },
                { 
                  title: isPt ? "Escalabilidade" : "Scalability", 
                  desc: isPt ? "Cresça sua operação sem preocupações com performance ou limites técnicos." : "Grow your operation without worrying about performance or technical limits."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-0 w-2 h-2 bg-[#6a00a3] rounded-full mt-2"></div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h4>
                  <p className="text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-[#6a00a3]/10 to-[#1B3C2B]/10 rounded-3xl blur-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              className="relative z-10 rounded-3xl shadow-2xl w-full h-auto" 
              alt="Technology"
            />
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 p-8 bg-white rounded-3xl shadow-lg border border-slate-100">
            <span className="text-sm font-bold text-slate-700 uppercase">{isPt ? '+50 Empresas' : '50+ Companies'}</span>
            <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
            <span className="text-sm font-bold text-slate-700 uppercase">{isPt ? 'ISO 27001' : 'ISO 27001'}</span>
            <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
            <span className="text-sm font-bold text-slate-700 uppercase">{isPt ? 'Suporte 24/7' : '24/7 Support'}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Solutions;
