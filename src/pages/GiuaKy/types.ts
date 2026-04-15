export type LoaiPhong = 'lyThuyet' | 'thucHanh' | 'hoiTruong';

export interface KieuPhongHoc {
  id: string;
  maPhong: string;
  tenPhong: string;
  soChoNgoi: number;
  loaiPhong: LoaiPhong;
  nguoiPhuTrach: string;
}
