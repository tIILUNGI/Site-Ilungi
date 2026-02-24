import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, Download, Upload, Trash2, Edit3, Globe, Palette, FileText, Users, Briefcase, Monitor } from 'lucide-react';
import { useAppContext } from '../App';
import { getContent, saveContent, resetContent, exportContent, importContent, resetAllContent } from '../lib/contentManager';

const AdminConfig: React.FC = () => {
  const { lang, setLang, isDark, setIsDark, t } = useAppContext();
  const isPt = lang === 'pt';
  const [activeTab, setActiveTab] = useState('texts');
  const [content, setContent] = useState<any>(null);
  const [editedContent, setEditedContent] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    const data = getContent(lang);
    setContent(data);
    setEditedContent(data);
  }, [lang]);

  const handleSave = () => {
    setSaveStatus('saving');
    try {
      saveContent(lang, editedContent);
      setContent(editedContent);
      setTimeout(() => setSaveStatus('saved'), 500);
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (e) {
      setSaveStatus('error');
    }
  };

  const handleReset = () => {
    if (confirm(isPt ? 'Tem a certeza que pretende restaurar os valores padrão?' : 'Are you sure you want to restore default values?')) {
      resetContent(lang);
      const data = getContent(lang);
      setContent(data);
      setEditedContent(data);
    }
  };

  const handleExport = () => {
    const data = exportContent();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ilungi-content-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          importContent(event.target?.result as string);
          const data = getContent(lang);
          setContent(data);
          setEditedContent(data);
          alert(isPt ? 'Conteúdo importado com sucesso!' : 'Content imported successfully!');
        } catch (err) {
          alert(isPt ? 'Erro ao importar conteúdo.' : 'Error importing content.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFieldChange = (path: string, value: string) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(editedContent));
    let current: any = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (current[keys[i]] === undefined) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setEditedContent(newContent);
  };

  const tabs = [
    { id: 'texts', label: isPt ? 'Textos Globais' : 'Global Texts', icon: <FileText className="w-5 h-5" /> },
    { id: 'home', label: isPt ? 'Página Inicial' : 'Home Page', icon: <Monitor className="w-5 h-5" /> },
    { id: 'nav', label: isPt ? 'Navegação' : 'Navigation', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'appearance', label: isPt ? 'Aparência' : 'Appearance', icon: <Palette className="w-5 h-5" /> },
    { id: 'backup', label: isPt ? 'Backup' : 'Backup', icon: <Download className="w-5 h-5" /> },
  ];

  if (!editedContent) return <div className="pt-32 text-center">Carregando...</div>;

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-4xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {isPt ? 'Configuração do Site' : 'Site Configuration'}
          </h1>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {isPt ? 'Edite todo o conteúdo do site' : 'Edit all site content'}
          </p>
        </motion.div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className={`w-64 flex-shrink-0 ${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-4 h-fit`}>
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id 
                      ? 'bg-[#6a00a3] text-white' 
                      : `${isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className={`flex-1 ${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-6`}>
            
            {/* Language Toggle */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <Globe className="w-5 h-5 text-[#6a00a3]" />
                <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {isPt ? 'Idioma:' : 'Language:'}
                </span>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as 'pt' | 'en')}
                  className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'}`}
                >
                  <option value="pt">Português</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleSave}
                  disabled={saveStatus === 'saving'}
                  className="flex items-center gap-2 px-6 py-2.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="w-4 h-4" />
                  {saveStatus === 'saving' ? (isPt ? 'A guardar...' : 'Saving...') : 
                   saveStatus === 'saved' ? (isPt ? 'Guardado!' : 'Saved!') :
                   (isPt ? 'Guardar' : 'Save')}
                </motion.button>
              </div>
            </div>

            {/* Texts Tab */}
            {activeTab === 'texts' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {isPt ? 'Textos Globais' : 'Global Texts'}
                </h2>
                
                <div className="space-y-4">
                  {editedContent.home && Object.entries(editedContent.home).map(([key, value]: [string, any]) => (
                    <div key={key}>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      {typeof value === 'string' ? (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleFieldChange(`home.${key}`, e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-[#6a00a3] focus:border-transparent`}
                        />
                      ) : typeof value === 'object' ? (
                        <textarea
                          value={JSON.stringify(value, null, 2)}
                          onChange={(e) => {
                            try {
                              handleFieldChange(`home.${key}`, e.target.value);
                            } catch {}
                          }}
                          className={`w-full px-4 py-3 rounded-xl border font-mono text-sm ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-[#6a00a3] focus:border-transparent`}
                          rows={4}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Home Tab */}
            {activeTab === 'home' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {isPt ? 'Página Inicial' : 'Home Page'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editedContent.home && Object.entries(editedContent.home).map(([key, value]: [string, any]) => (
                    <div key={key} className="space-y-2">
                      <label className={`block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {key}
                      </label>
                      <textarea
                        value={typeof value === 'string' ? value : JSON.stringify(value)}
                        onChange={(e) => handleFieldChange(`home.${key}`, e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-[#6a00a3]`}
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Tab */}
            {activeTab === 'nav' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {isPt ? 'Navegação' : 'Navigation'}
                </h2>
                
                <div className="space-y-4">
                  {editedContent.nav && Object.entries(editedContent.nav).map(([key, value]: [string, any]) => (
                    <div key={key}>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {key}
                      </label>
                      <input
                        type="text"
                        value={value as string}
                        onChange={(e) => handleFieldChange(`nav.${key}`, e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-[#6a00a3]`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {isPt ? 'Aparência' : 'Appearance'}
                </h2>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-700">
                  <div>
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {isPt ? 'Modo Escuro' : 'Dark Mode'}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {isPt ? 'Ativar tema escuro por padrão' : 'Enable dark theme by default'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className={`w-14 h-8 rounded-full transition-colors ${isDark ? 'bg-[#6a00a3]' : 'bg-slate-300'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-transform ${isDark ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            )}

            {/* Backup Tab */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {isPt ? 'Backup e Restore' : 'Backup and Restore'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    onClick={handleExport}
                    className="flex items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-[#6a00a3] transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Download className="w-6 h-6 text-[#6a00a3]" />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {isPt ? 'Exportar Conteúdo' : 'Export Content'}
                    </span>
                  </motion.button>
                  
                  <motion.label
                    className="flex items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-[#6a00a3] cursor-pointer transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Upload className="w-6 h-6 text-[#6a00a3]" />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {isPt ? 'Importar Conteúdo' : 'Import Content'}
                    </span>
                    <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                  </motion.label>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <motion.button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 w-full p-4 rounded-xl bg-red-500 text-white hover:bg-red-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span className="font-medium">
                      {isPt ? 'Restaurar Valores Padrão' : 'Restore Default Values'}
                    </span>
                  </motion.button>
                  <p className={`text-sm text-center mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {isPt ? 'Isto irá apagar todas as alterações feitas.' : 'This will erase all changes made.'}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminConfig;
