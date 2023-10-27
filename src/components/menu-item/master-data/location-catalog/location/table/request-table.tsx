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
import { API_LOCATION, API_LOCATION_TYPE } from '@/fetcherAxios/endpoint';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  PaginationProps,
  Popover,
  TablePaginationConfig,
  Tag,
} from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
import { FilterConfirmProps, FilterValue } from 'antd/lib/table/interface';
import { ColumnSearchTableProps } from '@/components/commons/search-table';
import { formatDate } from '@/utils/format';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { getTableRequire, updateStatus } from '../fetcher';
import style from '@/components/commons/table/index.module.scss';

import {
  LocationTableRequest,
  QueryInputRequest,
  QuerySelectRequest,
  SelectSearchRequest,
  TypeLocations,
  UpdateStatusLocation,
} from '../interface';
import { getListTypeLocations } from '@/layout/fetcher';
import {
  initalSelectSearchRequest,
  initalValueQueryInputParamsRequest,
  initalValueQuerySelectParamsRequest,
} from '../constant';

type DataIndex = keyof QueryInputRequest;

const RequestTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translateLocation } = useI18n('location');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [querySelectParams, setQuerySelectParams] =
    useState<QuerySelectRequest>(initalValueQuerySelectParamsRequest);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputRequest>(
    initalValueQueryInputParamsRequest
  );
  const [dataTable, setDataTable] = useState<LocationTableRequest[]>([]);
  const [selectedActiveKey, setSelectedActiveKey] =
    useState<SelectSearchRequest>(initalSelectSearchRequest);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Handle data
  const typePorts = useQuery(
    [API_LOCATION_TYPE.GET_TYPE_LOCATION],
    getListTypeLocations
  );
  useQuery({
    queryKey: [
      API_LOCATION.GET_REQUEST,
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
            key: data.locationID,
            cityID: data.cityID,
            cityName: data.cityName,
            locationCode: data.locationCode,
            locationName: data.locationName,
            typeLocations: data.typeLocations,
            statusLocation: data.statusLocation,
            dateInserted: data.dateInserted,
            insertedByUser: data.insertedByUser,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            isDelete: data.isDelete,
            dateDeleted: data.dateDeleted,
            deleteByUser: data.deleteByUser,
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
    mutationFn: (body: UpdateStatusLocation) => {
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
  const columns: ProColumns<LocationTableRequest>[] = [
    {
      title: <div className={style.title}>{translateLocation('no')}</div>,
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
      title: <div className={style.title}>{translateLocation('code')}</div>,
      dataIndex: 'locationCode',
      key: 'locationCode',
      width: 150,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputRequest>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'locationCode',
        },
      }),
    },
    {
      title: translateLocation('type_of_port'),
      dataIndex: 'typeLocations',
      key: 'typeLocations',
      align: 'center',
      width: 240,
      filteredValue: querySelectParams.typeLocations || null,
      filters:
        typePorts.data?.data.map((data) => ({
          text: data.typeLocationName,
          value: data.typeLocationID,
        })) || [],
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.typeLocations?.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
      filterMultiple: false,
      render: (_, value) => {
        const content = (valueTypeLocations: TypeLocations[]) => {
          return (
            <div>
              {valueTypeLocations.map((type) => {
                return (
                  <Tag key={type.typeLocationID}>{type.typeLocationName}</Tag>
                );
              })}
            </div>
          );
        };
        return (
          <Popover content={content(value.typeLocations)}>
            {value.typeLocations.length <= 2 ? (
              value.typeLocations.map((type) => (
                <Tag key={type.typeLocationID}>{type.typeLocationName}</Tag>
              ))
            ) : (
              <>
                {value.typeLocations.slice(0, 2).map((type) => (
                  <Tag key={type.typeLocationID}>{type.typeLocationName}</Tag>
                ))}
                <Tag>...</Tag>
              </>
            )}
          </Popover>
        );
      },
    },
    {
      title: <div className={style.title}>{translateLocation('name')}</div>,
      dataIndex: 'locationName',
      key: 'locationName',
      width: 250,
      align: 'left',
      ...ColumnSearchTableProps<QueryInputRequest>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedActiveKey,
          setSelectedKeyShow: setSelectedActiveKey,
          dataIndex: 'locationName',
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
      title: <div className={style.title}>{translateLocation('status')}</div>,
      width: 120,
      dataIndex: 'statusLocation',
      key: 'statusLocation',
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
    router.push(ROUTERS.LOCATION_MANAGER(id));
  };

  const handleApproveAndReject = (status: string, id?: React.Key[]) => {
    const _requestData: UpdateStatusLocation = {
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
                API_LOCATION.GET_REQUEST,
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
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: LocationTableRequest
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.LOCATION_MANAGER(record.key));
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
