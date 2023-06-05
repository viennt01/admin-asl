import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, ConfigProvider, Tag } from 'antd';
import React, { Key, useEffect, useRef, useState } from 'react';
import CreateBooking from './create-booking';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import enUS from 'antd/lib/locale/en_US';
import vi_VN from 'antd/lib/locale/vi_VN';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';

import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Space } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

const STATUS_COLORS = {
  SaveAsDraft: '#837F7F',
  Pending: '#EDEA9A',
  Approved: '#C7EDBA',
  Processing: '#31AFFE',
  Delayed: '#E1A966',
  Completed: '#00A651',
  Cancel: '#616887',
};
const STATUS_LABELS = {
  SaveAsDraft: 'Save As Draft',
  Pending: 'Pending',
  Approved: 'Approved',
  Processing: 'Processing',
  Delayed: 'Delayed',
  Completed: 'Completed',
  Cancel: 'Cancel',
};

export default function BookingPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [locale, setLocale] = useState(enUS);
  const { translate: translateBooking } = useI18n('booking');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    route: string;
    codeContainer: number;
    address: string;
    portName: string;
    slot: number;
    note: string;
    nameCustomer: string;
    nameSupplier: string;
    nameCnee: string;
    dateCreate: string;
    status: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      address: i % 2 === 0 ? 'Vũng Tàu' : 'Hồ Chí Minh',
      codeContainer: i,
      portName: i % 2 === 0 ? 'Vũng Tàu' : 'Hồ Chí Minh',
      slot: i + 1,
      route: 'Hồ Chí Minh - Hải Phòng',
      note: i % 2 === 0 ? 'Hàng dễ vỡ - cẩn thận' : 'Mặt hàng đông lạnh',
      nameCustomer: i % 2 === 0 ? 'Nguyễn Văn A' : 'Trần Thị B',
      nameSupplier: i % 2 === 0 ? 'Công ty CP A' : 'Công ty CP B',
      nameCnee: i % 2 === 0 ? 'Trương Văn A' : 'Nguyễn Ngọc B',
      dateCreate: '10/05/2023',
      status: i % 2 === 1 ? 'Processing' : 'Completed',
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
      title: translateBooking('code_booking'),
      width: 150,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateBooking('route'),
      width: 300,
      fixed: 'left',
      dataIndex: 'route',
      key: 'route',
      align: 'center',
      ...getColumnSearchProps('route'),
    },
    {
      title: translateBooking('container_code'),
      width: 150,
      dataIndex: 'codeContainer',
      key: 'codeContainer',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
      ...getColumnSearchProps('codeContainer'),
    },
    {
      title: translateBooking('address'),
      width: 300,
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      ...getColumnSearchProps('address'),
    },
    {
      title: translateBooking('port_name'),
      width: 250,
      dataIndex: 'portName',
      key: 'portName',
      align: 'center',
      ...getColumnSearchProps('portName'),
    },
    {
      title: translateBooking('slot'),
      dataIndex: 'slot',
      key: 'slot',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
      ...getColumnSearchProps('slot'),
    },
    {
      title: translateBooking('note'),
      width: 350,
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      ...getColumnSearchProps('note'),
    },
    {
      title: translateBooking('name_customer'),
      width: 250,
      dataIndex: 'nameCustomer',
      key: 'nameCustomer',
      align: 'center',
      ...getColumnSearchProps('nameCustomer'),
    },
    {
      title: translateBooking('name_supplier'),
      width: 250,
      dataIndex: 'nameSupplier',
      key: 'nameSupplier',
      align: 'center',
      ...getColumnSearchProps('nameSupplier'),
    },
    {
      title: translateBooking('name_cnee'),
      width: 250,
      dataIndex: 'nameCnee',
      key: 'nameCnee',
      align: 'center',
      ...getColumnSearchProps('nameCnee'),
    },
    {
      title: translateBooking('date_create'),
      width: 150,
      dataIndex: 'dateCreate',
      key: 'dateCreate',
      align: 'center',
      ...getColumnSearchProps('dateCreate'),
    },
    {
      title: translateBooking('status'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        {
          text: 'Save As Draft',
          value: 'SaveAsDraft',
        },
        {
          text: 'Pending',
          value: 'Pending',
        },
        {
          text: 'Approved',
          value: 'Approved',
        },
        {
          text: 'Delayed',
          value: 'Delayed',
        },
        {
          text: 'Pending',
          value: 'Pending',
        },
        {
          text: 'Completed',
          value: 'Completed',
        },
        {
          text: 'Cancel',
          value: 'Cancel',
        },
      ],
      // onFilter: (value: string, record) => record.address.startsWith(value),
      filterSearch: true,
      ...getColumnSearchProps('status'),

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
    router.push(ROUTERS.BOOKING_EDIT(id));
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
    <Card bordered={false} style={{ margin: '24px 0' }}>
      <ConfigProvider locale={locale}>
        <ProTable<DataType>
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
          headerTitle={translateBooking('title')}
          scroll={{ x: 'max-content' }}
          options={{
            search: true,
          }}
          toolBarRender={() => [
            <CreateBooking key={'create'} />,
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
              {translateCommon('delete')}
            </Button>,
          ]}
        />
      </ConfigProvider>
    </Card>
  );
}
