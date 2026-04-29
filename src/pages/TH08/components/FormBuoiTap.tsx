import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import moment from 'moment';
import type { KieuBuoiTap } from '../types';
import { DS_LOAI_BAI_TAP, DS_TRANG_THAI_BUOI_TAP } from '../constants';

interface Props {
  hienThi: boolean;
  banGhiSua: KieuBuoiTap | null;
  onDong: () => void;
  onLuu: (duLieu: any) => void;
}

const FormBuoiTap: React.FC<Props> = ({ hienThi, banGhiSua, onDong, onLuu }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (hienThi) {
      if (banGhiSua) {
        form.setFieldsValue({
          ...banGhiSua,
          ngay: moment(banGhiSua.ngay),
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ ngay: moment(), trangThai: 'HoanThanh' });
      }
    }
  }, [hienThi, banGhiSua]);

  return (
    <Modal
      title={banGhiSua ? 'Sửa buổi tập' : 'Thêm buổi tập mới'}
      visible={hienThi}
      onCancel={onDong}
      onOk={() => form.validateFields().then((values) => {
        onLuu({ ...values, ngay: values.ngay.format('YYYY-MM-DD') });
        form.resetFields();
      })}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="ngay" label="Ngày tập" rules={[{ required: true, message: 'Chọn ngày tập' }]}>
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="loaiBaiTap" label="Loại bài tập" rules={[{ required: true, message: 'Chọn loại bài tập' }]}>
          <Select options={DS_LOAI_BAI_TAP} placeholder="Chọn loại bài tập" />
        </Form.Item>
        <Form.Item name="thoiLuong" label="Thời lượng (phút)" rules={[{ required: true, message: 'Nhập thời lượng' }]}>
          <InputNumber min={0} max={300} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="caloDot" label="Calo đốt" rules={[{ required: true, message: 'Nhập calo' }]}>
          <InputNumber min={0} max={5000} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="ghiChu" label="Ghi chú">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="trangThai" label="Trạng thái" rules={[{ required: true, message: 'Chọn trạng thái' }]}>
          <Select options={DS_TRANG_THAI_BUOI_TAP} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormBuoiTap;
