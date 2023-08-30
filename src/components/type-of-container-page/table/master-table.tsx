import {
  EditOutlined,
  ExclamationCircleFilled,
  FilterFilled,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Modal, PaginationProps, Tag, Popconfirm } from 'antd';
import { ChangeEvent, Key, MouseEvent, useState } from 'react';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ColumnsState, ProColumns } from '@ant-design/pro-components';
import {
  FilterConfirmProps,
  FilterValue,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_CONTAINER_TYPE } from '@/fetcherAxios/endpoint';
import style from './index.module.scss';
import { formatDate } from '@/utils/format';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import {
  QueryInputParamType,
  QuerySelectParamType,
  STATUS_MASTER_COLORS,
  STATUS_MATER_LABELS,
  SelectSearch,
  ContainerTypeTable,
} from '../interface';
import {
  DEFAULT_PAGINATION,
  PaginationOfAntd,
  SkeletonTable,
} from '@/components/commons/table/table-deafault';
import { deleteContainerType, getLocationsSearch } from '../fetcher';
import { ColumnSearchTableProps } from '@/components/commons/search-table';
import TableUnit from '../../commons/table/table-unit';

const { confirm } = Modal;

const initalValueQueryInputParams = {
  searchAll: '',
  containerTypeCode: '',
  name: '',
  details: '',
  teus: '',
};

const initalValueQuerySelectParams = {
  statusContainerType: [],
};

const initalValueDisplayColumn = {
  operation: {
    order: 0,
    fixed: 'left' as const,
  },
  index: {
    order: 1,
    fixed: 'left' as const,
  },
  containerTypeCode: {
    order: 2,
  },
  name: {
    order: 3,
  },
  details: {
    order: 4,
  },
  teus: {
    order: 5,
  },
  statusContainerType: {
    order: 6,
  },
  dateInserted: {
    order: 7,
  },
  insertedByUser: {
    order: 8,
  },
  dateUpdated: {
    order: 9,
  },
  updatedByUser: {
    order: 10,
  },
};

const initalSelectSearch = {
  searchAll: {
    label: '',
    value: '',
  },
  containerTypeCode: {
    label: '',
    value: '',
  },
  name: {
    label: '',
    value: '',
  },
  details: {
    label: '',
    value: '',
  },
  teus: {
    label: '',
    value: '',
  },
  statusContainerType: {
    label: '',
    value: [],
  },
};

type DataIndex = keyof QueryInputParamType;

export default function MasterDataTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateContainerType } = useI18n('typeOfContainer');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParams
  );
  const [querySelectParams, setQuerySelectParams] =
    useState<QuerySelectParamType>(initalValueQuerySelectParams);
  const [dataTable, setDataTable] = useState<ContainerTypeTable[]>([]);
  const [selectedActiveKey, setSelectedActiveKey] =
    useState<SelectSearch>(initalSelectSearch);
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >(initalValueDisplayColumn);
  const [refreshingLoading, setRefreshingLoading] = useState(false);

  // Handle data
  const dataSelectSearch =
    querySelectParams.statusContainerType.length === 0
      ? {
          statusContainerType: [
            STATUS_MATER_LABELS.ACTIVE,
            STATUS_MATER_LABELS.DEACTIVE,
          ],
        }
      : querySelectParams;

  const locationsQuerySearch = useQuery({
    queryKey: [
      API_CONTAINER_TYPE.GET_SEARCH,
      pagination,
      queryInputParams,
      querySelectParams,
    ],
    queryFn: () =>
      getLocationsSearch({
        ...queryInputParams,
        ...dataSelectSearch,
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
            key: data.containerTypeID,
            containerTypeCode: data.containerTypeCode,
            name: data.name,
            details: data.details,
            teus: data.teus,
            statusContainerType: data.statusContainerType,
            dateInserted: data.dateInserted,
            insertedByUser: data.insertedByUser,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            isDelete: data.isDelete,
            dateDeleted: data.dateDeleted,
            deleteByUser: data.deleteByUser,
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

  const deleteContainerTypeMutation = useMutation({
    mutationFn: () => deleteContainerType(selectedRowKeys),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [
            API_CONTAINER_TYPE.GET_SEARCH,
            pagination,
            queryInputParams,
            querySelectParams,
          ],
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
    setSelectedActiveKey(initalSelectSearch);
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
    setSelectedActiveKey({
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
    setSelectedActiveKey((prevData) => ({
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
      ...querySelectParams,
      searchAll: '',
      statusUnit:
        filters.statusUnit?.length !== 0 && filters.statusUnit
          ? (filters.statusUnit as string[])
          : [],
    };
    setQuerySelectParams(newQueryParams);
  };

  const handleReset = (clearFilters: () => void, dataIndex: DataIndex) => {
    setQueryInputParams((prevData) => ({
      ...prevData,
      [dataIndex]: '',
    }));

    setSelectedActiveKey((prevData) => ({
      ...prevData,
      [dataIndex]: { label: dataIndex, value: '' },
    }));
    clearFilters();
  };

  // Handle data show table
  const columns: ProColumns<ContainerTypeTable>[] = [
    {
      title: (
        <div className={style.title}>{translateContainerType('code')}</div>
      ),
      dataIndex: 'index',
      width: 50,
      align: 'center',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      title: (
        <div className={style.title}>
          {translateContainerType('container_no')}
        </div>
      ),
      dataIndex: 'containerTypeCode',
      key: 'containerTypeCode',
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'containerTypeCode',
        },
      }),
    },
    {
      title: (
        <div className={style.title}>
          {translateContainerType('type_of_container')}
        </div>
      ),
      dataIndex: 'name',
      key: 'name',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'name',
        },
      }),
    },
    {
      title: (
        <div className={style.title}>{translateContainerType('detail')}</div>
      ),
      dataIndex: 'details',
      key: 'details',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'details',
        },
      }),
    },
    {
      title: (
        <div className={style.title}>{translateContainerType('teus')}</div>
      ),
      dataIndex: 'teus',
      key: 'teus',
      width: 100,
      align: 'right',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'teus',
        },
      }),
    },
    {
      title: (
        <div className={style.title}>{translateContainerType('status')}</div>
      ),
      width: 120,
      dataIndex: 'statusContainerType',
      key: 'statusContainerType',
      align: 'center',
      filters: Object.keys(STATUS_MATER_LABELS).map((key) => ({
        text: key,
        value: key,
      })),
      filterSearch: false,
      filteredValue: querySelectParams.statusContainerType || null,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.statusContainerType.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
      render: (value) => (
        <Tag
          color={
            STATUS_MASTER_COLORS[value as keyof typeof STATUS_MASTER_COLORS]
          }
          style={{
            margin: 0,
          }}
        >
          {STATUS_MATER_LABELS[value as keyof typeof STATUS_MATER_LABELS]}
        </Tag>
      ),
    },
    {
      title: (
        <div className={style.title}>{translateCommon('date_created')}</div>
      ),
      width: 150,
      dataIndex: 'dateInserted',
      key: 'dateInserted',
      align: 'right',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: <div className={style.title}>{translateCommon('creator')}</div>,
      width: 200,
      dataIndex: 'insertedByUser',
      key: 'insertedByUser',
      align: 'center',
    },
    {
      title: (
        <div className={style.title}>{translateCommon('date_inserted')}</div>
      ),
      width: 150,
      dataIndex: 'dateUpdated',
      key: 'dateUpdated',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: <div className={style.title}>{translateCommon('inserter')}</div>,
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
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => handleEditCustomer(value as string)}
            icon={<EditOutlined />}
            style={{
              marginRight: '10px',
            }}
          />
          <Popconfirm
            title={translateCommon('modal_delete.title')}
            okText={translateCommon('modal_delete.button_ok')}
            cancelText={translateCommon('modal_delete.button_cancel')}
            onConfirm={() => {
              setSelectedRowKeys([value as string]);
              deleteContainerTypeMutation.mutate();
            }}
          >
            <Button
              icon={<DeleteOutlined />}
              style={{
                color: COLORS.ERROR,
                borderColor: COLORS.ERROR,
              }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.TYPES_OF_CONTAINER_EDIT(id));
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
        deleteContainerTypeMutation.mutate();
      },
    });
  };

  const handleChangeInputSearchAll = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedActiveKey((prevData) => ({
      ...prevData,
      searchAll: {
        label: 'searchAll',
        value: e.target.value ? e.target.value : '',
      },
    }));
  };

  const handleOnDoubleClick = (
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: ContainerTypeTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.TYPES_OF_CONTAINER_EDIT(record.key, true));
    }
  };

  const handleCreate = () => {
    router.push(ROUTERS.TYPES_OF_CONTAINER_CREATE);
  };

  return (
    <div style={{ marginTop: -18 }}>
      {locationsQuerySearch.isLoading ? (
        <SkeletonTable />
      ) : (
        <TableUnit
          dataTable={dataTable}
          columns={columns}
          headerTitle={translateContainerType('title')}
          selectedRowKeys={selectedRowKeys}
          handleSelectionChange={handleSelectionChange}
          handlePaginationChange={handlePaginationChange}
          handleChangeInputSearchAll={handleChangeInputSearchAll}
          handleSearchInputKeyAll={handleSearchInputKeyAll}
          valueSearchAll={selectedActiveKey.searchAll.value}
          handleOnDoubleClick={handleOnDoubleClick}
          handleCreate={handleCreate}
          showPropsConfirmDelete={showPropsConfirmDelete}
          refreshingQuery={refreshingQuery}
          refreshingLoading={refreshingLoading}
          pagination={pagination}
          handleColumnsStateChange={handleColumnsStateChange}
          columnsStateMap={columnsStateMap}
          handleSearchSelect={handleSearchSelect}
          checkTableMaster={true}
        />
      )}
    </div>
  );
}
