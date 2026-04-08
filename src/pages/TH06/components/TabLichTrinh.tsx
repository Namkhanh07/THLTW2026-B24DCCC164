import React, { useState } from 'react';
import { Button, Select, Collapse, Tag, Space, Popconfirm, Empty, Card, Row, Col, Statistic, List, Typography, Steps } from 'antd';
import { PlusOutlined, DeleteOutlined, ClockCircleOutlined, DollarOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuLichTrinh, KieuDiemDen } from '../types';
import FormLichTrinh from './FormLichTrinh';

const { Panel } = Collapse;
const { Text, Title } = Typography;
const { Step } = Steps;

const TabLichTrinh: React.FC = () => {
  const {
    danhSachDiemDen,
    danhSachLichTrinh,
    themLichTrinh,
    xoaLichTrinh,
    capNhatNgayLichTrinh,
    tinhTongChiPhi,
    tinhTongThoiGian,
  } = useModel('useModelDuLich' as any);

  const [hienForm, setHienForm] = useState(false);
  const [idLichTrinhChon, setIdLichTrinhChon] = useState<string | undefined>(undefined);

  const lichTrinhHienTai: KieuLichTrinh | undefined = danhSachLichTrinh.find(
    (lt: KieuLichTrinh) => lt.id === idLichTrinhChon,
  );

  const layTenDiemDen = (id: string): string =>
    danhSachDiemDen.find((dd: KieuDiemDen) => dd.id === id)?.ten || 'Không rõ';

  const layDiemDen = (id: string): KieuDiemDen | undefined =>
    danhSachDiemDen.find((dd: KieuDiemDen) => dd.id === id);

  const xuLyThemDiemDenVaoNgay = (ngay: string, idDiemDen: string) => {
    if (!lichTrinhHienTai) return;
    const ngayHienTai = lichTrinhHienTai.danhSachNgay.find((n) => n.ngay === ngay);
    if (!ngayHienTai) return;
    const dsMoi = [...ngayHienTai.danhSachDiemDenId, idDiemDen];
    capNhatNgayLichTrinh(lichTrinhHienTai.id, ngay, dsMoi);
  };

  const xuLyXoaDiemDenKhoiNgay = (ngay: string, chiSo: number) => {
    if (!lichTrinhHienTai) return;
    const ngayHienTai = lichTrinhHienTai.danhSachNgay.find((n) => n.ngay === ngay);
    if (!ngayHienTai) return;
    const dsMoi = ngayHienTai.danhSachDiemDenId.filter((_, i) => i !== chiSo);
    capNhatNgayLichTrinh(lichTrinhHienTai.id, ngay, dsMoi);
  };

  const chiPhi = lichTrinhHienTai ? tinhTongChiPhi(lichTrinhHienTai) : null;
  const tongThoiGian = lichTrinhHienTai ? tinhTongThoiGian(lichTrinhHienTai) : 0;
  const dinhDangTien = (so: number) => so.toLocaleString('vi-VN') + 'đ';

  return (
    <div>
      <Card size="small" style={{ marginBottom: 16, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
        <Title level={5} style={{ margin: 0, marginBottom: 8 }}>Hướng dẫn sử dụng</Title>
        <Steps size="small" current={lichTrinhHienTai ? 2 : (danhSachLichTrinh.length > 0 ? 1 : 0)}>
          <Step title="Tạo lịch trình" description="Đặt tên, chọn ngày, ngân sách" />
          <Step title="Chọn lịch trình" description="Chọn từ danh sách bên dưới" />
          <Step title="Thêm điểm đến" description="Chọn điểm đến cho từng ngày" />
        </Steps>
      </Card>

      <Space style={{ marginBottom: 16 }} wrap>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setHienForm(true)}>
          Tạo lịch trình mới
        </Button>
        <Select
          placeholder="-- Chọn lịch trình để xem/chỉnh sửa --"
          style={{ minWidth: 300 }}
          allowClear
          value={idLichTrinhChon}
          onChange={setIdLichTrinhChon}
        >
          {danhSachLichTrinh.map((lt: KieuLichTrinh) => (
            <Select.Option key={lt.id} value={lt.id}>
              {lt.tenLichTrinh} ({lt.ngayBatDau} → {lt.ngayKetThuc})
            </Select.Option>
          ))}
        </Select>
        {idLichTrinhChon && (
          <Popconfirm title="Xóa lịch trình này?" onConfirm={() => { xoaLichTrinh(idLichTrinhChon); setIdLichTrinhChon(undefined); }}>
            <Button danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        )}
      </Space>

      {!lichTrinhHienTai ? (
        <Empty
          description={
            danhSachLichTrinh.length === 0
              ? 'Chưa có lịch trình nào. Nhấn "Tạo lịch trình mới" để bắt đầu!'
              : 'Hãy chọn một lịch trình từ danh sách ở trên để xem chi tiết và thêm điểm đến.'
          }
        />
      ) : (
        <>
          <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
            <Col xs={24} sm={8}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <Statistic
                  title="Tổng chi phí dự tính"
                  value={chiPhi?.tongCong || 0}
                  suffix="đ"
                  prefix={<DollarOutlined />}
                  valueStyle={{
                    color: chiPhi && chiPhi.tongCong > lichTrinhHienTai.nganSachDuKien ? '#ff4d4f' : '#52c41a',
                    fontSize: 18,
                  }}
                />
                {chiPhi && chiPhi.tongCong > lichTrinhHienTai.nganSachDuKien && (
                  <Text type="danger" style={{ fontSize: 12 }}>Vượt ngân sách!</Text>
                )}
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <Statistic title="Ngân sách dự kiến" value={lichTrinhHienTai.nganSachDuKien} suffix="đ" prefix={<DollarOutlined />} valueStyle={{ fontSize: 18 }} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <Statistic title="Tổng thời gian tham quan" value={tongThoiGian} suffix="ngày" prefix={<ClockCircleOutlined />} valueStyle={{ fontSize: 18 }} />
              </Card>
            </Col>
          </Row>

          <Title level={5}><CalendarOutlined /> Lịch trình theo ngày ({lichTrinhHienTai.danhSachNgay.length} ngày)</Title>

          <Collapse defaultActiveKey={lichTrinhHienTai.danhSachNgay.map((n) => n.ngay)}>
            {lichTrinhHienTai.danhSachNgay.map((ngay, chiSoNgay) => {
              let chiPhiNgay = 0;
              ngay.danhSachDiemDenId.forEach((idDD) => {
                const dd = layDiemDen(idDD);
                if (dd) chiPhiNgay += dd.chiPhiAnUong + dd.chiPhiLuuTru + dd.chiPhiDiChuyen;
              });
              return (
                <Panel
                  key={ngay.ngay}
                  header={
                    <span>
                      <CalendarOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                      <strong>Ngày {chiSoNgay + 1}</strong> - {ngay.ngay}
                      <Tag color="blue" style={{ marginLeft: 8 }}>{ngay.danhSachDiemDenId.length} điểm đến</Tag>
                      <Tag color="gold">{dinhDangTien(chiPhiNgay)}</Tag>
                    </span>
                  }
                >
                  <List
                    size="small"
                    dataSource={ngay.danhSachDiemDenId}
                    locale={{ emptyText: 'Chưa có điểm đến nào. Chọn từ danh sách bên dưới để thêm.' }}
                    renderItem={(idDD: string, chiSo: number) => {
                      const dd = layDiemDen(idDD);
                      return (
                        <List.Item
                          actions={[
                            <Button
                              type="link"
                              danger
                              size="small"
                              icon={<DeleteOutlined />}
                              onClick={() => xuLyXoaDiemDenKhoiNgay(ngay.ngay, chiSo)}
                            >
                              Xóa
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<EnvironmentOutlined style={{ fontSize: 18, color: '#1890ff', marginTop: 4 }} />}
                            title={<span>{chiSo + 1}. {layTenDiemDen(idDD)}</span>}
                            description={dd ? `${dinhDangTien(dd.chiPhiAnUong + dd.chiPhiLuuTru + dd.chiPhiDiChuyen)}/ngày · Tham quan: ${dd.thoiGianThamQuan} ngày` : ''}
                          />
                        </List.Item>
                      );
                    }}
                  />
                  <Select
                    placeholder="+ Nhấn để thêm điểm đến vào ngày này"
                    style={{ width: '100%', marginTop: 8 }}
                    onSelect={(idDD: any) => xuLyThemDiemDenVaoNgay(ngay.ngay, idDD as string)}
                    value={undefined}
                    showSearch
                    optionFilterProp="children"
                  >
                    {danhSachDiemDen.map((dd: KieuDiemDen) => (
                      <Select.Option key={dd.id} value={dd.id}>
                        {dd.ten} ({dinhDangTien(dd.chiPhiAnUong + dd.chiPhiLuuTru + dd.chiPhiDiChuyen)}/ngày)
                      </Select.Option>
                    ))}
                  </Select>
                </Panel>
              );
            })}
          </Collapse>
        </>
      )}

      <FormLichTrinh
        hienThi={hienForm}
        onDong={() => setHienForm(false)}
        onLuu={(duLieu) => { themLichTrinh(duLieu); setHienForm(false); }}
      />
    </div>
  );
};

export default TabLichTrinh;
