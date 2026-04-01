import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Input, Avatar, Popconfirm, Modal, Tag } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuCauLacBo } from '../types';
import FormCauLacBo from './FormCauLacBo';

const TabCauLacBo: React.FC = () => {
  const { danhSachCLB, danhSachDon, themCLB, suaCLB, xoaCLB } = useModel('useModelCLB' as any);

  const [hienFormModal, setHienFormModal] = useState(false);
  const [banGhiDangSua, setBanGhiDangSua] = useState<KieuCauLacBo | null>(null);
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

  const duLieuDaLoc = useMemo(() => {
    if (!tuKhoaTimKiem.trim()) return danhSachCLB;
    const tuKhoa = tuKhoaTimKiem.toLowerCase();
    return danhSachCLB.filter(
      (clb: KieuCauLacBo) =>
        clb.tenCLB.toLowerCase().includes(tuKhoa) ||
        clb.chuNhiem.toLowerCase().includes(tuKhoa),
    );
  }, [danhSachCLB, tuKhoaTimKiem]);

  const moFormThemMoi = () => {
    setBanGhiDangSua(null);
    setHienFormModal(true);
  };

  const moFormChinhSua = (banGhi: KieuCauLacBo) => {
    setBanGhiDangSua(banGhi);
    setHienFormModal(true);
  };

  const xuLyLuuForm = (duLieu: any) => {
    if (banGhiDangSua) {
      suaCLB(banGhiDangSua.id, duLieu);
    } else {
      themCLB(duLieu);
    }
    setHienFormModal(false);
  };

  const xemThanhVienCLB = (idCLB: string, tenCLB: string) => {
    const dsThanhVien = danhSachDon.filter(
      (don: any) => don.idCLB === idCLB && don.trangThai === 'Approved',
    );
    Modal.info({
      title: `Thành viên của ${tenCLB} (${dsThanhVien.length} người)`,
      width: 500,
      content: (
        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
          {dsThanhVien.length === 0 ? (
            <p style={{ color: '#999' }}>Chưa có thành viên nào.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Họ tên</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>SĐT</th>
                </tr>
              </thead>
              <tbody>
                {dsThanhVien.map((tv: any) => (
                  <tr key={tv.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '8px' }}>{tv.hoTen}</td>
                    <td style={{ padding: '8px' }}>{tv.email}</td>
                    <td style={{ padding: '8px' }}>{tv.sdt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ),
    });
  };

  const cauHinhCot = [
    {
      title: 'Ảnh',
      dataIndex: 'anhDaiDien',
      width: 60,
      render: (src: string) => (
        <Avatar src={src || 'https://api.dicebear.com/7.x/identicon/svg?seed=default'} />
      ),
    },
    {
      title: 'Tên Câu lạc bộ',
      dataIndex: 'tenCLB',
      sorter: (a: KieuCauLacBo, b: KieuCauLacBo) => a.tenCLB.localeCompare(b.tenCLB),
    },
    {
      title: 'Ngày thành lập',
      dataIndex: 'ngayThanhLap',
      sorter: (a: KieuCauLacBo, b: KieuCauLacBo) =>
        a.ngayThanhLap.localeCompare(b.ngayThanhLap),
    },
    {
      title: 'Mô tả (HTML)',
      dataIndex: 'moTa',
      ellipsis: true,
      render: (html: string) => <div dangerouslySetInnerHTML={{ __html: html }} />,
    },
    {
      title: 'Chủ nhiệm',
      dataIndex: 'chuNhiem',
      sorter: (a: KieuCauLacBo, b: KieuCauLacBo) => a.chuNhiem.localeCompare(b.chuNhiem),
    },
    {
      title: 'Hoạt động',
      dataIndex: 'dangHoatDong',
      align: 'center' as const,
      filters: [
        { text: 'Có', value: true },
        { text: 'Không', value: false },
      ],
      onFilter: (value: any, record: KieuCauLacBo) => record.dangHoatDong === value,
      render: (dangHoatDong: boolean) => (
        <Tag color={dangHoatDong ? 'green' : 'default'}>
          {dangHoatDong ? 'Có' : 'Không'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      align: 'center' as const,
      width: 220,
      render: (_: any, banGhi: KieuCauLacBo) => (
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => xemThanhVienCLB(banGhi.id, banGhi.tenCLB)}
          >
            Thành viên
          </Button>
          <Button type="link" size="small" onClick={() => moFormChinhSua(banGhi)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa CLB này?"
            onConfirm={() => xoaCLB(banGhi.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" size="small" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Input.Search
          placeholder="Tìm theo tên CLB hoặc chủ nhiệm..."
          allowClear
          style={{ width: 350 }}
          prefix={<SearchOutlined />}
          onSearch={(giaTri) => setTuKhoaTimKiem(giaTri)}
          onChange={(e) => setTuKhoaTimKiem(e.target.value)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={moFormThemMoi}>
          Thêm mới CLB
        </Button>
      </Space>

      <Table
        bordered
        size="small"
        dataSource={duLieuDaLoc}
        rowKey="id"
        columns={cauHinhCot}
        pagination={{ pageSize: 5, showSizeChanger: true, showTotal: (tong) => `Tổng: ${tong} CLB` }}
      />

      <FormCauLacBo
        hienThi={hienFormModal}
        banGhiSua={banGhiDangSua}
        onDong={() => setHienFormModal(false)}
        onLuu={xuLyLuuForm}
      />
    </>
  );
};

export default TabCauLacBo;