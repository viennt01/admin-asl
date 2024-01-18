import {
  ExclamationCircleFilled,
  FilterFilled,
  EyeOutlined,
} from '@ant-design/icons';
import { Button, Modal, PaginationProps, Tag, Checkbox } from 'antd';
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
  TYPE_TABS,
} from '../interface';
import {
  DEFAULT_PAGINATION,
  DENSITY,
  IPaginationOfAntd,
  SkeletonTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';
import {
  deleteAirPricing,
  downloadExampleFile,
  exportTableFile,
  getAirPricingSearch,
  importDataTable,
} from '../fetcher';
import Table from '../../../../commons/table/table';
import style from '@/components/commons/table/index.module.scss';
import { STATUS_MASTER_COLORS, STATUS_MATER_LABELS } from '@/constant/form';
import {
  initalSelectSearchMaster,
  initalValueDisplayColumnMaster,
  initalValueQueryInputParamsMaster,
  initalValueQuerySelectParamsMaster,
} from '../constant';
import ImportCSVModal, {
  ImportFormValues,
} from '@/components/commons/import-data';
import { ROLE } from '@/constant/permission';
import { AppContext } from '@/app-context';
import { DAY_WEEK } from '@/constant';
import { getSystemDate } from '@/utils/common';
import { API_COLUMN } from '@/fetcherAxios/endpoint';
import {
  getColumnTable,
  updateColumnTable,
} from '@/components/menu-item/pricing/fee-group/fetcher';
import CreateQuotationModal from '../components/create-quotation/modal';

const { confirm } = Modal;

export default function MasterDataTable() {
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
  const [loadingImport, setLoadingImport] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const [openCreateQuotationModal, setOpenCreateQuotationModal] =
    useState(false);
  const { role } = useContext(AppContext);

  // Handle data
  useQuery({
    queryKey: [API_COLUMN.GET_COLUMN_TABLE_NAME],
    queryFn: () =>
      getColumnTable({
        tableName: TABLE_NAME.AIR_PRICING,
      }),
    onSuccess(data) {
      data.status
        ? !('operation' in data.data.columnFixed)
          ? setColumnsStateMap(initalValueDisplayColumnMaster)
          : setColumnsStateMap(data.data.columnFixed)
        : setColumnsStateMap(initalValueDisplayColumnMaster);
    },
  });

  const dataSelectSearch =
    querySelectParams.statusAirPricing.length === 0
      ? {
          statusAirPricing: [
            STATUS_MATER_LABELS.ACTIVE,
            STATUS_MATER_LABELS.DEACTIVE,
          ],
        }
      : querySelectParams;

  const locationsQuerySearch = useQuery({
    queryKey: [
      TYPE_TABS.GET_AIR_PRICING_BY_MASTER_DATA,
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
            vendorName: data.vendorName,
            transitTimeAirPricing: data.transitTimeAirPricing,
            fscAirPricing: data.fscAirPricing,
            sscAirPricing: data.sscAirPricing,
            gw: data.gw,
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

  const deleteMutation = useMutation({
    mutationFn: () => deleteAirPricing(selectedRowKeys),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [
            TYPE_TABS.GET_AIR_PRICING_BY_MASTER_DATA,
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

  const updateColumnMutation = useMutation({
    mutationFn: () =>
      updateColumnTable({
        tableName: TABLE_NAME.AIR_PRICING,
        density: DENSITY.Middle,
        columnFixed: columnsStateMap,
      }),
    onSuccess: (data) => {
      if (data.status) {
        queryClient.invalidateQueries({
          queryKey: [API_COLUMN.GET_COLUMN_TABLE_NAME],
        });
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
          title: key,
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
      filters: Object.keys(STATUS_MATER_LABELS).map((key) => ({
        text: key,
        value: key,
      })),
      filterSearch: false,
      filteredValue: querySelectParams.statusAirPricing || null,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.statusAirPricing.length !== 0
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
        <div className={style.title}>{translatePricingAir('carrier')}</div>
      ),
      width: 300,
      dataIndex: 'vendorName',
      key: 'vendorName',
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
      align: 'center',
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
          {translatePricingAir('fscAirPricing_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'fscAirPricing',
      key: 'fscAirPricing',
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
      title: 'GW',
      dataIndex: 'gw',
      width: 50,
      key: 'gw',
      align: 'center',
      render: (value) => {
        return <Checkbox checked={value as boolean} />;
      },
    },
    {
      title: translatePricingAir('freq'),
      width: 150,
      dataIndex: 'freqDate',
      key: 'freqDate',
      align: 'right',
      render: (value) =>
        DAY_WEEK.find((date) => date.value === value)?.label || '-',
    },
    {
      title: translatePricingAir('note'),
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
      align: 'right',
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
    ...columnDTOs,
  ];
  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.AIR_PRICING_EDIT(id, true));
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
    updateColumnMutation.mutate();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const showPropsConfirmDelete = () => {
    confirm({
      icon: <ExclamationCircleFilled />,
      title: translateCommon('modal_delete.title'),
      okText: translateCommon('modal_delete.button_ok'),
      cancelText: translateCommon('modal_delete.button_cancel'),
      okType: 'danger',
      onOk() {
        deleteMutation.mutate();
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: AirPricingTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.AIR_PRICING_EDIT(record.key, true));
    }
  };

  const handleCreate = () => {
    router.push(ROUTERS.AIR_PRICING_CREATE);
  };
  // export table data
  const exportData = useMutation({
    mutationFn: () =>
      exportTableFile({
        ids: selectedRowKeys,
        status: querySelectParams.statusAirPricing,
      }),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ASL_AIR_PRICING${getSystemDate()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      setIsLoadingDownload(false);
    },
  });
  const exportTableData = () => {
    exportData.mutate();
  };

  // import table data from excel file
  const importData = useMutation({
    mutationFn: (value: FormData) => importDataTable(value),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ASL_AIR_PRICING${getSystemDate()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      queryClient.invalidateQueries({
        queryKey: [TYPE_TABS.GET_AIR_PRICING_BY_REQUEST_DATA],
      });
      setLoadingImport(false);
      setOpenImportModal(false);
    },
    onError: () => {
      errorToast(API_MESSAGE.ERROR);
      setLoadingImport(false);
    },
  });
  const confirmImportTableData = (formValues: ImportFormValues) => {
    setLoadingImport(true);
    const _requestData = new FormData();
    _requestData.append('File', formValues.file[0]);
    importData.mutate(_requestData);
  };
  const cancelImportTableData = () => {
    setOpenImportModal(false);
  };
  const importTableData = () => {
    setOpenImportModal(true);
  };

  // download example file
  const downloadFile = useMutation({
    mutationFn: () => downloadExampleFile(),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ASL_AIR_PRICING${getSystemDate()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      setIsLoadingDownload(false);
    },
  });
  //handle create quotation
  const cancelCreateQuotation = () => {
    setOpenCreateQuotationModal(false);
  };

  const handleOpenCreateQuotation = () => {
    setOpenCreateQuotationModal(true);
  };

  const handleCreateQuotation = () => {
    setOpenCreateQuotationModal(false);
  };
  return (
    <div style={{ marginTop: -18 }}>
      {locationsQuerySearch.isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <ImportCSVModal
            loadingImport={loadingImport}
            open={openImportModal}
            handleOk={confirmImportTableData}
            handleCancel={cancelImportTableData}
            isLoadingDownload={isLoadingDownload}
            downloadFile={downloadFile}
          />
          <CreateQuotationModal
            itemData={selectedRowKeys}
            open={openCreateQuotationModal}
            handleOk={handleCreateQuotation}
            handleCancel={cancelCreateQuotation}
          />
          <Table
            dataTable={dataTable}
            columns={columns}
            headerTitle={translatePricingAir('title')}
            selectedRowKeys={selectedRowKeys}
            handleSelectionChange={handleSelectionChange}
            handlePaginationChange={handlePaginationChange}
            handleChangeInputSearchAll={handleChangeInputSearchAll}
            handleSearchInputKeyAll={handleSearchInputKeyAll}
            valueSearchAll={selectedActiveKey.searchAll.value}
            handleOnDoubleClick={handleOnDoubleClick}
            handleCreate={
              role === ROLE.LINER ||
              role === ROLE.AGENT ||
              role === ROLE.AIR_LINER
                ? handleCreate
                : undefined
            }
            // showPropsConfirmDelete={showPropsConfirmDelete}
            refreshingQuery={refreshingQuery}
            refreshingLoading={refreshingLoading}
            pagination={pagination}
            handleColumnsStateChange={handleColumnsStateChange}
            columnsStateMap={columnsStateMap}
            handleSearchSelect={handleSearchSelect}
            checkTableMaster={true}
            importTableData={
              role === ROLE.LINER ||
              role === ROLE.AGENT ||
              role === ROLE.AIR_LINER
                ? importTableData
                : undefined
            }
            exportTableData={exportTableData}
            handleCreateQuotation={handleOpenCreateQuotation}
            itemDataQuotation={selectedRowKeys}
          />
        </>
      )}
    </div>
  );
}
