import { EyeOutlined, FilterFilled } from '@ant-design/icons';
import { Button, PaginationProps, Tag } from 'antd';
import { ChangeEvent, Key, MouseEvent, useMemo, useState } from 'react';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { FilterValue, TablePaginationConfig } from 'antd/es/table/interface';
import { useQuery } from '@tanstack/react-query';
import {
  formatCurrencyHasCurrency,
  formatDate,
  formatNumber,
} from '@/utils/format';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
  SkeletonTable,
} from '@/components/commons/table/table-default';
import style from '@/components/commons/table/index.module.scss';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';
import { DAY_WEEK } from '@/constant';
import {
  initalSelectSearchMaster,
  initalValueDisplayColumnMaster,
  initalValueQueryInputParamsMaster,
  initalValueQuerySelectParamsMaster,
} from '../../pricing/trucking/constant';
import {
  IQueryInputParamType,
  IQuerySelectParamType,
  ISelectSearch,
  ITruckingPricingTable,
  ITypeDTOs,
} from '../../pricing/trucking/interface';
import { getTruckPricing } from '../fetcher';
import Table from '@/components/commons/table/table';

export default function MasterDataTable() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePricingTrucking } = useI18n('pricingTrucking');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] =
    useState<IQueryInputParamType>(initalValueQueryInputParamsMaster);
  const [querySelectParams, setQuerySelectParams] =
    useState<IQuerySelectParamType>(initalValueQuerySelectParamsMaster);
  const [dataTable, setDataTable] = useState<ITruckingPricingTable[]>([]);
  const [selectedActiveKey, setSelectedActiveKey] = useState<ISelectSearch>(
    initalSelectSearchMaster
  );
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >(initalValueDisplayColumnMaster);
  const [refreshingLoading, setRefreshingLoading] = useState(false);

  // Handle data
  const locationsQuerySearch = useQuery({
    queryKey: ['TRUCK PRICING', queryInputParams, id],
    enabled: id !== undefined,
    queryFn: () =>
      getTruckPricing({
        searchAll: queryInputParams.searchAll,
        partnerID: id as string,
        typePricing: 'TRUCK',
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
            key: data.truckingPricingID,
            pickupID: data.pickupID,
            pickupName: data.pickupName,
            deliveryID: data.deliveryID,
            deliveryName: data.deliveryName,
            commodityID: data.commodityID,
            commodityName: data.commodityName,
            currencyID: data.currencyID,
            currencyAbbreviations: data.currencyAbbreviations,
            vendorName: data.vendorName,
            transitTimeTruckingPricing: data.transitTimeTruckingPricing,
            note: data.note,
            effectDated: data.effectDated,
            validityDate: data.validityDate,
            freqDate: data.freqDate,
            public: data.public,
            statusTruckingPricing: data.statusTruckingPricing,
            truckingPricingDetailByContainerTypeDTOs:
              data.truckingPricingDetailByContainerTypeDTOs,
            truckingPricingDetailByLoadCapacityDTOs:
              data.truckingPricingDetailByLoadCapacityDTOs,
            insertedByUser: data.insertedByUser,
            dateInserted: data.dateInserted,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
            searchAll: '',
          }))
        );
        setPagination({
          current: currentPage,
          pageSize: pageSize,
          total: totalPages,
        });
      } else {
        setDataTable([]);
      }
    },
  });

  const refreshingQuery = () => {
    setSelectedActiveKey(initalSelectSearchMaster);
    setQueryInputParams(initalValueQueryInputParamsMaster);
    setRefreshingLoading(true);
    pagination.current = 1;
    locationsQuerySearch.refetch();
    setTimeout(() => {
      setRefreshingLoading(false);
    }, 500);
  };

  // Handle search
  const handleSearchInputKeyAll = (value: string) => {
    setSelectedActiveKey({
      ...initalSelectSearchMaster,
      searchAll: {
        label: 'searchAll',
        value: value,
      },
    });
    setQueryInputParams({
      ...initalValueQueryInputParamsMaster,
      searchAll: value,
    });
    setQuerySelectParams({
      ...initalValueQuerySelectParamsMaster,
    });
  };

  const handleSearchSelect = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    const newQueryParams = {
      ...querySelectParams,
      searchAll: '',
      statusTruckingPricing:
        filters.statusTruckingPricing?.length !== 0 &&
        filters.statusTruckingPricing
          ? (filters.statusTruckingPricing as string[])
          : [],
    };
    setQuerySelectParams(newQueryParams);
  };
  const columnContainerDTOs = useMemo(() => {
    const result = [{}];
    for (const key in dataTable[0]?.truckingPricingDetailByContainerTypeDTOs) {
      if (
        dataTable[0].truckingPricingDetailByContainerTypeDTOs.hasOwnProperty(
          key
        )
      ) {
        const obj = {
          title: <div className={style.title}>{key}</div>,
          width: 200,
          dataIndex: 'truckingPricingDetailByContainerTypeDTOs',
          render: (value: ITypeDTOs) => formatCurrencyHasCurrency(value[key]),
        };
        result.push(obj);
      }
    }
    return result;
  }, [dataTable]);

  const columnLoadCapacityDTOs = useMemo(() => {
    const result = [{}];
    for (const key in dataTable[0]?.truckingPricingDetailByLoadCapacityDTOs) {
      if (
        dataTable[0].truckingPricingDetailByLoadCapacityDTOs.hasOwnProperty(key)
      ) {
        const obj = {
          title: <div className={style.title}>{key}</div>,
          width: 200,
          dataIndex: 'truckingPricingDetailByLoadCapacityDTOs',
          render: (value: ITypeDTOs) => formatCurrencyHasCurrency(value[key]),
        };
        result.push(obj);
      }
    }
    return result;
  }, [dataTable]);

  const columns: ProColumns<ITruckingPricingTable>[] = [
    {
      title: (
        <div className={style.title}>{translatePricingTrucking('no')}</div>
      ),
      dataIndex: 'index',
      width: 50,
      align: 'right',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      title: (
        <div className={style.title}>{translatePricingTrucking('pickup')}</div>
      ),
      width: 200,
      dataIndex: 'pickupName',
      key: 'pickupName',
      align: 'left',
      render: (value) => value,
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingTrucking('delivery')}
        </div>
      ),
      width: 200,
      dataIndex: 'deliveryName',
      key: 'deliveryName',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePricingTrucking('status')}</div>
      ),
      width: 120,
      dataIndex: 'statusTruckingPricing',
      key: 'statusTruckingPricing',
      align: 'center',
      filters: Object.keys(STATUS_ALL_LABELS).map((key) => ({
        text: key,
        value: key,
      })),
      filterSearch: false,
      filteredValue: querySelectParams.statusTruckingPricing || null,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.statusTruckingPricing.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
      render: (value) => (
        <Tag
          color={STATUS_ALL_COLORS[value as keyof typeof STATUS_ALL_COLORS]}
          style={{
            margin: 0,
          }}
        >
          {STATUS_ALL_LABELS[value as keyof typeof STATUS_ALL_LABELS]}
        </Tag>
      ),
    },
    {
      title: (
        <div className={style.title}>{translatePricingTrucking('carrier')}</div>
      ),
      width: 200,
      dataIndex: 'vendorName',
      key: 'vendorName',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingTrucking('commodity')}
        </div>
      ),
      width: 300,
      dataIndex: 'commodityName',
      key: 'commodityName',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingTrucking('currency')}
        </div>
      ),
      width: 200,
      dataIndex: 'currencyAbbreviations',
      key: 'currencyAbbreviations',
      align: 'right',
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingTrucking('effect_date')}
        </div>
      ),
      width: 200,
      dataIndex: 'effectDated',
      key: 'effectDated',
      align: 'right',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingTrucking('validity')}
        </div>
      ),
      width: 200,
      dataIndex: 'validityDate',
      key: 'validityDate',
      align: 'right',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingTrucking('transitTimeSeaPricing_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'transitTimeSeaPricing',
      key: 'transitTimeSeaPricing',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value));
      },
    },
    {
      title: (
        <div className={style.title}>{translatePricingTrucking('freq')}</div>
      ),
      width: 150,
      dataIndex: 'freqDate',
      key: 'freqDate',
      align: 'right',
      render: (value) =>
        DAY_WEEK.find((date) => date.value === value)?.label || '-',
    },
    {
      title: (
        <div className={style.title}>{translatePricingTrucking('note')}</div>
      ),
      width: 200,
      dataIndex: 'note',
      key: 'note',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translateCommon('date_created')}</div>
      ),
      width: 150,
      dataIndex: 'dateInserted',
      key: 'dateInserted',
      align: 'center',
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
            icon={<EyeOutlined />}
            style={{
              marginRight: '10px',
            }}
          />
        </div>
      ),
    },
    ...columnContainerDTOs,
    ...columnLoadCapacityDTOs,
  ];
  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.TRUCKING_PRICING_EDIT(id, true));
  };

  const handleSelectionChange = (selectedRowKey: Key[]) => {
    const keyData = dataTable.map((item) => item.key);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniqueDataAndSelectedRowKeys = selectedRowKeys.filter((item: any) =>
      keyData.includes(item)
    );
    const unique1AndSelectedRowKey = uniqueDataAndSelectedRowKeys.filter(
      (item) => !selectedRowKey.includes(item)
    );
    const uniqueSelection = selectedRowKey.filter(
      (item) => !selectedRowKeys.includes(item)
    );
    const result = selectedRowKeys
      .concat(uniqueSelection)
      .filter((item) => !unique1AndSelectedRowKey.includes(item));

    setSelectedRowKeys(result);
  };

  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    pagination.current = page;
    pagination.pageSize = size;
    locationsQuerySearch.refetch();
  };

  const handleColumnsStateChange = (map: Record<string, ColumnsState>) => {
    setColumnsStateMap(map);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: ITruckingPricingTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.TRUCKING_PRICING_EDIT(record.key, true));
    }
  };

  return (
    <div style={{ marginTop: -18 }}>
      {locationsQuerySearch.isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <Table
            dataTable={dataTable}
            columns={columns}
            selectedRowKeys={selectedRowKeys}
            handleSelectionChange={handleSelectionChange}
            handlePaginationChange={handlePaginationChange}
            handleChangeInputSearchAll={handleChangeInputSearchAll}
            handleSearchInputKeyAll={handleSearchInputKeyAll}
            valueSearchAll={selectedActiveKey.searchAll.value}
            handleOnDoubleClick={handleOnDoubleClick}
            refreshingQuery={refreshingQuery}
            refreshingLoading={refreshingLoading}
            pagination={pagination}
            handleColumnsStateChange={handleColumnsStateChange}
            columnsStateMap={columnsStateMap}
            handleSearchSelect={handleSearchSelect}
            checkTableMaster={true}
            itemDataQuotation={selectedRowKeys}
          />
        </>
      )}
    </div>
  );
}
