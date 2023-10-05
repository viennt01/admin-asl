import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import CreatePermission from './create-permission';
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

export default function PermissionPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePermission } = useI18n('permission');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    number: number;
    name: string;
    dob: string;
    address: string;
    phoneNumner: string;
    email: string;
    status: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      number: 150,
      name: `Nguyễn Văn A`,
      dob: `25/5/1986`,
      address: 'Hồ Chí Minh',
      phoneNumner: '0964582355',
      email: 'abcd@gmail.com',
      status: i % 2 === 1 ? 'Active' : 'DeActive',
    });
  }

  const columns: ColumnsType<DataType> = [
    {
      title: translatePermission('code'),
      width: 150,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translatePermission('name'),
      width: 250,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      align: 'center',
      filters: [
        {
          text: 'Đông Á',
          value: 'Đông Á',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translatePermission('number'),
      width: 200,
      dataIndex: 'number',
      key: 'number',
      align: 'center',
    },
    {
      title: translatePermission('dob'),
      width: 300,
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: translatePermission('phone'),
      width: 150,
      dataIndex: 'phoneNumner',
      key: 'phoneNumner',
      align: 'center',
    },
    {
      title: translatePermission('address'),
      width: 300,
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: 'Email',
      width: 200,
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Trạng thái',
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
          onClick={() => handleEditPermission(value)}
          icon={<EditOutlined />}
        ></Button>
      ),
    },
  ];

  const handleEditPermission = (id: string) => {
    router.push(ROUTERS.PERMISSION_EDIT(id));
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
            <CreatePermission />
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
        title={translatePermission('title')}
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
