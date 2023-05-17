import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';

const STATUS_COLORS = {
  Active: '#31AFFE',
  DeActive: '#616887',
};
const STATUS_LABELS = {
  Active: 'Hoạt động',
  DeActive: 'Tạm ngừng',
};

const STATUS_CAPACITY_COLORS = {
  Full: '#31AFFE',
  NotFull: '#616887',
};
const STATUS_CAPACITY_LABELS = {
  Full: 'Đầy',
  NotFull: 'Nửa đầy',
};

export default function DepotPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  interface DataType {
    key: number;
    age: number;
    name: string;
    address: string;
    totalContainer: number;
    capacity: number;
    capacityState: string;
    companyName: string;
    status: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      age: 32,
      name: `Vũng Tàu ${i}`,
      address: 'Vũng Tàu',
      totalContainer: 100,
      capacity: 3,
      capacityState: i % 2 === 0 ? 'Full' : 'NotFull',
      companyName: 'Công ty cổ phần Cảng Vũng Tàu',
      status: i % 2 === 1 ? 'Active' : 'DeActive',
    });
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên Cảng',
      width: 150,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      align: 'center',
      filters: [
        {
          text: 'Vũng Tàu 1',
          value: 'Vũng Tàu 1',
        },
        {
          text: 'Vũng Tàu 2',
          value: 'Vũng Tàu 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: 'Mã số',
      width: 100,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address', align: 'center' },
    {
      title: 'Số lượng container',
      dataIndex: 'totalContainer',
      key: 'totalContainer',
      align: 'center',
      sorter: (a, b) => a.totalContainer - b.totalContainer,
    },
    {
      title: 'Sức chứa (TEUS)',
      dataIndex: 'capacity',
      key: 'capacity',
      align: 'center',
      sorter: (a, b) => a.capacity - b.capacity,
    },
    {
      title: 'Trạng thái sức chứa',
      dataIndex: 'capacityState',
      key: 'capacityState',
      align: 'center',
      render: (value) => (
        <Tag
          color={
            STATUS_CAPACITY_COLORS[value as keyof typeof STATUS_CAPACITY_COLORS]
          }
          style={{
            margin: 0,
          }}
        >
          {STATUS_CAPACITY_LABELS[value as keyof typeof STATUS_CAPACITY_LABELS]}
        </Tag>
      ),
    },
    {
      title: 'Công ty quản lý',
      dataIndex: 'companyName',
      key: 'companyName',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        {
          text: 'Hoạt động',
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
      key: 'operation',
      fixed: 'right',
      width: 50,
      align: 'center',
      render: () => <EditOutlined />,
    },
  ];

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  return (
    <>
      {/* <Card style={{ marginBottom: '15px', width: '100%' }}>
        <Breadcrumb>
          <Breadcrumb.Item>DEPOT</Breadcrumb.Item>
        </Breadcrumb>
      </Card> */}
      <Card bordered={false} style={{ margin: '16px 0' }}>
        <Row>
          <Col flex={1}>
            <Form name="search_form">
              <Space wrap>
                <Form.Item style={{ margin: 0 }} name="keyword">
                  <Input
                    placeholder="Keyword"
                    allowClear
                    style={{ minWidth: 140 }}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ width: 'fit-content', padding: '0 32px' }}
                ></Button>
              </Space>
            </Form>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ marginRight: '4px' }}
            >
              Thêm cảng
            </Button>
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Xoá cảng
            </Button>
          </Col>
        </Row>
      </Card>
      <Card
        style={{ marginTop: '24px' }}
        bordered={false}
        title={'Danh sách cảng'}
      >
        <Table
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedRowKeys,
            onChange: handleSelectionChange,
          }}
          columns={columns}
          dataSource={data}
          scroll={{ x: 'max-content' }}
          pagination={{ position: ['bottomCenter'] }}
        />
      </Card>
    </>
  );
}
