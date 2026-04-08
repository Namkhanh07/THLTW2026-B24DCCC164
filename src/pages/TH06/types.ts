export type LoaiHinh = 'bien' | 'nui' | 'thanhPho';

export interface KieuDiemDen {
  id: string;
  ten: string;
  hinhAnh: string;
  loaiHinh: LoaiHinh;
  moTa: string;
  thoiGianThamQuan: number;
  danhGia: number;
  chiPhiAnUong: number;
  chiPhiLuuTru: number;
  chiPhiDiChuyen: number;
}

export interface KieuNgayLichTrinh {
  ngay: string;
  danhSachDiemDenId: string[];
}

export interface KieuLichTrinh {
  id: string;
  tenLichTrinh: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  nganSachDuKien: number;
  danhSachNgay: KieuNgayLichTrinh[];
  ngayTao: string;
}
