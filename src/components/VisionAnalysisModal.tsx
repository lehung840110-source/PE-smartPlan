import React from 'react';
import { SgkImageItem, LessonRow } from '../types/gdtc';
import { X, Check, Sparkles, AlertCircle } from 'lucide-react';

export interface VisionAnalysisResult {
  name: string;
  category: string;
  targetColumn?: 'content' | 'hs';
  lvd?: string;
  caption?: string;
  technicalCues?: string[];
  commonErrors?: string[];
  gvScript?: string;
  hsScript?: string;
  movementName?: string;
  grade?: string;
  analysisText?: string;
}

interface VisionAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageItem: SgkImageItem | null;
  analysis: VisionAnalysisResult | null;
  lessonRows: LessonRow[];
  onApplyToLesson: (
    rowIndex: number,
    targetCol: 'content' | 'hs',
    movementName: string,
    lvdVal: string,
    gvScriptVal: string,
    hsScriptVal: string,
    imgItem: SgkImageItem
  ) => void;
}

export const VisionAnalysisModal: React.FC<VisionAnalysisModalProps> = ({
  isOpen,
  onClose,
  imageItem,
  analysis,
  lessonRows,
  onApplyToLesson,
}) => {
  const [selectedRow, setSelectedRow] = React.useState<number>(1);

  if (!isOpen || !imageItem) return null;

  const handleApply = () => {
    if (!analysis) return;
    const movement = analysis.name || analysis.movementName || imageItem.title;
    const lvd = analysis.lvd || "5 - 7'";
    const gv = analysis.gvScript || '';
    const hs = analysis.hsScript || '';
    const col = analysis.targetColumn || (imageItem.category === 'dong_tac' ? 'content' : 'hs');
    onApplyToLesson(selectedRow, col, movement, lvd, gv, hs, imageItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Kết Quả Phân Tích Hình Ảnh (Gemini AI Vision)
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          <div className="flex gap-4 items-start bg-slate-50 p-3 rounded-xl border border-slate-200">
            <img src={imageItem.imgUrl} alt={imageItem.title} className="w-24 h-24 object-contain bg-white rounded-lg border p-1" />
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">{imageItem.title}</h4>
              <p className="text-slate-500">Khối: {imageItem.grade || 'Chung'} · Trang: {imageItem.page || 'N/A'}</p>
              {analysis && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold">{analysis.name || analysis.movementName}</span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-semibold">{analysis.category}</span>
                </div>
              )}
            </div>
          </div>

          {analysis ? (
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mô tả tư thế & góc thân người:</label>
                <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-200 text-slate-800 leading-relaxed">
                  {analysis.caption || analysis.analysisText}
                </div>
              </div>

              {analysis.gvScript && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Đề xuất kịch bản GV (Cột 3):</label>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-800 whitespace-pre-line">
                    {analysis.gvScript}
                  </div>
                </div>
              )}

              {analysis.hsScript && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Đề xuất hoạt động HS (Cột 4):</label>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-800 whitespace-pre-line">
                    {analysis.hsScript}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <label className="font-bold text-slate-700 block mb-1">Chọn dòng trong giáo án để chèn ảnh & kịch bản:</label>
                <select
                  value={selectedRow}
                  onChange={(e) => setSelectedRow(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-medium"
                >
                  {lessonRows.map((r, idx) => (
                    <option key={idx} value={idx}>
                      Dòng {idx + 1}: {r.content.slice(0, 50)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl text-amber-800 border border-amber-200">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Chưa có dữ liệu phân tích. Vui lòng bấm "Phân tích AI Vision" trên hình ảnh.</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button onClick={onClose} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl">
              Đóng
            </button>
            {analysis && (
              <button
                onClick={handleApply}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-4 h-4" /> Áp Dụng Vào Giáo Án
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
