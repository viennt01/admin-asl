import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Tag, PaginationProps, Popover } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
import { UnitTable, QueryInputParamType, SelectSearch } from '../interface';
import { API_UNIT } from '@/fetcherAxios/endpoint';
import { getDartTable } from '../fetcher';
import { DiffOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';
import TableUnit from './table-unit';
import {
  DEFAULT_PAGINATION_5,
  PaginationOfAntd,
} from '@/components/commons/table-commons';
import { STATUS_ALL_LABELS } from '@/constant/form';
import {
  UpdateStatusUnit,
  updateStatus,
} from '@/components/request-for-approval-page/components/unit-type/fetcher';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { ProColumns } from '@ant-design/pro-components';
import { ColumnSearchTableProps } from '@/components/commons/search-table';
import { formatDate } from '@/utils/format';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

const initalValueQueryInputParams = {
  searchAll: '',
  internationalCode: '',
  description: '',
};

const initalValueQuerySelectParams = {
  status: [STATUS_ALL_LABELS.REQUEST],
};

const initalSelectSearch = {
  searchAll: {
    label: '',
    value: '',
  },
  internationalCode: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  statusUnit: {
    label: '',
    value: '',
  },
};

type DataIndex = keyof QueryInputParamType;

interface PortFormProps {
  a?: boolean;
}

const DraftTable = ({}: PortFormProps) => {
  const router = useRouter();
  const { translate: translateUnit } = useI18n('unit');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION_5);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParams
  );
  const [dataTable, setDataTable] = useState<UnitTable[]>([]);
  const [selectedKeyShow, setSelectedKeyShow] =
    useState<SelectSearch>(initalSelectSearch);
  // Handle data
  const unitsQuerySearch = useQuery({
    queryKey: [API_UNIT.GET_UNIT_SEARCH, pagination, queryInputParams],
    queryFn: () =>
      getDartTable({
        ...queryInputParams,
        ...initalValueQuerySelectParams,
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
            key: data.unitID,
            internationalCode: data.internationalCode,
            description: data.description,
            statusUnit: data.statusUnit,
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

  const updateStatusUnitMutation = useMutation({
    mutationFn: (body: UpdateStatusUnit) => {
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
  const columns: ProColumns<UnitTable>[] = [
    {
      title: translateUnit('code'),
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
      title: translateUnit('international_code'),
      dataIndex: 'internationalCode',
      key: 'internationalCode',
      width: 150,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'internationalCode',
        },
      }),
    },
    {
      title: translateUnit('description'),
      dataIndex: 'description',
      key: 'description',
      width: 250,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputParamType>({
        props: {
          handleSearch: handleSearchInput,
          handleReset: handleReset,
          queryParams: queryInputParams,
          selectedKeyShow: selectedKeyShow,
          setSelectedKeyShow: setSelectedKeyShow,
          dataIndex: 'description',
        },
      }),
    },
    {
      title: translateCommon('date_created'),
      width: 150,
      dataIndex: 'dateInserted',
      key: 'dateInserted',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: translateCommon('creator'),
      width: 200,
      dataIndex: 'insertedByUser',
      key: 'insertedByUser',
      align: 'center',
    },
    {
      title: translateUnit('status'),
      width: 120,
      dataIndex: 'statusUnit',
      key: 'statusUnit',
      align: 'center',
      fixed: 'right',
      render: (value) => (
        // <Tag
        //   color={STATUS_ALL_COLORS[value as keyof typeof STATUS_ALL_COLORS]}
        //   style={{
        //     margin: 0,
        //   }}
        // >
        //   {STATUS_ALL_LABELS[value as keyof typeof STATUS_ALL_LABELS]}
        // </Tag>
        <Tag>{value}</Tag>
      ),
    },
    {
      key: 'operation',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      fixed: 'right',
      render: (value) => (
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => handleEditCustomer(value as string)}
            icon={<EyeOutlined />}
            style={{ marginRight: '10px' }}
          />
          <Button
            onClick={() =>
              handleApproveAndRejectV2(
                value as string,
                STATUS_ALL_LABELS.REJECT
              )
            }
            icon={<CloseOutlined />}
            style={{ color: COLORS.ERROR, borderColor: COLORS.ERROR }}
          />
        </div>
      ),
    },
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.UNIT_MANAGER(id));
  };

  const handleApproveAndRejectV2 = (id: string, status: string) => {
    const _requestData: UpdateStatusUnit = {
      id,
      status,
    };
    updateStatusUnitMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message), unitsQuerySearch.refetch())
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
    record: UnitTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.UNIT_MANAGER(record.key));
    }
  };

  return (
    <Popover
      content={
        <div style={{ maxWidth: '700px' }}>
          <TableUnit
            dataTable={dataTable}
            columns={columns}
            handlePaginationChange={handlePaginationChange}
            handleOnDoubleClick={handleOnDoubleClick}
            pagination={pagination}
            checkTableMaster={false}
          />
        </div>
      }
    >
      <Button icon={<DiffOutlined />} type="dashed" danger>
        Draft
      </Button>
    </Popover>
  );
};

export default DraftTable;
