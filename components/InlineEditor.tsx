import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../App';

interface EditableElement {
  id: string;
  type: 'text' | 'image' | 'link' | 'button' | 'heading' | 'paragraph' | 'list';
  label: string;
  selector: string;
  path?: string;
}

// Global state for inline editing
let inlineEditorInstance: any = null;

export const initInlineEditor = (callback: (element: EditableElement, action: 'edit' | 'delete', value?: string) => void) => {
  inlineEditorInstance = callback;
};

export const triggerInlineEdit = (element: EditableElement) => {
  if (inlineEditorInstance) {
    inlineEditorInstance(element, 'edit');
  }
};

const InlineEditor: React.FC = () => {
  const { isEditing } = useAppContext();
  const isPt = true;
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedElement, setSelectedElement] = useState<EditableElement | null>(null);
  const [editModal, setEditModal] = useState<{element: EditableElement, value: string} | null>(null);

  // Handle element selection
  useEffect(() => {
    if (!isEditing || !isSelecting) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('nav') && !target.closest('footer')) return;
      if (target.closest('.no-edit')) return;
      
      target.style.outline = '2px dashed #6a00a3';
      target.style.cursor = 'pointer';
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      target.style.outline = '';
      target.style.cursor = '';
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const target = e.target as HTMLElement;
      
      let label = target.tagName.toLowerCase();
      let type: EditableElement['type'] = 'text';
      
      if (target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'H4') {
        type = 'heading';
        label = target.tagName;
      } else if (target.tagName === 'P') {
        type = 'paragraph';
        label = 'Parágrafo';
      } else if (target.tagName === 'A') {
        type = 'link';
        label = 'Link: ' + (target.textContent || '').substring(0, 30);
      } else if (target.tagName === 'BUTTON') {
        type = 'button';
        label = 'Botão: ' + (target.textContent || '').substring(0, 30);
      } else if (target.tagName === 'IMG') {
        type = 'image';
        label = 'Imagem';
      } else if (target.tagName === 'LI') {
        type = 'list';
        label = 'Item de lista';
      } else if (target.textContent) {
        label = target.textContent.substring(0, 50);
      }

      const elementInfo: EditableElement = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        label,
        selector: '',
      };

      const currentValue = target.textContent || (target as HTMLImageElement).src || '';
      setSelectedElement(elementInfo);
      setEditModal({ element: elementInfo, value: currentValue });
      setIsSelecting(false);
      
      target.style.outline = '';
      target.style.cursor = '';
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
    };
  }, [isEditing, isSelecting]);

  const handleSave = () => {
    if (editModal) {
      const event = new CustomEvent('inlineEditSave', {
        detail: { element: editModal.element, value: editModal.value }
      });
      document.dispatchEvent(event);
    }
    setEditModal(null);
    setSelectedElement(null);
  };

  const handleDelete = () => {
    if (editModal && confirm(isPt ? 'Tem a certeza que deseja eliminar este elemento?' : 'Are you sure you want to delete this element?')) {
      const event = new CustomEvent('inlineEditDelete', {
        detail: { element: editModal.element }
      });
      document.dispatchEvent(event);
    }
    setEditModal(null);
    setSelectedElement(null);
  };

  if (!isEditing) return null;

  return (
    <>
      {/* Selection Overlay */}
      {isSelecting && (
        <div className="fixed inset-0 z-[150] pointer-events-none">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
            {isPt ? 'Clique em qualquer elemento para editar' : 'Click on any element to edit'}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div
          className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4"
          onClick={() => { setEditModal(null); setSelectedElement(null); }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#6a00a3] to-[#520b7d] px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">
                  {isPt ? 'Editar Elemento' : 'Edit Element'}
                </h3>
                <button 
                  onClick={() => { setEditModal(null); setSelectedElement(null); }}
                  className="text-white/80 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>
              <p className="text-white/80 text-sm mt-1">
                {editModal.element.label}
              </p>
            </div>

            <div className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {isPt ? 'Conteúdo:' : 'Content:'}
              </label>
              {editModal.element.type === 'paragraph' || editModal.element.type === 'heading' ? (
                <textarea
                  value={editModal.value}
                  onChange={(e) => setEditModal({ ...editModal, value: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#6a00a3] focus:border-transparent text-slate-800"
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  value={editModal.value}
                  onChange={(e) => setEditModal({ ...editModal, value: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#6a00a3] focus:border-transparent text-slate-800"
                />
              )}
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
              >
                {isPt ? 'Guardar' : 'Save'}
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
              >
                {isPt ? 'Eliminar' : 'Delete'}
              </button>
              <button
                onClick={() => { setEditModal(null); setSelectedElement(null); }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
              >
                {isPt ? 'Cancelar' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InlineEditor;
