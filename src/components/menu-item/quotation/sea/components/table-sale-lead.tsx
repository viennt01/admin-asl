import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { API_PARTNER } from '@/fetcherAxios/endpoint';
import { TablePartner } from '@/components/menu-item/pricing/sea/interface';
import { getUserPartnerId } from '@/components/menu-item/pricing/sea/fetcher';
import { EyeOutlined } from '@ant-design/icons';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
interface Props {
  idPartners: string[];
}

const TableSaleLead: React.FC<Props> = ({ idPartners }) => {
  const router = useRouter();
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
      title: 'Company Name',
      dataIndex: 'companyName',
    },
    {
      key: 'operation',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      render: (value) => (
        <div style={{ display: 'flex' }}>
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
  useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER_BY_IDS, idPartners],
    queryFn: () => getUserPartnerId({ ids: idPartners }),
    enabled: idPartners !== undefined,
    onSuccess(data) {
      setDataTable([]);
      if (data.status) {
        if (data.data) {
          setDataTable(
            data.data.map((item) => ({
              key: item.userID,
              email: item.email,
              phoneNumber: item.phoneNumber,
              fullName: item.fullName,
              companyName: item.companyName,
            }))
          );
        }
      }
    },
  });

  return (
    <div>
      <Table columns={columns} dataSource={dataTable} />
    </div>
  );
};

export default TableSaleLead;
