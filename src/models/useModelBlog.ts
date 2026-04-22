import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import type { KieuBaiViet, KieuThe } from '../pages/TH07/types';
import { KHOA_LUU_TRU, DS_BAI_VIET_MAC_DINH, DS_THE_MAC_DINH } from '../pages/TH07/constants';

export default function useModelBlog() {
  const [danhSachBaiViet, setDanhSachBaiViet] = useState<KieuBaiViet[]>([]);
  const [danhSachThe, setDanhSachThe] = useState<KieuThe[]>([]);

  useEffect(() => {
    const chuoiBV = localStorage.getItem(KHOA_LUU_TRU.BAI_VIET);
    const chuoiThe = localStorage.getItem(KHOA_LUU_TRU.THE);
    if (chuoiBV) setDanhSachBaiViet(JSON.parse(chuoiBV));
    else ghiBaiVietVaoStorage(DS_BAI_VIET_MAC_DINH);
    if (chuoiThe) setDanhSachThe(JSON.parse(chuoiThe));
    else ghiTheVaoStorage(DS_THE_MAC_DINH);
  }, []);

  const ghiBaiVietVaoStorage = (dl: KieuBaiViet[]) => {
    setDanhSachBaiViet(dl);
    localStorage.setItem(KHOA_LUU_TRU.BAI_VIET, JSON.stringify(dl));
  };

  const ghiTheVaoStorage = (dl: KieuThe[]) => {
    setDanhSachThe(dl);
    localStorage.setItem(KHOA_LUU_TRU.THE, JSON.stringify(dl));
  };

  const themBaiViet = useCallback(
    (bvMoi: Omit<KieuBaiViet, 'id' | 'luotXem' | 'ngayDang'>) => {
      const banGhi: KieuBaiViet = {
        ...bvMoi,
        id: `BV_${Date.now()}`,
        luotXem: 0,
        ngayDang: new Date().toISOString().split('T')[0],
      };
      ghiBaiVietVaoStorage([banGhi, ...danhSachBaiViet]);
      message.success('Thêm bài viết thành công');
    },
    [danhSachBaiViet],
  );

  const suaBaiViet = useCallback(
    (id: string, duLieu: Partial<KieuBaiViet>) => {
      ghiBaiVietVaoStorage(danhSachBaiViet.map((bv) => (bv.id === id ? { ...bv, ...duLieu } : bv)));
      message.success('Cập nhật bài viết thành công');
    },
    [danhSachBaiViet],
  );

  const xoaBaiViet = useCallback(
    (id: string) => {
      ghiBaiVietVaoStorage(danhSachBaiViet.filter((bv) => bv.id !== id));
      message.success('Xóa bài viết thành công');
    },
    [danhSachBaiViet],
  );

  const tangLuotXem = useCallback(
    (id: string) => {
      ghiBaiVietVaoStorage(
        danhSachBaiViet.map((bv) => (bv.id === id ? { ...bv, luotXem: bv.luotXem + 1 } : bv)),
      );
    },
    [danhSachBaiViet],
  );

  const themThe = useCallback(
    (theMoi: Omit<KieuThe, 'id'>) => {
      const banGhi: KieuThe = { ...theMoi, id: `THE_${Date.now()}` };
      ghiTheVaoStorage([...danhSachThe, banGhi]);
      message.success('Thêm thẻ thành công');
    },
    [danhSachThe],
  );

  const suaThe = useCallback(
    (id: string, duLieu: Partial<KieuThe>) => {
      ghiTheVaoStorage(danhSachThe.map((t) => (t.id === id ? { ...t, ...duLieu } : t)));
      message.success('Cập nhật thẻ thành công');
    },
    [danhSachThe],
  );

  const xoaThe = useCallback(
    (id: string) => {
      ghiTheVaoStorage(danhSachThe.filter((t) => t.id !== id));
      message.success('Xóa thẻ thành công');
    },
    [danhSachThe],
  );

  const layTenThe = useCallback(
    (id: string) => danhSachThe.find((t) => t.id === id)?.ten || '',
    [danhSachThe],
  );

  const layThe = useCallback(
    (id: string) => danhSachThe.find((t) => t.id === id),
    [danhSachThe],
  );

  const demBaiVietTheoThe = useCallback(
    (idThe: string) => danhSachBaiViet.filter((bv) => bv.danhSachTheId.includes(idThe)).length,
    [danhSachBaiViet],
  );

  return {
    danhSachBaiViet,
    danhSachThe,
    themBaiViet,
    suaBaiViet,
    xoaBaiViet,
    tangLuotXem,
    themThe,
    suaThe,
    xoaThe,
    layTenThe,
    layThe,
    demBaiVietTheoThe,
  };
}
