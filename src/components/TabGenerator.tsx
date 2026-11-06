import React, { useState } from 'react';
import { LessonRow, ScenarioItem, SgkImageItem } from '../types/gdtc';
import { MasterPlanItem } from '../data/masterTemplateTuan8';
import { Wand2, ArrowRight, Upload, Plus, Trash2, Printer, AlertCircle, FolderOpen, Scissors } from 'lucide-react';
import { ClassifiedImagePickerModal, ImageClassificationCategory } from './ClassifiedImagePickerModal';

interface TabGeneratorProps {
  week: number;
  setWeek: (w: number) => void;
  grade: number;
  setGrade: (g: number) => void;
  lessonNum: number;
  setLessonNum: (n: number) => void;
  topic: string;
  setTopic: (t: string) => void;
  title: string;
  setTitle: (t: string) => void;
  lessonRows: LessonRow[];
  setLessonRows: React.Dispatch<React.SetStateAction<LessonRow[]>>;
  scenarios: ScenarioItem[];
  images: SgkImageItem[];
  currentMasterPlan: MasterPlanItem;
  onSwitchToExport: () => void;
  onSwitchToMasterTemplate: () => void;
  showToast: (msg: string) => void;
  onOpenImport: () => void;
  onNavigateToScan?: () => void;
  onNavigateToLibrary?: () => void;
}

export const TabGenerator: React.FC<TabGeneratorProps> = ({
  week,
  setWeek,
  grade,
  setGrade,
  lessonNum,
  setLessonNum,
  topic,
  setTopic,
  title,
  setTitle,
  lessonRows,
  setLessonRows,
  images,
  onSwitchToExport,
  onSwitchToMasterTemplate,
  showToast,
  onOpenImport,
  onNavigateToScan,
  onNavigateToLibrary
}) => {
  const [pickerState, setPickerState] = useState<{
    isOpen: boolean;
    rowIdx: number | null;
    category: ImageClassificationCategory;
    searchKeyword: string;
  }>({
    isOpen: false,
    rowIdx: null,
    category: 'dong_tac',
    searchKeyword: ''
  });

  const handleOpenPickerForRow = (rowIdx: number) => {
    const isWarmup = rowIdx === 0;
    const isPracticeGame = rowIdx === 5;
    const cat: ImageClassificationCategory = isWarmup ? 'tro_choi_kd' : isPracticeGame ? 'tro_choi_vd' : 'dong_tac';
    const kw = isWarmup ? 'khởi động' : isPracticeGame ? 'trò chơi' : title;
    setPickerState({
      isOpen: true,
      rowIdx,
      category: cat,
      searchKeyword: kw
    });
  };

  const handleSelectImageForGen = (imgUrl: string, imgTitle: string) => {
    if (pickerState.rowIdx !== null) {
      handleRowChange(pickerState.rowIdx, 'contentImgUrl', imgUrl);
      handleRowChange(pickerState.rowIdx, 'contentImgTitle', imgTitle);
      showToast('✨ Đã gắn ảnh SGK thành công vào giáo án!');
    }
    setPickerState((prev) => ({ ...prev, isOpen: false }));
  };
  const handleRowChange = (index: number, field: keyof LessonRow, value: string) => {
    setLessonRows((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddRow = () => {
    setLessonRows((prev) => [
      ...prev,
      {
        content: `${prev.length + 1}. Hoạt động tiếp theo`,
        lvd: '5-7 phút',
        gv: '- GV hướng dẫn HS...',
        hs: '- HS thực hiện theo yêu cầu...'
      }
    ]);
    showToast('Đã thêm 1 dòng hoạt động mới vào bảng!');
  };

  const handleDeleteRow = (index: number) => {
    if (lessonRows.length <= 1) {
      showToast('Cần giữ ít nhất 1 dòng hoạt động.');
      return;
    }
    setLessonRows((prev) => prev.filter((_, idx) => idx !== index));
    showToast('Đã xóa dòng hoạt động.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-blue-600" />
            5. Sinh Giáo Án Tuần Mới & Chỉnh Sửa Trực Tiếp
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tùy biến bài giảng tuần mới theo từng khối lớp, chỉnh sửa nội dung 4 cột chuẩn và chuyển sang Xem trước & In.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenImport}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4 text-blue-600" /> Nạp File Word
          </button>
          <button
            onClick={onSwitchToExport}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Xem Trước & In (Tab 6)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lesson Metadata Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tuần Dạy</label>
            <select
              value={week}
              onChange={(e) => setWeek(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white font-semibold"
            >
              {Array.from({ length: 35 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>Tuần {w}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Khối Lớp</label>
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white font-semibold"
            >
              <option value={1}>Khối 1</option>
              <option value={3}>Khối 3</option>
              <option value={5}>Khối 5</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tiết PPCT</label>
            <input
              type="number"
              value={lessonNum}
              onChange={(e) => setLessonNum(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Chủ Đề</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Tên Bài Dạy</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
          />
        </div>

        {/* 4-Column Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl mt-4">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase">
              <tr>
                <th className="p-3 w-1/4 border-r border-slate-200">1. Nội Dung / Kỹ Thuật</th>
                <th className="p-3 w-24 text-center border-r border-slate-200">2. LVĐ</th>
                <th className="p-3 w-1/3 border-r border-slate-200">3. Hoạt Động Giáo Viên</th>
                <th className="p-3 w-1/3">4. Hoạt Động Học Sinh</th>
                <th className="p-3 w-10 text-center">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {lessonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="p-2 border-r border-slate-200 align-top">
                    <textarea
                      rows={4}
                      value={row.content}
                      onChange={(e) => handleRowChange(idx, 'content', e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs leading-relaxed"
                    />
                    {row.contentImgUrl ? (
                      <div className="mt-1.5 p-1 bg-slate-50 rounded border border-slate-200 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <img src={row.contentImgUrl} alt="" className="h-10 w-10 object-contain rounded shrink-0 bg-white" />
                          <span className="text-[10px] text-slate-600 truncate">{row.contentImgTitle || 'Ảnh kỹ thuật SGK'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOpenPickerForRow(idx)}
                          className="text-[10px] text-blue-600 hover:text-blue-800 underline font-semibold shrink-0 cursor-pointer"
                        >
                          Đổi ảnh
                        </button>
                      </div>
                    ) : (idx === 0 || idx === 1 || idx === 5) ? (
                      <div className="mt-2 p-2 bg-amber-50 border border-amber-300 rounded-lg text-left shadow-xs">
                        <div className="flex items-start gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-[11px] font-semibold text-amber-900 leading-tight">
                              Chưa có ảnh khớp cho {idx === 0 ? 'Trò chơi khởi động' : idx === 5 ? 'Trò chơi vận động' : 'Động tác kỹ thuật'} (Khối {grade})
                            </p>
                            <p className="text-[10px] text-amber-700 mt-0.5">
                              💡 Cần tìm trong Thư viện ảnh (109 ảnh) hoặc Trích xuất từ SGK
                            </p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenPickerForRow(idx)}
                                className="px-2 py-0.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-[10px] font-medium flex items-center gap-1 transition cursor-pointer"
                              >
                                <FolderOpen className="w-3 h-3" />
                                Tìm trong Thư viện (109 ảnh)
                              </button>
                              {onNavigateToScan && (
                                <button
                                  type="button"
                                  onClick={onNavigateToScan}
                                  className="px-2 py-0.5 bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 rounded text-[10px] font-medium flex items-center gap-1 transition cursor-pointer"
                                >
                                  <Scissors className="w-3 h-3" />
                                  Trích xuất từ SGK
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenPickerForRow(idx)}
                        className="mt-1.5 text-[10px] text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Thêm ảnh minh họa
                      </button>
                    )}
                  </td>
                  <td className="p-2 border-r border-slate-200 align-top">
                    <input
                      type="text"
                      value={row.lvd}
                      onChange={(e) => handleRowChange(idx, 'lvd', e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs text-center font-semibold"
                    />
                  </td>
                  <td className="p-2 border-r border-slate-200 align-top">
                    <textarea
                      rows={5}
                      value={row.gv}
                      onChange={(e) => handleRowChange(idx, 'gv', e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs leading-relaxed"
                    />
                  </td>
                  <td className="p-2 align-top">
                    <textarea
                      rows={5}
                      value={row.hs}
                      onChange={(e) => handleRowChange(idx, 'hs', e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs leading-relaxed"
                    />
                    {row.hsImgUrl && (
                      <div className="mt-1 p-1 bg-slate-50 rounded border flex items-center gap-2">
                        <img src={row.hsImgUrl} alt="" className="h-10 w-10 object-contain rounded" />
                        <span className="text-[10px] text-slate-500 truncate">{row.hsImgTitle}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-2 align-middle text-center">
                    <button
                      onClick={() => handleDeleteRow(idx)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded-lg"
                      title="Xóa dòng"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={handleAddRow}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Thêm Dòng Hoạt Động
          </button>
          <button
            onClick={onSwitchToExport}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
          >
            <span>Tiến Hành Xem Trước & In Toàn Bộ 3 Khối</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Classified Movement & Game Image Picker */}
      {pickerState.isOpen && (
        <ClassifiedImagePickerModal
          isOpen={pickerState.isOpen}
          onClose={() => setPickerState((prev) => ({ ...prev, isOpen: false }))}
          images={images}
          initialGrade={grade ? (String(grade) as '1' | '3' | '5') : 'all'}
          initialCategory={pickerState.category}
          targetInfo={{
            grade: grade,
            lessonTitle: title,
            rowIndex: pickerState.rowIdx ?? undefined
          }}
          onSelectImage={handleSelectImageForGen}
        />
      )}
    </div>
  );
};

