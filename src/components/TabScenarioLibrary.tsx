import React from 'react';
import { ScenarioItem } from '../types/gdtc';
import { Library, Plus, Edit2, Trash2, ArrowRight } from 'lucide-react';

interface TabScenarioLibraryProps {
  scenarios: ScenarioItem[];
  setScenarios: React.Dispatch<React.SetStateAction<ScenarioItem[]>>;
  onOpenAddModal: () => void;
  onEditScenario: (scenario: ScenarioItem) => void;
  onInsertToLesson: (scenario: ScenarioItem, targetRowIndex: number) => void;
  showToast: (msg: string) => void;
}

export const TabScenarioLibrary: React.FC<TabScenarioLibraryProps> = ({
  scenarios,
  setScenarios,
  onOpenAddModal,
  onEditScenario,
  onInsertToLesson,
  showToast,
}) => {
  const handleDelete = (id: string) => {
    setScenarios((prev) => prev.filter((s) => s.id !== id));
    showToast('Đã xóa kịch bản khỏi thư viện!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Library className="w-5 h-5 text-blue-600" />
            4. Thư Viện Kịch Bản Sư Phạm & Phương Pháp Giảng Dạy ({scenarios.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Lưu trữ các kịch bản hướng dẫn động tác mới, sửa sai, luyện tập tổ chức thi đấu và trò chơi vận động.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" /> Thêm Kịch Bản Mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((sc) => (
          <div
            key={sc.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-bold text-[10px] rounded-md">
                  {sc.category} · Khối {sc.grade}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{sc.lvd}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-xs mb-2">{sc.title}</h3>

              <div className="space-y-2 text-[11px]">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-700 block mb-0.5">GV:</span>
                  <p className="text-slate-600 line-clamp-3 whitespace-pre-line">{sc.gv}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-700 block mb-0.5">HS:</span>
                  <p className="text-slate-600 line-clamp-2 whitespace-pre-line">{sc.hs}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditScenario(sc)}
                  className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                  title="Chỉnh sửa"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(sc.id)}
                  className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Xóa"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => onInsertToLesson(sc, 1)}
                className="px-2.5 py-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-[10px] font-semibold transition flex items-center gap-1"
              >
                <span>Chèn Vào Giáo Án</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
