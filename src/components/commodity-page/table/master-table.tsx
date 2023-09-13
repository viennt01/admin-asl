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
import {
  FilterConfirmProps,
  FilterValue,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_COMMODITY } from '@/fetcherAxios/endpoint';
import { formatDate } from '@/utils/format';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import {
  QueryInputParamType,
  QuerySelectParamType,
  SelectSearch,
  CommodityTable,
} from '../interface';
import {
  DEFAULT_PAGINATION,
  PaginationOfAntd,
  SkeletonTable,
} from '@/components/commons/table/table-deafault';
import {
  deleteCommodity,
  downloadExampleFileCommodity,
  getCommoditySearch,
  importCommodity,
} from '../fetcher';
import { ColumnSearchTableProps } from '@/components/commons/search-table';
import Table, { COUNT_DATA } from '@/components/commons/table/table';
import style from '@/components/commons/table/index.module.scss';
import { STATUS_MASTER_COLORS, STATUS_MATER_LABELS } from '@/constant/form';
import ImportCSVModal, { ImportFormValues } from '../../commons/import-data';
import { exportExcel } from '@/utils/common';

const { confirm } = Modal;

const initalValueQueryInputParams = {
  searchAll: '',
  commodityName: '',
};

const initalValueQuerySelectParams = {
  statusCommodity: [],
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
};

const initalSelectSearch = {
  searchAll: {
    label: '',
    value: '',
  },
  commodityName: {
    label: '',
    value: '',
  },
  statusCommodity: {
    label: '',
    value: [],
  },
};

type DataIndex = keyof QueryInputParamType;

export default function MasterDataTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateCommodity } = useI18n('commodity');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParams
  );
  const [querySelectParams, setQuerySelectParams] =
    useState<QuerySelectParamType>(initalValueQuerySelectParams);
  const [dataTable, setDataTable] = useState<CommodityTable[]>([]);
  const [dataExport, setDatExport] = useState<CommodityTable[]>([]);
  const [selectedActiveKey, setSelectedActiveKey] =
    useState<SelectSearch>(initalSelectSearch);
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >(initalValueDisplayColumn);
  const [refreshingLoading, setRefreshingLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [loadingImport, setLoadingImport] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);

  const excelHeaders = useMemo(
    () => [
      {
        name: translateCommodity('name'),
        value: 'commodityName',
      },
      {
        name: translateCommodity('status'),
        value: 'statusCommodity',
      },
      {
        name: translateCommon('date_created'),
        value: 'dateInserted',
        converter: (value: string) => formatDate(Number(value)) || '',
      },
      {
        name: translateCommon('creator'),
        value: 'insertedByUser',
      },
      {
        name: translateCommon('date_inserted'),
        value: 'dateUpdated',
        converter: (value: string) => formatDate(Number(value)) || '',
      },
      {
        name: translateCommon('inserter'),
        value: 'updatedByUser',
      },
    ],
    []
  );

  // Handle data
  const dataSelectSearch =
    querySelectParams.statusCommodity.length === 0
      ? {
          statusCommodity: [
            STATUS_MATER_LABELS.ACTIVE,
            STATUS_MATER_LABELS.DEACTIVE,
          ],
        }
      : querySelectParams;

  const querySearch = useQuery({
    queryKey: [
      API_COMMODITY.GET_SEARCH,
      pagination,
      queryInputParams,
      querySelectParams,
    ],
    queryFn: () =>
      getCommoditySearch({
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
            key: data.commodityID,
            commodityName: data.commodityName,
            statusCommodity: data.statusCommodity,
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

  const deletesMutation = useMutation({
    mutationFn: () => deleteCommodity(selectedRowKeys),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [
            API_COMMODITY.GET_SEARCH,
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
    querySearch.refetch();
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
      statusCommodity:
        filters.statusCommodity?.length !== 0 && filters.statusCommodity
          ? (filters.statusCommodity as string[])
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
  const columns: ProColumns<CommodityTable>[] = [
    {
      title: <div className={style.title}>{translateCommodity('code')}</div>,
      dataIndex: 'index',
      width: 50,
      align: 'center',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      title: <div className={style.title}>{translateCommodity('name')}</div>,
      dataIndex: 'commodityName',
      key: 'commodityName',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'commodityName',
        },
      }),
    },
    {
      title: <div className={style.title}>{translateCommodity('status')}</div>,
      width: 120,
      dataIndex: 'statusCommodity',
      key: 'statusCommodity',
      align: 'center',
      filters: Object.keys(STATUS_MATER_LABELS).map((key) => ({
        text: key,
        value: key,
      })),
      filterSearch: false,
      filteredValue: querySelectParams.statusCommodity || null,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.statusCommodity.length !== 0
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
              deletesMutation.mutate();
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
    router.push(ROUTERS.COMMODITY_EDIT(id));
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
        deletesMutation.mutate();
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
    record: CommodityTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.COMMODITY_EDIT(record.key, true));
    }
  };

  const handleCreate = () => {
    router.push(ROUTERS.COMMODITY_CREATE);
  };

  // export table data to csv
  useQuery({
    queryKey: [],
    queryFn: () =>
      getCommoditySearch({
        ...queryInputParams,
        statusCommodity: [
          STATUS_MATER_LABELS.ACTIVE,
          STATUS_MATER_LABELS.DEACTIVE,
        ],
        paginateRequest: {
          currentPage: 1,
          pageSize: COUNT_DATA,
        },
      }),
    onSuccess(data) {
      if (data.status) {
        setDatExport(
          data.data.data.map((data) => ({
            key: data.commodityID,
            commodityName: data.commodityName,
            statusCommodity: data.statusCommodity,
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
      } else {
        setDatExport([]);
      }
    },
  });
  const exportTableData = () => {
    setExportLoading(true);
    if (selectedRowKeys.length === 0) {
      exportExcel(dataExport, excelHeaders, 'Commodity');
    } else {
      const data = dataTable.filter((item) =>
        selectedRowKeys.includes(item.key)
      );
      exportExcel(data, excelHeaders, 'Commodity');
    }
    setExportLoading(false);
  };

  // import table data from excel file
  const importData = useMutation({
    mutationFn: (value: FormData) => importCommodity(value),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [API_COMMODITY.GET_SEARCH],
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
    mutationFn: () => downloadExampleFileCommodity(),
    onSuccess: (data) => {
      // Tạo một URL đối tượng từ blob dữ liệu trả về
      const url = window.URL.createObjectURL(new Blob([data]));

      // Tạo một thẻ a để tạo sự kiện nhấp chuột và tải xuống tệp
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ASL_Loai_Container.xlsx'); // Tên tệp bạn muốn đặt

      // Thêm thẻ a vào DOM và kích hoạt sự kiện nhấp chuột để tải xuống
      document.body.appendChild(link);
      link.click();

      // Loại bỏ URL đối tượng sau khi tải xuống
      window.URL.revokeObjectURL(url);

      setIsLoadingDownload(false);
    },
  });

  return (
    <div style={{ marginTop: -18 }}>
      {querySearch.isLoading ? (
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
            headerTitle={translateCommodity('title')}
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
            exportLoading={exportLoading}
            exportTableData={exportTableData}
          />
        </>
      )}
    </div>
  );
}
