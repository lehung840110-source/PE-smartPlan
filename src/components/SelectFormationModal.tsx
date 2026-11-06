import React from 'react';
import { FormationDiagram, standardFormationDiagrams } from '../data/formationDiagrams';
import { X, Check, Users } from 'lucide-react';

interface SelectFormationModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRowIndex: number;
  onSelectFormation: (rowIdx: number, formation: FormationDiagram) => void;
}

export const SelectFormationModal: React.FC<SelectFormationModalProps> = ({
  isOpen,
  onClose,
  targetRowIndex,
  onSelectFormation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Chọn Sơ Đồ Đội Hình Gắn Vào Cột Hoạt Động (Dòng {targetRowIndex + 1})
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {standardFormationDiagrams.map((diag) => (
            <div
              key={diag.id}
              className="border border-slate-200 hover:border-blue-500 rounded-xl p-3 flex flex-col justify-between bg-white hover:shadow-md transition group"
            >
              <div>
                <div className="bg-slate-50 rounded-lg p-2 mb-2 flex items-center justify-center min-h-[140px] border border-slate-100">
                  <img src={diag.svgDataUrl} alt={diag.name} className="max-h-28 object-contain" />
                </div>
                <h4 className="font-bold text-slate-800 text-xs mb-1 group-hover:text-blue-600 transition">{diag.name}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">{diag.description}</p>
              </div>

              <button
                onClick={() => {
                  onSelectFormation(targetRowIndex, diag);
                  onClose();
                }}
                className="mt-3 w-full py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Gắn Sơ Đồ
              </button>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-slate-200 flex justify-end bg-slate-50">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-xl">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
