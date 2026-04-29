import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Input, Select, Tag, Popconfirm, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuBuoiTap } from '../types';
import { DS_LOAI_BAI_TAP } from '../constants';
import FormBuoiTap from './FormBuoiTap';
import moment from 'moment';

const { RangePicker } = DatePicker;

const TabNhatKyTapLuyen: React.FC = () => {
  const { danhSachBuoiTap, themBuoiTap, suaBuoiTap, xoaBuoiTap } = useModel('useModelTheDuc' as any) as {
    danhSachBuoiTap: KieuBuoiTap[];
    themBuoiTap: (bt: any) => void;
    suaBuoiTap: (id: string, dl: any) => void;
    xoaBuoiTap: (id: string) => void;
  };

  const [hienForm, setHienForm] = useState(false);
  const [banGhiSua, setBanGhiSua] = useState<KieuBuoiTap | null>(null);
  const [timKiem, setTimKiem] = useState('');
  const [locLoaiBaiTap, setLocLoaiBaiTap] = useState<string | undefined>(undefined);
  const [khoangThoiGian, setKhoangThoiGian] = useState<[moment.Moment, moment.Moment] | null>(null);

  const duLieuLoc = useMemo(() => {
    let ds = [...danhSachBuoiTap];
    if (timKiem) {
      const tk = timKiem.toLowerCase();
      ds = ds.filter((bt) => bt.loaiBaiTap.toLowerCase().includes(tk) || bt.ghiChu.toLowerCase().includes(tk));
    }
    if (locLoaiBaiTap) {
      ds = ds.filter((bt) => bt.loaiBaiTap === locLoaiBaiTap);
    }
    if (khoangThoiGian) {
      ds = ds.filter((bt) => {
        const ngay = moment(bt.ngay);
        return ngay.isSameOrAfter(khoangThoiGian[0], 'day') && ngay.isSameOrBefore(khoangThoiGian[1], 'day');
      });
    }
    return ds.sort((a, b) => new Date(b.ngay).getTime() - new Date(a.ngay).getTime());
  }, [danhSachBuoiTap, timKiem, locLoaiBaiTap, khoangThoiGian]);

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'ngay',
      width: 120,
      sorter: (a: KieuBuoiTap, b: KieuBuoiTap) => new Date(a.ngay).getTime() - new Date(b.ngay).getTime(),
    },
    { title: 'Loại bài tập', dataIndex: 'loaiBaiTap', width: 120, render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: 'Thời lượng (phút)', dataIndex: 'thoiLuong', width: 140, sorter: (a: KieuBuoiTap, b: KieuBuoiTap) => a.thoiLuong - b.thoiLuong },
    { title: 'Calo đốt', dataIndex: 'caloDot', width: 110, sorter: (a: KieuBuoiTap, b: KieuBuoiTap) => a.caloDot - b.caloDot },
    { title: 'Ghi chú', dataIndex: 'ghiChu', ellipsis: true },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      width: 130,
      render: (v: string) => (
        <Tag color={v === 'HoanThanh' ? 'green' : 'red'}>
          {v === 'HoanThanh' ? 'Hoàn thành' : 'Bỏ lỡ'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      width: 140,
      render: (_: any, record: KieuBuoiTap) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setBanGhiSua(record); setHienForm(true); }} />
          <Popconfirm title="Xác nhận xóa buổi tập này?" onConfirm={() => xoaBuoiTap(record.id)} okText="Xóa" cancelText="Hủy">
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
          placeholder="Tìm kiếm bài tập..."
          prefix={<SearchOutlined />}
          value={timKiem}
          onChange={(e) => setTimKiem(e.target.value)}
          style={{ width: 200 }}
          allowClear
        />
        <Select
          placeholder="Lọc loại bài tập"
          value={locLoaiBaiTap}
          onChange={setLocLoaiBaiTap}
          options={DS_LOAI_BAI_TAP}
          style={{ width: 160 }}
          allowClear
        />
        <RangePicker
          onChange={(dates) => setKhoangThoiGian(dates as any)}
          format="YYYY-MM-DD"
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setBanGhiSua(null); setHienForm(true); }}>
          Thêm buổi tập
        </Button>
      </Space>

      <Table
        dataSource={duLieuLoc}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />

      <FormBuoiTap
        hienThi={hienForm}
        banGhiSua={banGhiSua}
        onDong={() => { setHienForm(false); setBanGhiSua(null); }}
        onLuu={(duLieu) => {
          if (banGhiSua) suaBuoiTap(banGhiSua.id, duLieu);
          else themBuoiTap(duLieu);
          setHienForm(false);
          setBanGhiSua(null);
        }}
      />
    </div>
  );
};

export default TabNhatKyTapLuyen;
