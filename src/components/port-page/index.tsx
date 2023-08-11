import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Input,
  InputRef,
  PaginationProps,
  Space,
  Tag,
} from 'antd';
import { Key, useRef, useState } from 'react';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import style from './index.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getListPort } from './fetcher';
import {
  ParamData,
  PortDataTable,
  STATUS_COLORS,
  STATUS_LABELS,
} from './interface';
import { DEFAULT_PAGINATION, SkeletonTable } from '../commons/table-commons';
import { formatDate } from '@/utils/format';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { API_PORT } from '@/fetcherAxios/endpoint';
const initalValueQueryParams = {
  countryID: '',
  portName: '',
  portCode: '',
  address: '',
};

export default function PortPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePort } = useI18n('port');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [queryParams, setQueryParams] = useState<ParamData>(
    initalValueQueryParams
  );
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [refreshingLoading, setRefreshingLoading] = useState(false);
  const [dataTable, setDataTable] = useState<PortDataTable[]>([]);
  type DataIndex = keyof ParamData;

  const handleSearchInputKeyPress = (value: string) => {
    console.log('Entered search text:', value);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    const newQueryParams = { ...queryParams };
    newQueryParams[dataIndex] = selectedKeys[0];
    setQueryParams(newQueryParams);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void, dataIndex: DataIndex) => {
    const newQueryParams = { ...queryParams };
    newQueryParams[dataIndex] = '';
    setQueryParams(newQueryParams);
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ProColumns<PortDataTable> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder="Search"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ProColumns<PortDataTable>[] = [
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
      ...getColumnSearchProps('portCode'),
    },
    {
      title: translatePort('name'),
      dataIndex: 'portName',
      width: 250,
      key: 'portName',
      align: 'center',
      ...getColumnSearchProps('portName'),
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
      dataIndex: 'typePorts',
      key: 'typePorts',
      align: 'center',
      render: (value: any) =>
        value.map(function (type: {
          typePortID: string;
          typePortName: string;
        }) {
          return <Tag key={type.typePortID}>{type.typePortName}</Tag>;
        }),
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
          value: '1',
        },
        {
          text: 'Tạm ngừng',
          value: '2',
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
      title: translatePort('date_created'),
      width: 150,
      dataIndex: 'dateInserted',
      key: 'dateInserted',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translatePort('creator'),
      width: 200,
      dataIndex: 'insertedByUser',
      key: 'insertedByUser',
      align: 'center',
    },
    {
      title: translatePort('date_inserted'),
      width: 150,
      dataIndex: 'dateUpdated',
      key: 'dateUpdated',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translatePort('inserter'),
      width: 200,
      dataIndex: 'updatedByUser',
      key: 'updatedByUser',
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
    queryKey: [API_PORT.GET_PORTS, pagination, queryParams],
    queryFn: () =>
      getListPort({
        ...queryParams,
        paginateRequest: {
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
        },
      }),
    onSuccess(data) {
      if (data.status) {
        const { currentPage, pageSize, totalPages } = data.data;
        setDataTable(
          data.data.data.map((data) => ({
            key: data.portID,
            countryID: data.countryID,
            portName: data.portName,
            portCode: data.portCode,
            typePorts: data.typePorts,
            status: data.status,
            description: data.description,
            address: data.address,
            dateInserted: data.dateInserted,
            insertedByUser: data.insertedByUser,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            countryName: data.countryName,
          }))
        );
        setPagination((state) => ({
          ...state,
          current: currentPage,
          pageSize: pageSize,
          total: totalPages,
        }));
      }
    },
  });

  const refreshingQuery = () => {
    setSearchText('');
    setQueryParams(initalValueQueryParams);
    setRefreshingLoading(true);
    portsQuery.refetch();
    setTimeout(() => {
      setRefreshingLoading(false);
    }, 500);
  };

  return (
    <>
      <ConfigProvider>
        {portsQuery.isLoading ? (
          <SkeletonTable />
        ) : (
          <ProTable<PortDataTable>
            headerTitle={translatePort('title')}
            className={style.table}
            style={{ marginTop: '8px' }}
            dataSource={dataTable}
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
            scroll={{
              x: 'max-content',
            }}
            sticky={{ offsetHeader: 0 }}
            options={{
              fullScreen: true,
              reload: false,
            }}
            onRow={(record) => {
              return {
                onClick: (e) => {
                  const target = e.target as HTMLElement;
                  if (!target.closest('button')) {
                    router.push(ROUTERS.PORT_EDIT(record.key, true));
                  }
                },
              };
            }}
            toolBarRender={() => [
              <Input.Search
                key={'Search'}
                placeholder="Search"
                onSearch={handleSearchInputKeyPress}
              />,
              <Button
                key={'create'}
                icon={<PlusOutlined />}
                style={{
                  marginRight: '4px',
                  backgroundColor: COLORS.BRIGHT,
                  color: COLORS.GREEN,
                  borderColor: COLORS.GREEN,
                  fontWeight: '500',
                }}
                onClick={() => {
                  router.push(ROUTERS.PORT_CREATE);
                }}
              >
                {translateCommon('button_add')}
              </Button>,
              <Button
                key={'delete'}
                icon={<DeleteOutlined />}
                style={{
                  backgroundColor: COLORS.RED,
                  color: COLORS.WHITE,
                  borderColor: COLORS.RED,
                  fontWeight: '500',
                }}
              >
                {translateCommon('button_delete')}
              </Button>,
              <Button
                key={'refresh'}
                onClick={() => refreshingQuery()}
                icon={<ReloadOutlined />}
                loading={refreshingLoading}
                style={{
                  width: 32,
                  height: 32,
                  padding: 6,
                }}
              />,
            ]}
          />
        )}
      </ConfigProvider>
    </>
  );
}
