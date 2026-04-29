import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import type { KieuBuoiTap, KieuChiSoSucKhoe, KieuMucTieu, KieuBaiTapThuVien } from '../pages/TH08/types';
import { KHOA_LUU_TRU, DU_LIEU_BUOI_TAP, DU_LIEU_CHI_SO, DU_LIEU_MUC_TIEU, DU_LIEU_BAI_TAP } from '../pages/TH08/constants';

export default function useModelTheDuc() {
  const [danhSachBuoiTap, setDanhSachBuoiTap] = useState<KieuBuoiTap[]>([]);
  const [danhSachChiSo, setDanhSachChiSo] = useState<KieuChiSoSucKhoe[]>([]);
  const [danhSachMucTieu, setDanhSachMucTieu] = useState<KieuMucTieu[]>([]);
  const [danhSachBaiTap, setDanhSachBaiTap] = useState<KieuBaiTapThuVien[]>([]);

  useEffect(() => {
    const bt = localStorage.getItem(KHOA_LUU_TRU.BUOI_TAP);
    const cs = localStorage.getItem(KHOA_LUU_TRU.CHI_SO);
    const mt = localStorage.getItem(KHOA_LUU_TRU.MUC_TIEU);
    const btv = localStorage.getItem(KHOA_LUU_TRU.BAI_TAP);
    if (bt) setDanhSachBuoiTap(JSON.parse(bt)); else ghiBuoiTapVaoStorage(DU_LIEU_BUOI_TAP);
    if (cs) setDanhSachChiSo(JSON.parse(cs)); else ghiChiSoVaoStorage(DU_LIEU_CHI_SO);
    if (mt) setDanhSachMucTieu(JSON.parse(mt)); else ghiMucTieuVaoStorage(DU_LIEU_MUC_TIEU);
    if (btv) setDanhSachBaiTap(JSON.parse(btv)); else ghiBaiTapVaoStorage(DU_LIEU_BAI_TAP);
  }, []);

  const ghiBuoiTapVaoStorage = (dl: KieuBuoiTap[]) => {
    setDanhSachBuoiTap(dl);
    localStorage.setItem(KHOA_LUU_TRU.BUOI_TAP, JSON.stringify(dl));
  };
  const ghiChiSoVaoStorage = (dl: KieuChiSoSucKhoe[]) => {
    setDanhSachChiSo(dl);
    localStorage.setItem(KHOA_LUU_TRU.CHI_SO, JSON.stringify(dl));
  };
  const ghiMucTieuVaoStorage = (dl: KieuMucTieu[]) => {
    setDanhSachMucTieu(dl);
    localStorage.setItem(KHOA_LUU_TRU.MUC_TIEU, JSON.stringify(dl));
  };
  const ghiBaiTapVaoStorage = (dl: KieuBaiTapThuVien[]) => {
    setDanhSachBaiTap(dl);
    localStorage.setItem(KHOA_LUU_TRU.BAI_TAP, JSON.stringify(dl));
  };

  const themBuoiTap = useCallback((bt: Omit<KieuBuoiTap, 'id'>) => {
    const banGhi: KieuBuoiTap = { ...bt, id: `BT_${Date.now()}` };
    ghiBuoiTapVaoStorage([banGhi, ...danhSachBuoiTap]);
    message.success('Thêm buổi tập thành công');
  }, [danhSachBuoiTap]);

  const suaBuoiTap = useCallback((id: string, dl: Partial<KieuBuoiTap>) => {
    ghiBuoiTapVaoStorage(danhSachBuoiTap.map((bt) => (bt.id === id ? { ...bt, ...dl } : bt)));
    message.success('Cập nhật buổi tập thành công');
  }, [danhSachBuoiTap]);

  const xoaBuoiTap = useCallback((id: string) => {
    ghiBuoiTapVaoStorage(danhSachBuoiTap.filter((bt) => bt.id !== id));
    message.success('Xóa buổi tập thành công');
  }, [danhSachBuoiTap]);

  const themChiSo = useCallback((cs: Omit<KieuChiSoSucKhoe, 'id'>) => {
    const banGhi: KieuChiSoSucKhoe = { ...cs, id: `CS_${Date.now()}` };
    ghiChiSoVaoStorage([banGhi, ...danhSachChiSo]);
    message.success('Thêm chỉ số thành công');
  }, [danhSachChiSo]);

  const suaChiSo = useCallback((id: string, dl: Partial<KieuChiSoSucKhoe>) => {
    ghiChiSoVaoStorage(danhSachChiSo.map((cs) => (cs.id === id ? { ...cs, ...dl } : cs)));
    message.success('Cập nhật chỉ số thành công');
  }, [danhSachChiSo]);

  const xoaChiSo = useCallback((id: string) => {
    ghiChiSoVaoStorage(danhSachChiSo.filter((cs) => cs.id !== id));
    message.success('Xóa chỉ số thành công');
  }, [danhSachChiSo]);

  const themMucTieu = useCallback((mt: Omit<KieuMucTieu, 'id'>) => {
    const banGhi: KieuMucTieu = { ...mt, id: `MT_${Date.now()}` };
    ghiMucTieuVaoStorage([banGhi, ...danhSachMucTieu]);
    message.success('Thêm mục tiêu thành công');
  }, [danhSachMucTieu]);

  const suaMucTieu = useCallback((id: string, dl: Partial<KieuMucTieu>) => {
    ghiMucTieuVaoStorage(danhSachMucTieu.map((mt) => (mt.id === id ? { ...mt, ...dl } : mt)));
    message.success('Cập nhật mục tiêu thành công');
  }, [danhSachMucTieu]);

  const xoaMucTieu = useCallback((id: string) => {
    ghiMucTieuVaoStorage(danhSachMucTieu.filter((mt) => mt.id !== id));
    message.success('Xóa mục tiêu thành công');
  }, [danhSachMucTieu]);

  const themBaiTap = useCallback((bt: Omit<KieuBaiTapThuVien, 'id'>) => {
    const banGhi: KieuBaiTapThuVien = { ...bt, id: `TV_${Date.now()}` };
    ghiBaiTapVaoStorage([banGhi, ...danhSachBaiTap]);
    message.success('Thêm bài tập thành công');
  }, [danhSachBaiTap]);

  const suaBaiTap = useCallback((id: string, dl: Partial<KieuBaiTapThuVien>) => {
    ghiBaiTapVaoStorage(danhSachBaiTap.map((bt) => (bt.id === id ? { ...bt, ...dl } : bt)));
    message.success('Cập nhật bài tập thành công');
  }, [danhSachBaiTap]);

  const xoaBaiTap = useCallback((id: string) => {
    ghiBaiTapVaoStorage(danhSachBaiTap.filter((bt) => bt.id !== id));
    message.success('Xóa bài tập thành công');
  }, [danhSachBaiTap]);

  return {
    danhSachBuoiTap, danhSachChiSo, danhSachMucTieu, danhSachBaiTap,
    themBuoiTap, suaBuoiTap, xoaBuoiTap,
    themChiSo, suaChiSo, xoaChiSo,
    themMucTieu, suaMucTieu, xoaMucTieu,
    themBaiTap, suaBaiTap, xoaBaiTap,
  };
}
