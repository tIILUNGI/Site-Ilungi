import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, Clock, BookOpen, Award, CheckCircle, ChevronLeft, 
  ChevronRight, Download, MessageCircle, FileText, Video,
  User, Menu, X, Home
} from 'lucide-react';
import { useAppContext } from '../App';
import { useAlumniAuth } from '../lib/authContext';
import { supabase } from '../lib/supabase';

interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

interface CourseLesson {
  id: string;
  title: string;
  type: 'video' | 'live' | 'material';
  duration?: string;
  url?: string;
  completed?: boolean;
}

interface Course {
  id: string;
  titulo: string;
  descricao: string;
  professor: string;
  duracao: string;
  modulos: CourseModule[];
  thumbnail?: string;
}

const CoursePlayer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { t, lang } = useAppContext();
  const { user } = useAlumniAuth();
  const isPt = lang === 'pt';

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      const { data } = await supabase
        .from('cursos')
        .select('*')
        .eq('id', courseId)
        .single();

      if (data) {
        setCourse(data);
        if (data.modulos && data.modulos.length > 0) {
          const firstModule = data.modulos[0];
          if (firstModule.lessons && firstModule.lessons.length > 0) {
            setCurrentLesson(firstModule.lessons[0]);
          }
        }
      }
      setLoading(false);
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const demoCourse: Course = {
    id: courseId || 'demo',
    titulo: isPt ? 'Especialista em ISO 27001 - Segurança da Informação' : 'ISO 27001 Information Security Specialist',
    descricao: isPt ? 'Curso completo de implementação e gestão da ISO 27001' : 'Complete course on ISO 27001 implementation and management',
    professor: 'Dr. João Manuel',
    duracao: '40 horas',
    thumbnail: '/imagens/ISO.png',
    modulos: [
      {
        id: 'mod-1',
        title: isPt ? 'Módulo 1: Introdução à ISO 27001' : 'Module 1: Introduction to ISO 27001',
        lessons: [
          { id: 'les-1', title: isPt ? 'Apresentação do Curso' : 'Course Presentation', type: 'video', duration: '15:00', completed: true },
          { id: 'les-2', title: isPt ? 'Conceitos Fundamentais de ISMS' : 'Fundamental ISMS Concepts', type: 'video', duration: '25:00', completed: true },
          { id: 'les-3', title: isPt ? 'Aula ao Vivo - Q&A' : 'Live Class - Q&A', type: 'live', duration: '60:00' },
          { id: 'les-4', title: isPt ? 'Material: Manual ISO 27001' : 'Material: ISO 27001 Manual', type: 'material' },
        ]
      },
      {
        id: 'mod-2',
        title: isPt ? 'Módulo 2: Implementação' : 'Module 2: Implementation',
        lessons: [
          { id: 'les-5', title: isPt ? 'Análise de Riscos' : 'Risk Analysis', type: 'video', duration: '30:00' },
          { id: 'les-6', title: isPt ? 'Desenvolvimento de Políticas' : 'Policy Development', type: 'video', duration: '20:00' },
          { id: 'les-7', title: isPt ? 'Controles de Segurança' : 'Security Controls', type: 'video', duration: '35:00' },
        ]
      },
      {
        id: 'mod-3',
        title: isPt ? 'Módulo 3: Auditoria e Certificação' : 'Module 3: Audit and Certification',
        lessons: [
          { id: 'les-8', title: isPt ? 'Preparação para Auditoria' : 'Audit Preparation', type: 'video', duration: '25:00' },
          { id: 'les-9', title: isPt ? 'Certificação Final' : 'Final Certification', type: 'video', duration: '20:00' },
        ]
      }
    ]
  };

  const displayCourse = course || demoCourse;

  const handleLessonComplete = () => {
    if (currentLesson) {
      setProgress(prev => Math.min(prev + 5, 100));
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'live': return <Video className="w-4 h-4" />;
      case 'material': return <FileText className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6a00a3]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} fixed lg:relative z-20 bg-slate-800 border-r border-white/10 transition-all duration-300 overflow-hidden`}>
        <div className="w-80 h-screen flex flex-col">
          <div className="p-4 border-b border-white/10">
            <Link to="/academia/alumni" className="flex items-center space-x-2 text-slate-400 hover:text-white mb-4">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">{isPt ? 'Voltar ao Portal' : 'Back to Portal'}</span>
            </Link>
            <h2 className="font-bold text-lg line-clamp-2">{displayCourse.titulo}</h2>
            <div className="flex items-center space-x-4 mt-3 text-sm text-slate-400">
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{displayCourse.duracao}</span>
              </span>
              <span className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{displayCourse.professor}</span>
              </span>
            </div>
          </div>

          <div className="p-4 border-b border-white/10">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">{isPt ? 'Progresso' : 'Progress'}</span>
              <span className="text-[#6a00a3] font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#6a00a3] to-purple-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {displayCourse.modulos.map((module) => (
              <div key={module.id} className="border-b border-white/5">
                <div className="p-4 bg-slate-800/50">
                  <h3 className="font-bold text-sm">{module.title}</h3>
                </div>
                <div>
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(lesson)}
                      className={`w-full p-3 flex items-center space-x-3 hover:bg-white/5 transition-colors ${currentLesson?.id === lesson.id ? 'bg-[#6a00a3]/20 border-l-2 border-[#6a00a3]' : ''}`}
                    >
                      <div className={lesson.completed ? 'text-green-500' : 'text-slate-500'}>
                        {lesson.completed ? <CheckCircle className="w-5 h-5" /> : getLessonIcon(lesson.type)}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium line-clamp-1">{lesson.title}</p>
                        <p className="text-xs text-slate-500">
                          {lesson.type === 'video' && lesson.duration}
                          {lesson.type === 'live' && (isPt ? 'Aula ao Vivo' : 'Live Class')}
                          {lesson.type === 'material' && (isPt ? 'Material' : 'Material')}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-slate-800 border-b border-white/10 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/academia/alumni" className="flex items-center space-x-2 text-slate-400 hover:text-white">
              <Home className="w-4 h-4" />
              <span className="text-sm">{isPt ? 'Portal AILUNGI' : 'AILUNGI Portal'}</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentLesson?.type === 'material' && (
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#6a00a3] rounded-lg text-sm font-bold hover:bg-[#520b7d]">
                <Download className="w-4 h-4" />
                <span>{isPt ? 'Baixar Material' : 'Download Material'}</span>
              </button>
            )}
            {currentLesson?.type === 'live' && (
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg text-sm font-bold hover:bg-red-700 animate-pulse">
                <Video className="w-4 h-4" />
                <span>{isPt ? 'Entrar na Aula' : 'Join Class'}</span>
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {currentLesson ? (
            <div className="max-w-4xl mx-auto">
              {currentLesson.type === 'video' && (
                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6">
                  <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <div className="text-center">
                      <Video className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">{isPt ? 'Player de Vídeo' : 'Video Player'}</p>
                      <p className="text-sm text-slate-500">{currentLesson.title}</p>
                    </div>
                  </div>
                </div>
              )}

              {currentLesson.type === 'live' && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 font-bold">{isPt ? 'AULA AO VIVO' : 'LIVE CLASS'}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                  <p className="text-slate-400 mb-4">
                    {isPt ? 'Participe desta aula ao vivo e tire as suas dúvidas com o professor.' : 'Join this live class and ask your questions to the teacher.'}
                  </p>
                  <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700">
                    {isPt ? 'Entrar Agora' : 'Join Now'}
                  </button>
                </div>
              )}

              {currentLesson.type === 'material' && (
                <div className="bg-[#6a00a3]/20 border border-[#6a00a3]/30 rounded-xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="w-6 h-6 text-[#6a00a3]" />
                    <span className="text-[#6a00a3] font-bold">{isPt ? 'MATERIAL DE ESTUDO' : 'STUDY MATERIAL'}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                  <button className="px-6 py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d] flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>{isPt ? 'Baixar PDF' : 'Download PDF'}</span>
                  </button>
                </div>
              )}

              <div className="bg-slate-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">{currentLesson.title}</h3>
                <div className="flex items-center space-x-6 text-sm text-slate-400 mb-6">
                  <span className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentLesson.duration || '--:--'}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{isPt ? 'Lição' : 'Lesson'} {currentLesson.id}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <button className="flex items-center space-x-2 px-4 py-2 text-slate-400 hover:text-white">
                    <ChevronLeft className="w-5 h-5" />
                    <span>{isPt ? 'Anterior' : 'Previous'}</span>
                  </button>
                  
                  <button onClick={handleLessonComplete} className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span>{isPt ? 'Marcar como Concluído' : 'Mark as Completed'}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 text-slate-400 hover:text-white">
                    <span>{isPt ? 'Próxima' : 'Next'}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-slate-800/50 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-[#6a00a3]" />
                  <h3 className="font-bold">{isPt ? 'Fórum de Discussão' : 'Discussion Forum'}</h3>
                </div>
                <textarea
                  placeholder={isPt ? 'Faça uma pergunta ou deixe um comentário...' : 'Ask a question or leave a comment...'}
                  className="w-full bg-slate-700/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#6a00a3] focus:border-transparent"
                  rows={3}
                ></textarea>
                <button className="mt-3 px-6 py-2 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d]">
                  {isPt ? 'Enviar' : 'Send'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Award className="w-16 h-16 text-[#6a00a3] mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">{isPt ? 'Bem-vindo ao Curso!' : 'Welcome to the Course!'}</h2>
                <p className="text-slate-400 mb-6">
                  {isPt ? 'Selecione uma lição no menu lateral para começar' : 'Select a lesson from the sidebar to start'}
                </p>
                <Link to="/academia/alumni" className="inline-block px-6 py-3 bg-[#6a00a3] text-white rounded-xl font-bold hover:bg-[#520b7d]">
                  {isPt ? 'Voltar ao Portal' : 'Back to Portal'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CoursePlayer;
