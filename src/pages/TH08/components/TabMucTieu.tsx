import React, { useState } from 'react';
import { Card, Row, Col, Progress, Tag, Popconfirm, InputNumber, Button, Drawer, Form, Input, Select, DatePicker, Segmented, Empty, Typography, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';
import type { KieuMucTieu } from '../types';
import {
  DS_LOAI_MUC_TIEU,
  DS_TRANG_THAI_MUC_TIEU,
  TEN_LOAI_MUC_TIEU,
  TEN_TRANG_THAI_MUC_TIEU,
  MAU_TRANG_THAI_MUC_TIEU,
} from '../constants';

const TabMucTieu: React.FC = () => {
  const { danhSachMucTieu, themMucTieu, suaMucTieu, xoaMucTieu } = useModel('useModelTheDuc' as any) as {
    danhSachMucTieu: KieuMucTieu[];
    themMucTieu: (mt: any) => void;
    suaMucTieu: (id: string, dl: any) => void;
    xoaMucTieu: (id: string) => void;
  };

  const [hienDrawer, setHienDrawer] = useState(false);
  const [locTrangThai, setLocTrangThai] = useState<string>('TatCa');
  const [form] = Form.useForm();

  const danhSachLoc = locTrangThai === 'TatCa'
    ? danhSachMucTieu
    : danhSachMucTieu.filter((mt) => mt.trangThai === locTrangThai);

  const tinhPhanTram = (mt: KieuMucTieu) => {
    if (mt.giaTriMucTieu === 0) return 0;
    return Math.min(Math.round((mt.giaTriHienTai / mt.giaTriMucTieu) * 100), 100);
  };

  const xuLyThemMoi = () => {
    form.validateFields().then((values) => {
      themMucTieu({
        ...values,
        deadline: values.deadline.format('YYYY-MM-DD'),
      });
      form.resetFields();
      setHienDrawer(false);
    });
  };

  const capNhatGiaTri = (id: string, giaTri: number | null) => {
    if (giaTri !== null) {
      suaMucTieu(id, { giaTriHienTai: giaTri });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <Segmented
          options={DS_TRANG_THAI_MUC_TIEU.map((tt) => ({ label: tt.label, value: tt.value }))}
          value={locTrangThai}
          onChange={(v) => setLocTrangThai(v as string)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setHienDrawer(true); }}>
          Thêm mục tiêu
        </Button>
      </div>

      {danhSachLoc.length === 0 ? (
        <Empty description="Không có mục tiêu nào" />
      ) : (
        <Row gutter={[16, 16]}>
          {danhSachLoc.map((mt) => {
            const phanTram = tinhPhanTram(mt);
            return (
              <Col xs={24} sm={12} md={8} key={mt.id}>
                <Card
                  title={mt.tenMucTieu}
                  extra={
                    <Space>
                      <Tag color={MAU_TRANG_THAI_MUC_TIEU[mt.trangThai]}>
                        {TEN_TRANG_THAI_MUC_TIEU[mt.trangThai]}
                      </Tag>
                      <Popconfirm title="Xác nhận xóa mục tiêu?" onConfirm={() => xoaMucTieu(mt.id)} okText="Xóa" cancelText="Hủy">
                        <Button size="small" icon={<DeleteOutlined />} danger type="text" />
                      </Popconfirm>
                    </Space>
                  }
                >
                  <p><strong>Loại:</strong> {TEN_LOAI_MUC_TIEU[mt.loai]}</p>
                  <p><strong>Mục tiêu:</strong> {mt.giaTriMucTieu}</p>
                  <div style={{ marginBottom: 8 }}>
                    <strong>Giá trị hiện tại: </strong>
                    <InputNumber
                      size="small"
                      value={mt.giaTriHienTai}
                      min={0}
                      onChange={(v) => capNhatGiaTri(mt.id, v)}
                      style={{ width: 100 }}
                    />
                  </div>
                  <Progress
                    percent={phanTram}
                    status={phanTram >= 100 ? 'success' : 'active'}
                    strokeColor={phanTram >= 100 ? '#52c41a' : '#1890ff'}
                  />
                  <p style={{ marginTop: 8 }}>
                    <strong>Deadline:</strong> {mt.deadline}
                  </p>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <Drawer
        title="Thêm mục tiêu mới"
        visible={hienDrawer}
        onClose={() => setHienDrawer(false)}
        width={400}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={() => setHienDrawer(false)} style={{ marginRight: 8 }}>Hủy</Button>
            <Button type="primary" onClick={xuLyThemMoi}>Lưu</Button>
          </div>
        }
      >
        <Form form={form} layout="vertical" initialValues={{ trangThai: 'DangThucHien', giaTriHienTai: 0 }}>
          <Form.Item name="tenMucTieu" label="Tên mục tiêu" rules={[{ required: true, message: 'Nhập tên mục tiêu' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="loai" label="Loại mục tiêu" rules={[{ required: true, message: 'Chọn loại' }]}>
            <Select options={DS_LOAI_MUC_TIEU} />
          </Form.Item>
          <Form.Item name="giaTriMucTieu" label="Giá trị mục tiêu" rules={[{ required: true, message: 'Nhập giá trị' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="giaTriHienTai" label="Giá trị hiện tại">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline" rules={[{ required: true, message: 'Chọn deadline' }]}>
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="trangThai" label="Trạng thái" rules={[{ required: true, message: 'Chọn trạng thái' }]}>
            <Select options={[
              { label: 'Đang thực hiện', value: 'DangThucHien' },
              { label: 'Đã đạt', value: 'DaDat' },
              { label: 'Đã hủy', value: 'DaHuy' },
            ]} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default TabMucTieu;
