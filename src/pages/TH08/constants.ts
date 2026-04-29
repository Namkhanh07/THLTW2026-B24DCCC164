import type { KieuBuoiTap, KieuChiSoSucKhoe, KieuMucTieu, KieuBaiTapThuVien } from './types';

export const KHOA_LUU_TRU = {
  BUOI_TAP: 'TH08_BUOI_TAP',
  CHI_SO: 'TH08_CHI_SO',
  MUC_TIEU: 'TH08_MUC_TIEU',
  BAI_TAP: 'TH08_BAI_TAP',
};

export const DS_LOAI_BAI_TAP = [
  { label: 'Cardio', value: 'Cardio' },
  { label: 'Strength', value: 'Strength' },
  { label: 'Yoga', value: 'Yoga' },
  { label: 'HIIT', value: 'HIIT' },
  { label: 'Khác', value: 'Other' },
];

export const DS_TRANG_THAI_BUOI_TAP = [
  { label: 'Hoàn thành', value: 'HoanThanh' },
  { label: 'Bỏ lỡ', value: 'BoLo' },
];

export const DS_NHOM_CO = [
  { label: 'Chest', value: 'Chest' },
  { label: 'Back', value: 'Back' },
  { label: 'Legs', value: 'Legs' },
  { label: 'Shoulders', value: 'Shoulders' },
  { label: 'Arms', value: 'Arms' },
  { label: 'Core', value: 'Core' },
  { label: 'Full Body', value: 'FullBody' },
];

export const DS_MUC_DO_KHO = [
  { label: 'Dễ', value: 'De' },
  { label: 'Trung bình', value: 'TrungBinh' },
  { label: 'Khó', value: 'Kho' },
];

export const TEN_MUC_DO_KHO: Record<string, string> = {
  De: 'Dễ',
  TrungBinh: 'Trung bình',
  Kho: 'Khó',
};

export const MAU_MUC_DO_KHO: Record<string, string> = {
  De: 'green',
  TrungBinh: 'orange',
  Kho: 'red',
};

export const DS_LOAI_MUC_TIEU = [
  { label: 'Giảm cân', value: 'GiamCan' },
  { label: 'Tăng cơ', value: 'TangCo' },
  { label: 'Cải thiện sức bền', value: 'CaiThienSucBen' },
  { label: 'Khác', value: 'Khac' },
];

export const TEN_LOAI_MUC_TIEU: Record<string, string> = {
  GiamCan: 'Giảm cân',
  TangCo: 'Tăng cơ',
  CaiThienSucBen: 'Cải thiện sức bền',
  Khac: 'Khác',
};

export const DS_TRANG_THAI_MUC_TIEU = [
  { label: 'Tất cả', value: 'TatCa' },
  { label: 'Đang thực hiện', value: 'DangThucHien' },
  { label: 'Đã đạt', value: 'DaDat' },
  { label: 'Đã hủy', value: 'DaHuy' },
];

export const TEN_TRANG_THAI_MUC_TIEU: Record<string, string> = {
  DangThucHien: 'Đang thực hiện',
  DaDat: 'Đã đạt',
  DaHuy: 'Đã hủy',
};

export const MAU_TRANG_THAI_MUC_TIEU: Record<string, string> = {
  DangThucHien: 'processing',
  DaDat: 'success',
  DaHuy: 'default',
};

export const TEN_NHOM_CO: Record<string, string> = {
  Chest: 'Chest',
  Back: 'Back',
  Legs: 'Legs',
  Shoulders: 'Shoulders',
  Arms: 'Arms',
  Core: 'Core',
  FullBody: 'Full Body',
};

export const DU_LIEU_BUOI_TAP: KieuBuoiTap[] = [
  { id: 'BT_001', ngay: '2026-04-29', loaiBaiTap: 'Cardio', thoiLuong: 45, caloDot: 400, ghiChu: 'Chạy bộ ngoài trời', trangThai: 'HoanThanh' },
  { id: 'BT_002', ngay: '2026-04-28', loaiBaiTap: 'Strength', thoiLuong: 60, caloDot: 350, ghiChu: 'Tập ngực và tay', trangThai: 'HoanThanh' },
  { id: 'BT_003', ngay: '2026-04-27', loaiBaiTap: 'Yoga', thoiLuong: 30, caloDot: 150, ghiChu: 'Yoga buổi sáng', trangThai: 'HoanThanh' },
  { id: 'BT_004', ngay: '2026-04-26', loaiBaiTap: 'HIIT', thoiLuong: 25, caloDot: 320, ghiChu: 'HIIT toàn thân', trangThai: 'HoanThanh' },
  { id: 'BT_005', ngay: '2026-04-25', loaiBaiTap: 'Cardio', thoiLuong: 40, caloDot: 380, ghiChu: 'Đạp xe', trangThai: 'HoanThanh' },
  { id: 'BT_006', ngay: '2026-04-24', loaiBaiTap: 'Strength', thoiLuong: 55, caloDot: 300, ghiChu: 'Tập lưng và vai', trangThai: 'HoanThanh' },
  { id: 'BT_007', ngay: '2026-04-23', loaiBaiTap: 'Other', thoiLuong: 0, caloDot: 0, ghiChu: 'Nghỉ ngơi', trangThai: 'BoLo' },
  { id: 'BT_008', ngay: '2026-04-22', loaiBaiTap: 'HIIT', thoiLuong: 30, caloDot: 350, ghiChu: 'Tabata 4 phút x 6', trangThai: 'HoanThanh' },
  { id: 'BT_009', ngay: '2026-04-21', loaiBaiTap: 'Yoga', thoiLuong: 45, caloDot: 200, ghiChu: 'Power Yoga', trangThai: 'HoanThanh' },
  { id: 'BT_010', ngay: '2026-04-20', loaiBaiTap: 'Cardio', thoiLuong: 50, caloDot: 450, ghiChu: 'Bơi lội 1km', trangThai: 'HoanThanh' },
  { id: 'BT_011', ngay: '2026-04-15', loaiBaiTap: 'Strength', thoiLuong: 50, caloDot: 280, ghiChu: 'Tập chân', trangThai: 'HoanThanh' },
  { id: 'BT_012', ngay: '2026-04-10', loaiBaiTap: 'Cardio', thoiLuong: 35, caloDot: 300, ghiChu: 'Chạy bộ trên máy', trangThai: 'HoanThanh' },
  { id: 'BT_013', ngay: '2026-04-05', loaiBaiTap: 'HIIT', thoiLuong: 20, caloDot: 250, ghiChu: 'HIIT ngắn buổi sáng', trangThai: 'HoanThanh' },
  { id: 'BT_014', ngay: '2026-04-01', loaiBaiTap: 'Yoga', thoiLuong: 40, caloDot: 180, ghiChu: 'Yoga giãn cơ', trangThai: 'HoanThanh' },
];

export const DU_LIEU_CHI_SO: KieuChiSoSucKhoe[] = [
  { id: 'CS_001', ngay: '2026-04-29', canNang: 68, chieuCao: 172, bmi: 23.0, nhipTim: 72, gioNgu: 7.5 },
  { id: 'CS_002', ngay: '2026-04-22', canNang: 68.5, chieuCao: 172, bmi: 23.2, nhipTim: 70, gioNgu: 8 },
  { id: 'CS_003', ngay: '2026-04-15', canNang: 69, chieuCao: 172, bmi: 23.3, nhipTim: 74, gioNgu: 6.5 },
  { id: 'CS_004', ngay: '2026-04-08', canNang: 69.5, chieuCao: 172, bmi: 23.5, nhipTim: 75, gioNgu: 7 },
  { id: 'CS_005', ngay: '2026-04-01', canNang: 70, chieuCao: 172, bmi: 23.7, nhipTim: 76, gioNgu: 6 },
  { id: 'CS_006', ngay: '2026-03-25', canNang: 70.5, chieuCao: 172, bmi: 23.8, nhipTim: 78, gioNgu: 7 },
  { id: 'CS_007', ngay: '2026-03-18', canNang: 71, chieuCao: 172, bmi: 24.0, nhipTim: 77, gioNgu: 6.5 },
  { id: 'CS_008', ngay: '2026-03-11', canNang: 71.5, chieuCao: 172, bmi: 24.2, nhipTim: 80, gioNgu: 5.5 },
];

export const DU_LIEU_MUC_TIEU: KieuMucTieu[] = [
  { id: 'MT_001', tenMucTieu: 'Giảm 5kg trong 3 tháng', loai: 'GiamCan', giaTriMucTieu: 5, giaTriHienTai: 3.5, deadline: '2026-06-30', trangThai: 'DangThucHien' },
  { id: 'MT_002', tenMucTieu: 'Chạy 5km không nghỉ', loai: 'CaiThienSucBen', giaTriMucTieu: 5, giaTriHienTai: 3.2, deadline: '2026-05-31', trangThai: 'DangThucHien' },
  { id: 'MT_003', tenMucTieu: 'Tập gym 20 buổi/tháng', loai: 'TangCo', giaTriMucTieu: 20, giaTriHienTai: 14, deadline: '2026-04-30', trangThai: 'DangThucHien' },
  { id: 'MT_004', tenMucTieu: 'Hoàn thành 30 ngày Yoga', loai: 'Khac', giaTriMucTieu: 30, giaTriHienTai: 30, deadline: '2026-03-31', trangThai: 'DaDat' },
  { id: 'MT_005', tenMucTieu: 'Bench press 80kg', loai: 'TangCo', giaTriMucTieu: 80, giaTriHienTai: 60, deadline: '2026-07-31', trangThai: 'DangThucHien' },
];

export const DU_LIEU_BAI_TAP: KieuBaiTapThuVien[] = [
  {
    id: 'TV_001', tenBaiTap: 'Push-up', nhomCo: 'Chest', mucDoKho: 'De',
    moTaNgan: 'Bài tập cơ bản cho ngực, vai và tay sau',
    caloTrungBinhGio: 300,
    huongDan: '## Push-up (Hít đất)\n\n### Các bước thực hiện:\n1. **Tư thế chuẩn bị**: Nằm sấp, hai tay chống xuống sàn rộng bằng vai\n2. **Hạ người**: Từ từ hạ cơ thể xuống cho đến khi ngực gần chạm sàn\n3. **Đẩy lên**: Dùng lực cánh tay đẩy cơ thể lên vị trí ban đầu\n\n### Lưu ý:\n- Giữ lưng thẳng, không uốn cong\n- Hít vào khi hạ, thở ra khi đẩy lên\n- Thực hiện 3 hiệp x 15 lần',
  },
  {
    id: 'TV_002', tenBaiTap: 'Squat', nhomCo: 'Legs', mucDoKho: 'De',
    moTaNgan: 'Bài tập cơ bản cho đùi trước, mông và core',
    caloTrungBinhGio: 350,
    huongDan: '## Squat (Ngồi xổm)\n\n### Các bước thực hiện:\n1. **Đứng thẳng**: Hai chân rộng bằng vai, mũi chân hơi xoay ra ngoài\n2. **Hạ thấp**: Đẩy hông về phía sau, gập gối ngồi xuống\n3. **Đứng lên**: Đẩy gót chân để đứng lên vị trí ban đầu\n\n### Lưu ý:\n- Gối không vượt quá mũi chân\n- Giữ ngực thẳng, mắt nhìn phía trước\n- Thực hiện 4 hiệp x 12 lần',
  },
  {
    id: 'TV_003', tenBaiTap: 'Deadlift', nhomCo: 'Back', mucDoKho: 'Kho',
    moTaNgan: 'Bài tập nặng cho lưng dưới, mông, đùi sau',
    caloTrungBinhGio: 450,
    huongDan: '## Deadlift (Nâng tạ chết)\n\n### Các bước thực hiện:\n1. **Tư thế chuẩn bị**: Đứng trước thanh tạ, chân rộng bằng hông\n2. **Nắm thanh tạ**: Gập gối và hông, nắm thanh tạ rộng bằng vai\n3. **Kéo lên**: Giữ lưng thẳng, đẩy hông về phía trước để nâng tạ\n4. **Hạ xuống**: Từ từ hạ tạ theo đường đi ngược lại\n\n### Lưu ý:\n- KHÔNG BONG GÙ lưng khi thực hiện\n- Tập trung lực vào chân và hông\n- Bắt đầu với tạ nhẹ để làm quen form\n- Thực hiện 3 hiệp x 8 lần',
  },
  {
    id: 'TV_004', tenBaiTap: 'Plank', nhomCo: 'Core', mucDoKho: 'De',
    moTaNgan: 'Bài tập isometric cho cơ bụng và core',
    caloTrungBinhGio: 250,
    huongDan: '## Plank (Tấm ván)\n\n### Các bước thực hiện:\n1. **Tư thế chuẩn bị**: Nằm sấp, chống khuỷu tay xuống sàn\n2. **Nâng cơ thể**: Nâng cơ thể lên, giữ thẳng từ đầu đến gót chân\n3. **Giữ vị trí**: Siết cơ bụng, giữ tư thế càng lâu càng tốt\n\n### Lưu ý:\n- Không để hông xệ xuống hoặc nhô lên quá cao\n- Giữ hơi thở đều đặn\n- Bắt đầu 30 giây, tăng dần lên 1-2 phút',
  },
  {
    id: 'TV_005', tenBaiTap: 'Burpee', nhomCo: 'FullBody', mucDoKho: 'Kho',
    moTaNgan: 'Bài tập HIIT toàn thân, đốt calo cực mạnh',
    caloTrungBinhGio: 600,
    huongDan: '## Burpee\n\n### Các bước thực hiện:\n1. **Đứng thẳng**: Hai chân rộng bằng vai\n2. **Squat xuống**: Đặt hai tay xuống sàn\n3. **Nhảy chân ra sau**: Vào tư thế plank\n4. **Hít đất**: Thực hiện 1 push-up\n5. **Nhảy chân về**: Quay về tư thế squat\n6. **Nhảy lên**: Nhảy lên cao, hai tay giơ lên trời\n\n### Lưu ý:\n- Giữ nhịp độ đều, không quá nhanh khi mới bắt đầu\n- Có thể bỏ push-up nếu chưa đủ sức\n- Thực hiện 3 hiệp x 10 lần',
  },
  {
    id: 'TV_006', tenBaiTap: 'Bench Press', nhomCo: 'Chest', mucDoKho: 'TrungBinh',
    moTaNgan: 'Bài tập cơ bản nhất cho ngực với tạ đòn',
    caloTrungBinhGio: 400,
    huongDan: '## Bench Press (Đẩy ngực nằm)\n\n### Các bước thực hiện:\n1. **Nằm ngửa**: Nằm trên ghế tập, mắt ngay dưới thanh tạ\n2. **Nắm tạ**: Hai tay nắm thanh tạ rộng hơn vai\n3. **Hạ tạ**: Từ từ hạ tạ xuống giữa ngực\n4. **Đẩy lên**: Đẩy tạ lên theo đường thẳng\n\n### Lưu ý:\n- Luôn có người hỗ trợ khi tập nặng\n- Giữ lưng dưới hơi cong tự nhiên\n- Không khóa khuỷu tay ở đỉnh\n- Thực hiện 4 hiệp x 10 lần',
  },
  {
    id: 'TV_007', tenBaiTap: 'Pull-up', nhomCo: 'Back', mucDoKho: 'TrungBinh',
    moTaNgan: 'Bài tập kéo xà cho lưng và tay trước',
    caloTrungBinhGio: 350,
    huongDan: '## Pull-up (Kéo xà)\n\n### Các bước thực hiện:\n1. **Nắm xà**: Hai tay nắm xà rộng hơn vai, lòng bàn tay hướng ra ngoài\n2. **Kéo lên**: Kéo cơ thể lên cho đến khi cằm vượt qua xà\n3. **Hạ xuống**: Từ từ hạ cơ thể xuống vị trí ban đầu\n\n### Lưu ý:\n- Không đu đưa cơ thể, giữ thân ổn định\n- Tập trung lực kéo vào cơ lưng\n- Nếu chưa làm được, bắt đầu với band hỗ trợ\n- Thực hiện 3 hiệp x tối đa',
  },
  {
    id: 'TV_008', tenBaiTap: 'Lunges', nhomCo: 'Legs', mucDoKho: 'TrungBinh',
    moTaNgan: 'Bài tập bước khuỵu cho đùi và mông',
    caloTrungBinhGio: 300,
    huongDan: '## Lunges (Bước khuỵu)\n\n### Các bước thực hiện:\n1. **Đứng thẳng**: Hai chân khép, tay để dọc thân\n2. **Bước dài**: Bước 1 chân về phía trước, khoảng 1 bước dài\n3. **Hạ gối**: Gập gối trước 90 độ, gối sau gần chạm sàn\n4. **Đứng lên**: Đẩy gót chân trước để quay về vị trí ban đầu\n5. **Đổi chân**: Lặp lại với chân còn lại\n\n### Lưu ý:\n- Gối trước không vượt quá mũi chân\n- Giữ thân trên thẳng\n- Thực hiện 3 hiệp x 12 lần mỗi chân',
  },
  {
    id: 'TV_009', tenBaiTap: 'Shoulder Press', nhomCo: 'Shoulders', mucDoKho: 'TrungBinh',
    moTaNgan: 'Bài tập đẩy vai với tạ đơn hoặc tạ đòn',
    caloTrungBinhGio: 320,
    huongDan: '## Shoulder Press (Đẩy vai)\n\n### Các bước thực hiện:\n1. **Ngồi hoặc đứng**: Giữ tạ ở ngang vai, lòng bàn tay hướng ra ngoài\n2. **Đẩy lên**: Đẩy tạ lên trên đầu cho đến khi tay gần duỗi thẳng\n3. **Hạ xuống**: Từ từ hạ tạ về vị trí ngang vai\n\n### Lưu ý:\n- Không khóa khuỷu tay ở trên\n- Siết cơ core để ổn định thân\n- Thực hiện 3 hiệp x 10 lần',
  },
  {
    id: 'TV_010', tenBaiTap: 'Bicep Curl', nhomCo: 'Arms', mucDoKho: 'De',
    moTaNgan: 'Bài tập cơ bản cho cơ bắp tay trước',
    caloTrungBinhGio: 200,
    huongDan: '## Bicep Curl (Cuốn tạ tay trước)\n\n### Các bước thực hiện:\n1. **Đứng thẳng**: Cầm tạ đơn ở hai bên, lòng bàn tay hướng ra ngoài\n2. **Cuốn lên**: Gập khuỷu tay, đưa tạ lên vai\n3. **Hạ xuống**: Từ từ hạ tạ về vị trí ban đầu\n\n### Lưu ý:\n- Giữ khuỷu tay sát thân, không đung đưa\n- Kiểm soát cả lên và xuống\n- Thực hiện 3 hiệp x 12 lần',
  },
  {
    id: 'TV_011', tenBaiTap: 'Mountain Climber', nhomCo: 'FullBody', mucDoKho: 'TrungBinh',
    moTaNgan: 'Bài tập cardio kết hợp core, toàn thân',
    caloTrungBinhGio: 500,
    huongDan: '## Mountain Climber (Leo núi)\n\n### Các bước thực hiện:\n1. **Tư thế plank**: Chống hai tay thẳng, cơ thể thẳng tắp\n2. **Kéo gối**: Kéo gối phải về phía ngực\n3. **Đổi chân**: Nhanh chóng đổi, kéo gối trái về ngực\n4. **Lặp lại**: Thực hiện liên tục, đều đặn\n\n### Lưu ý:\n- Giữ hông thấp, không nhô mông lên\n- Nhịp thở đều đặn\n- Thực hiện 3 hiệp x 30 giây',
  },
  {
    id: 'TV_012', tenBaiTap: 'Yoga Sun Salutation', nhomCo: 'FullBody', mucDoKho: 'De',
    moTaNgan: 'Chuỗi động tác Chào Mặt Trời, tốt cho dẻo dai',
    caloTrungBinhGio: 200,
    huongDan: '## Sun Salutation (Chào Mặt Trời)\n\n### Chuỗi 12 động tác:\n1. Pranamasana (Tư thế cầu nguyện)\n2. Hasta Uttanasana (Giơ tay lên)\n3. Padahastasana (Cúi gập)\n4. Ashwa Sanchalanasana (Bước dài)\n5. Phalakasana (Plank)\n6. Ashtanga Namaskar (8 điểm chạm)\n7. Bhujangasana (Rắn hổ mang)\n8. Adho Mukha Svanasana (Chó úp mặt)\n9-12. Lặp lại ngược\n\n### Lưu ý:\n- Hít thở đều theo từng động tác\n- Thực hiện chậm rãi, cảm nhận cơ thể\n- Thực hiện 5-10 vòng mỗi buổi',
  },
];
