import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Skeleton } from 'antd';

export const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 20,
};

export const SkeletonTable = () => {
  const data = [
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '4',
    },
    {
      id: '5',
    },
    {
      id: '6',
    },
    {
      id: '7',
    },
    {
      id: '8',
    },
    {
      id: '9',
    },
    {
      id: '10',
    },
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '4',
    },
    {
      id: '5',
    },
    {
      id: '6',
    },
    {
      id: '7',
    },
    {
      id: '8',
    },
    {
      id: '9',
    },
    {
      id: '10',
    },
  ];
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
