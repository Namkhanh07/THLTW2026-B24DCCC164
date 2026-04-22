import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Input, Select, Tag, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuBaiViet } from '../types';
import FormBaiViet from './FormBaiViet';

const TabQuanLyBaiViet: React.FC = () => {
  const { danhSachBaiViet, danhSachThe, themBaiViet, suaBaiViet, xoaBaiViet } = useModel('useModelBlog' as any);

  const [hienForm, setHienForm] = useState(false);
  const [banGhiSua, setBanGhiSua] = useState<KieuBaiViet | null>(null);
  const [tuKhoa, setTuKhoa] = useState('');
  const [locTrangThai, setLocTrangThai] = useState<string | undefined>(undefined);

  const moFormThem = () => { setBanGhiSua(null); setHienForm(true); };
  const moFormSua = (bg: KieuBaiViet) => { setBanGhiSua(bg); setHienForm(true); };

  const xuLyLuu = (duLieu: any) => {
    if (banGhiSua) suaBaiViet(banGhiSua.id, duLieu);
    else themBaiViet(duLieu);
    setHienForm(false);
  };

  const duLieuDaLoc = useMemo(() => {
    let ketQua = [...danhSachBaiViet];
    if (tuKhoa.trim()) {
      const tk = tuKhoa.toLowerCase();
      ketQua = ketQua.filter((bv: KieuBaiViet) => bv.tieuDe.toLowerCase().includes(tk));
    }
    if (locTrangThai) {
      ketQua = ketQua.filter((bv: KieuBaiViet) => bv.trangThai === locTrangThai);
    }
    return ketQua;
  }, [danhSachBaiViet, tuKhoa, locTrangThai]);

  const cauHinhCot = [
    {
      title: 'Tiêu đề',
      dataIndex: 'tieuDe',
      ellipsis: true,
      sorter: (a: KieuBaiViet, b: KieuBaiViet) => a.tieuDe.localeCompare(b.tieuDe),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      width: 110,
      render: (tt: string) => (
        <Tag color={tt === 'daDang' ? 'green' : 'orange'}>{tt === 'daDang' ? 'Đã đăng' : 'Nháp'}</Tag>
      ),
    },
    {
      title: 'Thẻ',
      dataIndex: 'danhSachTheId',
      width: 200,
      render: (dsThe: string[]) => (
        <Space wrap>
          {dsThe.map((id: string) => {
            const the = danhSachThe.find((t: any) => t.id === id);
            return the ? <Tag key={id} color={the.mau} style={{ fontSize: 11 }}>{the.ten}</Tag> : null;
          })}
        </Space>
      ),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'luotXem',
      width: 100,
      align: 'center' as const,
      sorter: (a: KieuBaiViet, b: KieuBaiViet) => a.luotXem - b.luotXem,
      render: (lx: number) => <span><EyeOutlined style={{ marginRight: 4 }} />{lx}</span>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngayDang',
      width: 110,
      sorter: (a: KieuBaiViet, b: KieuBaiViet) => a.ngayDang.localeCompare(b.ngayDang),
    },
    {
      title: 'Thao tác',
      width: 140,
      align: 'center' as const,
      render: (_: any, bg: KieuBaiViet) => (
        <Space>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => moFormSua(bg)}>Sửa</Button>
          <Popconfirm title="Xác nhận xóa bài viết này?" onConfirm={() => xoaBaiViet(bg.id)} okText="Xóa" cancelText="Hủy">
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }} wrap>
        <Input.Search
          placeholder="Tìm theo tiêu đề..."
          allowClear
          prefix={<SearchOutlined />}
          onChange={(e) => setTuKhoa(e.target.value)}
          style={{ width: 280 }}
        />
        <Select
          allowClear
          placeholder="Lọc trạng thái"
          style={{ width: 150 }}
          value={locTrangThai}
          onChange={setLocTrangThai}
          options={[
            { label: 'Nháp', value: 'nhap' },
            { label: 'Đã đăng', value: 'daDang' },
          ]}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={moFormThem}>Thêm bài viết</Button>
      </Space>

      <Table
        bordered
        size="middle"
        dataSource={duLieuDaLoc}
        rowKey="id"
        columns={cauHinhCot}
        pagination={{ pageSize: 5, showSizeChanger: true, showTotal: (t: number) => `Tổng: ${t} bài viết` }}
        scroll={{ x: 800 }}
      />

      <FormBaiViet
        hienThi={hienForm}
        banGhiSua={banGhiSua}
        onDong={() => setHienForm(false)}
        onLuu={xuLyLuu}
      />
    </div>
  );
};

export default TabQuanLyBaiViet;
