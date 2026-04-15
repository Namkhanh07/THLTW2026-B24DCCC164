import type { KieuPhongHoc } from './types';

export const KHOA_LUU_TRU = 'GIUA_KY_PHONG_HOC';

export const DS_LOAI_PHONG = [
  { label: 'Lý thuyết', value: 'lyThuyet' },
  { label: 'Thực hành', value: 'thucHanh' },
  { label: 'Hội trường', value: 'hoiTruong' },
];

export const TEN_LOAI_PHONG: Record<string, string> = {
  lyThuyet: 'Lý thuyết',
  thucHanh: 'Thực hành',
  hoiTruong: 'Hội trường',
};

export const MAU_LOAI_PHONG: Record<string, string> = {
  lyThuyet: 'blue',
  thucHanh: 'green',
  hoiTruong: 'purple',
};

export const DS_NGUOI_PHU_TRACH = [
  'Thân Đức Anh',
  'Nguyễn Việt Hoàng',
  'Lê Hoàng Lân',
  'Nguyễn Đức Minh',
  'Giáp Văn Hiếu',
];

export const DU_LIEU_MAC_DINH: KieuPhongHoc[] = [
  {
    id: 'PH_001',
    maPhong: '101',
    tenPhong: 'Phòng học 101',
    soChoNgoi: 50,
    loaiPhong: 'lyThuyet',
    nguoiPhuTrach: 'Thân Đức Anh',
  },
  {
    id: 'PH_002',
    maPhong: '201',
    tenPhong: 'Phòng học 201',
    soChoNgoi: 40,
    loaiPhong: 'thucHanh',
    nguoiPhuTrach: 'Nguyễn Việt Hoàng',
  },
  {
    id: 'PH_003',
    maPhong: '301',
    tenPhong: 'Phòng học 301',
    soChoNgoi: 200,
    loaiPhong: 'hoiTruong',
    nguoiPhuTrach: 'Lê Hoàng Lân',
  },
  {
    id: 'PH_004',
    maPhong: '402',
    tenPhong: 'Phòng học 401',
    soChoNgoi: 25,
    loaiPhong: 'lyThuyet',
    nguoiPhuTrach: 'Nguyễn Đức Minh',
  },
  {
    id: 'PH_005',
    maPhong: '501',
    tenPhong: 'Phòng học 501',
    soChoNgoi: 30,
    loaiPhong: 'thucHanh',
    nguoiPhuTrach: 'Nguyễn Đức Minh',
  },
  {
    id: 'PH_006',
    maPhong: '601',
    tenPhong: 'Phòng học 601',
    soChoNgoi: 20,
    loaiPhong: 'lyThuyet',
    nguoiPhuTrach: 'Giáp Văn Hiếu',
  },
];
