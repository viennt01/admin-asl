import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Tag } from 'antd';
import React, { Key, useRef, useState } from 'react';
import CreateBooking from './create-booking';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ProColumns, ProTable } from '@ant-design/pro-components';

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
  containerCode: string;
  package: string;
  numberOfShipments: string;
  weight: string;
  volume: string;
  placeOfDelivery: string;
  etd: string;
  eta: string;
  nameCustomer: string;
  nameSupplier: string;
  nameCnee: string;
  note: string;
  saleman: string;
  status: string;
  dateCreate: string;
  creator: string;
}

export default function BookingPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateBooking } = useI18n('booking');
  const { translate: translateCommon } = useI18n('common');

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      bookingCode: '10-48973-VNL/V26-A',
      portOfLoading: i % 2 === 0 ? 'Hải Phòng' : 'Hồ Chí Minh',
      portOfDischarge: i % 2 === 0 ? 'Hồ Chí Minh' : 'Long Beach, USA',
      containerCode: 'ASLU4824373',
      package: i % 2 === 0 ? 'Sữa' : 'Gạo',
      numberOfShipments: i % 2 === 0 ? '10' : '4.7',
      weight: i % 2 === 0 ? '2 ton' : '5 ton',
      volume: i % 2 === 0 ? '6000' : '3000',
      placeOfDelivery: 'KCN Vsip 1, Thuận An, Bình Dương',
      etd: i % 2 === 0 ? '14/05/2023' : '16/05/2023',
      eta: i % 2 === 0 ? '14/06/2023' : '16/06/2023',
      nameCustomer: i % 2 === 0 ? 'Vũ Văn Nguyên' : 'Lê Công Tuấn',
      nameSupplier: 'Công ty TNHH Dịch vụ Tiếp Vận Toàn Cầu (ASL)',
      nameCnee: i % 2 === 0 ? 'Linh Hương BG' : 'Lee & Man',
      note: i % 2 === 0 ? 'Hàng dễ vỡ - cẩn thận' : 'Mặt hàng đông lạnh',
      saleman: i % 2 === 0 ? 'Linh Hương BG' : 'Lee & Man',
      status: i % 2 === 1 ? 'Processing' : 'Completed',
      dateCreate: i % 2 === 0 ? '10/05/2023' : '12/05/2023',
      creator: i % 2 === 0 ? 'Trương Văn A' : 'Nguyễn Ngọc B',
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
      width: 100,
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
      dataIndex: 'containerCode',
      key: 'containerCode',
      align: 'center',
      ...getColumnSearchProps('containerCode'),
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
      title: translateBooking('number_of_shipments'),
      width: 180,
      dataIndex: 'numberOfShipments',
      key: 'numberOfShipments',
      align: 'center',
      ...getColumnSearchProps('numberOfShipments'),
    },
    {
      title: translateBooking('weight'),
      width: 180,
      dataIndex: 'weight',
      key: 'weight',
      align: 'center',
      ...getColumnSearchProps('weight'),
    },
    {
      title: translateBooking('volume'),
      width: 180,
      dataIndex: 'volume',
      key: 'volume',
      align: 'center',
      ...getColumnSearchProps('volume'),
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
      title: translateBooking('name_customer'),
      width: 250,
      dataIndex: 'nameCustomer',
      key: 'nameCustomer',
      align: 'center',
      ...getColumnSearchProps('nameCustomer'),
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
      title: translateBooking('name_cnee'),
      width: 250,
      dataIndex: 'nameCnee',
      key: 'nameCnee',
      align: 'center',
      ...getColumnSearchProps('nameCnee'),
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
      title: translateBooking('saleman'),
      width: 200,
      dataIndex: 'saleman',
      key: 'saleman',
      align: 'center',
      ...getColumnSearchProps('saleman'),
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
      title: translateBooking('date_create'),
      width: 150,
      dataIndex: 'dateCreate',
      key: 'dateCreate',
      align: 'center',
      ...getColumnSearchProps('dateCreate'),
    },
    {
      title: translateBooking('creator'),
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
    router.push(ROUTERS.BOOKING_EDIT(id));
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
            {translateCommon('button_delete')}
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
}
