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
  API_CURRENCY,
  API_FEE,
  API_TYPE_FEE,
  API_UNIT,
} from '@/fetcherAxios/endpoint';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, PaginationProps, TablePaginationConfig, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent, Key } from 'react';
import { FilterConfirmProps, FilterValue } from 'antd/lib/table/interface';
import { ColumnSearchTableProps } from '@/components/commons/search-table';
import { formatDate } from '@/utils/format';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import {
  getListTypeCurrency,
  getListTypeFee,
  getListTypeUnit,
  getTableRequire,
  updateStatus,
} from '../fetcher';
import style from '@/components/commons/table/index.module.scss';

import {
  FeeTable,
  QueryInputParamType,
  QuerySelectRequest,
  SelectSearch,
  TYPE_UNIT,
  UpdateStatusFee,
} from '../interface';
import {
  initalSelectSearchRequest,
  initalValueQueryInputParamsRequest,
  initalValueQuerySelectParamsRequest,
} from '../constant';

type DataIndex = keyof QueryInputParamType;

const RequestTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translateFee } = useI18n('fee');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParamsRequest
  );
  const [querySelectParams, setQuerySelectParams] =
    useState<QuerySelectRequest>(initalValueQuerySelectParamsRequest);
  const [dataTable, setDataTable] = useState<FeeTable[]>([]);
  const [selectedKeyShow, setSelectedKeyShow] = useState<SelectSearch>(
    initalSelectSearchRequest
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Handle data
  const typeFee = useQuery([API_TYPE_FEE.GET_ALL], getListTypeFee);
  const typeCurrency = useQuery([API_CURRENCY.GET_ALL], getListTypeCurrency);
  const [dataUnit, setDataUnit] = useState<
    {
      text: string;
      value: string;
    }[]
  >([]);

  useQuery({
    queryKey: [API_UNIT.GET_ALL],
    queryFn: () => getListTypeUnit({ typeUnit: TYPE_UNIT.ALL }),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        const newData = data.data.map((unit) => ({
          text: unit.internationalCode,
          value: unit.unitID,
        }));
        setDataUnit(newData);
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  useQuery({
    queryKey: [API_FEE.GET_REQUEST, pagination, queryInputParams],
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
            key: data.feeID,
            feeNo: data.feeNo,
            feeName: data.feeName,
            vatFee: data.vatFee,
            public: data.public,
            statusFee: data.statusFee,
            dateInserted: data.dateInserted,
            insertedByUser: data.insertedByUser,
            typeFeeID: data.typeFeeID,
            typeFeeName: data.typeFeeName,
            currencyID: data.currencyID,
            currencyName: data.currencyName,
            unitID: data.unitID,
            unitInternationalCode: data.unitInternationalCode,
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

  const updateStatusFeeMutation = useMutation({
    mutationFn: (body: UpdateStatusFee) => {
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
  const columns: ProColumns<FeeTable>[] = [
    {
      title: <div className={style.title}>{translateFee('fee_no')}</div>,
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
      title: <div className={style.title}>{translateFee('code')}</div>,
      dataIndex: 'feeNo',
      key: 'feeNo',
      width: 150,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'feeNo',
        },
      }),
    },
    {
      title: <div className={style.title}>{translateFee('name')}</div>,
      dataIndex: 'feeName',
      key: 'feeName',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'feeName',
        },
      }),
    },
    {
      title: <div className={style.title}>{translateFee('vat')}</div>,
      dataIndex: 'vatFee',
      key: 'vatFee',
      width: 250,
      align: 'right',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'vatFee',
        },
      }),
    },
    {
      title: translateFee('type_fee'),
      width: 150,
      dataIndex: 'typeFeeID',
      key: 'typeFeeID',
      align: 'left',
      filteredValue: [querySelectParams.typeFeeID] || null,
      filters:
        typeFee.data?.data.map((item) => ({
          text: item.typeFeeName,
          value: item.typeFeeID,
        })) || [],
      filterSearch: true,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.typeFeeID?.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
      filterMultiple: false,
      render: (_, value) => {
        return <div>{value.typeFeeName}</div>;
      },
    },
    {
      title: translateFee('currency'),
      width: 150,
      dataIndex: 'currencyID',
      key: 'currencyID',
      align: 'left',
      filteredValue: [querySelectParams.currencyID] || null,
      filters:
        typeCurrency.data?.data.map((item) => ({
          text: item.abbreviations,
          value: item.currencyID,
        })) || [],
      filterSearch: true,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.currencyID?.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
      filterMultiple: false,
      render: (_, value) => {
        return <div>{value.currencyName}</div>;
      },
    },
    {
      title: translateFee('unit'),
      width: 150,
      dataIndex: 'unitID',
      key: 'unitID',
      align: 'left',
      filteredValue: [querySelectParams.unitID] || null,
      filters: dataUnit || [],
      filterSearch: true,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.unitID?.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
      filterMultiple: false,
      render: (_, value) => {
        return <div>{value.unitInternationalCode}</div>;
      },
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
      title: <div className={style.title}>{translateFee('status')}</div>,
      width: 120,
      dataIndex: 'statusFee',
      key: 'statusFee',
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
    router.push(ROUTERS.FEE_MANAGER(id));
  };

  const handleApproveAndReject = (status: string, id?: React.Key[]) => {
    const _requestData: UpdateStatusFee = {
      id: id || selectedRowKeys,
      status,
    };
    updateStatusFeeMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message),
            setSelectedRowKeys([]),
            queryClient.invalidateQueries({
              queryKey: [API_FEE.GET_REQUEST, pagination, queryInputParams],
            }))
          : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
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

  const handleOnDoubleClick = (
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: FeeTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.FEE_MANAGER(record.key));
    }
  };

  const handleSearchSelect = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    const newQueryParams = {
      ...querySelectParams,
      searchAll: '',
      statusFee:
        filters.statusFee?.length !== 0 && filters.statusFee
          ? (filters.statusFee as string[])
          : [],
      typeFeeID:
        filters.typeFeeID?.length !== 0 && filters.typeFeeID
          ? (filters.typeFeeID[0] as string)
          : '',
      currencyID:
        filters.currencyID?.length !== 0 && filters.currencyID
          ? (filters.currencyID[0] as string)
          : '',
      currencyName:
        filters.currencyName?.length !== 0 && filters.currencyName
          ? (filters.currencyName[0] as string)
          : '',
    };
    setQuerySelectParams(newQueryParams);
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
          handleSearchSelect={handleSearchSelect}
        />
      </div>
    </>
  );
};

export default RequestTable;
