import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Input, InputRef, Space, Tag } from 'antd';
import { Key, useRef, useState } from 'react';
import CreateBank from './create-bank';
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
  Active: 'Hoạt động',
  DeActive: 'Ngừng hoạt động',
};

export default function BankPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateBank } = useI18n('bank');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    bankCode: string;
    bankLogo: string;
    bankName: string;
    VNDAccountNumber: string;
    USDAccountNumber: string;
    phone: string;
    bankEmail: string;
    bankAddress: string;
    bankBranch: string;
    bankNote: string;
    status: string;
    dateCreated: string;
    creator: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      bankCode: i % 2 === 0 ? 'BFTVVNVX' : 'MSCBVNVX',
      bankLogo:
        i % 2 === 0
          ? 'https://9746c6837f.vws.vegacdn.vn/posts/files/thong-tin-ve-ngan-hang-vietcombank.jpg'
          : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Logo_MB_new.png/1200px-Logo_MB_new.png',
      bankName: i % 2 === 0 ? 'Vietcombank' : 'MBBank',
      VNDAccountNumber: i % 2 === 0 ? '1234567989' : '9897654321',
      USDAccountNumber: i % 2 === 0 ? '1234567989' : '9897654321',
      phone: i % 2 === 0 ? '1900545413' : '1900 54 54 26',
      bankEmail: i % 2 === 0 ? 'vietcombank@gamil.com' : 'mbbank@gmail.com',
      bankAddress:
        i % 2 === 0
          ? '69 Bùi Thị Xuân, phường Phạm Ngũ Lão, Quận 1, thành phố Hồ Chí Minh'
          : '172 Hai Bà Trưng, phường Đa Kao, Quận 1, thành phố Hồ Chí Minh',
      bankBranch: 'Hồ Chí Minh',
      bankNote:
        i % 2 === 0
          ? 'Ngân Hàng TMCP Ngoại Thương Việt Nam (Vietcombank)'
          : 'Ngân hàng Quân đội (MBbank)',
      status: i % 5 === 1 ? 'DeActive' : 'Active',
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
      title: translateBank('bank_no'),
      width: 100,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateBank('bank_code'),
      width: 180,
      dataIndex: 'bankCode',
      key: 'bankCode',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('bankCode'),
    },
    {
      title: translateBank('bank_name'),
      width: 200,
      dataIndex: 'bankName',
      key: 'bankName',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('bankName'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('VND_account_number'),
      width: 200,
      dataIndex: 'VNDAccountNumber',
      key: 'VNDAccountNumber',
      align: 'center',
      ...getColumnSearchProps('VNDAccountNumber'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('USD_account_number'),
      width: 200,
      dataIndex: 'USDAccountNumber',
      key: 'USDAccountNumber',
      align: 'center',
      ...getColumnSearchProps('USDAccountNumber'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('phone'),
      width: 200,
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      ...getColumnSearchProps('phone'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('bank_email'),
      width: 250,
      dataIndex: 'bankEmail',
      key: 'bankEmail',
      align: 'center',
      ...getColumnSearchProps('bankEmail'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('bank_address'),
      width: 500,
      dataIndex: 'bankAddress',
      key: 'bankAddress',
      align: 'center',
      ...getColumnSearchProps('bankAddress'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('bank_branch'),
      width: 200,
      dataIndex: 'bankBranch',
      key: 'bankBranch',
      align: 'center',
      ...getColumnSearchProps('bankBranch'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('bank_note'),
      width: 550,
      dataIndex: 'bankNote',
      key: 'bankNote',
      align: 'center',
      ...getColumnSearchProps('bankNote'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('status'),
      width: 120,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        {
          text: 'Hoạt động',
          value: 'Active',
        },
        {
          text: 'Ngừng hoạt động',
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
          {translateBank('date_created')}
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
          {translateBank('creator')}
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
    router.push(ROUTERS.BANK_EDIT(id));
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
        headerTitle={translateBank('title')}
        scroll={{
          x: 'max-content',
        }}
        sticky={{ offsetHeader: 0 }}
        options={{
          fullScreen: true,
          search: true,
        }}
        toolBarRender={() => [
          <CreateBank key={'create'} />,
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
