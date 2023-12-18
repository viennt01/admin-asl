import { SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import type { FormInstance, InputRef } from 'antd';
import { Button, Form, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { IFormValues, ITruckingPricingForPartnerDTOsTable } from '../interface';
import { EyeOutlined } from '@ant-design/icons';
import { ROLE } from '@/constant/permission';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import { AppContext } from '@/app-context';
import { DAY_WEEK } from '@/constant';
import { formatDate } from '@/utils/format';

interface FormProps {
  form: FormInstance<IFormValues>;
}

type DataIndex = keyof ITruckingPricingForPartnerDTOsTable;

const ListTrucking = ({ form }: FormProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const truckingPricingForPartnerDTOs = Form.useWatch(
    'truckingPricingForPartnerDTOs',
    form
  );
  const [dataTable, setDataTable] = useState<
    ITruckingPricingForPartnerDTOsTable[]
  >([]);
  const router = useRouter();
  const { role } = useContext(AppContext);

  useEffect(() => {
    setDataTable(
      truckingPricingForPartnerDTOs?.map((item) => ({
        key: item.truckingPricingID,
        pickupName: item.pickupName,
        deliveryName: item.deliveryName,
        commodityName: item.commodityName,
        currencyAbbreviations: item.currencyAbbreviations,
        vendor: item.vendor,
        note: item.note,
        effectDated: item.effectDated,
        validityDate: item.validityDate,
        freqDate: item.freqDate,
        statusTruckingPricing: item.statusTruckingPricing,
      })) || []
    );
  }, [truckingPricingForPartnerDTOs]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<ITruckingPricingForPartnerDTOsTable> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<ITruckingPricingForPartnerDTOsTable> = [
    {
      title: 'Pickup Name',
      dataIndex: 'pickupName',
      key: 'pickupName',
      ...getColumnSearchProps('pickupName'),
    },
    {
      title: 'Delivery Name',
      dataIndex: 'deliveryName',
      key: 'deliveryName',
      ...getColumnSearchProps('deliveryName'),
    },
    {
      title: 'Commodity Name',
      dataIndex: 'commodityName',
      key: 'commodityName',
      ...getColumnSearchProps('commodityName'),
    },
    {
      title: 'Currency',
      dataIndex: 'currencyAbbreviations',
      key: 'currencyAbbreviations',
      ...getColumnSearchProps('currencyAbbreviations'),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      ...getColumnSearchProps('vendor'),
    },
    {
      title: 'FREQ',
      width: 150,
      dataIndex: 'freqDate',
      key: 'freqDate',
      align: 'right',
      render: (value) =>
        DAY_WEEK.find((date) => date.value === value)?.label || '-',
    },
    {
      title: 'Effect Date',
      width: 200,
      dataIndex: 'effectDated',
      key: 'effectDated',
      align: 'right',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: 'Validity Date',
      width: 200,
      dataIndex: 'validityDate',
      key: 'validityDate',
      align: 'right',
      render: (value) => formatDate(Number(value)),
    },
    {
      title: 'Status',
      dataIndex: 'statusTruckingPricing',
      key: 'statusTruckingPricing',
      align: 'right',
    },
    {
      key: 'operation',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      fixed: 'right',
      render: (value) => (
        <div
          style={{
            marginTop: 10,
            display: role === ROLE.MANAGER ? '' : 'none',
          }}
        >
          <Button
            onClick={() =>
              router.push(ROUTERS.TRUCKING_PRICING_EDIT(value, true))
            }
            icon={<EyeOutlined />}
            style={{
              marginRight: '10px',
            }}
          />
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataTable} />;
};

export default ListTrucking;
