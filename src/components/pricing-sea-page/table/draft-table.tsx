import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Tag, PaginationProps, Popover, Popconfirm } from 'antd';
import { useState, MouseEvent } from 'react';
import {
  SeaPricingTable,
  QueryInputDraft,
  SelectDratSearch,
} from '../interface';
import { API_UNIT } from '@/fetcherAxios/endpoint';
import { deleteUnit, getDartTable } from '../fetcher';
import {
  DiffOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import TableUnit from '../../commons/table/table-unit';
import {
  DEFAULT_PAGINATION_5,
  PaginationOfAntd,
} from '@/components/commons/table/table-deafault';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { ProColumns } from '@ant-design/pro-components';
import { ColumnSearchTableProps } from '@/components/commons/search-table';
import { formatDate } from '@/utils/format';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import style from './index.module.scss';

const initalValueQueryInputParams = {
  internationalCode: '',
  description: '',
};

const initalValueQuerySelectParams = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
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

type DataIndex = keyof QueryInputDraft;

interface PortFormProps {
  handleIdQuery: (id: string) => void;
}

const DraftTable = ({ handleIdQuery }: PortFormProps) => {
  const queryClient = useQueryClient();
  const { translate: translateUnit } = useI18n('unit');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<PaginationOfAntd>(DEFAULT_PAGINATION_5);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputDraft>(
    initalValueQueryInputParams
  );
  const [dataTable, setDataTable] = useState<SeaPricingTable[]>([]);
  const [selectedKeyShow, setSelectedKeyShow] =
    useState<SelectDratSearch>(initalSelectSearch);

  // Handle data
  useQuery({
    queryKey: [API_UNIT.GET_SEARCH, pagination, queryInputParams],
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
        // setDataTable(
        //   data.data.data.map((data) => ({
        //     key: data.unitID,
        //     internationalCode: data.internationalCode,
        //     description: data.description,
        //     statusUnit: data.statusUnit,
        //     dateInserted: data.dateInserted,
        //     insertedByUser: data.insertedByUser,
        //     dateUpdated: data.dateUpdated,
        //     updatedByUser: data.updatedByUser,
        //     isDelete: data.isDelete,
        //     dateDeleted: data.dateDeleted,
        //     deleteByUser: data.deleteByUser,
        //     searchAll: '',
        //   }))
        // );
        pagination.current = currentPage;
        pagination.pageSize = pageSize;
        pagination.total = totalPages;
      } else {
        setDataTable([]);
      }
    },
  });

  const deleteItemDraftMutation = useMutation({
    mutationFn: (id: string[]) => deleteUnit(id),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [API_UNIT.GET_SEARCH],
        });
      } else {
        errorToast(data.message);
      }
    },
    onError: () => {
      errorToast(API_MESSAGE.ERROR);
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
  const columns: ProColumns<SeaPricingTable>[] = [
    {
      title: <div className={style.title}>{translateUnit('code')}</div>,
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
      title: (
        <div className={style.title}>{translateUnit('international_code')}</div>
      ),
      dataIndex: 'internationalCode',
      key: 'internationalCode',
      width: 150,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputDraft>({
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
      title: <div className={style.title}>{translateUnit('description')}</div>,
      dataIndex: 'description',
      key: 'description',
      width: 250,
      align: 'center',
      ...ColumnSearchTableProps<QueryInputDraft>({
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
      title: <div className={style.title}>{translateUnit('status')}</div>,
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
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => handleIdQuery(value as string)}
            icon={<DownloadOutlined />}
            style={{ marginRight: '10px' }}
          />
          <Popconfirm
            title={translateCommon('modal_delete.title')}
            okText={translateCommon('modal_delete.button_ok')}
            cancelText={translateCommon('modal_delete.button_cancel')}
            onConfirm={() => {
              deleteItemDraftMutation.mutate([value as string]);
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
  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    setPagination((state) => ({
      ...state,
      current: page,
      pageSize: size,
    }));
  };

  const handleOnDoubleClick = (
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: SeaPricingTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      handleIdQuery(record.key);
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
