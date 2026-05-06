import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import type { KieuTask, TrangThaiTask } from '../pages/TH09/types';
import { KHOA_LUU_TRU, DU_LIEU_MAC_DINH } from '../pages/TH09/constants';

export default function useModelCongViec() {
  const [danhSachTask, setDanhSachTask] = useState<KieuTask[]>([]);

  useEffect(() => {
    const dl = localStorage.getItem(KHOA_LUU_TRU);
    if (dl) setDanhSachTask(JSON.parse(dl));
    else ghiVaoStorage(DU_LIEU_MAC_DINH);
  }, []);

  const ghiVaoStorage = (dl: KieuTask[]) => {
    setDanhSachTask(dl);
    localStorage.setItem(KHOA_LUU_TRU, JSON.stringify(dl));
  };

  const themTask = useCallback((task: Omit<KieuTask, 'id'>) => {
    const banGhi: KieuTask = { ...task, id: `T_${Date.now()}` };
    ghiVaoStorage([banGhi, ...danhSachTask]);
    message.success('Thêm task thành công');
  }, [danhSachTask]);

  const suaTask = useCallback((id: string, dl: Partial<KieuTask>) => {
    ghiVaoStorage(danhSachTask.map((t) => (t.id === id ? { ...t, ...dl } : t)));
    message.success('Cập nhật task thành công');
  }, [danhSachTask]);

  const xoaTask = useCallback((id: string) => {
    ghiVaoStorage(danhSachTask.filter((t) => t.id !== id));
    message.success('Xóa task thành công');
  }, [danhSachTask]);

  const doiTrangThai = useCallback((id: string, trangThai: TrangThaiTask) => {
    ghiVaoStorage(danhSachTask.map((t) => (t.id === id ? { ...t, trangThai } : t)));
  }, [danhSachTask]);

  const sapXepLaiTask = useCallback((danhSachMoi: KieuTask[]) => {
    ghiVaoStorage(danhSachMoi);
  }, []);

  return {
    danhSachTask,
    themTask,
    suaTask,
    xoaTask,
    doiTrangThai,
    sapXepLaiTask,
  };
}
