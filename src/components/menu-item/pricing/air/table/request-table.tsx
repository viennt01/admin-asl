import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, PaginationProps, Tag, Checkbox } from 'antd';
import {
  ChangeEvent,
  Key,
  MouseEvent,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { FilterValue, TablePaginationConfig } from 'antd/es/table/interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  formatCurrencyHasCurrency,
  formatDate,
  formatNumber,
} from '@/utils/format';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import {
  QueryInputParamType,
  QuerySelectParamType,
  SelectSearch,
  AirPricingTable,
  AirPricingDetailDTOs,
  UpdateStatus,
  TYPE_TABS,
} from '../interface';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
  SkeletonTable,
} from '@/components/commons/table/table-default';
import { getAirPricingSearch, updateStatus } from '../fetcher';
import Table from '../../../../commons/table/table';
import style from '@/components/commons/table/index.module.scss';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';
import {
  initalSelectSearchMaster,
  initalValueDisplayColumnMaster,
  initalValueQueryInputParamsMaster,
  initalValueQuerySelectParamsMaster,
} from '../constant';
import { AppContext } from '@/app-context';
import { UpdateStatusUnit } from '@/components/menu-item/partner/interface';
import { ROLE } from '@/constant/permission';
import { DAY_WEEK } from '@/constant';

export default function RequestTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePricingAir } = useI18n('pricingAir');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParamsMaster
  );
  const [querySelectParams, setQuerySelectParams] =
    useState<QuerySelectParamType>(initalValueQuerySelectParamsMaster);
  const [dataTable, setDataTable] = useState<AirPricingTable[]>([]);
  const [selectedActiveKey, setSelectedActiveKey] = useState<SelectSearch>(
    initalSelectSearchMaster
  );
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >(initalValueDisplayColumnMaster);
  const [refreshingLoading, setRefreshingLoading] = useState(false);
  const { role } = useContext(AppContext);

  // Handle data
  const dataSelectSearch =
    querySelectParams.statusAirPricing.length === 0
      ? {
          statusAirPricing: [STATUS_ALL_LABELS.REQUEST],
        }
      : querySelectParams;

  const locationsQuerySearch = useQuery({
    queryKey: [
      TYPE_TABS.GET_AIR_PRICING_BY_REQUEST_DATA,
      queryInputParams,
      querySelectParams,
    ],
    queryFn: () =>
      getAirPricingSearch({
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
            key: data.airPricingID,
            aodid: data.aodid,
            aodName: data.aodName,
            aolid: data.aolid,
            aolName: data.aolName,
            commodityID: data.commodityID,
            commodityName: data.commodityName,
            currencyID: data.currencyID,
            currencyAbbreviations: data.currencyAbbreviations,
            note: data.note,
            validityDate: data.validityDate,
            effectDated: data.effectDated,
            freqDate: data.freqDate,
            public: data.public,
            statusAirPricing: data.statusAirPricing,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
            airPricingDetailDTOs: data.airPricingDetailDTOs,
            dateInserted: data.dateInserted,
            insertedByUser: data.insertedByUser,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            vendor: data.vendor,
            transitTimeAirPricing: data.transitTimeAirPricing,
            gw: data.gw,
            hscAirPricing: data.hscAirPricing,
            sscAirPricing: data.sscAirPricing,
            loadCapacityMinAirPricing: data.loadCapacityMinAirPricing,
            priceLoadCapacityMinAirPricing: data.priceLoadCapacityMinAirPricing,
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

  // const handleSearchInput = (
  //   selectedKeys: string,
  //   confirm: (param?: FilterConfirmProps) => void,
  //   dataIndex: DataIndex
  // ) => {
  //   setSelectedActiveKey((prevData) => ({
  //     ...prevData,
  //     [dataIndex]: {
  //       label: dataIndex,
  //       value: selectedKeys,
  //     },
  //     searchAll: {
  //       label: 'searchAll',
  //       value: '',
  //     },
  //   }));
  //   const newQueryParams = { ...queryInputParams };
  //   newQueryParams[dataIndex] = selectedKeys;
  //   newQueryParams.searchAll = '';
  //   setQueryInputParams(newQueryParams);
  //   confirm();
  // };

  const handleSearchSelect = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    const newQueryParams = {
      ...querySelectParams,
      searchAll: '',
      statusAirPricing:
        filters.statusAirPricing?.length !== 0 && filters.statusAirPricing
          ? (filters.statusAirPricing as string[])
          : [],
    };
    setQuerySelectParams(newQueryParams);
  };
  const columnDTOs = useMemo(() => {
    const result = [{}];
    for (const key in dataTable[0]?.airPricingDetailDTOs) {
      if (dataTable[0].airPricingDetailDTOs.hasOwnProperty(key)) {
        const obj = {
          title: <div className={style.title}>{key}</div>,
          width: 200,
          dataIndex: 'airPricingDetailDTOs',
          render: (value: AirPricingDetailDTOs) =>
            formatCurrencyHasCurrency(value[key]),
        };
        result.push(obj);
      }
    }
    return result;
  }, [dataTable]);

  const columns: ProColumns<AirPricingTable>[] = [
    {
      title: <div className={style.title}>{translatePricingAir('code')}</div>,
      dataIndex: 'index',
      width: 50,
      align: 'center',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      key: 'operation',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      fixed: 'left',
      render: (value) => (
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => handleEditCustomer(value as string)}
            icon={<EyeOutlined />}
            style={{ marginRight: '10px' }}
          />
          <Button
            onClick={() => {
              handleApproveAndReject(STATUS_ALL_LABELS.ACTIVE, [
                value as React.Key,
              ]);
            }}
            icon={<CheckOutlined />}
            style={{
              marginRight: '10px',
              color: COLORS.SUCCESS,
              borderColor: COLORS.SUCCESS,
              display: role === ROLE.AGENT || role === ROLE.LINER ? 'none' : '',
            }}
          />
          <Button
            onClick={() => {
              handleApproveAndReject(STATUS_ALL_LABELS.REJECT, [
                value as React.Key,
              ]);
            }}
            icon={<CloseOutlined />}
            style={{
              color: COLORS.ERROR,
              borderColor: COLORS.ERROR,
              display: role === ROLE.AGENT || role === ROLE.LINER ? 'none' : '',
            }}
          />
        </div>
      ),
    },
    {
      title: <div className={style.title}>{translatePricingAir('AOL')}</div>,
      width: 200,
      dataIndex: 'aolName',
      key: 'aolName',
      align: 'left',
      render: (value) => value,
    },
    {
      title: <div className={style.title}>{translatePricingAir('AOD')}</div>,
      width: 200,
      dataIndex: 'aodName',
      key: 'aodName',
      align: 'left',
    },
    {
      title: <div className={style.title}>{translatePricingAir('status')}</div>,
      width: 120,
      dataIndex: 'statusAirPricing',
      key: 'statusAirPricing',
      align: 'center',
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
        <div className={style.title}>{translatePricingAir('carrier')}</div>
      ),
      width: 200,
      dataIndex: 'vendor', // TODO:Check again
      key: 'vendor',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePricingAir('commodity')}</div>
      ),
      width: 300,
      dataIndex: 'commodityName',
      key: 'commodityName',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePricingAir('Currency')}</div>
      ),
      width: 200,
      dataIndex: 'currencyAbbreviations',
      key: 'currencyAbbreviations',
      align: 'right',
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingAir('effect_date_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'effectDated',
      key: 'effectDated',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: (
        <div className={style.title}>{translatePricingAir('validity')}</div>
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
          {translatePricingAir('transitTime_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'transitTimeAirPricing',
      key: 'transitTimeAirPricing',
      align: 'right',
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingAir('sscAirPricing_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'sscAirPricing',
      key: 'sscAirPricing',
      render: (value) => {
        return value ? formatNumber(Number(value)) : '-';
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingAir('hscAirPricing_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'hscAirPricing',
      key: 'hscAirPricing',
      render: (value) => {
        return value ? formatNumber(Number(value)) : '-';
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingAir('loadCapacityMin_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'loadCapacityMinAirPricing',
      key: 'loadCapacityMinAirPricing',
      render: (value) => {
        return value ? formatNumber(Number(value)) : '-';
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingAir('priceLoadCapacityMin_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'priceLoadCapacityMinAirPricing',
      key: 'priceLoadCapacityMinAirPricing',
      render: (value) => {
        return value ? formatNumber(Number(value)) : '-';
      },
    },
    {
      title: <div className={style.title}>{translatePricingAir('GW')}</div>,
      dataIndex: 'gw',
      width: 50,
      key: 'gw',
      align: 'center',
      render: (value) => {
        return <Checkbox checked={value as boolean} />;
      },
    },
    {
      title: <div className={style.title}>{translatePricingAir('freq')}</div>,
      width: 150,
      dataIndex: 'freqDate',
      key: 'freqDate',
      align: 'right',
      render: (value) =>
        DAY_WEEK.find((date) => date.value === value)?.label || '-',
    },
    {
      title: <div className={style.title}>{translatePricingAir('note')}</div>,
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
      align: 'left',
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
      align: 'left',
    },
    ...columnDTOs,
  ];
  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.AIR_PRICING_MANAGER(id));
  };

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusUnit) => {
      return updateStatus(body);
    },
  });

  const handleApproveAndReject = (status: string, id?: React.Key[]) => {
    const _requestData: UpdateStatus = {
      id: id || selectedRowKeys,
      status,
    };
    updateStatusMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message),
            setSelectedRowKeys([]),
            queryClient.invalidateQueries({
              queryKey: [TYPE_TABS.GET_AIR_PRICING_BY_REQUEST_DATA],
            }))
          : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
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
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: AirPricingTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.AIR_PRICING_MANAGER(record.key));
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
            headerTitle={'List of approval-needed requests'}
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
          />
        </>
      )}
    </div>
  );
}
