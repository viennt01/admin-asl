import {
  EditOutlined,
  ExclamationCircleFilled,
  FilterFilled,
  DeleteOutlined,
  EyeOutlined,
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
import { API_BANK, API_COLUMN } from '@/fetcherAxios/endpoint';
import style from '@/components/commons/table/index.module.scss';
import { formatDate } from '@/utils/format';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import {
  QueryInputParamType,
  QuerySelectParamType,
  STATUS_MASTER_COLORS,
  STATUS_MATER_LABELS,
  SelectSearch,
  BankTable,
} from '../interface';
import {
  DEFAULT_PAGINATION,
  DENSITY,
  IPaginationOfAntd,
  SkeletonTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';
import {
  deleteBank,
  downloadExampleFile,
  exportTableFile,
  getBankSearch,
  getColumnTable,
  importDataTable,
  updateColumnTable,
} from '../fetcher';
import { ColumnSearchTableProps } from '@/components/commons/search-table';
import Table from '../../../../../commons/table/table';
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

type DataIndex = keyof QueryInputParamType;

export default function MasterDataTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateBank } = useI18n('bank');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParamsMaster
  );
  const [querySelectParams, setQuerySelectParams] =
    useState<QuerySelectParamType>(initalValueQuerySelectParamsMaster);
  const [dataTable, setDataTable] = useState<BankTable[]>([]);
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
  useQuery({
    queryKey: [API_COLUMN.GET_COLUMN_TABLE_NAME],
    queryFn: () => getColumnTable(),
    onSuccess(data) {
      data.status
        ? !('operation' in data.data.columnFixed)
          ? setColumnsStateMap(initalValueDisplayColumnMaster)
          : setColumnsStateMap(data.data.columnFixed)
        : setColumnsStateMap(initalValueDisplayColumnMaster);
    },
  });

  const dataSelectSearch =
    querySelectParams.statusBank.length === 0
      ? {
          statusBank: [
            STATUS_MATER_LABELS.ACTIVE,
            STATUS_MATER_LABELS.DEACTIVE,
          ],
        }
      : querySelectParams;

  const locationsQuerySearch = useQuery({
    queryKey: [
      API_BANK.GET_SEARCH,
      pagination,
      queryInputParams,
      querySelectParams,
    ],
    queryFn: () =>
      getBankSearch({
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
            key: data.bankID,
            bankNo: data.bankNo,
            bankName: data.bankName,
            accountNumberVND: data.accountNumberVND,
            accountNumberUSD: data.accountNumberUSD,
            phoneNumber: data.phoneNumber,
            email: data.email,
            address: data.address,
            bankBranch: data.bankBranch,
            note: data.note,
            statusBank: data.statusBank,
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

  const updateColumnMutation = useMutation({
    mutationFn: () =>
      updateColumnTable({
        tableName: TABLE_NAME.BANK,
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

  const deleteMutation = useMutation({
    mutationFn: () => deleteBank(selectedRowKeys),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [API_BANK.GET_SEARCH],
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
      statusBank:
        filters.statusBank?.length !== 0 && filters.statusBank
          ? (filters.statusBank as string[])
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
  const columns: ProColumns<BankTable>[] = [
    {
      title: <div className={style.title}>{translateBank('bank_no')}</div>,
      dataIndex: 'index',
      width: 50,
      align: 'center',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      title: <div className={style.title}>{translateBank('bank_code')}</div>,
      dataIndex: 'bankNo',
      key: 'bankNo',
      width: 150,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'bankNo',
        },
      }),
    },
    {
      title: <div className={style.title}>{translateBank('bank_name')}</div>,
      dataIndex: 'bankName',
      key: 'bankName',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'bankName',
        },
      }),
    },
    {
      title: (
        <div className={style.title}>{translateBank('VND_account_number')}</div>
      ),
      dataIndex: 'accountNumberVND',
      key: 'accountNumberVND',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'accountNumberVND',
        },
      }),
    },
    {
      title: (
        <div className={style.title}>{translateBank('USD_account_number')}</div>
      ),
      dataIndex: 'accountNumberUSD',
      key: 'accountNumberUSD',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'accountNumberUSD',
        },
      }),
    },
    {
      title: <div className={style.title}>{translateBank('phone')}</div>,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'phoneNumber',
        },
      }),
    },
    {
      title: <div className={style.title}>{translateBank('bank_email')}</div>,
      dataIndex: 'email',
      key: 'email',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'email',
        },
      }),
    },
    {
      title: <div className={style.title}>{translateBank('bank_address')}</div>,
      dataIndex: 'address',
      key: 'address',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'address',
        },
      }),
    },
    {
      title: <div className={style.title}>{translateBank('bank_branch')}</div>,
      dataIndex: 'bankBranch',
      key: 'bankBranch',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'bankBranch',
        },
      }),
    },
    {
      title: <div className={style.title}>{translateBank('bank_note')}</div>,
      dataIndex: 'note',
      key: 'note',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'note',
        },
      }),
    },
    {
      title: <div className={style.title}>{translateBank('status')}</div>,
      width: 120,
      dataIndex: 'statusBank',
      key: 'statusBank',
      align: 'center',
      filters: Object.keys(STATUS_MATER_LABELS).map((key) => ({
        text: key,
        value: key,
      })),
      filterSearch: false,
      filteredValue: querySelectParams.statusBank || null,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.statusBank.length !== 0
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
            onClick={() =>
              router.push(ROUTERS.BANK_EDIT(value as string, true))
            }
            icon={<EyeOutlined />}
            style={{
              marginRight: '10px',
            }}
          />
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
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.BANK_EDIT(id));
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
    updateColumnMutation.mutate();
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: BankTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.BANK_EDIT(record.key, true));
    }
  };

  const handleCreate = () => {
    router.push(ROUTERS.BANK_CREATE);
  };

  // export table data
  const exportData = useMutation({
    mutationFn: () =>
      exportTableFile({
        ids: selectedRowKeys,
        status: querySelectParams.statusBank,
      }),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ASL_BANK${getSystemDate()}.xlsx`);
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
      link.setAttribute('download', `ASL_BANK${getSystemDate()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      queryClient.invalidateQueries({
        queryKey: [API_BANK.GET_REQUEST],
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
      link.setAttribute('download', `ASL_BANK${getSystemDate()}.xlsx`);
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
            headerTitle={translateBank('title')}
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
            exportLoading={exportData.isLoading}
            exportTableData={exportTableData}
          />
        </>
      )}
    </div>
  );
}
