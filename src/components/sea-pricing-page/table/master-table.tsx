import {
  EditOutlined,
  ExclamationCircleFilled,
  FilterFilled,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Modal, PaginationProps, Tag, Popconfirm } from 'antd';
import { ChangeEvent, Key, MouseEvent, useMemo, useState } from 'react';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { FilterValue, TablePaginationConfig } from 'antd/es/table/interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_SEA_PRICING } from '@/fetcherAxios/endpoint';
import { formatCurrencyHasCurrency, formatDate } from '@/utils/format';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import {
  QueryInputParamType,
  QuerySelectParamType,
  SelectSearch,
  SeaPricingTable,
  SeaPricingDetailDTOs,
} from '../interface';
import {
  DEFAULT_PAGINATION,
  PaginationOfAntd,
  SkeletonTable,
} from '@/components/commons/table/table-deafault';
import {
  deleteSeaPricing,
  downloadExampleFile,
  getSeaPricingSearch,
  importDataTable,
} from '../fetcher';
import Table from '../../commons/table/table';
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

const { confirm } = Modal;

export default function MasterDataTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePricingSea } = useI18n('pricingSea');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParamsMaster
  );
  const [querySelectParams, setQuerySelectParams] =
    useState<QuerySelectParamType>(initalValueQuerySelectParamsMaster);
  const [dataTable, setDataTable] = useState<SeaPricingTable[]>([]);
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
    queryKey: [API_SEA_PRICING.GET_SEARCH, queryInputParams, querySelectParams],
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
            seaPricingID: data.seaPricingID,
            podid: data.podid,
            podName: data.podName,
            polid: data.polid,
            polName: data.polName,
            commodityID: data.commodityID,
            commodityName: data.commodityName,
            currencyID: data.currencyID,
            currencyAbbreviations: data.currencyAbbreviations,
            note: data.note,
            dateEffect: data.dateEffect,
            validityDate: data.validityDate,
            freqDate: data.freqDate,
            demSeaPricing: data.demSeaPricing,
            detSeaPricing: data.detSeaPricing,
            stoSeaPricing: data.stoSeaPricing,
            lclMinSeaPricing: data.lclMinSeaPricing,
            lclSeaPricing: data.lclSeaPricing,
            public: data.public,
            statusSeaPricing: data.statusSeaPricing,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
            seaPricingDetailDTOs: data.seaPricingDetailDTOs,
            seaPricingFeeDTOs: data.seaPricingFeeDTOs,
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
    mutationFn: () => deleteSeaPricing(selectedRowKeys),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [
            API_SEA_PRICING.GET_SEARCH,
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
      statusSeaPricing:
        filters.statusSeaPricing?.length !== 0 && filters.statusSeaPricing
          ? (filters.statusSeaPricing as string[])
          : [],
    };
    setQuerySelectParams(newQueryParams);
  };
  const columnDTOs = useMemo(() => {
    const result = [{}];
    for (const key in dataTable[0]?.seaPricingDetailDTOs) {
      if (dataTable[0].seaPricingDetailDTOs.hasOwnProperty(key)) {
        const obj = {
          title: key,
          width: 200,
          dataIndex: 'seaPricingDetailDTOs',
          render: (value: SeaPricingDetailDTOs) =>
            formatCurrencyHasCurrency(value[key]),
        };
        result.push(obj);
      }
    }
    return result;
  }, [dataTable]);

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
      render: (value) => value,
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
      dataIndex: 'partnerName', // TODO:Check again
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
      dataIndex: 'lclMinSeaPricing',
      key: 'lclMinSeaPricing',
      align: 'center',
      render: (value) => {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    {
      title: translatePricingSea('LCL'),
      width: 200,
      dataIndex: 'lclSeaPricing',
      key: 'lclSeaPricing',
      align: 'center',
      render: (value) => {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    {
      title: translatePricingSea('currency'),
      width: 200,
      dataIndex: 'currencyAbbreviations',
      key: 'currencyAbbreviations',
      align: 'center',
    },
    {
      title: translatePricingSea('effect_date'),
      width: 200,
      dataIndex: 'dateEffect',
      key: 'dateEffect',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translatePricingSea('validity'),
      width: 200,
      dataIndex: 'validityDate',
      key: 'validityDate',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translatePricingSea('freq'),
      width: 150,
      dataIndex: 'freqDate',
      key: 'freqDate',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translatePricingSea('DEM'),
      width: 200,
      dataIndex: 'demSeaPricing',
      key: 'demSeaPricing',
      align: 'center',
      render: (value) => {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    {
      title: translatePricingSea('STO'),
      width: 200,
      dataIndex: 'stoSeaPricing',
      key: 'stoSeaPricing',
      align: 'center',
      render: (value) => {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    {
      title: translatePricingSea('DET'),
      width: 200,
      dataIndex: 'detSeaPricing',
      key: 'detSeaPricing',
      align: 'center',
      render: (value) => {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    {
      title: translatePricingSea('note'),
      width: 200,
      dataIndex: 'note',
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
              deleteMutation.mutate();
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
    ...columnDTOs,
  ];
  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.SEA_PRICING_EDIT(id));
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
    console.log(map);

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
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: SeaPricingTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.SEA_PRICING_EDIT(record.key, true));
    }
  };

  const handleCreate = () => {
    router.push(ROUTERS.SEA_PRICING_CREATE);
  };
  // export table data to csv
  const exportTableData = () => {
    console.log('export');
  };

  // import table data from excel file
  const importData = useMutation({
    mutationFn: (value: FormData) => importDataTable(value),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [API_SEA_PRICING.GET_REQUEST],
        });
        setLoadingImport(false);
        setOpenImportModal(false);
      } else {
        errorToast(data.message);
        setLoadingImport(false);
      }
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
      link.setAttribute('download', 'ASL_SEA_PRICING.xlsx');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      setIsLoadingDownload(false);
    },
  });
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
            importTableData={importTableData}
            exportTableData={exportTableData}
          />
        </>
      )}
    </div>
  );
}
