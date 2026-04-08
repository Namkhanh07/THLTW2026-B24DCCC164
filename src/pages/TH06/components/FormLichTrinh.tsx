import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

interface Props {
  hienThi: boolean;
  onDong: () => void;
  onLuu: (duLieu: any) => void;
}

const FormLichTrinh: React.FC<Props> = ({ hienThi, onDong, onLuu }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (hienThi) form.resetFields();
  }, [hienThi]);

  const xuLyLuu = (giaTriForm: any) => {
    const ngayBD = giaTriForm.khoangNgay[0];
    const ngayKT = giaTriForm.khoangNgay[1];
    const soNgay = ngayKT.diff(ngayBD, 'days') + 1;
    const danhSachNgay = [];
    for (let i = 0; i < soNgay; i++) {
      danhSachNgay.push({
        ngay: moment(ngayBD).add(i, 'days').format('YYYY-MM-DD'),
        danhSachDiemDenId: [],
      });
    }
    onLuu({
      tenLichTrinh: giaTriForm.tenLichTrinh,
      ngayBatDau: ngayBD.format('YYYY-MM-DD'),
      ngayKetThuc: ngayKT.format('YYYY-MM-DD'),
      nganSachDuKien: giaTriForm.nganSachDuKien,
      danhSachNgay,
    });
  };

  return (
    <Modal
      title="Tạo lịch trình mới"
      visible={hienThi}
      onCancel={onDong}
      onOk={() => form.submit()}
      destroyOnClose
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={xuLyLuu}>
        <Form.Item
          name="tenLichTrinh"
          label="Tên lịch trình"
          rules={[{ required: true, message: 'Vui lòng nhập tên lịch trình' }]}
        >
          <Input placeholder="VD: Du lịch biển miền Trung" />
        </Form.Item>
        <Form.Item
          name="khoangNgay"
          label="Ngày bắt đầu - Kết thúc"
          rules={[{ required: true, message: 'Vui lòng chọn khoảng ngày' }]}
        >
          <DatePicker.RangePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          name="nganSachDuKien"
          label="Ngân sách dự kiến (VNĐ)"
          rules={[{ required: true, message: 'Vui lòng nhập ngân sách' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={500000}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value: any) => value.replace(/,/g, '')}
            placeholder="VD: 5,000,000"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormLichTrinh;
