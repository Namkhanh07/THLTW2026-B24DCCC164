import type { KieuTask } from './types';

export const KHOA_LUU_TRU = 'TH09_CONG_VIEC';

export const DS_TRANG_THAI = [
  { label: 'Cần làm', value: 'CanLam' },
  { label: 'Đang làm', value: 'DangLam' },
  { label: 'Hoàn thành', value: 'HoanThanh' },
];

export const TEN_TRANG_THAI: Record<string, string> = {
  CanLam: 'Cần làm',
  DangLam: 'Đang làm',
  HoanThanh: 'Hoàn thành',
};

export const MAU_TRANG_THAI: Record<string, string> = {
  CanLam: '#faad14',
  DangLam: '#1890ff',
  HoanThanh: '#52c41a',
};

export const DS_MUC_DO = [
  { label: 'Cao', value: 'Cao' },
  { label: 'Trung bình', value: 'TrungBinh' },
  { label: 'Thấp', value: 'Thap' },
];

export const TEN_MUC_DO: Record<string, string> = {
  Cao: 'Cao',
  TrungBinh: 'Trung bình',
  Thap: 'Thấp',
};

export const MAU_MUC_DO: Record<string, string> = {
  Cao: 'red',
  TrungBinh: 'orange',
  Thap: 'green',
};

export const DS_TAG = [
  'Frontend', 'Backend', 'Design', 'Bug', 'Docs', 'Testing', 'Khác'
];

export const DU_LIEU_MAC_DINH: KieuTask[] = [];
