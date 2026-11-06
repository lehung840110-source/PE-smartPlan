import React, { useState } from 'react';
import { FormationDiagram, standardFormationDiagrams } from '../data/formationDiagrams';
import {
  generateFormationByContext,
  renderFormationSvgString,
  CourtTheme,
  formationStudioPresets
} from '../utils/formationStudioUtils';
import { X, Save, Check, Users, Sparkles, Wand2, Palette, Layers, RefreshCw } from 'lucide-react';

interface FormationStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRowIndex?: number;
  onApplyFormationToRow?: (rowIdx: number, formation: FormationDiagram) => void;
  onSaveToLibrary: (formation: FormationDiagram) => void;
}

export const FormationStudioModal: React.FC<FormationStudioModalProps> = ({
  isOpen,
  onClose,
  targetRowIndex = 2,
  onApplyFormationToRow,
  onSaveToLibrary,
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'presets'>('ai');
  const [contextPrompt, setContextPrompt] = useState<string>('Trò chơi tiếp sức 4 làn chạy vòng cọc cờ');
  const [courtTheme, setCourtTheme] = useState<CourtTheme>('clean');
  const [diagramName, setDiagramName] = useState<string>('Sơ đồ Đội hình Tiếp sức 4 Làn');
  const [previewSvgDataUrl, setPreviewSvgDataUrl] = useState<string>(() => {
    const gen = generateFormationByContext('Trò chơi tiếp sức 4 làn chạy vòng cọc cờ');
    const svgStr = renderFormationSvgString(gen.elements, 'clean', gen.title, gen.subtitle);
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`;
  });

  const [selectedPresetId, setSelectedPresetId] = useState<string>('p_tro_choi_tiep_suc');

  if (!isOpen) return null;

  // AI Context generation trigger
  const handleGenerateAI = (customQuery?: string) => {
    const q = customQuery !== undefined ? customQuery : contextPrompt;
    if (customQuery !== undefined) setContextPrompt(customQuery);
    
    const result = generateFormationByContext(q);
    const svgStr = renderFormationSvgString(result.elements, courtTheme, result.title, result.subtitle);
    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`;
    
    setPreviewSvgDataUrl(dataUrl);
    setDiagramName(result.title);
  };

  // Change theme and regenerate current preview
  const handleThemeChange = (newTheme: CourtTheme) => {
    setCourtTheme(newTheme);
    const result = generateFormationByContext(contextPrompt);
    const svgStr = renderFormationSvgString(result.elements, newTheme, result.title, result.subtitle);
    setPreviewSvgDataUrl(`data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`);
  };

  // Select standard preset
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = formationStudioPresets.find((p) => p.id === presetId);
    if (preset) {
      const svgStr = renderFormationSvgString(preset.elements, courtTheme, preset.title, preset.subtitle);
      setPreviewSvgDataUrl(`data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`);
      setDiagramName(preset.name);
      setContextPrompt(preset.name);
    }
  };

  const handleSaveAndApply = () => {
    const newDiagram: FormationDiagram = {
      id: `ai_form_${Date.now()}`,
      name: diagramName || 'Sơ đồ Đội hình AI',
      code: 'DIAG_AI',
      phase: contextPrompt.toLowerCase().includes('khởi động') ? 'khoi_dong' :
             contextPrompt.toLowerCase().includes('tiếp sức') || contextPrompt.toLowerCase().includes('trò chơi') ? 'tro_choi' :
             contextPrompt.toLowerCase().includes('hồi tĩnh') ? 'hoi_tinh' : 'dong_loat',
      description: contextPrompt,
      svgDataUrl: previewSvgDataUrl
    };

    onSaveToLibrary(newDiagram);
    if (onApplyFormationToRow && targetRowIndex !== undefined) {
      onApplyFormationToRow(targetRowIndex, newDiagram);
    }
    onClose();
  };

  // Quick contextual chip prompts
  const quickContextPrompts = [
    { label: '🏃 Tiếp sức 4 làn chạy', query: 'Trò chơi tiếp sức 4 làn chạy qua cọc tiêu' },
    { label: '👥 Luyện tập cặp đôi', query: 'Đội hình tập cặp đôi đối diện sửa sai' },
    { label: '🧩 4 Tổ chia 4 góc sân', query: 'Đội hình tập luyện theo tổ nhóm 4 góc sân' },
    { label: '⭕ Trò chơi vòng tròn', query: 'Đội hình vòng tròn trò chơi bóng trung tâm' },
    { label: '📐 4 Hàng ngang so le', query: 'Đội hình 4 hàng ngang giãn cách so le 1 sải tay' },
    { label: '🖼️ Quan sát tranh & GV mẫu', query: 'Đội hình quan sát tranh kỹ thuật SGK và GV thị phạm' },
    { label: '🧘 Hồi tĩnh thả lỏng', query: 'Đội hình hồi tĩnh thả lỏng xuống lớp' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                Studio Thiết Kế Đội Hình AI Theo Ngữ Cảnh Hoạt Động
              </h3>
              <p className="text-[11px] text-slate-500">
                Nhập ngữ cảnh bài dạy để AI tự động vẽ sơ đồ sư phạm CV 5512 (GV, CS, HS, làn chạy, cọc mốc, khoảng cách).
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Theme Control */}
        <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === 'ai' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" /> Tạo Bằng AI Theo Ngữ Cảnh
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === 'presets' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Kho Sơ Đồ Mẫu Chuẩn ({formationStudioPresets.length})
            </button>
          </div>

          {/* Court Theme Selector */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 text-[11px] flex items-center gap-1">
              <Palette className="w-3 h-3" /> Giao diện sân:
            </span>
            <div className="flex bg-white rounded-lg p-0.5 border border-slate-200 shadow-2xs">
              <button
                onClick={() => handleThemeChange('clean')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  courtTheme === 'clean' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Sư phạm (Clean)
              </button>
              <button
                onClick={() => handleThemeChange('turf')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  courtTheme === 'turf' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Sân cỏ (Turf)
              </button>
              <button
                onClick={() => handleThemeChange('court')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  courtTheme === 'court' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Sàn gỗ (Court)
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {activeTab === 'ai' ? (
            <div className="space-y-4">
              {/* Context Input & Generator */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                <label className="font-bold text-slate-800 text-xs block">
                  Nhập ngữ cảnh hoạt động / trò chơi / kỹ thuật cần tạo sơ đồ:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={contextPrompt}
                    onChange={(e) => setContextPrompt(e.target.value)}
                    placeholder="Ví dụ: Trò chơi tiếp sức 4 làn, Luyện tập cặp đôi sửa sai, 4 tổ 4 góc..."
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-xl bg-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleGenerateAI();
                    }}
                  />
                  <button
                    onClick={() => handleGenerateAI()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
                  >
                    <Wand2 className="w-4 h-4" /> AI Tạo Sơ Đồ
                  </button>
                </div>

                {/* Quick Chips */}
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Gợi ý ngữ cảnh chuẩn GDPT 2018:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickContextPrompts.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleGenerateAI(chip.query)}
                        className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 rounded-lg border border-slate-200 text-[11px] font-medium transition"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* PRESET BROWSER */
            <div className="space-y-2">
              <label className="font-bold text-slate-800 text-xs block mb-1">
                Chọn mẫu sơ đồ từ kho kịch bản chuẩn:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 max-h-52 overflow-y-auto pr-1">
                {formationStudioPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      selectedPresetId === preset.id
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xs truncate">{preset.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal mt-1">{preset.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sơ Đồ Xem Trước (Live Preview) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 text-xs">
                Xem Trước Sơ Đồ Đội Hình (Vector Chuẩn Sư Phạm):
              </label>
              <span className="text-[11px] text-slate-500">
                Gắn vào: <strong className="text-indigo-700">Dòng {targetRowIndex + 1}</strong>
              </span>
            </div>

            <div className="bg-slate-100 border border-slate-300 rounded-2xl p-4 flex items-center justify-center min-h-[300px] overflow-hidden shadow-inner">
              <img
                src={previewSvgDataUrl}
                alt={diagramName}
                className="max-h-72 w-auto object-contain bg-white rounded-xl shadow-md border"
              />
            </div>
          </div>

          {/* Sơ đồ Title Input */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Tiêu đề sơ đồ hiển thị trong giáo án:</label>
            <input
              type="text"
              value={diagramName}
              onChange={(e) => setDiagramName(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-xl font-bold text-xs"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-xl">
            Đóng
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handleGenerateAI()}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 border border-slate-300"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Tạo lại
            </button>
            <button
              onClick={handleSaveAndApply}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" /> Lưu & Gắn Vào Giáo Án
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
