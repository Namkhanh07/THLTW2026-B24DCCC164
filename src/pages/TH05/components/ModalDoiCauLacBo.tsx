import React from 'react';
import { Modal, Form, Select } from 'antd';
import type { KieuCauLacBo } from '../types';

interface Props {
  hienThi: boolean;
  soLuongThanhVien: number;
  danhSachCLB: KieuCauLacBo[];
  onDong: () => void;
  onXacNhan: (idCLBMoi: string) => void;
}

const ModalDoiCauLacBo: React.FC<Props> = ({
  hienThi,
  soLuongThanhVien,
  danhSachCLB,
  onDong,
  onXacNhan,
}) => {
  const [form] = Form.useForm();

  const xuLyXacNhan = (giaTriForm: { idCLBMoi: string }) => {
    onXacNhan(giaTriForm.idCLBMoi);
    form.resetFields();
  };

  return (
    <Modal
      title="🔄 Chuyển Câu lạc bộ"
      visible={hienThi}
      onCancel={() => {
        form.resetFields();
        onDong();
      }}
      onOk={() => form.submit()}
      okText="Xác nhận chuyển"
      cancelText="Hủy"
      destroyOnClose
    >
      <p>
        Bạn đang chuyển CLB cho <b style={{ color: '#1890ff' }}>{soLuongThanhVien}</b> thành viên.
      </p>
      <Form form={form} layout="vertical" onFinish={xuLyXacNhan}>
        <Form.Item
          name="idCLBMoi"
          label="Chọn Câu lạc bộ muốn chuyển đến"
          rules={[{ required: true, message: 'Vui lòng chọn CLB' }]}
        >
          <Select placeholder="Chọn Câu lạc bộ mới" size="large">
            {danhSachCLB.map((clb) => (
              <Select.Option key={clb.id} value={clb.id}>
                {clb.tenCLB}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDoiCauLacBo;
