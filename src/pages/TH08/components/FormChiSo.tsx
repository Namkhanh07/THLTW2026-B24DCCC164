import React, { useEffect } from 'react';
import { Modal, Form, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import type { KieuChiSoSucKhoe } from '../types';

interface Props {
  hienThi: boolean;
  banGhiSua: KieuChiSoSucKhoe | null;
  onDong: () => void;
  onLuu: (duLieu: any) => void;
}

const FormChiSo: React.FC<Props> = ({ hienThi, banGhiSua, onDong, onLuu }) => {
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
        form.setFieldsValue({ ngay: moment() });
      }
    }
  }, [hienThi, banGhiSua]);

  const tinhBMI = () => {
    const canNang = form.getFieldValue('canNang');
    const chieuCao = form.getFieldValue('chieuCao');
    if (canNang && chieuCao) {
      const chieuCaoM = chieuCao / 100;
      const bmi = parseFloat((canNang / (chieuCaoM * chieuCaoM)).toFixed(1));
      form.setFieldsValue({ bmi });
    }
  };

  return (
    <Modal
      title={banGhiSua ? 'Sửa chỉ số sức khỏe' : 'Thêm chỉ số sức khỏe'}
      visible={hienThi}
      onCancel={onDong}
      onOk={() => form.validateFields().then((values) => {
        const chieuCaoM = values.chieuCao / 100;
        const bmi = parseFloat((values.canNang / (chieuCaoM * chieuCaoM)).toFixed(1));
        onLuu({ ...values, ngay: values.ngay.format('YYYY-MM-DD'), bmi });
        form.resetFields();
      })}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="ngay" label="Ngày" rules={[{ required: true, message: 'Chọn ngày' }]}>
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="canNang" label="Cân nặng (kg)" rules={[{ required: true, message: 'Nhập cân nặng' }]}>
          <InputNumber min={20} max={300} step={0.1} style={{ width: '100%' }} onChange={tinhBMI} />
        </Form.Item>
        <Form.Item name="chieuCao" label="Chiều cao (cm)" rules={[{ required: true, message: 'Nhập chiều cao' }]}>
          <InputNumber min={100} max={250} style={{ width: '100%' }} onChange={tinhBMI} />
        </Form.Item>
        <Form.Item name="bmi" label="BMI (tự động tính)">
          <InputNumber disabled style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="nhipTim" label="Nhịp tim lúc nghỉ (bpm)" rules={[{ required: true, message: 'Nhập nhịp tim' }]}>
          <InputNumber min={30} max={200} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="gioNgu" label="Giờ ngủ" rules={[{ required: true, message: 'Nhập giờ ngủ' }]}>
          <InputNumber min={0} max={24} step={0.5} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormChiSo;
