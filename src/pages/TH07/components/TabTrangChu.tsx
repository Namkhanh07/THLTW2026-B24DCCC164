import React, { useState, useMemo, useEffect } from 'react';
import { Card, Row, Col, Tag, Input, Pagination, Empty, Typography, Avatar, Button, Divider, Space } from 'antd';
import { CalendarOutlined, EyeOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuBaiViet } from '../types';

const { Title, Paragraph, Text } = Typography;

const renderMarkdown = (md: string): string => {
  let html = md
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre style="background:#f5f5f5;padding:12px;border-radius:6px;overflow-x:auto;font-size:13px"><code>$2</code></pre>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background:#f0f0f0;padding:2px 6px;border-radius:3px;font-size:13px">$1</code>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map((c) => c.trim());
      return '<tr>' + cells.map((c) => `<td style="border:1px solid #ddd;padding:6px 12px">${c}</td>`).join('') + '</tr>';
    })
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/^(?!<[hluotp]|<li|<tr|<pre|<div|<a)(.+)$/gm, '<p>$1</p>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul style="padding-left:24px">$1</ul>');
  html = html.replace(/(<tr>[\s\S]*?<\/tr>)/g, '<table style="border-collapse:collapse;width:100%;margin:12px 0">$1</table>');
  return html;
};

const TabTrangChu: React.FC = () => {
  const { danhSachBaiViet, danhSachThe, layThe, tangLuotXem } = useModel('useModelBlog' as any);

  const [tuKhoa, setTuKhoa] = useState('');
  const [tuKhoaDebounce, setTuKhoaDebounce] = useState('');
  const [locTheId, setLocTheId] = useState<string | null>(null);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [baiVietChon, setBaiVietChon] = useState<KieuBaiViet | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setTuKhoaDebounce(tuKhoa), 300);
    return () => clearTimeout(timer);
  }, [tuKhoa]);

  const dsBaiVietDaDang = useMemo(() => {
    return danhSachBaiViet.filter((bv: KieuBaiViet) => bv.trangThai === 'daDang');
  }, [danhSachBaiViet]);

  const duLieuDaLoc = useMemo(() => {
    let ketQua = [...dsBaiVietDaDang];
    if (tuKhoaDebounce.trim()) {
      const tk = tuKhoaDebounce.toLowerCase();
      ketQua = ketQua.filter((bv: KieuBaiViet) =>
        bv.tieuDe.toLowerCase().includes(tk) || bv.tomTat.toLowerCase().includes(tk),
      );
    }
    if (locTheId) {
      ketQua = ketQua.filter((bv: KieuBaiViet) => bv.danhSachTheId.includes(locTheId));
    }
    return ketQua;
  }, [dsBaiVietDaDang, tuKhoaDebounce, locTheId]);

  const baiVietTrang = useMemo(() => {
    const batDau = (trangHienTai - 1) * 9;
    return duLieuDaLoc.slice(batDau, batDau + 9);
  }, [duLieuDaLoc, trangHienTai]);

  const moChiTiet = (bv: KieuBaiViet) => {
    tangLuotXem(bv.id);
    setBaiVietChon({ ...bv, luotXem: bv.luotXem + 1 });
  };

  const baiVietLienQuan = useMemo(() => {
    if (!baiVietChon) return [];
    return dsBaiVietDaDang
      .filter((bv: KieuBaiViet) =>
        bv.id !== baiVietChon.id &&
        bv.danhSachTheId.some((theId: string) => baiVietChon.danhSachTheId.includes(theId)),
      )
      .slice(0, 3);
  }, [baiVietChon, dsBaiVietDaDang]);

  if (baiVietChon) {
    return (
      <div>
        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => setBaiVietChon(null)} style={{ marginBottom: 16, padding: 0 }}>
          Quay lại danh sách
        </Button>
        <Card>
          <img
            src={baiVietChon.anhDaiDien}
            alt={baiVietChon.tieuDe}
            style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }}
            onError={(e: any) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'; }}
          />
          <Title level={2}>{baiVietChon.tieuDe}</Title>
          <Space split={<Divider type="vertical" />} style={{ marginBottom: 16 }}>
            <Text><UserOutlined /> {baiVietChon.tacGia}</Text>
            <Text><CalendarOutlined /> {baiVietChon.ngayDang}</Text>
            <Text><EyeOutlined /> {baiVietChon.luotXem} lượt xem</Text>
          </Space>
          <div style={{ marginBottom: 16 }}>
            {baiVietChon.danhSachTheId.map((theId: string) => {
              const the = layThe(theId);
              return the ? <Tag key={theId} color={the.mau}>{the.ten}</Tag> : null;
            })}
          </div>
          <Divider />
          <div
            dangerouslySetInnerHTML={{ __html: renderMarkdown(baiVietChon.noiDung) }}
            style={{ lineHeight: 1.8, fontSize: 15 }}
          />
        </Card>

        {baiVietLienQuan.length > 0 && (
          <>
            <Divider>Bài viết liên quan</Divider>
            <Row gutter={[16, 16]}>
              {baiVietLienQuan.map((bv: KieuBaiViet) => (
                <Col xs={24} sm={12} md={8} key={bv.id}>
                  <Card
                    hoverable
                    onClick={() => moChiTiet(bv)}
                    cover={<img alt={bv.tieuDe} src={bv.anhDaiDien} style={{ height: 150, objectFit: 'cover' }} onError={(e: any) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'; }} />}
                  >
                    <Card.Meta title={bv.tieuDe} description={<Text type="secondary" style={{ fontSize: 12 }}>{bv.ngayDang}</Text>} />
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <Input.Search
            placeholder="Tìm kiếm bài viết..."
            allowClear
            onChange={(e) => { setTuKhoa(e.target.value); setTrangHienTai(1); }}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Space wrap>
            <Tag
              color={!locTheId ? '#1890ff' : undefined}
              onClick={() => { setLocTheId(null); setTrangHienTai(1); }}
              style={{ cursor: 'pointer', padding: '4px 12px' }}
            >
              Tất cả
            </Tag>
            {danhSachThe.map((the: any) => (
              <Tag
                key={the.id}
                color={locTheId === the.id ? the.mau : undefined}
                onClick={() => { setLocTheId(locTheId === the.id ? null : the.id); setTrangHienTai(1); }}
                style={{ cursor: 'pointer', padding: '4px 12px' }}
              >
                {the.ten}
              </Tag>
            ))}
          </Space>
        </Col>
      </Row>

      {baiVietTrang.length === 0 ? (
        <Empty description="Không tìm thấy bài viết nào" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {baiVietTrang.map((bv: KieuBaiViet) => (
              <Col xs={24} sm={12} md={8} key={bv.id}>
                <Card
                  hoverable
                  onClick={() => moChiTiet(bv)}
                  cover={
                    <img
                      alt={bv.tieuDe}
                      src={bv.anhDaiDien}
                      style={{ height: 180, objectFit: 'cover' }}
                      onError={(e: any) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'; }}
                    />
                  }
                  bodyStyle={{ padding: '12px 16px' }}
                >
                  <div style={{ marginBottom: 8 }}>
                    {bv.danhSachTheId.slice(0, 3).map((theId: string) => {
                      const the = layThe(theId);
                      return the ? <Tag key={theId} color={the.mau} style={{ fontSize: 11 }}>{the.ten}</Tag> : null;
                    })}
                  </div>
                  <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 4 }}>{bv.tieuDe}</Title>
                  <Paragraph ellipsis={{ rows: 2 }} style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>{bv.tomTat}</Paragraph>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#999' }}>
                    <span><Avatar size={16} icon={<UserOutlined />} style={{ marginRight: 4 }} />{bv.tacGia}</span>
                    <span><CalendarOutlined style={{ marginRight: 4 }} />{bv.ngayDang}</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Pagination
              current={trangHienTai}
              pageSize={9}
              total={duLieuDaLoc.length}
              onChange={setTrangHienTai}
              showTotal={(tong) => `Tổng: ${tong} bài viết`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TabTrangChu;
