import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Input, Select, Tag, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuTask } from '../types';
import { DS_TRANG_THAI, TEN_TRANG_THAI, MAU_TRANG_THAI, TEN_MUC_DO, MAU_MUC_DO } from '../constants';
import FormTask from './FormTask';

const TabDanhSach: React.FC = () => {
  const { danhSachTask, themTask, suaTask, xoaTask } = useModel('useModelCongViec' as any) as {
    danhSachTask: KieuTask[];
    themTask: (t: any) => void;
    suaTask: (id: string, dl: any) => void;
    xoaTask: (id: string) => void;
  };

  const [hienForm, setHienForm] = useState(false);
  const [banGhiSua, setBanGhiSua] = useState<KieuTask | null>(null);
  const [timKiem, setTimKiem] = useState('');
  const [locTrangThai, setLocTrangThai] = useState<string | undefined>(undefined);

  const duLieuLoc = useMemo(() => {
    let ds = [...danhSachTask];
    if (timKiem) {
      const tk = timKiem.toLowerCase();
      ds = ds.filter((t) => t.tenTask.toLowerCase().includes(tk));
    }
    if (locTrangThai) {
      ds = ds.filter((t) => t.trangThai === locTrangThai);
    }
    return ds;
  }, [danhSachTask, timKiem, locTrangThai]);

  const homNay = new Date().toISOString().split('T')[0];

  const columns = [
    {
      title: 'Tên task',
      dataIndex: 'tenTask',
      ellipsis: true,
      sorter: (a: KieuTask, b: KieuTask) => a.tenTask.localeCompare(b.tenTask),
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      width: 120,
      sorter: (a: KieuTask, b: KieuTask) => a.deadline.localeCompare(b.deadline),
      render: (v: string, record: KieuTask) => (
        <span style={{ color: v < homNay && record.trangThai !== 'HoanThanh' ? '#ff4d4f' : undefined }}>
          {v}
        </span>
      ),
    },
    {
      title: 'Mức độ',
      dataIndex: 'mucDoUuTien',
      width: 120,
      render: (v: string) => <Tag color={MAU_MUC_DO[v]}>{TEN_MUC_DO[v]}</Tag>,
      sorter: (a: KieuTask, b: KieuTask) => {
        const thu = { Cao: 1, TrungBinh: 2, Thap: 3 };
        return (thu[a.mucDoUuTien] || 0) - (thu[b.mucDoUuTien] || 0);
      },
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      width: 100,
      render: (v: string) => <Tag color="purple">{v}</Tag>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      width: 130,
      render: (v: string) => <Tag color={MAU_TRANG_THAI[v]}>{TEN_TRANG_THAI[v]}</Tag>,
    },
    {
      title: 'Thao tác',
      width: 120,
      render: (_: any, record: KieuTask) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setBanGhiSua(record); setHienForm(true); }} />
          <Popconfirm title="Xác nhận xóa task?" onConfirm={() => xoaTask(record.id)} okText="Xóa" cancelText="Hủy">
            <Button size="small" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16, flexWrap: 'wrap' }}>
        <Input
          placeholder="Tìm kiếm theo tên..."
          prefix={<SearchOutlined />}
          value={timKiem}
          onChange={(e) => setTimKiem(e.target.value)}
          style={{ width: 220 }}
          allowClear
        />
        <Select
          placeholder="Lọc trạng thái"
          value={locTrangThai}
          onChange={setLocTrangThai}
          options={DS_TRANG_THAI}
          style={{ width: 160 }}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setBanGhiSua(null); setHienForm(true); }}>
          Thêm task
        </Button>
      </Space>

      <Table
        dataSource={duLieuLoc}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />

      <FormTask
        hienThi={hienForm}
        banGhiSua={banGhiSua}
        onDong={() => { setHienForm(false); setBanGhiSua(null); }}
        onLuu={(duLieu) => {
          if (banGhiSua) suaTask(banGhiSua.id, duLieu);
          else themTask(duLieu);
          setHienForm(false);
          setBanGhiSua(null);
        }}
      />
    </div>
  );
};

export default TabDanhSach;
