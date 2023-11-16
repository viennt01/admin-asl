import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Tag, PaginationProps, Popover, Popconfirm } from 'antd';
import { useState, MouseEvent } from 'react';
import { IPartnerTable, QueryInputDraft, SelectDratSearch } from '../interface';
import { API_PARTNER } from '@/fetcherAxios/endpoint';
import { deleteUnit, getDartTable } from '../fetcher';
import {
  DiffOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  DEFAULT_PAGINATION_5,
  IPaginationOfAntd,
} from '@/components/commons/table/table-default';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { ProColumns } from '@ant-design/pro-components';
import { formatDate } from '@/utils/format';
import COLORS from '@/constant/color';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import style from '@/components/commons/table/index.module.scss';
import {
  initalSelectSearchDraft,
  initalValueQueryInputParamsDraft,
  initalValueQuerySelectParamsDraft,
} from '../constant';
import Table from '@/components/commons/table/table';

type DataIndex = keyof QueryInputDraft;

interface PortFormProps {
  handleIdQuery: (id: string) => void;
}

const DraftTable = ({ handleIdQuery }: PortFormProps) => {
  const queryClient = useQueryClient();
  const { translate: translatePartner } = useI18n('partner');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION_5);
  const [queryInputParams, setQueryInputParams] = useState<QueryInputDraft>(
    initalValueQueryInputParamsDraft
  );
  const [dataTable, setDataTable] = useState<IPartnerTable[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedKeyShow, setSelectedKeyShow] = useState<SelectDratSearch>(
    initalSelectSearchDraft
  );

  // Handle data
  useQuery({
    queryKey: [API_PARTNER.GET_SEARCH, pagination, queryInputParams],
    queryFn: () =>
      getDartTable({
        ...queryInputParams,
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
            key: data.userID,
            languageID: data.languageID,
            languageName: data.languageName,
            genderID: data.genderID,
            genderName: data.genderName,
            roleID: data.roleID,
            roleName: data.roleName,
            cityID: data.cityID,
            cityName: data.cityName,
            aslPersonalContactID: data.aslPersonalContactID,
            aslSalesMan: data.aslSalesMan,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            fullName: data.fullName,
            companyName: data.companyName,
            abbreviations: data.abbreviations,
            emailCompany: data.emailCompany,
            phoneNumber: data.phoneNumber,
            taxCode: data.taxCode,
            address: data.address,
            birthdated: data.birthdated,
            workingBranch: data.workingBranch,
            nationality: data.nationality,
            visa: data.visa,
            citizenIdentification: data.citizenIdentification,
            website: data.website,
            note: data.note,
            avatar: data.avatar,
            colorAvatar: data.colorAvatar,
            defaultAvatar: data.defaultAvatar,
            lastUserLogin: data.lastUserLogin,
            lastUserLoginFailed: data.lastUserLoginFailed,
            insertedByUser: data.insertedByUser,
            dateInserted: data.dateInserted,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
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

  const deleteItemDraftMutation = useMutation({
    mutationFn: (id: string[]) => deleteUnit(id),
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        queryClient.invalidateQueries({
          queryKey: [API_PARTNER.GET_SEARCH],
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
      title: (
        <div className={style.title}>
          {translatePartner('fullName_form.title')}
        </div>
      ),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
      align: 'center',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('email_form.title')}
        </div>
      ),
      dataIndex: 'email',
      key: 'email',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('gender_form.title')}
        </div>
      ),
      dataIndex: 'genderName',
      key: 'genderName',
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
          {translatePartner('workingBranch_form.title')}
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
          {translatePartner('nationality_form.title')}
        </div>
      ),
      dataIndex: 'nationality',
      key: 'nationality',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePartner('visa_form.title')}</div>
      ),
      dataIndex: 'visa',
      key: 'visa',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('citizenIdentification_form.title')}
        </div>
      ),
      dataIndex: 'citizenIdentification',
      key: 'citizenIdentification',
      width: 250,
      align: 'left',
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
      title: <div className={style.title}>{translatePartner('status')}</div>,
      width: 120,
      dataIndex: 'statusUser',
      key: 'statusUser',
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
    record: IPartnerTable
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
