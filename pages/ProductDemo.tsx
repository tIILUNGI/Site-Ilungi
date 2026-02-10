
import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Shield, Zap, ChevronRight, CheckCircle2, Layout } from 'lucide-react';

const ProductDemo: React.FC<{ productName: string }> = ({ productName }) => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
            <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block px-4 py-1.5 bg-[#6B0FA3]/10 text-[#6B0FA3] rounded-full text-sm font-black uppercase mb-6"
            >
                ILUNGI DIGITAL SOLUTIONS
            </motion.span>
            <h1 className="text-6xl font-black text-[#1B3C2B] mb-8">{productName}</h1>
            <p className="max-w-3xl mx-auto text-xl text-slate-500 font-light leading-relaxed">
                A plataforma SaaS definitiva para {productName === 'Salya' ? 'Gestão de Riscos e Auditorias' : 'Compliance Integrado e Governança 360'}.
            </p>
        </div>

        {/* Mockup Simulation */}
        <div className="relative max-w-5xl mx-auto mb-24">
            <div className="absolute -inset-10 bg-gradient-to-tr from-[#6B0FA3]/10 via-transparent to-[#1B3C2B]/10 rounded-full blur-3xl opacity-50"></div>
            <div className="relative bg-slate-900 rounded-3xl p-4 shadow-2xl border border-white/10 overflow-hidden group">
                <div className="flex items-center space-x-2 px-4 py-2 border-b border-white/5 bg-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <div className="flex-1"></div>
                    <div className="px-4 py-1 bg-white/5 rounded text-[10px] text-white/40">https://{productName.toLowerCase()}.ilungi.ao/dashboard</div>
                </div>
                <img 
                    src={`https://picsum.photos/id/${productName === 'Salya' ? '160' : '201'}/1200/800`} 
                    className="w-full h-auto rounded-b-2xl grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt="Product Interface" 
                />
            </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {[
                { icon: <Layout />, title: "Interface Adaptativa", desc: "Design focado na experiência do usuário para máxima produtividade." },
                { icon: <Shield />, title: "Compliance Automático", desc: "Alertas em tempo real sobre desvios normativos e prazos legais." },
                { icon: <Zap />, title: "Integração API", desc: "Conecte seus sistemas existentes (ERP, CRM) de forma transparente." },
            ].map((f, i) => (
                <div key={i} className="space-y-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-[#1B3C2B]">{f.icon}</div>
                    <h3 className="text-xl font-bold">{f.title}</h3>
                    <p className="text-slate-500">{f.desc}</p>
                </div>
            ))}
        </div>

        {/* Pricing Mockup */}
        <div className="bg-slate-50 p-12 rounded-3xl text-center">
            <h2 className="text-3xl font-bold mb-10">Planos & Demonstração</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-3xl border border-slate-200">
                    <h4 className="font-bold text-slate-400 uppercase text-xs mb-4">Enterprise</h4>
                    <p className="text-4xl font-black mb-6">Sob Consulta</p>
                    <ul className="text-left space-y-3 mb-8">
                        {["Suporte 24/7", "Utilizadores Ilimitados", "Personalização Total"].map(l => (
                            <li key={l} className="flex items-center space-x-2 text-sm text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>{l}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-3 bg-[#1B3C2B] text-white rounded-xl font-bold hover:bg-black transition-all">Solicitar Proposta</button>
                </div>
                <div className="bg-[#6B0FA3] p-8 rounded-3xl text-white">
                    <h4 className="font-bold text-white/60 uppercase text-xs mb-4">Trial</h4>
                    <p className="text-4xl font-black mb-6">Grátis (14 dias)</p>
                    <p className="mb-8 text-white/80 text-sm">Experimente todas as funcionalidades básicas sem compromisso.</p>
                    <button className="w-full py-3 bg-white text-[#6B0FA3] rounded-xl font-bold hover:bg-slate-100 transition-all">Iniciar Demo</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDemo;
