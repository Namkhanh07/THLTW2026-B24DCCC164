import React from 'react';
import { Tabs, Card, Typography } from 'antd';
import {
  TeamOutlined,
  FileTextOutlined,
  UserOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import TabCauLacBo from './components/TabCauLacBo';
import TabDonDangKy from './components/TabDonDangKy';
import TabThanhVien from './components/TabThanhVien';
import TabBaoCao from './components/TabBaoCao';

const { TabPane } = Tabs;

const TH05_QuanLyCauLacBo: React.FC = () => (
  <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
    <div style={{ textAlign: 'center', marginBottom: 20 }}>
      <Typography.Title level={3} style={{ color: '#1890ff', margin: 0 }}>
        HỆ THỐNG QUẢN LÝ CÂU LẠC BỘ
      </Typography.Title>
    </div>

    <Card
      bordered={false}
      style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane
          tab={
            <span>
              <TeamOutlined /> 1. Danh sách CLB
            </span>
          }
          key="1"
        >
          <TabCauLacBo />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FileTextOutlined /> 2. Đơn đăng ký
            </span>
          }
          key="2"
        >
          <TabDonDangKy />
        </TabPane>
        <TabPane
          tab={
            <span>
              <UserOutlined /> 3. Thành viên
            </span>
          }
          key="3"
        >
          <TabThanhVien />
        </TabPane>
        <TabPane
          tab={
            <span>
              <BarChartOutlined /> 4. Báo cáo thống kê
            </span>
          }
          key="4"
        >
          <TabBaoCao />
        </TabPane>
      </Tabs>
    </Card>
  </div>
);

export default TH05_QuanLyCauLacBo;