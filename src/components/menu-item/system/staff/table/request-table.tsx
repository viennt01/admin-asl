import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
} from '@/components/commons/table/table-default';
import Table from '@/components/commons/table/table';
import {
  IPartnerTable,
  IQueryInputParamType,
  ISelectSearch,
  TYPE_TABS,
  UpdateStatusUnit,
} from '../interface';
import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, PaginationProps } from 'antd';
import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { formatDate, formatDateYYYYMMDD } from '@/utils/format';
import { STATUS_ALL_LABELS } from '@/constant/form';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { getTable, updateStatus } from '../fetcher';
import style from '@/components/commons/table/index.module.scss';
import {
  initalSelectSearchRequest,
  initalValueQueryInputParamsRequest,
  initalValueQuerySelectParamsRequest,
} from '../constant';

type DataIndex = keyof IQueryInputParamType;

const RequestTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { translate: translateStaff } = useI18n('staff');
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

  // Handle data
  useQuery({
    queryKey: [
      TYPE_TABS.GET_STAFF_BY_REQUEST_DATA,
      pagination,
      queryInputParams,
    ],
    queryFn: () =>
      getTable({
        ...initalValueQuerySelectParamsRequest,
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
            key: data.aslPersonalContactID,
            genderID: data.genderID,
            genderName: data.genderName,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            aslRoleID: data.aslRoleID,
            employeeCode: data.employeeCode,
            ipAddress: data.ipAddress,
            aslRoleName: data.aslRoleName,
            taxCode: data.taxCode,
            address: data.address,
            userBirthday: data.userBirthday,
            workingBranch: data.workingBranch,
            nationality: data.nationality,
            visa: data.visa,
            citizenIdentification: data.citizenIdentification,
            note: data.note,
            avatar: data.avatar,
            colorAvatar: data.colorAvatar,
            defaultAvatar: data.defaultAvatar,
            lastUserLogin: data.lastUserLogin,
            lastUserLoginFailed: data.lastUserLoginFailed,
            dateCreated: data.dateCreated,
            dateUpdated: data.dateUpdated,
            statusUser: data.statusUser,
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
    newQueryParams[dataIndex] = selectedKeys;
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
      title: <div className={style.title}>{translateStaff('code')}</div>,
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
              console.log();

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
          {translateStaff('employeeCode_form.title')}
        </div>
      ),
      dataIndex: 'employeeCode',
      key: 'employeeCode',
      width: 200,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translateStaff('fullName_form.title')}
        </div>
      ),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
      align: 'center',
    },
    {
      title: (
        <div className={style.title}>{translateStaff('email_form.title')}</div>
      ),
      dataIndex: 'email',
      key: 'email',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translateStaff('gender_form.title')}</div>
      ),
      dataIndex: 'genderName',
      key: 'genderName',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translateStaff('aslRoleID_form.title')}
        </div>
      ),
      dataIndex: 'aslRoleName',
      key: 'aslRoleName',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translateStaff('ipAddress_form.title')}
        </div>
      ),
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translateStaff('phone_number_form.title')}
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
          {translateStaff('taxCode_form.title')}
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
          {translateStaff('address_form.title')}
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
          {translateStaff('birthday_form.title')}
        </div>
      ),
      dataIndex: 'userBirthday',
      key: 'userBirthday',
      width: 150,
      align: 'left',
      render: (value) => formatDateYYYYMMDD(Number(value)),
    },
    {
      title: (
        <div className={style.title}>
          {translateStaff('workingBranch_form.title')}
        </div>
      ),
      dataIndex: 'workingBranch',
      key: 'workingBranch',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translateStaff('nationality_form.title')}
        </div>
      ),
      dataIndex: 'nationality',
      key: 'nationality',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translateStaff('visa_form.title')}</div>
      ),
      dataIndex: 'visa',
      key: 'visa',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translateCommon('date_created')}</div>
      ),
      width: 150,
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
      render: (value) => formatDate(Number(value)),
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
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.STAFF_MANAGER(id));
  };

  const handleApproveAndReject = (status: string, id?: React.Key[]) => {
    console.log(id);

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
                TYPE_TABS.GET_STAFF_BY_REQUEST_DATA,
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
    record: IPartnerTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.STAFF_MANAGER(record.key));
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
