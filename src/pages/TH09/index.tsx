import React from 'react';
import { Tabs, Typography } from 'antd';
import {
  AppstoreOutlined,
  ProjectOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import TabDashboard from './components/TabDashboard';
import TabKanban from './components/TabKanban';
import TabDanhSach from './components/TabDanhSach';

const { TabPane } = Tabs;

const TH09: React.FC = () => {
  return (
    <div style={{ padding: 16 }}>
      <Typography.Title level={3} style={{ textAlign: 'center', color: '#1890ff', marginBottom: 8 }}>
        QUẢN LÝ CÔNG VIỆC CÁ NHÂN - KANBAN BOARD
      </Typography.Title>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={<span><AppstoreOutlined /> Dashboard</span>} key="1">
          <TabDashboard />
        </TabPane>
        <TabPane tab={<span><ProjectOutlined /> Kanban Board</span>} key="2">
          <TabKanban />
        </TabPane>
        <TabPane tab={<span><UnorderedListOutlined /> Danh sách task</span>} key="3">
          <TabDanhSach />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TH09;
