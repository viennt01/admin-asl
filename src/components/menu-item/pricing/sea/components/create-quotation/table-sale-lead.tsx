import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { getTablePartner } from '../../fetcher';
import { API_PARTNER } from '@/fetcherAxios/endpoint';
import { TablePartner } from '../../interface';

interface Props {
  idPartners: string[];
}

const columns: ColumnsType<TablePartner> = [
  {
    title: 'Name',
    dataIndex: 'fullName',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const TableSaleLead: React.FC<Props> = ({ idPartners }) => {
  console.log(idPartners);
  const [dataTable, setDataTable] = useState<TablePartner[]>([]);

  useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER_BY_IDS, idPartners],
    queryFn: () => getTablePartner({ id: idPartners }),
    enabled: idPartners !== undefined,
    onSuccess(data) {
      setDataTable([]);
      if (data.status) {
        if (data.data) {
          setDataTable(data.data);
        }
      }
    },
  });

  return (
    <div>
      <Table columns={columns} dataSource={dataTable} pagination={false} />
    </div>
  );
};

export default TableSaleLead;
