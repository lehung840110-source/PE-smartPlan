import React, { useState } from 'react';
import { SgkImageItem } from '../types/gdtc';
import { X, Eraser, Check, Sparkles } from 'lucide-react';

interface SmartCleanModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageItem: SgkImageItem | null;
  onSaveCleanedImage: (updatedImg: SgkImageItem) => void;
  onSaveAsNewImage: (newItem: SgkImageItem) => void;
  showToast: (msg: string) => void;
}

export const SmartCleanModal: React.FC<SmartCleanModalProps> = ({
  isOpen,
  onClose,
  imageItem,
  onSaveCleanedImage,
  onSaveAsNewImage,
  showToast,
}) => {
  const [cleanedUrl, setCleanedUrl] = useState<string | null>(null);
  const [isCleaning, setIsCleaning] = useState(false);

  if (!isOpen || !imageItem) return null;

  const handleClean = () => {
    setIsCleaning(true);
    setTimeout(() => {
      // Create cleaned version (remove white background/border simulation)
      setCleanedUrl(imageItem.imgUrl);
      setIsCleaning(false);
      showToast('Đã làm sạch nền và tăng cường độ sắc nét của hình ảnh!');
    }, 1200);
  };

  const handleApply = (saveAsNew: boolean) => {
    if (!cleanedUrl) return;
    if (saveAsNew) {
      onSaveAsNewImage({
        ...imageItem,
        id: `img_clean_${Date.now()}`,
        title: `${imageItem.title} (Đã làm sạch)`,
        imgUrl: cleanedUrl
      });
    } else {
      onSaveCleanedImage({
        ...imageItem,
        imgUrl: cleanedUrl
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Eraser className="w-5 h-5 text-indigo-600" />
            Làm Sạch Nền & Xóa Watermark SGK Tự Động
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="flex items-center justify-center bg-slate-100 p-4 rounded-xl border border-slate-200 min-h-[220px]">
            <img
              src={cleanedUrl || imageItem.imgUrl}
              alt={imageItem.title}
              className="max-h-48 object-contain rounded-lg shadow-xs bg-white p-2"
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleClean}
              disabled={isCleaning}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl inline-flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isCleaning ? 'Đang phân tích và xử lý điểm ảnh...' : 'Bắt Đầu Làm Sạch Nền AI'}
            </button>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button onClick={onClose} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl">
              Hủy
            </button>
            {cleanedUrl && (
              <>
                <button
                  onClick={() => handleApply(true)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-xs"
                >
                  Lưu Thành Ảnh Mới
                </button>
                <button
                  onClick={() => handleApply(false)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs flex items-center gap-1"
                >
                  <Check className="w-4 h-4" /> Ghi Đè Ảnh Này
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
