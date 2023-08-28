import { Key, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ColumnSearchTableProps } from '../commons/search-table';
import style from './index.module.scss';
import { formatDate } from '@/utils/format';
import { ColumnsState, ProColumns, ProTable } from '@ant-design/pro-components';
import { deletePort, getListPortSearch } from './fetcher';
import { FilterConfirmProps, FilterValue } from 'antd/lib/table/interface';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  FilterFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  PaginationProps,
  TablePaginationConfig,
  Tag,
} from 'antd';
import {
  QueryParamType,
  PortDataTable,
  STATUS_COLORS,
  STATUS_LABELS,
  SelectSearch,
} from './interface';
import {
  DEFAULT_PAGINATION,
  PaginationOfAntd,
  SkeletonTable,
} from '../commons/table/table-deafault';
import { API_MASTER_DATA, API_LOCATION } from '@/fetcherAxios/endpoint';
import { getListCountry, getListTypePort } from '@/layout/fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

const { confirm } = Modal;

type DataIndex = keyof QueryParamType;

const initalValueQueryParams = {
  searchAll: '',
  countryID: '',
  portName: '',
  portCode: '',
  address: '',
  typePort: '',
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

const initalSelectSearch = {
  searchAll: {
    label: '',
    value: '',
  },
  countryID: {
    label: '',
    value: '',
  },
  portName: {
    label: '',
    value: '',
  },
  portCode: {
    label: '',
    value: '',
  },
  address: {
    label: '',
    value: '',
  },
  typePort: {
    label: '',
    value: '',
  },
};

export default function LocationPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateLocation } = useI18n('location');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryParams, setQueryParams] = useState<QueryParamType>(
    initalValueQueryParams
  );
  const [selectedKeyShow, setSelectedKeyShow] =
    useState<SelectSearch>(initalSelectSearch);
  const [refreshingLoading, setRefreshingLoading] = useState(false);
  const [dataTable, setDataTable] = useState<PortDataTable[]>([]);
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >(initalValueDisplayColumn);

  // Handle data
  const typePorts = useQuery([API_MASTER_DATA.GET_TYPE_PORT], getListTypePort);
  const countries = useQuery([API_MASTER_DATA.GET_COUNTRY], () =>
    getListCountry({
      currentPage: 1,
      pageSize: 500,
    })
  );

  const portsQuerySearch = useQuery({
    queryKey: [API_LOCATION.GET_LOCATION_SEARCH, pagination, queryParams],
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
            typePort: '',
          }))
        );
        pagination.current = currentPage;
        pagination.pageSize = pageSize;
        pagination.total = totalPages;
      } else {
        setDataTable([]);
      }
    },
  });

  const deletePortMutation = useMutation({
    mutationFn: () => deletePort(selectedRowKeys),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [API_LOCATION.GET_LOCATION_SEARCH, pagination, queryParams],
          exact: true,
        });
        setSelectedRowKeys([]);
      } else {
        errorToast(data.message);
      }
    },
    onError: () => {
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const refreshingQuery = () => {
    setSelectedKeyShow(initalSelectSearch);
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

  // Handle search
  const handleSearchInputKeyAll = (value: string) => {
    setSelectedKeyShow({
      ...initalSelectSearch,
      searchAll: {
        label: 'searchAll',
        value: value,
      },
    });
    setQueryParams({
      ...initalValueQueryParams,
      searchAll: value,
    });
  };

  const handleSearchInput = (
    selectedKeys: string,
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    setSelectedKeyShow((prevData) => ({
      ...prevData,
      [dataIndex]: {
        label: dataIndex,
        value: selectedKeys,
      },
      searchAll: {
        label: 'searchAll',
        value: '',
      },
    }));
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

  // Handle data show table
  const columns: ProColumns<PortDataTable>[] = [
    {
      title: translateLocation('port_no'),
      dataIndex: 'index',
      width: 50,
      align: 'center',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      title: translateLocation('code'),
      dataIndex: 'portCode',
      width: 120,
      key: 'portCode',
      align: 'center',
      ...ColumnSearchTableProps<QueryParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'portCode',
        },
      }),
    },
    {
      title: translateLocation('name'),
      dataIndex: 'portName',
      key: 'portName',
      align: 'center',
      ...ColumnSearchTableProps<QueryParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'portName',
        },
      }),
    },
    {
      title: translateLocation('country_name'),
      width: 150,
      dataIndex: 'countryName',
      key: 'countryName',
      align: 'center',
      filteredValue: [queryParams.countryID] || null,
      filters:
        countries.data?.data?.data.map((item) => ({
          text: item.countryName,
          value: item.countryID,
        })) || [],
      filterSearch: true,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                queryParams.countryID?.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
      filterMultiple: false,
    },
    {
      title: translateLocation('type_of_port'),
      dataIndex: 'typePorts',
      key: 'typePorts',
      align: 'center',
      filteredValue: [queryParams.typePort] || null,
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
                queryParams.typePort?.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
      filterMultiple: false,
      render: (_, value) =>
        value.typePorts.map((type) => {
          return <Tag key={type.typePortID}>{type.typePortName}</Tag>;
        }),
    },
    {
      title: translateLocation('status'),
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
      title: translateCommon('date_created'),
      width: 150,
      dataIndex: 'dateInserted',
      key: 'dateInserted',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translateCommon('creator'),
      width: 200,
      dataIndex: 'insertedByUser',
      key: 'insertedByUser',
      align: 'center',
    },
    {
      title: translateCommon('date_inserted'),
      width: 150,
      dataIndex: 'dateUpdated',
      key: 'dateUpdated',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translateCommon('inserter'),
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

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.LOCATION_EDIT(id));
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
      typePort:
        filters.typePorts?.length !== 0 && filters.typePorts
          ? (filters.typePorts[0] as string)
          : '',
    };
    setQueryParams(newQueryParams);
  };

  const handleColumnsStateChange = (map: Record<string, ColumnsState>) => {
    setColumnsStateMap(map);
  };

  const showPropsConfirmDelete = () => {
    confirm({
      icon: <ExclamationCircleFilled />,
      title: translateCommon('modal_delete.title'),
      okText: translateCommon('modal_delete.button_ok'),
      cancelText: translateCommon('modal_delete.button_cancel'),
      okType: 'danger',
      onOk() {
        deletePortMutation.mutate();
      },
    });
  };

  return (
    <>
      <ConfigProvider>
        {portsQuerySearch.isLoading ? (
          <SkeletonTable />
        ) : (
          <ProTable<PortDataTable>
            headerTitle={translateLocation('title')}
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
                    router.push(ROUTERS.LOCATION_EDIT(record.key, true));
                  }
                },
              };
            }}
            onChange={handleTableChange}
            toolBarRender={() => [
              <Input.Search
                key={'Search'}
                placeholder={translateCommon('search')}
                onSearch={handleSearchInputKeyAll}
                value={selectedKeyShow.searchAll.value}
                onChange={(e) => {
                  setSelectedKeyShow((prevData) => ({
                    ...prevData,
                    searchAll: {
                      label: 'searchAll',
                      value: e.target.value ? e.target.value : '',
                    },
                  }));
                }}
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
                  router.push(ROUTERS.LOCATION_CREATE);
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
                onClick={showPropsConfirmDelete}
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
