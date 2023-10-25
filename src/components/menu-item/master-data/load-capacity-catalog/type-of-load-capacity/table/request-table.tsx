import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  DEFAULT_PAGINATION,
  PaginationOfAntd,
} from '@/components/commons/table/table-default';
import Table from '@/components/commons/table/table';

import { ROUTERS } from '@/constant/router';
import { API_LOAD_CAPACITY_TYPE } from '@/fetcherAxios/endpoint';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, PaginationProps, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
import { formatDate } from '@/utils/format';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { getTableRequire, updateStatus } from '../fetcher';
import style from '@/components/commons/table/index.module.scss';

import {
  ILoadCapacityTypeTable,
  // ISelectSearch,
  IUpdateStatusLoadCapacityType,
} from '../interface';
import {
  // initalSelectSearchRequest,
  initalValueQueryInputParamsRequest,
  initalValueQuerySelectParamsRequest,
} from '../constant';

// type DataIndex = keyof IQueryInputParamType;

const RequestTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translateLoadCapacityType } =
    useI18n('typeOfLoadCapacity');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION);
  const [dataTable, setDataTable] = useState<ILoadCapacityTypeTable[]>([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Handle data
  useQuery({
    queryKey: [API_LOAD_CAPACITY_TYPE.GET_REQUEST, pagination],
    queryFn: () =>
      getTableRequire({
        ...initalValueQuerySelectParamsRequest,
        ...initalValueQueryInputParamsRequest,
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
            key: data.typeLoadCapacityID,
            typeLoadCapacityCode: data.typeLoadCapacityCode,
            typeLoadCapacityName: data.typeLoadCapacityName,
            description: data.description,
            statusTypeLoadCapacity: data.statusTypeLoadCapacity,
            public: data.public,
            insertedByUser: data.insertedByUser,
            dateInserted: data.dateInserted,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
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

  const updateStatusMutation = useMutation({
    mutationFn: (body: IUpdateStatusLoadCapacityType) => {
      return updateStatus(body);
    },
  });

  // Handle search
  // const handleSearchInput = (
  //   selectedKeys: string,
  //   confirm: (param?: FilterConfirmProps) => void,
  //   dataIndex: DataIndex
  // ) => {
  //   setSelectedKeyShow((prevData) => ({
  //     ...prevData,
  //     [dataIndex]: {
  //       label: dataIndex,
  //       value: selectedKeys,
  //     },
  //   }));
  //   const newQueryParams = { ...queryInputParams };
  //   newQueryParams[dataIndex] = selectedKeys;
  //   setQueryInputParams(newQueryParams);
  //   confirm();
  // };

  // const handleReset = (clearFilters: () => void, dataIndex: DataIndex) => {
  //   setQueryInputParams((prevData) => ({
  //     ...prevData,
  //     [dataIndex]: '',
  //   }));

  //   setSelectedKeyShow((prevData) => ({
  //     ...prevData,
  //     [dataIndex]: { label: dataIndex, value: '' },
  //   }));
  //   clearFilters();
  // };

  // Handle data show table
  const columns: ProColumns<ILoadCapacityTypeTable>[] = [
    {
      title: (
        <div className={style.title}>{translateLoadCapacityType('no')}</div>
      ),
      dataIndex: 'index',
      width: 50,
      align: 'right',
      fixed: 'left',
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
      title: (
        <div className={style.title}>{translateLoadCapacityType('code')}</div>
      ),
      dataIndex: 'typeLoadCapacityCode',
      key: 'typeLoadCapacityCode',
      width: 150,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translateLoadCapacityType('name')}</div>
      ),
      dataIndex: 'typeLoadCapacityName',
      key: 'typeLoadCapacityName',
      width: 150,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translateLoadCapacityType('description')}
        </div>
      ),
      dataIndex: 'description',
      key: 'description',
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
        <div className={style.title}>{translateLoadCapacityType('status')}</div>
      ),
      width: 120,
      dataIndex: 'statusTypeLoadCapacity',
      key: 'statusTypeLoadCapacity',
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
    router.push(ROUTERS.TYPE_OF_LOAD_CAPACITY_MANAGER(id));
  };

  const handleApproveAndReject = (status: string, id?: React.Key[]) => {
    const _requestData: IUpdateStatusLoadCapacityType = {
      id: id || selectedRowKeys,
      status,
    };
    updateStatusMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message),
            setSelectedRowKeys([]),
            queryClient.invalidateQueries({
              queryKey: [API_LOAD_CAPACITY_TYPE.GET_REQUEST, pagination],
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
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: ILoadCapacityTypeTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.TYPE_OF_LOAD_CAPACITY_MANAGER(record.key));
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
          checkTableMaster={true}
          handleSelectionChange={handleSelectionChange}
          handleApproveAndReject={handleApproveAndReject}
        />
      </div>
    </>
  );
};

export default RequestTable;
