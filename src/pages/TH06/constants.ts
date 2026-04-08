import type { KieuDiemDen, KieuLichTrinh } from './types';

export const KHOA_LUU_TRU = {
  DIEM_DEN: 'TH06_DIEM_DEN',
  LICH_TRINH: 'TH06_LICH_TRINH',
};

export const DS_LOAI_HINH = [
  { label: 'Biển', value: 'bien' },
  { label: 'Núi', value: 'nui' },
  { label: 'Thành phố', value: 'thanhPho' },
];

export const TEN_LOAI_HINH: Record<string, string> = {
  bien: 'Biển',
  nui: 'Núi',
  thanhPho: 'Thành phố',
};

export const MAU_HANG_MUC: Record<string, string> = {
  anUong: '#faad14',
  luuTru: '#1890ff',
  diChuyen: '#52c41a',
};

export const TEN_HANG_MUC: Record<string, string> = {
  anUong: 'Ăn uống',
  luuTru: 'Lưu trú',
  diChuyen: 'Di chuyển',
};

export const DU_LIEU_DIEM_DEN_MAC_DINH: KieuDiemDen[] = [
  {
    id: 'DD_001',
    ten: 'Vịnh Hạ Long',
    hinhAnh: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop',
    loaiHinh: 'bien',
    moTa: 'Di sản thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi',
    thoiGianThamQuan: 2,
    danhGia: 4.8,
    chiPhiAnUong: 500000,
    chiPhiLuuTru: 800000,
    chiPhiDiChuyen: 300000,
  },
  {
    id: 'DD_002',
    ten: 'Sapa',
    hinhAnh: 'https://media.vietravel.com/images/Content/dia-diem-du-lich-sapa-2.png',
    loaiHinh: 'nui',
    moTa: 'Thị trấn trên mây với ruộng bậc thang tuyệt đẹp',
    thoiGianThamQuan: 3,
    danhGia: 4.6,
    chiPhiAnUong: 400000,
    chiPhiLuuTru: 600000,
    chiPhiDiChuyen: 500000,
  },
  {
    id: 'DD_003',
    ten: 'Hội An',
    hinhAnh: 'https://vcdn1-dulich.vnecdn.net/2022/06/01/Hoi-An-VnExpress-5851-16488048-4863-2250-1654057244.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=k1SeSD7zn2e69TSWKfpoag',
    loaiHinh: 'thanhPho',
    moTa: 'Phố cổ lung linh đèn lồng, di sản văn hóa thế giới',
    thoiGianThamQuan: 2,
    danhGia: 4.7,
    chiPhiAnUong: 350000,
    chiPhiLuuTru: 500000,
    chiPhiDiChuyen: 200000,
  },
  {
    id: 'DD_004',
    ten: 'Phú Quốc',
    hinhAnh: 'https://go2joy.s3.ap-southeast-1.amazonaws.com/blog/wp-content/uploads/2022/07/14151347/gioi-thieu-canh-dep-phu-quoc-768x511.jpg',
    loaiHinh: 'bien',
    moTa: 'Đảo ngọc với biển xanh cát trắng, thiên đường nghỉ dưỡng',
    thoiGianThamQuan: 3,
    danhGia: 4.5,
    chiPhiAnUong: 600000,
    chiPhiLuuTru: 1000000,
    chiPhiDiChuyen: 400000,
  },
  {
    id: 'DD_005',
    ten: 'Đà Lạt',
    hinhAnh: 'https://samtenhills.vn/wp-content/uploads/2024/01/toan-canh-quang-truong-lam-vien-voi-2-cong-trinh-bieu-tuong.jpg',
    loaiHinh: 'nui',
    moTa: 'Thành phố ngàn hoa, khí hậu mát mẻ quanh năm',
    thoiGianThamQuan: 2,
    danhGia: 4.4,
    chiPhiAnUong: 300000,
    chiPhiLuuTru: 450000,
    chiPhiDiChuyen: 350000,
  },
  {
    id: 'DD_006',
    ten: 'TP. Hồ Chí Minh',
    hinhAnh: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop',
    loaiHinh: 'thanhPho',
    moTa: 'Thành phố sôi động nhất Việt Nam, trung tâm kinh tế lớn',
    thoiGianThamQuan: 2,
    danhGia: 4.3,
    chiPhiAnUong: 400000,
    chiPhiLuuTru: 700000,
    chiPhiDiChuyen: 250000,
  },
  {
    id: 'DD_007',
    ten: 'Nha Trang',
    hinhAnh: 'https://cdn2.tuoitre.vn/471584752817336320/2023/4/18/tp-nha-trang-16818161974101240202452.jpeg',
    loaiHinh: 'bien',
    moTa: 'Thành phố biển nổi tiếng với bãi biển dài và đẹp',
    thoiGianThamQuan: 2,
    danhGia: 4.2,
    chiPhiAnUong: 450000,
    chiPhiLuuTru: 650000,
    chiPhiDiChuyen: 300000,
  },
  {
    id: 'DD_008',
    ten: 'Hà Giang',
    hinhAnh: 'https://file3.qdnd.vn/data/images/0/2022/09/25/vuhuyen/dong-van.jpg?dpi=150&quality=100&w=870',
    loaiHinh: 'nui',
    moTa: 'Cao nguyên đá hùng vĩ, cung đường phượt đẹp nhất Việt Nam',
    thoiGianThamQuan: 4,
    danhGia: 4.9,
    chiPhiAnUong: 300000,
    chiPhiLuuTru: 350000,
    chiPhiDiChuyen: 600000,
  },
];

export const DU_LIEU_LICH_TRINH_MAC_DINH: KieuLichTrinh[] = [
  {
    id: 'LT_001',
    tenLichTrinh: 'Du lịch biển miền Trung',
    ngayBatDau: '2025-06-01',
    ngayKetThuc: '2025-06-04',
    nganSachDuKien: 5000000,
    ngayTao: '2025-05-15',
    danhSachNgay: [
      { ngay: '2025-06-01', danhSachDiemDenId: ['DD_003'] },
      { ngay: '2025-06-02', danhSachDiemDenId: ['DD_007'] },
      { ngay: '2025-06-03', danhSachDiemDenId: ['DD_007'] },
      { ngay: '2025-06-04', danhSachDiemDenId: ['DD_003'] },
    ],
  },
  {
    id: 'LT_002',
    tenLichTrinh: 'Khám phá Tây Bắc',
    ngayBatDau: '2025-07-10',
    ngayKetThuc: '2025-07-14',
    nganSachDuKien: 8000000,
    ngayTao: '2025-06-20',
    danhSachNgay: [
      { ngay: '2025-07-10', danhSachDiemDenId: ['DD_002'] },
      { ngay: '2025-07-11', danhSachDiemDenId: ['DD_002', 'DD_008'] },
      { ngay: '2025-07-12', danhSachDiemDenId: ['DD_008'] },
      { ngay: '2025-07-13', danhSachDiemDenId: ['DD_008'] },
      { ngay: '2025-07-14', danhSachDiemDenId: ['DD_002'] },
    ],
  },
  {
    id: 'LT_003',
    tenLichTrinh: 'Nghỉ dưỡng Phú Quốc',
    ngayBatDau: '2025-03-01',
    ngayKetThuc: '2025-03-03',
    nganSachDuKien: 6000000,
    ngayTao: '2025-02-10',
    danhSachNgay: [
      { ngay: '2025-03-01', danhSachDiemDenId: ['DD_004'] },
      { ngay: '2025-03-02', danhSachDiemDenId: ['DD_004'] },
      { ngay: '2025-03-03', danhSachDiemDenId: ['DD_004'] },
    ],
  },
];
