import { MasterPlanItem } from '../data/masterTemplateTuan8';
import { SgkImageItem, LessonRow } from '../types/gdtc';
import { resolveAccurateMovement, resolveAccurateGameImage, createBalanced7LessonRows } from './planAutoMatcher';
export { createBalanced7LessonRows };


export interface WeeklyMasterScheduleRow {
  dayOfWeek: string;
  session: string;
  period: number;
  classRoom: string;
  grade: 1 | 3 | 5;
  lessonTitle: string;
  ppct: number;
  integrationNotes: string;
  equipment: string;
}

export interface CurriculumRule {
  grade: 1 | 3 | 5;
  ppct: number;
  week: number;
  cleanTitle: string;
  topic: string;
  movementName: string;
  movementKey: string;
  warmupGame: string;
  practiceGame: string;
  disabledStudentsSpecial?: string;
  disabledStudentsGeneral?: string;
}

export interface AuditCheckItem {
  grade: 1 | 3 | 5;
  ppct: number;
  titleMatches: boolean;
  warmupGameMatches: boolean;
  practiceGameMatches: boolean;
  movementImageMatches: boolean;
  hasDisabledAccommodations: boolean;
  currentTitle: string;
  expectedTitle: string;
  currentWarmupGame: string;
  expectedWarmupGame: string;
  currentPracticeGame: string;
  expectedPracticeGame: string;
  status: 'synced' | 'mismatch';
}

export interface AuditReport {
  overallSyncRate: number; // e.g. 100%
  totalChecks: number;
  passedChecks: number;
  items: AuditCheckItem[];
}

export function cleanLessonTitleForHeader(title?: string): string {
  if (!title) return '';
  return title
    .replace(/\s*\(\s*tiết\s*\d+[^)]*\)/gi, '')
    .replace(/\s*\(tiết\s*\d+\)/gi, '')
    .replace(/\s*-\s*tiết\s*\d+/gi, '')
    .trim();
}

export function cleanTopicForDisplay(topic?: string, grade: number = 1): string {
  if (!topic) {
    return grade === 5 ? 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY' : 'CHỦ ĐỀ 2: BÀI THỂ DỤC';
  }
  return topic.toUpperCase().trim();
}

/**
 * Authoritative GDPT 2018 (Kết nối tri thức) curriculum rules by Grade & PPCT period.
 * Strictly adheres to physical education textbooks - NO FABRICATED GAMES.
 */
export function getCurriculumRule(grade: 1 | 3 | 5, ppct: number, week?: number): CurriculumRule {
  const currentWeek = week || (grade === 5 ? Math.ceil((ppct - 1) / 2) : Math.ceil(ppct / 2));

  // KHỐI 1
  if (grade === 1) {
    if (ppct === 17 || ppct === 18) {
      return {
        grade: 1,
        ppct,
        week: 9,
        cleanTitle: 'Bài 2: ĐỘNG TÁC CHÂN, ĐỘNG TÁC BỤNG',
        topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
        movementName: 'Động tác Chân',
        movementKey: 'chan',
        warmupGame: 'Làm theo hiệu lệnh',
        practiceGame: 'Lò cò tiếp sức'
      };
    }
    if (ppct === 19 || ppct === 20) {
      return {
        grade: 1,
        ppct,
        week: 10,
        cleanTitle: 'Bài 2: ĐỘNG TÁC CHÂN, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC BỤNG',
        topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
        movementName: ppct === 19 ? 'Động tác Vặn mình' : 'Động tác Bụng',
        movementKey: ppct === 19 ? 'van_minh' : 'bung',
        warmupGame: 'Kết bạn',
        practiceGame: 'Lò cò tiếp sức'
      };
    }
    // Default fallback K1
    return {
      grade: 1,
      ppct,
      week: currentWeek,
      cleanTitle: 'Bài 2: ĐỘNG TÁC CHÂN, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC BỤNG',
      topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
      movementName: 'Động tác Vặn mình',
      movementKey: 'van_minh',
      warmupGame: 'Kết bạn',
      practiceGame: 'Lò cò tiếp sức'
    };
  }

  // KHỐI 3
  if (grade === 3) {
    if (ppct === 17 || ppct === 18) {
      return {
        grade: 3,
        ppct,
        week: 9,
        cleanTitle: 'Bài 1: ĐỘNG TÁC VƯƠN THỞ, ĐỘNG TÁC TAY, ĐỘNG TÁC CHÂN',
        topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC',
        movementName: 'Động tác Vươn thở, Động tác Tay',
        movementKey: 'vuon_tho',
        warmupGame: 'Chui qua hầm',
        practiceGame: 'Đua ô tô'
      };
    }
    if (ppct === 19 || ppct === 20) {
      return {
        grade: 3,
        ppct,
        week: 10,
        cleanTitle: 'Bài 1: ĐỘNG TÁC VƯƠN THỞ, ĐỘNG TÁC TAY, ĐỘNG TÁC CHÂN',
        topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC',
        movementName: 'Động tác Chân',
        movementKey: 'chan',
        warmupGame: 'Chui qua hầm',
        practiceGame: 'Chạy nhanh tiếp sức'
      };
    }
    return {
      grade: 3,
      ppct,
      week: currentWeek,
      cleanTitle: 'Bài 1: ĐỘNG TÁC VƯƠN THỞ, ĐỘNG TÁC TAY, ĐỘNG TÁC CHÂN',
      topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC',
      movementName: 'Động tác Chân',
      movementKey: 'chan',
      warmupGame: 'Chui qua hầm',
      practiceGame: 'Chạy nhanh tiếp sức'
    };
  }

  // KHỐI 5 (CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY)
  // Tuần 10: Tiết 19, 20, 21 - Bài 2: Động tác Bụng, Vặn mình, Toàn thân với gậy
  // Trò chơi bổ trợ khởi động chuẩn SGK Trang 29: "Đội nào nhanh nhất"!
  // Trò chơi vận động chuẩn SGK Trang 32 / 26: "Chuyển bóng tiếp sức" hoặc "Chuyền gậy tiếp sức".
  if (grade === 5) {
    if (ppct === 19) {
      return {
        grade: 5,
        ppct: 19,
        week: 10,
        cleanTitle: 'Bài 2: ĐỘNG TÁC BỤNG, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC TOÀN THÂN VỚI GẬY',
        topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY',
        movementName: 'Động tác Bụng với gậy',
        movementKey: 'gay',
        warmupGame: 'Đội nào nhanh nhất',
        practiceGame: 'Chuyền bóng tiếp sức'
      };
    }
    if (ppct === 20) {
      return {
        grade: 5,
        ppct: 20,
        week: 10,
        cleanTitle: 'Bài 2: ĐỘNG TÁC BỤNG, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC TOÀN THÂN VỚI GẬY',
        topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY',
        movementName: 'Động tác Vặn mình với gậy',
        movementKey: 'gay',
        warmupGame: 'Đội nào nhanh nhất',
        practiceGame: 'Chuyển bóng tiếp sức'
      };
    }
    if (ppct === 21) {
      return {
        grade: 5,
        ppct: 21,
        week: 10,
        cleanTitle: 'Bài 2: ĐỘNG TÁC BỤNG, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC TOÀN THÂN VỚI GẬY',
        topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY',
        movementName: 'Động tác Toàn thân với gậy',
        movementKey: 'gay',
        warmupGame: 'Đội nào nhanh nhất',
        practiceGame: 'Chuyền gậy tiếp sức'
      };
    }
    // Fallback for Grade 5
    return {
      grade: 5,
      ppct,
      week: currentWeek,
      cleanTitle: 'Bài 2: ĐỘNG TÁC BỤNG, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC TOÀN THÂN VỚI GẬY',
      topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY',
      movementName: 'Động tác với gậy',
      movementKey: 'gay',
      warmupGame: 'Đội nào nhanh nhất',
      practiceGame: 'Chuyền gậy tiếp sức'
    };
  }

  return {
    grade,
    ppct,
    week: currentWeek,
    cleanTitle: 'Bài học Thể dục',
    topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
    movementName: 'Kỹ thuật động tác chuẩn SGK',
    movementKey: 'vuon_tho',
    warmupGame: 'Làm theo hiệu lệnh',
    practiceGame: 'Lò cò tiếp sức'
  };
}

export function auditCurriculumSync(
  plans: MasterPlanItem[],
  scheduleRows: WeeklyMasterScheduleRow[],
  currentWeek: number
): AuditReport {
  let passed = 0;
  let total = 0;

  const items: AuditCheckItem[] = plans.map((plan) => {
    const rule = getCurriculumRule(plan.grade as 1 | 3 | 5, plan.lessonNum, currentWeek);
    const schedRow = scheduleRows.find((r) => r.grade === plan.grade && r.ppct === plan.lessonNum);

    const schedTitle = cleanLessonTitleForHeader(schedRow?.lessonTitle || '');
    const planTitle = cleanLessonTitleForHeader(plan.title);
    const expectedTitle = cleanLessonTitleForHeader(rule.cleanTitle);

    const titleMatches = schedTitle === expectedTitle || planTitle === expectedTitle;

    const row0 = plan.rows[0];
    const currentWarmup = (row0?.content || '') + ' ' + (row0?.gv || '');
    const warmupGameMatches = currentWarmup.toLowerCase().includes(rule.warmupGame.toLowerCase());

    const practiceRow = plan.rows.find((r, idx) => idx >= 4);
    const currentPractice = (practiceRow?.content || '') + ' ' + (practiceRow?.gv || '');
    const practiceGameMatches = currentPractice.toLowerCase().includes(rule.practiceGame.toLowerCase());

    const movementRow = plan.rows[1];
    const movementImageMatches = Boolean(movementRow?.contentImgUrl && !movementRow.contentImgUrl.startsWith('data:image/svg+xml'));

    const hasDisabled = Boolean(
      plan.specialCompetencies?.disabledStudents &&
      plan.generalCompetencies?.disabledStudents
    );

    const allPassed = titleMatches && warmupGameMatches && practiceGameMatches && movementImageMatches && hasDisabled;

    total += 5;
    if (titleMatches) passed++;
    if (warmupGameMatches) passed++;
    if (practiceGameMatches) passed++;
    if (movementImageMatches) passed++;
    if (hasDisabled) passed++;

    return {
      grade: plan.grade as 1 | 3 | 5,
      ppct: plan.lessonNum,
      titleMatches,
      warmupGameMatches,
      practiceGameMatches,
      movementImageMatches,
      hasDisabledAccommodations: hasDisabled,
      currentTitle: planTitle,
      expectedTitle,
      currentWarmupGame: rule.warmupGame,
      expectedWarmupGame: rule.warmupGame,
      currentPracticeGame: rule.practiceGame,
      expectedPracticeGame: rule.practiceGame,
      status: allPassed ? 'synced' : 'mismatch'
    };
  });

  const overallSyncRate = total > 0 ? Math.round((passed / total) * 100) : 100;

  return {
    overallSyncRate,
    totalChecks: total,
    passedChecks: passed,
    items
  };
}

export function autoSyncCurriculumAndPlans(
  plans: MasterPlanItem[],
  scheduleRows: WeeklyMasterScheduleRow[],
  currentWeek: number,
  images: SgkImageItem[] = []
): { updatedPlans: MasterPlanItem[]; updatedScheduleRows: WeeklyMasterScheduleRow[] } {
  // 1. Synchronize Schedule Rows
  const updatedScheduleRows = scheduleRows.map((row) => {
    const rule = getCurriculumRule(row.grade as 1 | 3 | 5, row.ppct, currentWeek);
    return {
      ...row,
      lessonTitle: `${rule.cleanTitle} (Tiết ${row.ppct})`
    };
  });

  // 2. Synchronize Detailed Lesson Plans
  const updatedPlans = plans.map((plan) => {
    const rule = getCurriculumRule(plan.grade as 1 | 3 | 5, plan.lessonNum, currentWeek);
    const warmupImg = resolveAccurateGameImage(rule.warmupGame, plan.grade, 'tro_choi_kd', images);
    const practiceImg = resolveAccurateGameImage(rule.practiceGame, plan.grade, 'tro_choi_vd', images);
    const movementDetails = resolveAccurateMovement('', rule.movementName, plan.grade, images);

    const newRows: LessonRow[] = plan.rows.map((row, idx) => {
      // Row 0: Warmup
      if (idx === 0) {
        return {
          ...row,
          content: `1. HOẠT ĐỘNG MỞ ĐẦU\n1.1. Nhận lớp: Kiểm tra vệ sinh sân bãi, trang phục, sức khỏe học sinh.\n1.2. Khởi động: Xoay các khớp cổ tay, cổ chân, khớp vai, cánh tay, hông, đầu gối, ép dọc, ép ngang.\n1.3. Trò chơi bổ trợ khởi động: "${rule.warmupGame}".`,
          gv: `- GV tập trung lớp, thăm hỏi tình hình sức khỏe học sinh; kiểm tra sân bãi sạch sẽ, trang phục giày thể thao đúng quy định.\n- Phổ biến mục tiêu, yêu cầu cần đạt của bài học một cách ngắn gọn, truyền cảm hứng.\n- Hướng dẫn cán sự điều khiển lớp khởi động xoay kỹ các khớp theo nhạc hoặc nhịp hô dứt khoát.\n- Tổ chức trò chơi bổ trợ khởi động "${rule.warmupGame}" tạo không khí vui tươi, hào hứng trước khi vào bài mới; quan sát bao quát và nhắc nhở tinh thần tập trung, trật tự.`,
          hs: `- Cán sự tập hợp lớp thành 4 hàng ngang, điểm số, chỉnh đốn hàng ngũ và báo cáo sĩ số cho GV.\n- Học sinh lắng nghe phổ biến, ghi nhớ yêu cầu tiết học.\n- Thực hiện xoay kỹ các khớp theo nhịp đếm của cán sự lớp, khởi động tích cực, đúng biên độ.\n- Hào hứng tham gia trò chơi khởi động "${rule.warmupGame}", chấp hành nghiêm túc hiệu lệnh của giáo viên.`,
          contentImgUrl: warmupImg.url,
          contentImgTitle: warmupImg.title
        };
      }

      // Row 1: Technical Movement
      if (idx === 1) {
        return {
          ...row,
          content: `2. HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC MỚI\n2.1. Khám phá & Làm quen động tác:\n* Học ${rule.movementName}:\n${movementDetails.movementSteps}`,
          gv: movementDetails.gvExplanation,
          hs: movementDetails.hsTask,
          contentImgUrl: movementDetails.imgUrl,
          contentImgTitle: movementDetails.imgTitle
        };
      }

      // Practice Game Row (Row 5 or penultimate row)
      if (idx === 5 || (plan.rows.length === 7 && idx === 5) || idx === plan.rows.length - 2) {
        return {
          ...row,
          content: `3.4. Trò chơi vận động: "${rule.practiceGame}":\n- Tổ chức cho học sinh chơi theo luật chuẩn SGK, rèn luyện sự nhanh nhẹn, khéo léo và tinh thần đồng đội.`,
          gv: `- Nêu tên trò chơi vận động "${rule.practiceGame}", phân tích rõ mục đích rèn luyện sự khéo léo và sức mạnh phản xạ.\n- Nhắc lại luật chơi, ranh giới vạch xuất phát và cọc tiêu an toàn.\n- Cho 1 tổ chơi thử để cả lớp quan sát; sau đó cho cả lớp thi đấu chính thức giữa các tổ.\n- Quan sát, điều hành trọng tài công tâm; kịp thời biểu dương tổ hoàn thành nhanh và đúng luật.`,
          hs: `- Lắng nghe GV hướng dẫn luật chơi trò chơi vận động "${rule.practiceGame}".\n- Quan sát bạn chơi mẫu để nắm vững quy tắc tiếp sức.\n- Các tổ thi đấu nhiệt tình, phối hợp ăn ý, cổ vũ văn minh và tuân thủ tuyệt đối an toàn sân bãi.`,
          contentImgUrl: practiceImg.url,
          contentImgTitle: practiceImg.title
        };
      }

      return row;
    });

    return {
      ...plan,
      title: `${rule.cleanTitle} (Tiết ${plan.lessonNum})`,
      topic: rule.topic,
      rows: newRows,
      specialCompetencies: {
        healthCare: `Biết chuẩn bị trang phục, giày tập, vệ sinh sân tập; thực hiện các yêu cầu an toàn trước, trong và sau khi tập luyện nội dung ${rule.movementName}.`,
        basicMovement: `Thực hiện được ${rule.movementName} theo hướng dẫn của GV; biết xử lí một số tình huống đơn giản trong tập luyện và trò chơi vận động.`,
        sportsCompetency: `Biết quan sát tranh ảnh SGK, video/học liệu số hoặc động tác mẫu của GV về ${rule.movementName}; biết tự điều chỉnh động tác khi luyện tập.`,
        disabledStudents: 'Giảm nhẹ các yêu cầu về năng lực đặc thù. Tuỳ tình hình của HS mà GV linh hoạt áp dụng với tinh thần học hoà nhập, giảm cường độ vận động, yêu cầu kỹ thuật động tác, thực hiện ở mức độ cơ bản. Giữ vệ sinh cá nhân và sân tập.'
      },
      generalCompetencies: {
        selfControl: 'Tự giác tập luyện cá nhân và phối hợp tổ nhóm.',
        communication: 'Biết chia sẻ, hướng dẫn bạn cùng tiến bộ.',
        problemSolving: 'Biết xử lí tình huống đơn giản trong trò chơi vận động.',
        disabledStudents: 'Giảm nhẹ các yêu cầu về năng lực chung. Tuỳ tình hình tiến bộ của HS mà GV linh hoạt áp dụng với tinh thần học hoà nhập.'
      }
    };
  });

  return { updatedPlans, updatedScheduleRows };
}
