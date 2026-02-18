import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ExternalLink } from 'lucide-react';
import { useAppContext } from '../App';
import { Link } from 'react-router-dom';

interface Reference {
  id: string;
  name: string;
  logo: string;
  role: string;
  comment: string;
  person: string;
  service: string;
  description?: string;
  attachments?: { name: string; url: string }[];
}

interface ReferenceCardProps {
  reference: Reference;
  index: number;
}

const ReferenceCard: React.FC<ReferenceCardProps> = ({ reference, index }) => {
  const { t, isDark } = useAppContext();
  const isPt = t.nav.home === 'Início';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
        isDark 
          ? 'bg-slate-800 border-slate-700 hover:border-purple-500' 
          : 'bg-white border-slate-100 hover:border-purple-300'
      }`}
    >
      <div className="flex items-start space-x-4">
        {/* Company Logo */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
          <img 
            src={reference.logo} 
            alt={reference.name}
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50%" x="50%" dominant-baseline="middle" text-anchor="middle" font-size="40">' + reference.name.charAt(0) + '</text></svg>';
            }}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {reference.name}
          </h4>
          <p className={`text-sm mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            {reference.role}
          </p>
          
          {/* Comment */}
          <div className="relative mt-3">
            <Quote className={`w-5 h-5 absolute -top-1 -left-1 ${isDark ? 'text-purple-500/30' : 'text-purple-200'}`} />
            <p className={`text-sm leading-relaxed pl-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              "{reference.comment}"
            </p>
          </div>
          
          <p className={`text-xs mt-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            — {reference.person}
          </p>
        </div>
      </div>
      
      {/* View Details Link */}
      <Link 
        to={`/referencia/${reference.id}`}
        className={`mt-4 inline-flex items-center text-sm font-semibold ${
          isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
        }`}
      >
        {t.references?.viewDetails || (isPt ? 'Ver Detalhes' : 'View Details')}
        <ExternalLink className="w-4 h-4 ml-1" />
      </Link>
    </motion.div>
  );
};

export default ReferenceCard;
