import { LessonRow } from '../types/gdtc';

export interface MasterPlanItem {
  id: string;
  grade: 1 | 3 | 5;
  week: number;
  lessonNum: number;
  topic: string;
  title: string;
  dateRange?: string;
  rows: LessonRow[];
  specialCompetencies?: {
    healthCare: string;
    basicMovement: string;
    sportsCompetency: string;
    disabledStudents?: string;
  };
  generalCompetencies?: {
    selfControl?: string;
    communication?: string;
    problemSolving?: string;
    disabledStudents?: string;
    autonomy?: string;
    collaboration?: string;
  };
  qualities?: {
    patriotism?: string;
    kindness?: string;
    diligence?: string;
    honesty?: string;
    responsibility?: string;
    disabledStudents?: string;
  };
  integrations?: {
    digitalSkill?: string;
    digitalDescription?: string;
    lifeSkills?: string;
    environmentalEducation?: string;
  };
  signatures?: {
    locationDate: string;
    bgh: string;
    headTeacher: string;
    teacher: string;
  };
  locationEquipment?: {
    location?: string;
    equipmentGv?: string;
    equipmentHs?: string;
    teacherTools?: string;
    studentTools?: string;
  };
  postLessonAdjustment?: string;
}

export function normalizeMasterPlan(plan: any): MasterPlanItem {
  if (!plan) {
    return {
      id: 'default_plan',
      grade: 1,
      week: 8,
      lessonNum: 15,
      topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
      title: 'Bài 1: Động tác vươn thở, động tác tay (Tiết 1)',
      rows: []
    };
  }

  return {
    id: plan.id || `plan_${plan.grade}_${plan.lessonNum}_${plan.week || 8}`,
    grade: plan.grade || 1,
    week: plan.week || 8,
    lessonNum: plan.lessonNum || 15,
    topic: plan.topic || 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
    title: plan.title || 'Bài thể dục',
    dateRange: plan.dateRange || 'Từ ngày 26-30 tháng 10 năm 2026',
    rows: Array.isArray(plan.rows) ? plan.rows : [],
    specialCompetencies: plan.specialCompetencies || {
      healthCare: 'Biết chuẩn bị trang phục, giày tập và vệ sinh sân bãi an toàn.',
      basicMovement: 'Thực hiện được kỹ thuật động tác đúng nhịp và biên độ.',
      sportsCompetency: 'Biết quan sát tranh ảnh kỹ thuật SGK và tự giác sửa sai.',
      disabledStudents: 'Giảm nhẹ các yêu cầu về năng lực đặc thù cho HS khuyết tật.'
    },
    generalCompetencies: plan.generalCompetencies || {
      selfControl: 'Tự giác tập luyện cá nhân và phối hợp tổ nhóm.',
      communication: 'Biết chia sẻ, hướng dẫn bạn cùng tiến bộ.',
      problemSolving: 'Biết xử lí tình huống đơn giản trong trò chơi vận động.',
      disabledStudents: 'Giảm nhẹ yêu cầu, học hoà nhập vui vẻ.'
    },
    qualities: plan.qualities || {
      patriotism: 'Tự hào truyền thống rèn luyện thân thể.',
      kindness: 'Giúp đỡ bạn bè trong học tập và rèn luyện.',
      diligence: 'Chăm chỉ tích cực tham gia các hoạt động.',
      honesty: 'Trung thực trong chơi trò chơi và tự giác đánh giá.',
      responsibility: 'Có ý thức giữ gìn vệ sinh sân bãi và bảo quản thiết bị.'
    },
    integrations: plan.integrations || {
      digitalSkill: 'Mã 4.1TC1a',
      digitalDescription: 'Học sinh biết sử dụng thiết bị số an toàn khi quan sát học liệu.',
      lifeSkills: 'Rèn luyện tính kỷ luật và tinh thần đoàn kết.',
      environmentalEducation: 'Giữ vệ sinh sân bãi sạch sẽ.'
    },
    signatures: plan.signatures || {
      locationDate: 'Vệ Giang, ngày 30 tháng 10 năm 2026',
      bgh: 'Võ Thị Thuận',
      headTeacher: 'Bùi Ngọc Lâm',
      teacher: 'Lê Quốc Hưng'
    },
    locationEquipment: plan.locationEquipment || {
      location: 'Sân trường bằng phẳng, sạch sẽ, thoáng mát và đảm bảo an toàn.',
      equipmentGv: 'Còi, tranh ảnh kỹ thuật SGK, thiết bị số trình chiếu.',
      equipmentHs: 'Trang phục thể thao gọn gàng, giày tập.'
    },
    postLessonAdjustment: plan.postLessonAdjustment || 'Học sinh tiếp thu tốt kỹ thuật động tác, tích cực tham gia trò chơi.'
  };
}

export const masterPlansTuan8: Record<string, MasterPlanItem> = {
  k1_t15: {
    id: 'k1_t15',
    grade: 1,
    week: 8,
    lessonNum: 15,
    topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
    title: 'Bài 1: ĐỘNG TÁC VƯƠN THỞ, ĐỘNG TÁC TAY (Tiết 1)',
    dateRange: 'Từ ngày 26-30 tháng 10 năm 2026',
    rows: [
      {
        content: '1. HOẠT ĐỘNG MỞ ĐẦU\n1.1. Nhận lớp: Kiểm tra vệ sinh, trang phục, sức khỏe.\n1.2. Khởi động: Xoay cổ tay, cổ chân, vai, hông, gối.\n1.3. Trò chơi bổ trợ khởi động: "Làm theo hiệu lệnh".',
        lvd: '5 - 7 phút\n2L x 8N',
        gv: '- GV nhận lớp, phổ biến mục tiêu yêu cầu bài học.\n- Hướng dẫn cán sự điều khiển khởi động xoay kỹ các khớp.\n- Tổ chức trò chơi bổ trợ "Làm theo hiệu lệnh" tạo không khí vui tươi phấn khởi.',
        hs: '- Cán sự tập hợp 4 hàng ngang, điểm số báo cáo.\n- Cả lớp khởi động tích cực đúng biên độ.\n- Chấp hành nghiêm hiệu lệnh trò chơi.',
        contentImgUrl: '/assets/sgk_chuan/k1_tro_choi_ket_ban.jpg',
        contentImgTitle: 'Trò chơi bổ trợ khởi động: Làm theo hiệu lệnh'
      },
      {
        content: '2. HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC MỚI\n2.1. Khám phá & Làm quen động tác:\n* Học Động tác Vươn thở:\n- TTCB: Đứng nghiêm.\n- Nhịp 1: Chân trái bước sang ngang, 2 tay đưa chếch cao chữ V, lòng bàn tay hướng vào nhau, đầu ngửa hít sâu.\n- Nhịp 2: Hạ 2 tay bắt chéo trước bụng, đầu hơi cúi thở ra.\n- Nhịp 3: Như nhịp 1.\n- Nhịp 4: Về TTCB.',
        lvd: '6 - 8 phút\n2 - 3 lần',
        gv: '- GV giới thiệu Động tác Vươn thở, phân tích tác dụng tăng cường dung tích phổi.\n- Làm mẫu 2 - 3 lần kết hợp phân tích kỹ thuật từng nhịp.\n- Cho HS quan sát tranh ảnh kỹ thuật SGK Trang 25.\n- Hô nhịp chậm hướng dẫn HS tập mô phỏng; kịp thời uốn nắn tư thế ngửa đầu và hít thở sâu.',
        hs: '- Đứng đội hình 4 hàng ngang quan sát mẫu.\n- Lắng nghe phân tích và xem tranh ảnh kỹ thuật.\n- Tập mô phỏng theo nhịp hô chậm của GV.\n- Tự giác điều chỉnh tư thế theo hướng dẫn.',
        contentImgUrl: '/assets/extracted_sgk/tuan8_img_0.jpg',
        contentImgTitle: 'Kỹ thuật SGK: Động tác Vươn thở'
      },
      {
        content: '3. HOẠT ĐỘNG LUYỆN TẬP\n3.1. Luyện tập đồng loạt cả lớp:\n- Cả lớp thực hiện Động tác Vươn thở theo nhịp hô của GV.',
        lvd: '3 - 4 phút\n2 - 3 lần',
        gv: '- Hô nhịp cho cả lớp tập đồng loạt.\n- Quan sát bao quát lớp, sửa sai tư thế tay chữ V và nhịp thở.',
        hs: '- Thực hiện đồng loạt theo nhịp hô của thầy cô.\n- Chú ý giữ cự ly hàng ngũ thẳng đều.',
        hsImgUrl: '/assets/extracted_sgk/tuan8_img_4.jpg',
        hsImgTitle: 'Sơ đồ: Đội hình 4 hàng ngang đồng loạt'
      },
      {
        content: '3.2. Luyện tập theo tổ nhóm:\n- Các tổ về khu vực quy định, tổ trưởng điều khiển tập luyện.',
        lvd: '4 - 5 phút\n2 - 3 lần',
        gv: '- Phân chia khu vực tập luyện cho 4 tổ.\n- Di chuyển qua các tổ quan sát uốn nắn, biểu dương tổ tập đều.',
        hs: '- Di chuyển về vị trí phân công nhanh nhẹn.\n- Tổ trưởng hô nhịp, các thành viên tích cực tập luyện, góp ý cho nhau.',
        hsImgUrl: '/assets/extracted_sgk/tuan8_img_8.jpg',
        hsImgTitle: 'Sơ đồ: Tập luyện theo 4 tổ nhóm'
      },
      {
        content: '3.3. Luyện tập cặp đôi:\n- 2 bạn quay mặt vào nhau, 1 bạn tập 1 bạn quan sát sửa sai rồi đổi phiên.',
        lvd: '3 - 4 phút\n2 lần',
        gv: '- Cho học sinh xoay mặt vào nhau theo cặp đôi.\n- Nhắc nhở các em tập trung giúp bạn sửa tư thế cánh tay và nhịp chân.',
        hs: '- Thực hiện theo cặp đôi nghiêm túc, chân thành giúp đỡ bạn cùng tiến bộ.',
        hsImgUrl: '/assets/extracted_sgk/tuan8_img_10.jpg',
        hsImgTitle: 'Sơ đồ: Luyện tập cặp đôi quan sát sửa sai'
      },
      {
        content: '3.4. Trò chơi phát triển thể lực: "Thỏ nhường hang":\n- Tổ chức cho học sinh chơi theo luật an toàn, hào hứng.',
        lvd: '4 - 5 phút',
        gv: '- Nêu tên trò chơi, phổ biến luật chơi và quy tắc an toàn sân bãi.\n- Cho lớp chơi thử 1 lần, sau đó tổ chức chơi chính thức có thi đua.',
        hs: '- Lắng nghe phổ biến luật chơi.\n- Tham gia chơi nhiệt tình, trung thực, đoàn kết.',
        contentImgUrl: '/assets/extracted_sgk/tuan8_img_13.jpg',
        contentImgTitle: 'Trò chơi: Thỏ nhường hang'
      },
      {
        content: '4. HOẠT ĐỘNG VẬN DỤNG & KẾT THÚC\n4.1. Hồi tĩnh: Thả lỏng toàn thân, hít thở sâu.\n4.2. Nhận xét: Đánh giá tinh thần học tập.\n4.3. Xuống lớp.',
        lvd: '3 - 5 phút',
        gv: '- Hướng dẫn học sinh thả lỏng cơ khớp, điều hòa nhịp tim.\n- Nhận xét đánh giá ưu điểm và điểm cần khắc phục của tiết học.\n- Giao nhiệm vụ ôn luyện tại nhà.',
        hs: '- Thả lỏng tích cực theo hướng dẫn.\n- Lắng nghe dặn dò của GV và hô vang khẩu hiệu xuống lớp.',
        hsImgUrl: '/assets/extracted_sgk/tuan8_img_2.jpg',
        hsImgTitle: 'Sơ đồ: Hồi tĩnh và tập trung xuống lớp'
      }
    ]
  }
};
