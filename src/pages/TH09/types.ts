export type TrangThaiTask = 'CanLam' | 'DangLam' | 'HoanThanh';

export type MucDoUuTien = 'Cao' | 'TrungBinh' | 'Thap';

export interface KieuTask {
  id: string;
  tenTask: string;
  moTa: string;
  deadline: string;
  mucDoUuTien: MucDoUuTien;
  tag: string;
  trangThai: TrangThaiTask;
}
