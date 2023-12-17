import { SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import type { FormInstance, InputRef } from 'antd';
import { Button, Form, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { IFormValues, ISeaPricingForPartnerDTOsTable } from '../interface';
import { EyeOutlined } from '@ant-design/icons';
import { ROLE } from '@/constant/permission';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import { AppContext } from '@/app-context';
import { formatDate, formatNumber } from '@/utils/format';
import { DAY_WEEK } from '@/constant';

interface FormProps {
  form: FormInstance<IFormValues>;
}

type DataIndex = keyof ISeaPricingForPartnerDTOsTable;

const ListSea = ({ form }: FormProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const userBaseDTOs = Form.useWatch('seaPricingForPartnerDTOs', form);
  const [dataTable, setDataTable] = useState<ISeaPricingForPartnerDTOsTable[]>(
    []
  );
  const router = useRouter();
  const { role } = useContext(AppContext);

  useEffect(() => {
    setDataTable(
      userBaseDTOs?.map((item) => ({
        key: item.seaPricingID,
        podName: item.podName,
        polName: item.polName,
        commodityName: item.commodityName,
        currencyAbbreviations: item.currencyAbbreviations,
        vendor: item.vendor,
        note: item.note,
        effectDated: item.effectDated,
        validityDate: item.validityDate,
        freqDate: item.freqDate,
        demSeaPricing: item.demSeaPricing,
        detSeaPricing: item.detSeaPricing,
        stoSeaPricing: item.stoSeaPricing,
        lclMinSeaPricing: item.lclMinSeaPricing,
        lclSeaPricing: item.lclSeaPricing,
        statusSeaPricing: item.statusSeaPricing,
      })) || []
    );
  }, [userBaseDTOs]);

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
  ): ColumnType<ISeaPricingForPartnerDTOsTable> => ({
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

  const columns: ColumnsType<ISeaPricingForPartnerDTOsTable> = [
    {
      title: 'POD',
      dataIndex: 'podName',
      key: 'podName',
      ...getColumnSearchProps('podName'),
    },
    {
      title: 'POL',
      dataIndex: 'polName',
      key: 'polName',
      ...getColumnSearchProps('polName'),
    },
    {
      title: 'Commodity',
      dataIndex: 'commodityName',
      key: 'commodityName',
      ...getColumnSearchProps('commodityName'),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      ...getColumnSearchProps('vendor'),
    },
    {
      title: 'DEM',
      dataIndex: 'demSeaPricing',
      key: 'demSeaPricing',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: 'DET',
      dataIndex: 'detSeaPricing',
      key: 'detSeaPricing',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: 'STO',
      dataIndex: 'stoSeaPricing',
      key: 'stoSeaPricing',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: 'LCL',
      dataIndex: 'lclSeaPricing',
      key: 'lclSeaPricing',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: 'LCL Min',
      dataIndex: 'lclMinSeaPricing',
      key: 'lclMinSeaPricing',
      align: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
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
      dataIndex: 'dateEffect',
      key: 'dateEffect',
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
      dataIndex: 'statusSeaPricing',
      key: 'statusSeaPricing',
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
            onClick={() => router.push(ROUTERS.SEA_PRICING_EDIT(value))}
            icon={<EyeOutlined />}
            style={{
              marginRight: '10px',
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataTable}
      scroll={{
        x: 'max-content',
      }}
    />
  );
};

export default ListSea;
