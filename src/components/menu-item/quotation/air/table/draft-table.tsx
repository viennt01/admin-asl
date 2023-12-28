import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Tag,
  PaginationProps,
  Popover,
  Popconfirm,
  Checkbox,
} from 'antd';
import { useState, MouseEvent, useMemo } from 'react';
import {
  IAirQuotationDetailDTOs,
  IAirQuotationTable,
  TYPE_TABS,
} from '../interface';
import { deleteAirPricing, getAirPricingSearch } from '../fetcher';
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
import {
  formatCurrencyHasCurrency,
  formatDate,
  formatNumber,
} from '@/utils/format';
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
  const { translate: translatePricingAir } = useI18n('airQuotation');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION_5);
  // const [queryInputParams, setQueryInputParams] = useState<QueryInputDraft>(
  //   initalValueQueryInputParamsDraft
  // );
  const [dataTable, setDataTable] = useState<IAirQuotationTable[]>([]);
  // const [selectedKeyShow, setSelectedKeyShow] = useState<SelectDratSearch>(
  //   initalSelectSearchDraft
  // );

  // Handle data
  useQuery({
    queryKey: [TYPE_TABS.GET_AIR_QUOTATION_BY_DRAFT_DATA, pagination],
    queryFn: () =>
      getAirPricingSearch({
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
            key: data.airQuotationID,
            airQuotationID: data.airQuotationID,
            airQuotationNo: data.airQuotationNo,
            airPricingID: data.airPricingID,
            aodid: data.aodid,
            aodName: data.aodName,
            aolid: data.aolid,
            aolName: data.aolName,
            commodityID: data.commodityID,
            commodityName: data.commodityName,
            currencyID: data.currencyID,
            currencyAbbreviations: data.currencyAbbreviations,
            note: data.note,
            validityDate: data.validityDate,
            effectDated: data.effectDated,
            freqDate: data.freqDate,
            public: data.public,
            statusAirQuotation: data.statusAirQuotation,
            loadCapacityMinAirQuotation: data.loadCapacityMinAirQuotation,
            priceLoadCapacityMinAirQuotation:
              data.priceLoadCapacityMinAirQuotation,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
            dateInserted: data.dateInserted,
            insertedByUser: data.insertedByUser,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            airQuotationDetailDTOs: data.airQuotationDetailDTOs,
            vendorName: data.vendorName,
            transitTimeAirQuotation: data.transitTimeAirQuotation,
            hscAirQuotation: data.hscAirQuotation,
            sscAirQuotation: data.sscAirQuotation,
            gw: data.gw,
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
    mutationFn: (id: string[]) => deleteAirPricing(id),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [TYPE_TABS.GET_AIR_QUOTATION_BY_DRAFT_DATA],
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
  const columnDTOs = useMemo(() => {
    const result = [{}];
    for (const key in dataTable[0]?.airQuotationDetailDTOs) {
      if (dataTable[0].airQuotationDetailDTOs.hasOwnProperty(key)) {
        const obj = {
          title: key,
          width: 200,
          dataIndex: 'airQuotationDetailDTOs',
          render: (value: IAirQuotationDetailDTOs) =>
            formatCurrencyHasCurrency(value[key]),
        };
        result.push(obj);
      }
    }
    return result;
  }, [dataTable]);

  // Handle data show table
  const columns: ProColumns<IAirQuotationTable>[] = [
    {
      title: <div className={style.title}>{translatePricingAir('code')}</div>,
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
      title: <div className={style.title}>{translatePricingAir('code')}</div>,
      width: 200,
      dataIndex: 'airQuotationNo',
      key: 'airQuotationNo',
      align: 'left',
      render: (value) => value,
    },
    {
      title: <div className={style.title}>{translatePricingAir('AOL')}</div>,
      width: 200,
      dataIndex: 'aolName',
      key: 'aolName',
      align: 'left',
      render: (value) => value,
    },
    {
      title: <div className={style.title}>{translatePricingAir('AOD')}</div>,
      width: 200,
      dataIndex: 'aodName',
      key: 'aodName',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingAir('effect_date_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'effectDated',
      key: 'effectDated',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: (
        <div className={style.title}>{translatePricingAir('validity')}</div>
      ),
      width: 200,
      dataIndex: 'validityDate',
      key: 'validityDate',
      align: 'right',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: (
        <div className={style.title}>{translatePricingAir('carrier')}</div>
      ),
      width: 200,
      dataIndex: 'vendor', // TODO: check again
      key: 'vendor',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePricingAir('commodity')}</div>
      ),
      width: 300,
      dataIndex: 'commodityName',
      key: 'commodityName',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingAir('transitTime_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'transitTimeAirQuotation',
      key: 'transitTimeAirQuotation',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingAir('sscAirPricing_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'sscAirQuotation',
      key: 'sscAirQuotation',
      render: (value) => {
        return value ? formatNumber(Number(value)) : '-';
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingAir('hscAirPricing_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'hscAirQuotation',
      key: 'hscAirQuotation',
      render: (value) => {
        return value ? formatNumber(Number(value)) : '-';
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingAir('loadCapacityMinAirQuotation_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'loadCapacityMinAirQuotation',
      key: 'loadCapacityMinAirQuotation',
      render: (value) => {
        return value ? formatNumber(Number(value)) : '-';
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingAir('priceLoadCapacityMinAirQuotation_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'priceLoadCapacityMinAirQuotation',
      key: 'priceLoadCapacityMinAirQuotation',
      render: (value) => {
        return value ? formatNumber(Number(value)) : '-';
      },
    },
    {
      title: <div className={style.title}>{translatePricingAir('GW')}</div>,
      dataIndex: 'gw',
      width: 50,
      key: 'gw',
      align: 'center',
      render: (value) => {
        return <Checkbox checked={value as boolean} />;
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
      title: <div className={style.title}>{translateCommon('status')}</div>,
      width: 120,
      dataIndex: 'statusAirPricing',
      key: 'statusAirPricing',
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
    ...columnDTOs,
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
    record: IAirQuotationTable
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
