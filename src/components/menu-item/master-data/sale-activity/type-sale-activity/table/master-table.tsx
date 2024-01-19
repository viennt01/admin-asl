import {
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
import { API_COLUMN } from '@/fetcherAxios/endpoint';
import { formatDate } from '@/utils/format';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import {
  ITypeQueryInputParamType,
  ITypeQuerySelectParamType,
  ISelectSearch,
  ITypeDeclarationTable,
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
  deleteDeclaration,
  downloadExampleFile,
  exportTableFile,
  getColumnTable,
  getDeclarationSearch,
  importDataTable,
  updateColumnTable,
} from '../fetcher';
import Table from '../../../../../commons/table/table';
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

type DataIndex = keyof ITypeQueryInputParamType;

export default function MasterDataTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translateTypeDeclaration } = useI18n('typeOfSaleActivity');
  const { translate: translateCommon } = useI18n('common');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] =
    useState<ITypeQueryInputParamType>(initalValueQueryInputParamsMaster);
  const [querySelectParams, setQuerySelectParams] =
    useState<ITypeQuerySelectParamType>(initalValueQuerySelectParamsMaster);
  const [dataTable, setDataTable] = useState<ITypeDeclarationTable[]>([]);
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
    querySelectParams.statusSaleActivityType.length === 0
      ? {
          ...querySelectParams,
          statusSaleActivityType: [
            STATUS_MATER_LABELS.ACTIVE,
            STATUS_MATER_LABELS.DEACTIVE,
          ],
        }
      : querySelectParams;

  const locationsQuerySearch = useQuery({
    queryKey: [
      TYPE_TABS.GET_TYPE_SALE_ACTIVITY_BY_MASTER_DATA,
      queryInputParams,
      querySelectParams,
    ],
    queryFn: () =>
      getDeclarationSearch({
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
            key: data.saleActivityTypeID,
            name: data.name,
            description: data.description,
            statusSaleActivityType: data.statusSaleActivityType,
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

  const deleteMutation = useMutation({
    mutationFn: () => deleteDeclaration(selectedRowKeys),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [TYPE_TABS.GET_TYPE_SALE_ACTIVITY_BY_MASTER_DATA],
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
        tableName: TABLE_NAME.TYPE_OF_DECLARATION,
        density: DENSITY.Middle,
        columnFixed: columnsStateMap,
      }),
    onSuccess: (data) => {
      if (data.status) {
        queryClient.invalidateQueries({
          queryKey: [TYPE_TABS.GET_TYPE_SALE_ACTIVITY_BY_MASTER_DATA],
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearchInput = (
    selectedKeys: string,
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    setSelectedActiveKey((prevData) => ({
      ...prevData,
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
      statusSaleActivityType:
        filters.statusSaleActivityType?.length !== 0 &&
        filters.statusSaleActivityType
          ? (filters.statusSaleActivityType as string[])
          : [],
      typeUnitID:
        filters.typeUnitID?.length !== 0 && filters.typeUnitID
          ? (filters.typeUnitID[0] as string)
          : '',
    };
    setQuerySelectParams(newQueryParams);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const columns: ProColumns<ITypeDeclarationTable>[] = [
    {
      title: (
        <div className={style.title}>{translateTypeDeclaration('no')}</div>
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
        <div className={style.title}>{translateTypeDeclaration('name')}</div>
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
      align: 'center',
    },
    {
      title: (
        <div className={style.title}>
          {translateTypeDeclaration('description')}
        </div>
      ),
      dataIndex: 'description',
      key: 'description',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translateTypeDeclaration('status')}</div>
      ),
      width: 120,
      dataIndex: 'statusSaleActivityType',
      key: 'statusSaleActivityType',
      align: 'center',
      filters: Object.keys(STATUS_MATER_LABELS).map((key) => ({
        text: key,
        value: key,
      })),
      filterSearch: false,
      filteredValue: querySelectParams.statusSaleActivityType || null,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.statusSaleActivityType.length !== 0
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
            onClick={() =>
              router.push(
                ROUTERS.TYPE_SALE_ACTIVITY_EDIT(value as string, true)
              )
            }
            icon={<EyeOutlined />}
            style={{
              marginRight: '10px',
            }}
          />
          {/* <Button
            onClick={() => handleEditCustomer(value as string)}
            icon={<EditOutlined />}
            style={{
              marginRight: '10px',
            }}
          /> */}
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
  // const handleEditCustomer = (id: string) => {
  //   router.push(ROUTERS.TYPE_SALE_ACTIVITY_EDIT(id));
  // };

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
    record: ITypeDeclarationTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.TYPE_SALE_ACTIVITY_EDIT(record.key, true));
    }
  };

  const handleCreate = () => {
    router.push(ROUTERS.TYPE_SALE_ACTIVITY_CREATE);
  };

  // export table data
  const exportData = useMutation({
    mutationFn: () =>
      exportTableFile({
        ids: selectedRowKeys,
        status: querySelectParams.statusSaleActivityType,
      }),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `ASL_TYPE_DELARACRION${getSystemDate()}.xlsx`
      );
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
      link.setAttribute(
        'download',
        `ASL_TYPE_DELARACRION${getSystemDate()}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      queryClient.invalidateQueries({
        queryKey: [TYPE_TABS.GET_TYPE_SALE_ACTIVITY_BY_REQUEST_DATA],
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
      link.setAttribute(
        'download',
        `ASL_TYPE_DELARACRION${getSystemDate()}.xlsx`
      );
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
            headerTitle={translateTypeDeclaration('title')}
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
