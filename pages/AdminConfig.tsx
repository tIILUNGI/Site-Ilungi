import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Settings, Globe, MapPin, Phone, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { loadConfig, saveConfigAdmin } from '../lib/dataSync';

interface SiteConfig {
  companyName: string;
  taglineText: string;
  address: string;
  phone: string;
  email: string;
  linkedinBaseUrl: string;
  hoursP1: string;
  hoursP2: string;
}

const defaultData: SiteConfig = {
  companyName: "ILUNGI Lda",
  taglineText: "O Melhor e Verdadeiro Parceiro Nacional.",
  address: "Projeto Nova Vida, Prédio E209, Apartamento 24",
  phone: "+244 935 793 270",
  email: "geral@ilungi.ao",
  linkedinBaseUrl: "https://www.linkedin.com/company/ilungi",
  hoursP1: "Segunda - Sexta: 08:00 - 17:00",
  hoursP2: "Fim de semana fechados"
};

const AdminConfig: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';
  
  const [config, setConfig] = useState<SiteConfig>(defaultData);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadConfig('ilungi_global_config', defaultData).then(data => {
      setConfig(data);
    });
  }, []);

  const saveToStorage = () => {
    saveConfigAdmin('ilungi_global_config', config);
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900 border-none' : 'bg-slate-50'}`}>
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/admin" className={`inline-flex items-center text-sm font-bold mb-4 hover:underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#1B3C2B]'}`}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              {isPt ? 'Voltar ao Painel' : 'Back to Dashboard'}
            </Link>
            <h1 className={`text-3xl font-black mb-2 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <Settings className="w-8 h-8 text-slate-500" />
              {isPt ? 'Configuração Global' : 'Global Settings'}
            </h1>
          </div>
          <button
            onClick={saveToStorage}
            className="flex items-center px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg"
          >
            {isSaved ? <span className="flex items-center"><Save className="w-5 h-5 mr-2" /> Guardado!</span> : <span className="flex items-center"><Save className="w-5 h-5 mr-2" /> {isPt ? 'Salvar Configurações' : 'Save Settings'}</span>}
          </button>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl p-8 mb-12 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
        >
          <div className="space-y-8">
            
            {/* Informação da Empresa */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center text-[#1B3C2B] border-b pb-2">
                <Globe className="w-5 h-5 mr-2" />
                Informações da Marca
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-500">Nome Oficial da Empresa</label>
                  <input
                    type="text"
                    value={config.companyName}
                    onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-500">Slogan (Footer/Geral)</label>
                  <input
                    type="text"
                    value={config.taglineText}
                    onChange={(e) => setConfig({ ...config, taglineText: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Contactos */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold flex items-center text-[#6a00a3] border-b pb-2">
                <Phone className="w-5 h-5 mr-2" />
                Contactos e Suporte
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-500">Email Oficial</label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-500">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Localização */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold flex items-center text-blue-600 border-b pb-2">
                <MapPin className="w-5 h-5 mr-2" />
                Localização
              </h2>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-500">Morada Sede</label>
                <input
                  type="text"
                  value={config.address}
                  onChange={(e) => setConfig({ ...config, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  placeholder="Edifício Belas Business Park..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-500">Horário - Linha 1</label>
                  <input
                    type="text"
                    value={config.hoursP1}
                    onChange={(e) => setConfig({ ...config, hoursP1: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-500">Horário - Linha 2</label>
                  <input
                    type="text"
                    value={config.hoursP2}
                    onChange={(e) => setConfig({ ...config, hoursP2: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold flex items-center text-slate-600 border-b pb-2">
                <FileText className="w-5 h-5 mr-2" />
                Redes Sociais
              </h2>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-500">Link de Página do LinkedIn (URL)</label>
                <input
                  type="text"
                  value={config.linkedinBaseUrl}
                  onChange={(e) => setConfig({ ...config, linkedinBaseUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  placeholder="https://www.linkedin.com/..."
                />
              </div>
            </div>

          </div>
        </motion.div>

        <div className="text-center text-sm text-slate-500 py-4">
          ⚠️ As alterações feitas aqui afetarão imediatamente o rodapé, o topo da página e as páginas de contacto.
        </div>
      </div>
    </div>
  );
};

export default AdminConfig;
