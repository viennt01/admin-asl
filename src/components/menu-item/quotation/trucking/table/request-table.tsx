import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
} from '@/components/commons/table/table-default';
import Table from '@/components/commons/table/table';
import { UpdateStatusUnit } from '@/components/menu-item/master-data/unit-catalog/unit/interface';
import { ROUTERS } from '@/constant/router';
import { API_USER } from '@/fetcherAxios/endpoint';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, PaginationProps } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent, useMemo, useContext } from 'react';
import { formatCurrencyHasCurrency, formatDate } from '@/utils/format';
import { STATUS_ALL_LABELS } from '@/constant/form';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { getTable, updateStatus } from '../fetcher';
import style from '@/components/commons/table/index.module.scss';
import { initalValueQueryInputParamsRequest } from '../constant';
import {
  IDetailDTOs,
  ISeaQuotationTable,
  IUpdateStatus,
  TYPE_TABS,
} from '../interface';
import { AppContext } from '@/app-context';
import { getUserInfo } from '@/layout/fetcher';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { appLocalStorage } from '@/utils/localstorage';
import { getPriorityRole } from '@/hook/useAuthentication';

const RequestTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translateQuotationTruck } = useI18n('truckingQuotation');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);

  const [dataTable, setDataTable] = useState<ISeaQuotationTable[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { setUserInfo, setRole } = useContext(AppContext);

  const checkUser = useQuery({
    queryKey: [API_USER.CHECK_USER],
    queryFn: () => getUserInfo(),
    onSuccess: (data) => {
      if (!data.status) {
        // remove token and redirect to home
        appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
        router.replace(ROUTERS.LOGIN);
      } else {
        const dataRole = getPriorityRole(data?.data?.listRole || ['AGENT']);
        if (setRole) setRole(dataRole);
        if (setUserInfo) setUserInfo(data.data);
      }
    },
    onError: () => {
      // remove token and redirect to home
      appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
      router.replace(ROUTERS.LOGIN);
    },
    retry: 0,
  });
  // Handle data
  useQuery({
    queryKey: [TYPE_TABS.GET_TRUCK_QUOTATION_BY_REQUEST_DATA, pagination],
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
            key: data.truckingQuotationID,
            pickupID: data.pickupID,
            pickupName: data.pickupName,
            deliveryID: data.deliveryID,
            deliveryName: data.deliveryName,
            commodityID: data.commodityID,
            commodityName: data.commodityName,
            currencyID: data.currencyID,
            currencyAbbreviations: data.currencyAbbreviations,
            feeGroupID: data.feeGroupID,
            vendor: data.vendor,
            note: data.note,
            effectDated: data.effectDated,
            validityDate: data.validityDate,
            freqDate: data.freqDate,
            public: data.public,
            statusTruckingQuotation: data.statusTruckingQuotation,
            insertedByUser: data.insertedByUser,
            dateInserted: data.dateInserted,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
            truckingPricingDetailByContainerTypeDTOs:
              data.truckingPricingDetailByContainerTypeDTOs,
            truckingPricingDetailByLoadCapacityDTOs:
              data.truckingPricingDetailByLoadCapacityDTOs,
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
  const columnContainerDTOs = useMemo(() => {
    const result = [{}];
    for (const key in dataTable[0]?.truckingPricingDetailByContainerTypeDTOs) {
      if (
        dataTable[0].truckingPricingDetailByContainerTypeDTOs.hasOwnProperty(
          key
        )
      ) {
        const obj = {
          title: key,
          width: 200,
          dataIndex: 'truckingPricingDetailByContainerTypeDTOs',
          render: (value: IDetailDTOs) => formatCurrencyHasCurrency(value[key]),
        };
        result.push(obj);
      }
    }
    return result;
  }, [dataTable]);
  const columnLoadCapacityDTOs = useMemo(() => {
    const result = [{}];
    for (const key in dataTable[0]?.truckingPricingDetailByLoadCapacityDTOs) {
      if (
        dataTable[0].truckingPricingDetailByLoadCapacityDTOs.hasOwnProperty(key)
      ) {
        const obj = {
          title: key,
          width: 200,
          dataIndex: 'truckingPricingDetailByLoadCapacityDTOs',
          render: (value: IDetailDTOs) => formatCurrencyHasCurrency(value[key]),
        };
        result.push(obj);
      }
    }
    return result;
  }, [dataTable]);

  const columns: ProColumns<ISeaQuotationTable>[] = [
    {
      title: <div className={style.title}>{translateQuotationTruck('no')}</div>,
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
      title: <div className={style.title}>{translateQuotationTruck('no')}</div>,
      width: 200,
      dataIndex: 'seaQuotationNo',
      key: 'seaQuotationNo',
      align: 'left',
      render: (value) => value,
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
        <div className={style.title}>{translateQuotationTruck('code')}</div>
      ),
      width: 200,
      dataIndex: 'truckQuotationNo',
      key: 'truckQuotationNo',
      align: 'left',
      render: (value) => value,
    },
    {
      title: (
        <div className={style.title}>{translateQuotationTruck('pickup')}</div>
      ),
      width: 200,
      dataIndex: 'pickupName',
      key: 'pickupName',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translateQuotationTruck('delivery')}</div>
      ),
      width: 200,
      dataIndex: 'deliveryName',
      key: 'deliveryName',
      align: 'left',
      render: (value) => value,
    },
    {
      title: (
        <div className={style.title}>
          {translateQuotationTruck('commodity')}
        </div>
      ),
      width: 300,
      dataIndex: 'commodityName',
      key: 'commodityName',
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
    ...columnContainerDTOs,
    ...columnLoadCapacityDTOs,
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.TRUCKING_QUOTATION_MANAGER(id));
  };

  const handleApproveAndReject = (status: string, id?: React.Key[]) => {
    const _requestData: IUpdateStatus = {
      id: id || selectedRowKeys,
      status,
    };
    updateStatusMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message),
            setSelectedRowKeys([]),
            queryClient.invalidateQueries({
              queryKey: [TYPE_TABS.GET_TRUCK_QUOTATION_BY_REQUEST_DATA],
            }),
            checkUser.refetch())
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: ISeaQuotationTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.TRUCKING_QUOTATION_MANAGER(record.key));
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
