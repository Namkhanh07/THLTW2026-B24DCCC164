import React, { useMemo } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import {
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import ReactApexChart from 'react-apexcharts';
import type { KieuDonDangKy, KieuCauLacBo } from '../types';

const TabBaoCao: React.FC = () => {
  const { danhSachDon, danhSachCLB } = useModel('useModelCLB' as any);

  const tongPending = danhSachDon.filter(
    (d: KieuDonDangKy) => d.trangThai === 'Pending',
  ).length;
  const tongApproved = danhSachDon.filter(
    (d: KieuDonDangKy) => d.trangThai === 'Approved',
  ).length;
  const tongRejected = danhSachDon.filter(
    (d: KieuDonDangKy) => d.trangThai === 'Rejected',
  ).length;

  const duLieuBieuDo = useMemo(() => {
    const danhSachTenCLB = danhSachCLB.map((clb: KieuCauLacBo) => clb.tenCLB);
    const soLuongPending = danhSachCLB.map(
      (clb: KieuCauLacBo) =>
        danhSachDon.filter(
          (d: KieuDonDangKy) => d.idCLB === clb.id && d.trangThai === 'Pending',
        ).length,
    );
    const soLuongApproved = danhSachCLB.map(
      (clb: KieuCauLacBo) =>
        danhSachDon.filter(
          (d: KieuDonDangKy) => d.idCLB === clb.id && d.trangThai === 'Approved',
        ).length,
    );
    const soLuongRejected = danhSachCLB.map(
      (clb: KieuCauLacBo) =>
        danhSachDon.filter(
          (d: KieuDonDangKy) => d.idCLB === clb.id && d.trangThai === 'Rejected',
        ).length,
    );

    return {
      danhSachTenCLB,
      soLuongPending,
      soLuongApproved,
      soLuongRejected,
    };
  }, [danhSachCLB, danhSachDon]);

  const cauHinhBieuDo: any = {
    series: [
      { name: 'Pending (Đang chờ)', data: duLieuBieuDo.soLuongPending },
      { name: 'Approved (Đã duyệt)', data: duLieuBieuDo.soLuongApproved },
      { name: 'Rejected (Từ chối)', data: duLieuBieuDo.soLuongRejected },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 380,
        toolbar: { show: true },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
        },
      },
      dataLabels: { enabled: true },
      xaxis: {
        categories: duLieuBieuDo.danhSachTenCLB,
        title: { text: 'Câu lạc bộ' },
      },
      yaxis: {
        title: { text: 'Số đơn đăng ký' },
        forceNiceScale: true,
      },
      colors: ['#faad14', '#52c41a', '#ff4d4f'],
      legend: { position: 'top' as const },
      title: {
        text: 'Biểu đồ số đơn đăng ký theo từng CLB',
        align: 'center' as const,
        style: { fontSize: '16px', fontWeight: 'bold' },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Tổng số CLB"
              value={danhSachCLB.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Đơn Pending"
              value={tongPending}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Đơn Approved"
              value={tongApproved}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Đơn Rejected"
              value={tongRejected}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        {danhSachCLB.length > 0 ? (
          <ReactApexChart
            options={cauHinhBieuDo.options}
            series={cauHinhBieuDo.series}
            type="bar"
            height={380}
          />
        ) : (
          <p style={{ textAlign: 'center', color: '#999' }}>
            Chưa có dữ liệu CLB để hiển thị biểu đồ.
          </p>
        )}
      </Card>
    </div>
  );
};

export default TabBaoCao;