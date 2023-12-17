import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  Partner,
  TablePartner,
} from '@/components/menu-item/pricing/sea/interface';
import { EyeOutlined } from '@ant-design/icons';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import { AppContext } from '@/app-context';
import { ROLE } from '@/constant/permission';
interface Props {
  dataTablePartner: Partner[];
}

const TableSaleLead: React.FC<Props> = ({ dataTablePartner }) => {
  const router = useRouter();
  const { role } = useContext(AppContext);

  const [dataTable, setDataTable] = useState<TablePartner[]>([]);
  const columns: ColumnsType<TablePartner> = [
    {
      title: 'Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      key: 'operation',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      render: (value) => (
        <div
          style={{
            marginTop: 10,
            display: role === ROLE.MANAGER ? '' : 'none',
          }}
        >
          <Button
            onClick={() => router.push(ROUTERS.USER_DETAIL(value))}
            icon={<EyeOutlined />}
            style={{
              marginRight: '10px',
            }}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    setDataTable(
      dataTablePartner.map((item) => ({
        key: item.userID,
        email: item.email,
        phoneNumber: item.phoneNumber,
        fullName: item.fullName,
      }))
    );
  }, [dataTablePartner]);
  return (
    <div>
      <Table columns={columns} dataSource={dataTable} />
    </div>
  );
};

export default TableSaleLead;
