import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { TabScan } from './components/TabScan';
import { TabImageLibrary } from './components/TabImageLibrary';
import { TabExtractSample } from './components/TabExtractSample';
import { TabScenarioLibrary } from './components/TabScenarioLibrary';
import { TabGenerator } from './components/TabGenerator';
import { TabExportPrint } from './components/TabExportPrint';
import { SettingsModal } from './components/SettingsModal';
import { SelectCellModal } from './components/SelectCellModal';
import { ScenarioModal } from './components/ScenarioModal';
import { VisionAnalysisModal, VisionAnalysisResult } from './components/VisionAnalysisModal';
import { ImportLessonModal } from './components/ImportLessonModal';
import { SmartCleanModal } from './components/SmartCleanModal';
import { FormationStudioModal } from './components/FormationStudioModal';
import { SelectFormationModal } from './components/SelectFormationModal';
import { FormationDiagram, saveCustomFormationToStorage } from './data/formationDiagrams';
import { ParsedLessonFileResult } from './utils/documentParser';
import {
  defaultSchoolSettings,
  defaultScenarios,
  defaultSgkImages,
  initialLessonsData,
} from './data/defaultData';
import { MasterPlanItem, masterPlansTuan8, normalizeMasterPlan } from './data/masterTemplateTuan8';
import { masterPlansTuan9 } from './data/masterTemplateTuan9';
import { masterPlansTuan10 } from './data/masterTemplateTuan10';
import { SgkImageItem, ScenarioItem, SchoolSettings, LessonRow } from './types/gdtc';
import {
  getAllImagesDB,
  saveImagesDB,
  getAllScenariosDB,
  saveScenariosDB,
  getAppStateDB,
  setAppStateDB,
  clearImagesDB,
} from './utils/db';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('tab-export');

  // IndexedDB-backed State
  const [images, setImages] = useState<SgkImageItem[]>(defaultSgkImages);
  const [scenarios, setScenarios] = useState<ScenarioItem[]>(defaultScenarios);
  const [schoolSettings, setSchoolSettings] = useState<SchoolSettings>(defaultSchoolSettings);
  const [currentMasterPlan, setCurrentMasterPlan] = useState<MasterPlanItem>(masterPlansTuan10.k1_t19);
  // Synchronized All-Grades Master Plans Dictionary (K1, K3, K5 across weeks)
  const [allMasterPlans, setAllMasterPlans] = useState<Record<string, MasterPlanItem>>(() => {
    return {
      ...JSON.parse(JSON.stringify(masterPlansTuan8)),
      ...JSON.parse(JSON.stringify(masterPlansTuan9)),
      ...JSON.parse(JSON.stringify(masterPlansTuan10))
    };
  });

  // Generator Plan State
  const [week, setWeek] = useState<number>(10);
  const [grade, setGrade] = useState<number>(1);
  const [lessonNum, setLessonNum] = useState<number>(19);
  const [topic, setTopic] = useState<string>('CHỦ ĐỀ 2: BÀI THỂ DỤC');
  const [title, setTitle] = useState<string>(
    'Bài 2: ĐỘNG TÁC CHÂN, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC BỤNG (Tiết 3)'
  );
  const [lessonRows, setLessonRows] = useState<LessonRow[]>(masterPlansTuan10.k1_t19.rows);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState<boolean>(false);
  const [scenarioToEdit, setScenarioToEdit] = useState<ScenarioItem | null>(null);
  const [isSelectCellModalOpen, setIsSelectCellModalOpen] = useState<boolean>(false);
  const [imageToAttach, setImageToAttach] = useState<SgkImageItem | null>(null);

  // Gemini Vision State
  const [isVisionModalOpen, setIsVisionModalOpen] = useState<boolean>(false);
  const [visionImage, setVisionImage] = useState<SgkImageItem | null>(null);
  const [visionResult, setVisionResult] = useState<VisionAnalysisResult | null>(null);
  const [isAnalyzingVision, setIsAnalyzingVision] = useState<boolean>(false);

  // Import Lesson Plan State
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);

  // Smart Clean / Tẩy rác State
  const [isSmartCleanOpen, setIsSmartCleanOpen] = useState<boolean>(false);
  const [cleanImageTarget, setCleanImageTarget] = useState<SgkImageItem | null>(null);

  // Formation Studio & Library Global States
  const [isGlobalStudioOpen, setIsGlobalStudioOpen] = useState<boolean>(false);
  const [isGlobalFormationLibraryOpen, setIsGlobalFormationLibraryOpen] = useState<boolean>(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const isDbLoadedRef = useRef<boolean>(false);

  // 1. Initial Load from IndexedDB (with automatic 109 images official sync)
  useEffect(() => {
    async function loadIndexedDB() {
      try {
        const storedImages = await getAllImagesDB();
        // If empty or if holding only the legacy dataset (<= 29 images), initialize directly with full 109 official images
        if (!storedImages || storedImages.length === 0 || storedImages.length <= 29) {
          setImages(defaultSgkImages);
          await saveImagesDB(defaultSgkImages);
          localStorage.removeItem('gdtc_sgk_images');
        } else {
          // If storedImages has custom user images, preserve them and ensure all 109 official images are merged
          const existingIds = new Set(storedImages.map((i: SgkImageItem) => i.id));
          const merged = [...storedImages];
          let missingCount = 0;
          defaultSgkImages.forEach((def) => {
            if (!existingIds.has(def.id)) {
              merged.push(def);
              existingIds.add(def.id);
              missingCount++;
            }
          });
          setImages(merged);
          if (missingCount > 0) {
            await saveImagesDB(merged);
          }
        }

        const storedScenarios = await getAllScenariosDB();
        if (storedScenarios && storedScenarios.length > 0) {
          setScenarios(storedScenarios);
        } else {
          const legacy = localStorage.getItem('gdtc_scenarios');
          const initial = legacy ? JSON.parse(legacy) : defaultScenarios;
          setScenarios(initial);
          await saveScenariosDB(initial);
        }

        const storedSettings = await getAppStateDB('school_settings', defaultSchoolSettings);
        setSchoolSettings(storedSettings);

        const storedAllPlans = await getAppStateDB('gdtc_all_master_plans', null);
        if (storedAllPlans && typeof storedAllPlans === 'object') {
          const normalizedMap: Record<string, MasterPlanItem> = {
            ...masterPlansTuan9,
            ...masterPlansTuan10
          };
          Object.keys(storedAllPlans).forEach((key) => {
            const plan = normalizeMasterPlan(storedAllPlans[key]);
            if (masterPlansTuan10[key]) {
              normalizedMap[key] = masterPlansTuan10[key];
            } else if (masterPlansTuan9[key]) {
              normalizedMap[key] = masterPlansTuan9[key];
            } else {
              normalizedMap[key] = plan;
            }
          });
          setAllMasterPlans(normalizedMap);
        }

        const storedMasterPlan = await getAppStateDB('master_plan', masterPlansTuan10.k1_t19);
        if (storedMasterPlan) {
          const plan = normalizeMasterPlan(storedMasterPlan);
          setCurrentMasterPlan(plan);
        }

        const storedRows = await getAppStateDB('current_lesson_rows', masterPlansTuan10.k1_t19.rows);
        if (storedRows) {
          setLessonRows(storedRows);
        }

        // Restore active week and lesson metadata (mặc định Tuần 10 như phiên bản chỉnh sửa)
        const savedWeek = await getAppStateDB('active_week', 10);
        const savedGrade = await getAppStateDB('active_grade', 1);
        const savedLessonNum = await getAppStateDB('active_lesson_num', 19);
        const savedTopic = await getAppStateDB('active_topic', 'CHỦ ĐỀ 2: BÀI THỂ DỤC');
        const savedTitle = await getAppStateDB('active_title', 'Bài 2: ĐỘNG TÁC CHÂN, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC BỤNG (Tiết 3)');

        setWeek(savedWeek);
        setGrade(savedGrade);
        setLessonNum(savedLessonNum);
        setTopic(savedTopic);
        setTitle(savedTitle);
      } catch (err) {
        console.warn('IndexedDB initialization notice:', err);
      } finally {
        isDbLoadedRef.current = true;
      }
    }

    loadIndexedDB();
  }, []);

  // 2. Persist to IndexedDB on state changes (Asynchronous & Gigabyte capable)
  useEffect(() => {
    if (isDbLoadedRef.current) {
      saveImagesDB(images).catch((e) => console.warn('Error syncing images to DB', e));
    }
  }, [images]);

  useEffect(() => {
    if (isDbLoadedRef.current) {
      saveScenariosDB(scenarios).catch((e) => console.warn('Error syncing scenarios to DB', e));
    }
  }, [scenarios]);

  useEffect(() => {
    setAppStateDB('school_settings', schoolSettings);
  }, [schoolSettings]);

  useEffect(() => {
    setAppStateDB('master_plan', currentMasterPlan);
  }, [currentMasterPlan]);

  useEffect(() => {
    setAppStateDB('gdtc_all_master_plans', allMasterPlans);
  }, [allMasterPlans]);

  // Synchronized Plan Updater: updates allMasterPlans reactively
  const handleUpdateSingleMasterPlan = (key: string, updatedPlan: MasterPlanItem) => {
    const normalized = normalizeMasterPlan(updatedPlan);
    setAllMasterPlans((prev) => ({
      ...prev,
      [key]: normalized
    }));

    if (currentMasterPlan.id === normalized.id || currentMasterPlan.lessonNum === normalized.lessonNum && currentMasterPlan.grade === normalized.grade) {
      setCurrentMasterPlan(normalized);
      setLessonRows(JSON.parse(JSON.stringify(normalized.rows)));
    }
  };

  useEffect(() => {
    setAppStateDB('current_lesson_rows', lessonRows);
  }, [lessonRows]);

  // Tự động đồng bộ currentMasterPlan & allMasterPlans ngay khi giáo án tuần mới được sinh hoặc chỉnh sửa
  useEffect(() => {
    if (!lessonRows || lessonRows.length === 0) return;
    const key = `k${grade}_t${lessonNum}`;
    const syncedPlan: MasterPlanItem = {
      ...currentMasterPlan,
      id: `plan_${key}_w${week}`,
      grade: grade as 1 | 3 | 5,
      week,
      lessonNum,
      topic,
      title,
      rows: lessonRows
    };
    setCurrentMasterPlan(syncedPlan);
    setAllMasterPlans((prev) => ({
      ...prev,
      [key]: syncedPlan
    }));
  }, [lessonRows, week, grade, lessonNum, topic, title]);

  useEffect(() => {
    if (isDbLoadedRef.current) {
      setAppStateDB('active_week', week);
      setAppStateDB('active_grade', grade);
      setAppStateDB('active_lesson_num', lessonNum);
      setAppStateDB('active_topic', topic);
      setAppStateDB('active_title', title);
    }
  }, [week, grade, lessonNum, topic, title]);

  const handleSwitchToExportFromGenerator = () => {
    const key = `k${grade}_t${lessonNum}`;
    const syncedPlan: MasterPlanItem = {
      ...currentMasterPlan,
      id: `plan_${key}_w${week}`,
      grade: grade as 1 | 3 | 5,
      week,
      lessonNum,
      topic,
      title,
      rows: JSON.parse(JSON.stringify(lessonRows))
    };
    setCurrentMasterPlan(syncedPlan);
    setAllMasterPlans((prev) => ({
      ...prev,
      [key]: syncedPlan
    }));
    setActiveTab('tab-export');
    showToast(`Đã chuyển sang Xem trước & In cho giáo án Tuần ${week} - Khối ${grade} (Tiết ${lessonNum})!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3400);
  };

  const handleResetData = async () => {
    if (
      window.confirm(
        'Khôi phục toàn bộ Thư viện ảnh, Kịch bản và Kế hoạch bài dạy về dữ liệu gốc trong IndexedDB?'
      )
    ) {
      await clearImagesDB();
      await saveImagesDB(defaultSgkImages);
      await saveScenariosDB(defaultScenarios);
      await setAppStateDB('school_settings', defaultSchoolSettings);
      await setAppStateDB('master_plan', masterPlansTuan8.k1_t15);
      await setAppStateDB('current_lesson_rows', initialLessonsData.k1_t15.rows);

      setImages(defaultSgkImages);
      setScenarios(defaultScenarios);
      setSchoolSettings(defaultSchoolSettings);
      setCurrentMasterPlan(masterPlansTuan8.k1_t15);
      setLessonRows(initialLessonsData.k1_t15.rows);
      showToast('Đã khôi phục dữ liệu ban đầu trong IndexedDB thành công!');
    }
  };

  const handleImageExtracted = (newImg: SgkImageItem) => {
    setImages((prev) => {
      const exists = prev.some(
        (im) =>
          im.id === newImg.id ||
          (im.title === newImg.title && im.grade === newImg.grade && im.page === newImg.page)
      );
      if (exists) {
        return prev;
      }
      const updated = [newImg, ...prev];
      saveImagesDB(updated).catch((err) => console.warn('Lỗi ghi IndexedDB:', err));
      return updated;
    });
    showToast(`Đã lưu "${newImg.title}" an toàn vào Thư viện!`);
  };

  const handleOpenSelectCellModal = (img: SgkImageItem) => {
    setImageToAttach(img);
    setIsSelectCellModalOpen(true);
  };

  const handleConfirmAttachImage = (rowIndex: number, column: 'content' | 'hs') => {
    if (!imageToAttach || !lessonRows[rowIndex]) return;

    setLessonRows((prev) => {
      const updated = [...prev];
      if (column === 'content') {
        updated[rowIndex] = {
          ...updated[rowIndex],
          contentImgUrl: imageToAttach.imgUrl,
          contentImgTitle: imageToAttach.title,
        };
      } else {
        updated[rowIndex] = {
          ...updated[rowIndex],
          hsImgUrl: imageToAttach.imgUrl,
          hsImgTitle: imageToAttach.title,
        };
      }
      return updated;
    });

    setActiveTab('tab-generator');
    showToast(
      `Đã chèn "${imageToAttach.title}" vào ${
        column === 'content' ? 'Cột Nội Dung' : 'Cột Hoạt Động HS'
      } thành công!`
    );
  };

  const handleOpenSmartClean = (img: SgkImageItem) => {
    setCleanImageTarget(img);
    setIsSmartCleanOpen(true);
  };

  const handleSaveCleanedImage = (updatedImg: SgkImageItem) => {
    setImages((prev) => {
      const updated = prev.map((im) => (im.id === updatedImg.id ? updatedImg : im));
      saveImagesDB(updated).catch((err) => console.warn('Lỗi ghi IndexedDB:', err));
      return updated;
    });
    showToast(`Đã làm sạch và cập nhật ảnh "${updatedImg.title}" thành công!`);
  };

  // Gemini Vision AI Analysis
  const handleAnalyzeVision = async (img: SgkImageItem) => {
    setIsAnalyzingVision(true);
    showToast('Gemini Vision AI đang đọc hình ảnh động tác SGK...');

    try {
      const res = await fetch('/api/ai/analyze-vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: img.imgUrl,
          grade,
          lessonTitle: title,
        }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setVisionImage(img);
        setVisionResult(data.analysis);
        setIsVisionModalOpen(true);
        showToast('✨ Gemini Vision đã nhận diện xong động tác!');
      } else {
        throw new Error(data.error || 'Lỗi nhận diện');
      }
    } catch (err: any) {
      console.warn('Vision analysis fallback notice:', err);
      setVisionImage(img);
      setVisionResult({
        name: img.title || 'Động tác kỹ thuật SGK',
        category: img.category,
        targetColumn: img.category === 'dong_tac' ? 'content' : 'hs',
        lvd: "5 - 7'",
        caption: img.caption || 'Tư thế động tác chuẩn xác, thân người thẳng, hít thở sâu.',
        technicalCues: ['Giữ thẳng thân người', 'Biên độ tay chân mở rộng dứt khoát', 'Hít thở đều đặn'],
        commonErrors: ['Cúi đầu mất thăng bằng', 'Chưa thẳng cánh tay'],
        gvScript: '- GV làm mẫu chuẩn xác 2-3 lần.\n- Cho HS quan sát tranh ảnh SGK đính kèm.\n- Hô nhịp dứt khoát và hướng dẫn HS sửa sai.',
        hsScript: '- Đội hình 4 hàng ngang cự ly 1 sải tay so le.\n- Chú ý quan sát và thực hiện theo nhịp hô.',
      });
      setIsVisionModalOpen(true);
    } finally {
      setIsAnalyzingVision(false);
    }
  };

  const handleApplyVisionToLesson = (
    rowIndex: number,
    targetCol: 'content' | 'hs',
    movementName: string,
    lvdVal: string,
    gvScriptVal: string,
    hsScriptVal: string,
    imgItem: SgkImageItem
  ) => {
    setLessonRows((prev) => {
      const copy = [...prev];
      if (copy[rowIndex]) {
        const firstLine = copy[rowIndex].content.split('\n')[0];
        copy[rowIndex] = {
          ...copy[rowIndex],
          content: `${firstLine}\n- ${movementName}`,
          lvd: lvdVal || copy[rowIndex].lvd,
          gv: gvScriptVal || copy[rowIndex].gv,
          hs: hsScriptVal || copy[rowIndex].hs,
        };

        if (targetCol === 'content') {
          copy[rowIndex].contentImgUrl = imgItem.imgUrl;
          copy[rowIndex].contentImgTitle = movementName;
        } else {
          copy[rowIndex].hsImgUrl = imgItem.imgUrl;
          copy[rowIndex].hsImgTitle = movementName;
        }
      }
      return copy;
    });

    setActiveTab('tab-generator');
    showToast(`Đã tự động điền kịch bản và chèn ảnh "${movementName}" vào đúng cột!`);
  };

  const handleLessonImported = (result: ParsedLessonFileResult) => {
    if (result.title) setTitle(result.title);
    if (result.topic) setTopic(result.topic);
    if (result.week) setWeek(result.week);
    if (result.grade) setGrade(result.grade);
    if (result.lessonNum) setLessonNum(result.lessonNum);
    if (result.rows && result.rows.length > 0) {
      setLessonRows(result.rows);
    }
    if (result.teacherName || result.schoolName) {
      setSchoolSettings((prev) => ({
        ...prev,
        teacherName: result.teacherName || prev.teacherName,
        schoolName: result.schoolName || prev.schoolName,
      }));
    }
    setActiveTab('tab-generator');
    showToast(`Đã nạp thành công giáo án "${result.title || 'Mới'}" với ${result.rows.length} hoạt động!`);
  };

  const handleSaveAllExtractedToLibrary = (newScenarios: ScenarioItem[]) => {
    setScenarios((prev) => [...newScenarios, ...prev]);
  };

  const handleSaveSingleExtractedToLibrary = (scenario: ScenarioItem) => {
    setScenarios((prev) => [scenario, ...prev]);
  };

  const handleSaveScenario = (scenario: ScenarioItem) => {
    if (scenarioToEdit) {
      setScenarios((prev) => prev.map((s) => (s.id === scenario.id ? scenario : s)));
      showToast('Đã cập nhật kịch bản thành công!');
    } else {
      setScenarios((prev) => [scenario, ...prev]);
      showToast('Đã thêm kịch bản mới vào thư viện!');
    }
    setScenarioToEdit(null);
  };

  const handleInsertScenarioToLesson = (sc: ScenarioItem) => {
    setLessonRows((prev) => {
      const copy = [...prev];
      if (sc.category === 'Mở đầu' && copy[0]) {
        copy[0] = {
          ...copy[0],
          content: sc.content || copy[0].content,
          lvd: sc.lvd || copy[0].lvd,
          gv: sc.gv || copy[0].gv,
          hs: sc.hs || copy[0].hs,
        };
      } else if (sc.category === 'Động tác mới' && copy[1]) {
        copy[1] = {
          ...copy[1],
          content: sc.content || `2. HÌNH THÀNH KIẾN THỨC MỚI\n- ${sc.title}`,
          lvd: sc.lvd || copy[1].lvd,
          gv: sc.gv,
          hs: sc.hs,
        };
      } else if (sc.category === 'Luyện tập' && copy[2]) {
        copy[2] = {
          ...copy[2],
          content: sc.content || `3. HOẠT ĐỘNG LUYỆN TẬP\n- ${sc.title}`,
          lvd: sc.lvd || copy[2].lvd,
          gv: sc.gv,
          hs: sc.hs,
        };
      } else if (sc.category === 'Trò chơi' && copy[3]) {
        copy[3] = {
          ...copy[3],
          content: sc.content || `3.4 Trò chơi vận động: ${sc.title}`,
          lvd: sc.lvd || copy[3].lvd,
          gv: sc.gv,
          hs: sc.hs,
        };
      } else if ((sc.category === 'Hồi tĩnh' || sc.category === 'Vận dụng') && copy[4]) {
        copy[4] = {
          ...copy[4],
          content: sc.content || copy[4].content,
          lvd: sc.lvd || copy[4].lvd,
          gv: sc.gv,
          hs: sc.hs,
        };
      } else if (copy[0]) {
        copy[0] = {
          ...copy[0],
          content: sc.content || copy[0].content,
          gv: sc.gv,
          hs: sc.hs,
        };
      }
      return copy;
    });

    setActiveTab('tab-generator');
    showToast(`Đã chèn kịch bản "${sc.title}" vào kế hoạch bài dạy!`);
  };

  const handleSyncAll109Images = async () => {
    setImages(defaultSgkImages);
    await saveImagesDB(defaultSgkImages);
    showToast('✨ Đã đồng bộ thành công trọn bộ 109 ảnh SGK chuẩn (Khối 1: 26, Khối 3: 46, Khối 5: 37)!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 z-50 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Vision Loading Overlay if active */}
      {isAnalyzingVision && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-2xl shadow-2xl border border-indigo-100 flex items-center gap-3">
            <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
            <div>
              <p className="text-xs font-bold text-slate-900">Gemini Vision AI đang phân tích hình ảnh...</p>
              <p className="text-[11px] text-slate-500">Đang đọc tên động tác, góc thân người và soạn kịch bản sư phạm</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        imageCount={images.length}
        schoolSettings={schoolSettings}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetData={handleResetData}
        onOpenImport={() => setIsImportModalOpen(true)}
        onOpenFormationStudio={() => setIsGlobalStudioOpen(true)}
        onOpenFormationLibrary={() => setIsGlobalFormationLibraryOpen(true)}
        onOpenPpctManager={() => {
          setActiveTab('tab-export');
          showToast('📊 Chuyển đến Xem trước & Rà soát Phân phối chương trình (PPCT) 3 khối!');
        }}
        currentWeek={week}
        onSelectCurrentWeek={() => {
          setActiveTab('tab-export');
          showToast(`✨ Đang xem Kế hoạch bài dạy Tuần ${week} (Tuần hiện hành)!`);
        }}
      />

      {/* Main Body View */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        {activeTab === 'tab-scan' && (
          <TabScan
            onImageExtracted={handleImageExtracted}
            onNavigateToGallery={() => setActiveTab('tab-img-library')}
            onAnalyzeVision={handleAnalyzeVision}
            onOpenSmartClean={handleOpenSmartClean}
          />
        )}

        {activeTab === 'tab-img-library' && (
          <TabImageLibrary
            images={images}
            setImages={setImages}
            onOpenSelectCellModal={handleOpenSelectCellModal}
            onAnalyzeVision={handleAnalyzeVision}
            onOpenSmartClean={handleOpenSmartClean}
            showToast={showToast}
            onSync109Images={handleSyncAll109Images}
          />
        )}

        {activeTab === 'tab-extract' && (
          <TabExtractSample
            currentMasterPlan={currentMasterPlan}
            setCurrentMasterPlan={setCurrentMasterPlan}
            userImages={images}
            onApplyMasterToGenerator={(plan) => {
              setGrade(plan.grade);
              setLessonNum(plan.lessonNum + 2);
              setWeek(plan.week + 1);
              setTopic(plan.topic);
              setTitle(plan.title);
              setLessonRows(JSON.parse(JSON.stringify(plan.rows)));
              setActiveTab('tab-generator');
              showToast(`Đã chuyển giáo án mẫu sang Trình tạo bài giảng (Tuần ${plan.week + 1})!`);
            }}
            showToast={showToast}
          />
        )}

        {activeTab === 'tab-library' && (
          <TabScenarioLibrary
            scenarios={scenarios}
            setScenarios={setScenarios}
            onOpenAddModal={() => {
              setScenarioToEdit(null);
              setIsScenarioModalOpen(true);
            }}
            onEditScenario={(sc) => {
              setScenarioToEdit(sc);
              setIsScenarioModalOpen(true);
            }}
            onInsertToLesson={handleInsertScenarioToLesson}
            showToast={showToast}
          />
        )}

        {activeTab === 'tab-generator' && (
          <TabGenerator
            week={week}
            setWeek={setWeek}
            grade={grade}
            setGrade={setGrade}
            lessonNum={lessonNum}
            setLessonNum={setLessonNum}
            topic={topic}
            setTopic={setTopic}
            title={title}
            setTitle={setTitle}
            lessonRows={lessonRows}
            setLessonRows={setLessonRows}
            scenarios={scenarios}
            images={images}
            currentMasterPlan={currentMasterPlan}
            onSwitchToExport={handleSwitchToExportFromGenerator}
            onSwitchToMasterTemplate={() => setActiveTab('tab-extract')}
            showToast={showToast}
            onOpenImport={() => setIsImportModalOpen(true)}
            onNavigateToScan={() => {
              setActiveTab('tab-scan');
              showToast('✂️ Chuyển sang Quét & Bóc Tách SGK!');
            }}
            onNavigateToLibrary={() => setActiveTab('tab-img-library')}
          />
        )}

        {activeTab === 'tab-export' && (
          <TabExportPrint
            week={week}
            grade={grade}
            lessonNum={lessonNum}
            topic={topic}
            title={title}
            lessonRows={lessonRows}
            schoolSettings={schoolSettings}
            onUpdateSchoolSettings={(newSettings) => {
              setSchoolSettings(newSettings);
              setAppStateDB('school_settings', newSettings);
            }}
            currentMasterPlan={currentMasterPlan}
            allMasterPlans={allMasterPlans}
            onUpdateMasterPlanItem={handleUpdateSingleMasterPlan}
            images={images}
            showToast={showToast}
            onUpdateMasterPlan={(updated) => {
              setCurrentMasterPlan(updated);
              setLessonRows(JSON.parse(JSON.stringify(updated.rows)));
            }}
            onNavigateToLibrary={() => setActiveTab('tab-img-library')}
            onNavigateToScan={(targetGrade, lessonTitle) => {
              if (targetGrade) setGrade(targetGrade);
              if (lessonTitle) setTitle(lessonTitle);
              setActiveTab('tab-scan');
              showToast(`✂️ Chuyển sang Quét & Bóc Tách SGK${targetGrade ? ` Khối ${targetGrade}` : ''}!`);
            }}
          />
        )}
      </main>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={schoolSettings}
        onSave={(newSettings) => {
          setSchoolSettings(newSettings);
          showToast('Đã lưu thông tin nhà trường và giáo viên!');
        }}
      />

      <SelectCellModal
        isOpen={isSelectCellModalOpen}
        onClose={() => {
          setIsSelectCellModalOpen(false);
          setImageToAttach(null);
        }}
        imageItem={imageToAttach}
        lessonRows={lessonRows}
        onConfirm={handleConfirmAttachImage}
      />

      <ScenarioModal
        isOpen={isScenarioModalOpen}
        onClose={() => {
          setIsScenarioModalOpen(false);
          setScenarioToEdit(null);
        }}
        scenarioToEdit={scenarioToEdit}
        onSave={handleSaveScenario}
      />

      <VisionAnalysisModal
        isOpen={isVisionModalOpen}
        onClose={() => {
          setIsVisionModalOpen(false);
          setVisionImage(null);
          setVisionResult(null);
        }}
        imageItem={visionImage}
        analysis={visionResult}
        lessonRows={lessonRows}
        onApplyToLesson={handleApplyVisionToLesson}
      />

      <ImportLessonModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onLessonImported={handleLessonImported}
        showToast={showToast}
      />

      <SmartCleanModal
        isOpen={isSmartCleanOpen}
        onClose={() => {
          setIsSmartCleanOpen(false);
          setCleanImageTarget(null);
        }}
        imageItem={cleanImageTarget}
        onSaveCleanedImage={handleSaveCleanedImage}
        onSaveAsNewImage={handleImageExtracted}
        showToast={showToast}
      />

      {/* Global Formation Studio Modal */}
      {isGlobalStudioOpen && (
        <FormationStudioModal
          isOpen={isGlobalStudioOpen}
          onClose={() => setIsGlobalStudioOpen(false)}
          targetRowIndex={2}
          onApplyFormationToRow={(rowIdx, customFormation) => {
            setLessonRows((prev) => {
              const updated = [...prev];
              if (updated[rowIdx]) {
                updated[rowIdx] = {
                  ...updated[rowIdx],
                  hsImgUrl: customFormation.svgDataUrl,
                  hsImgTitle: customFormation.name
                };
              }
              return updated;
            });
            saveCustomFormationToStorage(customFormation);
            setIsGlobalStudioOpen(false);
            setActiveTab('tab-generator');
            showToast(`✨ Đã gắn sơ đồ "${customFormation.name}" vào Cột 4 dòng số ${rowIdx + 1}!`);
          }}
          onSaveToLibrary={(customFormation) => {
            saveCustomFormationToStorage(customFormation);
            showToast(`💾 Đã lưu sơ đồ "${customFormation.name}" vào thư viện!`);
          }}
        />
      )}

      {/* Global Formation Library Modal */}
      {isGlobalFormationLibraryOpen && (
        <SelectFormationModal
          isOpen={isGlobalFormationLibraryOpen}
          onClose={() => setIsGlobalFormationLibraryOpen(false)}
          targetRowIndex={2}
          onSelectFormation={(rowIdx, formation) => {
            setLessonRows((prev) => {
              const updated = [...prev];
              if (updated[rowIdx]) {
                updated[rowIdx] = {
                  ...updated[rowIdx],
                  hsImgUrl: formation.svgDataUrl,
                  hsImgTitle: formation.name
                };
              }
              return updated;
            });
            saveCustomFormationToStorage(formation);
            setIsGlobalFormationLibraryOpen(false);
            setActiveTab('tab-generator');
            showToast(`✨ Đã chèn sơ đồ "${formation.name}" vào Cột 4 dòng số ${rowIdx + 1}!`);
          }}
        />
      )}
    </div>
  );
}
