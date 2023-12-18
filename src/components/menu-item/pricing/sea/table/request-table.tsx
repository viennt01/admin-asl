import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
} from '@/components/commons/table/table-default';
import Table from '@/components/commons/table/table';
import { UpdateStatusUnit } from '@/components/menu-item/master-data/unit-catalog/unit/interface';
import { ROUTERS } from '@/constant/router';
import { API_SEA_PRICING, API_USER } from '@/fetcherAxios/endpoint';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, PaginationProps } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent, useMemo, useContext } from 'react';
import {
  formatCurrencyHasCurrency,
  formatDate,
  formatNumber,
} from '@/utils/format';
import { STATUS_ALL_LABELS } from '@/constant/form';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { getTable, updateStatus } from '../fetcher';
import style from '@/components/commons/table/index.module.scss';
import { initalValueQueryInputParamsRequest } from '../constant';
import {
  SeaPricingDetailDTOs,
  SeaPricingTable,
  UpdateStatus,
} from '../interface';
import { AppContext } from '@/app-context';
import { getUserInfo } from '@/layout/fetcher';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { getPriorityRole } from '@/hook/useAuthentication';

const RequestTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translatePricingSea } = useI18n('pricingSea');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);

  const [dataTable, setDataTable] = useState<SeaPricingTable[]>([]);
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
    queryKey: [API_SEA_PRICING.GET_REQUEST, pagination],
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
            key: data.seaPricingID,
            seaPricingID: data.seaPricingID,
            podid: data.podid,
            podName: data.podName,
            polid: data.polid,
            polName: data.polName,
            commodityID: data.commodityID,
            commodityName: data.commodityName,
            currencyID: data.currencyID,
            currencyAbbreviations: data.currencyAbbreviations,
            note: data.note,
            dateEffect: data.dateEffect,
            validityDate: data.validityDate,
            freqDate: data.freqDate,
            demSeaPricing: data.demSeaPricing,
            detSeaPricing: data.detSeaPricing,
            stoSeaPricing: data.stoSeaPricing,
            lclMinSeaPricing: data.lclMinSeaPricing,
            lclSeaPricing: data.lclSeaPricing,
            public: data.public,
            statusSeaPricing: data.statusSeaPricing,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
            seaPricingDetailDTOs: data.seaPricingDetailDTOs,
            dateInserted: data.dateInserted,
            insertedByUser: data.insertedByUser,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            vendor: data.vendor,
            isASLMember: data.isASLMember,
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
  const columnDTOs = useMemo(() => {
    const result = [{}];
    for (const key in dataTable[0]?.seaPricingDetailDTOs) {
      if (dataTable[0].seaPricingDetailDTOs.hasOwnProperty(key)) {
        const obj = {
          title: <div className={style.title}>{key}</div>,
          width: 200,
          dataIndex: 'seaPricingDetailDTOs',
          render: (value: SeaPricingDetailDTOs) =>
            formatCurrencyHasCurrency(value[key]),
        };
        result.push(obj);
      }
    }
    return result;
  }, [dataTable]);

  const columns: ProColumns<SeaPricingTable>[] = [
    {
      title: <div className={style.title}>{translatePricingSea('no')}</div>,
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
      title: <div className={style.title}>{translatePricingSea('POL')}</div>,
      width: 200,
      dataIndex: 'polName',
      key: 'polName',
      align: 'left',
      render: (value) => value,
    },
    {
      title: <div className={style.title}>{translatePricingSea('POD')}</div>,
      width: 200,
      dataIndex: 'podName',
      key: 'podName',
      align: 'left',
    },
    {
      title: <div className={style.title}>Member</div>,
      width: 200,
      dataIndex: 'isASLMember',
      key: 'isASLMember',
      align: 'left',
      render: (value) => (value ? 'ASL' : 'vendor'),
    },
    {
      title: <div className={style.title}>{translatePricingSea('vendor')}</div>,
      width: 200,
      dataIndex: 'vendor',
      key: 'vendor',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePricingSea('commodity')}</div>
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
    {
      title: <div className={style.title}>{translatePricingSea('LCLMin')}</div>,
      width: 200,
      dataIndex: 'lclMinSeaPricing',
      key: 'lclMinSeaPricing',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: <div className={style.title}>{translatePricingSea('LCL')}</div>,
      width: 200,
      dataIndex: 'lclSeaPricing',
      key: 'lclSeaPricing',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    ...columnDTOs,
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.SEA_PRICING_MANAGER(id));
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
              queryKey: [API_SEA_PRICING.GET_REQUEST, pagination],
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
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: SeaPricingTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.SEA_PRICING_MANAGER(record.key));
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
