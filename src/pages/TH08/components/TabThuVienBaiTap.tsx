import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Input, Select, Tag, Modal, Button, Empty, Space, Popconfirm, Typography } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, FireOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuBaiTapThuVien } from '../types';
import { DS_NHOM_CO, DS_MUC_DO_KHO, TEN_MUC_DO_KHO, MAU_MUC_DO_KHO, TEN_NHOM_CO } from '../constants';
import FormBaiTapThuVien from './FormBaiTapThuVien';

const TabThuVienBaiTap: React.FC = () => {
  const { danhSachBaiTap, themBaiTap, suaBaiTap, xoaBaiTap } = useModel('useModelTheDuc' as any) as {
    danhSachBaiTap: KieuBaiTapThuVien[];
    themBaiTap: (bt: any) => void;
    suaBaiTap: (id: string, dl: any) => void;
    xoaBaiTap: (id: string) => void;
  };

  const [timKiem, setTimKiem] = useState('');
  const [locNhomCo, setLocNhomCo] = useState<string | undefined>(undefined);
  const [locMucDo, setLocMucDo] = useState<string | undefined>(undefined);
  const [baiTapChiTiet, setBaiTapChiTiet] = useState<KieuBaiTapThuVien | null>(null);
  const [hienForm, setHienForm] = useState(false);
  const [banGhiSua, setBanGhiSua] = useState<KieuBaiTapThuVien | null>(null);

  const danhSachLoc = useMemo(() => {
    let ds = [...danhSachBaiTap];
    if (timKiem) {
      const tk = timKiem.toLowerCase();
      ds = ds.filter((bt) => bt.tenBaiTap.toLowerCase().includes(tk));
    }
    if (locNhomCo) {
      ds = ds.filter((bt) => bt.nhomCo === locNhomCo);
    }
    if (locMucDo) {
      ds = ds.filter((bt) => bt.mucDoKho === locMucDo);
    }
    return ds;
  }, [danhSachBaiTap, timKiem, locNhomCo, locMucDo]);

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
          placeholder="Lọc nhóm cơ"
          value={locNhomCo}
          onChange={setLocNhomCo}
          options={DS_NHOM_CO}
          style={{ width: 160 }}
          allowClear
        />
        <Select
          placeholder="Lọc mức độ"
          value={locMucDo}
          onChange={setLocMucDo}
          options={DS_MUC_DO_KHO}
          style={{ width: 140 }}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setBanGhiSua(null); setHienForm(true); }}>
          Thêm bài tập
        </Button>
      </Space>

      {danhSachLoc.length === 0 ? (
        <Empty description="Không tìm thấy bài tập" />
      ) : (
        <Row gutter={[16, 16]}>
          {danhSachLoc.map((bt) => (
            <Col xs={24} sm={12} md={8} key={bt.id}>
              <Card
                hoverable
                onClick={() => setBaiTapChiTiet(bt)}
                actions={[
                  <EditOutlined key="edit" onClick={(e) => { e.stopPropagation(); setBanGhiSua(bt); setHienForm(true); }} />,
                  <Popconfirm
                    key="delete"
                    title="Xác nhận xóa bài tập?"
                    onConfirm={(e) => { e?.stopPropagation(); xoaBaiTap(bt.id); }}
                    onCancel={(e) => e?.stopPropagation()}
                    okText="Xóa"
                    cancelText="Hủy"
                  >
                    <DeleteOutlined onClick={(e) => e.stopPropagation()} />
                  </Popconfirm>,
                ]}
              >
                <Card.Meta
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{bt.tenBaiTap}</span>
                      <Tag color={MAU_MUC_DO_KHO[bt.mucDoKho]}>{TEN_MUC_DO_KHO[bt.mucDoKho]}</Tag>
                    </div>
                  }
                  description={
                    <div>
                      <Tag color="purple">{TEN_NHOM_CO[bt.nhomCo]}</Tag>
                      <p style={{ marginTop: 8 }}>{bt.moTaNgan}</p>
                      <p><FireOutlined style={{ color: '#ff4d4f' }} /> {bt.caloTrungBinhGio} kcal/giờ</p>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title={baiTapChiTiet?.tenBaiTap}
        visible={!!baiTapChiTiet}
        onCancel={() => setBaiTapChiTiet(null)}
        footer={null}
        width={600}
      >
        {baiTapChiTiet && (
          <div>
            <Space style={{ marginBottom: 16 }}>
              <Tag color="purple">{TEN_NHOM_CO[baiTapChiTiet.nhomCo]}</Tag>
              <Tag color={MAU_MUC_DO_KHO[baiTapChiTiet.mucDoKho]}>{TEN_MUC_DO_KHO[baiTapChiTiet.mucDoKho]}</Tag>
              <Tag color="volcano"><FireOutlined /> {baiTapChiTiet.caloTrungBinhGio} kcal/giờ</Tag>
            </Space>
            <Typography.Paragraph>{baiTapChiTiet.moTaNgan}</Typography.Paragraph>
            <div style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 16, borderRadius: 8 }}>
              {baiTapChiTiet.huongDan}
            </div>
          </div>
        )}
      </Modal>

      <FormBaiTapThuVien
        hienThi={hienForm}
        banGhiSua={banGhiSua}
        onDong={() => { setHienForm(false); setBanGhiSua(null); }}
        onLuu={(duLieu) => {
          if (banGhiSua) suaBaiTap(banGhiSua.id, duLieu);
          else themBaiTap(duLieu);
          setHienForm(false);
          setBanGhiSua(null);
        }}
      />
    </div>
  );
};

export default TabThuVienBaiTap;
