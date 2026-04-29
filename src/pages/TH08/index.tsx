import React from 'react';
import { Tabs, Typography } from 'antd';
import {
  AppstoreOutlined,
  CalendarOutlined,
  HeartOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import TabDashboard from './components/TabDashboard';
import TabNhatKyTapLuyen from './components/TabNhatKyTapLuyen';
import TabChiSoSucKhoe from './components/TabChiSoSucKhoe';
import TabMucTieu from './components/TabMucTieu';
import TabThuVienBaiTap from './components/TabThuVienBaiTap';

const { TabPane } = Tabs;

const TH08: React.FC = () => {
  return (
    <div style={{ padding: 16 }}>
      <Typography.Title level={3} style={{ textAlign: 'center', color: '#1890ff', marginBottom: 8 }}>
        ỨNG DỤNG THỂ DỤC - THEO DÕI SỨC KHỎE
      </Typography.Title>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={<span><AppstoreOutlined /> Dashboard</span>} key="1">
          <TabDashboard />
        </TabPane>
        <TabPane tab={<span><CalendarOutlined /> Nhật ký tập luyện</span>} key="2">
          <TabNhatKyTapLuyen />
        </TabPane>
        <TabPane tab={<span><HeartOutlined /> Chỉ số sức khỏe</span>} key="3">
          <TabChiSoSucKhoe />
        </TabPane>
        <TabPane tab={<span><TrophyOutlined /> Mục tiêu</span>} key="4">
          <TabMucTieu />
        </TabPane>
        <TabPane tab={<span><ThunderboltOutlined /> Thư viện bài tập</span>} key="5">
          <TabThuVienBaiTap />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TH08;
