import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import type { KieuTask } from '../types';
import { DS_MUC_DO, DS_TRANG_THAI, DS_TAG } from '../constants';

interface Props {
  hienThi: boolean;
  banGhiSua: KieuTask | null;
  onDong: () => void;
  onLuu: (duLieu: any) => void;
}

const FormTask: React.FC<Props> = ({ hienThi, banGhiSua, onDong, onLuu }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (hienThi) {
      if (banGhiSua) {
        form.setFieldsValue({
          ...banGhiSua,
          deadline: moment(banGhiSua.deadline),
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ trangThai: 'CanLam', mucDoUuTien: 'TrungBinh' });
      }
    }
  }, [hienThi, banGhiSua]);

  return (
    <Modal
      title={banGhiSua ? 'Sửa task' : 'Thêm task mới'}
      visible={hienThi}
      onCancel={onDong}
      onOk={() => form.validateFields().then((values) => {
        onLuu({ ...values, deadline: values.deadline.format('YYYY-MM-DD') });
        form.resetFields();
      })}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="tenTask" label="Tên task" rules={[{ required: true, message: 'Nhập tên task' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="moTa" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="deadline" label="Deadline" rules={[{ required: true, message: 'Chọn deadline' }]}>
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="mucDoUuTien" label="Mức độ ưu tiên" rules={[{ required: true, message: 'Chọn mức độ' }]}>
          <Select options={DS_MUC_DO} />
        </Form.Item>
        <Form.Item name="tag" label="Tag" rules={[{ required: true, message: 'Chọn tag' }]}>
          <Select options={DS_TAG.map((t) => ({ label: t, value: t }))} />
        </Form.Item>
        <Form.Item name="trangThai" label="Trạng thái" rules={[{ required: true, message: 'Chọn trạng thái' }]}>
          <Select options={DS_TRANG_THAI} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormTask;
