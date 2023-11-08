import { ColumnsState, ProColumns, ProTable } from '@ant-design/pro-components';
import { Skeleton } from 'antd';

export const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 20,
};

export const DEFAULT_PAGINATION_5 = {
  current: 1,
  pageSize: 5,
};

export interface IPagination {
  currentPage: number;
  pageSize: number;
  totalPages?: number;
}

export interface IPaginationOfAntd {
  current: number;
  pageSize: number;
  total?: number;
}

export enum DENSITY {
  'Larger' = 'Larger',
  'Middle' = 'Middle',
  'Compact' = 'Compact',
}

export enum TABLE_NAME {
  LOCATION = 'Location',
  TYPE_OF_LOCATION = 'Type of Location',
  FEE = 'Fee',
  TYPE_FEE = 'Type Fee',
  FEE_GROUP = 'Fee Group',
  CURRENCY = 'Currency',
  BANK = 'Bank',
  COMMODITY = 'Commodity',
  TYPE_OF_CONTAINER = 'Type of Container',
  UNIT = 'Unit',
  TYPE_OF_UNIT = 'Type of Unit',
  TYPE_OF_FEE_GROUP = 'Type of Fee Group',
  USER = 'User',
  LOAD_CAPACITY = 'Load Capacity',
  TYPE_OF_LOAD_CAPACITY = 'Type of Load Capacity',
}

export interface ColumnTable {
  tableName: string;
  density: DENSITY;
  columnFixed: Record<string, ColumnsState>;
}

export const SkeletonTable = () => {
  const data = [];
  for (let i = 0; i < 19; i++) {
    data.push({
      id: `${i + 1}`,
    });
  }

  const columns: ProColumns<[]>[] = [
    {
      title: 'Skeleton',
      dataIndex: 'index',
    },
    {
      title: 'Skeleton',
      dataIndex: 'index',
    },
    {
      title: 'Skeleton',
      dataIndex: 'index',
    },
    {
      title: 'Skeleton',
      dataIndex: 'index',
    },
    {
      title: 'Skeleton',
      dataIndex: 'index',
    },
    {
      title: 'Skeleton',
      dataIndex: 'index',
    },
  ];
  return (
    <ProTable
      style={{ marginTop: '8px' }}
      search={false}
      dataSource={data}
      columns={columns.map((column) => {
        return {
          render: function renderPlaceholder() {
            return <Skeleton key={column.key} title paragraph={false} />;
          },
        };
      })}
      pagination={false}
    />
  );
};
