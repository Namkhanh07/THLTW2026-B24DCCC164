import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { KieuCauLacBo, KieuDonDangKy, NhatKyThaoTac } from '../pages/TH05/types';
import { KHOA_LUU_TRU, TRANG_THAI } from '../pages/TH05/constants';

const DU_LIEU_CLB_MAC_DINH: KieuCauLacBo[] = [
  {
    id: 'CLB_001',
    tenCLB: 'CLB Công nghệ thông tin',
    ngayThanhLap: '2024-03-15',
    moTa: '<b>Nơi chia sẻ kiến thức lập trình</b> và công nghệ mới nhất',
    chuNhiem: 'Nguyễn Văn An',
    dangHoatDong: true,
    anhDaiDien: 'https://api.dicebear.com/7.x/identicon/svg?seed=IT',
  },
  {
    id: 'CLB_002',
    tenCLB: 'CLB Âm nhạc',
    ngayThanhLap: '2024-05-20',
    moTa: '<i>Kết nối những người yêu âm nhạc</i>, tổ chức biểu diễn định kỳ',
    chuNhiem: 'Trần Thị Bình',
    dangHoatDong: true,
    anhDaiDien: 'https://api.dicebear.com/7.x/identicon/svg?seed=Music',
  },
  {
    id: 'CLB_003',
    tenCLB: 'CLB Thể thao',
    ngayThanhLap: '2023-09-01',
    moTa: '<b>Rèn luyện sức khỏe</b>, thi đấu các giải thể thao sinh viên',
    chuNhiem: 'Lê Minh Cường',
    dangHoatDong: false,
    anhDaiDien: 'https://api.dicebear.com/7.x/identicon/svg?seed=Sport',
  },
];

const DU_LIEU_DON_MAC_DINH: KieuDonDangKy[] = [
  {
    id: 'DON_001',
    hoTen: 'Phạm Quốc Đạt',
    email: 'dat.pq@gmail.com',
    sdt: '0912345678',
    gioiTinh: 'Nam',
    diaChi: 'Hà Nội',
    soTruong: 'Lập trình Web',
    idCLB: 'CLB_001',
    lyDoDangKy: 'Muốn học thêm kiến thức lập trình',
    trangThai: 'Pending',
    lichSu: [],
  },
  {
    id: 'DON_002',
    hoTen: 'Ngô Thị Hạnh',
    email: 'hanh.nt@gmail.com',
    sdt: '0987654321',
    gioiTinh: 'Nữ',
    diaChi: 'TP.HCM',
    soTruong: 'Chơi guitar',
    idCLB: 'CLB_002',
    lyDoDangKy: 'Đam mê âm nhạc từ nhỏ',
    trangThai: 'Approved',
    lichSu: [
      {
        nguoiThucHien: 'Admin',
        hanhDong: 'Approved',
        thoiGian: '15:30 01/03/2025',
      },
    ],
  },
  {
    id: 'DON_003',
    hoTen: 'Vũ Hoàng Long',
    email: 'long.vh@gmail.com',
    sdt: '0909123456',
    gioiTinh: 'Nam',
    diaChi: 'Đà Nẵng',
    soTruong: 'Cầu lông',
    idCLB: 'CLB_001',
    lyDoDangKy: 'Muốn tham gia cộng đồng IT',
    trangThai: 'Approved',
    lichSu: [
      {
        nguoiThucHien: 'Admin',
        hanhDong: 'Approved',
        thoiGian: '10:00 05/03/2025',
      },
    ],
  },
  {
    id: 'DON_004',
    hoTen: 'Trương Thùy Mai',
    email: 'mai.tt@gmail.com',
    sdt: '0933456789',
    gioiTinh: 'Nữ',
    diaChi: 'Hải Phòng',
    soTruong: 'Bóng đá',
    idCLB: 'CLB_003',
    lyDoDangKy: 'Yêu thích thể thao',
    trangThai: 'Rejected',
    ghiChu: 'CLB đã ngừng hoạt động',
    lichSu: [
      {
        nguoiThucHien: 'Admin',
        hanhDong: 'Rejected',
        thoiGian: '09:00 10/03/2025',
        lyDo: 'CLB đã ngừng hoạt động',
      },
    ],
  },
];

export default function useModelCLB() {
  const [danhSachCLB, setDanhSachCLB] = useState<KieuCauLacBo[]>([]);
  const [danhSachDon, setDanhSachDon] = useState<KieuDonDangKy[]>([]);

  useEffect(() => {
    const chuoiCLB = localStorage.getItem(KHOA_LUU_TRU.CLB);
    const chuoiDon = localStorage.getItem(KHOA_LUU_TRU.DON);
    if (chuoiCLB) {
      setDanhSachCLB(JSON.parse(chuoiCLB));
    } else {
      ghiCLBVaoStorage(DU_LIEU_CLB_MAC_DINH);
    }
    if (chuoiDon) {
      setDanhSachDon(JSON.parse(chuoiDon));
    } else {
      ghiDonVaoStorage(DU_LIEU_DON_MAC_DINH);
    }
  }, []);

  const ghiCLBVaoStorage = (duLieu: KieuCauLacBo[]) => {
    setDanhSachCLB(duLieu);
    localStorage.setItem(KHOA_LUU_TRU.CLB, JSON.stringify(duLieu));
  };

  const ghiDonVaoStorage = (duLieu: KieuDonDangKy[]) => {
    setDanhSachDon(duLieu);
    localStorage.setItem(KHOA_LUU_TRU.DON, JSON.stringify(duLieu));
  };

  const themCLB = useCallback(
    (clbMoi: Omit<KieuCauLacBo, 'id'>) => {
      const banGhi: KieuCauLacBo = { ...clbMoi, id: `CLB_${Date.now()}` };
      const danhSachMoi = [...danhSachCLB, banGhi];
      ghiCLBVaoStorage(danhSachMoi);
      message.success('Thêm câu lạc bộ thành công');
    },
    [danhSachCLB],
  );

  const suaCLB = useCallback(
    (id: string, duLieuCapNhat: Partial<KieuCauLacBo>) => {
      const danhSachMoi = danhSachCLB.map((clb) =>
        clb.id === id ? { ...clb, ...duLieuCapNhat } : clb,
      );
      ghiCLBVaoStorage(danhSachMoi);
      message.success('Cập nhật câu lạc bộ thành công');
    },
    [danhSachCLB],
  );

  const xoaCLB = useCallback(
    (id: string) => {
      const danhSachMoi = danhSachCLB.filter((clb) => clb.id !== id);
      ghiCLBVaoStorage(danhSachMoi);
      message.success('Xóa câu lạc bộ thành công');
    },
    [danhSachCLB],
  );

  const themDon = useCallback(
    (donMoi: Omit<KieuDonDangKy, 'id' | 'trangThai' | 'lichSu'>) => {
      const banGhi: KieuDonDangKy = {
        ...donMoi,
        id: `DON_${Date.now()}`,
        trangThai: TRANG_THAI.PENDING,
        lichSu: [],
      };
      const danhSachMoi = [...danhSachDon, banGhi];
      ghiDonVaoStorage(danhSachMoi);
      message.success('Thêm đơn đăng ký thành công');
    },
    [danhSachDon],
  );

  const suaDon = useCallback(
    (id: string, duLieuCapNhat: Partial<KieuDonDangKy>) => {
      const danhSachMoi = danhSachDon.map((don) =>
        don.id === id ? { ...don, ...duLieuCapNhat } : don,
      );
      ghiDonVaoStorage(danhSachMoi);
      message.success('Cập nhật đơn đăng ký thành công');
    },
    [danhSachDon],
  );

  const xoaDon = useCallback(
    (id: string) => {
      const danhSachMoi = danhSachDon.filter((don) => don.id !== id);
      ghiDonVaoStorage(danhSachMoi);
      message.success('Xóa đơn đăng ký thành công');
    },
    [danhSachDon],
  );

  const xuLyDonHangLoat = useCallback(
    (danhSachId: string[], ketQua: 'Approved' | 'Rejected', lyDo?: string) => {
      const thoiGian = new Date().toLocaleString('vi-VN');
      const danhSachMoi = danhSachDon.map((don) => {
        if (!danhSachId.includes(don.id)) return don;
        const nhatKy: NhatKyThaoTac = {
          nguoiThucHien: 'Admin',
          hanhDong: ketQua,
          thoiGian,
          lyDo,
        };
        return {
          ...don,
          trangThai: ketQua,
          ghiChu: ketQua === 'Rejected' ? lyDo : don.ghiChu,
          lichSu: [nhatKy, ...don.lichSu],
        };
      });
      ghiDonVaoStorage(danhSachMoi);
      message.success(
        `Đã ${ketQua === 'Approved' ? 'duyệt' : 'từ chối'} ${danhSachId.length} đơn`,
      );
    },
    [danhSachDon],
  );

  const doiCLBHangLoat = useCallback(
    (danhSachId: string[], idCLBMoi: string) => {
      const danhSachMoi = danhSachDon.map((don) =>
        danhSachId.includes(don.id) ? { ...don, idCLB: idCLBMoi } : don,
      );
      ghiDonVaoStorage(danhSachMoi);
      message.success(`Đã chuyển CLB cho ${danhSachId.length} thành viên`);
    },
    [danhSachDon],
  );

  return {
    danhSachCLB,
    danhSachDon,
    themCLB,
    suaCLB,
    xoaCLB,
    themDon,
    suaDon,
    xoaDon,
    xuLyDonHangLoat,
    doiCLBHangLoat,
  };
}