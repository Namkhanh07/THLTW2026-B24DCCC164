import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Tag, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuThe } from '../types';

const DANH_SACH_MAU = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#722ed1', '#eb2f96', '#faad14', '#13c2c2', '#52c41a', '#1890ff'];

const TabQuanLyThe: React.FC = () => {
  const { danhSachThe, themThe, suaThe, xoaThe, demBaiVietTheoThe } = useModel('useModelBlog' as any);

  const [hienModal, setHienModal] = useState(false);
  const [theSua, setTheSua] = useState<KieuThe | null>(null);
  const [form] = Form.useForm();

  const moFormThem = () => { setTheSua(null); form.resetFields(); setHienModal(true); };
  const moFormSua = (the: KieuThe) => { setTheSua(the); form.setFieldsValue(the); setHienModal(true); };

  const xuLyLuu = () => {
    form.validateFields().then((values) => {
      if (theSua) suaThe(theSua.id, values);
      else themThe(values);
      setHienModal(false);
    });
  };

  const cauHinhCot = [
    {
      title: 'Tên thẻ',
      dataIndex: 'ten',
      render: (ten: string, bg: KieuThe) => <Tag color={bg.mau} style={{ fontSize: 14, padding: '4px 12px' }}>{ten}</Tag>,
    },
    {
      title: 'Màu',
      dataIndex: 'mau',
      width: 100,
      render: (mau: string) => (
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: mau, border: '1px solid #ddd' }} />
      ),
    },
    {
      title: 'Số bài viết',
      width: 120,
      align: 'center' as const,
      render: (_: any, bg: KieuThe) => demBaiVietTheoThe(bg.id),
    },
    {
      title: 'Thao tác',
      width: 160,
      align: 'center' as const,
      render: (_: any, bg: KieuThe) => (
        <Space>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => moFormSua(bg)}>Sửa</Button>
          <Popconfirm title="Xác nhận xóa thẻ này?" onConfirm={() => xoaThe(bg.id)} okText="Xóa" cancelText="Hủy">
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={moFormThem} style={{ marginBottom: 16 }}>
        Thêm thẻ mới
      </Button>

      <Table
        bordered
        size="middle"
        dataSource={danhSachThe}
        rowKey="id"
        columns={cauHinhCot}
        pagination={false}
      />

      <Modal
        title={theSua ? 'Chỉnh sửa thẻ' : 'Thêm thẻ mới'}
        visible={hienModal}
        onCancel={() => setHienModal(false)}
        onOk={xuLyLuu}
        destroyOnClose
        width={400}
      >
        <Form form={form} layout="vertical" initialValues={{ mau: '#1890ff' }}>
          <Form.Item name="ten" label="Tên thẻ" rules={[{ required: true, message: 'Vui lòng nhập tên thẻ' }]}>
            <Input placeholder="VD: ReactJS" />
          </Form.Item>
          <Form.Item name="mau" label="Màu sắc" rules={[{ required: true, message: 'Vui lòng chọn màu' }]}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {DANH_SACH_MAU.map((mau) => (
                <div
                  key={mau}
                  onClick={() => form.setFieldsValue({ mau })}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: mau,
                    cursor: 'pointer',
                    border: form.getFieldValue('mau') === mau ? '3px solid #333' : '2px solid #eee',
                  }}
                />
              ))}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TabQuanLyThe;
