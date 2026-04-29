import React, { useState } from 'react';
import { Table, Button, Space, Tag, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuChiSoSucKhoe } from '../types';
import FormChiSo from './FormChiSo';

const layPhanLoaiBMI = (bmi: number): { text: string; color: string } => {
  if (bmi < 18.5) return { text: 'Thiếu cân', color: 'blue' };
  if (bmi <= 24.9) return { text: 'Bình thường', color: 'green' };
  if (bmi <= 29.9) return { text: 'Thừa cân', color: 'gold' };
  return { text: 'Béo phì', color: 'red' };
};

const TabChiSoSucKhoe: React.FC = () => {
  const { danhSachChiSo, themChiSo, suaChiSo, xoaChiSo } = useModel('useModelTheDuc' as any) as {
    danhSachChiSo: KieuChiSoSucKhoe[];
    themChiSo: (cs: any) => void;
    suaChiSo: (id: string, dl: any) => void;
    xoaChiSo: (id: string) => void;
  };

  const [hienForm, setHienForm] = useState(false);
  const [banGhiSua, setBanGhiSua] = useState<KieuChiSoSucKhoe | null>(null);

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'ngay',
      width: 120,
      sorter: (a: KieuChiSoSucKhoe, b: KieuChiSoSucKhoe) => new Date(a.ngay).getTime() - new Date(b.ngay).getTime(),
      defaultSortOrder: 'descend' as const,
    },
    { title: 'Cân nặng (kg)', dataIndex: 'canNang', width: 130 },
    { title: 'Chiều cao (cm)', dataIndex: 'chieuCao', width: 130 },
    {
      title: 'BMI',
      dataIndex: 'bmi',
      width: 180,
      render: (bmi: number) => {
        const pl = layPhanLoaiBMI(bmi);
        return (
          <span>
            {bmi} <Tag color={pl.color}>{pl.text}</Tag>
          </span>
        );
      },
    },
    { title: 'Nhịp tim (bpm)', dataIndex: 'nhipTim', width: 130 },
    { title: 'Giờ ngủ', dataIndex: 'gioNgu', width: 100 },
    {
      title: 'Thao tác',
      width: 140,
      render: (_: any, record: KieuChiSoSucKhoe) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setBanGhiSua(record); setHienForm(true); }} />
          <Popconfirm title="Xác nhận xóa chỉ số này?" onConfirm={() => xoaChiSo(record.id)} okText="Xóa" cancelText="Hủy">
            <Button size="small" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setBanGhiSua(null); setHienForm(true); }}>
          Thêm chỉ số
        </Button>
      </div>

      <Table
        dataSource={[...danhSachChiSo].sort((a, b) => new Date(b.ngay).getTime() - new Date(a.ngay).getTime())}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />

      <FormChiSo
        hienThi={hienForm}
        banGhiSua={banGhiSua}
        onDong={() => { setHienForm(false); setBanGhiSua(null); }}
        onLuu={(duLieu) => {
          if (banGhiSua) suaChiSo(banGhiSua.id, duLieu);
          else themChiSo(duLieu);
          setHienForm(false);
          setBanGhiSua(null);
        }}
      />
    </div>
  );
};

export default TabChiSoSucKhoe;
