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
import { API_SEA_QUOTATION } from '@/fetcherAxios/endpoint';
import {
  formatCurrencyHasCurrency,
  formatDate,
  formatNumber,
} from '@/utils/format';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import {
  IQueryInputParamType,
  IQuerySelectParamType,
  ISelectSearch,
  ISeaQuotationTable,
  ISeaQuotationDetailDTOs,
} from '../interface';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
  SkeletonTable,
} from '@/components/commons/table/table-default';
import {
  deleteSeaQuotation,
  downloadExampleFile,
  exportTableFile,
  getSeaQuotationSearch,
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
import { getSystemDate } from '@/utils/common';

const { confirm } = Modal;

export default function MasterDataTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateQuotationSea } = useI18n('seaQuotation');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] =
    useState<IQueryInputParamType>(initalValueQueryInputParamsMaster);
  const [querySelectParams, setQuerySelectParams] =
    useState<IQuerySelectParamType>(initalValueQuerySelectParamsMaster);
  const [dataTable, setDataTable] = useState<ISeaQuotationTable[]>([]);
  const [selectedActiveKey, setSelectedActiveKey] = useState<ISelectSearch>(
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
    querySelectParams.statusSeaQuotation.length === 0
      ? {
          statusSeaQuotation: [
            STATUS_MATER_LABELS.ACTIVE,
            STATUS_MATER_LABELS.DEACTIVE,
          ],
        }
      : querySelectParams;

  const locationsQuerySearch = useQuery({
    queryKey: [
      API_SEA_QUOTATION.GET_SEARCH,
      queryInputParams,
      querySelectParams,
    ],
    queryFn: () =>
      getSeaQuotationSearch({
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
            key: data.seaQuotationID,
            seaQuotationID: data.seaQuotationID,
            seaQuotationNo: data.seaQuotationNo,
            podid: data.podid,
            podName: data.podName,
            polid: data.polid,
            polName: data.polName,
            commodityID: data.commodityID,
            commodityName: data.commodityName,
            currencyID: data.currencyID,
            currencyAbbreviations: data.currencyAbbreviations,
            note: data.note,
            effectDated: data.effectDated,
            validityDate: data.validityDate,
            freqDate: data.freqDate,
            demSeaQuotation: data.demSeaQuotation,
            detSeaQuotation: data.detSeaQuotation,
            stoSeaQuotation: data.stoSeaQuotation,
            lclMinSeaQuotation: data.lclMinSeaQuotation,
            lclSeaQuotation: data.lclSeaQuotation,
            public: data.public,
            statusSeaQuotation: data.statusSeaQuotation,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
            seaQuotationDetailDTOs: data.seaQuotationDetailDTOs,
            dateInserted: data.dateInserted,
            insertedByUser: data.insertedByUser,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
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
    mutationFn: () => deleteSeaQuotation(selectedRowKeys),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [API_SEA_QUOTATION.GET_SEARCH],
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
      statusSeaQuotation:
        filters.statusSeaQuotation?.length !== 0 && filters.statusSeaQuotation
          ? (filters.statusSeaQuotation as string[])
          : [],
    };
    setQuerySelectParams(newQueryParams);
  };
  const columnDTOs = useMemo(() => {
    const result = [{}];
    for (const key in dataTable[0]?.seaQuotationDetailDTOs) {
      if (dataTable[0].seaQuotationDetailDTOs.hasOwnProperty(key)) {
        const obj = {
          title: key,
          width: 200,
          dataIndex: 'seaQuotationDetailDTOs',
          render: (value: ISeaQuotationDetailDTOs) =>
            formatCurrencyHasCurrency(value[key]),
        };
        result.push(obj);
      }
    }
    return result;
  }, [dataTable]);

  const columns: ProColumns<ISeaQuotationTable>[] = [
    {
      title: <div className={style.title}>{translateQuotationSea('no')}</div>,
      dataIndex: 'index',
      width: 50,
      align: 'right',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      title: translateQuotationSea('code'),
      width: 200,
      dataIndex: 'seaQuotationNo',
      key: 'seaQuotationNo',
      align: 'left',
      render: (value) => value,
    },
    {
      title: translateQuotationSea('POL'),
      width: 200,
      dataIndex: 'polName',
      key: 'polName',
      align: 'left',
      render: (value) => value,
    },
    {
      title: translateQuotationSea('POD'),
      width: 200,
      dataIndex: 'podName',
      key: 'podName',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translateQuotationSea('status')}</div>
      ),
      width: 120,
      dataIndex: 'statusSeaQuotation',
      key: 'statusSeaQuotation',
      align: 'center',
      filters: Object.keys(STATUS_MATER_LABELS).map((key) => ({
        text: key,
        value: key,
      })),
      filterSearch: false,
      filteredValue: querySelectParams.statusSeaQuotation || null,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.statusSeaQuotation.length !== 0
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
      title: translateQuotationSea('commodity'),
      width: 300,
      dataIndex: 'commodityName',
      key: 'commodityName',
      align: 'left',
    },
    {
      title: translateQuotationSea('currency'),
      width: 100,
      dataIndex: 'currencyAbbreviations',
      key: 'currencyAbbreviations',
      align: 'left',
    },
    {
      title: translateQuotationSea('effect_date'),
      width: 200,
      dataIndex: 'effectDated',
      key: 'effectDated',
      align: 'right',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translateQuotationSea('validity'),
      width: 200,
      dataIndex: 'validityDate',
      key: 'validityDate',
      align: 'right',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translateQuotationSea('freq'),
      width: 150,
      dataIndex: 'freqDate',
      key: 'freqDate',
      align: 'right',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translateQuotationSea('DEM'),
      width: 200,
      dataIndex: 'demSeaQuotation',
      key: 'demSeaQuotation',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: translateQuotationSea('STO'),
      width: 200,
      dataIndex: 'stoSeaQuotation',
      key: 'stoSeaQuotation',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: translateQuotationSea('DET'),
      width: 200,
      dataIndex: 'detSeaQuotation',
      key: 'detSeaQuotation',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: translateQuotationSea('note'),
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
    {
      title: translateQuotationSea('LCLMin'),
      width: 200,
      dataIndex: 'lclMinSeaQuotation',
      key: 'lclMinSeaQuotation',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: translateQuotationSea('LCL'),
      width: 200,
      dataIndex: 'lclSeaQuotation',
      key: 'lclSeaQuotation',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    ...columnDTOs,
  ];
  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.SEA_QUOTATION_EDIT(id));
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
    record: ISeaQuotationTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.SEA_QUOTATION_EDIT(record.key, true));
    }
  };

  const handleCreate = () => {
    router.push(ROUTERS.SEA_QUOTATION_CREATE);
  };
  // export table data to csv
  const exportData = useMutation({
    mutationFn: () =>
      exportTableFile({
        ids: selectedRowKeys,
        status: querySelectParams.statusSeaQuotation,
      }),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ASL_SEA_QUOTATION${getSystemDate()}.xlsx`);
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
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [API_SEA_QUOTATION.GET_REQUEST],
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
      link.setAttribute('download', 'ASL_SEA_QUOTATION.xlsx');
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
            headerTitle={translateQuotationSea('title')}
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
