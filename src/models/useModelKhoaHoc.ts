import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import type { KieuPhongHoc } from '../pages/GiuaKy/types';
import { KHOA_LUU_TRU, DU_LIEU_MAC_DINH } from '../pages/GiuaKy/constants';

export default function useModelPhongHoc() {
  const [danhSachPhongHoc, setDanhSachPhongHoc] = useState<KieuPhongHoc[]>([]);

  useEffect(() => {
    const chuoi = localStorage.getItem(KHOA_LUU_TRU);
    if (chuoi) setDanhSachPhongHoc(JSON.parse(chuoi));
    else ghiVaoStorage(DU_LIEU_MAC_DINH);
  }, []);

  const ghiVaoStorage = (duLieu: KieuPhongHoc[]) => {
    setDanhSachPhongHoc(duLieu);
    localStorage.setItem(KHOA_LUU_TRU, JSON.stringify(duLieu));
  };

  const kiemTraTrungMa = useCallback(
    (ma: string, idHienTai?: string) => {
      return danhSachPhongHoc.some(
        (ph) => ph.maPhong.toLowerCase() === ma.toLowerCase() && ph.id !== idHienTai,
      );
    },
    [danhSachPhongHoc],
  );

  const kiemTraTrungTen = useCallback(
    (ten: string, idHienTai?: string) => {
      return danhSachPhongHoc.some(
        (ph) => ph.tenPhong.toLowerCase() === ten.toLowerCase() && ph.id !== idHienTai,
      );
    },
    [danhSachPhongHoc],
  );

  const themPhongHoc = useCallback(
    (phongMoi: Omit<KieuPhongHoc, 'id'>) => {
      if (kiemTraTrungMa(phongMoi.maPhong)) {
        message.error('Mã phòng đã tồn tại!');
        return false;
      }
      if (kiemTraTrungTen(phongMoi.tenPhong)) {
        message.error('Tên phòng đã tồn tại!');
        return false;
      }
      const banGhi: KieuPhongHoc = { ...phongMoi, id: `PH_${Date.now()}` };
      ghiVaoStorage([...danhSachPhongHoc, banGhi]);
      message.success('Thêm phòng học thành công');
      return true;
    },
    [danhSachPhongHoc, kiemTraTrungMa, kiemTraTrungTen],
  );

  const suaPhongHoc = useCallback(
    (id: string, duLieu: Partial<KieuPhongHoc>) => {
      if (duLieu.maPhong && kiemTraTrungMa(duLieu.maPhong, id)) {
        message.error('Mã phòng đã tồn tại!');
        return false;
      }
      if (duLieu.tenPhong && kiemTraTrungTen(duLieu.tenPhong, id)) {
        message.error('Tên phòng đã tồn tại!');
        return false;
      }
      ghiVaoStorage(danhSachPhongHoc.map((ph) => (ph.id === id ? { ...ph, ...duLieu } : ph)));
      message.success('Cập nhật phòng học thành công');
      return true;
    },
    [danhSachPhongHoc, kiemTraTrungMa, kiemTraTrungTen],
  );

  const xoaPhongHoc = useCallback(
    (id: string) => {
      const phong = danhSachPhongHoc.find((ph) => ph.id === id);
      if (!phong) return;
      if (phong.soChoNgoi >= 30) {
        message.error(`Không thể xóa! Phòng có ${phong.soChoNgoi} chỗ ngồi (≥ 30).`);
        return;
      }
      ghiVaoStorage(danhSachPhongHoc.filter((ph) => ph.id !== id));
      message.success('Xóa phòng học thành công');
    },
    [danhSachPhongHoc],
  );

  return {
    danhSachPhongHoc,
    themPhongHoc,
    suaPhongHoc,
    xoaPhongHoc,
  };
}
