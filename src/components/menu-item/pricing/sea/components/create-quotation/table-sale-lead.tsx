import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { getTablePartnerId } from '../../fetcher';
import { API_PARTNER } from '@/fetcherAxios/endpoint';
import { TablePartner } from '../../interface';

interface Props {
  idPartners: string[];
}

const columns: ColumnsType<TablePartner> = [
  {
    title: 'No',
    dataIndex: 'index',
    width: 50,
    align: 'right',
    render: (_, record, index) => {
      return index + 1;
    },
  },
  {
    title: 'Name',
    dataIndex: 'fullName',
  },
];

const TableSaleLead: React.FC<Props> = ({ idPartners }) => {
  const [dataTable, setDataTable] = useState<TablePartner[]>([]);

  useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER_BY_IDS, idPartners],
    queryFn: () => getTablePartnerId({ ids: idPartners }),
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
      <Table
        columns={columns}
        dataSource={dataTable}
        pagination={{
          pageSize: 15,
        }}
      />
    </div>
  );
};

export default TableSaleLead;
