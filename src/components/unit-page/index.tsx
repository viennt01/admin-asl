import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  ExclamationCircleFilled,
  FilterFilled,
} from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  PaginationProps,
  Tag,
} from 'antd';
import { Key, useState } from 'react';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ColumnsState, ProColumns, ProTable } from '@ant-design/pro-components';
import {
  FilterConfirmProps,
  FilterValue,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import style from './index.module.scss';
import { useQuery } from '@tanstack/react-query';
import { API_UNIT } from '@/fetcherAxios/endpoint';
import { getLocationsSearch } from './fetcher';
import {
  DEFAULT_PAGINATION,
  PaginationOfAntd,
  SkeletonTable,
} from '../commons/table-commons';
import {
  LocationTable,
  QueryInputParamType,
  QuerySelectParamType,
  STATUS_COLORS,
  STATUS_LABELS,
  SelectSearch,
  StatusItem,
} from './interface';
import { ColumnSearchTableProps } from '../commons/search-table';
import { formatDate } from '@/utils/format';

const { confirm } = Modal;

const initalValueQueryInputParams = {
  searchAll: '',
  internationalCode: '',
  description: '',
};

const initalValueQuerySelectParams = {
  status: 0,
};

const initalValueDisplayColumn = {
  index: {
    order: 0,
    fixed: 'left' as const,
  },
  internationalCode: {
    order: 1,
  },
  description: {
    order: 2,
  },
  status: {
    order: 3,
  },
  dateInserted: {
    order: 4,
  },
  insertedByUser: {
    order: 5,
  },
  dateUpdated: {
    order: 6,
  },
  updatedByUser: {
    order: 7,
  },
  operation: {
    order: 8,
    fixed: 'right' as const,
  },
};

const initalSelectSearch = {
  searchAll: {
    label: '',
    value: '',
  },
  internationalCode: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  status: {
    label: '',
    value: 0,
  },
};

type DataIndex = keyof QueryInputParamType;

const STATUS: StatusItem[] = Object.keys(STATUS_COLORS).map((value) => ({
  text: STATUS_LABELS[parseInt(value) as keyof typeof STATUS_LABELS],
  value: parseInt(value),
}));

export default function CalculationUnitPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateUnit } = useI18n('unit');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParams
  );
  const [querySelectParams, setQuerySelectParams] =
    useState<QuerySelectParamType>(initalValueQuerySelectParams);
  const [dataTable, setDataTable] = useState<LocationTable[]>([]);
  const [selectedKeyShow, setSelectedKeyShow] =
    useState<SelectSearch>(initalSelectSearch);
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >(initalValueDisplayColumn);
  const [refreshingLoading, setRefreshingLoading] = useState(false);

  // Handle data
  const locationsQuerySearch = useQuery({
    queryKey: [
      API_UNIT.GET_UNIT_SEARCH,
      pagination,
      queryInputParams,
      querySelectParams,
    ],
    queryFn: () =>
      getLocationsSearch({
        ...queryInputParams,
        ...querySelectParams,
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
            key: data.unitID,
            internationalCode: data.internationalCode,
            description: data.description,
            status: data.status,
            dateInserted: data.dateInserted,
            insertedByUser: data.insertedByUser,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            searchAll: '',
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

  const refreshingQuery = () => {
    setSelectedKeyShow(initalSelectSearch);
    setQueryInputParams(initalValueQueryInputParams);
    setRefreshingLoading(true);
    setPagination((state) => ({
      ...state,
      current: 1,
    }));
    locationsQuerySearch.refetch();
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
    setQueryInputParams({
      ...initalValueQueryInputParams,
      searchAll: value,
    });
    setQuerySelectParams({
      ...initalValueQuerySelectParams,
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
    const newQueryParams = { ...queryInputParams };
    newQueryParams[dataIndex] = selectedKeys;
    newQueryParams.searchAll = '';
    setQueryInputParams(newQueryParams);
    confirm();
  };

  const handleSearchSelect = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    const newQueryParams = {
      ...queryInputParams,
      searchAll: '',
      status:
        filters.status?.length !== 0 && filters.status
          ? (filters.status[0] as number)
          : 0,
    };
    setQuerySelectParams(newQueryParams);
  };

  const handleReset = (clearFilters: () => void, dataIndex: DataIndex) => {
    setQueryInputParams((prevData) => ({
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
  const columns: ProColumns<LocationTable>[] = [
    {
      title: translateUnit('code'),
      dataIndex: 'index',
      width: 50,
      align: 'center',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      title: translateUnit('international_code'),
      dataIndex: 'internationalCode',
      key: 'internationalCode',
      width: 250,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'internationalCode',
        },
      }),
    },
    {
      title: translateUnit('description'),
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'description',
        },
      }),
    },
    {
      title: translateUnit('status'),
      width: 120,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: STATUS,
      filterSearch: false,
      filterMultiple: false,
      filteredValue: [querySelectParams.status] || null,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.status !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
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
    router.push(ROUTERS.UNIT_EDIT(id));
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
        // deletePortMutation.mutate();
      },
    });
  };

  return (
    <>
      <ConfigProvider>
        {locationsQuerySearch.isLoading ? (
          <SkeletonTable />
        ) : (
          <ProTable<LocationTable>
            headerTitle={translateUnit('title')}
            className={style.table}
            dataSource={dataTable}
            columns={columns}
            style={{ marginTop: '8px' }}
            rowKey="key"
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
            onChange={handleSearchSelect}
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
