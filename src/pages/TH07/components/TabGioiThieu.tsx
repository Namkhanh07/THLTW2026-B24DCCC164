import React, { useState } from 'react';
import { Card, Typography, Tag, Avatar, Divider, Row, Col, Space, Upload, message } from 'antd';
import { GithubOutlined, MailOutlined, CodeOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { THONG_TIN_TAC_GIA } from '../constants';

const { Title, Paragraph, Text } = Typography;

const TabGioiThieu: React.FC = () => {
  const [anhDaiDien, setAnhDaiDien] = useState<string>(THONG_TIN_TAC_GIA.anhDaiDien);

  const xuLyUpload = (info: any) => {
    const file = info.file;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setAnhDaiDien(base64);
      message.success('Đã cập nhật ảnh đại diện!');
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Card style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
          <Avatar
            size={120}
            src={anhDaiDien || undefined}
            icon={!anhDaiDien ? <UserOutlined /> : undefined}
            style={{ border: '3px solid #1890ff' }}
          />
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              const laAnh = file.type.startsWith('image/');
              if (!laAnh) message.error('Chỉ được upload file ảnh!');
              return false;
            }}
            onChange={xuLyUpload}
            accept="image/*"
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#1890ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '2px solid #fff',
              }}
            >
              <UploadOutlined style={{ color: '#fff', fontSize: 14 }} />
            </div>
          </Upload>
        </div>
        <Title level={3} style={{ marginBottom: 4 }}>{THONG_TIN_TAC_GIA.ten}</Title>
        <Text type="secondary">{THONG_TIN_TAC_GIA.maSV}</Text>
        <Divider />
        <Paragraph style={{ textAlign: 'left', fontSize: 15, lineHeight: 1.8 }}>
          {THONG_TIN_TAC_GIA.tieuSu}
        </Paragraph>
      </Card>

      <Card title={<span><CodeOutlined /> Kỹ năng</span>} style={{ marginBottom: 24 }}>
        <Space wrap>
          {THONG_TIN_TAC_GIA.kyNang.map((kn) => (
            <Tag key={kn} color="blue" style={{ padding: '4px 12px', fontSize: 14 }}>{kn}</Tag>
          ))}
        </Space>
      </Card>

      <Card title="Liên kết">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <a href={THONG_TIN_TAC_GIA.lienKet.github} target="_blank" rel="noreferrer" style={{ fontSize: 15 }}>
              <GithubOutlined style={{ marginRight: 8 }} />GitHub
            </a>
          </Col>
          <Col span={12}>
            <a href={`mailto:${THONG_TIN_TAC_GIA.lienKet.email}`} style={{ fontSize: 15 }}>
              <MailOutlined style={{ marginRight: 8 }} />{THONG_TIN_TAC_GIA.lienKet.email}
            </a>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TabGioiThieu;
