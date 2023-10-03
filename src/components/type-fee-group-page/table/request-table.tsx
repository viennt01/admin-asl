import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  DEFAULT_PAGINATION,
  PaginationOfAntd,
} from '@/components/commons/table/table-default';
import Table from '@/components/commons/table/table';
import {
  TypeFeeGroupTable,
  QueryInputParamType,
  SelectSearch,
  UpdateStatusTypeFeeGroup,
} from '../interface';
import { ROUTERS } from '@/constant/router';
import { API_TYPE_FEE_GROUP } from '@/fetcherAxios/endpoint';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, PaginationProps } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { ColumnSearchTableProps } from '@/components/commons/search-table';
import { formatDate } from '@/utils/format';
import { STATUS_ALL_LABELS } from '@/constant/form';
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
  const { translate: translateTypeFeeGroup } = useI18n('typeFeeGroup');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParamsRequest
  );
  const [dataTable, setDataTable] = useState<TypeFeeGroupTable[]>([]);
  const [selectedKeyShow, setSelectedKeyShow] = useState<SelectSearch>(
    initalSelectSearchRequest
  );
  // Handle data
  useQuery({
    queryKey: [API_TYPE_FEE_GROUP.GET_REQUEST, pagination, queryInputParams],
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
            key: data.typeFeeGroupID,
            typeFeeGroupNo: data.typeFeeGroupNo,
            typeFeeGroupName: data.typeFeeGroupName,
            statusTypeFeeGroup: data.statusTypeFeeGroup,
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

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusTypeFeeGroup) => {
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
  const columns: ProColumns<TypeFeeGroupTable>[] = [
    {
      title: <div className={style.title}>{translateTypeFeeGroup('no')}</div>,
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
          {translateTypeFeeGroup('type_fee_group_code')}
        </div>
      ),
      dataIndex: 'typeFeeGroupNo',
      key: 'typeFeeGroupNo',
      width: 150,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'typeFeeGroupNo',
        },
      }),
    },
    {
      title: (
        <div className={style.title}>
          {translateTypeFeeGroup('type_fee_group_name')}
        </div>
      ),
      dataIndex: 'typeFeeGroupName',
      key: 'typeFeeGroupName',
      width: 250,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'typeFeeGroupName',
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
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.TYPE_FEE_GROUP_MANAGER(id));
  };

  const handleApproveAndReject = (id: string, status: string) => {
    const _requestData: UpdateStatusTypeFeeGroup = {
      id,
      status,
    };
    updateStatusMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message),
            queryClient.invalidateQueries({
              queryKey: [
                API_TYPE_FEE_GROUP.GET_REQUEST,
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
    record: TypeFeeGroupTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.TYPE_FEE_GROUP_MANAGER(record.key));
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
          checkTableMaster={false}
        />
      </div>
    </>
  );
};

export default RequestTable;
