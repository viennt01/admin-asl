import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Tag } from 'antd';
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
import style from './index.module.scss';

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
interface DataType {
  key: number;
  bookingCode: string;
  portOfLoading: string;
  portOfDischarge: string;
  container: string;
  nameSupplier: string;
  package: string;
  nameCustomer: string;
  nameCnee: string;
  placeOfDelivery: string;
  note: string;
  etd: string;
  eta: string;
  userCreate: string;
  dateCreate: string;
  status: string;
}

export default function BookingPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [locale, setLocale] = useState(enUS);
  const { translate: translateBooking } = useI18n('booking');
  const { translate: translateCommon } = useI18n('common');

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      bookingCode: '10-48973-VNL/V26-A',
      portOfLoading: i % 2 === 0 ? 'Hải Phòng' : 'Hồ Chí Minh',
      portOfDischarge: i % 2 === 0 ? 'Hồ Chí Minh' : 'Long Beach, USA',
      container: 'GLSU4824373',
      nameSupplier: 'Công ty TNHH Dịch vụ Tiếp Vận Toàn Cầu (GLS)',
      package: i % 2 === 0 ? 'Sữa' : 'Gạo',
      nameCustomer: i % 2 === 0 ? 'Vũ Văn Nguyên' : 'Lê Công Tuấn',
      nameCnee: i % 2 === 0 ? 'Linh Hương BG' : 'Lee & Man',
      placeOfDelivery: 'KCN Vsip 1, Thuận An, Bình Dương',
      note: i % 2 === 0 ? 'Hàng dễ vỡ - cẩn thận' : 'Mặt hàng đông lạnh',
      etd: i % 2 === 0 ? '14/05/2023' : '16/05/2023',
      eta: i % 2 === 0 ? '14/06/2023' : '16/06/2023',
      userCreate: i % 2 === 0 ? 'Trương Văn A' : 'Nguyễn Ngọc B',
      dateCreate: i % 2 === 0 ? '10/05/2023' : '12/05/2023',
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
      title: translateBooking('no_booking'),
      width: 80,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateBooking('code_booking'),
      width: 200,
      fixed: 'left',
      dataIndex: 'bookingCode',
      key: 'bookingCode',
      align: 'center',
      ...getColumnSearchProps('bookingCode'),
    },
    {
      title: translateBooking('port_of_loading'),
      width: 250,
      fixed: 'left',
      dataIndex: 'portOfLoading',
      key: 'portOfLoading',
      align: 'center',
      ...getColumnSearchProps('portOfLoading'),
    },
    {
      title: translateBooking('port_of_discharge'),
      width: 250,
      dataIndex: 'portOfDischarge',
      key: 'portOfDischarge',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
      ...getColumnSearchProps('portOfDischarge'),
    },
    {
      title: translateBooking('container_code'),
      width: 300,
      dataIndex: 'container',
      key: 'container',
      align: 'center',
      ...getColumnSearchProps('container'),
    },
    {
      title: translateBooking('name_supplier'),
      width: 350,
      dataIndex: 'nameSupplier',
      key: 'nameSupplier',
      align: 'center',
      ...getColumnSearchProps('nameSupplier'),
    },
    {
      title: translateBooking('package'),
      width: 250,
      dataIndex: 'package',
      key: 'package',
      align: 'center',
      ...getColumnSearchProps('package'),
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
      title: translateBooking('name_cnee'),
      width: 250,
      dataIndex: 'nameCnee',
      key: 'nameCnee',
      align: 'center',
      ...getColumnSearchProps('nameCnee'),
    },
    {
      title: translateBooking('place_of_delivery'),
      width: 250,
      dataIndex: 'placeOfDelivery',
      key: 'placeOfDelivery',
      align: 'center',
      ...getColumnSearchProps('placeOfDelivery'),
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
      title: translateBooking('etd'),
      width: 150,
      dataIndex: 'etd',
      key: 'etd',
      align: 'center',
      ...getColumnSearchProps('etd'),
    },
    {
      title: translateBooking('eta'),
      width: 150,
      dataIndex: 'eta',
      key: 'eta',
      align: 'center',
      ...getColumnSearchProps('eta'),
    },
    {
      title: translateBooking('user_create'),
      width: 250,
      dataIndex: 'userCreate',
      key: 'userCreate',
      align: 'center',
      ...getColumnSearchProps('userCreate'),
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
      width: 150,
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
        headerTitle={translateBooking('title')}
        scroll={{
          x: 'max-content',
        }}
        sticky={{ offsetHeader: 0 }}
        options={{
          fullScreen: true,
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
  );
}
