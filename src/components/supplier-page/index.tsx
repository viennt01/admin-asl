import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import CreateSupplier from './create-supplier';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';

const STATUS_COLORS = {
  Active: '#00A651',
  DeActive: '#ED1C27',
};
const STATUS_LABELS = {
  Active: 'Active',
  DeActive: 'Tạm ngừng',
};

export default function SupplierPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateSupplier } = useI18n('supplier');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    age: number;
    name: string;
    service: string;
    number: number;
    money: string;
    status: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      age: 32,
      name: `Đông Á`,
      service: 'Đóng hàng',
      number: 100,
      money: `560.000.000`,
      status: i % 2 === 1 ? 'Active' : 'DeActive',
    });
  }

  const columns: ColumnsType<DataType> = [
    {
      title: translateSupplier('code'),
      width: 200,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateSupplier('name'),
      width: 250,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      align: 'center',
      filters: [
        {
          text: 'Vận chuyển',
          value: 'Vận chuyển',
        },
        {
          text: 'Đóng hàng',
          value: 'Đóng hàng',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateSupplier('service'),
      width: 300,
      dataIndex: 'service',
      key: 'service',
      align: 'center',
    },
    {
      title: translateSupplier('number'),
      width: 200,
      dataIndex: 'number',
      key: 'number',
      align: 'center',
    },
    {
      title: translateSupplier('money'),
      width: 250,
      dataIndex: 'money',
      key: 'money',
      align: 'center',
    },
    {
      title: translateSupplier('status'),
      dataIndex: 'status',
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
    router.push(ROUTERS.SUPPLIER_EDIT(id));
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
            <CreateSupplier />
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
        title={translateSupplier('title')}
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
