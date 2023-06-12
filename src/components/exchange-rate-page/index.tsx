import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Input, InputRef, Space, Tag } from 'antd';
import { Key, useEffect, useRef, useState } from 'react';
import CreateExchangeRate from './create-exchange-rate';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import enUS from 'antd/lib/locale/en_US';
import vi_VN from 'antd/lib/locale/vi_VN';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps } from 'antd/es/table/interface';
import style from './index.module.scss';

const STATUS_COLORS = {
  Increase: '#00A651',
  Reduce: '#ED1C27',
};
const STATUS_LABELS = {
  Increase: 'Tăng',
  Reduce: 'Giảm',
};

// const STATUS_CAPACITY_COLORS = {
//   Full: '#31AFFE',
//   NotFull: '#616887',
// };
// const STATUS_CAPACITY_LABELS = {
//   Full: 'Đầy',
//   NotFull: 'Nửa đầy',
// };

export default function ExchangeRatePage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateExchangeRate } = useI18n('exchangeRate');
  const { translate: translateCommon } = useI18n('common');
  const [locale, setLocale] = useState(enUS);
  interface DataType {
    key: number;
    currencyFrom: string;
    currencyTo: string;
    bank: string;
    exchangeRate: number;
    price: number;
    sell: number;
    status: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      currencyFrom: 'USD',
      currencyTo: 'VND',
      bank: 'ACB',
      exchangeRate: 26098,
      price: 23375,
      sell: 26098,
      status: i % 2 === 1 ? 'Increase' : 'Reduce',
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
      title: translateExchangeRate('code'),
      width: 120,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateExchangeRate('currency_from'),
      width: 150,
      dataIndex: 'currencyFrom',
      key: 'currencyFrom',
      fixed: 'left',
      align: 'center',
      filters: [
        {
          text: 'USD',
          value: 'USD',
        },
        {
          text: 'EUR',
          value: 'EUR',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateExchangeRate('currency_to'),
      width: 180,
      fixed: 'left',
      dataIndex: 'currencyTo',
      key: 'currencyTo',
      align: 'center',
      filters: [
        {
          text: 'USD',
          value: 'USD',
        },
        {
          text: 'Euro',
          value: 'Euro',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateExchangeRate('exchange_rate'),
      width: 150,
      dataIndex: 'exchangeRate',
      key: 'exchangeRate',
      ...getColumnSearchProps('exchangeRate'),
      align: 'center',
      sorter: (a, b) => a.exchangeRate - b.exchangeRate,
    },
    {
      title: translateExchangeRate('bank'),
      width: 180,
      dataIndex: 'bank',
      key: 'bank',
      ...getColumnSearchProps('bank'),
      align: 'center',
      filters: [
        {
          text: 'ABBank',
          value: 'ABBank',
        },
        {
          text: 'ACB',
          value: 'ACB',
        },
        {
          text: 'BIDV',
          value: 'BIDV',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateExchangeRate('cash_buy'),
      width: 150,
      dataIndex: 'sell',
      key: 'sell',
      align: 'center',
      sorter: (a, b) => a.sell - b.sell,
    },
    {
      title: translateExchangeRate('cash_sell'),
      width: 150,
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.sell - b.sell,
    },
    {
      title: translateExchangeRate('transfer_buy'),
      width: 200,
      dataIndex: 'sell',
      key: 'sell',
      align: 'center',
      sorter: (a, b) => a.sell - b.sell,
    },
    {
      title: translateExchangeRate('transfer_sell'),
      width: 200,
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.sell - b.sell,
    },
    {
      title: translateExchangeRate('status'),
      width: 150,
      dataIndex: 'status',
      fixed: 'right',
      key: 'status',
      align: 'center',
      filters: [
        {
          text: 'Tăng',
          value: 'Increase',
        },
        {
          text: 'Giảm',
          value: 'Reduce',
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
    router.push(ROUTERS.EXCHANGE_RATE_EDIT(id));
  };

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  useEffect(() => {
    switch (appLocalStorage.get(LOCAL_STORAGE_KEYS.LANGUAGE)) {
      case 'en':
        setLocale(enUS);
        break;
      case 'vi':
        setLocale(vi_VN);
        break;
      default:
        setLocale(vi_VN);
        break;
    }
  }, [router]);

  return (
    <ConfigProvider locale={locale}>
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
        headerTitle={translateExchangeRate('title')}
        scroll={{
          x: 'max-content',
        }}
        sticky={{ offsetHeader: 0 }}
        options={{
          fullScreen: true,
          search: true,
        }}
        toolBarRender={() => [
          <CreateExchangeRate key={'create'} />,
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
