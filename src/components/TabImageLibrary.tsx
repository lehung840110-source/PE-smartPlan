import React, { useState } from 'react';
import { SgkImageItem } from '../types/gdtc';
import { sgkCurriculumTree } from '../data/sgkCurriculumTree';
import {
  Images,
  Search,
  Sparkles,
  Eraser,
  PlusCircle,
  FolderOpen,
  LayoutGrid,
  ListTree,
  BookOpen,
  Folder,
  Layers,
  ChevronRight,
  Download,
  RefreshCw,
  FileJson,
  Trash2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface TabImageLibraryProps {
  images: SgkImageItem[];
  setImages: React.Dispatch<React.SetStateAction<SgkImageItem[]>>;
  onOpenSelectCellModal: (image: SgkImageItem) => void;
  onAnalyzeVision: (image: SgkImageItem) => void;
  onOpenSmartClean: (image: SgkImageItem) => void;
  showToast: (msg: string) => void;
  onSync109Images?: () => void;
}

export const TabImageLibrary: React.FC<TabImageLibraryProps> = ({
  images,
  setImages,
  onOpenSelectCellModal,
  onAnalyzeVision,
  onOpenSmartClean,
  showToast,
  onSync109Images,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'byLesson' | 'grid'>('byLesson');

  // Count by grade
  const g1Count = images.filter((i) => String(i.grade) === '1').length;
  const g3Count = images.filter((i) => String(i.grade) === '3').length;
  const g5Count = images.filter((i) => String(i.grade) === '5').length;

  const handleCleanDuplicates = () => {
    const seen = new Set<string>();
    const cleaned: SgkImageItem[] = [];
    images.forEach((img) => {
      const key = `${img.grade}_${img.title.toLowerCase().trim()}`;
      if (!seen.has(key) && !seen.has(img.id)) {
        seen.add(key);
        seen.add(img.id);
        cleaned.push(img);
      }
    });
    const removed = images.length - cleaned.length;
    if (removed > 0) {
      setImages(cleaned);
      showToast(`🧹 Đã dọn dẹp ${removed} ảnh trùng lặp!`);
    } else {
      showToast('✨ Thư viện rất gọn gàng, không có ảnh trùng lặp!');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(images, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `gdtc_109_sgk_images_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('💾 Đã xuất file JSON toàn bộ thư viện ảnh thành công!');
  };

  // Filter images based on top controls
  const filteredImages = images.filter((img) => {
    if (selectedGrade !== 'all' && String(img.grade) !== selectedGrade) return false;
    if (selectedCategory !== 'all' && img.category !== selectedCategory) return false;
    if (selectedLessonFilter !== 'all') {
      const matchLesson = (img.lessonId === selectedLessonFilter) ||
        (img.lessonTitle && img.lessonTitle.toLowerCase().includes(selectedLessonFilter.toLowerCase())) ||
        (img.title && img.title.toLowerCase().includes(selectedLessonFilter.toLowerCase()));
      if (!matchLesson) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (img.title || '').toLowerCase().includes(q);
      const matchCaption = (img.caption || '').toLowerCase().includes(q);
      if (!matchTitle && !matchCaption) return false;
    }
    return true;
  });

  // Group images by Lesson for "byLesson" mode
  const lessonsToDisplay = sgkCurriculumTree.filter((l) => {
    if (selectedGrade !== 'all' && String(l.grade) !== selectedGrade) return false;
    if (selectedLessonFilter !== 'all' && l.id !== selectedLessonFilter) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Alert Banner if less than 109 images */}
      {images.length < 109 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-900">
                Thư viện trên máy hiện có {images.length} ảnh (ít hơn chuẩn 109 ảnh: Khối 1: 26, Khối 3: 46, Khối 5: 37).
              </p>
              <p className="text-[11px] text-amber-700">
                Nhấn vào nút bên cạnh để nạp tự động trọn bộ 109 ảnh SGK chuẩn GDPT 2018 lưu vào máy.
              </p>
            </div>
          </div>
          {onSync109Images && (
            <button
              onClick={onSync109Images}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              Đồng Bộ Ngay 109 Ảnh Chuẩn
            </button>
          )}
        </div>
      )}

      {/* Top Banner Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Images className="w-5 h-5 text-blue-600" />
              2. Thư Viện Ảnh Theo Cây Thư Mục ({filteredImages.length}/{images.length} ảnh)
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Lưu trữ IndexedDB
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Phân loại nghiêm ngặt: <strong className="text-slate-700">Khối lớp &gt; Chủ đề &gt; Bài học &gt; Động tác kỹ thuật &gt; Luyện tập &gt; Trò chơi</strong>
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {onSync109Images && (
            <button
              onClick={onSync109Images}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              title="Khôi phục hoặc nạp đủ 109 ảnh SGK chuẩn"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Đồng Bộ 109 Ảnh SGK
            </button>
          )}

          <button
            onClick={handleExportJson}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200"
            title="Xuất file JSON sao lưu toàn bộ thư viện ảnh"
          >
            <FileJson className="w-3.5 h-3.5 text-blue-600" />
            Xuất JSON
          </button>

          <a
            href="/gdtc_109_images_backup.json"
            download="gdtc_109_images_backup.json"
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-emerald-200"
            title="Tải trực tiếp file sao lưu 109 ảnh SGK chuẩn"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            Tải Bản Backup 109 Ảnh
          </a>

          <button
            onClick={handleCleanDuplicates}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200"
            title="Dọn dẹp ảnh trùng lặp"
          >
            <Eraser className="w-3.5 h-3.5 text-amber-600" />
            Dọn Trùng Lặp
          </button>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 ml-1">
            <button
              onClick={() => setViewMode('byLesson')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'byLesson'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListTree className="w-3.5 h-3.5" /> Theo Đơn Vị Bài
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Lưới Toàn Bộ
            </button>
          </div>
        </div>
      </div>

      {/* Grade Quick Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Chọn Khối Lớp:
        </span>
        <button
          onClick={() => { setSelectedGrade('all'); setSelectedLessonFilter('all'); }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
            selectedGrade === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          Tất Cả Khối ({images.length})
        </button>
        <button
          onClick={() => { setSelectedGrade('1'); setSelectedLessonFilter('all'); }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
            selectedGrade === '1'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          Khối 1 ({g1Count})
        </button>
        <button
          onClick={() => { setSelectedGrade('3'); setSelectedLessonFilter('all'); }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
            selectedGrade === '3'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          Khối 3 ({g3Count})
        </button>
        <button
          onClick={() => { setSelectedGrade('5'); setSelectedLessonFilter('all'); }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
            selectedGrade === '5'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          Khối 5 ({g5Count})
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên động tác, chủ đề, bài học, lượng vận động..."
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Grade Selector */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold text-slate-500">Khối:</span>
          <select
            value={selectedGrade}
            onChange={(e) => {
              setSelectedGrade(e.target.value);
              setSelectedLessonFilter('all');
            }}
            className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs bg-white font-medium"
          >
            <option value="all">Tất cả Khối ({images.length})</option>
            <option value="1">Khối 1 ({g1Count})</option>
            <option value="3">Khối 3 ({g3Count})</option>
            <option value="5">Khối 5 ({g5Count})</option>
          </select>
        </div>

        {/* Lesson Filter */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold text-slate-500">Đơn vị bài:</span>
          <select
            value={selectedLessonFilter}
            onChange={(e) => setSelectedLessonFilter(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs bg-white font-medium max-w-[260px] truncate"
          >
            <option value="all">Tất cả Bài học</option>
            {sgkCurriculumTree
              .filter((l) => selectedGrade === 'all' || String(l.grade) === selectedGrade)
              .map((l) => (
                <option key={l.id} value={l.id}>
                  Khối {l.grade}: {l.lessonName}
                </option>
              ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold text-slate-500">Thể loại:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs bg-white font-medium"
          >
            <option value="all">Tất cả Thể loại</option>
            <option value="tro_choi_khoi_dong">Trò chơi khởi động</option>
            <option value="dong_tac">Động tác kỹ thuật</option>
            <option value="tap_luyen">Hình ảnh luyện tập</option>
            <option value="tro_choi">Trò chơi vận động</option>
            <option value="van_dung">Vận dụng & Đời sống</option>
          </select>
        </div>
      </div>

      {/* VIEW MODE 1: THEO ĐƠN VỊ BÀI HỌC (GROUPED BY LESSON UNIT) */}
      {viewMode === 'byLesson' ? (
        <div className="space-y-6">
          {lessonsToDisplay.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
              Không tìm thấy bài học nào phù hợp với bộ lọc hiện tại.
            </div>
          ) : (
            lessonsToDisplay.map((lesson) => {
              // Find images that belong to this lesson
              const lessonImgs = filteredImages.filter(
                (img) => String(img.grade) === String(lesson.grade) &&
                  (img.lessonId === lesson.id ||
                   (img.title && img.title.toLowerCase().includes(lesson.lessonName.toLowerCase().slice(0, 15))))
              );

              // Sub-group into 4 standardized categories
              const warmupImgs = lessonImgs.filter(
                (i) => i.category === 'tro_choi_khoi_dong' || i.folder === 'khoiDong' || (i.title && i.title.toLowerCase().includes('khởi động'))
              );
              const movementImgs = lessonImgs.filter(
                (i) => i.category === 'dong_tac' || i.folder === 'kyThuat' || (!warmupImgs.includes(i) && i.category !== 'tro_choi' && i.category !== 'tap_luyen')
              );
              const practiceImgs = lessonImgs.filter(
                (i) => i.category === 'tap_luyen' || i.folder === 'luyenTap'
              );
              const gameAndApplyImgs = lessonImgs.filter(
                (i) => i.category === 'tro_choi' || i.category === 'van_dung' || i.folder === 'vanDung'
              );

              return (
                <div key={lesson.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  {/* Lesson Header */}
                  <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        K{lesson.grade}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                          {lesson.topic} • {lesson.weekRange || `Trang ${lesson.startPage} - ${lesson.endPage}`}
                        </span>
                        <h3 className="font-extrabold text-slate-900 text-sm">
                          {lesson.lessonName}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg text-[11px]">
                        {lessonImgs.length} hình ảnh bóc tách
                      </span>
                    </div>
                  </div>

                  {/* Lesson Sub-sections */}
                  <div className="p-5 space-y-6">
                    {/* 1. Ảnh Khởi động */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2.5">
                        <Folder className="w-3.5 h-3.5 text-amber-500" />
                        1. Ảnh Khởi Động & Trò Chơi Bổ Trợ Khởi Động ({warmupImgs.length})
                      </h4>
                      {warmupImgs.length === 0 ? (
                        <p className="text-[11px] text-slate-400 italic pl-5">Chưa có ảnh khởi động cho bài này.</p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {warmupImgs.map((img) => renderImageCard(img))}
                        </div>
                      )}
                    </div>

                    {/* 2. Ảnh Kỹ thuật Động tác */}
                    <div className="border-t border-slate-100 pt-4">
                      <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2.5">
                        <Folder className="w-3.5 h-3.5 text-blue-500" />
                        2. Ảnh Kỹ Thuật Động Tác Chuẩn SGK ({movementImgs.length})
                      </h4>
                      {movementImgs.length === 0 ? (
                        <p className="text-[11px] text-slate-400 italic pl-5">Chưa có ảnh động tác kỹ thuật.</p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {movementImgs.map((img) => renderImageCard(img))}
                        </div>
                      )}
                    </div>

                    {/* 3. Ảnh Luyện tập */}
                    {practiceImgs.length > 0 && (
                      <div className="border-t border-slate-100 pt-4">
                        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2.5">
                          <Folder className="w-3.5 h-3.5 text-emerald-500" />
                          3. Ảnh Luyện Tập (Cá nhân, Cặp đôi, Tổ nhóm) ({practiceImgs.length})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {practiceImgs.map((img) => renderImageCard(img))}
                        </div>
                      </div>
                    )}

                    {/* 4. Trò chơi vận động & Vận dụng */}
                    {gameAndApplyImgs.length > 0 && (
                      <div className="border-t border-slate-100 pt-4">
                        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2.5">
                          <Folder className="w-3.5 h-3.5 text-purple-500" />
                          4. Trò Chơi Vận Động & Vận Dụng Đời Sống ({gameAndApplyImgs.length})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {gameAndApplyImgs.map((img) => renderImageCard(img))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* VIEW MODE 2: LƯỚI TOÀN BỘ (FLAT GRID) */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredImages.map((img) => renderImageCard(img))}
        </div>
      )}
    </div>
  );

  // Helper render card for an image
  function renderImageCard(img: SgkImageItem) {
    return (
      <div
        key={img.id}
        className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
      >
        <div>
          <div className="relative bg-slate-50 rounded-xl p-2 mb-2 flex items-center justify-center min-h-[125px] border border-slate-100 overflow-hidden">
            <img
              src={img.imgUrl}
              alt={img.title}
              className="max-h-24 object-contain transition duration-200 group-hover:scale-105"
            />
            <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-slate-900/70 text-white text-[9px] font-bold rounded-md">
              K{img.grade}
            </span>
            {img.page && (
              <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded-md">
                P.{img.page}
              </span>
            )}
          </div>
          <h4 className="font-bold text-slate-800 text-[11px] line-clamp-2 leading-tight mb-1" title={img.title}>
            {img.title}
          </h4>
          <p className="text-[10px] text-slate-500 line-clamp-1">{img.caption}</p>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1">
          <button
            onClick={() => onOpenSelectCellModal(img)}
            className="w-full py-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-[10px] font-semibold transition flex items-center justify-center gap-1"
          >
            <PlusCircle className="w-3 h-3" /> Chèn Vào Kế Hoạch
          </button>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => onAnalyzeVision(img)}
              className="py-1 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-lg text-[9px] font-medium transition flex items-center justify-center gap-0.5"
            >
              <Sparkles className="w-2.5 h-2.5" /> AI Vision
            </button>
            <button
              onClick={() => onOpenSmartClean(img)}
              className="py-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-lg text-[9px] font-medium transition flex items-center justify-center gap-0.5"
            >
              <Eraser className="w-2.5 h-2.5" /> Làm sạch
            </button>
          </div>
        </div>
      </div>
    );
  }
};
