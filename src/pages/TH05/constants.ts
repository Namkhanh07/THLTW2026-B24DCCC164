export const KHOA_LUU_TRU = {
  CLB: 'TH05_KHOA_CLB',
  DON: 'TH05_KHOA_DON',
};

export const TRANG_THAI = {
  PENDING: 'Pending' as const,
  APPROVED: 'Approved' as const,
  REJECTED: 'Rejected' as const,
};

export const DS_GIOI_TINH = [
  { label: 'Nam', value: 'Nam' },
  { label: 'Nữ', value: 'Nữ' },
];

export const MAU_TRANG_THAI: Record<string, string> = {
  Pending: 'orange',
  Approved: 'green',
  Rejected: 'red',
};