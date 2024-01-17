import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
} from '@/components/commons/table/table-default';
import Table from '@/components/commons/table/table';
import {
  IPartnerTable,
  IQueryInputParamType,
  IRolePartner,
  ISelectSearch,
  TYPE_TABS,
  UpdateStatusUnit,
} from '../interface';
import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, PaginationProps, Popover, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent, useContext } from 'react';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { formatDate } from '@/utils/format';
import { STATUS_ALL_LABELS } from '@/constant/form';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { getUnitSearch, updateStatus } from '../fetcher';
import style from '@/components/commons/table/index.module.scss';
import {
  initalSelectSearchRequest,
  initalValueQueryInputParamsRequest,
  initalValueQuerySelectParamsRequest,
} from '../constant';
import { API_USER } from '@/fetcherAxios/endpoint';
import { getUserInfo } from '@/layout/fetcher';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { getPriorityRole } from '@/hook/useAuthentication';
import { AppContext } from '@/app-context';

type DataIndex = keyof IQueryInputParamType;

const RequestTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translatePartner } = useI18n('partner');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] =
    useState<IQueryInputParamType>(initalValueQueryInputParamsRequest);
  const [dataTable, setDataTable] = useState<IPartnerTable[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedKeyShow, setSelectedKeyShow] = useState<ISelectSearch>(
    initalSelectSearchRequest
  );
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
    queryKey: [TYPE_TABS.GET_PARTNER_BY_REQUEST, pagination, queryInputParams],
    queryFn: () =>
      getUnitSearch({
        ...queryInputParams,
        ...initalValueQuerySelectParamsRequest,
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
            key: data.partnerID,
            cityID: data.cityID,
            cityName: data.cityName,
            countryName: data.countryName,
            aslPersonalContactID: data.aslPersonalContactID,
            saleManName: data.saleManName,
            companyName: data.companyName,
            abbreviations: data.abbreviations,
            emailCompany: data.emailCompany,
            phoneNumber: data.phoneNumber,
            taxCode: data.taxCode,
            address: data.address,
            website: data.website,
            note: data.note,
            statusPartner: data.statusPartner,
            rolePartner: data.rolePartner,
            insertedByUser: data.insertedByUser,
            dateInserted: data.dateInserted,
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

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusUnit) => {
      return updateStatus(body);
    },
  });

  // Handle search
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // newQueryParams[dataIndex] = selectedKeys;
    setQueryInputParams(newQueryParams);
    confirm();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const columns: ProColumns<IPartnerTable>[] = [
    {
      title: <div className={style.title}>{translatePartner('code')}</div>,
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
          {translatePartner('email_form.title')}
        </div>
      ),
      dataIndex: 'emailCompany',
      key: 'emailCompany',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePartner('role_form.title')}</div>
      ),
      dataIndex: 'roleName',
      key: 'roleName',
      width: 250,
      align: 'left',
      render: (_, value) => {
        const content = (valueTypeLocations: IRolePartner[]) => {
          return (
            <div>
              {valueTypeLocations.map((type) => {
                return <Tag key={type.roleID}>{type.name}</Tag>;
              })}
            </div>
          );
        };
        return (
          <Popover content={content(value.rolePartner)}>
            {value.rolePartner.length <= 2 ? (
              value.rolePartner.map((type) => (
                <Tag key={type.roleID}>{type.name}</Tag>
              ))
            ) : (
              <>
                {value.rolePartner.slice(0, 2).map((type) => (
                  <Tag key={type.roleID}>{type.name}</Tag>
                ))}
                <Tag>...</Tag>
              </>
            )}
          </Popover>
        );
      },
    },
    {
      title: (
        <div className={style.title}>{translatePartner('city_form.title')}</div>
      ),
      dataIndex: 'cityName',
      key: 'cityName',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePartner('nationality')}</div>
      ),
      dataIndex: 'countryName',
      key: 'countryName',
      width: 250,
      align: 'left',
    },
    {
      title: <div className={style.title}>{translatePartner('Sales Man')}</div>,
      dataIndex: 'aslSalesMan',
      key: 'aslSalesMan',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('companyName_form.title')}
        </div>
      ),
      dataIndex: 'companyName',
      key: 'companyName',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('abbreviations_form.title')}
        </div>
      ),
      dataIndex: 'abbreviations',
      key: 'abbreviations',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('emailCompany_form.title')}
        </div>
      ),
      dataIndex: 'emailCompany',
      key: 'emailCompany',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('phone_number_form.title')}
        </div>
      ),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('taxCode_form.title')}
        </div>
      ),
      dataIndex: 'taxCode',
      key: 'taxCode',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('address_form.title')}
        </div>
      ),
      dataIndex: 'address',
      key: 'address',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('birthday_form.title')}
        </div>
      ),
      dataIndex: 'birthdated',
      key: 'birthdated',
      width: 150,
      align: 'left',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('website_form.title')}
        </div>
      ),
      dataIndex: 'website',
      key: 'website',
      width: 250,
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
      title: (
        <div className={style.title}>{translateCommon('date_inserted')}</div>
      ),
      width: 150,
      dataIndex: 'dateUpdated',
      key: 'dateUpdated',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: <div className={style.title}>{translateCommon('inserter')}</div>,
      width: 200,
      dataIndex: 'updatedByUser',
      key: 'updatedByUser',
      align: 'center',
    },
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.PARTNER_MANAGER(id));
  };

  const handleApproveAndReject = (status: string, id?: React.Key[]) => {
    const _requestData: UpdateStatusUnit = {
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
                TYPE_TABS.GET_PARTNER_BY_REQUEST,
                pagination,
                queryInputParams,
              ],
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
    record: IPartnerTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.PARTNER_MANAGER(record.key));
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
