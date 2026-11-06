import React, { useState, useRef, useEffect } from 'react';
import { SgkImageItem, SubFolderType, ImageCategory } from '../types/gdtc';
import { sgkCurriculumTree, SgkLessonFolder, SgkLessonMovement } from '../data/sgkCurriculumTree';
import {
  Upload,
  Sparkles,
  Wand2,
  Image as ImageIcon,
  CheckCircle,
  Crop,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Info,
  Check,
  Eraser,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TabScanProps {
  onImageExtracted: (item: SgkImageItem) => void;
  onNavigateToGallery: () => void;
  onAnalyzeVision: (item: SgkImageItem) => void;
  onOpenSmartClean: (item: SgkImageItem) => void;
  existingImages?: SgkImageItem[];
}

export const TabScan: React.FC<TabScanProps> = ({
  onImageExtracted,
  onNavigateToGallery,
  onAnalyzeVision,
  onOpenSmartClean,
  existingImages = [],
}) => {
  // Navigation & Tree Selection
  const [selectedGrade, setSelectedGrade] = useState<1 | 3 | 5>(5);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('k5_chude2_bai2');
  const [selectedFolder, setSelectedFolder] = useState<SubFolderType>('kyThuat');
  const [selectedMovementName, setSelectedMovementName] = useState<string>('Động tác Bụng với gậy (Gập thân...)');
  const [currentPage, setCurrentPage] = useState<number>(29);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Custom Uploaded Page Image
  const [customPageUrl, setCustomPageUrl] = useState<string | null>(null);

  // Selection & Crop Coordinates
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [selectionRect, setSelectionRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [cropPreviewUrl, setCropPreviewUrl] = useState<string | null>(null);

  // Form Fields for Right Sidebar
  const [movementTitle, setMovementTitle] = useState<string>('Trò chơi bổ trợ khởi động: Đội nào nhanh nhất (Trang 29 SGK GDTC 5)');
  const [category, setCategory] = useState<ImageCategory>('tro_choi_khoi_dong');
  const [caption, setCaption] = useState<string>('Trò chơi khởi động phản xạ với gậy thể dục theo đúng hướng dẫn SGK GDTC 5 Trang 29.');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const imgElementRef = useRef<HTMLImageElement>(null);

  // Find active lesson
  const activeLesson = sgkCurriculumTree.find((l) => l.id === selectedLessonId) || sgkCurriculumTree[1];

  // Resolve page background image
  const resolvedPageImage = customPageUrl ||
    (activeLesson.defaultPageImages && activeLesson.defaultPageImages[currentPage]) ||
    (currentPage === 29 ? '/assets/sgk_chuan/k5_tro_choi_doi_nao_nhanh_nhat.jpg' :
     currentPage === 30 || currentPage === 31 ? '/assets/sgk_chuan/k5_van_minh_toan_than_gay.jpg' :
     currentPage === 26 || currentPage === 27 ? '/assets/sgk_chuan/k5_chuyen_gay_tiep_suc.jpg' :
     currentPage === 25 ? '/assets/extracted_sgk/tuan8_img_0.jpg' :
     '/assets/sgk_chuan/k5_tro_choi_doi_nao_nhanh_nhat.jpg');

  // Handle lesson selection
  const handleSelectLesson = (lesson: SgkLessonFolder) => {
    setSelectedGrade(lesson.grade);
    setSelectedLessonId(lesson.id);
    setCurrentPage(lesson.startPage);
    if (lesson.subMovements && lesson.subMovements.length > 0) {
      const first = lesson.subMovements[0];
      setSelectedMovementName(first.name);
      setMovementTitle(`${first.name} - ${lesson.lessonName}`);
      setCaption(first.desc);
    }
  };

  // Handle subfolder selection
  const handleSelectSubFolder = (folder: SubFolderType, pageNum?: number) => {
    setSelectedFolder(folder);
    if (pageNum) setCurrentPage(pageNum);
    if (folder === 'khoiDong' || folder === 'troChoiKhoiDong') {
      setCategory('tro_choi_khoi_dong');
      setMovementTitle('Trò chơi bổ trợ khởi động: Đội nào nhanh nhất (Trang 29 SGK GDTC 5)');
      setCaption('Trò chơi khởi động phản xạ với gậy thể dục theo đúng hướng dẫn SGK GDTC 5 Trang 29.');
      setCurrentPage(29);
    } else if (folder === 'kyThuat') {
      setCategory('dong_tac');
      setMovementTitle('Động tác Bụng với gậy (Trang 30 SGK GDTC 5)');
      setCaption('Hai tay cầm hai đầu gậy đưa thẳng lên cao, cúi gập thân đưa gậy chạm sát mu bàn chân.');
      setCurrentPage(30);
    } else if (folder === 'luyenTap') {
      setCategory('tap_luyen');
      setMovementTitle('Sơ đồ Luyện tập nhóm / Cặp đôi với gậy');
      setCaption('Đội hình luyện tập phối hợp đồng đội tích cực.');
      setCurrentPage(29);
    } else {
      setCategory('van_dung');
      setMovementTitle('Vận dụng thể dục với gậy vào đời sống');
      setCaption('Rèn luyện sức khỏe hằng ngày với gậy thể dục.');
      setCurrentPage(33);
    }
  };

  // Handle sub-movement click
  const handleSelectMovement = (mov: SgkLessonMovement) => {
    setSelectedMovementName(mov.name);
    setCurrentPage(mov.page);
    setMovementTitle(`${mov.name} - Khối ${selectedGrade} (Trang ${mov.page})`);
    setCaption(mov.desc);
    if (mov.name.toLowerCase().includes('trò chơi')) {
      setSelectedFolder('khoiDong');
      setCategory('tro_choi_khoi_dong');
    } else {
      setSelectedFolder('kyThuat');
      setCategory('dong_tac');
    }
  };

  // Mouse drag selection logic on page container
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pageContainerRef.current) return;
    const rect = pageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsSelecting(true);
    setStartPos({ x, y });
    setSelectionRect({ x, y, w: 0, h: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelecting || !startPos || !pageContainerRef.current) return;
    const rect = pageContainerRef.current.getBoundingClientRect();
    const currentX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const currentY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const x = Math.min(startPos.x, currentX);
    const y = Math.min(startPos.y, currentY);
    const w = Math.abs(currentX - startPos.x);
    const h = Math.abs(currentY - startPos.y);

    setSelectionRect({ x, y, w, h });
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);

    // If selection is large enough (> 25px), generate canvas crop preview
    if (selectionRect && selectionRect.w > 25 && selectionRect.h > 25 && imgElementRef.current) {
      try {
        const img = imgElementRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const naturalW = img.naturalWidth || img.width;
          const naturalH = img.naturalHeight || img.height;
          const scaleX = naturalW / img.clientWidth;
          const scaleY = naturalH / img.clientHeight;

          canvas.width = selectionRect.w * scaleX;
          canvas.height = selectionRect.h * scaleY;

          ctx.drawImage(
            img,
            selectionRect.x * scaleX,
            selectionRect.y * scaleY,
            selectionRect.w * scaleX,
            selectionRect.h * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
          );
          setCropPreviewUrl(canvas.toDataURL('image/jpeg', 0.92));
        }
      } catch (err) {
        console.warn('Canvas crop fallback:', err);
        setCropPreviewUrl(resolvedPageImage);
      }
    }
  };

  // Save extracted image
  const handleSaveToGallery = () => {
    const finalImgUrl = cropPreviewUrl || resolvedPageImage;
    const newItem: SgkImageItem = {
      id: `sgk_ext_${Date.now()}`,
      title: movementTitle || `Động tác Trang ${currentPage} SGK GDTC ${selectedGrade}`,
      grade: String(selectedGrade),
      topicId: activeLesson.topic,
      topicTitle: activeLesson.topic,
      lessonId: activeLesson.id,
      lessonTitle: activeLesson.lessonName,
      folder: selectedFolder,
      page: currentPage,
      category,
      imgUrl: finalImgUrl,
      caption: caption || `Hình ảnh bóc tách từ SGK GDTC Khối ${selectedGrade} Trang ${currentPage}`,
      selected: false,
      createdAt: Date.now()
    };

    onImageExtracted(newItem);
    setSaveSuccessMsg(`Đã lưu "${newItem.title}" vào Thư Viện Ảnh thành công!`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Upload custom file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCustomPageUrl(reader.result as string);
      setMovementTitle(`Ảnh SGK: ${file.name.replace(/\.[^/.]+$/, '')}`);
    };
    reader.readAsDataURL(file);
  };

  // Filter lessons for selected grade
  const gradeLessons = sgkCurriculumTree.filter((l) => l.grade === selectedGrade);

  // Filter images for active lesson
  const lessonImages = existingImages.filter(
    (i) => String(i.grade) === String(selectedGrade) &&
      (i.lessonId === activeLesson.id || (i.title && i.title.toLowerCase().includes(activeLesson.lessonName.toLowerCase().slice(0, 15))))
  );

  return (
    <div className="space-y-4">
      {/* Top Banner Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              1. Quét & Bóc Tách SGK Theo Đơn Vị Bài Học (GDPT 2018)
            </h2>
            <p className="text-xs text-slate-500">
              Duyệt theo cây bài học, rê chuột kéo chọn vùng động tác trực tiếp trên trang sách và lưu vào thư viện chuẩn.
            </p>
          </div>
        </div>

        {/* Grade Selector & Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {([1, 3, 5] as const).map((g) => (
              <button
                key={g}
                onClick={() => {
                  setSelectedGrade(g);
                  const firstOfGrade = sgkCurriculumTree.find((l) => l.grade === g);
                  if (firstOfGrade) handleSelectLesson(firstOfGrade);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedGrade === g
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Khối {g}
              </button>
            ))}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,application/pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-300 shadow-xs"
          >
            <Upload className="w-3.5 h-3.5" /> Mở File SGK
          </button>
          <button
            onClick={onNavigateToGallery}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
          >
            Thư Viện Ảnh ({existingImages.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3-Column Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* COLUMN 1: CÂY THƯ MỤC SGK THEO ĐƠN VỊ BÀI (Width ~ 3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-3">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 uppercase tracking-wide">
              <FolderOpen className="w-3.5 h-3.5 text-blue-600" />
              Cây Thư Mục SGK (Khối {selectedGrade})
            </h3>
            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
              GDPT 2018
            </span>
          </div>

          <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
            {gradeLessons.map((lesson) => {
              const isLessonActive = selectedLessonId === lesson.id;
              return (
                <div
                  key={lesson.id}
                  className={`rounded-xl border transition ${
                    isLessonActive
                      ? 'border-blue-400 bg-blue-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Topic Title */}
                  <div className="px-3 pt-2.5 pb-1">
                    <span className="text-[10px] font-bold text-blue-700 tracking-wider block uppercase">
                      {lesson.topic}
                    </span>
                    <button
                      onClick={() => handleSelectLesson(lesson)}
                      className="text-left font-bold text-xs text-slate-900 hover:text-blue-600 mt-0.5 flex items-start gap-1"
                    >
                      <Folder className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                      <span>{lesson.lessonName}</span>
                    </button>
                  </div>

                  {/* Subfolders for this lesson */}
                  {isLessonActive && (
                    <div className="px-3 pb-3 pt-1 space-y-1 text-xs">
                      {/* 1. Ảnh Khởi động */}
                      <button
                        onClick={() => handleSelectSubFolder('khoiDong', lesson.startPage)}
                        className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition ${
                          selectedFolder === 'khoiDong'
                            ? 'bg-blue-600 text-white font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Folder className="w-3.5 h-3.5" /> 1. Ảnh Khởi động
                        </span>
                        <span className="text-[10px] opacity-80">P.{lesson.startPage}</span>
                      </button>

                      {/* 2. Ảnh Kỹ thuật Động tác (With Movements Tree) */}
                      <div className="space-y-0.5">
                        <button
                          onClick={() => handleSelectSubFolder('kyThuat', lesson.startPage + 1)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition ${
                            selectedFolder === 'kyThuat'
                              ? 'bg-blue-600 text-white font-bold'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Folder className="w-3.5 h-3.5" /> 2. Ảnh Kỹ thuật Động tác
                          </span>
                          <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-bold">
                            ({lesson.movements.length})
                          </span>
                        </button>

                        {/* Nested Movements List */}
                        <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-blue-200 ml-3">
                          {lesson.subMovements.map((mov) => {
                            const isMovActive = selectedMovementName === mov.name;
                            return (
                              <button
                                key={mov.name}
                                onClick={() => handleSelectMovement(mov)}
                                className={`w-full text-left px-2 py-1 rounded-md text-[11px] flex items-center justify-between transition ${
                                  isMovActive
                                    ? 'bg-blue-100 text-blue-900 font-bold'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                <span className="truncate pr-1">• {mov.name}</span>
                                <span className="text-[10px] text-slate-400 shrink-0">P.{mov.page}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3. Ảnh Luyện tập */}
                      <button
                        onClick={() => handleSelectSubFolder('luyenTap', lesson.startPage)}
                        className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition ${
                          selectedFolder === 'luyenTap'
                            ? 'bg-blue-600 text-white font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Folder className="w-3.5 h-3.5" /> 3. Ảnh Luyện tập (Tổ, Cặp)
                        </span>
                        <span className="text-[10px] opacity-80">P.{lesson.startPage}</span>
                      </button>

                      {/* 4. Ảnh Vận dụng & Đời sống */}
                      <button
                        onClick={() => handleSelectSubFolder('vanDung', lesson.endPage)}
                        className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition ${
                          selectedFolder === 'vanDung'
                            ? 'bg-blue-600 text-white font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Folder className="w-3.5 h-3.5" /> 4. Ảnh Vận dụng & Đời sống
                        </span>
                        <span className="text-[10px] opacity-80">P.{lesson.endPage}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: KHUNG HIỂN THỊ TRANG SÁCH & RÊ CHUỘT BÓC TÁCH (Width ~ 6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-700 p-3 shadow-md flex flex-col">
          {/* Viewer Top Controls */}
          <div className="bg-slate-800/90 text-white px-3 py-2 rounded-xl mb-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-400">Trang SGK:</span>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-[11px]"
              >
                ◀ Trước
              </button>
              <span className="font-extrabold text-blue-300 px-1.5">{currentPage}</span>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-[11px]"
              >
                Sau ▶
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
                className="p-1 hover:bg-slate-700 rounded text-slate-300"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-slate-400">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(200, z + 15))}
                className="p-1 hover:bg-slate-700 rounded text-slate-300"
                title="Phóng to"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setSelectionRect(null);
                  setCropPreviewUrl(null);
                }}
                className="p-1 hover:bg-slate-700 rounded text-slate-300 ml-1"
                title="Hủy vùng chọn"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Page Container */}
          <div className="relative bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center p-2 min-h-[580px]">
            <div
              ref={pageContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="relative bg-white shadow-2xl rounded-sm cursor-crosshair select-none transition-transform duration-100 max-w-full"
            >
              {/* Authentically rendered textbook page content (e.g. Page 29 or loaded page) */}
              {currentPage === 29 && selectedGrade === 5 && !customPageUrl ? (
                <div className="w-[460px] p-6 text-slate-900 font-sans leading-relaxed text-xs border border-slate-200 bg-[#fdfdfc]">
                  {/* Textbook Header */}
                  <div className="text-[11px] text-slate-700 italic border-b pb-2 mb-3">
                    vặn mình, động tác toàn thân với gậy.
                    <div className="font-semibold text-slate-800 not-italic mt-0.5">
                      – Đoàn kết, tích cực, hỗ trợ nhau trong tập luyện; thường xuyên tập luyện thể dục thể thao.
                    </div>
                  </div>

                  {/* Section 1: Khởi động */}
                  <div className="mb-4">
                    <h4 className="font-extrabold text-orange-600 text-xs flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">1</span>
                      Khởi động
                    </h4>
                    <ul className="space-y-1 pl-4 text-slate-700 text-[11px]">
                      <li>✦ Xoay các khớp: cổ tay, cổ chân; đứng tại chỗ cúi gập thân vặn mình sang trái, sang phải.</li>
                      <li>✦ Chạy chậm theo địa hình tự nhiên.</li>
                    </ul>
                  </div>

                  {/* Section 2: Trò chơi bổ trợ khởi động (ĐỘI NÀO NHANH NHẤT - TRANG 29 SGK GDTC 5) */}
                  <div className="mb-4">
                    <h4 className="font-extrabold text-orange-600 text-xs flex items-center gap-1.5 mb-1.5">
                      <span className="w-4 h-4 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">2</span>
                      Trò chơi bổ trợ khởi động
                    </h4>
                    <p className="font-bold text-slate-900 text-xs italic mb-2">
                      Trò chơi Đội nào nhanh nhất
                    </p>

                    {/* Authentic SGK Photo Asset */}
                    <div className="rounded-xl overflow-hidden border border-slate-300 shadow-xs bg-slate-50 flex items-center justify-center">
                      <img
                        ref={imgElementRef}
                        src="/assets/sgk_chuan/k5_tro_choi_doi_nao_nhanh_nhat.jpg"
                        alt="Trò chơi Đội nào nhanh nhất - SGK GDTC 5 Trang 29"
                        className="w-full h-auto object-contain pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Page number badge */}
                  <div className="flex justify-center mt-3">
                    <span className="px-3 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-xs rounded-full shadow-xs">
                      29
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-[460px] p-4 text-slate-900 bg-[#fdfdfc] border border-slate-200">
                  <div className="text-center font-bold text-xs text-slate-800 mb-2 border-b pb-1">
                    SÁCH GIÁO KHOA GDTC KHỐI {selectedGrade} - TRANG {currentPage}
                  </div>
                  <img
                    ref={imgElementRef}
                    src={resolvedPageImage}
                    alt={`SGK Page ${currentPage}`}
                    className="w-full h-auto object-contain pointer-events-none rounded border border-slate-200"
                  />
                  <div className="flex justify-center mt-3">
                    <span className="px-3 py-0.5 bg-amber-400 text-slate-900 font-extrabold text-xs rounded-full shadow-xs">
                      {currentPage}
                    </span>
                  </div>
                </div>
              )}

              {/* Selection Box Overlay */}
              {selectionRect && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${selectionRect.x}px`,
                    top: `${selectionRect.y}px`,
                    width: `${selectionRect.w}px`,
                    height: `${selectionRect.h}px`,
                  }}
                  className="border-2 border-dashed border-blue-500 bg-blue-500/20 pointer-events-none z-20 flex items-start justify-end p-1"
                >
                  <span className="bg-blue-600 text-white text-[9px] font-bold px-1 rounded shadow-xs">
                    {Math.round(selectionRect.w)} × {Math.round(selectionRect.h)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center mt-2 italic">
            💡 Dùng chuột kéo chọn vùng động tác trên trang sách để tự động bóc tách và trích xuất.
          </p>
        </div>

        {/* COLUMN 3: THÔNG TIN BÓC TÁCH & QUẢN LÝ ẢNH ĐƠN VỊ BÀI (Width ~ 3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Extracted Details & Save Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 border-b pb-2">
              <Crop className="w-3.5 h-3.5 text-blue-600" />
              Thông Tin Vùng Bóc Tách
            </h3>

            {/* Crop Preview */}
            <div className="relative bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center justify-center min-h-[140px] overflow-hidden">
              {cropPreviewUrl ? (
                <img
                  src={cropPreviewUrl}
                  alt="Vùng cắt xem trước"
                  className="max-h-32 object-contain rounded border shadow-xs"
                />
              ) : (
                <div className="text-center p-3">
                  <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                  <p className="text-[11px] text-slate-500">
                    Chuột kéo chọn vùng động tác trên trang sách để xem trước.
                  </p>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-2 text-xs">
              <div>
                <label className="font-bold text-slate-700 text-[11px] block mb-0.5">
                  Tên Động Tác / Trò Chơi:
                </label>
                <input
                  type="text"
                  value={movementTitle}
                  onChange={(e) => setMovementTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 text-[11px] block mb-0.5">
                    Khối Lớp:
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(Number(e.target.value) as 1 | 3 | 5)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    <option value={1}>Khối 1</option>
                    <option value={3}>Khối 3</option>
                    <option value={5}>Khối 5</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 text-[11px] block mb-0.5">
                    Trang SGK:
                  </label>
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs text-center font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 text-[11px] block mb-0.5">
                  Phân Loại Thể Loại:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ImageCategory)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-medium"
                >
                  <option value="tro_choi_khoi_dong">Trò chơi bổ trợ khởi động</option>
                  <option value="dong_tac">Động tác kỹ thuật</option>
                  <option value="tap_luyen">Hình ảnh luyện tập (cá nhân/nhóm)</option>
                  <option value="tro_choi">Trò chơi vận động</option>
                  <option value="van_dung">Vận dụng & Đời sống</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 text-[11px] block mb-0.5">
                  Chú Thích Kỹ Thuật:
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-2.5 py-1 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-[11px]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-1.5 pt-1">
              <button
                onClick={handleSaveToGallery}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Check className="w-4 h-4" /> Lưu Vào Thư Viện Ảnh
              </button>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    const tempItem: SgkImageItem = {
                      id: `temp_${Date.now()}`,
                      title: movementTitle,
                      grade: String(selectedGrade),
                      page: currentPage,
                      category,
                      imgUrl: cropPreviewUrl || resolvedPageImage,
                      caption
                    };
                    onAnalyzeVision(tempItem);
                  }}
                  className="py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> AI Vision
                </button>

                <button
                  onClick={() => {
                    const tempItem: SgkImageItem = {
                      id: `temp_${Date.now()}`,
                      title: movementTitle,
                      grade: String(selectedGrade),
                      page: currentPage,
                      category,
                      imgUrl: cropPreviewUrl || resolvedPageImage,
                      caption
                    };
                    onOpenSmartClean(tempItem);
                  }}
                  className="py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1"
                >
                  <Eraser className="w-3 h-3" /> Làm Sạch Nền
                </button>
              </div>

              {saveSuccessMsg && (
                <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] rounded-lg font-medium flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  {saveSuccessMsg}
                </div>
              )}
            </div>
          </div>

          {/* Existing Images for this lesson unit */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <h4 className="font-bold text-slate-800 text-xs flex items-center justify-between border-b pb-2 mb-2">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                Ảnh Trong Đơn Vị Bài Này ({lessonImages.length})
              </span>
            </h4>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {lessonImages.length === 0 ? (
                <p className="text-[11px] text-slate-400 text-center py-4">
                  Chưa có ảnh nào được gắn trực tiếp cho bài học này.
                </p>
              ) : (
                lessonImages.map((img) => (
                  <div
                    key={img.id}
                    className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white flex items-center gap-2.5 transition"
                  >
                    <img
                      src={img.imgUrl}
                      alt={img.title}
                      className="w-12 h-12 object-contain bg-white rounded-lg border p-0.5 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-[11px] truncate">
                        {img.title}
                      </p>
                      <p className="text-[10px] text-slate-500">Trang {img.page || 29} • Khối {img.grade}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
