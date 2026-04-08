import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Popconfirm, Tag, Rate, Divider, Row, Col, Card, Statistic } from 'antd';
import { PlusOutlined, BarChartOutlined, ReloadOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import ReactApexChart from 'react-apexcharts';
import type { KieuDiemDen, KieuLichTrinh } from '../types';
import { TEN_LOAI_HINH, TEN_HANG_MUC, MAU_HANG_MUC } from '../constants';
import FormDiemDen from './FormDiemDen';

const TabQuanTri: React.FC = () => {
  const {
    danhSachDiemDen,
    danhSachLichTrinh,
    themDiemDen,
    suaDiemDen,
    xoaDiemDen,
    tinhTongChiPhi,
    khoiPhucDuLieuGoc,
  } = useModel('useModelDuLich' as any);

  const [hienForm, setHienForm] = useState(false);
  const [banGhiSua, setBanGhiSua] = useState<KieuDiemDen | null>(null);

  const moFormThem = () => { setBanGhiSua(null); setHienForm(true); };
  const moFormSua = (bg: KieuDiemDen) => { setBanGhiSua(bg); setHienForm(true); };
  const xuLyLuu = (duLieu: any) => {
    if (banGhiSua) suaDiemDen(banGhiSua.id, duLieu);
    else themDiemDen(duLieu);
    setHienForm(false);
  };

  const dinhDangTien = (so: number) => so.toLocaleString('vi-VN');
  const mauLoaiHinh: Record<string, string> = { bien: 'blue', nui: 'green', thanhPho: 'orange' };

  const cauHinhCot = [
    {
      title: 'Ảnh',
      dataIndex: 'hinhAnh',
      width: 60,
      render: (src: string) => (
        <img src={src || 'https://via.placeholder.com/40'} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
      ),
    },
    { title: 'Tên', dataIndex: 'ten', sorter: (a: KieuDiemDen, b: KieuDiemDen) => a.ten.localeCompare(b.ten) },
    {
      title: 'Loại',
      dataIndex: 'loaiHinh',
      width: 100,
      filters: [{ text: 'Biển', value: 'bien' }, { text: 'Núi', value: 'nui' }, { text: 'TP', value: 'thanhPho' }],
      onFilter: (value: any, record: KieuDiemDen) => record.loaiHinh === value,
      render: (loai: string) => <Tag color={mauLoaiHinh[loai]}>{TEN_LOAI_HINH[loai]}</Tag>,
    },
    { title: 'Rating', dataIndex: 'danhGia', width: 140, render: (dg: number) => <Rate disabled value={dg} allowHalf style={{ fontSize: 12 }} />, sorter: (a: KieuDiemDen, b: KieuDiemDen) => a.danhGia - b.danhGia },
    { title: 'Ăn uống', dataIndex: 'chiPhiAnUong', width: 110, render: dinhDangTien, sorter: (a: KieuDiemDen, b: KieuDiemDen) => a.chiPhiAnUong - b.chiPhiAnUong },
    { title: 'Lưu trú', dataIndex: 'chiPhiLuuTru', width: 110, render: dinhDangTien, sorter: (a: KieuDiemDen, b: KieuDiemDen) => a.chiPhiLuuTru - b.chiPhiLuuTru },
    { title: 'Di chuyển', dataIndex: 'chiPhiDiChuyen', width: 110, render: dinhDangTien, sorter: (a: KieuDiemDen, b: KieuDiemDen) => a.chiPhiDiChuyen - b.chiPhiDiChuyen },
    {
      title: 'Thao tác',
      width: 140,
      align: 'center' as const,
      render: (_: any, bg: KieuDiemDen) => (
        <Space>
          <Button type="link" size="small" onClick={() => moFormSua(bg)}>Sửa</Button>
          <Popconfirm title="Xóa điểm đến này?" onConfirm={() => xoaDiemDen(bg.id)} okText="Xóa" cancelText="Hủy">
            <Button type="link" size="small" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const thongKeLichTrinhTheoThang = useMemo(() => {
    const demThang: Record<string, number> = {};
    danhSachLichTrinh.forEach((lt: KieuLichTrinh) => {
      const thang = lt.ngayTao.substring(0, 7);
      demThang[thang] = (demThang[thang] || 0) + 1;
    });
    const danhSachThang = Object.keys(demThang).sort();
    return { categories: danhSachThang, data: danhSachThang.map((t) => demThang[t]) };
  }, [danhSachLichTrinh]);

  const thongKeDiemDenPhoBien = useMemo(() => {
    const demDD: Record<string, number> = {};
    danhSachLichTrinh.forEach((lt: KieuLichTrinh) => {
      lt.danhSachNgay.forEach((ngay) => {
        ngay.danhSachDiemDenId.forEach((idDD) => {
          demDD[idDD] = (demDD[idDD] || 0) + 1;
        });
      });
    });
    const dsSapXep = Object.entries(demDD)
      .map(([id, soLan]) => ({ ten: danhSachDiemDen.find((dd: KieuDiemDen) => dd.id === id)?.ten || id, soLan }))
      .sort((a, b) => b.soLan - a.soLan)
      .slice(0, 8);
    return { categories: dsSapXep.map((d) => d.ten), data: dsSapXep.map((d) => d.soLan) };
  }, [danhSachLichTrinh, danhSachDiemDen]);

  const thongKeTien = useMemo(() => {
    let tongThu = 0;
    let tongAnUong = 0;
    let tongLuuTru = 0;
    let tongDiChuyen = 0;
    danhSachLichTrinh.forEach((lt: KieuLichTrinh) => {
      const cp = tinhTongChiPhi(lt);
      tongThu += cp.tongCong;
      tongAnUong += cp.tongAnUong;
      tongLuuTru += cp.tongLuuTru;
      tongDiChuyen += cp.tongDiChuyen;
    });
    return { tongThu, tongAnUong, tongLuuTru, tongDiChuyen };
  }, [danhSachLichTrinh, tinhTongChiPhi]);

  const cauHinhCotThang: any = {
    series: [{ name: 'Lịch trình', data: thongKeLichTrinhTheoThang.data }],
    options: {
      chart: { type: 'bar', height: 300, toolbar: { show: false } },
      xaxis: { categories: thongKeLichTrinhTheoThang.categories, title: { text: 'Tháng' } },
      yaxis: { title: { text: 'Số lịch trình' }, forceNiceScale: true },
      colors: ['#1890ff'],
      title: { text: 'Số lịch trình tạo theo tháng', align: 'center' as const, style: { fontSize: '14px' } },
      dataLabels: { enabled: true },
    },
  };

  const cauHinhBarPhoBien: any = {
    series: [{ name: 'Lượt chọn', data: thongKeDiemDenPhoBien.data }],
    options: {
      chart: { type: 'bar', height: 300, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
      xaxis: { title: { text: 'Số lượt' } },
      yaxis: { categories: thongKeDiemDenPhoBien.categories },
      colors: ['#52c41a'],
      title: { text: 'Điểm đến phổ biến nhất', align: 'center' as const, style: { fontSize: '14px' } },
      dataLabels: { enabled: true },
      labels: thongKeDiemDenPhoBien.categories,
    },
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={moFormThem}>Thêm điểm đến</Button>
        <Popconfirm title="Xác nhận khôi phục dữ liệu gốc?" onConfirm={khoiPhucDuLieuGoc}>
          <Button icon={<ReloadOutlined />}>Khôi phục mặc định</Button>
        </Popconfirm>
      </Space>

      <Table
        bordered
        size="small"
        dataSource={danhSachDiemDen}
        rowKey="id"
        columns={cauHinhCot}
        pagination={{ pageSize: 5, showSizeChanger: true, showTotal: (tong: number) => `Tổng: ${tong} điểm đến` }}
        scroll={{ x: 800 }}
      />

      <Divider><BarChartOutlined /> Thống kê</Divider>

      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="Tổng doanh thu" value={thongKeTien.tongThu} suffix="đ" valueStyle={{ fontSize: 14, color: '#1890ff' }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title={TEN_HANG_MUC.anUong} value={thongKeTien.tongAnUong} suffix="đ" valueStyle={{ fontSize: 14, color: MAU_HANG_MUC.anUong }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title={TEN_HANG_MUC.luuTru} value={thongKeTien.tongLuuTru} suffix="đ" valueStyle={{ fontSize: 14, color: MAU_HANG_MUC.luuTru }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title={TEN_HANG_MUC.diChuyen} value={thongKeTien.tongDiChuyen} suffix="đ" valueStyle={{ fontSize: 14, color: MAU_HANG_MUC.diChuyen }} /></Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card>
            {thongKeLichTrinhTheoThang.data.length > 0 ? (
              <ReactApexChart options={cauHinhCotThang.options} series={cauHinhCotThang.series} type="bar" height={300} />
            ) : (
              <p style={{ textAlign: 'center', color: '#999' }}>Chưa có dữ liệu</p>
            )}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            {thongKeDiemDenPhoBien.data.length > 0 ? (
              <ReactApexChart options={cauHinhBarPhoBien.options} series={cauHinhBarPhoBien.series} type="bar" height={300} />
            ) : (
              <p style={{ textAlign: 'center', color: '#999' }}>Chưa có dữ liệu</p>
            )}
          </Card>
        </Col>
      </Row>

      <FormDiemDen
        hienThi={hienForm}
        banGhiSua={banGhiSua}
        onDong={() => setHienForm(false)}
        onLuu={xuLyLuu}
      />
    </div>
  );
};

export default TabQuanTri;
