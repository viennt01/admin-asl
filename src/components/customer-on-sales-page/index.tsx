import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Input, InputRef, Space, Tag } from 'antd';
import { Key, useRef, useState } from 'react';
import CreateCustomer from './create-customer-on-sales';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps } from 'antd/es/table/interface';
import style from './index.module.scss';

const STATUS_COLORS = {
  Active: '#00A651',
  DeActive: '#ED1C27',
};
const STATUS_LABELS = {
  Active: 'Active',
  DeActive: 'Tạm ngừng',
};

export default function CustomerOnSalesPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateCustomerOnSales } = useI18n('customerOnSales');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    customerCode: string;
    abbreviation: string;
    customerName: string;
    numberOfTransaction: number;
    phone: string;
    address: string;
    country: string;
    email: string;
    saleman: string;
    status: string;
    dateCreated: string;
    creator: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      customerCode: 'ASL120',
      abbreviation: `MASAN CONSUMER`,
      customerName: `CÔNG TY CP HÀNG TIÊU DÙNG MASAN`,
      numberOfTransaction: 250,
      phone: '0964582355',
      address:
        'MPlaza Saigon 39 Le Duan, Ben Nghe, District 1, Ho Chi Minh City, Vietnam',
      country: 'Việt Nam',
      email: 'abcd@gmail.com',
      saleman: i % 2 === 0 ? 'Linh Hương BG' : 'Lee & Man',
      status: i % 2 === 1 ? 'Active' : 'DeActive',
      dateCreated: '14/06/2023',
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
      title: translateCustomerOnSales('code'),
      width: 150,
      dataIndex: 'customerCode',
      key: 'customerCode',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('customerCode'),
    },
    {
      title: translateCustomerOnSales('abbreviation'),
      width: 250,
      dataIndex: 'abbreviation',
      key: 'abbreviation',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('abbreviation'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateCustomerOnSales('name'),
      width: 350,
      dataIndex: 'customerName',
      key: 'customerName',
      align: 'center',
      ...getColumnSearchProps('customerName'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateCustomerOnSales('number'),
      width: 250,
      dataIndex: 'numberOfTransaction',
      key: 'numberOfTransaction',
      align: 'center',
      ...getColumnSearchProps('numberOfTransaction'),
    },
    {
      title: translateCustomerOnSales('phone'),
      width: 150,
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      ...getColumnSearchProps('phone'),
    },
    {
      title: translateCustomerOnSales('address'),
      width: 500,
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      ...getColumnSearchProps('address'),
    },
    {
      title: translateCustomerOnSales('country'),
      width: 150,
      dataIndex: 'country',
      key: 'country',
      align: 'center',
      ...getColumnSearchProps('country'),
    },
    {
      title: translateCustomerOnSales('email'),
      width: 180,
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      ...getColumnSearchProps('email'),
    },
    {
      title: translateCustomerOnSales('saleman'),
      width: 200,
      dataIndex: 'saleman',
      key: 'saleman',
      align: 'center',
      ...getColumnSearchProps('saleman'),
    },
    {
      title: translateCustomerOnSales('status'),
      width: 150,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        {
          text: 'Active',
          value: 'Active',
        },
        {
          text: 'Tạm ngừng',
          value: 'DeActive',
        },
      ],
      // onFilter: (value: string, record) => record.address.startsWith(value),
      filterSearch: true,
      render: (value) => (
        <Tag
          color={STATUS_COLORS[value as keyof typeof STATUS_COLORS]}
          style={{
            margin: 0,
          }}
        >
          {STATUS_LABELS[value as keyof typeof STATUS_LABELS]}
        </Tag>
      ),
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateCustomerOnSales('date_created')}
        </div>
      ),
      width: 150,
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateCustomerOnSales('creator')}
        </div>
      ),
      width: 200,
      dataIndex: 'creator',
      key: 'creator',
      align: 'center',
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
    router.push(ROUTERS.CUSTOMER_ON_SALES_EDIT(id));
  };

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <ConfigProvider>
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
        headerTitle={translateCustomerOnSales('title')}
        scroll={{
          x: 'max-content',
        }}
        sticky={{ offsetHeader: 0 }}
        options={{
          fullScreen: true,
          search: true,
        }}
        toolBarRender={() => [
          <CreateCustomer key={'create'} />,
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
    </ConfigProvider>
  );
}
