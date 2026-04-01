import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Switch, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { KieuCauLacBo } from '../types';
import type { UploadFile, RcFile } from 'antd/lib/upload/interface';

interface Props {
  hienThi: boolean;
  banGhiSua: KieuCauLacBo | null;
  onDong: () => void;
  onLuu: (duLieu: any) => void;
}

const chuyenFileSangBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FormCauLacBo: React.FC<Props> = ({ hienThi, banGhiSua, onDong, onLuu }) => {
  const [form] = Form.useForm();
  const [danhSachFile, setDanhSachFile] = useState<UploadFile[]>([]);
  const [anhBase64, setAnhBase64] = useState<string>('');

  useEffect(() => {
    if (hienThi) {
      if (banGhiSua) {
        form.setFieldsValue({
          ...banGhiSua,
          ngayThanhLap: moment(banGhiSua.ngayThanhLap),
        });
        if (banGhiSua.anhDaiDien) {
          setAnhBase64(banGhiSua.anhDaiDien);
          setDanhSachFile([
            {
              uid: '-1',
              name: 'anh-dai-dien.png',
              status: 'done',
              url: banGhiSua.anhDaiDien,
            },
          ]);
        } else {
          setAnhBase64('');
          setDanhSachFile([]);
        }
      } else {
        form.resetFields();
        setAnhBase64('');
        setDanhSachFile([]);
      }
    }
  }, [hienThi, banGhiSua]);

  const kiemTraTruocKhiTai = (file: RcFile) => {
    const laAnhHopLe = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/webp';
    if (!laAnhHopLe) {
      message.error('Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WEBP)!');
    }
    const nhoHon2MB = file.size / 1024 / 1024 < 2;
    if (!nhoHon2MB) {
      message.error('Ảnh phải nhỏ hơn 2MB!');
    }
    return laAnhHopLe && nhoHon2MB;
  };

  const xuLyThayDoiFile = async (info: any) => {
    let dsFileMoi = [...info.fileList].slice(-1);

    if (dsFileMoi.length > 0 && dsFileMoi[0].originFileObj) {
      const base64 = await chuyenFileSangBase64(dsFileMoi[0].originFileObj as RcFile);
      setAnhBase64(base64);
      dsFileMoi[0] = {
        ...dsFileMoi[0],
        status: 'done',
        url: base64,
      };
    }

    if (dsFileMoi.length === 0) {
      setAnhBase64('');
    }

    setDanhSachFile(dsFileMoi);
  };

  const xuLyLuu = (giaTriForm: any) => {
    const duLieu = {
      ...giaTriForm,
      ngayThanhLap: giaTriForm.ngayThanhLap.format('YYYY-MM-DD'),
      anhDaiDien: anhBase64 || '',
    };
    onLuu(duLieu);
  };

  return (
    <Modal
      title={banGhiSua ? 'Cập nhật Câu lạc bộ' : 'Thêm mới Câu lạc bộ'}
      visible={hienThi}
      onCancel={onDong}
      onOk={() => form.submit()}
      destroyOnClose
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={xuLyLuu} initialValues={{ dangHoatDong: true }}>
        <Form.Item
          name="tenCLB"
          label="Tên Câu lạc bộ"
          rules={[{ required: true, message: 'Vui lòng nhập tên CLB' }]}
        >
          <Input placeholder="VD: CLB Công nghệ thông tin" />
        </Form.Item>

        <Form.Item
          name="chuNhiem"
          label="Chủ nhiệm CLB"
          rules={[{ required: true, message: 'Vui lòng nhập tên chủ nhiệm' }]}
        >
          <Input placeholder="VD: Nguyễn Văn A" />
        </Form.Item>

        <Form.Item
          name="ngayThanhLap"
          label="Ngày thành lập"
          rules={[{ required: true, message: 'Vui lòng chọn ngày thành lập' }]}
        >
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Chọn ngày" />
        </Form.Item>

        <Form.Item name="moTa" label="Mô tả (hỗ trợ HTML)">
          <Input.TextArea rows={3} placeholder="VD: <b>CLB lập trình</b> dành cho sinh viên..." />
        </Form.Item>

        <Form.Item label="Ảnh đại diện">
          <Upload.Dragger
            listType="picture"
            fileList={danhSachFile}
            beforeUpload={kiemTraTruocKhiTai}
            onChange={xuLyThayDoiFile}
            customRequest={({ onSuccess }) => {
              setTimeout(() => onSuccess?.('ok'), 0);
            }}
            maxCount={1}
            accept="image/*"
          >
            <p className="ant-upload-drag-icon">
              <PlusOutlined style={{ fontSize: 28, color: '#1890ff' }} />
            </p>
            <p className="ant-upload-text">Kéo thả ảnh vào đây hoặc nhấn để chọn</p>
            <p className="ant-upload-hint">Hỗ trợ JPG, PNG, GIF, WEBP (tối đa 2MB)</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item name="dangHoatDong" label="Đang hoạt động" valuePropName="checked">
          <Switch checkedChildren="Có" unCheckedChildren="Không" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormCauLacBo;
