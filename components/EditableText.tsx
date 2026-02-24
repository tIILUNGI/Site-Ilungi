import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Check, X, Save } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  tagName?: string;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  tagName: Tag = 'div',
  className = '',
  multiline = false,
  placeholder = 'Clique para editar...'
}) => {
  const { isEditing } = useAppContext();
  const [isEditingThis, setIsEditingThis] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditingThis && inputRef.current) {
      inputRef.current.focus();
      if (multiline) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
      }
    }
  }, [isEditingThis, multiline]);

  if (!isEditing) {
    return <Tag className={className}>{value}</Tag>;
  }

  const handleSave = () => {
    onChange(editValue);
    setIsEditingThis(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditingThis(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditingThis) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyDown={handleKeyDown}
            className={`w-full ${className} border-2 border-[#6a00a3] rounded-lg px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6a00a3]/50 min-h-[60px]`}
            rows={3}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full ${className} border-2 border-[#6a00a3] rounded-lg px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6a00a3]/50`}
          />
        )}
        <div className="flex gap-2 mt-2">
          <motion.button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-full text-sm font-semibold hover:bg-green-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Check className="w-4 h-4" />
            Guardar
          </motion.button>
          <motion.button
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4" />
            Cancelar
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative inline-block cursor-pointer ${className.includes('block') ? 'block' : ''}`}
      onClick={() => setIsEditingThis(true)}
    >
      <Tag className={className}>{value || placeholder}</Tag>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute -top-2 -right-2 w-6 h-6 bg-[#6a00a3] rounded-full flex items-center justify-center shadow-lg"
      >
        <Edit2 className="w-3 h-3 text-white" />
      </motion.div>
    </div>
  );
};

export default EditableText;
