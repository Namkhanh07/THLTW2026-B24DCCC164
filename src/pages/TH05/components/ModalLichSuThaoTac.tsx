import React from 'react';
import { Modal, Timeline, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { NhatKyThaoTac } from '../types';
import { MAU_TRANG_THAI } from '../constants';

interface Props {
  hienThi: boolean;
  danhSachNhatKy: NhatKyThaoTac[];
  onDong: () => void;
}

const ModalLichSuThaoTac: React.FC<Props> = ({ hienThi, danhSachNhatKy, onDong }) => {
  return (
    <Modal
      title="Lịch sử thao tác"
      visible={hienThi}
      onCancel={onDong}
      footer={null}
      width={550}
    >
      {danhSachNhatKy.length === 0 ? (
        <p style={{ color: '#999', textAlign: 'center' }}>Chưa có thao tác nào.</p>
      ) : (
        <Timeline style={{ marginTop: 16 }}>
          {danhSachNhatKy.map((nhatKy, chiSo) => (
            <Timeline.Item
              key={chiSo}
              dot={
                nhatKy.hanhDong === 'Approved' ? (
                  <CheckCircleOutlined style={{ color: 'green', fontSize: 16 }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red', fontSize: 16 }} />
                )
              }
            >
              <div>
                <Tag color={MAU_TRANG_THAI[nhatKy.hanhDong] || 'default'}>
                  {nhatKy.hanhDong}
                </Tag>
                <span style={{ color: '#888', fontSize: 12 }}>
                  bởi <b>{nhatKy.nguoiThucHien}</b> vào lúc <b>{nhatKy.thoiGian}</b>
                </span>
              </div>
              {nhatKy.lyDo && (
                <div style={{ marginTop: 4, color: '#555' }}>
                  Lý do: <i>{nhatKy.lyDo}</i>
                </div>
              )}
            </Timeline.Item>
          ))}
        </Timeline>
      )}
    </Modal>
  );
};

export default ModalLichSuThaoTac;
