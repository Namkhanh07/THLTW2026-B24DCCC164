import React, { useMemo } from 'react';
import { Row, Col, Card, Statistic, Typography, Tag } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuTask } from '../types';
import { TEN_MUC_DO, MAU_MUC_DO } from '../constants';

const TabDashboard: React.FC = () => {
  const { danhSachTask } = useModel('useModelCongViec' as any) as {
    danhSachTask: KieuTask[];
  };

  const thongKe = useMemo(() => {
    const homNay = new Date().toISOString().split('T')[0];
    const tongSo = danhSachTask.length;
    const hoanThanh = danhSachTask.filter((t) => t.trangThai === 'HoanThanh').length;
    const quaHan = danhSachTask.filter((t) => t.trangThai !== 'HoanThanh' && t.deadline < homNay).length;
    const dangLam = danhSachTask.filter((t) => t.trangThai === 'DangLam').length;
    return { tongSo, hoanThanh, quaHan, dangLam };
  }, [danhSachTask]);

  const taskQuaHan = useMemo(() => {
    const homNay = new Date().toISOString().split('T')[0];
    return danhSachTask
      .filter((t) => t.trangThai !== 'HoanThanh' && t.deadline < homNay)
      .sort((a, b) => a.deadline.localeCompare(b.deadline));
  }, [danhSachTask]);

  const taskSapDenHan = useMemo(() => {
    const homNay = new Date().toISOString().split('T')[0];
    const bay = new Date();
    bay.setDate(bay.getDate() + 7);
    const bayNgaySau = bay.toISOString().split('T')[0];
    return danhSachTask
      .filter((t) => t.trangThai !== 'HoanThanh' && t.deadline >= homNay && t.deadline <= bayNgaySau)
      .sort((a, b) => a.deadline.localeCompare(b.deadline));
  }, [danhSachTask]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số task"
              value={thongKe.tongSo}
              prefix={<UnorderedListOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Hoàn thành"
              value={thongKe.hoanThanh}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Đang làm"
              value={thongKe.dangLam}
              prefix={<ClockCircleOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Quá hạn"
              value={thongKe.quaHan}
              prefix={<WarningOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: thongKe.quaHan > 0 ? '#ff4d4f' : undefined }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title={<span><WarningOutlined style={{ color: '#ff4d4f' }} /> Task quá hạn</span>}>
            {taskQuaHan.length === 0 ? (
              <Typography.Text type="success">Không có task quá hạn</Typography.Text>
            ) : (
              taskQuaHan.map((t) => (
                <Card key={t.id} size="small" style={{ marginBottom: 8, borderLeft: '3px solid #ff4d4f' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Typography.Text strong>{t.tenTask}</Typography.Text>
                      <br />
                      <Typography.Text type="secondary">Hạn: {t.deadline}</Typography.Text>
                    </div>
                    <Tag color={MAU_MUC_DO[t.mucDoUuTien]}>{TEN_MUC_DO[t.mucDoUuTien]}</Tag>
                  </div>
                </Card>
              ))
            )}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title={<span><ClockCircleOutlined style={{ color: '#faad14' }} /> Sắp đến hạn (7 ngày)</span>}>
            {taskSapDenHan.length === 0 ? (
              <Typography.Text type="success">Không có task sắp đến hạn</Typography.Text>
            ) : (
              taskSapDenHan.map((t) => (
                <Card key={t.id} size="small" style={{ marginBottom: 8, borderLeft: '3px solid #faad14' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Typography.Text strong>{t.tenTask}</Typography.Text>
                      <br />
                      <Typography.Text type="secondary">Hạn: {t.deadline}</Typography.Text>
                    </div>
                    <Tag color={MAU_MUC_DO[t.mucDoUuTien]}>{TEN_MUC_DO[t.mucDoUuTien]}</Tag>
                  </div>
                </Card>
              ))
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TabDashboard;
