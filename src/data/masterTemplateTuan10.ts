import { LessonRow } from '../types/gdtc';
import { MasterPlanItem } from './masterTemplateTuan8';
import { standardFormationDiagrams } from './formationDiagrams';

/**
 * Authoritative Master Lesson Plans for Week 10 (Tuần 10)
 * Thời gian: Từ ngày 09-13 tháng 11 năm 2026
 * GV: Lê Quốc Hưng - Trường TH & THCS Nghĩa Hiệp
 * BGH: Võ Thị Thuận | TTCM: Bùi Ngọc Lâm
 */
export const masterPlansTuan10: Record<string, MasterPlanItem> = {
  // ==========================================
  // KHỐI 1 - TUẦN 10 - TIẾT 19
  // ==========================================
  k1_t19: {
    id: 'k1_t19',
    grade: 1,
    week: 10,
    lessonNum: 19,
    topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
    title: 'Bài 2: ĐỘNG TÁC CHÂN, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC BỤNG (Tiết 3)',
    dateRange: 'Từ ngày 09-13 tháng 11 năm 2026',
    specialCompetencies: {
      healthCare: 'Biết chuẩn bị trang phục, giày tập; kiểm tra vệ sinh sân tập, dụng cụ và thực hiện các yêu cầu an toàn trước, trong, sau khi tập luyện động tác vặn mình, động tác bụng và ôn các động tác đã học.',
      basicMovement: 'Thực hiện được động tác vặn mình và động tác bụng theo hướng dẫn của GV; biết phối hợp với bạn, xử lí một số tình huống đơn giản trong tập luyện và trò chơi vận động.',
      sportsCompetency: 'Biết quan sát tranh ảnh SGK, video/học liệu số hoặc động tác mẫu của GV; biết tự điều chỉnh tư thế, nhịp tập, hướng di chuyển khi luyện tập động tác vặn mình, bụng.',
      disabledStudents: 'Tuỳ tình hình của HS mà GV linh hoạt áp dụng với tinh thần học hoà nhập, giảm cường độ vận động, thực hiện theo khả năng. Có thể giao các nhiệm vụ hỗ trợ tổ hoặc tập ở mức độ cơ bản.'
    },
    generalCompetencies: {
      autonomy: 'HS chủ động chuẩn bị SGK, trang phục, dụng cụ cá nhân; tự giác luyện tập, tự sửa lỗi theo hướng dẫn của GV.',
      collaboration: 'HS biết phối hợp với bạn, tổ/nhóm; chấp hành phân công; hỗ trợ bạn trong tập luyện và tham gia trò chơi.',
      problemSolving: 'HS biết quan sát, phát hiện lỗi sai thường gặp ở tư thế thân người và góc tay chân; lựa chọn cách thực hiện an toàn, phù hợp với bản thân.',
      disabledStudents: 'Tuỳ tình hình tiến bộ của HS mà GV linh hoạt áp dụng với tinh thần học hoà nhập.'
    },
    qualities: {
      diligence: 'Tích cực, tự giác tập luyện để hoàn thành tốt các nhiệm vụ của bài học.',
      honesty: 'Thực hiện đúng luật chơi, đúng hiệu lệnh; nhận xét kết quả luyện tập của bản thân và bạn một cách trung thực.',
      responsibility: 'Có trách nhiệm bảo đảm an toàn cho bản thân và bạn; đoàn kết, tôn trọng, giúp đỡ bạn tập chưa tốt.',
      disabledStudents: 'Tuỳ tình hình tiến bộ của HS mà GV linh hoạt áp dụng với tinh thần học hoà nhập.'
    },
    integrations: {
      digitalSkill: 'Mã 4.1TC1a',
      digitalDescription: 'Học sinh biết sử dụng thiết bị số an toàn khi quan sát học liệu về thứ tự nhịp, tư thế thân người và sự phối hợp các bộ phận: không chạm thiết bị khi tay ướt, không tự ý bấm và báo giáo viên khi cần hỗ trợ.',
      lifeSkills: 'Rèn ý thức tổ chức kỉ luật, chấp hành hiệu lệnh, phối hợp với bạn và bình tĩnh khi xử lí tình huống.',
      environmentalEducation: 'Giữ vệ sinh sân tập, không xả rác bừa bãi; thu dọn dụng cụ gọn gàng sau giờ học.'
    },
    locationEquipment: {
      location: 'Sân trường hoặc nhà thể chất sạch sẽ, thoáng mát, bằng phẳng.',
      teacherTools: 'Giáo án, SGK, SGV; kẻ vẽ sân tập; tranh ảnh SGK, còi, dụng cụ phục vụ trò chơi “Lò cò tiếp sức”.',
      studentTools: 'SGK, giày thể thao, trang phục thể thao; bảo đảm vệ sinh và an toàn trong tập luyện.'
    },
    rows: [
      {
        content: "1. Hoạt động mở đầu\n1.1 Nhận lớp:\n- Kiểm tra vệ sinh sân tập, trang phục, tình hình sức khỏe của lớp.\n- Phổ biến nội dung yêu cầu giờ học: Học động tác bụng, ôn động tác chân và vặn mình; chơi trò chơi.",
        lvd: "2 - 3'",
        gv: "- GV tiếp nhận báo cáo sĩ số và kiểm tra sức khoẻ học sinh.\n- Phổ biến rõ ràng mục tiêu, nội dung bài học: Học động tác bụng, ôn động tác chân và vặn mình.\n- Động viên, khích lệ tinh thần học tập tích cực, kỷ luật.",
        hs: "- Đội hình nhận lớp 4 hàng ngang tập trung.\n- Cán sự tập hợp lớp, điểm số, báo cáo sĩ số cho GV.\n- Toàn lớp lắng nghe, nắm vững nội dung bài học.",
        hsImgUrl: standardFormationDiagrams[0].svgDataUrl,
        hsImgTitle: 'Đội hình nhận lớp'
      },
      {
        content: "1.2 Khởi động:\nXoay các khớp cổ tay, cổ chân, khớp vai, cánh tay, hông, gối...\n1.3 Trò chơi bổ trợ khởi động:\n- Trò chơi “Kết bạn”.",
        lvd: "3 - 4'\n2x8n\n3L",
        gv: "- GV điều hành và cùng khởi động với HS, nhắc xoay kỹ các khớp để phòng tránh chấn thương.\n- Hướng dẫn chuyển đội hình vòng tròn, phổ biến luật chơi trò chơi “Kết bạn”.\n- Tạo không khí hào hứng, sôi nổi trước khi bước vào phần nội dung mới.",
        hs: "- Thực hiện khởi động kỹ các khớp theo nhịp đếm của cán sự.\n- HS di chuyển thành vòng tròn, tham gia chơi trò chơi “Kết bạn” nhiệt tình, đúng luật.",
        contentImgUrl: '/assets/sgk_chuan/k1_tro_choi_ket_ban.jpg',
        contentImgTitle: 'Trò chơi bổ trợ khởi động: Kết bạn - SGK GDTC 1 (Trang 31)',
        hsImgUrl: standardFormationDiagrams[1].svgDataUrl,
        hsImgTitle: 'Đội hình khởi động vòng tròn'
      },
      {
        content: "2. Hoạt động hình thành kiến thức:\n2.1. Ôn động tác Chân và Động tác Vặn mình:\n- Nhịp 1,2,3,4 phối hợp tay chân chuẩn xác.\n2.2. Học động tác Bụng:\n- TTCB: Đứng nghiêm.\n- Nhịp 1: Bước chân trái sang ngang rộng bằng vai, hai tay đưa thẳng ra trước, lòng bàn tay sấp.\n- Nhịp 2: Cúi gập thân người ra trước, hai tay vỗ vào nhau sát mũi chân.\n- Nhịp 3: Đứng thẳng thân người, hai tay dang ngang, lòng bàn tay ngửa.\n- Nhịp 4: Về tư thế chuẩn bị.\n- Nhịp 5, 6, 7, 8: Tương tự như nhịp 1, 2, 3, 4 nhưng đổi chân phải.",
        lvd: "7 - 8'",
        gv: "- Giới thiệu động tác bụng và cho học sinh quan sát tranh ảnh SGK.\n- Tích hợp năng lực số (4.1TC1a): Hướng dẫn HS quan sát tranh ảnh học liệu đúng cách, an toàn: không chạm tay ướt, quan sát tư thế cúi gập thân người.\n- GV làm mẫu chuẩn xác từng nhịp 2-3 lần, giải thích cặn kẽ nhịp 2 cúi sâu giữ chân thẳng.\n- Hô nhịp chậm rãi cho HS làm quen và uốn nắn tư thế kịp thời.",
        hs: "- Quan sát động tác mẫu của giáo viên và tranh ảnh SGK, nhận biết rõ nhịp động tác.\n- Tích hợp: Học sinh giữ tay khô, tập trung quan sát học liệu số và động tác mẫu.\n- Tập đồng loạt theo hiệu lệnh và sự hướng dẫn của GV, chú ý giữ thẳng khớp gối ở nhịp 2.",
        contentImgUrl: '/assets/sgk_chuan/k1_bung.jpg',
        contentImgTitle: 'Hình ảnh Kỹ thuật: Động tác Bụng (SGK GDTC Lớp 1)',
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập động tác mới'
      },
      {
        content: "3. Hoạt động luyện tập\n3.1. Tổ chức tập đồng loạt:\n- Cả lớp tập đồng loạt động tác bụng, kết hợp liên hoàn chân - vặn mình - bụng theo nhịp đếm GV (2-3 lần).",
        lvd: "5 - 6'\n2-3 lần",
        gv: "- GV hô nhịp to, rõ ràng, dứt khoát cho cả lớp tập luyện đồng loạt.\n- Di chuyển bao quát sân tập, nhắc nhở học sinh biên độ vung tay và tư thế cúi người đúng kỹ thuật.\n- Động viên, khích lệ học sinh thực hiện đều và đẹp.",
        hs: "- Đội hình tập đồng loạt 4 hàng ngang cự ly 1 sải tay so le.\n- Cả lớp tập trung cao độ, tập luyện theo nhịp hô của GV, sửa sai khi được nhắc nhở.",
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập đồng loạt 4 hàng ngang'
      },
      {
        content: "3.2. Luyện tập theo tổ / nhóm & cặp đôi:\n- Chia lớp thành các tổ luyện tập dưới sự điều hành của tổ trưởng.\n- Luyện tập theo cặp đôi: 1 bạn tập, 1 bạn quan sát nhận xét, sau đó đổi vai.",
        lvd: "6 - 7'\n2-3 lần",
        gv: "- Phân chia vị trí các tổ trên sân tập, chỉ định tổ trưởng điều hành tập luyện.\n- GV đến từng tổ quan sát, hướng dẫn các cặp đôi nhận xét, giúp đỡ lẫn nhau; đặc biệt hỗ trợ học sinh còn lúng túng.\n- Biểu dương tinh thần tự quản và hợp tác tích cực của các tổ.",
        hs: "- Các tổ về khu vực quy định, thực hiện tập luyện dưới sự điều hành của tổ trưởng.\n- Các cặp đôi chủ động đối diện tập luyện, chia sẻ và sửa lỗi cho bạn một cách chân thành.",
        hsImgUrl: standardFormationDiagrams[3].svgDataUrl,
        hsImgTitle: 'Đội hình luyện tập theo tổ'
      },
      {
        content: "3.3. Thi đua biểu diễn & sửa sai:\n- Các tổ lần lượt cử đại diện hoặc cả tổ lên biểu diễn 3 động tác (chân, vặn mình, bụng).\n- Lớp quan sát, nhận xét và bình chọn tổ tập đều, đẹp nhất.",
        lvd: "4 - 5'",
        gv: "- Tổ chức thi đua giữa các tổ nhằm tạo động lực và đánh giá mức độ đạt được của HS.\n- Hướng dẫn HS nhận xét bạn bằng ngôn ngữ tích cực, đúng trọng tâm kỹ thuật.\n- Nhận xét chung, tuyên dương tổ xuất sắc và chỉ ra các điểm cần khắc phục.",
        hs: "- Đại diện các tổ lên thực hiện với tác phong nghiêm túc, tự tin.\n- Các tổ ngồi theo dõi, cổ vũ và tham gia nhận xét kết quả biểu diễn của bạn một cách khách quan.",
        hsImgUrl: standardFormationDiagrams[4].svgDataUrl,
        hsImgTitle: 'Đội hình thi đua giữa các tổ'
      },
      {
        content: "3.4 Trò chơi vận động: \"Lò cò tiếp sức\":\n- Mục đích: Rèn luyện sức mạnh cơ chân, sự khéo léo, nhanh nhẹn và tinh thần đoàn kết.\n- Luật chơi: Từng em lò cò qua vạch cọc mốc an toàn rồi quay về đập tay bạn tiếp theo.",
        lvd: "4 - 6'",
        gv: "- GV nêu tên trò chơi, nhắc lại quy tắc và luật chơi đảm bảo an toàn tuyệt đối.\n- Tổ chức chơi thử 1 lần, sau đó tổ chức chơi chính thức có tính điểm thi đua.\n- Đóng vai trò trọng tài công tâm, khen ngợi tổ đoàn kết, nhanh nhẹn.",
        hs: "- Lắng nghe, nắm chắc quy tắc chơi và vị trí di chuyển.\n- Tham gia chơi nhiệt tình, chấp hành hiệu lệnh và cổ vũ đồng đội hào hứng.",
        contentImgUrl: '/assets/sgk_chuan/k1_tro_choi_lo_co_tiep_suc.jpg',
        contentImgTitle: 'Trò chơi: Lò cò tiếp sức - SGK GDTC 1 (Trang 34)',
        hsImgUrl: standardFormationDiagrams[8].svgDataUrl,
        hsImgTitle: 'Sơ đồ trò chơi Lò cò tiếp sức'
      },
      {
        content: "4. Hoạt động vận dụng & Hồi tĩnh\n4.1. Hồi tĩnh:\n- Đi chậm theo vòng tròn kết hợp hít thở sâu, thả lỏng cơ toàn thân.\n4.2. Vận dụng:\n- Tự giác tập luyện bài thể dục buổi sáng tại nhà.\n4.3 Nhận xét tiết học, hướng dẫn tự học và phát lệnh xuống lớp.",
        lvd: "4 - 5'\n2x8n",
        gv: "- Điều hành lớp thực hiện các động tác thả lỏng, hồi phục nhịp tim và hơi thở.\n- Hướng dẫn HS vận dụng các động tác chân, vặn mình, bụng vào việc rèn luyện sức khoẻ hàng ngày tại nhà.\n- Đánh giá tiết học, dặn dò chuẩn bị cho tiết sau và hô hiệu lệnh xuống lớp.",
        hs: "- Đội hình vòng tròn thả lỏng tay, chân, điều hòa nhịp thở nhẹ nhàng.\n- Chú ý lắng nghe dặn dò, ghi nhớ bài tập vận dụng ở nhà và đáp hiệu lệnh “Khỏe!”.",
        hsImgUrl: standardFormationDiagrams[15].svgDataUrl,
        hsImgTitle: 'Đội hình hồi tĩnh và kết thúc'
      }
    ],
    postLessonAdjustment: 'Học sinh nắm vững kỹ thuật động tác bụng, thực hiện nhịp nhàng và hào hứng tham gia trò chơi.',
    signatures: {
      locationDate: 'Vệ Giang, ngày 13 tháng 11 năm 2026',
      bgh: 'Võ Thị Thuận',
      headTeacher: 'Bùi Ngọc Lâm',
      teacher: 'Lê Quốc Hưng'
    }
  },

  // ==========================================
  // KHỐI 1 - TUẦN 10 - TIẾT 20
  // ==========================================
  k1_t20: {
    id: 'k1_t20',
    grade: 1,
    week: 10,
    lessonNum: 20,
    topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
    title: 'Bài 2: ĐỘNG TÁC CHÂN, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC BỤNG (Tiết 4)',
    dateRange: 'Từ ngày 09-13 tháng 11 năm 2026',
    specialCompetencies: {
      healthCare: 'Biết kiểm tra vệ sinh sân tập, chuẩn bị trang phục thể thao; tuân thủ quy tắc an toàn trong suốt buổi tập ôn bài thể dục.',
      basicMovement: 'Thực hiện thuần thục và liên hoàn các động tác chân, vặn mình, bụng; biết điều chỉnh nhịp thở và biên độ động tác theo hiệu lệnh.',
      sportsCompetency: 'Biết quan sát, phát hiện sai sót của bản thân và bạn khi tập liên hoàn; chủ động sửa sai theo chỉ dẫn của giáo viên.',
      disabledStudents: 'Giảm nhẹ yêu cầu kỹ thuật, cho HS tập theo khả năng, khích lệ tham gia các hoạt động tập thể cùng bạn.'
    },
    generalCompetencies: {
      autonomy: 'Tự giác thực hiện các yêu cầu của bài học, chủ động ôn tập liên hoàn các động tác đã học.',
      collaboration: 'Biết hợp tác, lắng nghe và chia sẻ với bạn trong tổ khi luyện tập và thi đua.',
      problemSolving: 'Biết nhận diện nhịp tập chưa khớp và cùng bạn sửa chữa nhịp nhàng.',
      disabledStudents: 'Linh hoạt theo sự tiến bộ của học sinh, khích lệ hòa nhập.'
    },
    qualities: {
      diligence: 'Chăm chỉ luyện tập để thuần thục kỹ năng vận động.',
      honesty: 'Trung thực trong đánh giá, nhận xét bạn và trong thi đấu trò chơi.',
      responsibility: 'Tự giác chấp hành kỷ luật, giữ gìn vệ sinh sân bãi và bảo vệ trang thiết bị thể thao.',
      disabledStudents: 'Hòa nhập, phát huy tinh thần đoàn kết.'
    },
    integrations: {
      digitalSkill: 'Mã 4.1TC1a',
      digitalDescription: 'Học sinh biết sử dụng thiết bị số an toàn khi quan sát học liệu số về biên độ động tác chuẩn xác.',
      lifeSkills: 'Rèn luyện tính kỷ luật, tác phong nhanh nhẹn và tinh thần đồng đội.',
      environmentalEducation: 'Thu dọn dụng cụ, nhặt rác sân tập gọn gàng sau giờ học.'
    },
    locationEquipment: {
      location: 'Sân trường hoặc nhà đa năng thoáng mát.',
      teacherTools: 'Giáo án, còi, tranh ảnh SGK, vạch mốc trò chơi.',
      studentTools: 'Giày thể thao, trang phục thể thao đúng quy định.'
    },
    rows: [
      {
        content: "1. Hoạt động mở đầu\n1.1 Nhận lớp:\n- Kiểm tra sĩ số, trang phục, tình hình sức khỏe học sinh.\n- Phổ biến nội dung: Ôn liên hoàn động tác chân, vặn mình, bụng; trò chơi vận động.",
        lvd: "2 - 3'",
        gv: "- GV nhận lớp, nắm bắt tình hình sức khỏe học sinh.\n- Phổ biến mục tiêu tiết ôn tập: Hoàn thiện thuần thục liên hoàn 3 động tác bài thể dục.",
        hs: "- Tập hợp 4 hàng ngang, cán sự điểm số báo cáo.\n- Lắng nghe, chuẩn bị tâm thế bước vào tiết học.",
        hsImgUrl: standardFormationDiagrams[0].svgDataUrl,
        hsImgTitle: 'Đội hình nhận lớp'
      },
      {
        content: "1.2 Khởi động:\nXoay các khớp cổ tay, cổ chân, vai, cánh tay, hông, gối.\n1.3 Trò chơi bổ trợ khởi động:\n- Trò chơi “Kết bạn”.",
        lvd: "3 - 4'\n2x8n",
        gv: "- Điều hành khởi động chung, đôn đốc học sinh thực hiện đúng biên độ.\n- Tổ chức trò chơi “Kết bạn” tạo không khí vui tươi, gắn kết.",
        hs: "- Khởi động tích cực, đều đặn theo nhịp hô.\n- Di chuyển thành vòng tròn tham gia trò chơi sôi nổi.",
        contentImgUrl: '/assets/sgk_chuan/k1_tro_choi_ket_ban.jpg',
        contentImgTitle: 'Trò chơi bổ trợ khởi động: Kết bạn - SGK GDTC 1 (Trang 31)',
        hsImgUrl: standardFormationDiagrams[1].svgDataUrl,
        hsImgTitle: 'Đội hình khởi động vòng tròn'
      },
      {
        content: "2. Hoạt động hình thành kiến thức:\n2.1. Ôn tập liên hoàn Động tác Chân, Động tác Vặn mình và Động tác Bụng:\n- Động tác chân: Kiễng gót, khuỵu gối, thân người thẳng.\n- Động tác vặn mình: Vặn thân 90 độ, chân giữ cố định.\n- Động tác bụng: Cúi gập thân người sâu, chạm tay vào mũi chân.\n2.2. Ghép nối liên hoàn theo nhịp đếm 8 nhịp.",
        lvd: "7 - 8'",
        gv: "- Cho HS quan sát lại tranh SGK tổng hợp 3 động tác.\n- GV nhắc lại các điểm mấu chốt: thẳng gối ở động tác bụng, đứng vững ở động tác chân.\n- Làm mẫu liên hoàn 3 động tác, phân tích nhịp chuyển tiếp mượt mà.",
        hs: "- Quan sát tranh ảnh và động tác mẫu của thầy.\n- Thực hiện từng động tác theo hướng dẫn, sau đó ghép nối liên hoàn 3 động tác theo nhịp đếm.",
        contentImgUrl: '/assets/sgk_chuan/k1_chan.jpg',
        contentImgTitle: 'Hình ảnh Kỹ thuật: Động tác Chân & Vặn mình (SGK GDTC Lớp 1)',
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập động tác mới'
      },
      {
        content: "3. Hoạt động luyện tập\n3.1. Tổ chức tập đồng loạt:\n- Toàn lớp tập liên hoàn 3 động tác (chân, vặn mình, bụng) theo nhịp hô dứt khoát của GV (2-3 lần).",
        lvd: "5 - 6'\n2-3 lần",
        gv: "- Hô nhịp dứt khoát, quan sát uốn nắn tư thế học sinh toàn lớp.\n- Chú ý nhắc nhở các em chưa thẳng tay hoặc nhịp tập chưa đều.",
        hs: "- Đội hình 4 hàng ngang so le, tập luyện đồng loạt nhịp nhàng, dứt khoát.",
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập đồng loạt'
      },
      {
        content: "3.2. Luyện tập theo tổ / nhóm & cặp đôi:\n- Chia tổ tập luyện dưới sự chỉ huy của tổ trưởng.\n- Các bạn trong tổ sửa sai cho nhau, luân phiên làm chỉ huy.",
        lvd: "6 - 7'\n2-3 lần",
        gv: "- Phân công các tổ về khu vực sân tập, theo dõi đôn đốc việc tự quản.\n- Hướng dẫn tổ trưởng cách hô nhịp và cách sửa sai cho bạn.\n- Khen ngợi tổ có tính kỷ luật cao và tiến bộ rõ rệt.",
        hs: "- Tổ trưởng điều hành tổ tập luyện nghiêm túc.\n- Các thành viên trong tổ tích cực hỗ trợ nhau hoàn thiện động tác.",
        hsImgUrl: standardFormationDiagrams[3].svgDataUrl,
        hsImgTitle: 'Đội hình luyện tập theo tổ'
      },
      {
        content: "3.3. Thi đua biểu diễn & sửa sai:\n- Từng tổ lên biểu diễn liên hoàn 3 động tác.\n- Cả lớp cùng giáo viên bình chọn tổ xuất sắc nhất.",
        lvd: "4 - 5'",
        gv: "- Tổ chức thi đua công bằng, đánh giá cao sự tiến bộ và tính đồng đều.\n- Chỉ ra những lỗi sai phổ biến để cả lớp cùng rút kinh nghiệm.",
        hs: "- Từng tổ tự tin lên thể hiện phần thi của tổ mình.\n- Cổ vũ nhiệt tình và đóng góp ý kiến nhận xét chân thành.",
        hsImgUrl: standardFormationDiagrams[4].svgDataUrl,
        hsImgTitle: 'Đội hình thi đua'
      },
      {
        content: "3.4 Trò chơi vận động: \"Lò cò tiếp sức\":\n- Rèn luyện sức bật, thăng bằng và sự nhanh nhẹn.\n- Thi đua giữa các hàng theo luật chơi.",
        lvd: "4 - 6'",
        gv: "- Nhắc nhở quy tắc an toàn khi lò cò tiếp sức.\n- Tổ chức cho học sinh thi đấu hào hứng, phân định thắng thua rõ ràng.",
        hs: "- Chơi hết mình, cổ vũ bạn nhiệt tình, chấp hành luật chơi.",
        contentImgUrl: '/assets/sgk_chuan/k1_tro_choi_lo_co_tiep_suc.jpg',
        contentImgTitle: 'Trò chơi: Lò cò tiếp sức - SGK GDTC 1 (Trang 34)',
        hsImgUrl: standardFormationDiagrams[8].svgDataUrl,
        hsImgTitle: 'Sơ đồ trò chơi Lò cò tiếp sức'
      },
      {
        content: "4. Hoạt động vận dụng & Hồi tĩnh\n4.1. Hồi tĩnh:\n- Thả lỏng toàn thân, hít thở sâu, điều hòa cơ thể.\n4.2. Vận dụng:\n- Tự giác tập luyện bài thể dục vào mỗi buổi sáng.\n4.3 Nhận xét, dặn dò và xuống lớp.",
        lvd: "4 - 5'\n2x8n",
        gv: "- Cho học sinh thả lỏng cơ bắp, điều hòa nhịp tim.\n- Nhận xét tuyên dương tinh thần học tập của cả lớp.\n- Dặn dò học sinh duy trì tập thể dục tại nhà.",
        hs: "- Thực hiện thả lỏng thư giãn theo vòng tròn.\n- Lắng nghe ghi nhớ và hô to khẩu lệnh khi xuống lớp.",
        hsImgUrl: standardFormationDiagrams[15].svgDataUrl,
        hsImgTitle: 'Đội hình hồi tĩnh'
      }
    ],
    postLessonAdjustment: 'Học sinh đã thực hiện liên hoàn 3 động tác chân, vặn mình, bụng tương đối thuần thục và đều đẹp.',
    signatures: {
      locationDate: 'Vệ Giang, ngày 13 tháng 11 năm 2026',
      bgh: 'Võ Thị Thuận',
      headTeacher: 'Bùi Ngọc Lâm',
      teacher: 'Lê Quốc Hưng'
    }
  },

  // ==========================================
  // KHỐI 3 - TUẦN 10 - TIẾT 19
  // ==========================================
  k3_t19: {
    id: 'k3_t19',
    grade: 3,
    week: 10,
    lessonNum: 19,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC',
    title: 'Bài 1: ĐỘNG TÁC VƯƠN THỞ, ĐỘNG TÁC TAY, ĐỘNG TÁC CHÂN (Tiết 3)',
    dateRange: 'Từ ngày 09-13 tháng 11 năm 2026',
    specialCompetencies: {
      healthCare: 'Biết chọn trang phục thể thao thích hợp, khởi động kỹ càng và giữ gìn vệ sinh sân bãi sạch sẽ.',
      basicMovement: 'Học và thực hiện được kỹ thuật Động tác Chân; ôn tập và phối hợp nhịp nhàng với Động tác Vươn thở và Động tác Tay.',
      sportsCompetency: 'Biết quan sát tranh ảnh kỹ thuật SGK và động tác mẫu của giáo viên; biết nhận xét và tự sửa sai động tác.',
      disabledStudents: 'Áp dụng học hòa nhập linh hoạt, giảm độ cao khi nâng đùi hoặc biên độ kiễng chân theo tình hình sức khỏe HS.'
    },
    generalCompetencies: {
      autonomy: 'Chủ động học tập, quan sát tranh ảnh SGK và làm theo hướng dẫn.',
      collaboration: 'Phối hợp nhịp nhàng với bạn trong tổ khi tập luyện theo nhóm và cặp đôi.',
      problemSolving: 'Biết điều chỉnh biên độ tay chân khi phát hiện tư thế sai.',
      disabledStudents: 'Khích lệ tham gia cùng các bạn.'
    },
    qualities: {
      diligence: 'Chăm chỉ, nghiêm túc trong giờ học thể dục.',
      honesty: 'Trung thực trong đánh giá bạn và thi đua trò chơi.',
      responsibility: 'Có ý thức tập thể, giữ gìn vệ sinh chung.',
      disabledStudents: 'Đoàn kết, hòa nhập.'
    },
    integrations: {
      digitalSkill: 'Mã 4.1TC1a',
      digitalDescription: 'Học sinh biết sử dụng thiết bị số an toàn khi quan sát học liệu về góc gập gối và tư thế thân người.',
      lifeSkills: 'Rèn luyện tác phong nhanh nhẹn, tinh thần đồng đội và ý thức kỷ luật.',
      environmentalEducation: 'Bảo vệ môi trường: nhặt sạch rác trên sân tập trước và sau buổi học.'
    },
    locationEquipment: {
      location: 'Sân tập thể dục của trường bằng phẳng, sạch sẽ.',
      teacherTools: 'Giáo án, SGK GDTC 3, còi, tranh ảnh động tác chân, tranh ảnh trò chơi Đua ô tô.',
      studentTools: 'Giày bata, trang phục thể thao thoáng mát.'
    },
    rows: [
      {
        content: "1. Hoạt động mở đầu\n1.1 Nhận lớp:\n- Điểm số, báo cáo sĩ số, kiểm tra trang phục và sức khỏe học sinh.\n- Phổ biến nội dung: Học động tác chân, ôn động tác vươn thở và tay; trò chơi Đua ô tô.",
        lvd: "2 - 3'",
        gv: "- GV tiếp nhận lớp, hỏi han sức khỏe học sinh chu đáo.\n- Phổ biến mục tiêu bài học: Nắm vững kỹ thuật động tác chân và phối hợp nhịp nhàng với vươn thở, tay.",
        hs: "- Tập hợp 4 hàng ngang, cán sự điểm số báo cáo chính xác.\n- HS chú ý lắng nghe, chuẩn bị tâm thế tốt nhất.",
        hsImgUrl: standardFormationDiagrams[0].svgDataUrl,
        hsImgTitle: 'Đội hình nhận lớp'
      },
      {
        content: "1.2 Khởi động:\nXoay kỹ khớp cổ tay, cổ chân, vai, cánh tay, hông, gối.\n1.3 Trò chơi bổ trợ khởi động:\n- Trò chơi “Đổi chỗ theo hiệu lệnh” (hoặc Chui qua hầm).",
        lvd: "3 - 4'\n2x8n",
        gv: "- Hướng dẫn khởi động các khớp nhịp nhàng, đúng phương pháp.\n- Điều hành trò chơi khởi động tạo không khí phấn khởi, tập trung phản xạ.",
        hs: "- Thực hiện khởi động nghiêm túc.\n- Chơi trò chơi khởi động nhiệt tình, đúng hiệu lệnh còi.",
        contentImgUrl: '/assets/extracted_sgk/tuan8_img_2.jpg',
        contentImgTitle: 'Trò chơi bổ trợ khởi động: Chui qua hầm - Khối 3',
        hsImgUrl: standardFormationDiagrams[1].svgDataUrl,
        hsImgTitle: 'Đội hình khởi động vòng tròn'
      },
      {
        content: "2. Hoạt động hình thành kiến thức:\n2.1. Ôn Động tác Vươn thở và Động tác Tay:\n- Cả lớp ôn lại 2 động tác đã học ở tuần trước.\n2.2. Học Động tác Chân:\n- TTCB: Đứng nghiêm.\n- Nhịp 1: Kiễng gót chân, đồng thời hai tay dang ngang, lòng bàn tay sấp.\n- Nhịp 2: Hạ gót chân đồng thời khuỵu gối sâu, hai tay đưa ra trước song song, lòng bàn tay sấp, thân người thẳng.\n- Nhịp 3: Đứng thẳng lên như nhịp 1.\n- Nhịp 4: Về tư thế chuẩn bị.\n- Nhịp 5, 6, 7, 8: Thực hiện lặp lại như nhịp 1, 2, 3, 4.",
        lvd: "7 - 8'",
        gv: "- Cho HS quan sát tranh ảnh SGK Lớp 3 về động tác chân.\n- GV làm mẫu toàn bộ động tác chân 2 lần, sau đó vừa làm mẫu vừa phân tích kỹ thuật nhịp 2 khuỵu gối lưng thẳng.\n- Hô nhịp chậm cho học sinh tập bắt chước 2-3 lần, kịp thời chỉnh sửa tư thế khuỵu gối bị gù lưng.",
        hs: "- Chú ý quan sát tranh ảnh kỹ thuật và động tác mẫu của thầy.\n- Tập theo nhịp hô hướng dẫn của thầy, chú ý giữ thăng bằng thân người khi kiễng gót và khuỵu gối.",
        contentImgUrl: '/assets/extracted_sgk/tuan8_img_8.jpg',
        contentImgTitle: 'Hình ảnh Kỹ thuật: Động tác Chân - Khối 3 (Trang 27 SGK)',
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập động tác mới'
      },
      {
        content: "3. Hoạt động luyện tập\n3.1. Tổ chức tập đồng loạt:\n- Toàn lớp tập động tác chân kết hợp với vươn thở và tay theo nhịp đếm dứt khoát của GV (2-3 lần).",
        lvd: "5 - 6'\n2-3 lần",
        gv: "- Hô nhịp rõ, đếm nhịp cho lớp thực hiện đồng loạt.\n- Quan sát toàn cảnh, nhắc nhở học sinh hạ gối êm, giữ thăng bằng tốt.",
        hs: "- Tập luyện đồng loạt 4 hàng ngang nghiêm túc, đúng nhịp hô của GV.",
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập đồng loạt'
      },
      {
        content: "3.2. Luyện tập theo tổ / nhóm & cặp đôi:\n- Chia tổ tập luyện dưới sự hướng dẫn của tổ trưởng.\n- Các thành viên đổi vai chỉ huy và nhận xét nhau.",
        lvd: "6 - 7'\n2-3 lần",
        gv: "- Phân công các tổ vào vị trí, đôn đốc nhắc nhở các tổ trưởng.\n- Đến từng tổ uốn nắn các lỗi sai như hai tay chưa thẳng, cúi đầu khi khuỵu gối.",
        hs: "- Tổ trưởng điều hành tổ tập trung, các bạn tích cực tập và góp ý cho nhau.",
        hsImgUrl: standardFormationDiagrams[3].svgDataUrl,
        hsImgTitle: 'Đội hình tập theo tổ'
      },
      {
        content: "3.3. Thi đua biểu diễn & sửa sai:\n- Các tổ cử đại diện hoặc cả tổ thi đua biểu diễn 3 động tác.\n- Giáo viên và các tổ cùng đánh giá, chấm điểm.",
        lvd: "4 - 5'",
        gv: "- Tổ chức thi đua tạo động lực, chấm điểm công tâm.\n- Đánh giá ưu điểm, chỉ ra tồn tại của từng tổ để hoàn thiện.",
        hs: "- Tự tin thể hiện bài tập trước lớp, đón nhận nhận xét tích cực.",
        hsImgUrl: standardFormationDiagrams[4].svgDataUrl,
        hsImgTitle: 'Đội hình thi đua giữa các tổ'
      },
      {
        content: "3.4 Trò chơi vận động: \"Đua ô tô\":\n- Rèn luyện phản xạ nhanh, sự phối hợp khéo léo và tinh thần thi đua tập thể.\n- Tổ chức chơi theo luật định.",
        lvd: "4 - 6'",
        gv: "- Hướng dẫn cách chơi, luật chơi, đảm bảo an toàn khoảng cách.\n- Cho học sinh chơi thử, sau đó tổ chức thi đua giữa các tổ.",
        hs: "- Nắm vững luật chơi, hào hứng tham gia và cổ vũ nhiệt tình.",
        contentImgUrl: '/assets/extracted_sgk/tuan9_img_0.jpg',
        contentImgTitle: 'Trò chơi: Đua ô tô - Khối 3 (Trang 32 SGK)',
        hsImgUrl: standardFormationDiagrams[8].svgDataUrl,
        hsImgTitle: 'Sơ đồ trò chơi Đua ô tô'
      },
      {
        content: "4. Hoạt động vận dụng & Hồi tĩnh\n4.1. Hồi tĩnh:\n- Thả lỏng cơ thể, đi chậm quanh sân, hít thở sâu.\n4.2. Vận dụng:\n- Thực hiện các động tác thể dục đã học để nâng cao sức khỏe mỗi ngày.\n4.3 Nhận xét, dặn dò bài tập về nhà và xuống lớp.",
        lvd: "4 - 5'\n2x8n",
        gv: "- Điều hành thả lỏng hồi tĩnh.\n- Đánh giá chung kết quả giờ học, tuyên dương tổ xuất sắc, phát lệnh xuống lớp.",
        hs: "- Thả lỏng nhẹ nhàng, lắng nghe dặn dò và chào GV khi xuống lớp.",
        hsImgUrl: standardFormationDiagrams[15].svgDataUrl,
        hsImgTitle: 'Đội hình hồi tĩnh'
      }
    ],
    postLessonAdjustment: 'Học sinh nắm vững kỹ thuật động tác chân, phối hợp nhịp nhàng với 2 động tác vươn thở và tay.',
    signatures: {
      locationDate: 'Vệ Giang, ngày 13 tháng 11 năm 2026',
      bgh: 'Võ Thị Thuận',
      headTeacher: 'Bùi Ngọc Lâm',
      teacher: 'Lê Quốc Hưng'
    }
  },

  // ==========================================
  // KHỐI 3 - TUẦN 10 - TIẾT 20
  // ==========================================
  k3_t20: {
    id: 'k3_t20',
    grade: 3,
    week: 10,
    lessonNum: 20,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC',
    title: 'Bài 1: ĐỘNG TÁC VƯƠN THỞ, ĐỘNG TÁC TAY, ĐỘNG TÁC CHÂN (Tiết 4)',
    dateRange: 'Từ ngày 09-13 tháng 11 năm 2026',
    specialCompetencies: {
      healthCare: 'Biết duy trì nền nếp tập luyện an toàn, vệ sinh sân tập và giữ trang phục chỉnh tề.',
      basicMovement: 'Thực hiện thuần thục và liên hoàn 3 động tác Vươn thở, Tay, Chân đúng nhịp hô và đúng kỹ thuật biên độ.',
      sportsCompetency: 'Tự tin tự điều chỉnh động tác khi luyện tập; tích cực tham gia nhận xét và học hỏi từ bạn bè.',
      disabledStudents: 'Khích lệ tham gia với tinh thần học hòa nhập, tập động tác tay và chân theo sức của mình.'
    },
    generalCompetencies: {
      autonomy: 'Tự giác ôn luyện, biết tự đếm nhịp và tự uốn nắn tư thế.',
      collaboration: 'Biết hợp tác, lắng nghe và động viên bạn bè trong tổ.',
      problemSolving: 'Biết phát hiện lỗi sai nhịp và tự điều chỉnh kịp thời.',
      disabledStudents: 'Linh hoạt, tạo điều kiện thuận lợi nhất cho HS.'
    },
    qualities: {
      diligence: 'Chăm chỉ hoàn thành bài tập, có ý thức rèn luyện thân thể.',
      honesty: 'Trung thực trong học tập và tham gia trò chơi.',
      responsibility: 'Tự giác giữ gìn đồ dùng học tập và trật tự chung.',
      disabledStudents: 'Đoàn kết, giúp đỡ bạn bè.'
    },
    integrations: {
      digitalSkill: 'Mã 4.1TC1a',
      digitalDescription: 'Học sinh biết sử dụng thiết bị số an toàn khi quan sát học liệu về tính liên hoàn giữa các động tác.',
      lifeSkills: 'Rèn tác phong nghiêm túc, tính kỷ luật và sự tự tin.',
      environmentalEducation: 'Thu dọn dụng cụ thể thao gọn gàng vào kho sau giờ học.'
    },
    locationEquipment: {
      location: 'Sân trường bằng phẳng, râm mát.',
      teacherTools: 'Giáo án, còi, tranh ảnh SGK, vạch mốc chơi trò chơi.',
      studentTools: 'Trang phục thể thao đầy đủ, giày thể thao sạch sẽ.'
    },
    rows: [
      {
        content: "1. Hoạt động mở đầu\n1.1 Nhận lớp:\n- Cán sự tập hợp lớp, kiểm tra sĩ số, trang phục và báo cáo.\n- GV phổ biến nội dung: Ôn liên hoàn 3 động tác vươn thở, tay, chân; trò chơi Chạy nhanh tiếp sức.",
        lvd: "2 - 3'",
        gv: "- Tiếp nhận báo cáo, kiểm tra trang phục và sức khỏe học sinh.\n- Nêu rõ mục tiêu tiết học: Hoàn thiện liên hoàn 3 động tác với độ chính xác và tính đồng đều cao.",
        hs: "- Tập hợp hàng dọc dóng thẳng, chuyển hàng ngang nhận lớp.\n- Lắng nghe yêu cầu tiết học, tập trung cao độ.",
        hsImgUrl: standardFormationDiagrams[0].svgDataUrl,
        hsImgTitle: 'Đội hình nhận lớp'
      },
      {
        content: "1.2 Khởi động:\nXoay kỹ các khớp cổ tay, cổ chân, vai, cánh tay, hông, gối.\n1.3 Trò chơi bổ trợ khởi động:\n- Trò chơi “Chui qua hầm”.",
        lvd: "3 - 4'\n2x8n",
        gv: "- Cùng khởi động với học sinh, đôn đốc các động tác xoay khớp.\n- Hướng dẫn tổ chức trò chơi “Chui qua hầm” khéo léo, an toàn.",
        hs: "- Khởi động nghiêm túc theo nhịp đếm.\n- Tham gia trò chơi hào hứng, khéo léo.",
        contentImgUrl: '/assets/extracted_sgk/tuan8_img_2.jpg',
        contentImgTitle: 'Trò chơi bổ trợ khởi động: Chui qua hầm - Khối 3',
        hsImgUrl: standardFormationDiagrams[1].svgDataUrl,
        hsImgTitle: 'Đội hình khởi động vòng tròn'
      },
      {
        content: "2. Hoạt động hình thành kiến thức:\n2.1. Ôn liên hoàn Động tác Vươn thở, Tay, Chân:\n- Động tác vươn thở: Hít thở sâu, ngực nở nang, mắt nhìn theo tay.\n- Động tác tay: Hai tay dang ngang và vỗ tay trên đầu dứt khoát.\n- Động tác chân: Kiễng gót, khuỵu gối thân người thẳng thăng bằng.\n2.2. Phối hợp liên hoàn 3 động tác 8 nhịp liên tục.",
        lvd: "7 - 8'",
        gv: "- Cho học sinh quan sát tranh ảnh kỹ thuật tổng hợp 3 động tác.\n- Thị phạm liên hoàn 3 động tác với nhịp điệu chuẩn xác.\n- Hô nhịp cho học sinh tập nối tiếp, chỉ dẫn học sinh chuyển tiếp nhịp nhàng từ động tác này sang động tác kia.",
        hs: "- Quan sát mẫu và tranh ảnh, nắm vững thứ tự động tác.\n- Tập liên hoàn 3 động tác theo hiệu lệnh, chú ý biên độ và nhịp thở.",
        contentImgUrl: '/assets/extracted_sgk/tuan8_img_8.jpg',
        contentImgTitle: 'Hình ảnh Kỹ thuật: Động tác Chân - Khối 3 (Trang 27 SGK)',
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập động tác mới'
      },
      {
        content: "3. Hoạt động luyện tập\n3.1. Tổ chức tập đồng loạt:\n- Toàn lớp tập liên hoàn 3 động tác theo khẩu lệnh và nhịp hô của GV (2-3 lần).",
        lvd: "5 - 6'\n2-3 lần",
        gv: "- Hô nhịp to, rõ, dứt khoát; bao quát sân tập để sửa sai.\n- Động viên các em tập đều, đẹp, giữ cự ly hàng ngang ngay ngắn.",
        hs: "- Cả lớp tập đồng loạt, động tác dứt khoát, đều và đẹp.",
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập đồng loạt'
      },
      {
        content: "3.2. Luyện tập theo tổ / nhóm & cặp đôi:\n- Chia tổ tập luyện dưới sự chỉ huy của các tổ trưởng.\n- Các bạn trong tổ luân phiên đếm nhịp và nhận xét lẫn nhau.",
        lvd: "6 - 7'\n2-3 lần",
        gv: "- Đi từng tổ đôn đốc, uốn nắn các tư thế chưa chuẩn xác.\n- Đánh giá khả năng tự quản của từng tổ trưởng.",
        hs: "- Tổ trưởng điều hành tổ tập trung, các bạn nghiêm túc lắng nghe và sửa sai.",
        hsImgUrl: standardFormationDiagrams[3].svgDataUrl,
        hsImgTitle: 'Đội hình tập theo tổ'
      },
      {
        content: "3.3. Thi đua biểu diễn & sửa sai:\n- Các tổ lần lượt biểu diễn liên hoàn 3 động tác trước lớp.\n- Lớp cùng GV đánh giá, nhận xét và xếp loại thi đua.",
        lvd: "4 - 5'",
        gv: "- Tổ chức thi đua sôi nổi, nhận xét đánh giá khách quan, tuyên dương tổ dẫn đầu.",
        hs: "- Từng tổ tự tin thực hiện phần thi, các tổ khác chăm chú quan sát và cổ vũ.",
        hsImgUrl: standardFormationDiagrams[4].svgDataUrl,
        hsImgTitle: 'Đội hình thi đua giữa các tổ'
      },
      {
        content: "3.4 Trò chơi vận động: \"Chạy nhanh tiếp sức\":\n- Rèn luyện tốc độ, phản xạ xuất phát nhanh và tinh thần thi đua đồng đội.\n- Thi đấu theo luật quy định.",
        lvd: "4 - 6'",
        gv: "- Phổ biến luật chơi, chuẩn bị vạch xuất phát và cọc mốc an toàn.\n- Điều hành trò chơi, làm trọng tài công bằng.",
        hs: "- Tham gia chơi với tinh thần quyết tâm cao, cổ vũ đồng đội nhiệt tình.",
        contentImgUrl: '/assets/extracted_sgk/tuan8_img_3.jpg',
        contentImgTitle: 'Trò chơi: Chạy nhanh tiếp sức - Khối 3 (Trang 35 SGK)',
        hsImgUrl: standardFormationDiagrams[8].svgDataUrl,
        hsImgTitle: 'Sơ đồ trò chơi Chạy nhanh tiếp sức'
      },
      {
        content: "4. Hoạt động vận dụng & Hồi tĩnh\n4.1. Hồi tĩnh:\n- Thả lỏng cơ thể, đi chậm quanh sân, hít thở sâu nhẹ nhàng.\n4.2. Vận dụng:\n- Tự giác tập thể dục buổi sáng và giờ ra chơi.\n4.3 Nhận xét, dặn dò bài tập về nhà và xuống lớp.",
        lvd: "4 - 5'\n2x8n",
        gv: "- Cho lớp thả lỏng thư giãn toàn thân.\n- Đánh giá tổng kết giờ học, dặn dò tập luyện ngoài giờ và hô khẩu lệnh xuống lớp.",
        hs: "- Thả lỏng nhẹ nhàng, lắng nghe dặn dò và đáp lễ khi xuống lớp.",
        hsImgUrl: standardFormationDiagrams[15].svgDataUrl,
        hsImgTitle: 'Đội hình hồi tĩnh'
      }
    ],
    postLessonAdjustment: 'Học sinh khối 3 thực hiện liên hoàn 3 động tác rất đều, đẹp và thuần thục.',
    signatures: {
      locationDate: 'Vệ Giang, ngày 13 tháng 11 năm 2026',
      bgh: 'Võ Thị Thuận',
      headTeacher: 'Bùi Ngọc Lâm',
      teacher: 'Lê Quốc Hưng'
    }
  },

  // ==========================================
  // KHỐI 5 - TUẦN 10 - TIẾT 19
  // ==========================================
  k5_t19: {
    id: 'k5_t19',
    grade: 5,
    week: 10,
    lessonNum: 19,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY',
    title: 'Bài 2: ĐỘNG TÁC BỤNG, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC TOÀN THÂN VỚI GẬY (Tiết 3)',
    dateRange: 'Từ ngày 09-13 tháng 11 năm 2026',
    specialCompetencies: {
      healthCare: 'Biết kiểm tra gậy tập thể dục an toàn, sân tập sạch sẽ, trang phục đúng quy định trước khi học.',
      basicMovement: 'Học và thực hiện được Động tác Toàn thân với gậy; ôn tập phối hợp nhuần nhuyễn Động tác Bụng và Vặn mình với gậy.',
      sportsCompetency: 'Biết quan sát tranh ảnh SGK GDTC 5 và động tác mẫu của GV; tự điều chỉnh tư thế gập thân, xoay hông và cầm gậy chắc chắn.',
      disabledStudents: 'Cho học sinh khuyết tật tập động tác tay với gậy nhẹ hoặc tập không gậy, thực hiện theo khả năng sức khỏe.'
    },
    generalCompetencies: {
      autonomy: 'Chủ động chuẩn bị gậy tập, tự giác luyện tập theo hướng dẫn của giáo viên.',
      collaboration: 'Phối hợp với bạn cùng tổ, nhắc nhở khoảng cách an toàn khi vung gậy tập luyện.',
      problemSolving: 'Phát hiện tư thế gập thân chưa đúng góc độ và tự sửa sai.',
      disabledStudents: 'Khích lệ tham gia hòa nhập cùng các bạn.'
    },
    qualities: {
      diligence: 'Kiên trì rèn luyện để thực hiện động tác đẹp và chính xác.',
      honesty: 'Trung thực trong tự nhận xét và thi đua trò chơi.',
      responsibility: 'Có ý thức bảo quản gậy thể dục, bảo đảm an toàn cho mình và bạn.',
      disabledStudents: 'Đoàn kết, hòa đồng, tích cực.'
    },
    integrations: {
      digitalSkill: 'Mã 6.1TC2a',
      digitalDescription: 'Học sinh làm quen và bước đầu nhận thức được sự hỗ trợ của trí tuệ nhân tạo (AI) thông qua việc quan sát phần mềm phân tích tư thế thân người, cách cầm gậy, biên độ và nhịp động tác đúng/sai mà giáo viên giới thiệu.',
      lifeSkills: 'Rèn tác phong nhanh nhẹn, kỷ luật và tinh thần trách nhiệm tập thể.',
      environmentalEducation: 'Bảo quản dụng cụ thể thao cẩn thận, sắp xếp gậy ngay ngắn vào giá sau giờ học.'
    },
    locationEquipment: {
      location: 'Sân trường hoặc nhà thi đấu thoáng đãng, bằng phẳng.',
      teacherTools: 'Giáo án, gậy thể dục mẫu, còi, tranh ảnh SGK GDTC 5, dây kéo co hoặc dụng cụ trò chơi.',
      studentTools: 'Mỗi học sinh 1 gậy thể dục chuẩn dài 1m - 1.2m, giày bata.'
    },
    rows: [
      {
        content: "1. Hoạt động mở đầu\n1.1 Nhận lớp:\n- Cán sự tập hợp lớp, kiểm tra sĩ số, trang phục, gậy tập và báo cáo GV.\n- Phổ biến nội dung: Học động tác toàn thân với gậy; ôn động tác bụng, vặn mình; trò chơi Kéo co thể thao.",
        lvd: "2 - 3'",
        gv: "- Tiếp nhận báo cáo, kiểm tra an toàn gậy tập của học sinh.\n- Nêu mục tiêu bài học: Nắm vững kỹ thuật động tác toàn thân với gậy và phối hợp an toàn.",
        hs: "- Tập hợp 4 hàng ngang cự ly giãn cách rộng để cầm gậy an toàn.\n- Chú ý lắng nghe phổ biến nội dung bài học.",
        hsImgUrl: standardFormationDiagrams[0].svgDataUrl,
        hsImgTitle: 'Đội hình nhận lớp'
      },
      {
        content: "1.2 Khởi động:\nXoay kỹ các khớp cổ tay, cổ chân, vai, cánh tay, hông, gối.\n1.3 Trò chơi bổ trợ khởi động:\n- Trò chơi “Chạy luồn cọc tiêu” (hoặc Ai kéo khoẻ hơn).",
        lvd: "3 - 4'\n2x8n",
        gv: "- Cùng khởi động với học sinh, đôn đốc các động tác làm nóng cơ thể.\n- Tổ chức trò chơi chạy luồn cọc tiêu khởi động phản xạ và sự khéo léo.",
        hs: "- Khởi động tích cực, đều đặn.\n- Tham gia trò chơi khởi động sôi nổi, an toàn.",
        contentImgUrl: '/assets/sgk_chuan/k5_tro_choi_doi_nao_nhanh_nhat.jpg',
        contentImgTitle: 'Trò chơi bổ trợ khởi động: Đội nào nhanh nhất - SGK GDTC 5 (Trang 29)',
        hsImgUrl: standardFormationDiagrams[1].svgDataUrl,
        hsImgTitle: 'Đội hình khởi động vòng tròn'
      },
      {
        content: "2. Hoạt động hình thành kiến thức:\n2.1. Ôn Động tác Bụng và Động tác Vặn mình với gậy:\n- Cả lớp ôn lại 2 động tác đã học.\n2.2. Học Động tác Toàn thân với gậy:\n- TTCB: Đứng nghiêm, hai tay cầm hai đầu gậy để ngang đùi.\n- Nhịp 1: Chân trái bước sang ngang rộng hơn vai, gập thân sâu về trước, gậy đưa song song chạm sát mũi bàn chân.\n- Nhịp 2: Nâng thân người lên thẳng, hai tay nâng gậy lên cao chếch chữ V, ưỡn ngực, mắt nhìn theo gậy.\n- Nhịp 3: Gập thân sâu lần hai như nhịp 1.\n- Nhịp 4: Về tư thế chuẩn bị.\n- Nhịp 5, 6, 7, 8: Tương tự như nhịp 1, 2, 3, 4 nhưng bước chân phải.",
        lvd: "7 - 8'",
        gv: "- Cho HS quan sát tranh kỹ thuật SGK Lớp 5 động tác toàn thân với gậy.\n- Tích hợp công nghệ số & AI (6.1TC2a): Giới thiệu hình ảnh phân tích góc gập thân và tư thế cầm gậy chuẩn xác.\n- GV thị phạm động tác mẫu 2-3 lần chậm rãi, nhấn mạnh lưng thẳng khi gập thân và ưỡn căng thân người ở nhịp 2.\n- Hô nhịp cho lớp thực hiện từng nhịp, kịp thời chỉnh sửa khoảng cách cầm gậy và biên độ gập thân.",
        hs: "- Quan sát kỹ động tác mẫu và tranh ảnh SGK.\n- Tích hợp: Quan sát phân tích lỗi sai qua hình ảnh số hóa mà thầy chiếu/hướng dẫn.\n- Cầm gậy đúng khoảng cách, tập từng nhịp theo hiệu lệnh của thầy.",
        contentImgUrl: '/assets/sgk_chuan/k5_van_minh_toan_than_gay.jpg',
        contentImgTitle: 'Hình ảnh Kỹ thuật: Động tác Vặn mình & Toàn thân với gậy (SGK GDTC Lớp 5)',
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập động tác mới'
      },
      {
        content: "3. Hoạt động luyện tập\n3.1. Tổ chức tập đồng loạt:\n- Toàn lớp tập động tác toàn thân với gậy kết hợp ôn bụng và vặn mình theo nhịp đếm dứt khoát của GV (2-3 lần).",
        lvd: "5 - 6'\n2-3 lần",
        gv: "- Hô nhịp to, dứt khoát; bao quát toàn bộ lớp bảo đảm khoảng cách an toàn khi vung gậy.\n- Chỉnh sửa lỗi gù lưng hoặc tay cầm gậy quá hẹp.",
        hs: "- Tập luyện đồng loạt 4 hàng ngang giãn cách an toàn, động tác đều và đẹp mắt.",
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập đồng loạt'
      },
      {
        content: "3.2. Luyện tập theo tổ / nhóm & cặp đôi:\n- Chia tổ tập luyện dưới sự điều hành của tổ trưởng.\n- Các bạn trong tổ đổi vai chỉ huy và kiểm tra tư thế gậy cho nhau.",
        lvd: "6 - 7'\n2-3 lần",
        gv: "- Theo dõi các tổ tập luyện, kịp thời hỗ trợ các tổ trưởng duy trì nề nếp.\n- Nhắc nhở an toàn tuyệt đối khi tập luyện với dụng cụ gậy.",
        hs: "- Tổ trưởng điều hành tổ nghiêm túc, các thành viên tích cực tự sửa lỗi cho nhau.",
        hsImgUrl: standardFormationDiagrams[3].svgDataUrl,
        hsImgTitle: 'Đội hình tập theo tổ'
      },
      {
        content: "3.3. Thi đua biểu diễn & sửa sai:\n- Các tổ cử đại diện hoặc cả tổ lên biểu diễn 3 động tác với gậy.\n- Lớp cùng GV đánh giá, biểu dương tổ tập chuẩn và đẹp.",
        lvd: "4 - 5'",
        gv: "- Tổ chức thi đua công tâm, nhận xét chi tiết từng tổ về biên độ và độ dứt khoát.",
        hs: "- Từng tổ tự tin trình diễn bài tập, các tổ khác chăm chú theo dõi và chấm điểm.",
        hsImgUrl: standardFormationDiagrams[4].svgDataUrl,
        hsImgTitle: 'Đội hình thi đua giữa các tổ'
      },
      {
        content: "3.4 Trò chơi vận động: \"Kéo co thể thao\":\n- Rèn luyện sức mạnh toàn thân, ý chí kiên cường và tinh thần đoàn kết đồng đội.\n- Thi đấu theo hiệp và luật định.",
        lvd: "4 - 6'",
        gv: "- Chuẩn bị dây kéo co an toàn, hướng dẫn tư thế ghì chân và dùng sức hợp lý.\n- Làm trọng tài công minh, bảo đảm an toàn không để học sinh té ngã.",
        hs: "- Tham gia kéo co hết mình với tinh thần thể thao cao thượng, cổ vũ sôi nổi.",
        contentImgUrl: '/assets/extracted_sgk/tuan8_img_16.jpg',
        contentImgTitle: 'Trò chơi: Ai kéo khoẻ hơn / Kéo co - Khối 5',
        hsImgUrl: standardFormationDiagrams[8].svgDataUrl,
        hsImgTitle: 'Sơ đồ trò chơi Kéo co'
      },
      {
        content: "4. Hoạt động vận dụng & Hồi tĩnh\n4.1. Hồi tĩnh:\n- Thả lỏng toàn thân, gác gậy ngay ngắn, đi chậm hít thở sâu.\n4.2. Vận dụng:\n- Tự giác tập thể dục với gậy vào mỗi buổi sáng.\n4.3 Nhận xét, dặn dò bài tập về nhà và xuống lớp.",
        lvd: "4 - 5'\n2x8n",
        gv: "- Hướng dẫn lớp thả lỏng thư giãn, thu gom gậy ngay ngắn vào giá.\n- Nhận xét đánh giá tiết học, tuyên dương tinh thần tập luyện nghiêm túc và phát lệnh xuống lớp.",
        hs: "- Thả lỏng nhẹ nhàng, thu gom gậy đúng nơi quy định, đáp lễ khi xuống lớp.",
        hsImgUrl: standardFormationDiagrams[15].svgDataUrl,
        hsImgTitle: 'Đội hình hồi tĩnh'
      }
    ],
    postLessonAdjustment: 'Học sinh lớp 5 tiếp thu nhanh kỹ thuật động tác toàn thân với gậy, tập luyện an toàn và hào hứng.',
    signatures: {
      locationDate: 'Vệ Giang, ngày 13 tháng 11 năm 2026',
      bgh: 'Võ Thị Thuận',
      headTeacher: 'Bùi Ngọc Lâm',
      teacher: 'Lê Quốc Hưng'
    }
  },

  // ==========================================
  // KHỐI 5 - TUẦN 10 - TIẾT 20
  // ==========================================
  k5_t20: {
    id: 'k5_t20',
    grade: 5,
    week: 10,
    lessonNum: 20,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY',
    title: 'Bài 2: ĐỘNG TÁC BỤNG, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC TOÀN THÂN VỚI GẬY (Tiết 4)',
    dateRange: 'Từ ngày 09-13 tháng 11 năm 2026',
    specialCompetencies: {
      healthCare: 'Biết kiểm tra vệ sinh sân bãi, sắp xếp gậy tập ngăn nắp và thực hiện tốt quy định an toàn.',
      basicMovement: 'Ôn phối hợp liên hoàn Động tác Bụng, Vặn mình và Toàn thân với gậy thuần thục, đúng nhịp đếm.',
      sportsCompetency: 'Biết đánh giá độ căng của tay và biên độ xoay thân khi tập với gậy; chủ động sửa sai cho bản thân và bạn bè.',
      disabledStudents: 'Linh hoạt theo khả năng HS, giảm biên độ vung gậy, khích lệ tham gia.'
    },
    generalCompetencies: {
      autonomy: 'Chủ động ôn luyện, tự đếm nhịp và tự uốn nắn tư thế.',
      collaboration: 'Phối hợp nhịp nhàng với bạn trong tổ, giữ cự ly an toàn khi tập luyện.',
      problemSolving: 'Biết phát hiện lỗi sai nhịp và sửa chữa kịp thời.',
      disabledStudents: 'Hòa nhập cùng tập thể.'
    },
    qualities: {
      diligence: 'Chăm chỉ hoàn thành bài tập, có ý thức rèn luyện thể chất hằng ngày.',
      honesty: 'Trung thực trong học tập và tham gia trò chơi.',
      responsibility: 'Tự giác bảo quản gậy thể thao và giữ gìn trật tự chung.',
      disabledStudents: 'Đoàn kết, gắn bó với bạn bè.'
    },
    integrations: {
      digitalSkill: 'Mã 6.1TC2a',
      digitalDescription: 'Học sinh làm quen với hình ảnh số hóa phân tích nhịp động tác và biên độ tay cầm gậy.',
      lifeSkills: 'Rèn tác phong nghiêm túc, ý thức tổ chức kỷ luật và tinh thần tập thể.',
      environmentalEducation: 'Bảo quản dụng cụ thể thao cẩn thận, sắp xếp gậy ngay ngắn vào giá sau giờ học.'
    },
    locationEquipment: {
      location: 'Sân trường hoặc nhà thi đấu thoáng đãng, bằng phẳng.',
      teacherTools: 'Giáo án, gậy thể dục mẫu, còi, bóng hoặc dụng cụ trò chơi Chuyển bóng tiếp sức.',
      studentTools: 'Mỗi học sinh 1 gậy thể dục chuẩn, trang phục thể thao.'
    },
    rows: [
      {
        content: "1. Hoạt động mở đầu\n1.1 Nhận lớp:\n- Cán sự tập hợp lớp, kiểm tra sĩ số, trang phục, gậy tập và báo cáo GV.\n- Phổ biến nội dung: Ôn phối hợp liên hoàn động tác bụng, vặn mình, toàn thân với gậy; trò chơi Chuyển bóng tiếp sức.",
        lvd: "2 - 3'",
        gv: "- Tiếp nhận báo cáo, kiểm tra gậy tập và sức khỏe học sinh.\n- Nêu mục tiêu tiết học: Rèn luyện tính đồng đều, thuần thục và biên độ chuẩn xác của 3 động tác với gậy.",
        hs: "- Tập hợp 4 hàng ngang cự ly giãn cách rộng.\n- Chú ý lắng nghe hướng dẫn của GV.",
        hsImgUrl: standardFormationDiagrams[0].svgDataUrl,
        hsImgTitle: 'Đội hình nhận lớp'
      },
      {
        content: "1.2 Khởi động:\nXoay kỹ các khớp cổ tay, cổ chân, vai, cánh tay, hông, gối.\n1.3 Trò chơi bổ trợ khởi động:\n- Trò chơi “Đội nào nhanh nhất”.",
        lvd: "3 - 4'\n2x8n",
        gv: "- Hướng dẫn khởi động các khớp nhịp nhàng.\n- Tổ chức trò chơi bổ trợ khởi động tạo sự hứng khởi và nhanh nhẹn.",
        hs: "- Khởi động nghiêm túc theo nhịp đếm.\n- Tham gia trò chơi khởi động nhiệt tình.",
        contentImgUrl: '/assets/sgk_chuan/k5_tro_choi_doi_nao_nhanh_nhat.jpg',
        contentImgTitle: 'Trò chơi bổ trợ khởi động: Đội nào nhanh nhất - SGK GDTC 5 (Trang 29)',
        hsImgUrl: standardFormationDiagrams[1].svgDataUrl,
        hsImgTitle: 'Đội hình khởi động vòng tròn'
      },
      {
        content: "2. Hoạt động hình thành kiến thức:\n2.1. Ôn phối hợp liên hoàn Động tác Bụng, Vặn mình và Toàn thân với gậy:\n- Động tác bụng: Hai tay đưa gậy lên cao và cúi gập thân sâu.\n- Động tác vặn mình: Xoay thân người 90 độ, gậy giữ thăng bằng ngang ngực.\n- Động tác toàn thân: Gập thân chạm gậy sát chân và vươn căng người chữ V.\n2.2. Ghép nối liên hoàn 3 động tác 8 nhịp liên tục.",
        lvd: "7 - 8'",
        gv: "- Cho HS quan sát tranh ảnh kỹ thuật tổng hợp 3 động tác với gậy.\n- Thị phạm liên hoàn mẫu 1 lần chuẩn xác.\n- Hô nhịp cho lớp thực hiện ghép nối, chú ý nhắc học sinh giữ thăng bằng và không buông lỏng gậy.",
        hs: "- Quan sát mẫu và tranh ảnh, ghi nhớ chuỗi động tác liên hoàn.\n- Thực hiện liên hoàn 3 động tác theo khẩu lệnh của thầy, chú ý góc tay và tư thế thân người.",
        contentImgUrl: '/assets/sgk_chuan/k5_van_minh_toan_than_gay.jpg',
        contentImgTitle: 'Hình ảnh Kỹ thuật: Động tác Bụng, Vặn mình & Toàn thân với gậy (SGK GDTC Lớp 5)',
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập động tác mới'
      },
      {
        content: "3. Hoạt động luyện tập\n3.1. Tổ chức tập đồng loạt:\n- Toàn lớp tập liên hoàn 3 động tác với gậy theo nhịp hô dứt khoát của GV (2-3 lần).",
        lvd: "5 - 6'\n2-3 lần",
        gv: "- Hô nhịp dứt khoát, quan sát uốn nắn học sinh toàn lớp.\n- Chú ý sửa lỗi động tác vặn mình bị xê dịch bàn chân.",
        hs: "- Tập luyện đồng loạt 4 hàng ngang nghiêm túc, dứt khoát.",
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập đồng loạt'
      },
      {
        content: "3.2. Luyện tập theo tổ / nhóm & cặp đôi:\n- Chia tổ tập luyện dưới sự chỉ huy của các tổ trưởng.\n- Các bạn trong tổ luân phiên đếm nhịp và nhận xét lẫn nhau.",
        lvd: "6 - 7'\n2-3 lần",
        gv: "- Đi từng tổ đôn đốc, uốn nắn các tư thế chưa chuẩn xác.\n- Đánh giá khả năng tự quản của từng tổ trưởng.",
        hs: "- Tổ trưởng điều hành tổ tập trung, các bạn nghiêm túc lắng nghe và sửa sai.",
        hsImgUrl: standardFormationDiagrams[3].svgDataUrl,
        hsImgTitle: 'Đội hình tập theo tổ'
      },
      {
        content: "3.3. Thi đua biểu diễn & sửa sai:\n- Các tổ lần lượt biểu diễn liên hoàn 3 động tác với gậy trước lớp.\n- Lớp cùng GV đánh giá, nhận xét và xếp loại thi đua.",
        lvd: "4 - 5'",
        gv: "- Tổ chức thi đua sôi nổi, nhận xét đánh giá khách quan, tuyên dương tổ dẫn đầu.",
        hs: "- Từng tổ tự tin thực hiện phần thi, các tổ khác chăm chú quan sát và cổ vũ.",
        hsImgUrl: standardFormationDiagrams[4].svgDataUrl,
        hsImgTitle: 'Đội hình thi đua giữa các tổ'
      },
      {
        content: "3.4 Trò chơi vận động: \"Chuyển bóng tiếp sức\":\n- Rèn luyện sự khéo léo, dẻo dai và tinh thần đồng đội.\n- Thi đấu theo hiệp và luật định.",
        lvd: "4 - 6'",
        gv: "- Hướng dẫn cách chơi, luật chơi, đảm bảo an toàn khoảng cách.\n- Cho học sinh chơi thử, sau đó tổ chức thi đua giữa các tổ.",
        hs: "- Nắm vững luật chơi, hào hứng tham gia và cổ vũ nhiệt tình.",
        contentImgUrl: '/assets/sgk_chuan/k5_chuyen_gay_tiep_suc.jpg',
        contentImgTitle: 'Trò chơi: Chuyền gậy tiếp sức - SGK GDTC 5 (Trang 26)',
        hsImgUrl: standardFormationDiagrams[8].svgDataUrl,
        hsImgTitle: 'Sơ đồ trò chơi Chuyển bóng tiếp sức'
      },
      {
        content: "4. Hoạt động vận dụng & Hồi tĩnh\n4.1. Hồi tĩnh:\n- Thả lỏng cơ thể, gác gậy cẩn thận, đi chậm quanh sân, hít thở sâu.\n4.2. Vận dụng:\n- Thực hiện các động tác thể dục với gậy đã học để rèn luyện sức khỏe mỗi ngày.\n4.3 Nhận xét, dặn dò bài tập về nhà và xuống lớp.",
        lvd: "4 - 5'\n2x8n",
        gv: "- Điều hành thả lỏng hồi tĩnh.\n- Đánh giá chung kết quả giờ học, tuyên dương tổ xuất sắc, phát lệnh xuống lớp.",
        hs: "- Thả lỏng nhẹ nhàng, lắng nghe dặn dò và chào GV khi xuống lớp.",
        hsImgUrl: standardFormationDiagrams[15].svgDataUrl,
        hsImgTitle: 'Đội hình hồi tĩnh'
      }
    ],
    postLessonAdjustment: 'Học sinh khối 5 thực hiện các động tác với gậy rất thuần thục, tư thế đẹp và đều.',
    signatures: {
      locationDate: 'Vệ Giang, ngày 13 tháng 11 năm 2026',
      bgh: 'Võ Thị Thuận',
      headTeacher: 'Bùi Ngọc Lâm',
      teacher: 'Lê Quốc Hưng'
    }
  },

  // ==========================================
  // KHỐI 5 - TUẦN 10 - TIẾT 21
  // ==========================================
  k5_t21: {
    id: 'k5_t21',
    grade: 5,
    week: 10,
    lessonNum: 21,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY',
    title: 'Bài 2: ĐỘNG TÁC BỤNG, ĐỘNG TÁC VẶN MÌNH, ĐỘNG TÁC TOÀN THÂN VỚI GẬY (Tiết 5)',
    dateRange: 'Từ ngày 09-13 tháng 11 năm 2026',
    specialCompetencies: {
      healthCare: 'Biết tự kiểm tra trang phục, giày tập và giữ gìn vệ sinh khu vực tập luyện; tuân thủ các quy định an toàn khi cầm dụng cụ gậy.',
      basicMovement: 'Hoàn thiện kỹ năng vận động liên hoàn các động tác với gậy (vươn thở, tay, chân, bụng, vặn mình, toàn thân) đúng kỹ thuật và nhịp đếm.',
      sportsCompetency: 'Tự tin biểu diễn bài tập thể dục với gậy trước tập thể; biết nhận xét, đánh giá độ chính xác của bản thân và bạn bè.',
      disabledStudents: 'Khích lệ tinh thần học hòa nhập, cho học sinh thực hiện các động tác đơn giản theo thể lực.'
    },
    generalCompetencies: {
      autonomy: 'Tự giác rèn luyện, biết tự điều chỉnh các động tác chưa chuẩn xác.',
      collaboration: 'Phối hợp nhịp nhàng, gắn kết cùng các thành viên trong tổ khi đồng diễn.',
      problemSolving: 'Biết cách sửa lỗi sai về nhịp hô và biên độ tay cầm gậy cho bạn.',
      disabledStudents: 'Tạo mọi điều kiện để học sinh hòa nhập cùng lớp.'
    },
    qualities: {
      diligence: 'Chăm chỉ, tích cực tham gia các hoạt động tập luyện và trò chơi.',
      honesty: 'Trung thực trong tự đánh giá và thi đấu trò chơi.',
      responsibility: 'Có trách nhiệm với tập thể, bảo quản tốt dụng cụ học tập.',
      disabledStudents: 'Đoàn kết, gắn bó và yêu thích môn học.'
    },
    integrations: {
      digitalSkill: 'Mã 6.1TC2a',
      digitalDescription: 'Học sinh làm quen với việc quan sát phần mềm số hóa phân tích sự phối hợp đồng bộ giữa thân người và gậy tập.',
      lifeSkills: 'Rèn luyện tác phong người chỉ huy, tính quyết đoán và tinh thần tập thể.',
      environmentalEducation: 'Thu dọn, sắp xếp gậy thể dục ngăn nắp, vệ sinh sân tập sau khi hoàn thành buổi học.'
    },
    locationEquipment: {
      location: 'Sân tập hoặc nhà đa năng của trường.',
      teacherTools: 'Giáo án, còi, gậy thể dục mẫu, gậy tiếp sức hoặc dụng cụ trò chơi Trao gậy tiếp sức.',
      studentTools: 'Mỗi học sinh 1 gậy thể dục chuẩn, giày bata, trang phục thể thao đúng quy định.'
    },
    rows: [
      {
        content: "1. Hoạt động mở đầu\n1.1 Nhận lớp:\n- Cán sự tập hợp lớp, kiểm tra sĩ số, trang phục, gậy tập và báo cáo GV.\n- Phổ biến nội dung: Hoàn thiện liên hoàn các động tác bài thể dục với gậy; trò chơi Trao gậy tiếp sức.",
        lvd: "2 - 3'",
        gv: "- Tiếp nhận báo cáo, kiểm tra an toàn gậy tập của học sinh.\n- Nêu mục tiêu tiết học: Hoàn thiện thuần thục toàn bộ các động tác với gậy đã học, chuẩn bị cho bài kiểm tra định kỳ.",
        hs: "- Tập hợp 4 hàng ngang cự ly giãn cách rộng.\n- Chú ý lắng nghe hướng dẫn của GV.",
        hsImgUrl: standardFormationDiagrams[0].svgDataUrl,
        hsImgTitle: 'Đội hình nhận lớp'
      },
      {
        content: "1.2 Khởi động:\nXoay kỹ các khớp cổ tay, cổ chân, vai, cánh tay, hông, gối.\n1.3 Trò chơi bổ trợ khởi động:\n- Trò chơi “Ai kéo khoẻ hơn”.",
        lvd: "3 - 4'\n2x8n",
        gv: "- Hướng dẫn khởi động các khớp nhịp nhàng.\n- Tổ chức trò chơi khởi động tạo sự hứng khởi và nhanh nhẹn.",
        hs: "- Khởi động nghiêm túc theo nhịp đếm.\n- Tham gia trò chơi khởi động nhiệt tình.",
        hsImgUrl: standardFormationDiagrams[1].svgDataUrl,
        hsImgTitle: 'Đội hình khởi động vòng tròn'
      },
      {
        content: "2. Hoạt động hình thành kiến thức:\n2.1. Hoàn thiện liên hoàn các Động tác Thể dục với gậy:\n- Động tác vươn thở, động tác tay, động tác chân với gậy.\n- Động tác bụng, động tác vặn mình, động tác toàn thân với gậy.\n2.2. Ghép nối thành chuỗi bài tập liên hoàn nhịp nhàng, đẹp mắt.",
        lvd: "7 - 8'",
        gv: "- Cho HS quan sát bảng tổng hợp các động tác thể dục với gậy SGK Lớp 5.\n- GV làm mẫu liên hoàn từ đầu đến cuối bài thể dục với gậy.\n- Hô nhịp cho học sinh tập theo, nhắc học sinh chú ý tư thế thân người thẳng và độ căng của cánh tay khi đưa gậy lên cao.",
        hs: "- Quan sát kỹ động tác mẫu và hình dung chuỗi bài tập hoàn chỉnh.\n- Thực hiện liên hoàn các động tác theo nhịp hô của GV, giữ đúng cự ly và thăng bằng.",
        contentImgUrl: '/assets/sgk_chuan/k5_van_minh_toan_than_gay.jpg',
        contentImgTitle: 'Hình ảnh Kỹ thuật: Hoàn thiện các động tác với gậy (SGK GDTC Lớp 5)',
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập động tác mới'
      },
      {
        content: "3. Hoạt động luyện tập\n3.1. Tổ chức tập đồng loạt:\n- Toàn lớp tập hoàn thiện liên hoàn toàn bộ bài thể dục với gậy theo nhịp hô dứt khoát của GV (2-3 lần).",
        lvd: "5 - 6'\n2-3 lần",
        gv: "- Hô nhịp to, rõ ràng, dứt khoát; bao quát toàn bộ lớp bảo đảm an toàn gậy tập.\n- Chỉnh sửa lỗi động tác và nhắc nhở học sinh tập đều, đẹp.",
        hs: "- Cả lớp tập đồng loạt, động tác dứt khoát, đều và đẹp mắt.",
        hsImgUrl: standardFormationDiagrams[2].svgDataUrl,
        hsImgTitle: 'Đội hình tập đồng loạt'
      },
      {
        content: "3.2. Luyện tập theo tổ / nhóm & cặp đôi:\n- Chia tổ tập luyện dưới sự chỉ huy của các tổ trưởng.\n- Các bạn trong tổ luân phiên đếm nhịp và nhận xét lẫn nhau.",
        lvd: "6 - 7'\n2-3 lần",
        gv: "- Đi từng tổ đôn đốc, uốn nắn các tư thế chưa chuẩn xác.\n- Đánh giá khả năng tự quản của từng tổ trưởng.",
        hs: "- Tổ trưởng điều hành tổ tập trung, các bạn nghiêm túc lắng nghe và sửa sai.",
        hsImgUrl: standardFormationDiagrams[3].svgDataUrl,
        hsImgTitle: 'Đội hình tập theo tổ'
      },
      {
        content: "3.3. Thi đua biểu diễn & sửa sai:\n- Từng tổ lên biểu diễn hoàn thiện bài thể dục với gậy trước toàn lớp.\n- Lớp cùng GV đánh giá, nhận xét và xếp loại thi đua.",
        lvd: "4 - 5'",
        gv: "- Tổ chức thi đua sôi nổi, nhận xét đánh giá khách quan, tuyên dương tổ dẫn đầu.",
        hs: "- Từng tổ tự tin thực hiện phần thi, các tổ khác chăm chú quan sát và cổ vũ.",
        hsImgUrl: standardFormationDiagrams[4].svgDataUrl,
        hsImgTitle: 'Đội hình thi đua giữa các tổ'
      },
      {
        content: "3.4 Trò chơi vận động: \"Trao gậy tiếp sức\":\n- Rèn luyện kỹ năng chạy nhanh, trao nhận gậy chuẩn xác và tinh thần đồng đội.\n- Thi đấu theo hiệp và luật định.",
        lvd: "4 - 6'",
        gv: "- Hướng dẫn cách chơi, luật trao nhận gậy đúng quy định an toàn.\n- Cho học sinh chơi thử, sau đó tổ chức thi đua giữa các tổ.",
        hs: "- Nắm vững luật chơi, hào hứng tham gia và cổ vũ nhiệt tình.",
        hsImgUrl: standardFormationDiagrams[8].svgDataUrl,
        hsImgTitle: 'Sơ đồ trò chơi Trao gậy tiếp sức'
      },
      {
        content: "4. Hoạt động vận dụng & Hồi tĩnh\n4.1. Hồi tĩnh:\n- Thả lỏng toàn thân, thu dọn gậy gọn gàng, đi chậm quanh sân, hít thở sâu.\n4.2. Vận dụng:\n- Tự giác tập thể dục với gậy vào mỗi buổi sáng.\n4.3 Nhận xét, dặn dò bài tập về nhà và xuống lớp.",
        lvd: "4 - 5'\n2x8n",
        gv: "- Điều hành thả lỏng hồi tĩnh.\n- Đánh giá chung kết quả giờ học, tuyên dương tổ xuất sắc, phát lệnh xuống lớp.",
        hs: "- Thả lỏng nhẹ nhàng, xếp gậy gọn gàng đúng nơi quy định, đáp lễ khi xuống lớp.",
        hsImgUrl: standardFormationDiagrams[15].svgDataUrl,
        hsImgTitle: 'Đội hình hồi tĩnh'
      }
    ],
    postLessonAdjustment: 'Học sinh hoàn thành xuất sắc các động tác thể dục với gậy, đồng diễn đều và đẹp mắt.',
    signatures: {
      locationDate: 'Vệ Giang, ngày 13 tháng 11 năm 2026',
      bgh: 'Võ Thị Thuận',
      headTeacher: 'Bùi Ngọc Lâm',
      teacher: 'Lê Quốc Hưng'
    }
  }
};
