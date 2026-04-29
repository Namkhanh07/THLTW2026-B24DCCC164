import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import type { KieuBaiTapThuVien } from '../types';
import { DS_NHOM_CO, DS_MUC_DO_KHO } from '../constants';

interface Props {
  hienThi: boolean;
  banGhiSua: KieuBaiTapThuVien | null;
  onDong: () => void;
  onLuu: (duLieu: any) => void;
}

const FormBaiTapThuVien: React.FC<Props> = ({ hienThi, banGhiSua, onDong, onLuu }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (hienThi) {
      if (banGhiSua) {
        form.setFieldsValue(banGhiSua);
      } else {
        form.resetFields();
      }
    }
  }, [hienThi, banGhiSua]);

  return (
    <Modal
      title={banGhiSua ? 'Sửa bài tập' : 'Thêm bài tập mới'}
      visible={hienThi}
      onCancel={onDong}
      onOk={() => form.validateFields().then((values) => {
        onLuu(values);
        form.resetFields();
      })}
      okText="Lưu"
      cancelText="Hủy"
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="tenBaiTap" label="Tên bài tập" rules={[{ required: true, message: 'Nhập tên bài tập' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="nhomCo" label="Nhóm cơ tác động" rules={[{ required: true, message: 'Chọn nhóm cơ' }]}>
          <Select options={DS_NHOM_CO} />
        </Form.Item>
        <Form.Item name="mucDoKho" label="Mức độ khó" rules={[{ required: true, message: 'Chọn mức độ' }]}>
          <Select options={DS_MUC_DO_KHO} />
        </Form.Item>
        <Form.Item name="moTaNgan" label="Mô tả ngắn" rules={[{ required: true, message: 'Nhập mô tả' }]}>
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="caloTrungBinhGio" label="Calo trung bình/giờ" rules={[{ required: true, message: 'Nhập calo' }]}>
          <InputNumber min={0} max={2000} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="huongDan" label="Hướng dẫn thực hiện (Markdown)" rules={[{ required: true, message: 'Nhập hướng dẫn' }]}>
          <Input.TextArea rows={6} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormBaiTapThuVien;
