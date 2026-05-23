import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ArrowLeft, Users, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { endpoints } from '../lib/api';

const AdminTalents: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';

  const [talents, setTalents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTalents = async () => {
    try {
      setLoading(true);
      const data = await endpoints.talents.getAll();
      setTalents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch talents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalents();
  }, [lang]);

  const handleDelete = async (id: string) => {
    if (confirm(isPt ? 'Tem certeza que deseja excluir este talento?' : 'Are you sure you want to delete this talent?')) {
      try {
        await endpoints.talents.delete(id);
        await fetchTalents();
      } catch (error) {
        console.error('Failed to delete talent:', error);
        alert(isPt ? 'Erro ao excluir.' : 'Error deleting.');
      }
    }
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/admin"
              className={`inline-flex items-center text-sm font-bold mb-4 hover:underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#1B3C2B]'}`}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {isPt ? 'Voltar ao Painel' : 'Back to Dashboard'}
            </Link>
            <h1
              className={`text-3xl font-black mb-2 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-800'}`}
            >
              <Users className="w-8 h-8 text-orange-500" />
              {isPt ? 'Gestão de Talentos' : 'Talent Management'}
            </h1>
          </div>
        </div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-slate-500">{isPt ? 'Carregando talentos...' : 'Loading talents...'}</p>
          </motion.div>
        ) : (
          <>
            {talents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-slate-500">{isPt ? 'Nenhum talento encontrado.' : 'No talents found.'}</p>
              </motion.div>
            ) : (
              <div className={`rounded-3xl overflow-hidden shadow-xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-white'}`}>
                <div className="overflow-x-auto">
                  <table className="min-w-[1100px] w-full">
                    <thead className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                      <tr className="text-left text-sm font-bold">
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">{isPt ? 'Nome' : 'Name'}</th>
                        <th className="px-6 py-4">{isPt ? 'Cargo' : 'Role'}</th>
                        <th className="px-6 py-4">{isPt ? 'E-mail' : 'Email'}</th>
                        <th className="px-6 py-4">{isPt ? 'Localização' : 'Location'}</th>
                        <th className="px-6 py-4">{isPt ? 'Data Registro' : 'Registration Date'}</th>
                        <th className="px-6 py-4">{isPt ? 'Ações' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? 'divide-y divide-slate-700' : 'divide-y divide-slate-100'}>
                      {talents.map((talent, index) => (
                        <tr key={talent.id} className={isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50/70'}>
                          <td className={`px-6 py-4 text-sm font-semibold whitespace-nowrap ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
                            {index + 1}
                          </td>
                          <td className={`px-6 py-4 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            {talent.name}
                          </td>
                          <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                            {talent.role}
                          </td>
                          <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                            {talent.email}
                          </td>
                          <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                            {talent.location}
                          </td>
                          <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                            {talent.createdAt ? new Date(talent.createdAt).toLocaleDateString(isPt ? 'pt-AO' : 'en-US') : 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDelete(talent.id)}
                                className={`p-2 rounded-lg ${isDark ? 'bg-red-900/40 hover:bg-red-900/60 text-red-300' : 'bg-red-100 hover:bg-red-200 text-red-600'}`}
                                aria-label={isPt ? 'Excluir' : 'Delete'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTalents;
