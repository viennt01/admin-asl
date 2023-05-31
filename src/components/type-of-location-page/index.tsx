import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import CreateLocationType from './create-type-of-location';
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

export default function LocationTypePage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateTypeOfLocation } = useI18n('typeOfLocation');

  interface DataType {
    key: number;
    age: number;
    name: string;
    address: string;
    addressType: string;
    phoneNumner: string;
    totalContainer: number;
    capacity: number;
    capacityState: string;
    companyName: string;
    email: string;
    status: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      age: 32,
      name: `Vũng Tàu ${i}`,
      address: 'Vũng Tàu',
      addressType: 'Nhận hàng',
      phoneNumner: '0964582355',
      totalContainer: 100,
      capacity: 3,
      capacityState: i % 2 === 0 ? 'Full' : 'NotFull',
      companyName: 'Công ty cổ phần Cảng Vũng Tàu',
      email: 'abcd@gmail.com',
      status: i % 2 === 1 ? 'Active' : 'DeActive',
    });
  }

  const columns: ColumnsType<DataType> = [
    {
      title: translateTypeOfLocation('code'),
      width: 150,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateTypeOfLocation('type_of_address'),
      width: 150,
      dataIndex: 'addressType',
      key: 'addressType',
      align: 'center',
    },
    {
      title: translateTypeOfLocation('status'),
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
    router.push(ROUTERS.TYPE_OF_LOCATION_EDIT(id));
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
            <CreateLocationType />
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Col>
        </Row>
      </Card>
      <Card
        style={{ marginTop: '24px' }}
        bordered={false}
        title={translateTypeOfLocation('title')}
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
