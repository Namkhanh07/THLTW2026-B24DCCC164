import React, { useState, useMemo } from 'react';
import { Select, Empty, Row, Col, Card, Statistic, Alert, Typography, Table, Tag } from 'antd';
import { DollarOutlined, WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import ReactApexChart from 'react-apexcharts';
import type { KieuLichTrinh } from '../types';
import { TEN_HANG_MUC, MAU_HANG_MUC } from '../constants';

const { Title, Text } = Typography;

const TabNganSach: React.FC = () => {
  const { danhSachLichTrinh, tinhTongChiPhi } = useModel('useModelDuLich' as any);
  const [idLichTrinhChon, setIdLichTrinhChon] = useState<string | undefined>(undefined);

  const lichTrinhHienTai: KieuLichTrinh | undefined = danhSachLichTrinh.find(
    (lt: KieuLichTrinh) => lt.id === idLichTrinhChon,
  );

  const chiPhi = useMemo(() => {
    if (!lichTrinhHienTai) return null;
    return tinhTongChiPhi(lichTrinhHienTai);
  }, [lichTrinhHienTai, tinhTongChiPhi]);

  const vuotNganSach = lichTrinhHienTai && chiPhi ? chiPhi.tongCong > lichTrinhHienTai.nganSachDuKien : false;
  const phanTramVuot = lichTrinhHienTai && chiPhi && lichTrinhHienTai.nganSachDuKien > 0
    ? Math.round(((chiPhi.tongCong - lichTrinhHienTai.nganSachDuKien) / lichTrinhHienTai.nganSachDuKien) * 100)
    : 0;

  const dinhDangTien = (so: number) => so.toLocaleString('vi-VN') + 'đ';

  const tongQuanTatCa = useMemo(() => {
    return danhSachLichTrinh.map((lt: KieuLichTrinh) => {
      const cp = tinhTongChiPhi(lt);
      return {
        key: lt.id,
        ten: lt.tenLichTrinh,
        ngay: `${lt.ngayBatDau} → ${lt.ngayKetThuc}`,
        nganSach: lt.nganSachDuKien,
        tongChi: cp.tongCong,
        trangThai: cp.tongCong > lt.nganSachDuKien ? 'vuot' : 'trong',
      };
    });
  }, [danhSachLichTrinh, tinhTongChiPhi]);

  const cauHinhDonut: any = chiPhi ? {
    series: [chiPhi.tongAnUong, chiPhi.tongLuuTru, chiPhi.tongDiChuyen],
    options: {
      chart: { type: 'donut', height: 350 },
      labels: [TEN_HANG_MUC.anUong, TEN_HANG_MUC.luuTru, TEN_HANG_MUC.diChuyen],
      colors: [MAU_HANG_MUC.anUong, MAU_HANG_MUC.luuTru, MAU_HANG_MUC.diChuyen],
      legend: { position: 'bottom' as const },
      title: {
        text: 'Phân bổ ngân sách theo hạng mục',
        align: 'center' as const,
        style: { fontSize: '16px', fontWeight: 'bold' },
      },
      tooltip: {
        y: { formatter: (val: number) => dinhDangTien(val) },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Tổng chi',
                formatter: () => dinhDangTien(chiPhi.tongCong),
              },
            },
          },
        },
      },
    },
  } : null;

  const cotBangTongQuan = [
    { title: 'Lịch trình', dataIndex: 'ten', key: 'ten' },
    { title: 'Thời gian', dataIndex: 'ngay', key: 'ngay', responsive: ['md'] as any },
    {
      title: 'Ngân sách',
      dataIndex: 'nganSach',
      key: 'nganSach',
      render: (v: number) => dinhDangTien(v),
    },
    {
      title: 'Tổng chi',
      dataIndex: 'tongChi',
      key: 'tongChi',
      render: (v: number, r: any) => (
        <Text style={{ color: r.trangThai === 'vuot' ? '#ff4d4f' : '#52c41a', fontWeight: 'bold' }}>
          {dinhDangTien(v)}
        </Text>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (v: string) => v === 'vuot'
        ? <Tag color="red">Vượt ngân sách</Tag>
        : <Tag color="green">Trong ngân sách</Tag>,
    },
  ];

  return (
    <div>
      <Title level={5}><DollarOutlined /> Tổng quan ngân sách tất cả lịch trình</Title>

      {danhSachLichTrinh.length === 0 ? (
        <Empty description="Chưa có lịch trình nào. Hãy tạo lịch trình ở tab Lịch trình trước." />
      ) : (
        <>
          <Table
            size="small"
            bordered
            dataSource={tongQuanTatCa}
            columns={cotBangTongQuan}
            pagination={false}
            style={{ marginBottom: 24 }}
            onRow={(record) => ({
              onClick: () => setIdLichTrinhChon(record.key),
              style: { cursor: 'pointer', background: record.key === idLichTrinhChon ? '#e6f7ff' : undefined },
            })}
            scroll={{ x: 600 }}
          />

          <Card size="small" style={{ marginBottom: 16, background: '#fffbe6', border: '1px solid #ffe58f' }}>
            <InfoCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
            <Text>Nhấn vào 1 dòng trong bảng trên hoặc chọn từ danh sách dưới đây để xem chi tiết ngân sách.</Text>
          </Card>

          <Select
            placeholder="-- Chọn lịch trình để xem chi tiết --"
            style={{ width: '100%', maxWidth: 400, marginBottom: 16 }}
            allowClear
            value={idLichTrinhChon}
            onChange={setIdLichTrinhChon}
          >
            {danhSachLichTrinh.map((lt: KieuLichTrinh) => (
              <Select.Option key={lt.id} value={lt.id}>
                {lt.tenLichTrinh}
              </Select.Option>
            ))}
          </Select>
        </>
      )}

      {lichTrinhHienTai && chiPhi && (
        <>
          <Title level={5} style={{ marginTop: 8 }}>
            Chi tiết ngân sách: {lichTrinhHienTai.tenLichTrinh}
          </Title>

          {vuotNganSach && (
            <Alert
              type="error"
              showIcon
              icon={<WarningOutlined />}
              message="Cảnh báo: Vượt ngân sách!"
              description={`Tổng chi (${dinhDangTien(chiPhi.tongCong)}) đã vượt ngân sách dự kiến (${dinhDangTien(lichTrinhHienTai.nganSachDuKien)}) khoảng ${phanTramVuot}%. Hãy cân nhắc bỏ bớt điểm đến.`}
              style={{ marginBottom: 16 }}
            />
          )}
          {!vuotNganSach && chiPhi.tongCong > 0 && (
            <Alert
              type="success"
              showIcon
              message="Trong ngân sách"
              description={`Bạn còn dư ${dinhDangTien(lichTrinhHienTai.nganSachDuKien - chiPhi.tongCong)} so với ngân sách dự kiến.`}
              style={{ marginBottom: 16 }}
            />
          )}

          <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
            <Col xs={12} sm={6}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <Statistic title="Ngân sách dự kiến" value={lichTrinhHienTai.nganSachDuKien} suffix="đ" valueStyle={{ fontSize: 14 }} prefix={<DollarOutlined />} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card size="small" style={{ textAlign: 'center', borderTop: `3px solid ${MAU_HANG_MUC.anUong}` }}>
                <Statistic title={TEN_HANG_MUC.anUong} value={chiPhi.tongAnUong} suffix="đ" valueStyle={{ fontSize: 14, color: MAU_HANG_MUC.anUong }} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card size="small" style={{ textAlign: 'center', borderTop: `3px solid ${MAU_HANG_MUC.luuTru}` }}>
                <Statistic title={TEN_HANG_MUC.luuTru} value={chiPhi.tongLuuTru} suffix="đ" valueStyle={{ fontSize: 14, color: MAU_HANG_MUC.luuTru }} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card size="small" style={{ textAlign: 'center', borderTop: `3px solid ${MAU_HANG_MUC.diChuyen}` }}>
                <Statistic title={TEN_HANG_MUC.diChuyen} value={chiPhi.tongDiChuyen} suffix="đ" valueStyle={{ fontSize: 14, color: MAU_HANG_MUC.diChuyen }} />
              </Card>
            </Col>
          </Row>

          {cauHinhDonut && chiPhi.tongCong > 0 && (
            <Card>
              <ReactApexChart
                options={cauHinhDonut.options}
                series={cauHinhDonut.series}
                type="donut"
                height={350}
              />
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default TabNganSach;
