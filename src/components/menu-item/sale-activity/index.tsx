import {
  ExclamationCircleFilled,
  DeleteOutlined,
  EyeOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { Button, Modal, PaginationProps, Popconfirm, Tag } from 'antd';
import { ChangeEvent, Key, MouseEvent, useState } from 'react';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ProColumns } from '@ant-design/pro-components';
import {
  FilterConfirmProps,
  FilterValue,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDateYYYYMMDD } from '@/utils/format';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import {
  IQueryInputParamType,
  IQuerySelectParamType,
  ISelectSearch,
  ISaleActivityTable,
  TYPE_TABS,
  STATUS,
  STATUS_ALL_COLORS_SALE,
} from './interface';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
  SkeletonTable,
} from '@/components/commons/table/table-default';
import { deleteUnit, getUnitSearch } from './fetcher';
import style from '@/components/commons/table/index.module.scss';
import {
  initalSelectSearchMaster,
  initalValueQueryInputParamsMaster,
  initalValueQuerySelectParamsMaster,
} from './constant';

import Table from '@/components/commons/table/table';

const { confirm } = Modal;

type DataIndex = keyof IQueryInputParamType;

export default function SaleActivity() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translatePartner } = useI18n('saleActivity');
  const { translate: translateCommon } = useI18n('common');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] =
    useState<IQueryInputParamType>(initalValueQueryInputParamsMaster);
  const [querySelectParams, setQuerySelectParams] =
    useState<IQuerySelectParamType>(initalValueQuerySelectParamsMaster);
  const [dataTable, setDataTable] = useState<ISaleActivityTable[]>([]);
  const [selectedActiveKey, setSelectedActiveKey] = useState<ISelectSearch>(
    initalSelectSearchMaster
  );
  const [refreshingLoading, setRefreshingLoading] = useState(false);

  // Handle data

  const dataSelectSearch =
    querySelectParams.statusSaleActivity.length === 0
      ? {
          ...querySelectParams,
          statusSaleActivity: [STATUS.FINISH, STATUS.COMING],
        }
      : querySelectParams;
  const locationsQuerySearch = useQuery({
    queryKey: [
      TYPE_TABS.GET_SALE_ACTIVITY,
      queryInputParams,
      querySelectParams,
    ],
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
            key: data.saleActivityID,
            saleActivityTypeName: data.saleActivityTypeName,
            aslPersonalContactName: data.aslPersonalContactName,
            companyName: data.companyName,
            timeActivitySaleActivity: data.timeActivitySaleActivity,
            description: data.description,
            timeNextAppointmentSaleActivity:
              data.timeNextAppointmentSaleActivity,
            statusSaleActivity: data.statusSaleActivity,
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
          queryKey: [TYPE_TABS.GET_SALE_ACTIVITY],
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearchInput = (
    selectedKeys: string,
    confirm: (param?: FilterConfirmProps) => void
    // dataIndex: DataIndex
  ) => {
    setSelectedActiveKey((prevData) => ({
      ...prevData,
      searchAll: {
        label: 'searchAll',
        value: '',
      },
    }));
    const newQueryParams = { ...queryInputParams };
    // newQueryParams[dataIndex] = selectedKeys;
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
      statusSaleActivity:
        filters.statusSaleActivity?.length !== 0 && filters.statusSaleActivity
          ? (filters.statusSaleActivity as string[])
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
  const columns: ProColumns<ISaleActivityTable>[] = [
    {
      title: <div className={style.title}>{translatePartner('no')}</div>,
      dataIndex: 'index',
      width: 50,
      align: 'right',
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
      render: (value) => (
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() =>
              router.push(ROUTERS.SALE_ACTIVITY_EDIT(value as string, true))
            }
            icon={<EyeOutlined />}
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
      title: (
        <div className={style.title}>
          {translatePartner('name_type_sale_activity_form.title')}
        </div>
      ),
      dataIndex: 'saleActivityTypeName',
      key: 'saleActivityTypeName',
      width: 250,
      align: 'left',
      render: (value) => {
        return value ? value : '-';
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('aslPersonalContactName_form.title')}
        </div>
      ),
      dataIndex: 'aslPersonalContactName',
      key: 'aslPersonalContactName',
      width: 250,
      align: 'left',
      render: (value) => {
        return value ? value : '-';
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('company_form.title')}
        </div>
      ),
      dataIndex: 'companyName',
      key: 'companyName',
      width: 250,
      align: 'left',
      render: (value) => {
        return value ? value : '-';
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('timeActivitySaleActivity_form.title')}
        </div>
      ),
      dataIndex: 'timeActivitySaleActivity',
      key: 'timeActivitySaleActivity',
      width: 250,
      align: 'left',
      render: (value) => formatDateYYYYMMDD(Number(value)),
    },
    // {
    //   title: (
    //     <div className={style.title}>
    //       {translatePartner('timeNextAppointmentSaleActivity_form.title')}
    //     </div>
    //   ),
    //   dataIndex: 'timeNextAppointmentSaleActivity',
    //   key: 'timeNextAppointmentSaleActivity',
    //   width: 250,
    //   align: 'left',
    //   render: (value) => formatDateYYYYMMDD(Number(value)),
    // },
    {
      title: (
        <div className={style.title}>
          {translatePartner('description_type_sale_activity_form.title')}
        </div>
      ),
      dataIndex: 'description',
      key: 'description',
      width: 250,
      align: 'left',
    },
    {
      title: <div className={style.title}>{translateCommon('status')}</div>,
      width: 120,
      dataIndex: 'statusSaleActivity',
      key: 'statusSaleActivity',
      align: 'center',
      filters: Object.keys(STATUS).map((key) => ({
        text: key,
        value: key,
      })),
      filterSearch: false,
      filteredValue: querySelectParams.statusSaleActivity || null,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.statusSaleActivity.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
      render: (value) => (
        <Tag
          color={
            STATUS_ALL_COLORS_SALE[value as keyof typeof STATUS_ALL_COLORS_SALE]
          }
          style={{
            margin: 0,
          }}
        >
          {STATUS[value as keyof typeof STATUS]}
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
      render: (value) => formatDateYYYYMMDD(Number(value)),
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
      render: (value) => formatDateYYYYMMDD(Number(value)),
    },
    {
      title: <div className={style.title}>{translateCommon('inserter')}</div>,
      width: 200,
      dataIndex: 'updatedByUser',
      key: 'updatedByUser',
      align: 'center',
    },
  ];

  // Handle logic table

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    pagination.current = page;
    pagination.pageSize = size;
    locationsQuerySearch.refetch();
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
    record: ISaleActivityTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.SALE_ACTIVITY_EDIT(record.key, true));
    }
  };

  const handleCreate = () => {
    router.push(ROUTERS.SALE_ACTIVITY_CREATE);
  };

  return (
    <div style={{ marginTop: 10 }}>
      {locationsQuerySearch.isLoading ? (
        <SkeletonTable />
      ) : (
        <>
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
            handleSearchSelect={handleSearchSelect}
            checkTableMaster={true}
          />
        </>
      )}
    </div>
  );
}
