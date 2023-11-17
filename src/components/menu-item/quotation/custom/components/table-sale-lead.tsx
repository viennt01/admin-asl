import React, {
  Dispatch,
  Key,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { API_PARTNER } from '@/fetcherAxios/endpoint';
import { TablePartner } from '@/components/menu-item/pricing/sea/interface';
import {
  getTablePartnerByGroup,
  getTablePartnerId,
} from '@/components/menu-item/pricing/sea/fetcher';

interface Props {
  idPartners: string[];
  idGroupPartner: string[];
  selectedRowKeys: Key[];
  setSelectedRowKeys: Dispatch<SetStateAction<Key[]>>;
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
const TableSaleLead: React.FC<Props> = ({
  idPartners,
  idGroupPartner,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  const [dataTableId, setDataTableId] = useState<TablePartner[]>([]);
  const [dataTableGroup, setDataTableGroup] = useState<TablePartner[]>([]);
  const [dataTable, setDataTable] = useState<TablePartner[]>([]);

  useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER_BY_IDS, idPartners],
    queryFn: () => getTablePartnerId({ ids: idPartners }),
    enabled: idPartners !== undefined,
    onSuccess(data) {
      // setDataTable([]);
      if (data.status) {
        if (data.data) {
          const newData =
            data.data.map((item) => ({
              key: item.userID,
              userID: item.userID,
              email: item.email,
              fullName: item.fullName,
              companyName: item.companyName,
              cityName: item.cityName,
              nationality: item.nationality,
            })) || [];

          setDataTableId(newData);
          const newDataSelect = data.data.map((item) => item.userID);
          setSelectedRowKeys([...selectedRowKeys, ...newDataSelect]);
        }
      }
    },
  });

  useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER_BY_GROUPS_ID, idGroupPartner],
    queryFn: () => getTablePartnerByGroup({ ids: idGroupPartner }),
    enabled: idGroupPartner !== undefined,
    onSuccess(data) {
      if (data.status) {
        if (data.data) {
          const newData = data.data.map((item) => ({
            key: item.userID,
            userID: item.userID,
            email: item.email,
            fullName: item.fullName,
            companyName: item.companyName,
            cityName: item.cityName,
            nationality: item.nationality,
          }));
          setDataTableGroup((prevData) => [...newData, ...prevData]);
          const newDataSelect = data.data.map((item) => item.userID);
          setSelectedRowKeys([...selectedRowKeys, ...newDataSelect]);
        }
      }
    },
  });
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    setDataTable([...dataTableId, ...dataTableGroup]);
  }, [dataTableId, dataTableGroup]);

  return (
    <div>
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={columns}
        dataSource={dataTable}
      />
    </div>
  );
};

export default TableSaleLead;
