import { EyeOutlined, FilterFilled } from '@ant-design/icons';
import { Button, PaginationProps, Tag } from 'antd';
import { ChangeEvent, Key, MouseEvent, useState } from 'react';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { FilterValue, TablePaginationConfig } from 'antd/es/table/interface';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@/utils/format';

import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
  SkeletonTable,
} from '@/components/commons/table/table-default';
import style from '@/components/commons/table/index.module.scss';
import { STATUS_ALL_COLORS, STATUS_ALL_LABELS } from '@/constant/form';

import { getCustomsPricing } from '../fetcher';
import {
  initalSelectSearchMaster,
  initalValueDisplayColumnMaster,
  initalValueQueryInputParamsMaster,
  initalValueQuerySelectParamsMaster,
} from '../../pricing/custom/constant';
import {
  ICustomPricingTable,
  IQueryInputParamType,
  IQuerySelectParamType,
  SelectSearch,
} from '../../pricing/custom/interface';
import Table from '@/components/commons/table/table';

export default function MasterDataTable() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePricingCustom } = useI18n('pricingCustoms');
  const { translate: translateCommon } = useI18n('common');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [queryInputParams, setQueryInputParams] =
    useState<IQueryInputParamType>(initalValueQueryInputParamsMaster);
  const [querySelectParams, setQuerySelectParams] =
    useState<IQuerySelectParamType>(initalValueQuerySelectParamsMaster);
  const [dataTable, setDataTable] = useState<ICustomPricingTable[]>([]);
  const [selectedActiveKey, setSelectedActiveKey] = useState<SelectSearch>(
    initalSelectSearchMaster
  );
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >(initalValueDisplayColumnMaster);
  const [refreshingLoading, setRefreshingLoading] = useState(false);

  // Handle data
  const QuerySearch = useQuery({
    queryKey: ['CUSTOMS PRICING', queryInputParams, id],
    enabled: id !== undefined,
    queryFn: () =>
      getCustomsPricing({
        searchAll: queryInputParams.searchAll,
        partnerID: id as string,
        typePricing: 'CUSTOMS',
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
    setSelectedActiveKey(initalSelectSearchMaster);
    setQueryInputParams(initalValueQueryInputParamsMaster);
    setRefreshingLoading(true);
    pagination.current = 1;
    QuerySearch.refetch();
    setTimeout(() => {
      setRefreshingLoading(false);
    }, 500);
  };

  // Handle search
  const handleSearchInputKeyAll = (value: string) => {
    setSelectedActiveKey({
      ...initalSelectSearchMaster,
      searchAll: {
        label: 'searchAll',
        value: value,
      },
    });
    setQueryInputParams({
      ...initalValueQueryInputParamsMaster,
      searchAll: value,
    });
    setQuerySelectParams({
      ...initalValueQuerySelectParamsMaster,
    });
  };

  const handleSearchSelect = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    const newQueryParams = {
      ...querySelectParams,
      searchAll: '',
      statusCustomPricing:
        filters.statusCustomPricing?.length !== 0 && filters.statusCustomPricing
          ? (filters.statusCustomPricing as string[])
          : [],
    };
    setQuerySelectParams(newQueryParams);
  };

  const columns: ProColumns<ICustomPricingTable>[] = [
    {
      title: <div className={style.title}>{translatePricingCustom('no')}</div>,
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
          {translatePricingCustom('carrier_form.title')}
        </div>
      ),
      width: 200,
      dataIndex: 'vendor',
      key: 'vendor',
      align: 'left',
    },
    {
      title: (
        <div className={style.title}>{translatePricingCustom('status')}</div>
      ),
      width: 120,
      dataIndex: 'statusCustomPricing',
      key: 'statusCustomPricing',
      align: 'center',
      filters: Object.keys(STATUS_ALL_LABELS).map((key) => ({
        text: key,
        value: key,
      })),
      filterSearch: false,
      filteredValue: querySelectParams.statusCustomPricing || null,
      filterIcon: () => {
        return (
          <FilterFilled
            style={{
              color:
                querySelectParams.statusCustomPricing.length !== 0
                  ? COLORS.SEARCH.FILTER_ACTIVE
                  : COLORS.SEARCH.FILTER_DEFAULT,
            }}
          />
        );
      },
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
    {
      key: 'operation',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      render: (value) => (
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => handleEditCustomer(value as string)}
            icon={<EyeOutlined />}
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
    router.push(ROUTERS.CUSTOMS_PRICING_EDIT(id, true));
  };

  const handleSelectionChange = (selectedRowKey: Key[]) => {
    const keyData = dataTable.map((item) => item.key);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniqueDataAndSelectedRowKeys = selectedRowKeys.filter((item: any) =>
      keyData.includes(item)
    );
    const unique1AndSelectedRowKey = uniqueDataAndSelectedRowKeys.filter(
      (item) => !selectedRowKey.includes(item)
    );
    const uniqueSelection = selectedRowKey.filter(
      (item) => !selectedRowKeys.includes(item)
    );
    const result = selectedRowKeys
      .concat(uniqueSelection)
      .filter((item) => !unique1AndSelectedRowKey.includes(item));

    setSelectedRowKeys(result);
  };

  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    pagination.current = page;
    pagination.pageSize = size;

    QuerySearch.refetch();
  };

  const handleColumnsStateChange = (map: Record<string, ColumnsState>) => {
    setColumnsStateMap(map);
  };

  const handleChangeInputSearchAll = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedActiveKey((prevData) => ({
      ...prevData,
      searchAll: {
        label: 'searchAll',
        value: e.target.value ? e.target.value : '',
      },
    }));
  };

  const handleOnDoubleClick = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: ICustomPricingTable
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(ROUTERS.CUSTOMS_PRICING_EDIT(record.key, true));
    }
  };

  return (
    <div style={{ marginTop: -18 }}>
      {QuerySearch.isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <Table
            dataTable={dataTable}
            columns={columns}
            selectedRowKeys={selectedRowKeys}
            handleSelectionChange={handleSelectionChange}
            handlePaginationChange={handlePaginationChange}
            handleChangeInputSearchAll={handleChangeInputSearchAll}
            handleSearchInputKeyAll={handleSearchInputKeyAll}
            valueSearchAll={selectedActiveKey.searchAll.value}
            handleOnDoubleClick={handleOnDoubleClick}
            refreshingQuery={refreshingQuery}
            refreshingLoading={refreshingLoading}
            pagination={pagination}
            handleColumnsStateChange={handleColumnsStateChange}
            columnsStateMap={columnsStateMap}
            handleSearchSelect={handleSearchSelect}
            checkTableMaster={true}
            itemDataQuotation={selectedRowKeys}
          />
        </>
      )}
    </div>
  );
}
