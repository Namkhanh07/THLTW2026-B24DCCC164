export type TrangThaiDon = 'Pending' | 'Approved' | 'Rejected';

export type GioiTinh = 'Nam' | 'Nữ';

export interface NhatKyThaoTac {
  nguoiThucHien: string;
  hanhDong: string;
  thoiGian: string;
  lyDo?: string;
}

export interface KieuCauLacBo {
  id: string;
  tenCLB: string;
  ngayThanhLap: string;
  moTa: string;
  chuNhiem: string;
  dangHoatDong: boolean;
  anhDaiDien?: string;
}

export interface KieuDonDangKy {
  id: string;
  hoTen: string;
  email: string;
  sdt: string;
  gioiTinh: GioiTinh;
  diaChi: string;
  soTruong: string;
  idCLB: string;
  lyDoDangKy: string;
  trangThai: TrangThaiDon;
  ghiChu?: string;
  lichSu: NhatKyThaoTac[];
}