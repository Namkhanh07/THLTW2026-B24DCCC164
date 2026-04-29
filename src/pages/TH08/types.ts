export type LoaiBaiTap = 'Cardio' | 'Strength' | 'Yoga' | 'HIIT' | 'Other';

export type TrangThaiBuoiTap = 'HoanThanh' | 'BoLo';

export type NhomCo = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'FullBody';

export type MucDoKho = 'De' | 'TrungBinh' | 'Kho';

export type TrangThaiMucTieu = 'DangThucHien' | 'DaDat' | 'DaHuy';

export type LoaiMucTieu = 'GiamCan' | 'TangCo' | 'CaiThienSucBen' | 'Khac';

export interface KieuBuoiTap {
  id: string;
  ngay: string;
  loaiBaiTap: LoaiBaiTap;
  thoiLuong: number;
  caloDot: number;
  ghiChu: string;
  trangThai: TrangThaiBuoiTap;
}

export interface KieuChiSoSucKhoe {
  id: string;
  ngay: string;
  canNang: number;
  chieuCao: number;
  bmi: number;
  nhipTim: number;
  gioNgu: number;
}

export interface KieuMucTieu {
  id: string;
  tenMucTieu: string;
  loai: LoaiMucTieu;
  giaTriMucTieu: number;
  giaTriHienTai: number;
  deadline: string;
  trangThai: TrangThaiMucTieu;
}

export interface KieuBaiTapThuVien {
  id: string;
  tenBaiTap: string;
  nhomCo: NhomCo;
  mucDoKho: MucDoKho;
  moTaNgan: string;
  caloTrungBinhGio: number;
  huongDan: string;
}
