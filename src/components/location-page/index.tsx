import { ChangeEvent, Key, useState, MouseEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { formatDate } from '@/utils/format';
import { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { deletePort, getListPortSearch } from './fetcher';
import { FilterValue } from 'antd/lib/table/interface';
import {
  EditOutlined,
  FilterFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import {
  Button,
  Modal,
  PaginationProps,
  TablePaginationConfig,
  Tag,
} from 'antd';
import {
  LocationDataTable,
  STATUS_COLORS,
  STATUS_LABELS,
  SelectSearch,
  QueryInputParamType,
  QuerySelectParamType,
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
import TableUnit from '../commons/table/table-unit';

const { confirm } = Modal;

const initalValueQueryInputParams = {
  searchAll: '',
};

const initalValueQuerySelectParams = {
  statusLocation: '',
  cityID: '',
  typeLocations: [],
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
  statusLocation: {
    label: '',
    value: '',
  },
  cityID: {
    label: '',
    value: '',
  },
  typeLocations: {
    label: '',
    value: [],
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
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParams
  );
  const [querySelectParams, setQuerySelectParams] =
    useState<QuerySelectParamType>(initalValueQuerySelectParams);
  const [selectedActiveKey, setSelectedActiveKey] =
    useState<SelectSearch>(initalSelectSearch);
  const [refreshingLoading, setRefreshingLoading] = useState(false);
  const [dataTable, setDataTable] = useState<LocationDataTable[]>([]);
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >(initalValueDisplayColumn);

  // Handle data
  const typePorts = useQuery(
    [API_MASTER_DATA.GET_TYPE_LOCATION],
    getListTypePort
  );
  const countries = useQuery([API_MASTER_DATA.GET_COUNTRY], () =>
    getListCountry({
      currentPage: 1,
      pageSize: 500,
    })
  );

  const portsQuerySearch = useQuery({
    queryKey: [
      API_LOCATION.GET_LOCATION_SEARCH,
      pagination,
      queryInputParams,
      querySelectParams,
    ],
    queryFn: () =>
      getListPortSearch({
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
            key: data.locationID,
            cityID: data.cityID,
            cityName: data.cityName,
            locationCode: data.locationCode,
            locationName: data.locationName,
            typeLocations: data.typeLocations,
            statusLocation: data.statusLocation,
            dateInserted: data.dateInserted,
            insertedByUser: data.insertedByUser,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            dateDeleted: data.dateDeleted,
            deleteByUser: data.deleteByUser,
            isDelete: data.isDelete,
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

  const deleteLocationMutation = useMutation({
    mutationFn: () => deletePort(selectedRowKeys),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [API_LOCATION.GET_LOCATION_SEARCH],
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
    setQuerySelectParams(initalValueQuerySelectParams);
    setQueryInputParams(initalValueQueryInputParams);
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
  const handleChangeInputSearchAll = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedActiveKey((prevData) => ({
      ...prevData,
      searchAll: {
        label: 'searchAll',
        value: e.target.value ? e.target.value : '',
      },
    }));
  };

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

  // Handle data show table
  const columns: ProColumns<LocationDataTable>[] = [
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
      dataIndex: 'locationCode',
      width: 120,
      key: 'locationCode',
      align: 'center',
    },
    {
      title: translateLocation('name'),
      dataIndex: 'locationName',
      key: 'locationName',
      align: 'center',
    },
    {
      title: translateLocation('country_name'),
      width: 150,
      dataIndex: 'cityID',
      key: 'cityID',
      align: 'center',
      filteredValue: [querySelectParams.cityID] || null,
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
                querySelectParams.cityID?.length !== 0
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
      filteredValue: querySelectParams.typeLocations || null,
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
                querySelectParams.typeLocations?.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
      filterMultiple: false,
      render: (_, value) =>
        value.typeLocations.map((type) => {
          return <Tag key={type.typeLocationID}>{type.typeLocationName}</Tag>;
        }),
    },
    {
      title: translateLocation('status'),
      dataIndex: 'statusLocation',
      key: 'statusLocation',
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

  const handleSearchSelect = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    const newQueryParams = {
      ...querySelectParams,
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
    setQuerySelectParams(newQueryParams);
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
        deleteLocationMutation.mutate();
      },
    });
  };

  const handleOnDoubleClick = (
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: LocationDataTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.LOCATION_EDIT(record.key, true));
    }
  };
  const handleCreate = () => {
    router.push(ROUTERS.LOCATION_CREATE);
  };
  return (
    <div style={{ marginTop: -18 }}>
      {portsQuerySearch.isLoading ? (
        <SkeletonTable />
      ) : (
        <TableUnit
          dataTable={dataTable}
          columns={columns}
          headerTitle={translateLocation('title')}
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
