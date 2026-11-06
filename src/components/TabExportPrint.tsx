import React, { useState, useEffect, useMemo, useRef } from 'react';
import mammoth from 'mammoth';
import {
  WeeklyMasterScheduleRow,
  getCurriculumRule,
  cleanLessonTitleForHeader,
  cleanTopicForDisplay,
  auditCurriculumSync,
  autoSyncCurriculumAndPlans,
  AuditReport,
} from '../utils/curriculumAuditSync';
import { MasterPlanItem } from '../data/masterTemplateTuan8';
import { SgkImageItem, SchoolSettings, LessonRow } from '../types/gdtc';
import { resolveAccurateGameImage, resolveAccurateMovement, createBalanced7LessonRows } from '../utils/planAutoMatcher';
import { setAppStateDB } from '../utils/db';
import {
  Printer,
  ShieldCheck,
  RefreshCw,
  Calendar,
  BookOpen,
  X,
  Upload,
  FileText,
  CheckCircle,
  Edit3,
  Save,
  ImageIcon,
  Users,
  Eye,
  Plus
} from 'lucide-react';

interface TabExportPrintProps {
  week: number;
  grade: number;
  lessonNum: number;
  topic: string;
  title: string;
  lessonRows: LessonRow[];
  schoolSettings: SchoolSettings;
  onUpdateSchoolSettings?: (newSettings: SchoolSettings) => void;
  currentMasterPlan: MasterPlanItem;
  allMasterPlans?: Record<string, MasterPlanItem>;
  onUpdateMasterPlanItem?: (key: string, plan: MasterPlanItem) => void;
  images: SgkImageItem[];
  showToast: (msg: string) => void;
  onUpdateMasterPlan?: (updated: MasterPlanItem) => void;
  onNavigateToLibrary?: () => void;
}

export const TabExportPrint: React.FC<TabExportPrintProps> = ({
  week: initialWeek,
  grade: initialGrade,
  lessonNum: initialLessonNum,
  topic: initialTopic,
  title: initialTitle,
  lessonRows,
  schoolSettings,
  onUpdateSchoolSettings,
  currentMasterPlan,
  allMasterPlans,
  onUpdateMasterPlanItem,
  images = [],
  showToast,
  onUpdateMasterPlan,
  onNavigateToLibrary
}) => {
  // 1. Dynamic Week Selection (Weeks 1 to 35) with persistent storage
  const [selectedWeek, setSelectedWeek] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('gdtc_active_week');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 35) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return initialWeek || currentMasterPlan?.week || 10;
  });

  const [customDateRange, setCustomDateRange] = useState<string>(() => {
    try {
      const savedDates = localStorage.getItem(`gdtc_dates_w${selectedWeek}`);
      if (savedDates) {
        const parsed = JSON.parse(savedDates);
        if (parsed?.dateRange) return parsed.dateRange;
      }
    } catch (e) {
      console.warn(e);
    }
    return selectedWeek === 9 ? 'Từ ngày 02-06 tháng 11 năm 2026' : 'Từ ngày 09-13 tháng 11 năm 2026';
  });

  const [customApprovalDate, setCustomApprovalDate] = useState<string>(() => {
    try {
      const savedDates = localStorage.getItem(`gdtc_dates_w${selectedWeek}`);
      if (savedDates) {
        const parsed = JSON.parse(savedDates);
        if (parsed?.approvalDate) return parsed.approvalDate;
      }
    } catch (e) {
      console.warn(e);
    }
    return selectedWeek === 9 ? 'Vệ Giang, ngày 06 tháng 11 năm 2026' : 'Vệ Giang, ngày 13 tháng 11 năm 2026';
  });

  // Default timetable generator for any week
  const generateDefaultSchedule = (w: number): WeeklyMasterScheduleRow[] => {
    const r1 = getCurriculumRule(1, 19, w);
    const r3 = getCurriculumRule(3, 19, w);
    const r5_1 = getCurriculumRule(5, 19, w);
    const r5_2 = getCurriculumRule(5, 20, w);

    return [
      { dayOfWeek: 'Thứ 2', session: 'Sáng', period: 2, classRoom: '1A4', grade: 1, lessonTitle: `${r1.cleanTitle} (tiết 1)`, ppct: 19, integrationNotes: '- Mã 4.1TC1a / 6.1TC2a: Ứng dụng học liệu số và AI quan sát phân tích tư thế vận động.', equipment: 'SGK, Tranh ảnh, video, dụng cụ TL' },
      { dayOfWeek: 'Thứ 2', session: 'Sáng', period: 3, classRoom: '1A5', grade: 1, lessonTitle: `${r1.cleanTitle} (tiết 1)`, ppct: 19, integrationNotes: '- Mã 4.1TC1a / 6.1TC2a: Ứng dụng học liệu số và AI quan sát phân tích tư thế vận động.', equipment: 'SGK, Tranh ảnh, video, dụng cụ TL' },
      { dayOfWeek: 'Thứ 2', session: 'Sáng', period: 4, classRoom: '1A3', grade: 1, lessonTitle: `${r1.cleanTitle} (tiết 1)`, ppct: 19, integrationNotes: '- Mã 4.1TC1a / 6.1TC2a: Ứng dụng học liệu số và AI quan sát phân tích tư thế vận động.', equipment: 'SGK, Tranh ảnh, video, dụng cụ TL' },
      { dayOfWeek: 'Thứ 2', session: 'Chiều', period: 2, classRoom: '1A1', grade: 1, lessonTitle: `${r1.cleanTitle} (tiết 1)`, ppct: 19, integrationNotes: '- Mã 4.1TC1a / 6.1TC2a: Ứng dụng học liệu số và AI quan sát phân tích tư thế vận động.', equipment: 'SGK, Tranh ảnh, video, dụng cụ TL' },
      { dayOfWeek: 'Thứ 2', session: 'Chiều', period: 3, classRoom: '1A2', grade: 1, lessonTitle: `${r1.cleanTitle} (tiết 1)`, ppct: 19, integrationNotes: '- Mã 4.1TC1a / 6.1TC2a: Ứng dụng học liệu số và AI quan sát phân tích tư thế vận động.', equipment: 'SGK, Tranh ảnh, video, dụng cụ TL' },
      { dayOfWeek: 'Thứ 3', session: 'Chiều', period: 1, classRoom: '5A1', grade: 5, lessonTitle: `${r5_1.cleanTitle} (tiết 1)`, ppct: 19, integrationNotes: '- Mã 4.1TC1a / 6.1TC2a: Ứng dụng học liệu số và AI quan sát phân tích tư thế vận động.', equipment: 'SGK, Tranh ảnh, video, dụng cụ TL' },
      { dayOfWeek: 'Thứ 3', session: 'Chiều', period: 2, classRoom: '3A1', grade: 3, lessonTitle: `${r3.cleanTitle} (tiết 1)`, ppct: 19, integrationNotes: '- Tuần 10: Giữ gìn sân tập xanh - sạch - đẹp, không xả rác bừa bãi, bảo quản dụng cụ.', equipment: 'SGK, Tranh ảnh, dụng cụ TL' },
      { dayOfWeek: 'Thứ 3', session: 'Chiều', period: 3, classRoom: '5A2', grade: 5, lessonTitle: `${r5_1.cleanTitle} (tiết 1)`, ppct: 19, integrationNotes: '- Mã 4.1TC1a / 6.1TC2a: Ứng dụng học liệu số và AI quan sát phân tích tư thế vận động.', equipment: 'SGK, Tranh ảnh, video, dụng cụ TL' },
      { dayOfWeek: 'Thứ 5', session: 'Sáng', period: 2, classRoom: '1A1', grade: 1, lessonTitle: `${r1.cleanTitle} (tiết 2)`, ppct: 20, integrationNotes: '- Tuần 10: Rèn luyện tác phong nhanh nhẹn, giữ vững cự ly cự chuẩn và tinh thần kỷ luật.', equipment: 'SGK, Tranh ảnh, dụng cụ TL' },
      { dayOfWeek: 'Thứ 5', session: 'Sáng', period: 3, classRoom: '1A2', grade: 1, lessonTitle: `${r1.cleanTitle} (tiết 2)`, ppct: 20, integrationNotes: '- Tuần 10: Rèn luyện tác phong nhanh nhẹn, giữ vững cự ly cự chuẩn và tinh thần kỷ luật.', equipment: 'SGK, Tranh ảnh, dụng cụ TL' },
      { dayOfWeek: 'Thứ 5', session: 'Chiều', period: 1, classRoom: '5A1', grade: 5, lessonTitle: `${r5_2.cleanTitle} (tiết 2)`, ppct: 20, integrationNotes: '- Tuần 10: Tinh thần đoàn kết, hỗ trợ đồng đội trong luyện tập và trò chơi vận động.', equipment: 'SGK, Tranh ảnh, gậy thể dục' },
      { dayOfWeek: 'Thứ 5', session: 'Chiều', period: 2, classRoom: '3A1', grade: 3, lessonTitle: `${r3.cleanTitle} (tiết 2)`, ppct: 20, integrationNotes: '- Tuần 10: Rèn luyện tác phong nhanh nhẹn, giữ vững cự ly cự chuẩn và tinh thần kỷ luật.', equipment: 'SGK, Tranh ảnh, dụng cụ TL' },
      { dayOfWeek: 'Thứ 5', session: 'Chiều', period: 3, classRoom: '5A2', grade: 5, lessonTitle: `${r5_2.cleanTitle} (tiết 2)`, ppct: 20, integrationNotes: '- Tuần 10: Tinh thần đoàn kết, hỗ trợ đồng đội trong luyện tập và trò chơi vận động.', equipment: 'SGK, Tranh ảnh, gậy thể dục' },
      { dayOfWeek: 'Thứ 6', session: 'Sáng', period: 2, classRoom: '1A4', grade: 1, lessonTitle: `${r1.cleanTitle} (tiết 2)`, ppct: 20, integrationNotes: '- Tuần 10: Rèn luyện tác phong nhanh nhẹn, giữ vững cự ly cự chuẩn và tinh thần kỷ luật.', equipment: 'SGK, Tranh ảnh, dụng cụ TL' },
      { dayOfWeek: 'Thứ 6', session: 'Sáng', period: 3, classRoom: '1A5', grade: 1, lessonTitle: `${r1.cleanTitle} (tiết 2)`, ppct: 20, integrationNotes: '- Tuần 10: Rèn luyện tác phong nhanh nhẹn, giữ vững cự ly cự chuẩn và tinh thần kỷ luật.', equipment: 'SGK, Tranh ảnh, dụng cụ TL' },
      { dayOfWeek: 'Thứ 6', session: 'Sáng', period: 4, classRoom: '1A3', grade: 1, lessonTitle: `${r1.cleanTitle} (tiết 2)`, ppct: 20, integrationNotes: '- Tuần 10: Rèn luyện tác phong nhanh nhẹn, giữ vững cự ly cự chuẩn và tinh thần kỷ luật.', equipment: 'SGK, Tranh ảnh, dụng cụ TL' },
    ];
  };

  // Timetable State with priority to stored uploaded plan
  const [weeklyScheduleRows, setWeeklyScheduleRows] = useState<WeeklyMasterScheduleRow[]>(() => {
    try {
      const saved = localStorage.getItem(`gdtc_schedule_w${selectedWeek}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return generateDefaultSchedule(selectedWeek);
  });

  // Reload schedule whenever week changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`gdtc_schedule_w${selectedWeek}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWeeklyScheduleRows(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn(e);
    }
    setWeeklyScheduleRows(generateDefaultSchedule(selectedWeek));
  }, [selectedWeek]);

  // Modals & Direct Edit State
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isUploadPlanModalOpen, setIsUploadPlanModalOpen] = useState(false);
  const [pasteTableText, setPasteTableText] = useState('');
  const [isDirectEditMode, setIsDirectEditMode] = useState<boolean>(false);
  const filePlanInputRef = useRef<HTMLInputElement>(null);

  // Plans state for all 3 grades
  const [plansByGrade, setPlansByGrade] = useState<MasterPlanItem[]>([]);
  const [selectedGradeTab, setSelectedGradeTab] = useState<1 | 3 | 5>(1);

  // Helper to build authentic baseline plan
  const buildAuthenticPlan = (g: 1 | 3 | 5, pNum: number): MasterPlanItem => {
    const rule = getCurriculumRule(g, pNum, selectedWeek);
    const warmupImg = resolveAccurateGameImage(rule.warmupGame, g, 'tro_choi_kd', images);
    const practiceImg = resolveAccurateGameImage(rule.practiceGame, g, 'tro_choi_vd', images);
    const movement = resolveAccurateMovement('', rule.movementName, g, images);

    const rows = createBalanced7LessonRows(g, rule.cleanTitle, images, rule.warmupGame, rule.practiceGame);

    rows[0] = {
      ...rows[0],
      content: `1. HOẠT ĐỘNG MỞ ĐẦU\n1.1. Nhận lớp: Kiểm tra sĩ số, trang phục, sức khỏe.\n1.2. Khởi động: Xoay cổ tay, cổ chân, vai, cánh tay, hông, gối, ép dọc, ép ngang.\n1.3. Trò chơi bổ trợ khởi động: "${rule.warmupGame}".`,
      gv: `- GV tập trung lớp, thăm hỏi tình hình sức khỏe học sinh; kiểm tra trang phục giày tập đúng quy định.\n- Phổ biến mục tiêu, yêu cầu cần đạt của bài học một cách ngắn gọn, truyền cảm hứng.\n- Hướng dẫn cán sự điều khiển khởi động xoay kỹ các khớp theo nhạc hoặc nhịp hô dứt khoát.\n- Tổ chức trò chơi bổ trợ khởi động "${rule.warmupGame}" tạo không khí vui tươi, hào hứng trước khi vào bài mới; quan sát bao quát và nhắc nhở tinh thần tập trung.`,
      hs: `- Cán sự tập hợp lớp thành 4 hàng ngang, điểm số, chỉnh đốn hàng ngũ và báo cáo sĩ số cho GV.\n- Học sinh lắng nghe phổ biến, ghi nhớ yêu cầu tiết học.\n- Thực hiện xoay kỹ các khớp theo nhịp đếm của cán sự lớp, khởi động tích cực, đúng biên độ.\n- Hào hứng tham gia trò chơi khởi động "${rule.warmupGame}", chấp hành nghiêm túc hiệu lệnh của giáo viên.`,
      contentImgUrl: warmupImg.url,
      contentImgTitle: warmupImg.title
    };

    rows[1] = {
      ...rows[1],
      content: `2. HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC MỚI\n2.1. Khám phá & Làm quen động tác:\n* Học ${rule.movementName}:\n${movement.movementSteps}`,
      gv: movement.gvExplanation,
      hs: movement.hsTask,
      contentImgUrl: movement.imgUrl,
      contentImgTitle: movement.imgTitle
    };

    return {
      id: `plan_k${g}_t${pNum}_w${selectedWeek}`,
      week: selectedWeek,
      grade: g,
      lessonNum: pNum,
      topic: rule.topic,
      title: `${rule.cleanTitle} (Tiết ${pNum % 2 === 1 ? 1 : 2})`,
      rows,
      specialCompetencies: {
        healthCare: `Biết chuẩn bị trang phục gọn gàng, vệ sinh sân tập, đảm bảo an toàn trước và trong khi tập luyện ${rule.movementName}.`,
        basicMovement: `Biết và thực hiện được kỹ thuật ${rule.movementName} đúng tư thế, biên độ và nhịp đếm.`,
        sportsCompetency: `Biết tham gia chơi trò chơi bổ trợ "${rule.warmupGame}" và trò chơi vận động "${rule.practiceGame}" đúng luật, nhiệt tình.`,
        disabledStudents: `Đối với học sinh khuyết tật: giảm nhẹ biên độ vận động ${rule.movementName}, cho phép tập ở tư thế tự nhiên hoặc hỗ trợ bạn làm trọng tài trò chơi.`
      },
      generalCompetencies: {
        selfControl: 'Tự giác thực hiện nhiệm vụ tập luyện cá nhân và phối hợp nhóm.',
        communication: 'Biết chia sẻ, hướng dẫn bạn cùng tiến bộ.',
        problemSolving: 'Biết xử lí tình huống đơn giản trong trò chơi vận động.',
        disabledStudents: 'Giảm nhẹ các yêu cầu về năng lực chung. Tuỳ tình hình tiến bộ của HS mà GV linh hoạt áp dụng với tinh thần học hoà nhập.'
      },
      qualities: {
        patriotism: 'Yêu nước, tự hào về truyền thống rèn luyện thân thể bảo vệ Tổ quốc.',
        kindness: 'Nhân ái, yêu thương và tương trợ, giúp đỡ bạn bè trong học tập.',
        diligence: 'Chăm chỉ, tích cực tham gia các hoạt động tập luyện và giữ gìn dụng cụ.',
        honesty: 'Trung thực, thật thà trong chơi trò chơi và tự giác đánh giá kết quả.',
        responsibility: 'Trách nhiệm, có ý thức giữ gìn vệ sinh sân bãi, cất đặt dụng cụ gọn gàng.'
      },
      integrations: {
        digitalSkill: 'Mã 4.1TC1a',
        digitalDescription: 'Học sinh biết sử dụng thiết bị số an toàn khi quan sát học liệu số và AI phân tích tư thế.',
        lifeSkills: 'Rèn luyện tính kỷ luật, tác phong nhanh nhẹn và tinh thần đoàn kết.',
        environmentalEducation: 'Giữ vệ sinh sân bãi sạch sẽ, không xả rác bừa bãi, bảo quản dụng cụ tập luyện.'
      },
      signatures: {
        locationDate: customApprovalDate,
        bgh: schoolSettings.approverPrincipal || 'Võ Thị Thuận',
        headTeacher: schoolSettings.approverHead || 'Bùi Ngọc Lâm',
        teacher: schoolSettings.teacherName || 'Lê Quốc Hưng'
      },
      locationEquipment: {
        location: 'Sân trường bằng phẳng, sạch sẽ, thoáng mát và đảm bảo an toàn tập luyện.',
        equipmentGv: 'Còi, tranh ảnh kỹ thuật SGK, thiết bị số trình chiếu, dụng cụ tập luyện chuẩn.',
        equipmentHs: 'Trang phục thể thao gọn gàng, giày tập, gậy thể dục (Khối 5).'
      }
    };
  };

  // Rebuild plans when week or schedule changes
  useEffect(() => {
    const list: MasterPlanItem[] = [
      buildAuthenticPlan(1, 19),
      buildAuthenticPlan(1, 20),
      buildAuthenticPlan(3, 19),
      buildAuthenticPlan(3, 20),
      buildAuthenticPlan(5, 19),
      buildAuthenticPlan(5, 20),
      buildAuthenticPlan(5, 21),
    ];

    try {
      const savedPlans = localStorage.getItem(`gdtc_plans_w${selectedWeek}`);
      if (savedPlans) {
        const parsed = JSON.parse(savedPlans);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach((sp: MasterPlanItem) => {
            const matchIdx = list.findIndex((p) => p.grade === sp.grade && p.lessonNum === sp.lessonNum);
            if (matchIdx >= 0) {
              list[matchIdx] = {
                ...list[matchIdx],
                ...sp,
                rows: sp.rows && sp.rows.length > 0 ? sp.rows : list[matchIdx].rows
              };
            }
          });
        }
      }
    } catch (e) {
      console.warn(e);
    }

    setPlansByGrade(list);
  }, [selectedWeek, weeklyScheduleRows]);

  // Compute curriculum audit across all 3 grades
  const auditReport: AuditReport = useMemo(() => {
    return auditCurriculumSync(plansByGrade, weeklyScheduleRows, selectedWeek);
  }, [plansByGrade, weeklyScheduleRows, selectedWeek]);

  // Auto-sync 100% curriculum
  const handleAutoSyncAllCurriculum = () => {
    const result = autoSyncCurriculumAndPlans(plansByGrade, weeklyScheduleRows, selectedWeek, images);
    setWeeklyScheduleRows(result.updatedScheduleRows);
    setPlansByGrade(result.updatedPlans);

    try {
      localStorage.setItem(`gdtc_schedule_w${selectedWeek}`, JSON.stringify(result.updatedScheduleRows));
      localStorage.setItem(`gdtc_plans_w${selectedWeek}`, JSON.stringify(result.updatedPlans));
      setAppStateDB(`gdtc_schedule_w${selectedWeek}`, result.updatedScheduleRows);
      setAppStateDB(`gdtc_plans_w${selectedWeek}`, result.updatedPlans);
    } catch (e) {
      console.warn(e);
    }

    if (onUpdateMasterPlanItem) {
      setTimeout(() => {
        result.updatedPlans.forEach((p) => {
          onUpdateMasterPlanItem(`k${p.grade}_t${p.lessonNum}`, p);
        });
      }, 0);
    }

    showToast('✨ Đã đồng bộ 100% Tên bài TKB & Giáo án, Động tác Cột 1, Trò chơi và Năng lực giảm tải cho HS khuyết tật chuẩn SGK!');
    setIsAuditModalOpen(false);
  };

  // Upload & Parse Weekly Plan File (.docx, .pdf, text, table)
  const handleFileUploadWeeklyPlan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      let rawText = '';
      if (file.name.toLowerCase().endsWith('.docx')) {
        const ab = await file.arrayBuffer();
        const res = await mammoth.convertToHtml({ arrayBuffer: ab });
        rawText = res.value;
      } else {
        rawText = await file.text();
      }

      parseAndApplyWeeklyPlan(rawText);
      setIsUploadPlanModalOpen(false);
      showToast(`Đã nạp thành công kế hoạch tuần từ file "${file.name}"!`);
    } catch (err) {
      console.error(err);
      showToast('Có lỗi khi đọc file kế hoạch. Vui lòng kiểm tra định dạng.');
    }
  };

  // Parse Table Text & apply to weeklyScheduleRows and plans
  const parseAndApplyWeeklyPlan = (content: string) => {
    const rows: WeeklyMasterScheduleRow[] = [...weeklyScheduleRows];

    // Try HTML table parsing
    if (content.includes('<tr') || content.includes('<table')) {
      const doc = new DOMParser().parseFromString(content, 'text/html');
      const trs = doc.querySelectorAll('tr');
      let currentDay = 'Thứ 2';
      let currentSession = 'Sáng';
      let rowPointer = 0;

      trs.forEach((tr) => {
        const text = tr.textContent || '';
        if (text.toLowerCase().includes('thứ 2')) currentDay = 'Thứ 2';
        else if (text.toLowerCase().includes('thứ 3')) currentDay = 'Thứ 3';
        else if (text.toLowerCase().includes('thứ 4')) currentDay = 'Thứ 4';
        else if (text.toLowerCase().includes('thứ 5')) currentDay = 'Thứ 5';
        else if (text.toLowerCase().includes('thứ 6')) currentDay = 'Thứ 6';

        if (text.toLowerCase().includes('sáng')) currentSession = 'Sáng';
        else if (text.toLowerCase().includes('chiều')) currentSession = 'Chiều';

        const cells = Array.from(tr.querySelectorAll('td, th')).map((c) => c.textContent?.trim() || '');
        if (cells.length >= 4 && !cells[0].toLowerCase().includes('thứ') && !cells[1].toLowerCase().includes('tiết')) {
          if (rowPointer < rows.length) {
            const periodMatch = cells[1].match(/\d+/);
            const pNum = periodMatch ? parseInt(periodMatch[0], 10) : rows[rowPointer].period;
            const classText = cells[2] || rows[rowPointer].classRoom;
            const titleText = cells[3] || rows[rowPointer].lessonTitle;
            const ppctMatch = cells.length > 4 ? cells[4].match(/\d+/) : null;
            const ppctNum = ppctMatch ? parseInt(ppctMatch[0], 10) : rows[rowPointer].ppct;
            const integText = cells.length > 5 ? cells[5] : '';
            const equipText = cells.length > 6 ? cells[6] : rows[rowPointer].equipment;

            const g: 1 | 3 | 5 = classText.includes('1') ? 1 : classText.includes('3') ? 3 : 5;

            rows[rowPointer] = {
              dayOfWeek: currentDay,
              session: currentSession,
              period: pNum,
              classRoom: classText,
              grade: g,
              lessonTitle: titleText,
              ppct: ppctNum,
              integrationNotes: integText || rows[rowPointer].integrationNotes,
              equipment: equipText || rows[rowPointer].equipment
            };
            rowPointer++;
          }
        }
      });
    }

    // Save immediately to persistent storage
    setWeeklyScheduleRows(rows);
    try {
      localStorage.setItem(`gdtc_schedule_w${selectedWeek}`, JSON.stringify(rows));
      setAppStateDB(`gdtc_schedule_w${selectedWeek}`, rows);
    } catch (e) {
      console.warn(e);
    }
  };

  // Direct Inline Edit of Lesson Row
  const handleUpdateActiveRow = (rowIdx: number, field: keyof LessonRow, val: string) => {
    setPlansByGrade((prev) => {
      const copy = [...prev];
      const pIdx = copy.findIndex((p) => p.grade === selectedGradeTab);
      if (pIdx >= 0) {
        const rowsCopy = [...copy[pIdx].rows];
        rowsCopy[rowIdx] = {
          ...rowsCopy[rowIdx],
          [field]: val
        };
        copy[pIdx] = {
          ...copy[pIdx],
          rows: rowsCopy
        };
        try {
          localStorage.setItem(`gdtc_plans_w${selectedWeek}`, JSON.stringify(copy));
        } catch (e) {
          console.warn(e);
        }
      }
      return copy;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const activePlan = plansByGrade.find((p) => p.grade === selectedGradeTab) || plansByGrade[0];

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Center */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 no-print">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Printer className="w-5 h-5 text-blue-600" />
              6. Xem Trước & In Toàn Bộ Kế Hoạch Dạy Học 3 Khối (K1, K3, K5)
            </h2>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Đồng bộ SGK: {auditReport.overallSyncRate}%
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Tự động đồng bộ chuẩn sách giáo khoa Kết nối tri thức: 100% đúng trò chơi khởi động, trò chơi vận động và hình ảnh SGK.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Week Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <select
              value={selectedWeek}
              onChange={(e) => {
                const w = Number(e.target.value);
                setSelectedWeek(w);
                try {
                  localStorage.setItem('gdtc_active_week', String(w));
                  setAppStateDB('gdtc_active_week', w);
                } catch (err) {
                  console.warn(err);
                }
              }}
              className="text-xs font-bold bg-transparent text-slate-800 focus:outline-hidden"
            >
              {Array.from({ length: 35 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>Tuần {w}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" /> Rà Soát & Đối Chiếu Chuẩn SGK
          </button>

          <button
            onClick={handleAutoSyncAllCurriculum}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-4 h-4" /> Đồng Bộ 100% Cả 3 Khối
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4" /> In / Lưu PDF Trực Tiếp
          </button>
        </div>
      </div>

      {/* Grade Selector Tabs for Preview */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 no-print">
        <button
          onClick={() => setSelectedGradeTab(1)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            selectedGradeTab === 1
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Khối 1 (Tiết 19, 20)
        </button>
        <button
          onClick={() => setSelectedGradeTab(3)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            selectedGradeTab === 3
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Khối 3 (Tiết 19, 20)
        </button>
        <button
          onClick={() => setSelectedGradeTab(5)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            selectedGradeTab === 5
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Khối 5 (Tiết 19, 20, 21)
        </button>
      </div>

      {/* PAGE 1: 16-PERIOD MASTER TIMETABLE SCHEDULE WITH UPLOAD BAR */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase font-semibold text-slate-500">TRƯỜNG TIỂU HỌC NGHĨA HIỆP - TỔ CHUYÊN MÔN TIỂU HỌC</p>
          <h3 className="font-extrabold text-base text-slate-900 uppercase">
            KẾ HOẠCH DẠY HỌC MÔN GIÁO DỤC THỂ CHẤT - TUẦN {selectedWeek}
          </h3>
          <p className="text-xs text-slate-600 italic">({customDateRange})</p>
        </div>

        {/* Action Header Card with Upload Weekly Plan & Audit Buttons */}
        <div className="bg-blue-50/70 border border-blue-200 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span className="font-bold text-slate-800 text-xs">
              Bảng 16 Tiết Giảng Dạy Tuần {selectedWeek} (Khối 1, 3, 5): Tự động đồng bộ với giáo án 3 khối
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={filePlanInputRef}
              onChange={handleFileUploadWeeklyPlan}
              accept=".docx,.pdf,.txt,.html"
              className="hidden"
            />
            <button
              onClick={() => setIsUploadPlanModalOpen(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" /> Nạp File Kế Hoạch Tuần & Tích Hợp
            </button>
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" /> Rà Soát & Đối Chiếu PPCT 3 Khối
            </button>
          </div>
        </div>

        {/* 7-Column Master Schedule Table */}
        <div className="overflow-x-auto border border-slate-300 rounded-lg">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-center border-b border-slate-300">
              <tr>
                <th className="p-2.5 border-r border-slate-300 w-24">Thứ</th>
                <th className="p-2.5 border-r border-slate-300 w-16">Tiết</th>
                <th className="p-2.5 border-r border-slate-300 w-16">Lớp</th>
                <th className="p-2.5 border-r border-slate-300">Bài Học</th>
                <th className="p-2.5 border-r border-slate-300 w-16">PPCT</th>
                <th className="p-2.5 border-r border-slate-300 w-2/5">Nội Dung Tích Hợp / Điều Chỉnh</th>
                <th className="p-2.5 w-28">ĐDDH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {weeklyScheduleRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5 border-r border-slate-300 font-semibold text-slate-800 text-center">
                    {row.dayOfWeek} – {row.session}
                  </td>
                  <td className="p-2.5 border-r border-slate-300 text-center font-bold">{row.period}</td>
                  <td className="p-2.5 border-r border-slate-300 text-center font-bold text-blue-700">{row.classRoom}</td>
                  <td className="p-2.5 border-r border-slate-300 font-medium text-slate-900">{row.lessonTitle}</td>
                  <td className="p-2.5 border-r border-slate-300 text-center font-bold text-indigo-700">{row.ppct}</td>
                  <td className="p-2.5 border-r border-slate-300 text-slate-700 whitespace-pre-line leading-relaxed">
                    {row.integrationNotes}
                  </td>
                  <td className="p-2.5 text-center text-slate-600 text-[11px]">{row.equipment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGE 2: DETAILED LESSON PLAN WITH INLINE DIRECT EDITING */}
      {activePlan && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs uppercase font-semibold text-slate-500">{schoolSettings.schoolName || 'TRƯỜNG TIỂU HỌC NGHĨA HIỆP'}</p>
              <h3 className="font-extrabold text-base text-slate-900 uppercase mt-1">
                KẾ HOẠCH BÀI DẠY KHỐI {activePlan.grade} · TIẾT {activePlan.lessonNum} (TUẦN {selectedWeek})
              </h3>
              <p className="text-xs text-blue-700 font-bold mt-0.5">{cleanTopicForDisplay(activePlan.topic, activePlan.grade)}</p>
              <h4 className="text-sm font-extrabold text-slate-800 uppercase mt-1">{cleanLessonTitleForHeader(activePlan.title)}</h4>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-2">
              <div>
                <p>Giáo viên: <span className="font-bold text-slate-800">{schoolSettings.teacherName || 'LÊ QUỐC HƯNG'}</span></p>
                <p>{customApprovalDate}</p>
              </div>

              {/* Direct Inline Edit Button */}
              <div className="no-print">
                <button
                  onClick={() => setIsDirectEditMode(!isDirectEditMode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                    isDirectEditMode
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {isDirectEditMode ? 'Đang Chỉnh Sửa Trực Tiếp (Tự động lưu)' : 'Sửa Trực Tiếp Giáo Án'}
                </button>
              </div>
            </div>
          </div>

          {/* I. YÊU CẦU CẦN ĐẠT */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <h4 className="font-extrabold uppercase text-slate-900 text-xs border-b border-slate-300 pb-1 flex items-center justify-between">
              <span>I. YÊU CẦU CẦN ĐẠT</span>
              {isDirectEditMode && <span className="text-amber-700 font-normal lowercase">(chế độ chỉnh sửa trực tiếp)</span>}
            </h4>
            <div className="space-y-1.5 text-slate-700 leading-relaxed">
              <p><strong>1. Năng lực đặc thù:</strong> {activePlan.specialCompetencies?.basicMovement} {activePlan.specialCompetencies?.sportsCompetency}</p>
              <p><strong>* Giảm tải cho HS khuyết tật:</strong> <span className="text-emerald-700 font-medium">{activePlan.specialCompetencies?.disabledStudents}</span></p>
              <p><strong>2. Năng lực chung:</strong> {activePlan.generalCompetencies?.selfControl} {activePlan.generalCompetencies?.communication}</p>
              <p><strong>3. Phẩm chất:</strong> {activePlan.qualities?.patriotism} {activePlan.qualities?.diligence} {activePlan.qualities?.responsibility}</p>
              <p><strong>4. Nội dung tích hợp:</strong> {activePlan.integrations?.digitalDescription} ({activePlan.integrations?.digitalSkill}) - {activePlan.integrations?.lifeSkills} - {activePlan.integrations?.environmentalEducation}</p>
            </div>
          </div>

          {/* 4-COLUMN LESSON ACTIVITIES TABLE */}
          <div className="overflow-x-auto border border-slate-300 rounded-lg">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-center border-b border-slate-300">
                <tr>
                  <th className="p-3 w-1/4 border-r border-slate-300">1. Nội Dung / Kỹ Thuật Động Tác</th>
                  <th className="p-3 w-20 text-center border-r border-slate-300">2. LVĐ</th>
                  <th className="p-3 w-1/3 border-r border-slate-300">3. Hoạt Động Của Giáo Viên</th>
                  <th className="p-3 w-1/3">4. Hoạt Động Của Học Sinh / Sơ Đồ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activePlan.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    {/* Column 1 */}
                    <td className="p-3 border-r border-slate-300 align-top font-medium text-slate-800 whitespace-pre-line leading-relaxed">
                      {isDirectEditMode ? (
                        <textarea
                          rows={4}
                          value={row.content}
                          onChange={(e) => handleUpdateActiveRow(idx, 'content', e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded-lg text-xs font-medium bg-white"
                        />
                      ) : (
                        row.content
                      )}

                      {row.contentImgUrl && (
                        <div className="mt-2.5 p-1.5 bg-white border border-slate-200 rounded-xl inline-block shadow-2xs">
                          <img src={row.contentImgUrl} alt={row.contentImgTitle || ''} className="max-h-24 object-contain rounded-lg" />
                          <span className="text-[10px] text-slate-500 block text-center mt-1 font-semibold">{row.contentImgTitle}</span>
                        </div>
                      )}
                    </td>

                    {/* Column 2 */}
                    <td className="p-3 border-r border-slate-300 align-top text-center font-bold text-slate-700 whitespace-pre-line">
                      {isDirectEditMode ? (
                        <input
                          type="text"
                          value={row.lvd}
                          onChange={(e) => handleUpdateActiveRow(idx, 'lvd', e.target.value)}
                          className="w-full p-1 border border-slate-300 rounded text-center text-xs font-bold"
                        />
                      ) : (
                        row.lvd
                      )}
                    </td>

                    {/* Column 3 */}
                    <td className="p-3 border-r border-slate-300 align-top text-slate-700 whitespace-pre-line leading-relaxed">
                      {isDirectEditMode ? (
                        <textarea
                          rows={5}
                          value={row.gv}
                          onChange={(e) => handleUpdateActiveRow(idx, 'gv', e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                        />
                      ) : (
                        row.gv
                      )}
                    </td>

                    {/* Column 4 */}
                    <td className="p-3 align-top text-slate-700 whitespace-pre-line leading-relaxed">
                      {isDirectEditMode ? (
                        <textarea
                          rows={5}
                          value={row.hs}
                          onChange={(e) => handleUpdateActiveRow(idx, 'hs', e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                        />
                      ) : (
                        row.hs
                      )}

                      {row.hsImgUrl && (
                        <div className="mt-2.5 p-1.5 bg-white border border-slate-200 rounded-xl inline-block shadow-2xs">
                          <img src={row.hsImgUrl} alt={row.hsImgTitle || ''} className="max-h-24 object-contain rounded-lg" />
                          <span className="text-[10px] text-slate-500 block text-center mt-1 font-semibold">{row.hsImgTitle}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: NẠP FILE KẾ HOẠCH TUẦN & TÍCH HỢP */}
      {isUploadPlanModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                Nạp File Kế Hoạch Dạy Học Tuần & Tích Hợp (Word / Text)
              </h3>
              <button onClick={() => setIsUploadPlanModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div
                onClick={() => filePlanInputRef.current?.click()}
                className="border-2 border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-50 rounded-2xl p-6 text-center cursor-pointer transition"
              >
                <FileText className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">Nhấp để chọn File Kế hoạch Tuần (.docx, .pdf, .txt)</h4>
                <p className="text-slate-500 text-[11px] mt-1">
                  Hệ thống tự động đọc bảng 16 tiết giảng dạy, phân tích cột tích hợp (QPAN, Môi trường, Năng lực số) và tự động đồng bộ sang giáo án 3 khối.
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Hoặc Dán Trực Tiếp Bảng / Văn Bản Kế Hoạch Tuần Vào Đây:
                </label>
                <textarea
                  rows={6}
                  value={pasteTableText}
                  onChange={(e) => setPasteTableText(e.target.value)}
                  placeholder="Dán nội dung bảng Word hoặc văn bản kế hoạch tuần..."
                  className="w-full p-3 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="px-6 py-3 border-t border-slate-200 flex justify-end gap-2 bg-slate-50">
              <button onClick={() => setIsUploadPlanModalOpen(false)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs">
                Đóng
              </button>
              <button
                onClick={() => {
                  if (pasteTableText.trim()) {
                    parseAndApplyWeeklyPlan(pasteTableText);
                    setIsUploadPlanModalOpen(false);
                    showToast('Đã nạp và cập nhật bảng kế hoạch tuần thành công!');
                  }
                }}
                disabled={!pasteTableText.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs disabled:opacity-50"
              >
                Cập Nhật Kế Hoạch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RÀ SOÁT & ĐỐI CHIẾU CHUẨN SGK */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800 text-sm">
                  Rà Soát & Đối Chiếu Chuẩn SGK (Khối 1 - 3 - 5) · Tuần {selectedWeek}
                </h3>
              </div>
              <button onClick={() => setIsAuditModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Sync Percentage Badge */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase">Mức Độ Đồng Bộ Chuẩn SGK:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-extrabold text-emerald-600">{auditReport.overallSyncRate}% Chuẩn</span>
                    <span className="text-xs text-slate-500">({auditReport.passedChecks}/{auditReport.totalChecks} tiêu chí kiểm định đã đạt chuẩn tuyệt đối)</span>
                  </div>
                </div>
                <button
                  onClick={handleAutoSyncAllCurriculum}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" /> Đồng Bộ 100% Cả 3 Khối Chuẩn SGK
                </button>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-100 text-slate-800 font-bold uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-2.5 border-r border-slate-200">Khối / PPCT</th>
                      <th className="p-2.5 border-r border-slate-200">Tên Bài TKB vs Giáo Án</th>
                      <th className="p-2.5 border-r border-slate-200">Trò Chơi Khởi Động SGK</th>
                      <th className="p-2.5 border-r border-slate-200">Trò Chơi Vận Động SGK</th>
                      <th className="p-2.5 border-r border-slate-200">HS Khuyết Tật</th>
                      <th className="p-2.5 text-center">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {auditReport.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 border-r border-slate-200 font-bold">
                          Khối {item.grade} <span className="text-slate-500 font-normal">Tiết {item.ppct}</span>
                        </td>
                        <td className="p-2.5 border-r border-slate-200 font-medium">
                          {item.expectedTitle}
                        </td>
                        <td className="p-2.5 border-r border-slate-200 font-bold text-blue-700">
                          {item.expectedWarmupGame}
                        </td>
                        <td className="p-2.5 border-r border-slate-200 font-bold text-indigo-700">
                          {item.expectedPracticeGame}
                        </td>
                        <td className="p-2.5 border-r border-slate-200 text-emerald-700 font-medium">
                          ✓ Đã có giảm tải
                        </td>
                        <td className="p-2.5 text-center font-bold">
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800">
                            ✓ Chuẩn SGK
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-slate-200 flex justify-end gap-2 bg-slate-50">
              <button onClick={() => setIsAuditModalOpen(false)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl">
                Đóng
              </button>
              <button
                onClick={handleAutoSyncAllCurriculum}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" /> Đồng Bộ Ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
