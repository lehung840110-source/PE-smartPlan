import React, { useState, useEffect } from 'react';
import { ScenarioItem } from '../types/gdtc';
import { X, Save, Sparkles } from 'lucide-react';

interface ScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenarioToEdit: ScenarioItem | null;
  onSave: (scenario: ScenarioItem) => void;
}

export const ScenarioModal: React.FC<ScenarioModalProps> = ({
  isOpen,
  onClose,
  scenarioToEdit,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ScenarioItem['category']>('Động tác mới');
  const [grade, setGrade] = useState('Chung');
  const [lvd, setLvd] = useState('5-7 phút');
  const [gv, setGv] = useState('');
  const [hs, setHs] = useState('');

  useEffect(() => {
    if (scenarioToEdit) {
      setTitle(scenarioToEdit.title);
      setCategory(scenarioToEdit.category);
      setGrade(scenarioToEdit.grade);
      setLvd(scenarioToEdit.lvd);
      setGv(scenarioToEdit.gv);
      setHs(scenarioToEdit.hs);
    } else {
      setTitle('');
      setCategory('Động tác mới');
      setGrade('Chung');
      setLvd('5-7 phút');
      setGv('');
      setHs('');
    }
  }, [scenarioToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const item: ScenarioItem = {
      id: scenarioToEdit ? scenarioToEdit.id : `sc_${Date.now()}`,
      title,
      category,
      grade,
      lvd,
      gv,
      hs
    };
    onSave(item);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            {scenarioToEdit ? 'Chỉnh Sửa Kịch Bản Giảng Dạy' : 'Thêm Kịch Bản Mới'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tên Kịch Bản</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Kịch bản dạy động tác mới theo nhóm..."
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Thể Loại</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ScenarioItem['category'])}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Động tác mới">Động tác mới</option>
                <option value="Luyện tập">Luyện tập</option>
                <option value="Trò chơi">Trò chơi</option>
                <option value="Hồi tĩnh">Hồi tĩnh</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Khối Lớp</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Chung">Chung</option>
                <option value="1">Khối 1</option>
                <option value="3">Khối 3</option>
                <option value="5">Khối 5</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Thời lượng (LVĐ)</label>
              <input
                type="text"
                value={lvd}
                onChange={(e) => setLvd(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hoạt động của Giáo viên (Cột 3)</label>
            <textarea
              rows={4}
              value={gv}
              onChange={(e) => setGv(e.target.value)}
              placeholder="- GV làm mẫu 2-3 lần..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hoạt động của Học sinh (Cột 4)</label>
            <textarea
              rows={4}
              value={hs}
              onChange={(e) => setHs(e.target.value)}
              placeholder="- HS quan sát và làm theo hiệu lệnh..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" /> Lưu Kịch Bản
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
