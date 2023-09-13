import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  DEFAULT_PAGINATION,
  PaginationOfAntd,
} from '@/components/commons/table/table-deafault';
import Table from '@/components/commons/table/table';
import {
  ContainerTypeTable,
  QueryInputParamType,
  SelectSearch,
  UpdateStatusContainerType,
} from '@/components/type-of-container-page/interface';
import { ROUTERS } from '@/constant/router';
import { API_CONTAINER_TYPE } from '@/fetcherAxios/endpoint';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, PaginationProps, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { ColumnSearchTableProps } from '@/components/commons/search-table';
import { formatDate } from '@/utils/format';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { getTable, updateStatus } from '../fetcher';
import style from '@/components/commons/table/index.module.scss';
import {
  initalSelectSearchRequest,
  initalValueQueryInputParamsRequest,
} from '../constant';

type DataIndex = keyof QueryInputParamType;

const RequestTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translateContainerType } = useI18n('typeOfContainer');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParamsRequest
  );
  const [dataTable, setDataTable] = useState<ContainerTypeTable[]>([]);
  const [selectedKeyShow, setSelectedKeyShow] = useState<SelectSearch>(
    initalSelectSearchRequest
  );
  // Handle data
  useQuery({
    queryKey: [API_CONTAINER_TYPE.GET_REQUEST, pagination, queryInputParams],
    queryFn: () =>
      getTable({
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
            key: data.containerTypeID,
            containerTypeCode: data.containerTypeCode,
            name: data.name,
            details: data.details,
            teus: data.teus,
            statusContainerType: data.statusContainerType,
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

  const updateStatusContainerTypeMutation = useMutation({
    mutationFn: (body: UpdateStatusContainerType) => {
      return updateStatus(body);
    },
  });

  // Handle search
  const handleSearchInput = (
    selectedKeys: string,
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    setSelectedKeyShow((prevData) => ({
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

  const handleReset = (clearFilters: () => void, dataIndex: DataIndex) => {
    setQueryInputParams((prevData) => ({
      ...prevData,
      [dataIndex]: '',
    }));

    setSelectedKeyShow((prevData) => ({
      ...prevData,
      [dataIndex]: { label: dataIndex, value: '' },
    }));
    clearFilters();
  };

  // Handle data show table
  const columns: ProColumns<ContainerTypeTable>[] = [
    {
      title: (
        <div className={style.title}>{translateContainerType('code')}</div>
      ),
      dataIndex: 'index',
      width: 50,
      align: 'center',
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
            onClick={() =>
              handleApproveAndReject(value as string, STATUS_ALL_LABELS.ACTIVE)
            }
            icon={<CheckOutlined />}
            style={{
              marginRight: '10px',
              color: COLORS.SUCCESS,
              borderColor: COLORS.SUCCESS,
            }}
          />
          <Button
            onClick={() =>
              handleApproveAndReject(value as string, STATUS_ALL_LABELS.REJECT)
            }
            icon={<CloseOutlined />}
            style={{ color: COLORS.ERROR, borderColor: COLORS.ERROR }}
          />
        </div>
      ),
    },
    {
      title: (
        <div className={style.title}>
          {translateContainerType('container_no')}
        </div>
      ),
      dataIndex: 'containerTypeCode',
      key: 'containerTypeCode',
      width: 200,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'containerTypeCode',
        },
      }),
    },
    {
      title: (
        <div className={style.title}>
          {translateContainerType('type_of_container')}
        </div>
      ),
      dataIndex: 'name',
      key: 'name',
      width: 250,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'name',
        },
      }),
    },
    {
      title: (
        <div className={style.title}>{translateContainerType('detail')}</div>
      ),
      dataIndex: 'details',
      key: 'details',
      width: 250,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'details',
        },
      }),
    },
    {
      title: (
        <div className={style.title}>{translateContainerType('teus')}</div>
      ),
      dataIndex: 'teus',
      key: 'teus',
      width: 250,
      align: 'right',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'teus',
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
        <div className={style.title}>{translateContainerType('status')}</div>
      ),
      width: 120,
      dataIndex: 'statusContainerType',
      key: 'statusContainerType',
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
    router.push(ROUTERS.TYPES_OF_CONTAINER_MANAGER(id));
  };

  const handleApproveAndReject = (id: string, status: string) => {
    const _requestData: UpdateStatusContainerType = {
      id,
      status,
    };
    updateStatusContainerTypeMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message),
            queryClient.invalidateQueries({
              queryKey: [
                API_CONTAINER_TYPE.GET_REQUEST,
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

  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    setPagination((state) => ({
      ...state,
      current: page,
      pageSize: size,
    }));
  };

  const handleOnDoubleClick = (
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: ContainerTypeTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.TYPES_OF_CONTAINER_MANAGER(record.key));
    }
  };

  return (
    <>
      <div style={{ marginTop: -18 }}>
        <Table
          headerTitle={translateContainerType('title_requests')}
          dataTable={dataTable}
          columns={columns}
          handlePaginationChange={handlePaginationChange}
          handleOnDoubleClick={handleOnDoubleClick}
          pagination={pagination}
          checkTableMaster={false}
        />
      </div>
    </>
  );
};

export default RequestTable;
