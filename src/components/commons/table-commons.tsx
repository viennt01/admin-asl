import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Skeleton } from 'antd';

export const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 20,
};

export const DEFAULT_PAGINATION_5 = {
  current: 1,
  pageSize: 5,
};

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalPages?: number;
}

export interface PaginationOfAntd {
  current: number;
  pageSize: number;
  total?: number;
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
