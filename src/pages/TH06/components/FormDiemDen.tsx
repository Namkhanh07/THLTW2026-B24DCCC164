import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Upload, message, Rate } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { KieuDiemDen } from '../types';
import { DS_LOAI_HINH } from '../constants';
import type { UploadFile, RcFile } from 'antd/lib/upload/interface';

interface Props {
  hienThi: boolean;
  banGhiSua: KieuDiemDen | null;
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

const FormDiemDen: React.FC<Props> = ({ hienThi, banGhiSua, onDong, onLuu }) => {
  const [form] = Form.useForm();
  const [danhSachFile, setDanhSachFile] = useState<UploadFile[]>([]);
  const [anhBase64, setAnhBase64] = useState<string>('');

  useEffect(() => {
    if (hienThi) {
      if (banGhiSua) {
        form.setFieldsValue(banGhiSua);
        setAnhBase64(banGhiSua.hinhAnh || '');
        if (banGhiSua.hinhAnh) {
          setDanhSachFile([{ uid: '-1', name: 'anh.png', status: 'done', url: banGhiSua.hinhAnh }]);
        } else {
          setDanhSachFile([]);
        }
      } else {
        form.resetFields();
        setAnhBase64('');
        setDanhSachFile([]);
      }
    }
  }, [hienThi, banGhiSua]);

  const xuLyThayDoiFile = async (info: any) => {
    let dsFileMoi = [...info.fileList].slice(-1);
    if (dsFileMoi.length > 0 && dsFileMoi[0].originFileObj) {
      const base64 = await chuyenFileSangBase64(dsFileMoi[0].originFileObj as RcFile);
      setAnhBase64(base64);
      dsFileMoi[0] = { ...dsFileMoi[0], status: 'done', url: base64 };
    }
    if (dsFileMoi.length === 0) setAnhBase64('');
    setDanhSachFile(dsFileMoi);
  };

  const xuLyLuu = (giaTriForm: any) => {
    onLuu({ ...giaTriForm, hinhAnh: anhBase64 || giaTriForm.hinhAnh || '' });
  };

  return (
    <Modal
      title={banGhiSua ? 'Cập nhật điểm đến' : 'Thêm điểm đến mới'}
      visible={hienThi}
      onCancel={onDong}
      onOk={() => form.submit()}
      destroyOnClose
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={xuLyLuu} initialValues={{ danhGia: 4, loaiHinh: 'bien' }}>
        <Form.Item name="ten" label="Tên điểm đến" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
          <Input placeholder="VD: Vịnh Hạ Long" />
        </Form.Item>
        <Form.Item name="loaiHinh" label="Loại hình" rules={[{ required: true }]}>
          <Select options={DS_LOAI_HINH} />
        </Form.Item>
        <Form.Item name="moTa" label="Mô tả">
          <Input.TextArea rows={2} placeholder="Mô tả ngắn về điểm đến..." />
        </Form.Item>
        <Form.Item label="Hình ảnh (kéo thả hoặc nhấn chọn)">
          <Upload.Dragger
            listType="picture"
            fileList={danhSachFile}
            onChange={xuLyThayDoiFile}
            beforeUpload={(file) => {
              const hopLe = file.type.startsWith('image/');
              if (!hopLe) message.error('Chỉ chấp nhận file ảnh!');
              return hopLe;
            }}
            customRequest={({ onSuccess }) => { setTimeout(() => onSuccess?.('ok'), 0); }}
            maxCount={1}
            accept="image/*"
          >
            <p className="ant-upload-drag-icon"><PlusOutlined style={{ fontSize: 24, color: '#1890ff' }} /></p>
            <p className="ant-upload-text">Kéo thả ảnh vào đây</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item name="thoiGianThamQuan" label="Thời gian tham quan (ngày)" rules={[{ required: true }]}>
          <InputNumber min={1} max={30} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="danhGia" label="Đánh giá">
          <Rate allowHalf />
        </Form.Item>
        <Form.Item name="chiPhiAnUong" label="Chi phí ăn uống (VNĐ/ngày)" rules={[{ required: true }]}>
          <InputNumber min={0} step={50000} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(v: any) => v.replace(/,/g, '')} />
        </Form.Item>
        <Form.Item name="chiPhiLuuTru" label="Chi phí lưu trú (VNĐ/ngày)" rules={[{ required: true }]}>
          <InputNumber min={0} step={50000} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(v: any) => v.replace(/,/g, '')} />
        </Form.Item>
        <Form.Item name="chiPhiDiChuyen" label="Chi phí di chuyển (VNĐ/ngày)" rules={[{ required: true }]}>
          <InputNumber min={0} step={50000} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(v: any) => v.replace(/,/g, '')} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormDiemDen;
