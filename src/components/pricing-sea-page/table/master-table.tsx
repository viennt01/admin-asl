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
import { FilterValue, TablePaginationConfig } from 'antd/es/table/interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_UNIT } from '@/fetcherAxios/endpoint';
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
  SeaPricingTable,
} from '../interface';
import {
  DEFAULT_PAGINATION,
  PaginationOfAntd,
  SkeletonTable,
} from '@/components/commons/table/table-deafault';
import { deleteUnit, getSeaPricingSearch } from '../fetcher';
import Table from '../../commons/table/table';

const { confirm } = Modal;

const initalValueQueryInputParams = {
  searchAll: '',
};

const initalValueQuerySelectParams = {
  statusSeaPricing: [],
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
  polName: {
    order: 2,
    fixed: 'left' as const,
  },
  podName: {
    order: 3,
    fixed: 'left' as const,
  },
};

const initalSelectSearch = {
  searchAll: {
    label: '',
    value: '',
  },
  statusSeaPricing: {
    label: '',
    value: [],
  },
};

export default function MasterDataTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePricingSea } = useI18n('unit');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParams
  );
  const [querySelectParams, setQuerySelectParams] =
    useState<QuerySelectParamType>(initalValueQuerySelectParams);
  const [dataTable, setDataTable] = useState<SeaPricingTable[]>([]);
  const [selectedActiveKey, setSelectedActiveKey] =
    useState<SelectSearch>(initalSelectSearch);
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >(initalValueDisplayColumn);
  const [refreshingLoading, setRefreshingLoading] = useState(false);

  // Handle data
  const dataSelectSearch =
    querySelectParams.statusSeaPricing.length === 0
      ? {
          statusSeaPricing: [
            STATUS_MATER_LABELS.ACTIVE,
            STATUS_MATER_LABELS.DEACTIVE,
          ],
        }
      : querySelectParams;

  const locationsQuerySearch = useQuery({
    queryKey: [
      API_UNIT.GET_SEARCH,
      pagination,
      queryInputParams,
      querySelectParams,
    ],
    queryFn: () =>
      getSeaPricingSearch({
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
            key: data.seaPricingID,
            podid: data.podid,
            podName: data.podName,
            polid: data.polid,
            polName: data.polName,
            commodityID: data.commodityID,
            commodityName: data.commodityName,
            currencyID: data.currencyID,
            currencyName: data.currencyName,
            partnerID: data.partnerID,
            partnerName: data.partnerName,
            note: data.note,
            effectDate: data.effectDate,
            validity: data.validity,
            freg: data.freg,
            dem: data.dem,
            det: data.det,
            sto: data.sto,
            lclMin: data.lclMin,
            lcl: data.lcl,
            public: data.public,
            statusSeaPricing: data.statusSeaPricing,
            insertedByUser: data.insertedByUser,
            dateInserted: data.dateInserted,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
            isDelete: data.isDelete,
            dateDeleted: data.dateDeleted,
            deleteByUser: data.deleteByUser,
            seaPricingDetailDTOs: data.seaPricingDetailDTOs,
            seaPricingFeeDTOs: data.seaPricingFeeDTOs,
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

  const deleteUnitMutation = useMutation({
    mutationFn: () => deleteUnit(selectedRowKeys),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [
            API_UNIT.GET_SEARCH,
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

  // Handle data show table
  const columns: ProColumns<SeaPricingTable>[] = [
    {
      title: <div className={style.title}>{translatePricingSea('no')}</div>,
      dataIndex: 'index',
      width: 50,
      align: 'center',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      title: translatePricingSea('POL'),
      width: 200,
      dataIndex: 'polName',
      key: 'polName',
      align: 'center',
    },
    {
      title: translatePricingSea('POD'),
      width: 200,
      dataIndex: 'podName',
      key: 'podName',
      align: 'center',
    },
    {
      title: <div className={style.title}>{translatePricingSea('status')}</div>,
      width: 120,
      dataIndex: 'statusSeaPricing',
      key: 'statusSeaPricing',
      align: 'center',
      filters: Object.keys(STATUS_MATER_LABELS).map((key) => ({
        text: key,
        value: key,
      })),
      filterSearch: false,
      filteredValue: querySelectParams.statusSeaPricing || null,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.statusSeaPricing.length !== 0
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
      title: translatePricingSea('vendor'),
      width: 200,
      dataIndex: 'partnerName',
      key: 'partnerName',
      align: 'center',
    },
    {
      title: translatePricingSea('commodity'),
      width: 300,
      dataIndex: 'commodityName',
      key: 'commodityName',
      align: 'center',
    },
    {
      title: translatePricingSea('LCLMin'),
      width: 200,
      dataIndex: 'lclMin',
      key: 'lclMin',
      align: 'center',
    },
    {
      title: translatePricingSea('LCL'),
      width: 200,
      dataIndex: 'lcl',
      key: 'lcl',
      align: 'center',
    },
    {
      title: translatePricingSea('currency'),
      width: 200,
      dataIndex: 'currencyName',
      key: 'currencyName',
      align: 'center',
    },
    {
      title: translatePricingSea('effect_date'),
      width: 200,
      dataIndex: 'effectDate',
      key: 'effectDate',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translatePricingSea('validity'),
      width: 200,
      dataIndex: 'validity',
      key: 'validity',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translatePricingSea('freq'),
      width: 150,
      dataIndex: 'freg',
      key: 'freg',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translatePricingSea('DEM'),
      width: 200,
      dataIndex: 'dem',
      key: 'dem',
      align: 'center',
    },
    {
      title: translatePricingSea('STO'),
      width: 200,
      dataIndex: 'sto',
      key: 'sto',
      align: 'center',
    },
    {
      title: translatePricingSea('note'),
      width: 200,
      dataIndex: 'seaPricingDetailDTOs.cost',
      key: 'note',
      align: 'center',
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
              deleteUnitMutation.mutate();
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
        deleteUnitMutation.mutate();
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
    record: SeaPricingTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.UNIT_EDIT(record.key, true));
    }
  };

  const handleCreate = () => {
    router.push(ROUTERS.SEA_PRICING_CREATE);
  };

  return (
    <div style={{ marginTop: -18 }}>
      {locationsQuerySearch.isLoading ? (
        <SkeletonTable />
      ) : (
        <Table
          dataTable={dataTable}
          columns={columns}
          headerTitle={translatePricingSea('title')}
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
