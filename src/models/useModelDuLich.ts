import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import type { KieuDiemDen, KieuLichTrinh } from '../pages/TH06/types';
import { KHOA_LUU_TRU, DU_LIEU_DIEM_DEN_MAC_DINH, DU_LIEU_LICH_TRINH_MAC_DINH } from '../pages/TH06/constants';

export default function useModelDuLich() {
  const [danhSachDiemDen, setDanhSachDiemDen] = useState<KieuDiemDen[]>([]);
  const [danhSachLichTrinh, setDanhSachLichTrinh] = useState<KieuLichTrinh[]>([]);

  useEffect(() => {
    const chuoiDD = localStorage.getItem(KHOA_LUU_TRU.DIEM_DEN);
    const chuoiLT = localStorage.getItem(KHOA_LUU_TRU.LICH_TRINH);
    if (chuoiDD) setDanhSachDiemDen(JSON.parse(chuoiDD));
    else ghiDiemDenVaoStorage(DU_LIEU_DIEM_DEN_MAC_DINH);
    if (chuoiLT) setDanhSachLichTrinh(JSON.parse(chuoiLT));
    else ghiLichTrinhVaoStorage(DU_LIEU_LICH_TRINH_MAC_DINH);
  }, []);

  const ghiDiemDenVaoStorage = (duLieu: KieuDiemDen[]) => {
    setDanhSachDiemDen(duLieu);
    localStorage.setItem(KHOA_LUU_TRU.DIEM_DEN, JSON.stringify(duLieu));
  };

  const ghiLichTrinhVaoStorage = (duLieu: KieuLichTrinh[]) => {
    setDanhSachLichTrinh(duLieu);
    localStorage.setItem(KHOA_LUU_TRU.LICH_TRINH, JSON.stringify(duLieu));
  };

  const themDiemDen = useCallback(
    (diemDenMoi: Omit<KieuDiemDen, 'id'>) => {
      const banGhi: KieuDiemDen = { ...diemDenMoi, id: `DD_${Date.now()}` };
      ghiDiemDenVaoStorage([...danhSachDiemDen, banGhi]);
      message.success('Thêm điểm đến thành công');
    },
    [danhSachDiemDen],
  );

  const suaDiemDen = useCallback(
    (id: string, duLieu: Partial<KieuDiemDen>) => {
      ghiDiemDenVaoStorage(danhSachDiemDen.map((dd) => (dd.id === id ? { ...dd, ...duLieu } : dd)));
      message.success('Cập nhật điểm đến thành công');
    },
    [danhSachDiemDen],
  );

  const xoaDiemDen = useCallback(
    (id: string) => {
      ghiDiemDenVaoStorage(danhSachDiemDen.filter((dd) => dd.id !== id));
      message.success('Xóa điểm đến thành công');
    },
    [danhSachDiemDen],
  );

  const themLichTrinh = useCallback(
    (lichTrinhMoi: Omit<KieuLichTrinh, 'id' | 'ngayTao'>) => {
      const banGhi: KieuLichTrinh = {
        ...lichTrinhMoi,
        id: `LT_${Date.now()}`,
        ngayTao: new Date().toISOString().split('T')[0],
      };
      ghiLichTrinhVaoStorage([...danhSachLichTrinh, banGhi]);
      message.success('Tạo lịch trình thành công');
    },
    [danhSachLichTrinh],
  );

  const suaLichTrinh = useCallback(
    (id: string, duLieu: Partial<KieuLichTrinh>) => {
      ghiLichTrinhVaoStorage(
        danhSachLichTrinh.map((lt) => (lt.id === id ? { ...lt, ...duLieu } : lt)),
      );
      message.success('Cập nhật lịch trình thành công');
    },
    [danhSachLichTrinh],
  );

  const xoaLichTrinh = useCallback(
    (id: string) => {
      ghiLichTrinhVaoStorage(danhSachLichTrinh.filter((lt) => lt.id !== id));
      message.success('Xóa lịch trình thành công');
    },
    [danhSachLichTrinh],
  );

  const capNhatNgayLichTrinh = useCallback(
    (idLichTrinh: string, ngay: string, danhSachDiemDenId: string[]) => {
      const dsMoi = danhSachLichTrinh.map((lt) => {
        if (lt.id !== idLichTrinh) return lt;
        const ngayMoi = lt.danhSachNgay.map((n) =>
          n.ngay === ngay ? { ...n, danhSachDiemDenId } : n,
        );
        return { ...lt, danhSachNgay: ngayMoi };
      });
      ghiLichTrinhVaoStorage(dsMoi);
    },
    [danhSachLichTrinh],
  );

  const tinhTongChiPhi = useCallback(
    (lichTrinh: KieuLichTrinh) => {
      let tongAnUong = 0;
      let tongLuuTru = 0;
      let tongDiChuyen = 0;
      lichTrinh.danhSachNgay.forEach((ngay) => {
        ngay.danhSachDiemDenId.forEach((idDD) => {
          const dd = danhSachDiemDen.find((d) => d.id === idDD);
          if (dd) {
            tongAnUong += dd.chiPhiAnUong;
            tongLuuTru += dd.chiPhiLuuTru;
            tongDiChuyen += dd.chiPhiDiChuyen;
          }
        });
      });
      return { tongAnUong, tongLuuTru, tongDiChuyen, tongCong: tongAnUong + tongLuuTru + tongDiChuyen };
    },
    [danhSachDiemDen],
  );

  const tinhTongThoiGian = useCallback(
    (lichTrinh: KieuLichTrinh) => {
      let tong = 0;
      lichTrinh.danhSachNgay.forEach((ngay) => {
        ngay.danhSachDiemDenId.forEach((idDD) => {
          const dd = danhSachDiemDen.find((d) => d.id === idDD);
          if (dd) tong += dd.thoiGianThamQuan;
        });
      });
      return tong;
    },
    [danhSachDiemDen],
  );

  const khoiPhucDuLieuGoc = useCallback(() => {
    ghiDiemDenVaoStorage(DU_LIEU_DIEM_DEN_MAC_DINH);
    ghiLichTrinhVaoStorage(DU_LIEU_LICH_TRINH_MAC_DINH);
    message.success('Đã khôi phục dữ liệu mặc định');
  }, []);

  return {
    danhSachDiemDen,
    danhSachLichTrinh,
    themDiemDen,
    suaDiemDen,
    xoaDiemDen,
    themLichTrinh,
    suaLichTrinh,
    xoaLichTrinh,
    capNhatNgayLichTrinh,
    tinhTongChiPhi,
    tinhTongThoiGian,
    khoiPhucDuLieuGoc,
  };
}
