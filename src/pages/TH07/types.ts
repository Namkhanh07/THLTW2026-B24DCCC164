export interface KieuThe {
  id: string;
  ten: string;
  mau: string;
}

export interface KieuBaiViet {
  id: string;
  tieuDe: string;
  slug: string;
  tomTat: string;
  noiDung: string;
  anhDaiDien: string;
  tacGia: string;
  ngayDang: string;
  danhSachTheId: string[];
  trangThai: 'nhap' | 'daDang';
  luotXem: number;
}
