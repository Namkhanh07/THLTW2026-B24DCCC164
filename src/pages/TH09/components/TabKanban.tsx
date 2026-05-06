import React, { useState, useMemo } from 'react';
import { Card, Tag, Typography, Button, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useModel } from 'umi';
import type { KieuTask, TrangThaiTask } from '../types';
import { TEN_TRANG_THAI, MAU_TRANG_THAI, TEN_MUC_DO, MAU_MUC_DO } from '../constants';
import FormTask from './FormTask';

const DS_COT: TrangThaiTask[] = ['CanLam', 'DangLam', 'HoanThanh'];

const TabKanban: React.FC = () => {
  const { danhSachTask, themTask, suaTask, xoaTask, sapXepLaiTask } = useModel('useModelCongViec' as any) as {
    danhSachTask: KieuTask[];
    themTask: (t: any) => void;
    suaTask: (id: string, dl: any) => void;
    xoaTask: (id: string) => void;
    sapXepLaiTask: (ds: KieuTask[]) => void;
  };

  const [hienForm, setHienForm] = useState(false);
  const [banGhiSua, setBanGhiSua] = useState<KieuTask | null>(null);

  const taskTheoCot = useMemo(() => {
    const result: Record<TrangThaiTask, KieuTask[]> = {
      CanLam: [],
      DangLam: [],
      HoanThanh: [],
    };
    danhSachTask.forEach((t) => {
      if (result[t.trangThai]) result[t.trangThai].push(t);
    });
    return result;
  }, [danhSachTask]);

  const xuLyKeoTha = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const nguonCot = source.droppableId as TrangThaiTask;
    const dichCot = destination.droppableId as TrangThaiTask;
    const dsMoi = [...danhSachTask];
    const taskId = taskTheoCot[nguonCot][source.index]?.id;
    if (!taskId) return;
    const idx = dsMoi.findIndex((t) => t.id === taskId);
    if (idx === -1) return;
    dsMoi[idx] = { ...dsMoi[idx], trangThai: dichCot };
    sapXepLaiTask(dsMoi);
  };

  const homNay = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setBanGhiSua(null); setHienForm(true); }}>
          Thêm task
        </Button>
      </div>

      <DragDropContext onDragEnd={xuLyKeoTha}>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto' }}>
          {DS_COT.map((cot) => (
            <Droppable key={cot} droppableId={cot}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    flex: 1,
                    minWidth: 280,
                    background: snapshot.isDraggingOver ? '#e6f7ff' : '#f0f2f5',
                    borderRadius: 8,
                    padding: 12,
                    minHeight: 400,
                  }}
                >
                  <div style={{
                    textAlign: 'center',
                    marginBottom: 12,
                    padding: '8px 0',
                    background: MAU_TRANG_THAI[cot],
                    borderRadius: 6,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                    {TEN_TRANG_THAI[cot]} ({taskTheoCot[cot].length})
                  </div>

                  {taskTheoCot[cot].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(prov, snap) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          style={{
                            marginBottom: 8,
                            ...prov.draggableProps.style,
                          }}
                        >
                          <Card
                            size="small"
                            style={{
                              borderLeft: `3px solid ${MAU_MUC_DO[task.mucDoUuTien]}`,
                              boxShadow: snap.isDragging ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.08)',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <Typography.Text strong style={{ flex: 1 }}>{task.tenTask}</Typography.Text>
                              <Space size={4}>
                                <Button size="small" type="text" icon={<EditOutlined />} onClick={() => { setBanGhiSua(task); setHienForm(true); }} />
                                <Popconfirm title="Xóa task này?" onConfirm={() => xoaTask(task.id)} okText="Xóa" cancelText="Hủy">
                                  <Button size="small" type="text" icon={<DeleteOutlined />} danger />
                                </Popconfirm>
                              </Space>
                            </div>
                            {task.moTa && (
                              <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ marginBottom: 8, fontSize: 12 }}>
                                {task.moTa}
                              </Typography.Paragraph>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                              <div>
                                <Tag color={MAU_MUC_DO[task.mucDoUuTien]}>{TEN_MUC_DO[task.mucDoUuTien]}</Tag>
                                <Tag>{task.tag}</Tag>
                              </div>
                              <Typography.Text
                                type={task.deadline < homNay && task.trangThai !== 'HoanThanh' ? 'danger' : 'secondary'}
                                style={{ fontSize: 12 }}
                              >
                                <ClockCircleOutlined /> {task.deadline}
                              </Typography.Text>
                            </div>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <FormTask
        hienThi={hienForm}
        banGhiSua={banGhiSua}
        onDong={() => { setHienForm(false); setBanGhiSua(null); }}
        onLuu={(duLieu) => {
          if (banGhiSua) suaTask(banGhiSua.id, duLieu);
          else themTask(duLieu);
          setHienForm(false);
          setBanGhiSua(null);
        }}
      />
    </div>
  );
};

export default TabKanban;
