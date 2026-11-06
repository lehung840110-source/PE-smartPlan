import { MasterPlanItem } from './masterTemplateTuan8';
import { standardFormationDiagrams } from './formationDiagrams';

/**
 * Authoritative Master Lesson Plans for Week 9 (Tuần 9)
 * Thời gian: Từ ngày 02-06 tháng 11 năm 2026
 * GV: Lê Quốc Hưng - Trường TH & THCS Nghĩa Hiệp
 * BGH: Võ Thị Thuận | TTCM: Bùi Ngọc Lâm
 */
export const masterPlansTuan9: Record<string, MasterPlanItem> = {
  // ==========================================
  // KHỐI 1 - TUẦN 9 - TIẾT 17
  // ==========================================
  k1_t17: {
    id: 'k1_t17',
    grade: 1,
    week: 9,
    lessonNum: 17,
    topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
    title: 'Bài 2: ĐỘNG TÁC CHÂN, ĐỘNG TÁC BỤNG (Tiết 1)',
    dateRange: 'Từ ngày 02-06 tháng 11 năm 2026',
    specialCompetencies: {
      healthCare: 'Biết chuẩn bị trang phục, giày tập và vệ sinh sân bãi an toàn trước khi vào tiết học.',
      basicMovement: 'Học và bước đầu thực hiện được kỹ thuật Động tác Chân theo nhịp đếm; biết tham gia trò chơi vận động hào hứng.',
      sportsCompetency: 'Biết quan sát tranh ảnh kỹ thuật SGK Trang 30 và động tác mẫu của giáo viên.',
      disabledStudents: 'Giảm độ khuỵu gối, thực hiện theo sức khỏe bản thân.'
    },
    generalCompetencies: {
      autonomy: 'Tự giác thực hiện các yêu cầu bài học, chủ động xếp hàng ngay ngắn.',
      collaboration: 'Phối hợp nhịp nhàng với bạn bè trong tổ khi luyện tập và chơi trò chơi.',
      problemSolving: 'Biết giữ thăng bằng thân người khi kiễng gót và khuỵu gối.'
    },
    qualities: {
      diligence: 'Chăm chỉ, tích cực luyện tập động tác chân đúng kỹ thuật.',
      honesty: 'Trung thực trong chơi trò chơi Lò cò tiếp sức.',
      responsibility: 'Có ý thức bảo vệ an toàn cho bản thân và bạn bè.'
    },
    integrations: {
      digitalSkill: 'Mã 4.1TC1a',
      digitalDescription: 'Học sinh biết sử dụng thiết bị số an toàn khi quan sát hình ảnh kỹ thuật SGK.',
      lifeSkills: 'Rèn luyện tính kỷ luật, sự khéo léo và tự tin.',
      environmentalEducation: 'Giữ vệ sinh sân bãi sạch sẽ.'
    },
    signatures: {
      locationDate: 'Vệ Giang, ngày 06 tháng 11 năm 2026',
      bgh: 'Võ Thị Thuận',
      headTeacher: 'Bùi Ngọc Lâm',
      teacher: 'Lê Quốc Hưng'
    },
    locationEquipment: {
      location: 'Sân trường bằng phẳng, sạch sẽ, thoáng mát.',
      teacherTools: 'Còi, tranh ảnh SGK Lớp 1 Động tác Chân, vạch mốc chơi trò chơi.',
      studentTools: 'Trang phục thể thao gọn gàng, giày bata.'
    },
    rows: [
      {
        content: "1. HOẠT ĐỘNG MỞ ĐẦU\n1.1. Nhận lớp: Kiểm tra sĩ số, trang phục, sức khỏe học sinh.\n1.2. Khởi động: Xoay các khớp cổ tay, cổ chân, khớp gối, vai, hông.\n1.3. Trò chơi bổ trợ khởi động: “Kết bạn”.",
        lvd: "5 - 7 phút\n2L x 8N",
        gv: "- Nhận lớp, kiểm tra an toàn sân bãi và sức khỏe học sinh.\n- Hướng dẫn cán sự điều hành khởi động xoay kỹ các khớp.\n- Tổ chức trò chơi “Kết bạn” tạo tinh thần đoàn kết, hứng khởi.",
        hs: "- Cán sự tập hợp 4 hàng ngang, điểm số báo cáo.\n- Cả lớp khởi động tích cực theo nhịp đếm.\n- Tham gia trò chơi nhiệt tình, chấp hành hiệu lệnh còi.",
        contentImgUrl: '/assets/sgk_chuan/k1_tro_choi_ket_ban.jpg',
        contentImgTitle: 'Trò chơi bổ trợ khởi động: Kết bạn - SGK GDTC 1 (Trang 31)',
        hsImgUrl: standardFormationDiagrams[1].svgDataUrl,
        hsImgTitle: 'Đội hình khởi động vòng tròn'
      },
      {
        content: "2. HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC MỚI\n2.1. Khám phá & Làm quen động tác mới:\n* Học Động tác Chân:\n- TTCB: Đứng nghiêm.\n- Nhịp 1: Kiễng gót chân, đồng thời hai tay dang ngang, lòng bàn tay sấp.\n- Nhịp 2: Hạ gót chân đồng thời khuỵu gối, hai tay đưa ra trước song song, lòng bàn tay sấp, thân người thẳng.\n- Nhịp 3: Đứng thẳng lên như nhịp 1.\n- Nhịp 4: Về tư thế chuẩn bị.\n- Nhịp 5, 6, 7, 8: Thực hiện lặp lại như nhịp 1, 2, 3, 4.",
        lvd: "6 - 8 phút\n2 - 3 lần",
        gv: "- GV giới thiệu Động tác Chân, phân tích tác dụng rèn luyện sức mạnh khớp gối và cơ đùi.\n- Hướng dẫn HS quan sát kỹ thuật trên tranh SGK GDTC 1 Trang 30.\n- Làm mẫu chuẩn xác 2-3 lần theo phương pháp chiều gương, nhấn mạnh nhịp 2 khuỵu gối lưng thẳng.\n- Hô nhịp chậm hướng dẫn HS tập mô phỏng; kịp thời uốn nắn thăng bằng thân người.",
        hs: "- Đội hình 4 hàng ngang đứng so le quan sát mẫu.\n- Quan sát tranh ảnh kỹ thuật SGK, nhận biết rõ nhịp kiễng gót và khuỵu gối.\n- Tập từng nhịp theo tiếng đếm của giáo viên, sửa sai khi được nhắc nhở.",
        contentImgUrl: '/assets/sgk_chuan/k1_chan.jpg',
        contentImgTitle: 'Kỹ thuật SGK: Động tác Chân - Khối 1 (Trang 30 SGK)',
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập động tác mới'
      },
      {
        content: "3. HOẠT ĐỘNG LUYỆN TẬP\n3.1. Luyện tập đồng loạt cả lớp:\n- Toàn lớp thực hiện Động tác Chân theo nhịp hô dứt khoát của GV (2-3 lần).",
        lvd: "3 - 4 phút\n2 - 3 lần",
        gv: "- Hô nhịp dứt khoát cho cả lớp tập đồng loạt.\n- Bao quát toàn lớp, uốn nắn tư thế học sinh còn chao đảo khi kiễng gót.",
        hs: "- Cả lớp tập đồng loạt 4 hàng ngang, chú ý thẳng lưng và nhịp hô.",
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Sơ đồ: Đội hình tập đồng loạt cả lớp'
      },
      {
        content: "3.2. Luyện tập theo tổ nhóm:\n- Các tổ về khu vực quy định, tổ trưởng hô nhịp điều khiển tập luyện.",
        lvd: "4 - 5 phút\n2 - 3 lần",
        gv: "- Phân chia vị trí 4 tổ trên sân tập, đôn đốc tổ trưởng điều hành.\n- Đến từng tổ hỗ trợ học sinh thực hiện nhịp khuỵu gối êm ái.",
        hs: "- Về khu vực được phân công, thực hiện theo chỉ huy của tổ trưởng.",
        hsImgUrl: standardFormationDiagrams[3].svgDataUrl,
        hsImgTitle: 'Sơ đồ: Đội hình luyện tập theo tổ nhóm'
      },
      {
        content: "3.3. Luyện tập cặp đôi:\n- 2 bạn đối diện nhau, 1 bạn tập 1 bạn quan sát sửa sai rồi đổi vai.",
        lvd: "3 - 4 phút\n2 lần",
        gv: "- Hướng dẫn các cặp đôi giúp nhau nhận biết tư thế lưng thẳng.\n- Khen ngợi các đôi bạn tích cực học tập, uốn nắn chân thành.",
        hs: "- Luân phiên tập luyện và hỗ trợ bạn nhận xét, tự giác sửa sai.",
        hsImgUrl: standardFormationDiagrams[4].svgDataUrl,
        hsImgTitle: 'Sơ đồ: Luyện tập cặp đôi quan sát hỗ trợ'
      },
      {
        content: "3.4. Trò chơi phát triển thể lực: “Lò cò tiếp sức”:\n- Rèn luyện sức bật của cổ chân, sự nhanh nhẹn và tinh thần đồng đội.",
        lvd: "4 - 5 phút",
        gv: "- Nêu tên trò chơi, phổ biến luật chơi an toàn.\n- Cho chơi thử 1 lần, sau đó tổ chức thi đua giữa các hàng.",
        hs: "- Lắng nghe quy tắc chơi, thi đua nhiệt tình, cổ vũ văn minh.",
        contentImgUrl: '/assets/sgk_chuan/k1_tro_choi_lo_co_tiep_suc.jpg',
        contentImgTitle: 'Trò chơi: Lò cò tiếp sức - SGK GDTC 1 (Trang 34)',
        hsImgUrl: standardFormationDiagrams[8].svgDataUrl,
        hsImgTitle: 'Sơ đồ: Trò chơi Lò cò tiếp sức'
      },
      {
        content: "4. HOẠT ĐỘNG VẬN DỤNG & KẾT THÚC\n4.1. Hồi tĩnh: Thả lỏng toàn thân, hít thở sâu.\n4.2. Vận dụng: Tự giác tập thể dục buổi sáng tại nhà.\n4.3. Nhận xét tiết học và xuống lớp.",
        lvd: "3 - 5 phút",
        gv: "- Cho học sinh thả lỏng cơ bắp, điều hòa nhịp tim.\n- Nhận xét đánh giá ý thức học tập, dặn dò tập luyện tại nhà.",
        hs: "- Thả lỏng nhẹ nhàng theo vòng tròn.\n- Ghi nhớ lời thầy dặn và hô to khẩu hiệu xuống lớp.",
        hsImgUrl: standardFormationDiagrams[15].svgDataUrl,
        hsImgTitle: 'Đội hình hồi tĩnh và kết thúc'
      }
    ],
    postLessonAdjustment: 'Học sinh nắm vững kỹ thuật động tác chân, thực hiện nhịp nhàng và chơi trò chơi sôi nổi.'
  },

  // ==========================================
  // KHỐI 3 - TUẦN 9 - TIẾT 17
  // ==========================================
  k3_t17: {
    id: 'k3_t17',
    grade: 3,
    week: 9,
    lessonNum: 17,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC',
    title: 'Bài 1: ĐỘNG TÁC VƯƠN THỞ, ĐỘNG TÁC TAY, ĐỘNG TÁC CHÂN (Tiết 1)',
    dateRange: 'Từ ngày 02-06 tháng 11 năm 2026',
    specialCompetencies: {
      healthCare: 'Biết chọn trang phục thể thao thích hợp, khởi động kỹ càng và giữ gìn vệ sinh sân bãi sạch sẽ.',
      basicMovement: 'Học và thực hiện được kỹ thuật Động tác Vươn thở Khối 3; biết phối hợp nhịp thở sâu với biên độ cánh tay vươn chếch chữ V.',
      sportsCompetency: 'Biết quan sát tranh ảnh kỹ thuật SGK Trang 24 và động tác mẫu của giáo viên; biết tự sửa sai động tác.',
      disabledStudents: 'Áp dụng học hòa nhập, giảm biên độ ngửa đầu nếu thấy chóng mặt.'
    },
    generalCompetencies: {
      autonomy: 'Chủ động học tập, quan sát tranh ảnh SGK Lớp 3 và làm theo hướng dẫn.',
      collaboration: 'Phối hợp nhịp nhàng với bạn bè trong tổ khi tập luyện theo nhóm.',
      problemSolving: 'Biết nhận diện nhịp hít sâu bằng mũi và thở ra bằng miệng.'
    },
    qualities: {
      diligence: 'Chăm chỉ, nghiêm túc trong giờ học thể dục.',
      honesty: 'Trung thực trong chơi trò chơi và nhận xét kết quả tập luyện.',
      responsibility: 'Có ý thức tập thể, bảo quản trang thiết bị sân bãi.'
    },
    integrations: {
      digitalSkill: 'Mã 4.1TC1a',
      digitalDescription: 'Học sinh biết sử dụng thiết bị số an toàn khi quan sát tranh ảnh kỹ thuật SGK điện tử.',
      lifeSkills: 'Rèn luyện thói quen hít thở sâu, tăng cường dung tích sống của phổi.',
      environmentalEducation: 'Bảo vệ môi trường sân trường sạch sẽ, không xả rác.'
    },
    signatures: {
      locationDate: 'Vệ Giang, ngày 06 tháng 11 năm 2026',
      bgh: 'Võ Thị Thuận',
      headTeacher: 'Bùi Ngọc Lâm',
      teacher: 'Lê Quốc Hưng'
    },
    locationEquipment: {
      location: 'Sân trường bằng phẳng, râm mát, an toàn.',
      teacherTools: 'Giáo án, SGK GDTC 3, còi, tranh ảnh Động tác Vươn thở Khối 3.',
      studentTools: 'Trang phục thể thao đầy đủ, giày bata.'
    },
    rows: [
      {
        content: "1. HOẠT ĐỘNG MỞ ĐẦU\n1.1. Nhận lớp: Cán sự tập hợp báo cáo sĩ số, trang phục, sức khỏe.\n1.2. Khởi động: Xoay các khớp cổ tay, cổ chân, vai, hông, gối.\n1.3. Trò chơi bổ trợ khởi động: “Chui qua hầm”.",
        lvd: "5 - 7 phút\n2L x 8N",
        gv: "- Tiếp nhận báo cáo, kiểm tra trang phục và sức khỏe học sinh.\n- Hướng dẫn cán sự điều hành khởi động xoay kỹ các khớp.\n- Tổ chức trò chơi “Chui qua hầm” khéo léo, linh hoạt.",
        hs: "- Tập hợp 4 hàng ngang nhận lớp.\n- Khởi động nghiêm túc theo nhịp đếm.\n- Chơi trò chơi khởi động sôi nổi, an toàn.",
        contentImgUrl: '/assets/extracted_sgk/tuan8_img_2.jpg',
        contentImgTitle: 'Trò chơi bổ trợ khởi động: Chui qua hầm - Khối 3',
        hsImgUrl: standardFormationDiagrams[1].svgDataUrl,
        hsImgTitle: 'Đội hình khởi động vòng tròn'
      },
      {
        content: "2. HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC MỚI\n2.1. Khám phá & Làm quen động tác mới:\n* Học Động tác Vươn thở (SGK Lớp 3):\n- TTCB: Đứng nghiêm.\n- Nhịp 1: Chân trái bước sang ngang rộng bằng vai, hai tay đưa chếch cao hình chữ V, lòng bàn tay hướng vào nhau, đầu ngửa hít sâu bằng mũi.\n- Nhịp 2: Hạ hai tay bắt chéo trước bụng, đầu hơi cúi thở ra bằng miệng.\n- Nhịp 3: Như nhịp 1.\n- Nhịp 4: Về TTCB.\n- Nhịp 5, 6, 7, 8: Tương tự như nhịp 1, 2, 3, 4 nhưng bước chân phải.",
        lvd: "6 - 8 phút\n2 - 3 lần",
        gv: "- Giới thiệu tên Động tác Vươn thở, phân tích kỹ thuật hít thở sâu và mở rộng lồng ngực.\n- Cho HS quan sát tranh kỹ thuật SGK GDTC 3 Trang 24.\n- Làm mẫu 2-3 lần chuẩn xác theo phương pháp chiều gương.\n- Hô nhịp chậm hướng dẫn HS tập mô phỏng, uốn nắn độ chếch của cánh tay.",
        hs: "- Quan sát động tác mẫu của giáo viên và tranh ảnh kỹ thuật SGK Lớp 3.\n- Tập từng nhịp theo nhịp hô chậm của thầy, chú ý hít thở sâu nhịp nhàng.",
        contentImgUrl: '/assets/extracted_sgk/tuan8_img_4.jpg',
        contentImgTitle: 'Kỹ thuật SGK: Động tác Vươn thở - Khối 3 (Trang 24 SGK)',
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập động tác mới'
      },
      {
        content: "3. HOẠT ĐỘNG LUYỆN TẬP\n3.1. Luyện tập đồng loạt cả lớp:\n- Cả lớp tập Động tác Vươn thở theo nhịp hô của GV (2-3 lần).",
        lvd: "3 - 4 phút\n2 - 3 lần",
        gv: "- Hô nhịp to, rõ cho cả lớp tập luyện đồng loạt.\n- Bao quát lớp, uốn nắn tư thế ngửa đầu và cánh tay chữ V.",
        hs: "- Đội hình 4 hàng ngang tập đồng loạt dứt khoát, đều đẹp.",
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Sơ đồ: Tập đồng loạt 4 hàng ngang'
      },
      {
        content: "3.2. Luyện tập theo tổ nhóm:\n- Các tổ di chuyển về vị trí phân công, tổ trưởng điều hành tập luyện.",
        lvd: "4 - 5 phút\n2 - 3 lần",
        gv: "- Phân chia vị trí tập cho các tổ, theo dõi đôn đốc học sinh tự giác.\n- Kịp thời hỗ trợ các tổ còn lúng túng trong nhịp thở.",
        hs: "- Các tổ tập trung luyện tập nghiêm túc dưới sự hướng dẫn của tổ trưởng.",
        hsImgUrl: standardFormationDiagrams[3].svgDataUrl,
        hsImgTitle: 'Sơ đồ: Luyện tập theo tổ nhóm'
      },
      {
        content: "3.3. Luyện tập cặp đôi:\n- 2 bạn đối diện nhau, 1 bạn tập 1 bạn quan sát nhận xét, đổi vai.",
        lvd: "3 - 4 phút\n2 lần",
        gv: "- Hướng dẫn cặp đôi quan sát tư thế tay và nhịp hít thở của bạn.\n- Khích lệ tinh thần tương thân tương ái giúp đỡ nhau cùng tiến bộ.",
        hs: "- Thực hiện cặp đôi nghiêm túc, chân thành góp ý cho bạn.",
        hsImgUrl: standardFormationDiagrams[4].svgDataUrl,
        hsImgTitle: 'Sơ đồ: Luyện tập cặp đôi quan sát hỗ trợ'
      },
      {
        content: "3.4. Trò chơi phát triển thể lực: “Đua ô tô”:\n- Rèn luyện phản xạ nhanh, sự nhanh nhẹn và tinh thần thi đua tập thể.",
        lvd: "4 - 5 phút",
        gv: "- Nêu tên trò chơi, phổ biến luật chơi và quy tắc đảm bảo an toàn.\n- Tổ chức chơi thử 1 lần, sau đó thi đua chính thức có tính điểm.",
        hs: "- Nắm vững luật chơi, tham gia thi đua hào hứng, trung thực.",
        contentImgUrl: '/assets/extracted_sgk/tuan9_img_0.jpg',
        contentImgTitle: 'Trò chơi: Đua ô tô - Khối 3',
        hsImgUrl: standardFormationDiagrams[8].svgDataUrl,
        hsImgTitle: 'Sơ đồ trò chơi Đua ô tô'
      },
      {
        content: "4. HOẠT ĐỘNG VẬN DỤNG & KẾT THÚC\n4.1. Hồi tĩnh: Thả lỏng toàn thân, đi chậm theo vòng tròn.\n4.2. Vận dụng: Tự giác tập động tác vươn thở vào buổi sáng.\n4.3. Nhận xét tiết học và xuống lớp.",
        lvd: "3 - 5 phút",
        gv: "- Cho học sinh thả lỏng cơ khớp, điều hòa nhịp tim.\n- Nhận xét đánh giá giờ học, giao nhiệm vụ tự tập luyện tại nhà.",
        hs: "- Thả lỏng nhẹ nhàng, lắng nghe dặn dò và hô to khẩu lệnh xuống lớp.",
        hsImgUrl: standardFormationDiagrams[15].svgDataUrl,
        hsImgTitle: 'Đội hình hồi tĩnh'
      }
    ],
    postLessonAdjustment: 'Học sinh khối 3 nắm vững kỹ thuật động tác vươn thở, hít thở sâu và tham gia trò chơi rất tích cực.'
  },

  // ==========================================
  // KHỐI 5 - TUẦN 9 - TIẾT 17
  // ==========================================
  k5_t17: {
    id: 'k5_t17',
    grade: 5,
    week: 9,
    lessonNum: 17,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY',
    title: 'Bài 1: ĐỘNG TÁC VƯƠN THỞ VỚI GẬY, ĐỘNG TÁC TAY VỚI GẬY (Tiết 3)',
    dateRange: 'Từ ngày 02-06 tháng 11 năm 2026',
    specialCompetencies: {
      healthCare: 'Biết kiểm tra gậy tập thể dục an toàn, sân tập sạch sẽ, trang phục đúng quy định trước khi học.',
      basicMovement: 'Thực hiện thuần thục Động tác Vươn thở với gậy và Động tác Tay với gậy; phối hợp nhịp nhàng, đúng biên độ.',
      sportsCompetency: 'Biết quan sát tranh ảnh SGK GDTC 5 Trang 25, 26 và động tác mẫu; tự điều chỉnh cách cầm gậy chắc chắn.',
      disabledStudents: 'Sử dụng gậy nhẹ hoặc tập không gậy theo thể trạng cá nhân.'
    },
    generalCompetencies: {
      autonomy: 'Chủ động mang và bảo quản gậy tập, tự giác rèn luyện theo hiệu lệnh.',
      collaboration: 'Phối hợp với bạn cùng tổ, nhắc nhở khoảng cách an toàn khi vung gậy tập luyện.',
      problemSolving: 'Biết điều chỉnh biên độ gậy thẳng hàng với cánh tay.'
    },
    qualities: {
      diligence: 'Kiên trì rèn luyện để thực hiện động tác với gậy đẹp và chính xác.',
      honesty: 'Trung thực trong tự nhận xét và thi đua trò chơi.',
      responsibility: 'Có ý thức bảo quản gậy thể dục, bảo đảm an toàn cho mình và bạn.'
    },
    integrations: {
      digitalSkill: 'Mã 6.1TC2a',
      digitalDescription: 'Học sinh làm quen với hình ảnh số hướng dẫn cách cầm gậy đúng quy cách.',
      lifeSkills: 'Rèn tác phong nhanh nhẹn, kỷ luật và tinh thần trách nhiệm tập thể.',
      environmentalEducation: 'Bảo quản dụng cụ thể thao cẩn thận, sắp xếp gậy ngay ngắn vào giá sau giờ học.'
    },
    signatures: {
      locationDate: 'Vệ Giang, ngày 06 tháng 11 năm 2026',
      bgh: 'Võ Thị Thuận',
      headTeacher: 'Bùi Ngọc Lâm',
      teacher: 'Lê Quốc Hưng'
    },
    locationEquipment: {
      location: 'Sân trường hoặc nhà đa năng thoáng đãng, bằng phẳng.',
      teacherTools: 'Giáo án, còi, gậy thể dục mẫu, tranh ảnh SGK GDTC 5.',
      studentTools: 'Mỗi học sinh 1 gậy thể dục dài 1m - 1.2m, giày bata.'
    },
    rows: [
      {
        content: "1. HOẠT ĐỘNG MỞ ĐẦU\n1.1. Nhận lớp: Kiểm tra sĩ số, trang phục, gậy tập và báo cáo GV.\n1.2. Khởi động: Xoay các khớp cổ tay, cổ chân, vai, cánh tay, hông, gối.\n1.3. Trò chơi bổ trợ khởi động: “Đội nào nhanh nhất”.",
        lvd: "5 - 7 phút\n2L x 8N",
        gv: "- Tiếp nhận báo cáo, kiểm tra gậy tập và sức khỏe học sinh.\n- Hướng dẫn khởi động xoay kỹ các khớp cơ thể.\n- Tổ chức trò chơi “Đội nào nhanh nhất” phản xạ nhanh nhẹn.",
        hs: "- Tập hợp 4 hàng ngang cự ly giãn cách rộng để cầm gậy an toàn.\n- Khởi động tích cực, đúng biên độ.\n- Chơi trò chơi khởi động hào hứng, đúng luật.",
        contentImgUrl: '/assets/sgk_chuan/k5_tro_choi_doi_nao_nhanh_nhat.jpg',
        contentImgTitle: 'Trò chơi bổ trợ khởi động: Đội nào nhanh nhất - SGK GDTC 5 (Trang 29)',
        hsImgUrl: standardFormationDiagrams[1].svgDataUrl,
        hsImgTitle: 'Đội hình khởi động vòng tròn'
      },
      {
        content: "2. HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC MỚI\n2.1. Ôn luyện và hoàn thiện động tác:\n* Hoàn thiện Động tác Vươn thở với gậy và Động tác Tay với gậy:\n- Vươn thở với gậy: Nâng gậy lên cao chếch chữ V, hít sâu bằng mũi; hạ gậy ngang bụng thở ra.\n- Tay với gậy: Đưa gậy thẳng ra trước ngang vai rồi giơ gậy thẳng lên cao; động tác dứt khoát.",
        lvd: "6 - 8 phút\n2 - 3 lần",
        gv: "- Cho HS quan sát tranh SGK GDTC 5 Trang 25-26 về 2 động tác với gậy.\n- Thị phạm làm mẫu liên hoàn 2 động tác, phân tích điểm mấu chốt giữ gậy song song.\n- Hô nhịp cho cả lớp tập theo nhịp hô chậm, chỉnh sửa cách cầm gậy lỏng lẻo.",
        hs: "- Quan sát mẫu và tranh ảnh kỹ thuật SGK Lớp 5.\n- Thực hiện từng nhịp theo tiếng đếm của thầy, chú ý giữ gậy chắc chắn và đúng hướng.",
        contentImgUrl: '/assets/sgk_chuan/k5_vuon_tho_tay_gay.jpg',
        contentImgTitle: 'Hình ảnh Kỹ thuật: Động tác Vươn thở & Tay với gậy - SGK GDTC 5',
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập động tác mới'
      },
      {
        content: "3. HOẠT ĐỘNG LUYỆN TẬP\n3.1. Luyện tập đồng loạt cả lớp:\n- Cả lớp tập đồng loạt liên hoàn 2 động tác theo khẩu lệnh và tiếng còi của GV (2-3 lần).",
        lvd: "3 - 4 phút\n2 - 3 lần",
        gv: "- Hô nhịp to, dứt khoát cho cả lớp tập đồng loạt.\n- Di chuyển nhắc nhở học sinh duy trì khoảng cách cầm gậy an toàn.",
        hs: "- Toàn lớp thực hiện đồng loạt, gậy vung đều và dứt khoát.",
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Sơ đồ: Tập đồng loạt 4 hàng ngang với gậy'
      },
      {
        content: "3.2. Luyện tập theo tổ nhóm:\n- Các tổ về khu vực sân tập, tổ trưởng chỉ huy tập luyện.",
        lvd: "4 - 5 phút\n2 - 3 lần",
        gv: "- Phân công các tổ vào vị trí quy định, đôn đốc các tổ trưởng.\n- Đến từng tổ uốn nắn tư thế gậy còn chùng tay.",
        hs: "- Các tổ tự quản tập luyện nghiêm túc, các thành viên hỗ trợ nhắc nhở nhau.",
        hsImgUrl: standardFormationDiagrams[3].svgDataUrl,
        hsImgTitle: 'Sơ đồ: Luyện tập theo tổ nhóm'
      },
      {
        content: "3.3. Luyện tập cặp đôi sửa sai:\n- 2 bạn đối diện nhau, 1 bạn tập 1 bạn quan sát sửa tư thế gậy và tay.",
        lvd: "3 - 4 phút\n2 lần",
        gv: "- Hướng dẫn cặp đôi quan sát kiểm tra độ cao của gậy ngang vai.\n- Động viên các bạn tự tin chỉnh sửa cho nhau.",
        hs: "- Tập theo từng đôi, đổi vai và nhận xét đóng góp tích cực.",
        contentImgUrl: '/assets/extracted_sgk/tuan8_img_16.jpg',
        contentImgTitle: 'Luyện tập cặp đôi sửa sai với gậy - Khối 5 (Trang 29 SGK)',
        hsImgUrl: standardFormationDiagrams[4].svgDataUrl,
        hsImgTitle: 'Sơ đồ: Luyện tập cặp đôi'
      },
      {
        content: "3.4. Trò chơi vận động: “Chuyền gậy tiếp sức”:\n- Rèn luyện tốc độ, sự nhanh nhẹn, khéo léo khi trao và nhận gậy an toàn.",
        lvd: "4 - 5 phút",
        gv: "- Nêu tên trò chơi, nhắc nhở kỹ thuật trao gậy từ dưới lên an toàn.\n- Tổ chức chơi thử và tiến hành thi đấu giữa 4 tổ.",
        hs: "- Nắm chắc luật chơi, trao nhận gậy chuẩn xác, thi đua hào hứng.",
        contentImgUrl: '/assets/sgk_chuan/k5_chuyen_gay_tiep_suc.jpg',
        contentImgTitle: 'Trò chơi: Chuyền gậy tiếp sức - SGK GDTC 5 (Trang 26)',
        hsImgUrl: standardFormationDiagrams[8].svgDataUrl,
        hsImgTitle: 'Sơ đồ trò chơi Chuyền gậy tiếp sức'
      },
      {
        content: "4. HOẠT ĐỘNG VẬN DỤNG & KẾT THÚC\n4.1. Hồi tĩnh: Thả lỏng toàn thân, đi chậm theo vòng tròn.\n4.2. Vận dụng: Sử dụng gậy thể dục rèn luyện thân thể mỗi ngày tại nhà.\n4.3. Nhận xét tiết học, thu dọn gậy vào kho và xuống lớp.",
        lvd: "3 - 5 phút",
        gv: "- Điều hành thả lỏng hồi tĩnh.\n- Đánh giá tổng kết giờ học, hướng dẫn thu gom gậy gọn gàng và hô khẩu lệnh xuống lớp.",
        hs: "- Thả lỏng nhẹ nhàng, xếp gậy ngay ngắn vào giá dụng cụ và đáp lễ khi xuống lớp.",
        hsImgUrl: standardFormationDiagrams[15].svgDataUrl,
        hsImgTitle: 'Đội hình hồi tĩnh'
      }
    ],
    postLessonAdjustment: 'Học sinh khối 5 thực hiện 2 động tác với gậy rất dứt khoát, đều đẹp, bảo đảm an toàn cự ly tuyệt đối.'
  }
};
