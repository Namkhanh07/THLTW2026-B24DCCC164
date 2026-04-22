import React from 'react';
import { Tabs, Typography } from 'antd';
import { HomeOutlined, UserOutlined, FileTextOutlined, TagsOutlined } from '@ant-design/icons';
import TabTrangChu from './components/TabTrangChu';
import TabGioiThieu from './components/TabGioiThieu';
import TabQuanLyBaiViet from './components/TabQuanLyBaiViet';
import TabQuanLyThe from './components/TabQuanLyThe';

const { TabPane } = Tabs;

const TH07: React.FC = () => {
  return (
    <div style={{ padding: 16 }}>
      <Typography.Title level={3} style={{ textAlign: 'center', color: '#1890ff', marginBottom: 8 }}>
        BLOG CÁ NHÂN
      </Typography.Title>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={<span><HomeOutlined /> Trang chủ</span>} key="1">
          <TabTrangChu />
        </TabPane>
        <TabPane tab={<span><UserOutlined /> Giới thiệu</span>} key="2">
          <TabGioiThieu />
        </TabPane>
        <TabPane tab={<span><FileTextOutlined /> Quản lý bài viết</span>} key="3">
          <TabQuanLyBaiViet />
        </TabPane>
        <TabPane tab={<span><TagsOutlined /> Quản lý thẻ</span>} key="4">
          <TabQuanLyThe />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TH07;
