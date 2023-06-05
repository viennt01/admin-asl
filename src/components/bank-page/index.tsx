import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import CreateBank from './create-bank';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';

const STATUS_COLORS = {
  Active: '#00A651',
  DeActive: '#ED1C27',
};
const STATUS_LABELS = {
  Active: 'Hoạt động',
  DeActive: 'Ngừng hoạt động',
};

export default function BankPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateBank } = useI18n('bank');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    bankLogo: string;
    bankName: string;
    bankAccountNumber: string;
    bankHotlinePhoneNumber: string;
    bankEmail: string;
    bankAddress: string;
    bankBranch: string;
    bankNote: string;
    status: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      bankLogo: 'https://cdn.pixabay.com.jpg',
      bankName: 'Vietcombank',
      bankAccountNumber: '1234567989',
      bankHotlinePhoneNumber: '1900 545413',
      bankEmail: 'Vietcombank@gamil.com',
      bankAddress: '50A Đặng Văn Bi, Bình Thọ, Thủ Đức, Thành phố Hồ Chí Minh',
      bankBranch: 'Hồ Chí Minh',
      bankNote: 'Ngân Hàng TMCP Ngoại Thương Việt Nam (Vietcombank)',
      status: i % 5 === 1 ? 'DeActive' : 'Active',
    });
  }

  const columns: ColumnsType<DataType> = [
    {
      title: translateBank('bank_no'),
      width: 150,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateBank('bank_name'),
      width: 300,
      dataIndex: 'bankName',
      key: 'bankName',
      fixed: 'left',
      align: 'center',
      filters: [
        {
          text: 'Vietcombank',
          value: 'Vietcombank',
        },
        {
          text: 'BIDV',
          value: 'BIDV',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('bank_account_number'),
      width: 200,
      dataIndex: 'bankAccountNumber',
      key: 'bankAccountNumber',
      align: 'center',
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('bank_hotline_phone_number'),
      width: 250,
      dataIndex: 'bankHotlinePhoneNumber',
      key: 'bankHotlinePhoneNumber',
      align: 'center',
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('bank_email'),
      width: 250,
      dataIndex: 'bankEmail',
      key: 'bankEmail',
      align: 'center',
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('bank_address'),
      width: 500,
      dataIndex: 'bankAddress',
      key: 'bankAddress',
      align: 'center',
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('bank_branch'),
      width: 200,
      dataIndex: 'bankBranch',
      key: 'bankBranch',
      align: 'center',
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('bank_note'),
      width: 550,
      dataIndex: 'bankNote',
      key: 'bankNote',
      align: 'center',
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateBank('status'),
      dataIndex: 'status',
      fixed: 'right',
      key: 'status',
      align: 'center',
      filters: [
        {
          text: 'Hoạt động',
          value: 'Active',
        },
        {
          text: 'Ngừng hoạt động',
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
    router.push(ROUTERS.BANK_EDIT(id));
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
            <CreateBank />
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
        title={translateBank('title')}
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
