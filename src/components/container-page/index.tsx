import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import CreateContainer from './create-container';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';

const STATUS_COLORS = {
  Active: '#31AFFE',
  DeActive: '#616887',
};
const STATUS_LABELS = {
  Active: 'Hoạt động',
  DeActive: 'Tạm ngừng',
};

// const STATUS_CAPACITY_COLORS = {
//   Full: '#31AFFE',
//   NotFull: '#616887',
// };
// const STATUS_CAPACITY_LABELS = {
//   Full: 'Đầy',
//   NotFull: 'Nửa đầy',
// };

export default function ContainerPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateTypeOfContainer } = useI18n('typeOfContainer');

  interface DataType {
    key: number;
    age: number;
    name: string;
    address: string;
    totalContainer: number;
    capacity: number;
    capacityState: string;
    size: number;
    containerStatus: string;
    rentCost: number;
    price: number;
    companyName: string;
    status: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      age: 32,
      name: i % 2 === 0 ? 'Thường' : 'Hở mái',
      address: 'Vũng Tàu',
      totalContainer: 100,
      capacity: 3,
      capacityState: i % 2 === 0 ? 'Full' : 'NotFull',
      size: i % 2 === 0 ? 40 : 20,
      containerStatus: i % 2 === 0 ? 'Đang cho thuê' : 'Yêu cầu vệ sinh',
      rentCost: 100000,
      price: 100000000,
      companyName: 'Công ty cổ phần Cảng Vũng Tàu',
      status: i % 2 === 1 ? 'Active' : 'DeActive',
    });
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã số',
      width: 100,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: 'Loại Container',
      width: 150,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      align: 'center',
      filters: [
        {
          text: 'Thường',
          value: 'Thường',
        },
        {
          text: 'Hở mái',
          value: 'Hở mái',
        },
        {
          text: 'Lạnh',
          value: 'Lạnh',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: 'Kích thước (feet)',
      dataIndex: 'size',
      key: 'size',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: 'Vị trí',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: 'Tình trạng',
      width: 300,
      dataIndex: 'containerStatus',
      key: 'containerStatus',
      align: 'center',
    },
    {
      title: 'Giá thuê (ngày/VND)',
      dataIndex: 'rentCost',
      key: 'rentCost',
      align: 'center',
    },
    {
      title: 'Giá bán (ngày/VND)',
      dataIndex: 'price',
      key: 'price',
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
    router.push(ROUTERS.TYPES_OF_CONTAINER_EDIT(id));
  };

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <>
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
            <CreateContainer />
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Col>
        </Row>
      </Card>
      <Card
        style={{ marginTop: '24px' }}
        bordered={false}
        title={translateTypeOfContainer('title')}
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
