import { X, AlertCircle } from 'lucide-react';
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-[#0B0C10]/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md mx-4 transform transition-all duration-300 ease-out scale-100">
        <div className="relative bg-[#1F2833]/90 backdrop-blur-sm rounded-xl shadow-2xl border border-[#66FCF1]/10 overflow-hidden">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-[#C5C6C7]" />
          </button>

          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 p-1">
                <AlertCircle className="w-6 h-6 text-[#66FCF1]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  {title}
                </h3>
                <p className="text-[#C5C6C7] leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex justify-end items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-[#C5C6C7]/20 text-[#C5C6C7] hover:bg-white/5 
                          active:bg-white/10 transition-colors duration-200"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-[#66FCF1] text-[#1F2833] hover:bg-[#66FCF1]/90 
                          active:bg-[#66FCF1]/80 transition-colors duration-200 font-medium"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};