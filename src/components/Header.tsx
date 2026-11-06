import React from 'react';
import { SchoolSettings } from '../types/gdtc';
import {
  Activity,
  User,
  RotateCcw,
  ScanLine,
  Images,
  FileText,
  Library,
  Wand2,
  Printer,
  Calendar,
  Grid,
  Users,
  BookOpen,
  Upload,
  Settings
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  imageCount: number;
  schoolSettings: SchoolSettings;
  onOpenSettings: () => void;
  onResetData: () => void;
  onOpenImport: () => void;
  onOpenFormationStudio: () => void;
  onOpenFormationLibrary: () => void;
  onOpenPpctManager: () => void;
  currentWeek: number;
  onSelectCurrentWeek: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  imageCount,
  schoolSettings,
  onOpenSettings,
  onResetData,
  onOpenImport,
  onOpenFormationStudio,
  onOpenFormationLibrary,
  onOpenPpctManager,
  currentWeek,
  onSelectCurrentWeek,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between py-3 gap-3 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-md flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg text-slate-900 tracking-tight">SmartPlan GDTC Pro</h1>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-md">GDPT 2018</span>
              </div>
              <p className="text-xs text-slate-500">Bóc tách ảnh SGK · Thư viện kịch bản · Sinh kế hoạch bài dạy chuẩn</p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onSelectCurrentWeek}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              TUẦN HIỆN HÀNH ({currentWeek})
            </button>

            <button
              onClick={onOpenFormationLibrary}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
            >
              <Grid className="w-3.5 h-3.5" />
              Kho Sơ Đồ
            </button>

            <button
              onClick={onOpenFormationStudio}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
            >
              <Users className="w-3.5 h-3.5" />
              Studio Đội Hình
            </button>

            <button
              onClick={onOpenPpctManager}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              PPCT 3 Khối
            </button>

            <button
              onClick={onOpenImport}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              Nạp File Giáo Án
            </button>

            <button
              onClick={onOpenSettings}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition flex items-center gap-1.5"
              title="Thông tin trường học & Giáo viên"
            >
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-semibold uppercase truncate max-w-[150px]">{schoolSettings.teacherName || 'LÊ QUỐC HƯNG'}</span>
              <span className="text-slate-400">· {schoolSettings.schoolName}</span>
              <Settings className="w-3 h-3 text-slate-400 ml-1" />
            </button>

            <button
              onClick={onResetData}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
              title="Khôi phục dữ liệu gốc"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6 Tabs Navigation */}
        <nav className="flex space-x-6 -mb-px overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('tab-scan')}
            className={`py-2.5 px-1 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'tab-scan'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ScanLine className="w-4 h-4" /> 1. Quét & Bóc Tách SGK
          </button>

          <button
            onClick={() => setActiveTab('tab-img-library')}
            className={`py-2.5 px-1 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'tab-img-library'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Images className="w-4 h-4" /> 2. Thư Viện Ảnh ({imageCount})
          </button>

          <button
            onClick={() => setActiveTab('tab-extract')}
            className={`py-2.5 px-1 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'tab-extract'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" /> 3. Giáo Án Mẫu & Sửa Trực Tiếp
          </button>

          <button
            onClick={() => setActiveTab('tab-library')}
            className={`py-2.5 px-1 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'tab-library'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Library className="w-4 h-4" /> 4. Thư Viện Kịch Bản
          </button>

          <button
            onClick={() => setActiveTab('tab-generator')}
            className={`py-2.5 px-1 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'tab-generator'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wand2 className="w-4 h-4" /> 5. Sinh Giáo Án Tuần Mới
          </button>

          <button
            onClick={() => setActiveTab('tab-export')}
            className={`py-2.5 px-1 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'tab-export'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Printer className="w-4 h-4" /> 6. Xem Trước & In
          </button>
        </nav>
      </div>
    </header>
  );
};
