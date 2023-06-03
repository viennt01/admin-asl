import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import CreateBooking from './create-booking';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';

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
  const { translate: translateBooking } = useI18n('booking');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    address: string;
    codeContainer: number;
    portName: string;
    slot: number;
    route: string;
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

  const columns: ColumnsType<DataType> = [
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
    },
    {
      title: translateBooking('container_code'),
      width: 150,
      dataIndex: 'codeContainer',
      key: 'codeContainer',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateBooking('address'),
      width: 300,
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: translateBooking('port_name'),
      width: 250,
      dataIndex: 'portName',
      key: 'portName',
      align: 'center',
    },
    {
      title: translateBooking('slot'),
      dataIndex: 'slot',
      key: 'slot',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateBooking('note'),
      width: 350,
      dataIndex: 'note',
      key: 'note',
      align: 'center',
    },
    {
      title: translateBooking('name_customer'),
      width: 250,
      dataIndex: 'nameCustomer',
      key: 'nameCustomer',
      align: 'center',
    },
    {
      title: translateBooking('name_supplier'),
      width: 250,
      dataIndex: 'nameSupplier',
      key: 'nameSupplier',
      align: 'center',
    },
    {
      title: translateBooking('name_cnee'),
      width: 250,
      dataIndex: 'nameCnee',
      key: 'nameCnee',
      align: 'center',
    },
    {
      title: translateBooking('date_create'),
      width: 150,
      dataIndex: 'dateCreate',
      key: 'dateCreate',
      align: 'center',
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
          onClick={() => handleEditCustomer(value)}
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
    <>
      <Card bordered={false} style={{ margin: '10px 0' }}>
        <Row>
          <Col flex={1}>
            <Form name="search_form">
              <Space wrap>
                <Form.Item style={{ margin: 0 }} name="keyword">
                  <Input
                    placeholder="Please input to search...."
                    allowClear
                    style={{ minWidth: 140 }}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{
                    width: 'fit-content',
                    padding: '0 32px',
                    backgroundColor: COLORS.BLUE,
                    borderColor: COLORS.BLACK,
                  }}
                />
              </Space>
            </Form>
          </Col>
          <Col>
            <CreateBooking />
            <Button
              icon={<DeleteOutlined />}
              style={{
                backgroundColor: COLORS.RED,
                color: COLORS.WHITE,
                borderColor: COLORS.RED,
                fontWeight: '500',
              }}
            >
              {translateCommon('button_delete')}
            </Button>
          </Col>
        </Row>
      </Card>
      <Card
        style={{ marginTop: '15px' }}
        bordered={false}
        title={translateBooking('title')}
      >
        <Table
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedRowKeys,
            onChange: handleSelectionChange,
          }}
          size="small"
          columns={columns}
          dataSource={data}
          scroll={{ x: 'max-content' }}
          pagination={{ position: ['bottomCenter'] }}
        />
      </Card>
    </>
  );
}
