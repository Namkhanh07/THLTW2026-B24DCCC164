import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Radio, Descriptions } from 'antd';
import type { KieuCauLacBo, KieuDonDangKy } from '../types';
import { DS_GIOI_TINH } from '../constants';

export type CheDo = 'them' | 'sua' | 'xemChiTiet';

interface Props {
  hienThi: boolean;
  cheDo: CheDo;
  banGhiSua: KieuDonDangKy | null;
  danhSachCLB: KieuCauLacBo[];
  onDong: () => void;
  onLuu: (duLieu: any) => void;
}

const FormDonDangKy: React.FC<Props> = ({
  hienThi,
  cheDo,
  banGhiSua,
  danhSachCLB,
  onDong,
  onLuu,
}) => {
  const [form] = Form.useForm();
  const chiDoc = cheDo === 'xemChiTiet';

  useEffect(() => {
    if (hienThi) {
      if (banGhiSua && (cheDo === 'sua' || cheDo === 'xemChiTiet')) {
        form.setFieldsValue(banGhiSua);
      } else {
        form.resetFields();
      }
    }
  }, [hienThi, banGhiSua, cheDo]);

  const tieuDeModal = {
    them: 'Thêm mới Đơn đăng ký',
    sua: 'Chỉnh sửa Đơn đăng ký',
    xemChiTiet: 'Chi tiết Đơn đăng ký',
  };

  if (chiDoc && banGhiSua) {
    const tenCLB =
      danhSachCLB.find((c) => c.id === banGhiSua.idCLB)?.tenCLB || 'Không rõ';
    return (
      <Modal
        title={tieuDeModal[cheDo]}
        visible={hienThi}
        onCancel={onDong}
        footer={null}
        width={650}
      >
        <Descriptions bordered column={2} size="small">
          <Descriptions.Item label="Họ tên" span={2}>
            {banGhiSua.hoTen}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{banGhiSua.email}</Descriptions.Item>
          <Descriptions.Item label="SĐT">{banGhiSua.sdt}</Descriptions.Item>
          <Descriptions.Item label="Giới tính">{banGhiSua.gioiTinh}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{banGhiSua.diaChi}</Descriptions.Item>
          <Descriptions.Item label="Sở trường" span={2}>
            {banGhiSua.soTruong}
          </Descriptions.Item>
          <Descriptions.Item label="Câu lạc bộ" span={2}>
            {tenCLB}
          </Descriptions.Item>
          <Descriptions.Item label="Lý do đăng ký" span={2}>
            {banGhiSua.lyDoDangKy}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">{banGhiSua.trangThai}</Descriptions.Item>
          {banGhiSua.ghiChu && (
            <Descriptions.Item label="Ghi chú">{banGhiSua.ghiChu}</Descriptions.Item>
          )}
        </Descriptions>
      </Modal>
    );
  }

  return (
    <Modal
      title={tieuDeModal[cheDo]}
      visible={hienThi}
      onCancel={onDong}
      onOk={() => form.submit()}
      destroyOnClose
      width={650}
    >
      <Form form={form} layout="vertical" onFinish={onLuu} initialValues={{ gioiTinh: 'Nam' }}>
        <Form.Item
          name="hoTen"
          label="Họ tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
        >
          <Input placeholder="VD: Nguyễn Văn A" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <Input placeholder="VD: a@gmail.com" />
        </Form.Item>

        <Form.Item
          name="sdt"
          label="Số điện thoại"
          rules={[{ required: true, message: 'Vui lòng nhập SĐT' }]}
        >
          <Input placeholder="VD: 0912345678" />
        </Form.Item>

        <Form.Item name="gioiTinh" label="Giới tính" rules={[{ required: true }]}>
          <Radio.Group options={DS_GIOI_TINH} />
        </Form.Item>

        <Form.Item name="diaChi" label="Địa chỉ">
          <Input placeholder="VD: Hà Nội" />
        </Form.Item>

        <Form.Item name="soTruong" label="Sở trường">
          <Input placeholder="VD: Lập trình, Chơi nhạc, Thể thao..." />
        </Form.Item>

        <Form.Item
          name="idCLB"
          label="Câu lạc bộ đăng ký"
          rules={[{ required: true, message: 'Vui lòng chọn CLB' }]}
        >
          <Select placeholder="Chọn Câu lạc bộ">
            {danhSachCLB.map((clb: KieuCauLacBo) => (
              <Select.Option key={clb.id} value={clb.id}>
                {clb.tenCLB}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="lyDoDangKy"
          label="Lý do đăng ký"
          rules={[{ required: true, message: 'Vui lòng nhập lý do đăng ký' }]}
        >
          <Input.TextArea rows={3} placeholder="Tại sao bạn muốn gia nhập CLB?" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormDonDangKy;
