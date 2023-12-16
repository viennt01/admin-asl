import { EditOutlined } from '@ant-design/icons';
import { Button, PaginationProps } from 'antd';
import { Key, MouseEvent, useState } from 'react';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import { ProColumns } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@/utils/format';
import { IDataHistoryTable } from '../interface';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
  SkeletonTable,
} from '@/components/commons/table/table-default';
import style from '@/components/commons/table/index.module.scss';
import Table from '@/components/commons/table/table';
import { TYPE_STATUS_BOOKING, getHistoryBooking } from '../fetcher';

export default function MasterDataTable() {
  const router = useRouter();
  const { translate: translatePartner } = useI18n('booking');
  const { translate: translateCommon } = useI18n('common');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [querySelectParams, setQuerySelectParams] = useState<string>('');
  const [dataTable, setDataTable] = useState<IDataHistoryTable[]>([]);
  const [refreshingLoading, setRefreshingLoading] = useState(false);

  const locationsQuerySearch = useQuery({
    queryKey: ['API_BOOKING.GET_HISTORY_BOOKING_BY_ASL_C', querySelectParams],
    queryFn: () =>
      getHistoryBooking({
        bookingNo: querySelectParams,
        statusBooking: [TYPE_STATUS_BOOKING.COMPLETED],
        paginateRequest: {
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
        },
      }),
    onSuccess(data) {
      if (data.status) {
        const { currentPage, pageSize, totalPages } = data.data;
        setDataTable(
          data.data?.data?.map((data) => ({
            key: data.bookingID,
            bookingNo: data.bookingNo,
            polName: data.polName,
            podName: data.podName,
            typeOfPOLName: data.typeOfPOLName,
            typeOfPODName: data.typeOfPODName,
            commodityName: data.commodityName,
            currency: data.currency,
            typeOfService: data.typeOfService,
            typeOfSeaService: data.typeOfSeaService,
            placeOfRecipt: data.placeOfRecipt,
            placeOfDelivery: data.placeOfDelivery,
            cargoReadyDated: data.cargoReadyDated,
            cargoCutOffDated: data.cargoCutOffDated,
            note: data.note,
            statusBooking: data.statusBooking,
            insertedByUser: data.insertedByUser,
            dateInserted: data.dateInserted,
            dateUpdated: data.dateUpdated,
            updatedByUser: data.updatedByUser,
            confirmDated: data.confirmDated,
            confirmByUser: data.confirmByUser,
            isCancel: data.isCancel,
            cancelDated: data.cancelDated,
            reasonCancel: data.reasonCancel,
            isManualBooking: data.isManualBooking,
          }))
        );
        setPagination({
          current: currentPage,
          pageSize: pageSize,
          total: totalPages,
        });
      } else {
        setDataTable([]);
      }
    },
  });

  const refreshingQuery = () => {
    setRefreshingLoading(true);
    pagination.current = 1;
    locationsQuerySearch.refetch();
    setTimeout(() => {
      setRefreshingLoading(false);
    }, 500);
  };

  // Handle search
  const handleSearchInputKeyAll = (value: string) => {
    setQuerySelectParams(value);
  };

  // Handle data show table
  const columns: ProColumns<IDataHistoryTable>[] = [
    {
      title: <div className={style.title}>{translatePartner('code')}</div>,
      dataIndex: 'index',
      width: 50,
      align: 'right',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      title: (
        <div className={style.title}>{translatePartner('Booking No')}</div>
      ),
      dataIndex: 'bookingNo',
      key: 'bookingNo',
      width: 150,
      align: 'center',
    },
    {
      title: <div className={style.title}>{translatePartner('POL')}</div>,
      dataIndex: 'polName',
      key: 'polName',
      width: 250,
      align: 'left',
    },
    {
      title: <div className={style.title}>{translatePartner('POD')}</div>,
      dataIndex: 'podName',
      key: 'podName',
      width: 250,
      align: 'left',
    },
    {
      title: <div className={style.title}>{translatePartner('Receipt')}</div>,
      dataIndex: 'placeOfRecipt',
      key: 'placeOfRecipt',
      width: 250,
      align: 'left',
    },
    {
      title: <div className={style.title}>{translatePartner('Delivery')}</div>,
      dataIndex: 'placeOfDelivery',
      key: 'placeOfDelivery',
      width: 250,
      align: 'left',
    },
    {
      title: <div className={style.title}>{translatePartner('Type POL')}</div>,
      dataIndex: 'typeOfPOLName',
      key: 'typeOfPOLName',
      width: 250,
      align: 'left',
    },
    {
      title: <div className={style.title}>{translatePartner('Type POD')}</div>,
      dataIndex: 'typeOfPODName',
      key: 'typeOfPODName',
      width: 250,
      align: 'left',
    },
    {
      title: <div className={style.title}>{translatePartner('Commodity')}</div>,
      dataIndex: 'commodityName',
      key: 'commodityName',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePartner('Type Service')}</div>
      ),
      dataIndex: 'typeOfService',
      key: 'typeOfService',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>
          {translatePartner('Type Of Sea Service')}
        </div>
      ),
      dataIndex: 'typeOfSeaService',
      key: 'typeOfSeaService',
      width: 250,
      align: 'left',
    },
    {
      title: <div className={style.title}>{translatePartner('Note')}</div>,
      dataIndex: 'note',
      key: 'note',
      width: 250,
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translateCommon('Cargo Ready')}</div>
      ),
      width: 150,
      dataIndex: 'cargoReady',
      key: 'cargoReady',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: (
        <div className={style.title}>{translateCommon('Cargo Cut Off')}</div>
      ),
      width: 200,
      dataIndex: 'cargoCutOffDated',
      key: 'cargoCutOffDated',
      align: 'center',
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
        <div className={style.title}>{translateCommon('Confirm Date')}</div>
      ),
      width: 150,
      dataIndex: 'confirmDated',
      key: 'confirmDated',
      align: 'center',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: (
        <div className={style.title}>{translateCommon('Confirm By User')}</div>
      ),
      width: 200,
      dataIndex: 'confirmByUser',
      key: 'confirmByUser',
      align: 'center',
    },
    {
      key: 'operation',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      render: (value) => (
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => handleEditCustomer(value as string)}
            icon={<EditOutlined />}
            style={{
              marginRight: '10px',
            }}
          />
        </div>
      ),
    },
  ];

  // Handle logic table
  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.PARTNER_EDIT(id));
  };

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    pagination.current = page;
    pagination.pageSize = size;
    locationsQuerySearch.refetch();
  };

  const handleOnDoubleClick = (
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: IDataHistoryTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.PARTNER_EDIT(record.key, true));
    }
  };

  return (
    <div style={{ marginTop: -18 }}>
      {locationsQuerySearch.isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <Table
            dataTable={dataTable}
            columns={columns}
            headerTitle={translatePartner('title')}
            selectedRowKeys={selectedRowKeys}
            handleSelectionChange={handleSelectionChange}
            handlePaginationChange={handlePaginationChange}
            handleSearchInputKeyAll={handleSearchInputKeyAll}
            valueSearchAll={querySelectParams}
            handleOnDoubleClick={handleOnDoubleClick}
            refreshingQuery={refreshingQuery}
            refreshingLoading={refreshingLoading}
            pagination={pagination}
            checkTableMaster={true}
          />
        </>
      )}
    </div>
  );
}
