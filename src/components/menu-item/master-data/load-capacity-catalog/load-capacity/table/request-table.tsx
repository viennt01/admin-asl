import {
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  FilterFilled,
} from '@ant-design/icons';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
} from '@/components/commons/table/table-default';
import Table from '@/components/commons/table/table';

import { ROUTERS } from '@/constant/router';
import {
  API_LOAD_CAPACITY,
  API_LOAD_CAPACITY_TYPE,
} from '@/fetcherAxios/endpoint';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, PaginationProps, TablePaginationConfig, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
import { FilterConfirmProps, FilterValue } from 'antd/lib/table/interface';
import { ColumnSearchTableProps } from '@/components/commons/search-table';
import { formatDate } from '@/utils/format';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import {
  getListTypeLoadCapacityID,
  getTableRequire,
  updateStatus,
} from '../fetcher';
import style from '@/components/commons/table/index.module.scss';

import {
  ILoadCapacityTableRequest,
  IQueryInputRequest,
  IQuerySelectRequest,
  ISelectSearchRequest,
  IUpdateStatusLoadCapacity,
} from '../interface';
import {
  initalSelectSearchRequest,
  initalValueQueryInputParamsRequest,
  initalValueQuerySelectParamsRequest,
} from '../constant';

type DataIndex = keyof IQueryInputRequest;

const RequestTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translateLoadCapacity } = useI18n('loadCapacity');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [querySelectParams, setQuerySelectParams] =
    useState<IQuerySelectRequest>(initalValueQuerySelectParamsRequest);
  const [queryInputParams, setQueryInputParams] = useState<IQueryInputRequest>(
    initalValueQueryInputParamsRequest
  );
  const [dataTable, setDataTable] = useState<ILoadCapacityTableRequest[]>([]);
  const [selectedActiveKey, setSelectedActiveKey] =
    useState<ISelectSearchRequest>(initalSelectSearchRequest);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Handle data
  const typeLoadCapacity = useQuery(
    [API_LOAD_CAPACITY_TYPE.GET_ALL],
    getListTypeLoadCapacityID
  );
  useQuery({
    queryKey: [
      API_LOAD_CAPACITY.GET_REQUEST,
      pagination,
      queryInputParams,
      querySelectParams,
    ],
    queryFn: () =>
      getTableRequire({
        ...querySelectParams,
        ...queryInputParams,
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
            key: data.loadCapacityID,
            searchAll: '',
            typeLoadCapacityID: data.typeLoadCapacityID,
            typeLoadCapacityName: data.typeLoadCapacityName,
            code: data.code,
            name: data.name,
            description: data.description,
            statusLoadCapacity: data.statusLoadCapacity,
            public: data.public,
            insertedByUser: data.insertedByUser,
            dateInserted: data.dateInserted,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
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

  const updateStatusMutation = useMutation({
    mutationFn: (body: IUpdateStatusLoadCapacity) => {
      return updateStatus(body);
    },
  });

  // Handle search
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
    }));
    const newQueryParams = { ...queryInputParams };
    newQueryParams[dataIndex] = selectedKeys;
    setQueryInputParams(newQueryParams);
    confirm();
  };

  const handleSearchSelect = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    const newQueryParams = {
      ...querySelectParams,
      statusLocation:
        filters.statusLocation?.length !== 0 && filters.statusLocation
          ? (filters.statusLocation as string[])
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
  const columns: ProColumns<ILoadCapacityTableRequest>[] = [
    {
      title: <div className={style.title}>{translateLoadCapacity('no')}</div>,
      dataIndex: 'index',
      width: 50,
      align: 'center',
      fixed: 'right',
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
            }}
          />
          <Button
            onClick={() => {
              handleApproveAndReject(STATUS_ALL_LABELS.REJECT, [
                value as React.Key,
              ]);
            }}
            icon={<CloseOutlined />}
            style={{ color: COLORS.ERROR, borderColor: COLORS.ERROR }}
          />
        </div>
      ),
    },
    {
      title: <div className={style.title}>{translateLoadCapacity('code')}</div>,
      dataIndex: 'code',
      key: 'code',
      width: 150,
      align: 'center',
      ...ColumnSearchTableProps<IQueryInputRequest>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'code',
        },
      }),
    },
    {
      title: <div className={style.title}>{translateLoadCapacity('name')}</div>,
      dataIndex: 'name',
      key: 'name',
      width: 150,
      align: 'center',
      ...ColumnSearchTableProps<IQueryInputRequest>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'name',
        },
      }),
    },
    {
      title: translateLoadCapacity('type'),
      dataIndex: 'typeLoadCapacityID',
      key: 'typeLoadCapacityID',
      width: 240,
      align: 'center',
      filteredValue: [querySelectParams.typeLoadCapacityID] || undefined,
      filters:
        typeLoadCapacity.data?.data?.map((data) => ({
          text: data.typeLoadCapacityName,
          value: data.typeLoadCapacityID,
        })) || [],
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.typeLoadCapacityID?.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
      filterMultiple: false,
      render: (_, value) => {
        return (
          typeLoadCapacity.data?.data.find(
            (item) => item.typeLoadCapacityID === value.typeLoadCapacityID
          )?.typeLoadCapacityName || ''
        );
      },
    },
    {
      title: (
        <div className={style.title}>
          {translateLoadCapacity('description')}
        </div>
      ),
      dataIndex: 'description',
      key: 'description',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<IQueryInputRequest>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'description',
        },
      }),
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
        <div className={style.title}>{translateLoadCapacity('status')}</div>
      ),
      width: 120,
      dataIndex: 'statusLoadCapacity',
      key: 'statusLoadCapacity',
      align: 'center',
      fixed: 'right',
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
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.LOAD_CAPACITY_MANAGER(id));
  };

  const handleApproveAndReject = (status: string, id?: React.Key[]) => {
    const _requestData: IUpdateStatusLoadCapacity = {
      id: id || selectedRowKeys,
      status,
    };
    updateStatusMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message),
            setSelectedRowKeys([]),
            queryClient.invalidateQueries({
              queryKey: [
                API_LOAD_CAPACITY.GET_REQUEST,
                pagination,
                queryInputParams,
              ],
            }))
          : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  const handleSelectionChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    setPagination((state) => ({
      ...state,
      current: page,
      pageSize: size,
    }));
  };

  const handleOnDoubleClick = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: ILoadCapacityTableRequest
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.LOAD_CAPACITY_MANAGER(record.key));
    }
  };

  return (
    <>
      <div style={{ marginTop: -18 }}>
        <Table
          headerTitle="List of approval-needed requests"
          dataTable={dataTable}
          columns={columns}
          handlePaginationChange={handlePaginationChange}
          handleOnDoubleClick={handleOnDoubleClick}
          pagination={pagination}
          handleSearchSelect={handleSearchSelect}
          checkTableMaster={true}
          handleSelectionChange={handleSelectionChange}
          handleApproveAndReject={handleApproveAndReject}
        />
      </div>
    </>
  );
};

export default RequestTable;
