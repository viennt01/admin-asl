import {
  EditOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Modal, PaginationProps, Popconfirm, Popover, Tag } from 'antd';
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
import { API_COLUMN, API_PARTNER } from '@/fetcherAxios/endpoint';
import { formatDate } from '@/utils/format';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import {
  IQueryInputParamType,
  IQuerySelectParamType,
  ISelectSearch,
  IPartnerTable,
  IRolePartner,
} from '../interface';
import {
  DEFAULT_PAGINATION,
  DENSITY,
  IPaginationOfAntd,
  SkeletonTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';
import {
  deleteUnit,
  downloadExampleFile,
  exportTableFile,
  getColumnTable,
  getUnitSearch,
  importDataTable,
  updateColumnTable,
} from '../fetcher';
import style from '@/components/commons/table/index.module.scss';
import {
  initalSelectSearchMaster,
  initalValueDisplayColumnMaster,
  initalValueQueryInputParamsLiner,
  initalValueQuerySelectParamsMaster,
} from '../constant';
import ImportCSVModal, {
  ImportFormValues,
} from '@/components/commons/import-data';
import { getSystemDate } from '@/utils/common';
import Table from '@/components/commons/table/table';
import { STATUS_MATER_LABELS } from '@/constant/form';

const { confirm } = Modal;

type DataIndex = keyof IQueryInputParamType;

export default function LinerDataTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translatePartner } = useI18n('partner');
  const { translate: translateCommon } = useI18n('common');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] =
    useState<IQueryInputParamType>(initalValueQueryInputParamsLiner);
  const [querySelectParams, setQuerySelectParams] =
    useState<IQuerySelectParamType>(initalValueQuerySelectParamsMaster);
  const [dataTable, setDataTable] = useState<IPartnerTable[]>([]);
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
    querySelectParams.status.length === 0
      ? {
          ...querySelectParams,
          status: [STATUS_MATER_LABELS.ACTIVE, STATUS_MATER_LABELS.DEACTIVE],
        }
      : querySelectParams;
  const locationsQuerySearch = useQuery({
    queryKey: ['Liner', queryInputParams, querySelectParams],
    queryFn: () =>
      getUnitSearch({
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
            key: data.partnerID,
            cityID: data.cityID,
            cityName: data.cityName,
            countryName: data.countryName,
            aslPersonalContactID: data.aslPersonalContactID,
            saleManName: data.saleManName,
            companyName: data.companyName,
            abbreviations: data.abbreviations,
            emailCompany: data.emailCompany,
            phoneNumber: data.phoneNumber,
            taxCode: data.taxCode,
            address: data.address,
            website: data.website,
            note: data.note,
            statusPartner: data.statusPartner,
            rolePartner: data.rolePartner,
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
    mutationFn: () => deleteUnit(selectedRowKeys),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [API_PARTNER.GET_SEARCH],
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
        tableName: TABLE_NAME.PARTNER,
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
    setQueryInputParams(initalValueQueryInputParamsLiner);
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
      ...initalValueQueryInputParamsLiner,
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
      statusUser:
        filters.statusUser?.length !== 0 && filters.statusUser
          ? (filters.statusUser as string[])
          : [],
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
  const columns: ProColumns<IPartnerTable>[] = [
    {
      title: <div className={style.title}>{translatePartner('code')}</div>,
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
        <div className={style.title}>
          {translatePartner('email_form.title')}
        </div>
      ),
      dataIndex: 'emailCompany',
      key: 'emailCompany',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePartner('role_form.title')}</div>
      ),
      dataIndex: 'roleName',
      key: 'roleName',
      width: 250,
      align: 'left',
      render: (_, value) => {
        const content = (valueTypeLocations: IRolePartner[]) => {
          return (
            <div>
              {valueTypeLocations.map((type) => {
                return <Tag key={type.roleID}>{type.name}</Tag>;
              })}
            </div>
          );
        };
        return (
          <Popover content={content(value.rolePartner)}>
            {value.rolePartner.length <= 2 ? (
              value.rolePartner.map((type) => (
                <Tag key={type.roleID}>{type.name}</Tag>
              ))
            ) : (
              <>
                {value.rolePartner.slice(0, 2).map((type) => (
                  <Tag key={type.roleID}>{type.name}</Tag>
                ))}
                <Tag>...</Tag>
              </>
            )}
          </Popover>
        );
      },
    },
    {
      title: (
        <div className={style.title}>{translatePartner('city_form.title')}</div>
      ),
      dataIndex: 'cityName',
      key: 'cityName',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePartner('nationality')}</div>
      ),
      dataIndex: 'countryName',
      key: 'countryName',
      width: 250,
      align: 'left',
    },
    {
      title: <div className={style.title}>{translatePartner('Sales Man')}</div>,
      dataIndex: 'aslSalesMan',
      key: 'aslSalesMan',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('companyName_form.title')}
        </div>
      ),
      dataIndex: 'companyName',
      key: 'companyName',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('abbreviations_form.title')}
        </div>
      ),
      dataIndex: 'abbreviations',
      key: 'abbreviations',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('emailCompany_form.title')}
        </div>
      ),
      dataIndex: 'emailCompany',
      key: 'emailCompany',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('phone_number_form.title')}
        </div>
      ),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('taxCode_form.title')}
        </div>
      ),
      dataIndex: 'taxCode',
      key: 'taxCode',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('address_form.title')}
        </div>
      ),
      dataIndex: 'address',
      key: 'address',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('birthday_form.title')}
        </div>
      ),
      dataIndex: 'birthdated',
      key: 'birthdated',
      width: 150,
      align: 'left',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('website_form.title')}
        </div>
      ),
      dataIndex: 'website',
      key: 'website',
      width: 250,
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
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.PARTNER_EDIT(id));
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
    record: IPartnerTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.PARTNER_EDIT(record.key, true));
    }
  };

  const handleCreate = () => {
    router.push(ROUTERS.PARTNER_CREATE);
  };

  // export table data
  const exportData = useMutation({
    mutationFn: () =>
      exportTableFile({
        ids: selectedRowKeys,
        status: [],
      }),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ASL_PARTNER${getSystemDate()}.xlsx`);
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
          queryKey: [API_PARTNER.GET_REQUEST],
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
      link.setAttribute('download', `ASL_PARTNER${getSystemDate()}.xlsx`);
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
            headerTitle={translatePartner('title')}
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
