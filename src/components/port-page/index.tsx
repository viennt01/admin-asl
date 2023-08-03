import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, PaginationProps, Tag } from 'antd';
import { Key, useState } from 'react';
import CreatePort from './create-port';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import style from './index.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getListPort } from './fetcher';
import { PortData, STATUS_COLORS, STATUS_LABELS } from './interface';
import { DEFAULT_PAGINATION, SkeletonTable } from '../commons/table-commons';

export default function PortPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePort } = useI18n('port');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  const columns: ProColumns<PortData>[] = [
    {
      title: translatePort('port_no'),
      dataIndex: 'index',
      width: 100,
      fixed: 'left',
      align: 'center',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      title: translatePort('code'),
      dataIndex: 'portCode',
      width: 120,
      key: 'portCode',
      align: 'center',
    },
    {
      title: translatePort('name'),
      dataIndex: 'portName',
      width: 250,
      key: 'portName',
      align: 'center',
    },

    {
      title: translatePort('country_name'),
      width: 150,
      dataIndex: 'countryName',
      key: 'countryName',
      align: 'center',
    },

    {
      title: translatePort('type_of_port'),
      width: 150,
      dataIndex: 'typeOfPort',
      key: 'typeOfPort',
      align: 'center',
    },
    {
      title: translatePort('address'),
      dataIndex: 'address',
      width: 200,
      key: 'address',
      align: 'center',
    },
    {
      title: translatePort('company'),
      dataIndex: 'companyName',
      width: 200,
      key: 'companyName',
      align: 'center',
    },
    {
      title: translatePort('status'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 120,
      filters: [
        {
          text: 'Active',
          value: 'Active',
        },
        {
          text: 'Tạm ngừng',
          value: 'DeActive',
        },
      ],
      filterSearch: true,
      render: (value) => (
        <Tag
          color={STATUS_COLORS[value as keyof typeof STATUS_COLORS]}
          style={{
            margin: 0,
          }}
        >
          {STATUS_LABELS[value as keyof typeof STATUS_LABELS]}
        </Tag>
      ),
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translatePort('date_created')}
        </div>
      ),
      width: 150,
      dataIndex: 'insertedDate',
      key: 'insertedDate',
      align: 'center',
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translatePort('creator')}
        </div>
      ),
      width: 200,
      dataIndex: 'insertedBy',
      key: 'insertedBy',
      align: 'center',
    },
    {
      key: 'operation',
      fixed: 'right',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      render: (value) => (
        <Button
          onClick={() => handleEditCustomer(value as string)}
          icon={<EditOutlined />}
        />
      ),
    },
  ];

  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.PORT_EDIT(id));
  };

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    setPagination((state) => ({
      ...state,
      current: page,
      pageSize: size,
    }));
  };

  const portsQuery = useQuery({
    queryKey: ['ports', pagination],
    queryFn: () =>
      getListPort({
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      }),
    onSuccess(data) {
      if (data.status) {
        const { currentPage, pageSize, totalPages } = data.data;
        setPagination((state) => ({
          ...state,
          current: currentPage,
          pageSize: pageSize,
          total: totalPages,
        }));
      }
    },
  });

  return (
    <>
      <ConfigProvider>
        {portsQuery.isLoading ? (
          <SkeletonTable />
        ) : (
          <ProTable<PortData>
            headerTitle={translatePort('title')}
            className={style.table}
            style={{ marginTop: '8px' }}
            dataSource={portsQuery.data?.data?.data}
            columns={columns}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectedRowKeys,
              onChange: handleSelectionChange,
            }}
            pagination={{
              position: ['bottomCenter'],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              showSizeChanger: true,
              ...pagination,
              onChange: handlePaginationChange,
            }}
            search={false}
            // dateFormatter="string"
            scroll={{
              x: 'max-content',
            }}
            sticky={{ offsetHeader: 0 }}
            options={{
              fullScreen: true,
              search: true,
            }}
            toolBarRender={() => [
              <CreatePort key={'create'} />,
              <Button
                icon={<DeleteOutlined />}
                style={{
                  backgroundColor: COLORS.RED,
                  color: COLORS.WHITE,
                  borderColor: COLORS.RED,
                  fontWeight: '500',
                }}
                key={'delete'}
              >
                {translateCommon('button_delete')}
              </Button>,
            ]}
          />
        )}
      </ConfigProvider>
    </>
  );
}
