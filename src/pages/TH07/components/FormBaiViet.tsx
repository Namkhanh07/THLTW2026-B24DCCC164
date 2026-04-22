import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useModel } from 'umi';
import type { KieuBaiViet } from '../types';

interface Props {
  hienThi: boolean;
  banGhiSua: KieuBaiViet | null;
  onDong: () => void;
  onLuu: (duLieu: any) => void;
}

const FormBaiViet: React.FC<Props> = ({ hienThi, banGhiSua, onDong, onLuu }) => {
  const [form] = Form.useForm();
  const { danhSachThe } = useModel('useModelBlog' as any);

  useEffect(() => {
    if (hienThi) {
      if (banGhiSua) form.setFieldsValue(banGhiSua);
      else form.resetFields();
    }
  }, [hienThi, banGhiSua]);

  return (
    <Modal
      title={banGhiSua ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
      visible={hienThi}
      onCancel={onDong}
      onOk={() => form.submit()}
      destroyOnClose
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onLuu}
        initialValues={{ trangThai: 'nhap', danhSachTheId: [], tacGia: 'Trần Nam Khánh' }}
      >
        <Form.Item
          name="tieuDe"
          label="Tiêu đề"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input placeholder="Tiêu đề bài viết" />
        </Form.Item>

        <Form.Item
          name="slug"
          label="Slug (URL)"
          rules={[{ required: true, message: 'Vui lòng nhập slug' }]}
        >
          <Input placeholder="tieu-de-bai-viet" />
        </Form.Item>

        <Form.Item
          name="tomTat"
          label="Tóm tắt"
          rules={[{ required: true, message: 'Vui lòng nhập tóm tắt' }]}
        >
          <Input.TextArea rows={2} placeholder="Tóm tắt ngắn gọn về bài viết" />
        </Form.Item>

        <Form.Item
          name="noiDung"
          label="Nội dung (Markdown)"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
        >
          <Input.TextArea rows={8} placeholder="# Tiêu đề&#10;Nội dung bài viết..." />
        </Form.Item>

        <Form.Item
          name="anhDaiDien"
          label="Ảnh đại diện (URL)"
          rules={[{ required: true, message: 'Vui lòng nhập URL ảnh' }]}
        >
          <Input placeholder="https://..." />
        </Form.Item>

        <Form.Item
          name="tacGia"
          label="Tác giả"
          rules={[{ required: true, message: 'Vui lòng nhập tên tác giả' }]}
        >
          <Input placeholder="Tên tác giả" />
        </Form.Item>

        <Form.Item
          name="danhSachTheId"
          label="Thẻ"
          rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 thẻ' }]}
        >
          <Select mode="multiple" placeholder="Chọn thẻ cho bài viết">
            {danhSachThe.map((the: any) => (
              <Select.Option key={the.id} value={the.id}>{the.ten}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="trangThai"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select
            options={[
              { label: 'Nháp', value: 'nhap' },
              { label: 'Đã đăng', value: 'daDang' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormBaiViet;
