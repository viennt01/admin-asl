import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import CreateStaff from './create-staff';
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
  DeActive: 'DeActive',
};

export default function StaffPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateStaff } = useI18n('staff');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    number: number;
    image: string;
    code: string;
    account: string;
    full_name: string;
    sex: string;
    dob: string;
    phone: string;
    address: string;
    email: string;
    CCCD_Visa: string;
    working_branch: string;
    position: string;
    status: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      number: 150,
      image: `https://cdn.pixabay.com.jpg`,
      code: `DA123456`,
      account: `ANV30`,
      full_name: 'Nguyễn Văn A',
      sex: 'Nữ',
      dob: `25/5/1986`,
      address: 'Hồ Chí Minh',
      phone: '0964582355',
      email: 'abcd@gmail.com',
      CCCD_Visa: '12345',
      working_branch: 'Hồ Chí Minh',
      position: 'Sale',
      status: i % 6 === 0 ? 'DeActive' : 'Active',
    });
  }

  const columns: ColumnsType<DataType> = [
    {
      title: translateStaff('code'),
      width: 150,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateStaff('image'),
      width: 200,
      dataIndex: 'image',
      key: 'image',
      fixed: 'left',
      align: 'center',
    },
    {
      title: translateStaff('account'),
      width: 200,
      dataIndex: 'account',
      fixed: 'left',
      key: 'account',
      align: 'center',
    },
    {
      title: translateStaff('full_name'),
      width: 250,
      dataIndex: 'full_name',
      key: 'full_name',
      align: 'center',
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateStaff('sex'),
      width: 250,
      dataIndex: 'sex',
      key: 'sex',
      align: 'center',
      filters: [
        {
          text: 'Nữ',
          value: 'Nữ',
        },
        {
          text: 'Nam',
          value: 'Nam',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateStaff('dob'),
      width: 300,
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: translateStaff('phone'),
      width: 150,
      dataIndex: 'phoneNumner',
      key: 'phoneNumner',
      align: 'center',
    },
    {
      title: translateStaff('address'),
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
      title: translateStaff('CCCD_Visa'),
      width: 200,
      dataIndex: 'CCCD_Visa',
      key: 'CCCD_Visa',
      align: 'center',
    },
    {
      title: translateStaff('working_branch'),
      width: 200,
      dataIndex: 'working_branch',
      key: 'working_branch',
      align: 'center',
    },
    {
      title: translateStaff('position'),
      width: 200,
      dataIndex: 'position',
      key: 'position',
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
          text: 'DeActive',
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
          onClick={() => handleEditStaff(value)}
          icon={<EditOutlined />}
        ></Button>
      ),
    },
  ];

  const handleEditStaff = (id: string) => {
    router.push(ROUTERS.STAFF_EDIT(id));
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
            <CreateStaff />
            <Button
              icon={<DeleteOutlined />}
              style={{
                backgroundColor: COLORS.RED,
                color: COLORS.WHITE,
                borderColor: COLORS.RED,
                fontWeight: '500',
              }}
            >
              {translateCommon('delete')}
            </Button>
          </Col>
        </Row>
      </Card>
      <Card
        style={{ marginTop: '15px' }}
        bordered={false}
        title={translateStaff('title')}
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
