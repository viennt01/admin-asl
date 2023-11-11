import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { API_PARTNER } from '@/fetcherAxios/endpoint';
import { TablePartner } from '@/components/menu-item/pricing/sea/interface';
import { getTablePartner } from '@/components/menu-item/pricing/sea/fetcher';

interface Props {
  idPartners: string[];
}

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
    title: 'Company Name',
    dataIndex: 'companyName',
  },
  {
    title: 'City Name',
    dataIndex: 'cityName',
  },
  {
    title: 'Nationality',
    dataIndex: 'nationality',
  },
];
const TableSaleLead: React.FC<Props> = ({ idPartners }) => {
  const [dataTable, setDataTable] = useState<TablePartner[]>([]);

  useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER_BY_IDS, idPartners],
    queryFn: () => getTablePartner({ ids: idPartners }),
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
      <Table columns={columns} dataSource={dataTable} />
    </div>
  );
};

export default TableSaleLead;
