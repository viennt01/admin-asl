import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
} from '@/components/commons/table/table-default';
import Table from '@/components/commons/table/table';
import { UpdateStatusUnit } from '@/components/menu-item/master-data/unit-catalog/unit/interface';
import { ROUTERS } from '@/constant/router';
import { API_CUSTOM_PRICING } from '@/fetcherAxios/endpoint';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, PaginationProps } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
import { formatDate, formatNumber } from '@/utils/format';
import { STATUS_ALL_LABELS } from '@/constant/form';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { getTable, updateStatus } from '../fetcher';
import style from '@/components/commons/table/index.module.scss';
import { initalValueQueryInputParamsRequest } from '../constant';
import { ICustomPricingTable, UpdateStatus } from '../interface';

const RequestTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translatePricingCustom } = useI18n('pricingCustoms');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);

  const [dataTable, setDataTable] = useState<ICustomPricingTable[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Handle data
  useQuery({
    queryKey: [API_CUSTOM_PRICING.GET_REQUEST, pagination],
    queryFn: () =>
      getTable({
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
            key: data.customPricingID,
            typeDelaracrionID: data.typeDelaracrionID,
            typeDelaracrionName: data.typeDelaracrionName,
            partnerID: data.partnerID,
            vendor: data.vendor,
            commodityID: data.commodityID,
            commodityName: data.commodityName,
            currencyID: data.currencyID,
            currencyAbbreviations: data.currencyAbbreviations,
            transactionTypeID: data.transactionTypeID,
            transactionTypeName: data.transactionTypeName,
            note: data.note,
            customRedPrice: data.customRedPrice,
            customYellowPrice: data.customYellowPrice,
            customGreenPrice: data.customGreenPrice,
            effectDated: data.effectDated,
            validityDate: data.validityDate,
            statusCustomPricing: data.statusCustomPricing,
            insertedByUser: data.insertedByUser,
            dateInserted: data.dateInserted,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
            public: data.public,
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
    mutationFn: (body: UpdateStatusUnit) => {
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

  const columns: ProColumns<ICustomPricingTable>[] = [
    {
      title: <div className={style.title}>{translatePricingCustom('no')}</div>,
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
        <div className={style.title}>
          {translatePricingCustom('typeDelaracrionID_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'typeDelaracrionName',
      key: 'typeDelaracrionName',
      align: 'left',
      render: (value) => value,
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingCustom('transactionTypeID_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'transactionTypeName',
      key: 'transactionTypeName',
      align: 'left',
      render: (value) => value,
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingCustom('customRedPrice_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'customRedPrice',
      key: 'customRedPrice',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingCustom('customYellowPrice_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'customYellowPrice',
      key: 'customYellowPrice',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingCustom('customGreenPrice_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'customGreenPrice',
      key: 'customGreenPrice',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingCustom('currency_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'currencyAbbreviations',
      key: 'currencyAbbreviations',
      align: 'right',
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingCustom('vendor_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'vendor',
      key: 'vendor',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingCustom('commodity_form.title')}
        </div>
      ),
      width: 300,
      dataIndex: 'commodityName',
      key: 'commodityName',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingCustom('effect_date_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'effectDated',
      key: 'effectDated',
      align: 'right',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingCustom('validity_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'validityDate',
      key: 'validityDate',
      align: 'right',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: (
        <div className={style.title}>
          {translatePricingCustom('note_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'note',
      key: 'note',
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
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.CUSTOMS_PRICING_MANAGER(id));
  };

  const handleApproveAndReject = (status: string, id?: React.Key[]) => {
    const _requestData: UpdateStatus = {
      id: id || selectedRowKeys,
      status,
    };
    updateStatusMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message),
            setSelectedRowKeys([]),
            queryClient.invalidateQueries({
              queryKey: [API_CUSTOM_PRICING.GET_REQUEST, pagination],
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
    record: ICustomPricingTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.CUSTOMS_PRICING_MANAGER(record.key));
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
