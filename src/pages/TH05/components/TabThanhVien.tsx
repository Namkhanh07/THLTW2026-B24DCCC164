import React, { useState, useMemo } from 'react';
import { Table, Button, Select, Space } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { KieuDonDangKy, KieuCauLacBo } from '../types';
import ModalDoiCauLacBo from './ModalDoiCauLacBo';

const TabThanhVien: React.FC = () => {
  const { danhSachDon, danhSachCLB, doiCLBHangLoat } = useModel('useModelCLB' as any);

  const [danhSachDaChon, setDanhSachDaChon] = useState<string[]>([]);
  const [hienModalDoi, setHienModalDoi] = useState(false);
  const [idCLBDangLoc, setIdCLBDangLoc] = useState<string | undefined>(undefined);

  const dsThanhVien = useMemo(() => {
    const daLoc = danhSachDon.filter(
      (don: KieuDonDangKy) => don.trangThai === 'Approved',
    );
    if (!idCLBDangLoc) return daLoc;
    return daLoc.filter((don: KieuDonDangKy) => don.idCLB === idCLBDangLoc);
  }, [danhSachDon, idCLBDangLoc]);

  const layTenCLB = (idCLB: string): string =>
    danhSachCLB.find((c: KieuCauLacBo) => c.id === idCLB)?.tenCLB || 'Không rõ';

  const xacNhanDoiCLB = (idCLBMoi: string) => {
    doiCLBHangLoat(danhSachDaChon, idCLBMoi);
    setHienModalDoi(false);
    setDanhSachDaChon([]);
  };

  const cauHinhCot = [
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      sorter: (a: KieuDonDangKy, b: KieuDonDangKy) => a.hoTen.localeCompare(b.hoTen),
    },
    { title: 'Email', dataIndex: 'email', ellipsis: true },
    { title: 'SĐT', dataIndex: 'sdt', width: 120 },
    { title: 'Giới tính', dataIndex: 'gioiTinh', width: 90 },
    { title: 'Sở trường', dataIndex: 'soTruong', ellipsis: true },
    {
      title: 'CLB hiện tại',
      dataIndex: 'idCLB',
      render: (idCLB: string) => layTenCLB(idCLB),
    },
  ];

  const cauHinhChon = {
    selectedRowKeys: danhSachDaChon,
    onChange: (danhSachKey: React.Key[]) => setDanhSachDaChon(danhSachKey as string[]),
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }} wrap>
        <span>Lọc theo CLB:</span>
        <Select
          allowClear
          placeholder="Tất cả Câu lạc bộ"
          style={{ width: 250 }}
          value={idCLBDangLoc}
          onChange={(giaTri) => setIdCLBDangLoc(giaTri)}
        >
          {danhSachCLB.map((clb: KieuCauLacBo) => (
            <Select.Option key={clb.id} value={clb.id}>
              {clb.tenCLB}
            </Select.Option>
          ))}
        </Select>
        <Button
          type="primary"
          icon={<SwapOutlined />}
          disabled={danhSachDaChon.length === 0}
          onClick={() => setHienModalDoi(true)}
        >
          Đổi CLB cho {danhSachDaChon.length} thành viên
        </Button>
      </Space>

      <Table
        bordered
        size="small"
        rowSelection={cauHinhChon}
        dataSource={dsThanhVien}
        rowKey="id"
        columns={cauHinhCot}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showTotal: (tong: number) => `Tổng: ${tong} thành viên`,
        }}
      />

      <ModalDoiCauLacBo
        hienThi={hienModalDoi}
        soLuongThanhVien={danhSachDaChon.length}
        danhSachCLB={danhSachCLB}
        onDong={() => setHienModalDoi(false)}
        onXacNhan={xacNhanDoiCLB}
      />
    </>
  );
};

export default TabThanhVien;