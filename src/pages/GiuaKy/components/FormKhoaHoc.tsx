import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import type { KieuPhongHoc } from '../types';
import { DS_LOAI_PHONG, DS_NGUOI_PHU_TRACH } from '../constants';

interface Props {
  hienThi: boolean;
  banGhiSua: KieuPhongHoc | null;
  onDong: () => void;
  onLuu: (duLieu: any) => void;
}

const FormPhongHoc: React.FC<Props> = ({ hienThi, banGhiSua, onDong, onLuu }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (hienThi) {
      if (banGhiSua) form.setFieldsValue(banGhiSua);
      else form.resetFields();
    }
  }, [hienThi, banGhiSua]);

  return (
    <Modal
      title={banGhiSua ? 'Chỉnh sửa phòng học' : 'Thêm phòng học mới'}
      visible={hienThi}
      onCancel={onDong}
      onOk={() => form.submit()}
      destroyOnClose
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onLuu}
        initialValues={{ loaiPhong: 'lyThuyet', soChoNgoi: 30 }}
      >
        <Form.Item
          name="maPhong"
          label="Mã phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập mã phòng' },
            { max: 10, message: 'Mã phòng tối đa 10 ký tự' },
          ]}
        >
          <Input placeholder="VD: A101" maxLength={10} showCount />
        </Form.Item>

        <Form.Item
          name="tenPhong"
          label="Tên phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập tên phòng' },
            { max: 50, message: 'Tên phòng tối đa 50 ký tự' },
          ]}
        >
          <Input placeholder="VD: Phòng học lý thuyết A101" maxLength={50} showCount />
        </Form.Item>

        <Form.Item
          name="nguoiPhuTrach"
          label="Người phụ trách"
          rules={[{ required: true, message: 'Vui lòng chọn người phụ trách' }]}
        >
          <Select placeholder="Chọn người phụ trách">
            {DS_NGUOI_PHU_TRACH.map((npt) => (
              <Select.Option key={npt} value={npt}>{npt}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="soChoNgoi"
          label="Số chỗ ngồi"
          rules={[
            { required: true, message: 'Vui lòng nhập số chỗ ngồi' },
            { type: 'number', min: 10, message: 'Tối thiểu 10 chỗ ngồi' },
            { type: 'number', max: 200, message: 'Tối đa 200 chỗ ngồi' },
          ]}
        >
          <InputNumber min={10} max={200} style={{ width: '100%' }} placeholder="10 - 200" />
        </Form.Item>

        <Form.Item
          name="loaiPhong"
          label="Loại phòng"
          rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}
        >
          <Select options={DS_LOAI_PHONG} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormPhongHoc;
