import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Tag, PaginationProps, Popover, Popconfirm } from 'antd';
import { useState, MouseEvent } from 'react';
import { ISeaQuotationTable, TYPE_TABS } from '../interface';
import { deleteSeaQuotation, getSeaQuotationSearch } from '../fetcher';
import {
  DiffOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Table from '../../../../commons/table/table';
import {
  DEFAULT_PAGINATION_5,
  IPaginationOfAntd,
} from '@/components/commons/table/table-default';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';
import { ProColumns } from '@ant-design/pro-components';
import { formatDate } from '@/utils/format';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import style from '@/components/commons/table/index.module.scss';
import {
  initalValueQueryInputParamsDraft,
  initalValueQuerySelectParamsDraft,
} from '../constant';

interface PortFormProps {
  handleIdQuery: (id: string) => void;
}

const DraftTable = ({ handleIdQuery }: PortFormProps) => {
  const queryClient = useQueryClient();
  const { translate: translateQuotationSea } = useI18n('seaQuotation');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION_5);
  // const [queryInputParams, setQueryInputParams] = useState<QueryInputDraft>(
  //   initalValueQueryInputParamsDraft
  // );
  const [dataTable, setDataTable] = useState<ISeaQuotationTable[]>([]);
  // const [selectedKeyShow, setSelectedKeyShow] = useState<SelectDratSearch>(
  //   initalSelectSearchDraft
  // );

  // Handle data
  useQuery({
    queryKey: [TYPE_TABS.GET_SEA_QUOTATION_BY_DRAFT_DATA, pagination],
    queryFn: () =>
      getSeaQuotationSearch({
        ...initalValueQueryInputParamsDraft,
        ...initalValueQuerySelectParamsDraft,
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
            key: data.seaQuotationID,
            seaQuotationID: data.seaQuotationID,
            seaQuotationNo: data.seaQuotationNo,
            podid: data.podid,
            podName: data.podName,
            polid: data.polid,
            polName: data.polName,
            commodityID: data.commodityID,
            commodityName: data.commodityName,
            currencyID: data.currencyID,
            currencyAbbreviations: data.currencyAbbreviations,
            note: data.note,
            effectDated: data.effectDated,
            validityDate: data.validityDate,
            freqDate: data.freqDate,
            demSeaQuotation: data.demSeaQuotation,
            detSeaQuotation: data.detSeaQuotation,
            stoSeaQuotation: data.stoSeaQuotation,
            lclMinSeaQuotation: data.lclMinSeaQuotation,
            lclSeaQuotation: data.lclSeaQuotation,
            public: data.public,
            statusSeaQuotation: data.statusSeaQuotation,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
            seaQuotationDetailDTOs: data.seaQuotationDetailDTOs,
            dateInserted: data.dateInserted,
            insertedByUser: data.insertedByUser,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
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

  const deleteItemDraftMutation = useMutation({
    mutationFn: (id: string[]) => deleteSeaQuotation(id),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [TYPE_TABS.GET_SEA_QUOTATION_BY_DRAFT_DATA],
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
  const columns: ProColumns<ISeaQuotationTable>[] = [
    {
      title: <div className={style.title}>{translateQuotationSea('no')}</div>,
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
      title: <div className={style.title}>{translateQuotationSea('code')}</div>,
      width: 200,
      dataIndex: 'seaQuotationNo',
      key: 'seaQuotationNo',
      align: 'left',
      render: (value) => value,
    },
    {
      title: <div className={style.title}>{translateQuotationSea('POL')}</div>,
      width: 200,
      dataIndex: 'polName',
      key: 'polName',
      align: 'left',
      render: (value) => value,
    },
    {
      title: <div className={style.title}>{translateQuotationSea('POD')}</div>,
      width: 200,
      dataIndex: 'podName',
      key: 'podName',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translateQuotationSea('commodity')}</div>
      ),
      width: 300,
      dataIndex: 'commodityName',
      key: 'commodityName',
      align: 'left',
    },
    {
      title: <div className={style.title}>{translateCommon('LCLMin')}</div>,
      width: 200,
      dataIndex: 'lclMinSeaQuotation',
      key: 'lclMinSeaQuotation',
      align: 'right',
    },
    {
      title: <div className={style.title}>{translateCommon('LCL')}</div>,
      width: 200,
      dataIndex: 'lclSeaQuotation',
      key: 'lclSeaQuotation',
      align: 'right',
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
      title: <div className={style.title}>{translateCommon('status')}</div>,
      width: 120,
      dataIndex: 'statusSeaQuotation',
      key: 'statusSeaQuotation',
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
    record: ISeaQuotationTable
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
          <Table
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
