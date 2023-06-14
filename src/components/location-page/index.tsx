import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Input, InputRef, Space, Tag } from 'antd';
import { Key, useEffect, useRef, useState } from 'react';
import CreateLocation from './create-location';
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
  Active: '#00A651',
  DeActive: '#ED1C27',
};

const STATUS_LABELS = {
  Active: 'Active',
  DeActive: 'Tạm ngừng',
};

export default function LocationPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateLocation } = useI18n('location');
  const { translate: translateCommon } = useI18n('common');
  const [locale, setLocale] = useState(enUS);

  interface DataType {
    key: number;
    locationCode: string;
    name: string;
    address: string;
    addressType: string;
    phoneNumner: string;
    email: string;
    status: string;
    dateCreated: string;
    creator: string;
  }

  const data: DataType[] = [];

  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      locationCode: i % 2 === 0 ? 'DD0119524' : 'DD0119521',
      name: i % 2 === 0 ? 'Vinafco Depot' : 'Phú Thọ',
      address:
        i % 2 === 0
          ? '	Vinafco Depot'
          : 'Thôn Thọ Bình,Xã Tân Dân,Huyện Khoái Châu, Tỉnh Hưng Yên + Xã Vạn Xuân, Huyện Tam Nông, Tỉnh Phú Thọ',
      addressType: i % 2 === 0 ? 'Nhận hàng' : 'Trả hàng',
      phoneNumner: i % 2 === 0 ? '0964582355' : '0942558459',
      email: i % 2 === 0 ? 'vinafcodepot@gmail.com' : 'phutho@gmail.com',
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
      title: translateLocation('location_no'),
      width: 100,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateLocation('code'),
      width: 150,
      dataIndex: 'locationCode',
      key: 'locationCode',
      align: 'center',
      fixed: 'left',
      ...getColumnSearchProps('locationCode'),
    },
    {
      title: translateLocation('name'),
      width: 200,
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      align: 'center',
      filters: [
        {
          text: 'Vinafco Depot',
          value: 'Vinafco Depot',
        },
        {
          text: 'Phú Thọ',
          value: 'Phú Thọ',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateLocation('email'),
      width: 250,
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      ...getColumnSearchProps('email'),
    },
    {
      title: translateLocation('address'),
      width: 380,
      dataIndex: 'address',
      ...getColumnSearchProps('address'),
      key: 'address',
      align: 'center',
    },
    {
      title: translateLocation('type_of_location'),
      width: 160,
      dataIndex: 'addressType',
      key: 'addressType',
      align: 'center',
      filters: [
        {
          text: 'Nhận hàng',
          value: 'Nhận hàng',
        },
        {
          text: 'Trả Hàng',
          value: 'Trả Hàng',
        },
      ],
    },
    {
      title: translateLocation('phone'),
      width: 200,
      dataIndex: 'phoneNumner',
      key: 'phoneNumner',
      align: 'center',
      ...getColumnSearchProps('phoneNumner'),
    },
    {
      title: translateLocation('status'),
      dataIndex: 'status',
      width: 120,
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
      title: translateLocation('date_created'),
      width: 100,
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
    },
    {
      title: translateLocation('creator'),
      width: 150,
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
    router.push(ROUTERS.LOCATION_EDIT(id));
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
        headerTitle={translateLocation('title')}
        scroll={{
          x: 'max-content',
        }}
        sticky={{ offsetHeader: 0 }}
        options={{
          fullScreen: true,
          search: true,
        }}
        toolBarRender={() => [
          <CreateLocation key={'create'} />,
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
