import React from 'react';
import { Modal, Form, Input } from 'antd';

interface Props {
  hienThi: boolean;
  soLuongDon: number;
  onDong: () => void;
  onXacNhan: (lyDo: string) => void;
}

const ModalTuChoiDon: React.FC<Props> = ({ hienThi, soLuongDon, onDong, onXacNhan }) => {
  const [form] = Form.useForm();

  const xuLyXacNhan = (giaTriForm: { lyDoTuChoi: string }) => {
    onXacNhan(giaTriForm.lyDoTuChoi);
    form.resetFields();
  };

  return (
    <Modal
      title={`⚠️ Xác nhận từ chối ${soLuongDon} đơn đăng ký`}
      visible={hienThi}
      onCancel={() => {
        form.resetFields();
        onDong();
      }}
      onOk={() => form.submit()}
      okText="Xác nhận từ chối"
      okButtonProps={{ danger: true }}
      cancelText="Hủy"
      destroyOnClose
    >
      <p>
        Bạn đang từ chối <b>{soLuongDon}</b> đơn đăng ký. Vui lòng nhập lý do:
      </p>
      <Form form={form} layout="vertical" onFinish={xuLyXacNhan}>
        <Form.Item
          name="lyDoTuChoi"
          label="Lý do từ chối"
          rules={[{ required: true, message: 'Bắt buộc nhập lý do từ chối' }]}
        >
          <Input.TextArea rows={3} placeholder="VD: Không đủ điều kiện, CLB đã đầy..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalTuChoiDon;
