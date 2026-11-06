export interface SgkLessonMovement {
  name: string;
  page: number;
  desc: string;
}

export interface SgkLessonFolder {
  id: string;
  grade: 1 | 3 | 5;
  topic: string;
  lessonName: string;
  weekRange?: string;
  startPage: number;
  endPage: number;
  movements: string[];
  subMovements: SgkLessonMovement[];
  defaultPageImages?: Record<number, string>;
}

export const sgkCurriculumTree: SgkLessonFolder[] = [
  // ==================== KHỐI 1 ====================
  // CHỦ ĐỀ 1: ĐỘI HÌNH ĐỘI NGŨ
  {
    id: 'k1_cd1_b1',
    grade: 1,
    topic: 'CHỦ ĐỀ 1: ĐỘI HÌNH ĐỘI NGŨ',
    lessonName: 'Bài 1: Tư thế đứng nghiêm, đứng nghỉ, tập hợp hàng dọc, dóng hàng, điểm số',
    weekRange: 'Tuần 1 - 2',
    startPage: 12,
    endPage: 15,
    movements: ['Tư thế đứng nghiêm, đứng nghỉ', 'Tập hợp hàng dọc, dóng hàng', 'Điểm số hàng dọc'],
    subMovements: [
      { name: 'Tư thế đứng nghiêm, đứng nghỉ', page: 12, desc: 'Đứng thẳng, gót chân sát nhau, hai bàn chân mở chữ V; đứng nghỉ chùng 1 gối.' },
      { name: 'Tập hợp hàng dọc và dóng hàng', page: 13, desc: 'Khẩu lệnh "Tập hợp hàng dọc", tay phải giơ thẳng trước mặt; học sinh dóng hàng thẳng.' },
      { name: 'Điểm số hàng dọc', page: 14, desc: 'Học sinh đánh mặt sang trái hô to số của mình rồi quay mặt về trước.' }
    ]
  },
  {
    id: 'k1_cd1_b2',
    grade: 1,
    topic: 'CHỦ ĐỀ 1: ĐỘI HÌNH ĐỘI NGŨ',
    lessonName: 'Bài 2: Tập hợp hàng ngang, dóng hàng, điểm số',
    weekRange: 'Tuần 3 - 4',
    startPage: 16,
    endPage: 19,
    movements: ['Tập hợp hàng ngang', 'Dóng hàng ngang', 'Điểm số hàng ngang'],
    subMovements: [
      { name: 'Tập hợp hàng ngang', page: 16, desc: 'GV đưa tay trái sang ngang; HS nhanh chóng đứng vào hàng cự ly chuẩn.' },
      { name: 'Dóng hàng ngang', page: 17, desc: 'HS chống tay phải lên hông, liếc mắt nhìn sang phải dóng hàng.' }
    ]
  },
  {
    id: 'k1_cd1_b3',
    grade: 1,
    topic: 'CHỦ ĐỀ 1: ĐỘI HÌNH ĐỘI NGŨ',
    lessonName: 'Bài 3: Dàn hàng, dồn hàng',
    weekRange: 'Tuần 5 - 6',
    startPage: 20,
    endPage: 22,
    movements: ['Dàn hàng ngang 1 sải tay', 'Dồn hàng ngang'],
    subMovements: [
      { name: 'Dàn hàng ngang 1 sải tay', page: 20, desc: 'Học sinh dang hai tay sang ngang không chạm nhau để tạo cự ly tập thể dục.' }
    ]
  },

  // CHỦ ĐỀ 2: BÀI THỂ DỤC
  {
    id: 'k1_chude2_bai1',
    grade: 1,
    topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
    lessonName: 'Bài 1: Động tác vươn thở và động tác tay (Tuần 8)',
    weekRange: 'Tuần 7 - 8',
    startPage: 23,
    endPage: 28,
    movements: ['Động tác Vươn thở', 'Động tác Tay'],
    subMovements: [
      { name: 'Trò chơi Làm theo hiệu lệnh', page: 24, desc: 'Trò chơi bổ trợ khởi động phản xạ nhanh theo khẩu lệnh GV.' },
      { name: 'Động tác Vươn thở', page: 25, desc: 'Chân trái bước sang ngang, hai tay đưa lên cao hình chữ V, ngửa đầu hít sâu (Trang 25 SGK)' },
      { name: 'Động tác Tay', page: 26, desc: 'Chân trái bước sang ngang, hai tay dang ngang bằng vai, bàn tay ngửa (Trang 26 SGK)' },
      { name: 'Trò chơi Thỏ nhường hang', page: 28, desc: 'Trò chơi vận động rèn luyện phản xạ chạy nhanh và phối hợp.' }
    ],
    defaultPageImages: {
      24: '/assets/extracted_sgk/tuan8_img_0.jpg',
      25: '/assets/extracted_sgk/tuan8_img_0.jpg',
      26: '/assets/sgk_chuan/k1_tay.jpg',
      28: '/assets/extracted_sgk/tuan8_img_2.jpg'
    }
  },
  {
    id: 'k1_chude2_bai2',
    grade: 1,
    topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
    lessonName: 'Bài 2: Động tác chân, động tác vặn mình, động tác bụng (Tuần 9 - 10)',
    weekRange: 'Tuần 9 - 10',
    startPage: 29,
    endPage: 35,
    movements: ['Động tác Chân', 'Động tác Vặn mình', 'Động tác Bụng'],
    subMovements: [
      { name: 'Trò chơi Kết bạn', page: 29, desc: 'Trò chơi khởi động phản xạ kết nhóm vui tươi theo số lượng hô.' },
      { name: 'Động tác Chân', page: 30, desc: 'Hai tay chống hông, kiễng gót hai chân rồi khuỵu gối sâu (Trang 30 SGK)' },
      { name: 'Động tác Vặn mình', page: 32, desc: 'Hai chân đứng rộng bằng vai, vặn mình sang trái 90 độ, hai tay dang ngang (Trang 32 SGK)' },
      { name: 'Động tác Bụng', page: 33, desc: 'Cúi gập thân, hai tay chạm hai mu bàn chân, gối thẳng (Trang 33 SGK)' },
      { name: 'Trò chơi Lò cò tiếp sức', page: 35, desc: 'Trò chơi vận động thi đua nhảy lò cò cự ly 8m tiếp sức.' }
    ],
    defaultPageImages: {
      29: '/assets/extracted_sgk/tuan8_img_2.jpg',
      30: '/assets/extracted_sgk/tuan8_img_4.jpg',
      32: '/assets/extracted_sgk/tuan8_img_6.jpg',
      33: '/assets/extracted_sgk/tuan8_img_8.jpg'
    }
  },
  {
    id: 'k1_chude2_bai3',
    grade: 1,
    topic: 'CHỦ ĐỀ 2: BÀI THỂ DỤC',
    lessonName: 'Bài 3: Động tác phối hợp và động tác điều hòa',
    weekRange: 'Tuần 11 - 12',
    startPage: 36,
    endPage: 40,
    movements: ['Động tác Phối hợp', 'Động tác Điều hòa'],
    subMovements: [
      { name: 'Động tác Phối hợp', page: 37, desc: 'Bước chân chếch trước, phối hợp tay - hông - chân nhịp nhàng.' },
      { name: 'Động tác Điều hòa', page: 38, desc: 'Lắc cổ tay, rung đùi thả lỏng sâu toàn thân.' }
    ]
  },

  // CHỦ ĐỀ 3: TƯ THẾ VÀ KỸ NĂNG VẬN ĐỘNG CƠ BẢN
  {
    id: 'k1_cd3_b1',
    grade: 1,
    topic: 'CHỦ ĐỀ 3: TƯ THẾ VÀ KỸ NĂNG VẬN ĐỘNG CƠ BẢN',
    lessonName: 'Bài 1: Tư thế vận động cơ bản của đầu, cổ và tay',
    weekRange: 'Tuần 13 - 16',
    startPage: 42,
    endPage: 48,
    movements: ['Tư thế gập - ngửa đầu, cổ', 'Hai tay đưa ra trước, lên cao', 'Hai tay dang ngang'],
    subMovements: [
      { name: 'Tư thế vận động của đầu, cổ', page: 43, desc: 'Nghiêng đầu sang trái, phải, gập cúi ngửa chậm rãi an toàn.' }
    ]
  },

  // ==================== KHỐI 3 ====================
  // CHỦ ĐỀ 1: ĐỘI HÌNH ĐỘI NGŨ
  {
    id: 'k3_cd1_b1',
    grade: 3,
    topic: 'CHỦ ĐỀ 1: ĐỘI HÌNH ĐỘI NGŨ',
    lessonName: 'Bài 1: Biến đổi đội hình hàng dọc, hàng ngang',
    weekRange: 'Tuần 1 - 3',
    startPage: 10,
    endPage: 14,
    movements: ['Biến đổi từ 1 hàng dọc thành 2 hàng dọc', 'Biến đổi từ 1 hàng ngang thành 2 hàng ngang'],
    subMovements: [
      { name: 'Biến đổi đội hình hàng dọc', page: 11, desc: 'Số chẵn bước lùi chếch sang phải tạo thành 2 hàng dọc gọn gàng.' }
    ]
  },
  {
    id: 'k3_cd1_b2',
    grade: 3,
    topic: 'CHỦ ĐỀ 1: ĐỘI HÌNH ĐỘI NGŨ',
    lessonName: 'Bài 2: Động tác Đi đều, Đứng lại',
    weekRange: 'Tuần 4 - 6',
    startPage: 15,
    endPage: 19,
    movements: ['Động tác Đi đều', 'Động tác Đứng lại', 'Đổi chân khi đi đều sai nhịp'],
    subMovements: [
      { name: 'Động tác Đi đều', page: 16, desc: 'Nhịp 1 bước chân trái đánh tay phải ra trước; nhịp 2 bước chân phải (Trang 16 SGK)' },
      { name: 'Động tác Đứng lại', page: 18, desc: 'Dự lệnh "Đứng lại", động lệnh "Đứng" rơi vào chân phải.' }
    ],
    defaultPageImages: {
      16: '/assets/sgk_chuan/k3_di_deu_dung_lai.jpg',
      18: '/assets/sgk_chuan/k3_di_deu_dung_lai.jpg'
    }
  },

  // CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC
  {
    id: 'k3_chude2_bai1',
    grade: 3,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC',
    lessonName: 'Bài 1: Động tác vươn thở, động tác tay, động tác chân (Tuần 9 - 10)',
    weekRange: 'Tuần 9 - 10',
    startPage: 23,
    endPage: 29,
    movements: ['Động tác Vươn thở', 'Động tác Tay', 'Động tác Chân'],
    subMovements: [
      { name: 'Trò chơi Chui qua hầm', page: 23, desc: 'Trò chơi khởi động khéo léo chui qua hai chân của các bạn trong hàng.' },
      { name: 'Động tác Vươn thở', page: 24, desc: 'Bước chân trái, hai tay vươn cao mắt nhìn theo tay hít sâu (Trang 24 SGK)' },
      { name: 'Động tác Tay', page: 26, desc: 'Hai tay dang ngang lòng bàn tay ngửa, gập khuỷu tay ngón tay chạm vai (Trang 26 SGK)' },
      { name: 'Động tác Chân', page: 27, desc: 'Hai tay chống hông, nâng cao đùi trái vuông góc (Trang 27 SGK)' },
      { name: 'Trò chơi Đua ô tô / Chạy nhanh tiếp sức', page: 29, desc: 'Trò chơi vận động chạy vòng qua cọc tiêu tiếp sức.' }
    ],
    defaultPageImages: {
      23: '/assets/sgk_chuan/k3_di_deu_dung_lai.jpg',
      24: '/assets/extracted_sgk/tuan9_img_1.jpg',
      26: '/assets/extracted_sgk/tuan9_img_4.jpg',
      27: '/assets/extracted_sgk/tuan9_img_6.jpg',
      29: '/assets/extracted_sgk/tuan9_img_8.jpg'
    }
  },
  {
    id: 'k3_chude2_bai2',
    grade: 3,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC',
    lessonName: 'Bài 2: Động tác lườn, động tác bụng, động tác phối hợp',
    weekRange: 'Tuần 11 - 12',
    startPage: 30,
    endPage: 36,
    movements: ['Động tác Lườn', 'Động tác Bụng', 'Động tác Phối hợp'],
    subMovements: [
      { name: 'Động tác Lườn', page: 31, desc: 'Nghiêng lườn sang trái, tay phải vươn cao ép sát tai.' },
      { name: 'Động tác Bụng', page: 33, desc: 'Cúi gập thân, vỗ hai tay trước hai mu bàn chân.' }
    ]
  },

  // CHỦ ĐỀ 3: TƯ THẾ VÀ KỸ NĂNG VẬN ĐỘNG CƠ BẢN
  {
    id: 'k3_cd3_b1',
    grade: 3,
    topic: 'CHỦ ĐỀ 3: TƯ THẾ VÀ KỸ NĂNG VẬN ĐỘNG CƠ BẢN',
    lessonName: 'Bài 1: Đi vượt chướng ngại vật và đi chuyển hướng',
    weekRange: 'Tuần 13 - 16',
    startPage: 38,
    endPage: 45,
    movements: ['Đi vượt chướng ngại vật thấp', 'Đi chuyển hướng phải - trái'],
    subMovements: [
      { name: 'Đi vượt chướng ngại vật', page: 40, desc: 'Bước chân dứt khoát vượt qua hộp gỗ/vạch xốp không chạm chướng ngại vật.' }
    ]
  },

  // ==================== KHỐI 5 ====================
  // CHỦ ĐỀ 1: ĐỘI HÌNH ĐỘI NGŨ
  {
    id: 'k5_cd1_b1',
    grade: 5,
    topic: 'CHỦ ĐỀ 1: ĐỘI HÌNH ĐỘI NGŨ',
    lessonName: 'Bài 1: Ôn tập đội hình đội ngũ, biến đổi đội hình',
    weekRange: 'Tuần 1 - 4',
    startPage: 12,
    endPage: 18,
    movements: ['Tập hợp hàng dọc, hàng ngang', 'Biến đổi đội hình từ 1 hàng thành 2, 3 hàng', 'Đi đều vòng các hướng'],
    subMovements: [
      { name: 'Biến đổi đội hình 1-2-3 hàng dọc', page: 14, desc: 'Điểm số 1-2-3, khi có lệnh các số di chuyển tạo thành 3 hàng chuẩn.' },
      { name: 'Đi đều vòng các hướng', page: 16, desc: 'Vòng bên phải, vòng bên trái nhịp nhàng theo nhịp còi.' }
    ]
  },

  // CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY
  {
    id: 'k5_chude2_bai1',
    grade: 5,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY',
    lessonName: 'Bài 1: Động tác Vươn thở và Động tác Tay với gậy (Tuần 8 - 9)',
    weekRange: 'Tuần 8 - 9',
    startPage: 25,
    endPage: 28,
    movements: ['Động tác Vươn thở với gậy', 'Động tác Tay với gậy', 'Động tác Chân với gậy'],
    subMovements: [
      { name: 'Động tác Vươn thở với gậy', page: 25, desc: 'Chân trái bước sang ngang, hai tay cầm hai đầu gậy đưa lên cao chữ V (Trang 25 SGK)' },
      { name: 'Động tác Tay với gậy', page: 26, desc: 'Hai tay cầm hai đầu gậy nâng ngang ngực, gập khuỷu tay ép sát (Trang 26 SGK)' },
      { name: 'Động tác Chân với gậy', page: 27, desc: 'Kiễng gót hai chân, gậy nâng chếch cao rồi khuỵu gối sâu (Trang 27 SGK)' }
    ],
    defaultPageImages: {
      25: '/assets/extracted_sgk/tuan8_img_0.jpg',
      26: '/assets/sgk_chuan/k5_chuyen_gay_tiep_suc.jpg',
      27: '/assets/sgk_chuan/k5_chuyen_gay_tiep_suc.jpg'
    }
  },
  {
    id: 'k5_chude2_bai2',
    grade: 5,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY',
    lessonName: 'Bài 2: Động tác Bụng, Vặn mình, Toàn thân với gậy (Tuần 10)',
    weekRange: 'Tuần 10',
    startPage: 29,
    endPage: 33,
    movements: ['Động tác Bụng với gậy', 'Động tác Vặn mình với gậy', 'Động tác Toàn thân với gậy'],
    subMovements: [
      { name: 'Trò chơi Đội nào nhanh nhất', page: 29, desc: 'Trò chơi bổ trợ khởi động chuẩn SGK GDTC 5 Trang 29' },
      { name: 'Động tác Bụng với gậy (Gập thân...)', page: 30, desc: 'Hai tay cầm hai đầu gậy đưa lên cao, cúi gập thân đưa gậy chạm sát mu bàn chân (Trang 30 SGK)' },
      { name: 'Động tác Vặn mình với gậy', page: 31, desc: 'Gậy đặt ngang vai sau gáy, hai bàn chân bám sàn, vặn thân trên 90 độ (Trang 31 SGK)' },
      { name: 'Động tác Toàn thân với gậy', page: 31, desc: 'Bước chân trái chếch trước khuỵu gối, gậy nâng chếch cao (Trang 31 SGK)' },
      { name: 'Trò chơi Chuyền bóng tiếp sức / Chuyền gậy tiếp sức', page: 32, desc: 'Trò chơi vận động tiếp sức đồng đội chuẩn SGK GDTC 5 Trang 32' }
    ],
    defaultPageImages: {
      29: '/assets/sgk_chuan/k5_tro_choi_doi_nao_nhanh_nhat.jpg',
      30: '/assets/sgk_chuan/k5_van_minh_toan_than_gay.jpg',
      31: '/assets/sgk_chuan/k5_van_minh_toan_than_gay.jpg',
      32: '/assets/sgk_chuan/k5_chuyen_gay_tiep_suc.jpg',
      33: '/assets/sgk_chuan/k5_chuyen_gay_tiep_suc.jpg'
    }
  },
  {
    id: 'k5_chude2_bai3',
    grade: 5,
    topic: 'CHỦ ĐỀ 2: BÀI TẬP THỂ DỤC VỚI GẬY',
    lessonName: 'Bài 3: Động tác Nhảy và Động tác Điều hòa với gậy (Tuần 11)',
    weekRange: 'Tuần 11',
    startPage: 34,
    endPage: 38,
    movements: ['Động tác Nhảy với gậy', 'Động tác Điều hòa với gậy'],
    subMovements: [
      { name: 'Động tác Nhảy với gậy', page: 34, desc: 'Bật nhảy tách hai chân sang ngang, hai tay nâng gậy ngang ngực (Trang 34 SGK)' },
      { name: 'Động tác Điều hòa với gậy', page: 35, desc: 'Bước chân trái sang ngang, gậy đưa từ từ lên cao hít sâu, hạ xuống thở ra (Trang 35 SGK)' }
    ],
    defaultPageImages: {
      34: '/assets/sgk_chuan/k5_van_minh_toan_than_gay.jpg',
      35: '/assets/sgk_chuan/k5_van_minh_toan_than_gay.jpg'
    }
  },

  // CHỦ ĐỀ 3: TƯ THẾ VÀ KỸ NĂNG VẬN ĐỘNG CƠ BẢN
  {
    id: 'k5_cd3_b1',
    grade: 5,
    topic: 'CHỦ ĐỀ 3: TƯ THẾ VÀ KỸ NĂNG VẬN ĐỘNG CƠ BẢN',
    lessonName: 'Bài 1: Kỹ thuật chạy tiếp sức và phối hợp đồng đội',
    weekRange: 'Tuần 12 - 15',
    startPage: 40,
    endPage: 48,
    movements: ['Kỹ thuật cầm gậy tiếp sức', 'Kỹ thuật trao và nhận gậy', 'Chạy tiếp sức cự ly ngắn'],
    subMovements: [
      { name: 'Trao và nhận gậy tiếp sức', page: 42, desc: 'Cách cầm 1/3 thân gậy dưới, người nhận giơ tay sau đón gậy chuẩn xác.' }
    ]
  },

  // CHỦ ĐỀ 4: THỂ THAO TỰ CHỌN
  {
    id: 'k5_cd4_b1',
    grade: 5,
    topic: 'CHỦ ĐỀ 4: THỂ THAO TỰ CHỌN',
    lessonName: 'Bài 1: Kỹ thuật Bóng rổ cơ bản (Dẫn bóng và Ném rổ)',
    weekRange: 'Tuần 16 - 20',
    startPage: 50,
    endPage: 60,
    movements: ['Tư thế đứng chuẩn bị bóng rổ', 'Dẫn bóng tại chỗ và di chuyển', 'Ném rổ bằng một tay trên vai'],
    subMovements: [
      { name: 'Dẫn bóng tại chỗ', page: 52, desc: 'Xòe các ngón tay ấn bóng nảy đều ngang thắt lưng.' }
    ]
  }
];
