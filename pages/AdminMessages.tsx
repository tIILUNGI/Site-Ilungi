import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { endpoints } from '../lib/api';

const AdminMessages: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await endpoints.contact.getMessages();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [lang]);

  const handleDelete = async (id: string) => {
    if (confirm(isPt ? 'Tem certeza que deseja excluir esta mensagem?' : 'Are you sure you want to delete this message?')) {
      try {
        await endpoints.contact.deleteMessage(id);
        await fetchMessages();
      } catch (error) {
        console.error('Failed to delete message:', error);
        alert(isPt ? 'Erro ao excluir.' : 'Error deleting.');
      }
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await endpoints.contact.markAsRead(id);
      await fetchMessages();
    } catch (error) {
      console.error('Failed to mark as read:', error);
      alert(isPt ? 'Erro ao atualizar.' : 'Error updating.');
    }
  };

  const getStatusBadge = (message: any) => {
    if (message.read) {
      return isPt ? 'Lida' : 'Read';
    }
    return isPt ? 'Não lida' : 'Unread';
  };

  const getStatusClass = (isDark: boolean, read: boolean) => {
    if (read) {
      return isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-700';
    }
    return isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-700';
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
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
              <Mail className="w-8 h-8 text-[#6a00a3]" />
              {isPt ? 'Mensagens Recebidas' : 'Received Messages'}
            </h1>
          </div>
        </div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-12 h-12 border-4 border-[#6a00a3]/20 border-t-[#6a00a3] rounded-full animate-spin" />
            <p className="mt-4 text-slate-500">{isPt ? 'Carregando mensagens...' : 'Loading messages...'}</p>
          </motion.div>
        ) : (
          <>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-slate-500">{isPt ? 'Nenhuma mensagem encontrada.' : 'No messages found.'}</p>
              </motion.div>
            ) : (
              <div className={`rounded-3xl overflow-hidden shadow-xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-white'}`}>
                <div className="overflow-x-auto">
                  <table className="min-w-[1100px] w-full">
                    <thead className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                      <tr className="text-left text-sm font-bold">
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">{isPt ? 'Tipo' : 'Type'}</th>
                        <th className="px-6 py-4">{isPt ? 'Nome' : 'Name'}</th>
                        <th className="px-6 py-4">{isPt ? 'E-mail' : 'Email'}</th>
                        <th className="px-6 py-4">{isPt ? 'Assunto' : 'Subject'}</th>
                        <th className="px-6 py-4">{isPt ? 'Data' : 'Date'}</th>
                        <th className="px-6 py-4">{isPt ? 'Status' : 'Status'}</th>
                        <th className="px-6 py-4">{isPt ? 'Ações' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? 'divide-y divide-slate-700' : 'divide-y divide-slate-100'}>
                      {messages.map((message, index) => (
                        <tr key={message.id} className={isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50/70'}>
                          <td className={`px-6 py-4 text-sm font-semibold whitespace-nowrap ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
                            {index + 1}
                          </td>
                          <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                            {message.type === 'contact' ? (isPt ? 'Contacto' : 'Contact') :
                             message.type === 'course' ? (isPt ? 'Inscrição Curso' : 'Course Enrollment') :
                             (isPt ? 'Candidatura Espontânea' : 'Spontaneous Application')}
                          </td>
                          <td className={`px-6 py-4 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            {message.name}
                          </td>
                          <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                            {message.email}
                          </td>
                          <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                            {message.subject || (isPt ? 'N/A' : 'N/A')}
                          </td>
                          <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                            {new Date(message.createdAt).toLocaleString(isPt ? 'pt-AO' : 'en-US')}
                          </td>
                          <td className={`px-6 py-4 text-sm ${getStatusClass(isDark, !!message.read)} rounded-full px-3 py-1 text-xs font-medium`}>
                            {getStatusBadge(message)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {!message.read && (
                                <button
                                  onClick={() => handleMarkAsRead(message.id)}
                                  className={`p-2 rounded-lg ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
                                  aria-label={isPt ? 'Marcar como lida' : 'Mark as read'}
                                >
                                  <Mail className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(message.id)}
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

export default AdminMessages;