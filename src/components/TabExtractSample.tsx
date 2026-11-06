import React from 'react';
import { MasterPlanItem, masterPlansTuan8 } from '../data/masterTemplateTuan8';
import { SgkImageItem } from '../types/gdtc';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TabExtractSampleProps {
  currentMasterPlan: MasterPlanItem;
  setCurrentMasterPlan: (plan: MasterPlanItem) => void;
  userImages: SgkImageItem[];
  onApplyMasterToGenerator: (plan: MasterPlanItem) => void;
  showToast: (msg: string) => void;
}

export const TabExtractSample: React.FC<TabExtractSampleProps> = ({
  currentMasterPlan,
  setCurrentMasterPlan,
  onApplyMasterToGenerator,
  showToast,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            3. Giáo Án Mẫu & Sửa Trực Tiếp (Khung GDPT 2018 Chuẩn)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Xem và chỉnh sửa trực tiếp cấu trúc giáo án mẫu 4 cột chuẩn Bộ GD&ĐT, sẵn sàng chuyển giao sang Trình sinh bài giảng tuần mới.
          </p>
        </div>

        <button
          onClick={() => onApplyMasterToGenerator(currentMasterPlan)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
        >
          <span>Chuyển sang Sinh Giáo Án Tuần Mới</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Plan Details Preview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="border-b pb-4">
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold uppercase">
            Khối {currentMasterPlan.grade} · Tiết {currentMasterPlan.lessonNum} · Tuần {currentMasterPlan.week}
          </span>
          <h3 className="font-extrabold text-base text-slate-900 mt-2">{currentMasterPlan.title}</h3>
          <p className="text-xs text-slate-500">{currentMasterPlan.topic}</p>
        </div>

        {/* 4-Column Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase">
              <tr>
                <th className="p-3 w-1/4 border-r border-slate-200">1. Nội Dung / Kỹ Thuật</th>
                <th className="p-3 w-20 text-center border-r border-slate-200">2. LVĐ</th>
                <th className="p-3 w-1/3 border-r border-slate-200">3. Hoạt Động Của Giáo Viên</th>
                <th className="p-3 w-1/3">4. Hoạt Động Của Học Sinh / Sơ Đồ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {currentMasterPlan.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="p-3 border-r border-slate-200 align-top whitespace-pre-line font-medium text-slate-800">
                    {row.content}
                    {row.contentImgUrl && (
                      <div className="mt-2 p-1 bg-white border border-slate-200 rounded-lg inline-block">
                        <img src={row.contentImgUrl} alt={row.contentImgTitle || ''} className="max-h-20 object-contain" />
                        <span className="text-[10px] text-slate-500 block text-center mt-0.5">{row.contentImgTitle}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3 border-r border-slate-200 align-top text-center text-slate-600 font-semibold whitespace-pre-line">
                    {row.lvd}
                  </td>
                  <td className="p-3 border-r border-slate-200 align-top text-slate-700 leading-relaxed whitespace-pre-line">
                    {row.gv}
                  </td>
                  <td className="p-3 align-top text-slate-700 leading-relaxed whitespace-pre-line">
                    {row.hs}
                    {row.hsImgUrl && (
                      <div className="mt-2 p-1 bg-white border border-slate-200 rounded-lg inline-block">
                        <img src={row.hsImgUrl} alt={row.hsImgTitle || ''} className="max-h-20 object-contain" />
                        <span className="text-[10px] text-slate-500 block text-center mt-0.5">{row.hsImgTitle}</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
