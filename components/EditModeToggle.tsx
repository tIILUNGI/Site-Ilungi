import React from 'react';
import { useAppContext } from '../App';
import { motion } from 'framer-motion';
import { Edit3, Eye, Save, Settings, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EditModeToggle: React.FC = () => {
  const { isEditing, setIsEditing, t } = useAppContext();

  if (!isEditing) {
    return (
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-24 right-0 z-[100]"
      >
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-3 bg-[#6a00a3] text-white rounded-l-lg shadow-2xl hover:bg-[#520b7d] transition-all"
        >
          <Edit3 className="w-4 h-4" />
          <span className="text-sm font-semibold">Editar Site</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed top-20 right-0 z-[100]"
    >
      <div className="bg-gradient-to-l from-[#6a00a3] to-[#520b7d] rounded-l-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="flex items-center gap-2 text-white">
            <Edit3 className="w-5 h-5" />
            <span className="font-bold">Modo Edição Ativo</span>
          </div>
        </div>

        {/* Admin Links */}
        <div className="p-2 space-y-1">
          <Link
            to="/admin"
            className="flex items-center justify-between gap-2 px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Painel Admin</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
          
          <Link
            to="/admin/solucoes"
            className="flex items-center justify-between gap-2 px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Gerir Soluções</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
          
          <Link
            to="/admin/servicos"
            className="flex items-center justify-between gap-2 px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Gerir Serviços</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
          
          <Link
            to="/admin/referencias"
            className="flex items-center justify-between gap-2 px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Gerir Referências</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
          
          <Link
            to="/admin/parceiros"
            className="flex items-center justify-between gap-2 px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Gerir Parceiros</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Exit Button */}
        <div className="p-2 border-t border-white/20">
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-semibold">Sair do Modo Edição</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EditModeToggle;
