import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Input, Select, Tag, Popconfirm, Card, Typography, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuPhongHoc } from './types';
import { DS_LOAI_PHONG, DS_NGUOI_PHU_TRACH, TEN_LOAI_PHONG, MAU_LOAI_PHONG } from './constants';
import FormPhongHoc from './components/FormKhoaHoc';

const GiuaKy: React.FC = () => {
  const {
    danhSachPhongHoc,
    themPhongHoc,
    suaPhongHoc,
    xoaPhongHoc,
  } = useModel('useModelKhoaHoc' as any);

  const [hienForm, setHienForm] = useState(false);
  const [banGhiSua, setBanGhiSua] = useState<KieuPhongHoc | null>(null);
  const [tuKhoa, setTuKhoa] = useState('');
  const [locLoaiPhong, setLocLoaiPhong] = useState<string | undefined>(undefined);
  const [locNguoiPhuTrach, setLocNguoiPhuTrach] = useState<string | undefined>(undefined);

  const moFormThem = () => { setBanGhiSua(null); setHienForm(true); };
  const moFormSua = (bg: KieuPhongHoc) => { setBanGhiSua(bg); setHienForm(true); };

  const xuLyLuu = (duLieu: any) => {
    let ketQua = false;
    if (banGhiSua) ketQua = suaPhongHoc(banGhiSua.id, duLieu);
    else ketQua = themPhongHoc(duLieu);
    if (ketQua) setHienForm(false);
  };

  const duLieuDaLoc = useMemo(() => {
    let ketQua = [...danhSachPhongHoc];
    if (tuKhoa.trim()) {
      const tk = tuKhoa.toLowerCase();
      ketQua = ketQua.filter((ph: KieuPhongHoc) =>
        ph.maPhong.toLowerCase().includes(tk) || ph.tenPhong.toLowerCase().includes(tk),
      );
    }
    if (locLoaiPhong) {
      ketQua = ketQua.filter((ph: KieuPhongHoc) => ph.loaiPhong === locLoaiPhong);
    }
    if (locNguoiPhuTrach) {
      ketQua = ketQua.filter((ph: KieuPhongHoc) => ph.nguoiPhuTrach === locNguoiPhuTrach);
    }
    return ketQua;
  }, [danhSachPhongHoc, tuKhoa, locLoaiPhong, locNguoiPhuTrach]);

  const cauHinhCot = [
    {
      title: 'Mã phòng',
      dataIndex: 'maPhong',
      width: 110,
      sorter: (a: KieuPhongHoc, b: KieuPhongHoc) => a.maPhong.localeCompare(b.maPhong),
    },
    {
      title: 'Tên phòng',
      dataIndex: 'tenPhong',
      sorter: (a: KieuPhongHoc, b: KieuPhongHoc) => a.tenPhong.localeCompare(b.tenPhong),
    },
    {
      title: 'Số chỗ ngồi',
      dataIndex: 'soChoNgoi',
      width: 120,
      align: 'center' as const,
      sorter: (a: KieuPhongHoc, b: KieuPhongHoc) => a.soChoNgoi - b.soChoNgoi,
    },
    {
      title: 'Loại phòng',
      dataIndex: 'loaiPhong',
      width: 130,
      render: (loai: string) => (
        <Tag color={MAU_LOAI_PHONG[loai]}>{TEN_LOAI_PHONG[loai]}</Tag>
      ),
    },
    {
      title: 'Người phụ trách',
      dataIndex: 'nguoiPhuTrach',
      width: 160,
    },
    {
      title: 'Thao tác',
      width: 160,
      align: 'center' as const,
      render: (_: any, banGhi: KieuPhongHoc) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => moFormSua(banGhi)}
          >
            Sửa
          </Button>
          {banGhi.soChoNgoi < 30 ? (
            <Popconfirm
              title={`Xác nhận xóa phòng ${banGhi.maPhong}?`}
              onConfirm={() => xoaPhongHoc(banGhi.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button type="link" size="small" danger icon={<DeleteOutlined />}>
                Xóa
              </Button>
            </Popconfirm>
          ) : (
            <Tooltip title={`Không thể xóa: phòng có ${banGhi.soChoNgoi} chỗ ngồi (≥ 30)`}>
              <Button type="link" size="small" disabled icon={<DeleteOutlined />}>
                Xóa
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Card
        bordered={false}
        style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      >
        <Typography.Title level={3} style={{ textAlign: 'center', color: '#1890ff', marginBottom: 4 }}>
          QUẢN LÝ PHÒNG HỌC
        </Typography.Title>

        <Space style={{ marginBottom: 16 }} wrap>
          <Input.Search
            placeholder="Tìm theo mã phòng, tên phòng..."
            allowClear
            prefix={<SearchOutlined />}
            onChange={(e) => setTuKhoa(e.target.value)}
            style={{ width: 280 }}
          />
          <Select
            allowClear
            placeholder="Lọc loại phòng"
            style={{ width: 150 }}
            value={locLoaiPhong}
            onChange={setLocLoaiPhong}
            options={DS_LOAI_PHONG}
          />
          <Select
            allowClear
            placeholder="Lọc người phụ trách"
            style={{ width: 180 }}
            value={locNguoiPhuTrach}
            onChange={setLocNguoiPhuTrach}
          >
            {DS_NGUOI_PHU_TRACH.map((npt) => (
              <Select.Option key={npt} value={npt}>{npt}</Select.Option>
            ))}
          </Select>
          <Button type="primary" icon={<PlusOutlined />} onClick={moFormThem}>
            Thêm phòng học
          </Button>
        </Space>

        <Table
          bordered
          size="middle"
          dataSource={duLieuDaLoc}
          rowKey="id"
          columns={cauHinhCot}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (tong: number) => `Tổng: ${tong} phòng học`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      <FormPhongHoc
        hienThi={hienForm}
        banGhiSua={banGhiSua}
        onDong={() => setHienForm(false)}
        onLuu={xuLyLuu}
      />
    </div>
  );
};

export default GiuaKy;
