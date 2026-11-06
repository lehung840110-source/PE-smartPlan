import React, { useState, useRef } from 'react';
import { ParsedLessonFileResult, parseLessonText } from '../utils/documentParser';
import { X, Upload, FileText, CheckCircle2 } from 'lucide-react';

interface ImportLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLessonImported: (result: ParsedLessonFileResult) => void;
  showToast: (msg: string) => void;
}

export const ImportLessonModal: React.FC<ImportLessonModalProps> = ({
  isOpen,
  onClose,
  onLessonImported,
  showToast,
}) => {
  const [pastedText, setPastedText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleProcessPasted = () => {
    if (!pastedText.trim()) {
      showToast('Vui lòng dán nội dung giáo án.');
      return;
    }
    const result = parseLessonText(pastedText);
    onLessonImported(result);
    onClose();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const result = parseLessonText(text);
      onLessonImported(result);
      onClose();
    } catch (err: any) {
      showToast('Lỗi đọc file: ' + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Nạp Giáo Án Từ File Word Hoặc Dán Văn Bản
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Cách 1: Tải lên file (.docx, .txt)</label>
            <input
              type="file"
              ref={fileInputRef}
              accept=".docx,.txt,.doc"
              onChange={handleFileUpload}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Cách 2: Dán trực tiếp văn bản giáo án</label>
            <textarea
              rows={8}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Dán nội dung giáo án (kèm thông tin Tuần, Lớp, Tiết, Bài học)..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button onClick={onClose} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl">
              Hủy
            </button>
            <button
              onClick={handleProcessPasted}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" /> Xử Lý & Nạp Giáo Án
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
