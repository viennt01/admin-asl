import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { Key, useRef, useState } from 'react';
import CreateUser from './create-user';
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

export default function CalculationUserPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateUser } = useI18n('user');
  const { translate: translateCommon } = useI18n('common');
  interface DataType {
    key: number;
    account: string;
    first_name: string;
    last_name: string;
    full_name: string;
    gender: string;
    dob: string;
    phone: string;
    address: string;
    email: string;
    CCCD_Visa: string;
    nationality: string;
    company: string;
    working_branch: string;
    role: string;
    status: string;
    last_login: string;
    update_created: string;
    dateCreated: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      account: 'ThuNCN',
      first_name: 'Thu',
      last_name: 'Nguyễn',
      full_name: 'Nguyễn Cao Ngọc Thu',
      gender: 'Female',
      dob: '05/12/2001',
      phone: '0975169203',
      address: 'Quận 9, TP. Hồ Chí Minh',
      email: 'nganncnse150413@fpt.edu.com',
      CCCD_Visa: '4563436465',
      nationality: 'Việt Nam',
      company: 'ABC',
      working_branch: 'Chi nhánh Lý Thường Kiệt, Quận 10, TP. Hồ Chí Minh',
      role: 'Importer',
      status: i % 2 === 1 ? 'Active' : 'DeActive',
      last_login: '26/07/2023',
      update_created: '05/02/2023',
      dateCreated: '05/02/2023',
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
      title: translateUser('code'),
      width: 100,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },

    {
      title: translateUser('account'),
      dataIndex: 'account',
      key: 'account',
      width: 150,
      align: 'center',
      ...getColumnSearchProps('account'),
    },

    {
      title: translateUser('first_name'),
      width: 150,
      dataIndex: 'first_name',
      key: 'first_name',
      align: 'center',
      ...getColumnSearchProps('first_name'),
    },

    {
      title: translateUser('last_name'),
      width: 150,
      dataIndex: 'last_name',
      key: 'last_name',
      align: 'center',
      ...getColumnSearchProps('last_name'),
    },

    {
      title: translateUser('full_name'),
      width: 250,
      dataIndex: 'full_name',
      key: 'full_name',
      align: 'center',
      ...getColumnSearchProps('full_name'),
    },

    {
      title: translateUser('gender'),
      width: 150,
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      ...getColumnSearchProps('gender'),
    },

    {
      title: translateUser('dob'),
      width: 150,
      dataIndex: 'dob',
      key: 'dob',
      align: 'center',
      ...getColumnSearchProps('dob'),
    },

    {
      title: translateUser('phone'),
      width: 150,
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      ...getColumnSearchProps('phone'),
    },

    {
      title: translateUser('address'),
      width: 350,
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      ...getColumnSearchProps('address'),
    },

    {
      title: translateUser('email'),
      width: 250,
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      ...getColumnSearchProps('email'),
    },

    {
      title: translateUser('CCCD_Visa'),
      width: 250,
      dataIndex: 'CCCD_Visa',
      key: 'CCCD_Visa',
      align: 'center',
      ...getColumnSearchProps('CCCD_Visa'),
    },

    {
      title: translateUser('nationality'),
      width: 200,
      dataIndex: 'nationality',
      key: 'nationality',
      align: 'center',
      ...getColumnSearchProps('nationality'),
    },

    {
      title: translateUser('company'),
      width: 200,
      dataIndex: 'company',
      key: 'company',
      align: 'center',
      ...getColumnSearchProps('company'),
    },

    {
      title: translateUser('working_branch'),
      width: 400,
      dataIndex: 'working_branch',
      key: 'working_branch',
      align: 'center',
      ...getColumnSearchProps('working_branch'),
    },

    {
      title: translateUser('role'),
      width: 200,
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      ...getColumnSearchProps('role'),
    },

    {
      title: translateUser('status'),
      width: 120,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        {
          text: 'Sử dụng',
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
      title: translateUser('last_login'),
      width: 150,
      dataIndex: 'last_login',
      key: 'last_login',
      align: 'center',
      ...getColumnSearchProps('last_login'),
    },

    {
      title: translateUser('update_created'),
      width: 150,
      dataIndex: 'update_created',
      key: 'update_created',
      align: 'center',
      ...getColumnSearchProps('update_created'),
    },

    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateUser('date_created')}
        </div>
      ),
      width: 150,
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
      ...getColumnSearchProps('dateCreated'),
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
    router.push(ROUTERS.USER_EDIT(id));
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
      headerTitle={translateUser('title')}
      scroll={{
        x: 'max-content',
      }}
      sticky={{ offsetHeader: 0 }}
      options={{
        fullScreen: true,
        search: true,
      }}
      toolBarRender={() => [
        <CreateUser key={'create'} />,
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
