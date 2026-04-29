import React, { useMemo } from 'react';
import { Row, Col, Card, Statistic, Timeline, Tag, Typography } from 'antd';
import {
  CalendarOutlined,
  FireOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import ReactApexChart from 'react-apexcharts';
import type { KieuBuoiTap, KieuChiSoSucKhoe, KieuMucTieu } from '../types';

const TabDashboard: React.FC = () => {
  const { danhSachBuoiTap, danhSachChiSo, danhSachMucTieu } = useModel('useModelTheDuc' as any) as {
    danhSachBuoiTap: KieuBuoiTap[];
    danhSachChiSo: KieuChiSoSucKhoe[];
    danhSachMucTieu: KieuMucTieu[];
  };

  const thangHienTai = useMemo(() => {
    const now = new Date();
    return { nam: now.getFullYear(), thang: now.getMonth() };
  }, []);

  const buoiTapTrongThang = useMemo(() => {
    return danhSachBuoiTap.filter((bt) => {
      const d = new Date(bt.ngay);
      return d.getFullYear() === thangHienTai.nam && d.getMonth() === thangHienTai.thang && bt.trangThai === 'HoanThanh';
    });
  }, [danhSachBuoiTap, thangHienTai]);

  const tongBuoiTap = buoiTapTrongThang.length;

  const tongCalo = useMemo(() => buoiTapTrongThang.reduce((s, bt) => s + bt.caloDot, 0), [buoiTapTrongThang]);

  const streak = useMemo(() => {
    const sorted = [...danhSachBuoiTap]
      .filter((bt) => bt.trangThai === 'HoanThanh')
      .sort((a, b) => new Date(b.ngay).getTime() - new Date(a.ngay).getTime());
    if (sorted.length === 0) return 0;
    let dem = 1;
    for (let i = 0; i < sorted.length - 1; i++) {
      const d1 = new Date(sorted[i].ngay);
      const d2 = new Date(sorted[i + 1].ngay);
      const chenhLech = (d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
      if (chenhLech === 1) dem++;
      else break;
    }
    return dem;
  }, [danhSachBuoiTap]);

  const phanTramMucTieu = useMemo(() => {
    const daDat = danhSachMucTieu.filter((mt) => mt.trangThai === 'DaDat').length;
    const tong = danhSachMucTieu.length;
    return tong > 0 ? Math.round((daDat / tong) * 100) : 0;
  }, [danhSachMucTieu]);

  const duLieuBieuDoCot = useMemo(() => {
    const tuanData: number[] = [0, 0, 0, 0, 0];
    buoiTapTrongThang.forEach((bt) => {
      const ngay = new Date(bt.ngay).getDate();
      const tuan = Math.min(Math.floor((ngay - 1) / 7), 4);
      tuanData[tuan]++;
    });
    return tuanData;
  }, [buoiTapTrongThang]);

  const duLieuCanNang = useMemo(() => {
    const sorted = [...danhSachChiSo].sort((a, b) => new Date(a.ngay).getTime() - new Date(b.ngay).getTime());
    return {
      ngay: sorted.map((cs) => cs.ngay),
      canNang: sorted.map((cs) => cs.canNang),
    };
  }, [danhSachChiSo]);

  const namBuoiTapGanNhat = useMemo(() => {
    return [...danhSachBuoiTap]
      .sort((a, b) => new Date(b.ngay).getTime() - new Date(a.ngay).getTime())
      .slice(0, 5);
  }, [danhSachBuoiTap]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng buổi tập trong tháng"
              value={tongBuoiTap}
              prefix={<CalendarOutlined style={{ color: '#1890ff' }} />}
              suffix="buổi"
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng calo đã đốt"
              value={tongCalo}
              prefix={<FireOutlined style={{ color: '#ff4d4f' }} />}
              suffix="kcal"
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Ngày tập liên tiếp"
              value={streak}
              prefix={<ThunderboltOutlined style={{ color: '#faad14' }} />}
              suffix="ngày"
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Mục tiêu hoàn thành"
              value={phanTramMucTieu}
              prefix={<TrophyOutlined style={{ color: '#52c41a' }} />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="Số buổi tập theo tuần trong tháng">
            <ReactApexChart
              type="bar"
              height={280}
              options={{
                chart: { toolbar: { show: false } },
                xaxis: { categories: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'] },
                colors: ['#1890ff'],
                plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
              }}
              series={[{ name: 'Buổi tập', data: duLieuBieuDoCot }]}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Thay đổi cân nặng theo thời gian">
            <ReactApexChart
              type="line"
              height={280}
              options={{
                chart: { toolbar: { show: false } },
                xaxis: { categories: duLieuCanNang.ngay },
                colors: ['#52c41a'],
                stroke: { curve: 'smooth', width: 3 },
                markers: { size: 5 },
                yaxis: { title: { text: 'Cân nặng (kg)' } },
              }}
              series={[{ name: 'Cân nặng', data: duLieuCanNang.canNang }]}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="5 buổi tập gần nhất">
            <Timeline>
              {namBuoiTapGanNhat.map((bt) => (
                <Timeline.Item
                  key={bt.id}
                  color={bt.trangThai === 'HoanThanh' ? 'green' : 'red'}
                  dot={bt.trangThai === 'HoanThanh' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                >
                  <div>
                    <Typography.Text strong>{bt.ngay}</Typography.Text>
                    {' — '}
                    <Tag color="blue">{bt.loaiBaiTap}</Tag>
                    <Tag color={bt.trangThai === 'HoanThanh' ? 'green' : 'red'}>
                      {bt.trangThai === 'HoanThanh' ? 'Hoàn thành' : 'Bỏ lỡ'}
                    </Tag>
                    <span>{bt.thoiLuong} phút — {bt.caloDot} kcal</span>
                    {bt.ghiChu && <Typography.Text type="secondary"> ({bt.ghiChu})</Typography.Text>}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TabDashboard;
