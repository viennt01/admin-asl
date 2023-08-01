import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, InputRef, Space } from 'antd';
import { Key, useRef, useState } from 'react';
import CreateQuotation from './create-quotation';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps } from 'antd/es/table/interface';
import style from './index.module.scss';

export default function QuotationPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateQuotation } = useI18n('quotation');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    customerName: string;
    receiptOfGoods: string;
    delivery: string;
    fee: string;
    emptyGetOrReturn: string;
    itemType: string;
    effectiveDate: string;
    creator: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      customerName: i % 2 === 0 ? 'MVG Đình Vũ' : 'VIMC ĐÌNH VŨ',
      receiptOfGoods: i % 2 === 0 ? 'Đóng hàng' : 'Trả hàng',
      delivery: i % 2 === 0 ? 'Giao hàng' : 'Chưa giao',
      fee: i % 2 === 0 ? '500000' : '20000',
      emptyGetOrReturn: i % 2 === 0 ? 'Nhận rỗng' : 'Trả rỗng',
      itemType: i % 2 === 0 ? 'Thực Phẩm' : 'Dầu Thực Vật Dabaco',
      effectiveDate: i % 2 === 0 ? '14/6/2023' : '14/6/2022',
      creator: 'Admin',
    });
  }

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

  type DataIndex = keyof DataType;

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ProColumns<DataType> => ({
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

  const columns: ProColumns<DataType>[] = [
    {
      title: translateQuotation('quotation_no'),
      width: 100,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateQuotation('customer_name'),
      width: 250,
      dataIndex: 'customerName',
      key: 'customerName',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('customerName'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateQuotation('receipt_of_goods'),
      width: 250,
      dataIndex: 'receiptOfGoods',
      key: 'receiptOfGoods',
      align: 'center',
      ...getColumnSearchProps('receiptOfGoods'),
    },
    {
      title: translateQuotation('delivery'),
      dataIndex: 'delivery',
      key: 'delivery',
      align: 'center',
      ...getColumnSearchProps('delivery'),
      width: 200,
    },
    {
      title: translateQuotation('fee'),
      dataIndex: 'fee',
      key: 'fee',
      align: 'center',
      ...getColumnSearchProps('fee'),
      width: 150,
    },
    {
      title: translateQuotation('empty_get_or_return'),
      width: 250,
      dataIndex: 'emptyGetOrReturn',
      key: 'emptyGetOrReturn',
      align: 'center',
      ...getColumnSearchProps('emptyGetOrReturn'),
    },
    {
      title: translateQuotation('item_type'),
      dataIndex: 'itemType',
      width: 200,
      key: 'itemType',
      align: 'center',
      ...getColumnSearchProps('itemType'),
    },
    {
      title: translateQuotation('effective_date'),
      width: 150,
      dataIndex: 'effectiveDate',
      key: 'effectiveDate',
      align: 'center',
      ...getColumnSearchProps('effectiveDate'),
    },
    {
      title: translateQuotation('creator'),
      width: 200,
      dataIndex: 'creator',
      key: 'creator',
      align: 'center',
      ...getColumnSearchProps('creator'),
    },
    {
      key: 'operation',
      fixed: 'right',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      render: (value) => (
        <Button
          onClick={() => handleEditCustomer(value as string)}
          icon={<EditOutlined />}
        ></Button>
      ),
    },
  ];

  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.QUOTATION_EDIT(id));
  };

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <ProTable<DataType>
      className={style.table}
      style={{ marginTop: '8px' }}
      rowKey="key"
      dataSource={data}
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys: selectedRowKeys,
        onChange: handleSelectionChange,
      }}
      pagination={{
        position: ['bottomCenter'],
        showTotal: () => '',
        showSizeChanger: true,
      }}
      columns={columns}
      search={false}
      dateFormatter="string"
      headerTitle={translateQuotation('title')}
      scroll={{
        x: 'max-content',
      }}
      sticky={{ offsetHeader: 0 }}
      options={{
        fullScreen: true,
        search: true,
      }}
      toolBarRender={() => [
        <CreateQuotation key={'create'} />,
        <Button
          icon={<DeleteOutlined />}
          style={{
            backgroundColor: COLORS.RED,
            color: COLORS.WHITE,
            borderColor: COLORS.RED,
            fontWeight: '500',
          }}
          key={'delete'}
        >
          {translateCommon('button_delete')}
        </Button>,
      ]}
    />
  );
}
