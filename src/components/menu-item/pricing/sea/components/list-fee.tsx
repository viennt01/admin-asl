import { FeeTable } from '@/components/menu-item/quotation/fee-group/interface';
import { Button, Input, InputRef, Space, Table } from 'antd';
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from 'antd/lib/table/interface';
import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { formatNumber } from '@/utils/format';

interface Props {
  FeeDataTable: FeeTable[];
}
type DataIndex = keyof FeeTable;
const ListFee = ({ FeeDataTable }: Props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

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
  ): ColumnType<FeeTable> => ({
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
      (record[dataIndex ?? ''] || '')
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

  const columns: ColumnsType<FeeTable> = [
    {
      title: 'Name',
      dataIndex: 'feeName',
      key: 'feeName',
      fixed: 'left',
      ...getColumnSearchProps('feeName'),
    },
    {
      title: 'Unit',
      dataIndex: 'unitInternationalCode',
      key: 'unitInternationalCode',
      fixed: 'left',
      ...getColumnSearchProps('unitInternationalCode'),
    },
    {
      title: 'Price',
      dataIndex: 'priceFeeGroup',
      key: 'priceFeeGroup',
      fixed: 'right',
      ...getColumnSearchProps('priceFeeGroup'),
      render: (value) => {
        return value ? formatNumber(Number(value) || 0) : '-';
      },
    },
    {
      title: 'Currency',
      dataIndex: 'currencyName',
      key: 'currencyName',
      fixed: 'left',
      ...getColumnSearchProps('currencyName'),
    },

    {
      title: 'VAT',
      dataIndex: 'vatFeeGroup',
      key: 'vatFeeGroup',
      fixed: 'right',
      ...getColumnSearchProps('vatFeeGroup'),
      render: (value) => {
        return value ? formatNumber(Number(value) || 0) : '-';
      },
    },
    {
      title: 'NO',
      dataIndex: 'feeNo',
      key: 'feeNo',
      fixed: 'left',
      ...getColumnSearchProps('feeNo'),
    },
  ];
  return <Table columns={columns} dataSource={FeeDataTable} />;
};

export default ListFee;
