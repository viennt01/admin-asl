import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { Key, useRef, useState } from 'react';
import CreateStaff from './create-staff';
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
  DeActive: 'DeActive',
};

export default function StaffPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateStaff } = useI18n('staff');
  const { translate: translateCommon } = useI18n('common');
  interface DataType {
    key: number;
    staffNo: string;
    number: number;
    image: string;
    code: string;
    account: string;
    full_name: string;
    gender: string;
    dob: string;
    phone: string;
    address: string;
    email: string;
    CCCD_Visa: string;
    nationality: string;
    working_branch: string;
    position: string;
    department: string;
    manager: string;
    status: string;
    dateCreated: string;
    creator: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      staffNo: 'ASL122',
      number: 150,
      image: `https://cdn.pixabay.com.jpg`,
      code: `DA123456`,
      account: `ANV30`,
      full_name: 'Nguyễn Văn A',
      gender: 'Nữ',
      dob: `25/5/1986`,
      address: 'Hồ Chí Minh',
      phone: '0964582355',
      email: 'abcd@gmail.com',
      CCCD_Visa: '12345',
      nationality: 'Việt Nam',
      working_branch: 'Hồ Chí Minh',
      position: 'Sale',
      department: 'D03',
      manager: 'Nguyễn Thị Y',
      status: i % 6 === 0 ? 'DeActive' : 'Active',
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
      title: translateStaff('code'),
      width: 150,
      dataIndex: 'staffNo',
      key: 'staffNo',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('staffNo'),
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateStaff('image')}
        </div>
      ),
      width: 200,
      dataIndex: 'image',
      key: 'image',
      fixed: 'left',
      align: 'center',
    },
    {
      title: translateStaff('account'),
      width: 200,
      dataIndex: 'account',
      fixed: 'left',
      key: 'account',
      align: 'center',
      ...getColumnSearchProps('account'),
    },
    {
      title: translateStaff('full_name'),
      width: 250,
      dataIndex: 'full_name',
      key: 'full_name',
      align: 'center',
      ...getColumnSearchProps('full_name'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateStaff('gender'),
      width: 100,
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      filters: [
        {
          text: 'Nữ',
          value: 'Nữ',
        },
        {
          text: 'Nam',
          value: 'Nam',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateStaff('dob'),
      width: 150,
      dataIndex: 'dob',
      key: 'dob',
      align: 'center',
      ...getColumnSearchProps('dob'),
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateStaff('phone')}
        </div>
      ),
      width: 150,
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: translateStaff('address'),
      width: 500,
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      ...getColumnSearchProps('address'),
    },
    {
      title: translateStaff('email'),
      width: 200,
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      ...getColumnSearchProps('email'),
    },
    {
      title: translateStaff('CCCD_Visa'),
      width: 250,
      dataIndex: 'CCCD_Visa',
      key: 'CCCD_Visa',
      align: 'center',
      ...getColumnSearchProps('CCCD_Visa'),
    },
    {
      title: translateStaff('nationality'),
      width: 180,
      dataIndex: 'nationality',
      key: 'nationality',
      align: 'center',
      ...getColumnSearchProps('nationality'),
    },
    {
      title: translateStaff('working_branch'),
      width: 200,
      dataIndex: 'working_branch',
      key: 'working_branch',
      align: 'center',
      ...getColumnSearchProps('working_branch'),
    },
    {
      title: translateStaff('department'),
      width: 150,
      dataIndex: 'department',
      key: 'department',
      align: 'center',
      ...getColumnSearchProps('department'),
    },
    {
      title: translateStaff('manager'),
      width: 150,
      dataIndex: 'manager',
      key: 'manager',
      align: 'center',
      ...getColumnSearchProps('manager'),
    },
    {
      title: translateStaff('position'),
      width: 150,
      dataIndex: 'position',
      key: 'position',
      align: 'center',
      ...getColumnSearchProps('position'),
    },
    {
      title: translateStaff('status'),
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
          text: 'DeActive',
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
          {translateStaff('date_created')}
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
          {translateStaff('creator')}
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
          onClick={() => handleEditStaff(value as string)}
          icon={<EditOutlined />}
        ></Button>
      ),
    },
  ];

  const handleEditStaff = (id: string) => {
    router.push(ROUTERS.STAFF_EDIT(id));
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
      headerTitle={translateStaff('title')}
      scroll={{
        x: 'max-content',
      }}
      sticky={{ offsetHeader: 0 }}
      options={{
        fullScreen: true,
        search: true,
      }}
      toolBarRender={() => [
        <CreateStaff key={'create'} />,
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
