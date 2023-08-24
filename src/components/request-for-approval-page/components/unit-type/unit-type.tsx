import { EditOutlined } from '@ant-design/icons';
import CollapseCard from '@/components/commons/collapse-card';
import {
  DEFAULT_PAGINATION,
  PaginationOfAntd,
  SkeletonTable,
} from '@/components/commons/table-commons';
import TableUnit from '@/components/unit-page/components/table-unit';
import { getLocationsSearch } from '@/components/unit-page/fetcher';
import {
  LocationTable,
  QueryInputParamType,
  SelectSearch,
} from '@/components/unit-page/interface';
import { ROUTERS } from '@/constant/router';
import { API_UNIT } from '@/fetcherAxios/endpoint';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { Button, Col, PaginationProps, Row, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { ColumnSearchTableProps } from '@/components/commons/search-table';
import { formatDate } from '@/utils/format';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';

const initalValueQueryInputParams = {
  searchAll: '',
  internationalCode: '',
  description: '',
};

const initalValueQuerySelectParams = {
  statusUnit: [STATUS_ALL_LABELS.REQUEST],
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

const UnitType = () => {
  const router = useRouter();
  const { translate: translateUnit } = useI18n('unit');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputParamType>(
    initalValueQueryInputParams
  );
  const [dataTable, setDataTable] = useState<LocationTable[]>([]);
  const [selectedKeyShow, setSelectedKeyShow] =
    useState<SelectSearch>(initalSelectSearch);
  // Handle data
  const unitsQuerySearch = useQuery({
    queryKey: [API_UNIT.GET_UNIT_SEARCH, pagination, queryInputParams],
    queryFn: () =>
      getLocationsSearch({
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
  const columns: ProColumns<LocationTable>[] = [
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
    {
      key: 'operation',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      fixed: 'right',
      render: (value) => (
        <Button
          onClick={() => handleEditCustomer(value as string)}
          icon={<EditOutlined />}
        />
      ),
    },
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.UNIT_EDIT(id));
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
    record: LocationTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.UNIT_EDIT(record.key, true));
    }
  };

  return (
    <>
      <CollapseCard
        title={'Unit'}
        style={{ marginBottom: '24px' }}
        defaultActive={true}
      >
        <Row>
          <Col span={24}>
            {unitsQuerySearch.isLoading ? (
              <SkeletonTable />
            ) : (
              <TableUnit
                dataTable={dataTable}
                columns={columns}
                handlePaginationChange={handlePaginationChange}
                handleOnDoubleClick={handleOnDoubleClick}
                pagination={pagination}
                checkTableMaster={false}
              />
            )}
          </Col>
        </Row>
      </CollapseCard>
    </>
  );
};

export default UnitType;
