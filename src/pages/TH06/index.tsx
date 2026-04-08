import React from 'react';
import { Tabs, Card, Typography } from 'antd';
import {
  CompassOutlined,
  ScheduleOutlined,
  WalletOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import TabTrangChu from './components/TabTrangChu';
import TabLichTrinh from './components/TabLichTrinh';
import TabNganSach from './components/TabNganSach';
import TabQuanTri from './components/TabQuanTri';

const { TabPane } = Tabs;

const TH06_DuLich: React.FC = () => (
  <div style={{ padding: '16px', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
    <div style={{ textAlign: 'center', marginBottom: 16 }}>
      <Typography.Title level={3} style={{ color: '#1890ff', margin: 0 }}>
        ỨNG DỤNG LẬP KẾ HOẠCH DU LỊCH
      </Typography.Title>
    </div>

    <Card
      bordered={false}
      style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      bodyStyle={{ padding: '12px 16px' }}
    >
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane tab={<span><CompassOutlined /> 1. Khám phá</span>} key="1">
          <TabTrangChu />
        </TabPane>
        <TabPane tab={<span><ScheduleOutlined /> 2. Lịch trình</span>} key="2">
          <TabLichTrinh />
        </TabPane>
        <TabPane tab={<span><WalletOutlined /> 3. Ngân sách</span>} key="3">
          <TabNganSach />
        </TabPane>
        <TabPane tab={<span><SettingOutlined /> 4. Quản trị</span>} key="4">
          <TabQuanTri />
        </TabPane>
      </Tabs>
    </Card>
  </div>
);

export default TH06_DuLich;
