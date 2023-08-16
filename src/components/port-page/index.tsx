import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  FilterFilled,
} from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Input,
  InputRef,
  PaginationProps,
  Space,
  TablePaginationConfig,
  Tag,
} from 'antd';
import { Key, useRef, useState } from 'react';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ColumnsState, ProColumns, ProTable } from '@ant-design/pro-components';
import style from './index.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getListCountry, getListPortSearch } from './fetcher';
import {
  ParamData,
  PortDataTable,
  STATUS_COLORS,
  STATUS_LABELS,
} from './interface';
import {
  DEFAULT_PAGINATION,
  PaginationDefaults,
  SkeletonTable,
} from '../commons/table-commons';
import { formatDate } from '@/utils/format';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps, FilterValue } from 'antd/lib/table/interface';
import { API_MASTER_DATA, API_PORT } from '@/fetcherAxios/endpoint';
import { getListTypePort } from '@/layout/fetcher';

type DataIndex = keyof ParamData;

const initalValueQueryParams = {
  searchAll: '',
  countryID: '',
  portName: '',
  portCode: '',
  address: '',
  typePortID: '',
};
const initalValueDisplayColumn = {
  index: {
    order: 0,
    fixed: 'left' as const,
  },
  portCode: {
    order: 1,
  },
  portName: {
    order: 2,
  },
  countryName: {
    order: 3,
  },
  typePorts: {
    order: 4,
  },
  status: {
    order: 5,
  },
  dateInserted: {
    order: 6,
  },
  insertedByUser: {
    order: 7,
  },
  dateUpdated: {
    order: 8,
  },
  updatedByUser: {
    order: 9,
  },
  operation: {
    order: 10,
    fixed: 'right' as const,
  },
};

interface SelectSearch {
  [key: string]: {
    label: string;
    value: string;
  };
}

export default function PortPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePort } = useI18n('port');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationDefaults>(DEFAULT_PAGINATION);
  const [queryParams, setQueryParams] = useState<ParamData>(
    initalValueQueryParams
  );
  const [searchTextAll, setSearchTextAll] = useState('');
  const [selectedKeyShow, setSelectedKeyShow] = useState<SelectSearch>({});
  const searchInput = useRef<InputRef>(null);
  const [refreshingLoading, setRefreshingLoading] = useState(false);
  const [dataTable, setDataTable] = useState<PortDataTable[]>([]);
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >(initalValueDisplayColumn);
  const typePorts = useQuery([API_MASTER_DATA.GET_TYPE_PORT], getListTypePort);

  const getCountries = useQuery({
    queryKey: [API_MASTER_DATA.GET_COUNTRY],
    queryFn: () =>
      getListCountry({
        currentPage: 1,
        pageSize: 500,
      }),
  });

  const handleSearchInputKeyPress = (value: string) => {
    setSearchTextAll(value);
    setQueryParams({
      searchAll: value,
      countryID: '',
      portName: '',
      portCode: '',
      address: '',
      typePortID: '',
    });
  };

  const handleSearch = (
    selectedKeys: string,
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    const newQueryParams = { ...queryParams };
    newQueryParams[dataIndex] = selectedKeys;
    setQueryParams(newQueryParams);
    confirm();
  };

  const handleReset = (clearFilters: () => void, dataIndex: DataIndex) => {
    setQueryParams((prevData) => ({
      ...prevData,
      [dataIndex]: '',
    }));
    setSelectedKeyShow((prevData) => ({
      ...prevData,
      [dataIndex]: { label: dataIndex, value: '' },
    }));
    clearFilters();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ProColumns<PortDataTable> => ({
    filterDropdown: ({ confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder="Search"
          value={selectedKeyShow[dataIndex]?.value}
          onChange={(e) => {
            setSelectedKeyShow((prevData) => ({
              ...prevData,
              [dataIndex]: { label: dataIndex, value: e.target.value },
            }));
          }}
          onPressEnter={() =>
            handleSearch(selectedKeyShow[dataIndex].value, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(
                selectedKeyShow[dataIndex]?.value || '',
                confirm,
                dataIndex
              )
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
    filterIcon: () => {
      const checkValueSelectedKeyShow = selectedKeyShow[dataIndex]?.value || '';
      return (
        <SearchOutlined
          style={{
            color:
              checkValueSelectedKeyShow.length !== 0 ||
              queryParams[dataIndex]?.length !== 0
                ? '#1677ff'
                : undefined,
          }}
        />
      );
    },
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
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[selectedKeyShow[dataIndex]?.value]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ),
  });

  const columns: ProColumns<PortDataTable>[] = [
    {
      title: translatePort('port_no'),
      dataIndex: 'index',
      width: 100,
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
      filteredValue: [queryParams.countryID] || null,
      filters:
        getCountries.data?.data.data.map((item) => ({
          text: item.countryName,
          value: item.countryID,
        })) || [],
      filterSearch: true,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                queryParams.countryID?.length !== 0 ? '#1890ff' : '#b1b1b1',
            }}
          />
        );
      },
      filterMultiple: false,
    },
    {
      title: translatePort('type_of_port'),
      width: 150,
      dataIndex: 'typePorts',
      key: 'typePorts',
      align: 'center',
      filteredValue: [queryParams.typePortID] || null,
      filters:
        typePorts.data?.data.map((data) => ({
          text: data.typePortName,
          value: data.typePortID,
        })) || [],
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                queryParams.typePortID?.length !== 0 ? '#1890ff' : '#b1b1b1',
            }}
          />
        );
      },
      filterMultiple: false,
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

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    const newQueryParams = {
      ...queryParams,
      searchAll: '',
      countryID:
        filters.countryName?.length !== 0 && filters.countryName
          ? (filters.countryName[0] as string)
          : '',
      typePortID:
        filters.typePorts?.length !== 0 && filters.typePorts
          ? (filters.typePorts[0] as string)
          : '',
    };
    setQueryParams(newQueryParams);
  };

  const portsQuerySearch = useQuery({
    queryKey: [API_PORT.GET_PORTS_SEARCH, pagination, queryParams],
    queryFn: () =>
      getListPortSearch({
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
            searchAll: '',
            typePortID: '',
          }))
        );
        pagination.current = currentPage;
        pagination.pageSize = pageSize;
        pagination.total = totalPages;
      } else {
        setDataTable([]);
      }
    },
    retry: 0,
  });

  const refreshingQuery = () => {
    setSearchTextAll('');
    setQueryParams(initalValueQueryParams);
    setRefreshingLoading(true);
    setPagination((state) => ({
      ...state,
      current: 1,
    }));
    portsQuerySearch.refetch();
    setTimeout(() => {
      setRefreshingLoading(false);
    }, 500);
  };

  const handleColumnsStateChange = (map: Record<string, ColumnsState>) => {
    setColumnsStateMap(map);
  };

  return (
    <>
      <ConfigProvider>
        {portsQuerySearch.isLoading ? (
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
              setting: true,
            }}
            onColumnsStateChange={handleColumnsStateChange}
            columnsStateMap={columnsStateMap}
            onRow={(record) => {
              return {
                onDoubleClick: (e) => {
                  const target = e.target as HTMLElement;
                  if (!target.closest('button')) {
                    router.push(ROUTERS.PORT_EDIT(record.key, true));
                  }
                },
              };
            }}
            onChange={handleTableChange}
            toolBarRender={() => [
              <Input.Search
                key={'Search'}
                placeholder="Search"
                onSearch={handleSearchInputKeyPress}
                value={searchTextAll}
                onChange={(e) =>
                  setSearchTextAll(e.target.value ? e.target.value : '')
                }
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
