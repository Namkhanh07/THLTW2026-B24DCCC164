import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Input, Select, Rate, Tag, Empty } from 'antd';
import { SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuDiemDen } from '../types';
import { TEN_LOAI_HINH, DS_LOAI_HINH } from '../constants';

const TabTrangChu: React.FC = () => {
  const { danhSachDiemDen } = useModel('useModelDuLich' as any);

  const [tuKhoa, setTuKhoa] = useState('');
  const [locLoaiHinh, setLocLoaiHinh] = useState<string | undefined>(undefined);
  const [sapXepTheo, setSapXepTheo] = useState<string>('danhGia');

  const duLieuDaLoc = useMemo(() => {
    let ketQua = [...danhSachDiemDen];
    if (tuKhoa.trim()) {
      const tk = tuKhoa.toLowerCase();
      ketQua = ketQua.filter((dd: KieuDiemDen) => dd.ten.toLowerCase().includes(tk));
    }
    if (locLoaiHinh) {
      ketQua = ketQua.filter((dd: KieuDiemDen) => dd.loaiHinh === locLoaiHinh);
    }
    if (sapXepTheo === 'danhGia') {
      ketQua.sort((a: KieuDiemDen, b: KieuDiemDen) => b.danhGia - a.danhGia);
    } else if (sapXepTheo === 'giaThap') {
      ketQua.sort((a: KieuDiemDen, b: KieuDiemDen) =>
        (a.chiPhiAnUong + a.chiPhiLuuTru + a.chiPhiDiChuyen) -
        (b.chiPhiAnUong + b.chiPhiLuuTru + b.chiPhiDiChuyen),
      );
    } else if (sapXepTheo === 'giaCao') {
      ketQua.sort((a: KieuDiemDen, b: KieuDiemDen) =>
        (b.chiPhiAnUong + b.chiPhiLuuTru + b.chiPhiDiChuyen) -
        (a.chiPhiAnUong + a.chiPhiLuuTru + a.chiPhiDiChuyen),
      );
    }
    return ketQua;
  }, [danhSachDiemDen, tuKhoa, locLoaiHinh, sapXepTheo]);

  const mauLoaiHinh: Record<string, string> = { bien: 'blue', nui: 'green', thanhPho: 'orange' };

  const dinhDangTien = (so: number) => so.toLocaleString('vi-VN') + 'đ';

  return (
    <div>
      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input.Search
            placeholder="Tìm điểm đến..."
            allowClear
            prefix={<SearchOutlined />}
            onChange={(e) => setTuKhoa(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Select
            allowClear
            placeholder="Loại hình"
            style={{ width: '100%' }}
            value={locLoaiHinh}
            onChange={setLocLoaiHinh}
            options={DS_LOAI_HINH}
          />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Select
            style={{ width: '100%' }}
            value={sapXepTheo}
            onChange={setSapXepTheo}
            options={[
              { label: 'Đánh giá cao', value: 'danhGia' },
              { label: 'Giá thấp → cao', value: 'giaThap' },
              { label: 'Giá cao → thấp', value: 'giaCao' },
            ]}
          />
        </Col>
      </Row>

      {duLieuDaLoc.length === 0 ? (
        <Empty description="Không tìm thấy điểm đến nào" />
      ) : (
        <Row gutter={[16, 16]}>
          {duLieuDaLoc.map((dd: KieuDiemDen) => (
            <Col xs={24} sm={12} md={8} lg={6} key={dd.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={dd.ten}
                    src={dd.hinhAnh}
                    style={{ height: 180, objectFit: 'cover' }}
                    onError={(e: any) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                  />
                }
                bodyStyle={{ padding: '12px 16px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Tag color={mauLoaiHinh[dd.loaiHinh]}>{TEN_LOAI_HINH[dd.loaiHinh]}</Tag>
                  <Rate disabled value={dd.danhGia} allowHalf style={{ fontSize: 14 }} />
                </div>
                <Card.Meta
                  title={<span><EnvironmentOutlined style={{ color: '#1890ff', marginRight: 4 }} />{dd.ten}</span>}
                  description={
                    <div>
                      <p style={{ fontSize: 12, color: '#888', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dd.moTa}</p>
                      <p style={{ margin: 0, fontWeight: 'bold', color: '#f5222d' }}>
                        {dinhDangTien(dd.chiPhiAnUong + dd.chiPhiLuuTru + dd.chiPhiDiChuyen)}/ngày
                      </p>
                      <p style={{ margin: 0, fontSize: 12, color: '#888' }}>
                        Tham quan: {dd.thoiGianThamQuan} ngày
                      </p>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default TabTrangChu;
