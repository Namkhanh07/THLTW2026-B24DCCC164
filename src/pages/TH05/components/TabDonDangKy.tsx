import React, { useState } from 'react';
import { Table, Button, Space, Tag, Popconfirm, Input } from 'antd';
import {
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  HistoryOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuDonDangKy, KieuCauLacBo } from '../types';
import { TRANG_THAI, MAU_TRANG_THAI } from '../constants';
import FormDonDangKy, { CheDo } from './FormDonDangKy';
import ModalTuChoiDon from './ModalTuChoiDon';
import ModalLichSuThaoTac from './ModalLichSuThaoTac';

const TabDonDangKy: React.FC = () => {
  const { danhSachDon, danhSachCLB, themDon, suaDon, xoaDon, xuLyDonHangLoat } = useModel(
    'useModelCLB' as any,
  );

  const [danhSachDaChon, setDanhSachDaChon] = useState<string[]>([]);
  const [hienFormDon, setHienFormDon] = useState(false);
  const [cheDoForm, setCheDoForm] = useState<CheDo>('them');
  const [banGhiHienTai, setBanGhiHienTai] = useState<KieuDonDangKy | null>(null);
  const [hienModalTuChoi, setHienModalTuChoi] = useState(false);
  const [danhSachIdTuChoi, setDanhSachIdTuChoi] = useState<string[]>([]);
  const [hienLichSu, setHienLichSu] = useState(false);
  const [lichSuHienTai, setLichSuHienTai] = useState<any[]>([]);

  const moFormThemMoi = () => {
    setCheDoForm('them');
    setBanGhiHienTai(null);
    setHienFormDon(true);
  };

  const moFormChinhSua = (banGhi: KieuDonDangKy) => {
    setCheDoForm('sua');
    setBanGhiHienTai(banGhi);
    setHienFormDon(true);
  };

  const moFormXemChiTiet = (banGhi: KieuDonDangKy) => {
    setCheDoForm('xemChiTiet');
    setBanGhiHienTai(banGhi);
    setHienFormDon(true);
  };

  const xuLyLuuForm = (duLieu: any) => {
    if (cheDoForm === 'sua' && banGhiHienTai) {
      suaDon(banGhiHienTai.id, duLieu);
    } else {
      themDon(duLieu);
    }
    setHienFormDon(false);
  };

  const moModalTuChoi = (danhSachId: string[]) => {
    setDanhSachIdTuChoi(danhSachId);
    setHienModalTuChoi(true);
  };

  const xacNhanTuChoi = (lyDo: string) => {
    xuLyDonHangLoat(danhSachIdTuChoi, 'Rejected', lyDo);
    setHienModalTuChoi(false);
    setDanhSachDaChon([]);
  };

  const duyetHangLoat = () => {
    xuLyDonHangLoat(danhSachDaChon, 'Approved');
    setDanhSachDaChon([]);
  };

  const moLichSu = (danhSachNhatKy: any[]) => {
    setLichSuHienTai(danhSachNhatKy);
    setHienLichSu(true);
  };

  const layTenCLB = (idCLB: string): string =>
    danhSachCLB.find((c: KieuCauLacBo) => c.id === idCLB)?.tenCLB || 'Không rõ';

  const cauHinhCot = [
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      sorter: (a: KieuDonDangKy, b: KieuDonDangKy) => a.hoTen.localeCompare(b.hoTen),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Tìm họ tên..."
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={confirm}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button type="primary" onClick={confirm} size="small" icon={<SearchOutlined />}>
              Tìm
            </Button>
            <Button onClick={clearFilters} size="small">
              Bỏ lọc
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value: any, record: KieuDonDangKy) =>
        record.hoTen.toLowerCase().includes(value.toLowerCase()),
    },
    { title: 'Email', dataIndex: 'email', ellipsis: true },
    { title: 'SĐT', dataIndex: 'sdt', width: 120 },
    { title: 'Giới tính', dataIndex: 'gioiTinh', width: 90 },
    { title: 'Địa chỉ', dataIndex: 'diaChi', ellipsis: true },
    { title: 'Sở trường', dataIndex: 'soTruong', ellipsis: true },
    {
      title: 'CLB đăng ký',
      dataIndex: 'idCLB',
      render: (idCLB: string) => layTenCLB(idCLB),
      filters: danhSachCLB.map((c: KieuCauLacBo) => ({ text: c.tenCLB, value: c.id })),
      onFilter: (value: any, record: KieuDonDangKy) => record.idCLB === value,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      width: 110,
      filters: [
        { text: 'Pending', value: TRANG_THAI.PENDING },
        { text: 'Approved', value: TRANG_THAI.APPROVED },
        { text: 'Rejected', value: TRANG_THAI.REJECTED },
      ],
      onFilter: (value: any, record: KieuDonDangKy) => record.trangThai === value,
      render: (trangThai: string) => (
        <Tag color={MAU_TRANG_THAI[trangThai]}>{trangThai}</Tag>
      ),
    },
    { title: 'Lý do đăng ký', dataIndex: 'lyDoDangKy', ellipsis: true },
    { title: 'Ghi chú', dataIndex: 'ghiChu', ellipsis: true },
    {
      title: 'Thao tác',
      align: 'center' as const,
      width: 280,
      render: (_: any, banGhi: KieuDonDangKy) => (
        <Space size={4} wrap>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => moFormXemChiTiet(banGhi)}
          >
            Chi tiết
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => moFormChinhSua(banGhi)}
          >
            Sửa
          </Button>
          <Button
            type="link"
            size="small"
            icon={<HistoryOutlined />}
            onClick={() => moLichSu(banGhi.lichSu)}
          >
            Lịch sử
          </Button>
          {banGhi.trangThai === TRANG_THAI.PENDING && (
            <>
              <Button
                type="link"
                size="small"
                style={{ color: 'green' }}
                icon={<CheckOutlined />}
                onClick={() => xuLyDonHangLoat([banGhi.id], 'Approved')}
              >
                Duyệt
              </Button>
              <Button
                type="link"
                size="small"
                danger
                icon={<CloseOutlined />}
                onClick={() => moModalTuChoi([banGhi.id])}
              >
                Từ chối
              </Button>
            </>
          )}
          <Popconfirm
            title="Bạn có chắc muốn xóa đơn này?"
            onConfirm={() => xoaDon(banGhi.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const cauHinhChon = {
    selectedRowKeys: danhSachDaChon,
    onChange: (danhSachKey: React.Key[]) => setDanhSachDaChon(danhSachKey as string[]),
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }} wrap>
        <Button type="primary" icon={<PlusOutlined />} onClick={moFormThemMoi}>
          Thêm mới đơn đăng ký
        </Button>
        <Button
          type="primary"
          icon={<CheckOutlined />}
          disabled={danhSachDaChon.length === 0}
          onClick={duyetHangLoat}
          style={{ backgroundColor: danhSachDaChon.length > 0 ? '#52c41a' : undefined, borderColor: danhSachDaChon.length > 0 ? '#52c41a' : undefined }}
        >
          Duyệt {danhSachDaChon.length} đơn đã chọn
        </Button>
        <Button
          danger
          icon={<CloseOutlined />}
          disabled={danhSachDaChon.length === 0}
          onClick={() => moModalTuChoi(danhSachDaChon)}
        >
          Từ chối {danhSachDaChon.length} đơn đã chọn
        </Button>
      </Space>

      <Table
        bordered
        size="small"
        rowSelection={cauHinhChon}
        dataSource={danhSachDon}
        rowKey="id"
        columns={cauHinhCot}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showTotal: (tong: number) => `Tổng: ${tong} đơn`,
        }}
        scroll={{ x: 900 }}
      />

      <FormDonDangKy
        hienThi={hienFormDon}
        cheDo={cheDoForm}
        banGhiSua={banGhiHienTai}
        danhSachCLB={danhSachCLB}
        onDong={() => setHienFormDon(false)}
        onLuu={xuLyLuuForm}
      />

      <ModalTuChoiDon
        hienThi={hienModalTuChoi}
        soLuongDon={danhSachIdTuChoi.length}
        onDong={() => setHienModalTuChoi(false)}
        onXacNhan={xacNhanTuChoi}
      />

      <ModalLichSuThaoTac
        hienThi={hienLichSu}
        danhSachNhatKy={lichSuHienTai}
        onDong={() => setHienLichSu(false)}
      />
    </>
  );
};

export default TabDonDangKy;