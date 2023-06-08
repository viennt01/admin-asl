import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import CreateDebtor from './create-debtor';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';

export default function DebtorPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateDebtor } = useI18n('debtor');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    theOccurrence: string;
    debtorCode: string;
    debtorName: string;
    debtorTaxCode: string;
    debtorAddress: string;
    debtorPhone: string;
    debtorEmail: string;
    contact: string;
    position: string;
    classification: string;
    accountNumber: string;
    bankName: string;
    provinceOrCity: string;
    part: string;
    branch: string;
    customerName: string;
    note: string;
    creator: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      theOccurrence: '2023',
      debtorCode: 'AD12345',
      debtorName: 'Công ty CP ABC',
      debtorTaxCode: '123456789',
      debtorAddress: '249 Lê Văn Sĩ, Phường 4, Quận 10, Thành phố Hồ Chí Minh',
      debtorPhone: '0951231548',
      debtorEmail: 'abc@gmail.com.vn',
      contact: 'Nguyễn Thị A',
      position: 'Kế Toán',
      classification: '',
      accountNumber: '123456789123',
      bankName: 'Vietcombank',
      provinceOrCity: 'Hồ Chí Minh',
      part: 'Marketing',
      branch: 'Thành phố Hồ Chí Minh',
      customerName: 'Hóa Chất Việt Trì',
      note: 'test',
      creator: 'Nguyễn Văn C',
    });
  }

  const columns: ColumnsType<DataType> = [
    {
      title: translateDebtor('the_occurrence'),
      width: 150,
      dataIndex: 'theOccurrence',
      key: 'theOccurrence',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateDebtor('debtor_code'),
      width: 150,
      dataIndex: 'debtorCode',
      key: 'debtorCode',
      fixed: 'left',
      align: 'center',
    },
    {
      title: translateDebtor('debtor_name'),
      width: 250,
      dataIndex: 'debtorName',
      key: 'debtorName',
      fixed: 'left',
      align: 'center',
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateDebtor('debtor_tax_code'),
      width: 200,
      dataIndex: 'debtorTaxCode',
      key: 'debtorTaxCode',
      align: 'center',
    },
    {
      title: translateDebtor('debtor_address'),
      width: 300,
      dataIndex: 'debtorAddress',
      key: 'debtorAddress',
      align: 'center',
    },
    {
      title: translateDebtor('debtor_phone'),
      width: 150,
      dataIndex: 'debtorPhone',
      key: 'debtorPhone',
      align: 'center',
    },
    {
      title: translateDebtor('debtor_email'),
      width: 200,
      dataIndex: 'debtorEmail',
      key: 'debtorEmail',
      align: 'center',
    },
    {
      title: translateDebtor('contact'),
      width: 150,
      dataIndex: 'contact',
      key: 'contact',
      align: 'center',
    },
    {
      title: translateDebtor('position'),
      width: 200,
      dataIndex: 'position',
      key: 'position',
      align: 'center',
    },
    {
      title: translateDebtor('classification'),
      width: 200,
      dataIndex: 'classification',
      key: 'classification',
      align: 'center',
    },
    {
      title: translateDebtor('account_number'),
      width: 150,
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      align: 'center',
    },
    {
      title: translateDebtor('bank_name'),
      width: 300,
      dataIndex: 'contact',
      key: 'contact',
      align: 'center',
    },
    {
      title: translateDebtor('province_or_City'),
      width: 250,
      dataIndex: 'provinceOrCity',
      key: 'provinceOrCity',
      align: 'center',
    },
    {
      title: translateDebtor('part'),
      width: 200,
      dataIndex: 'part',
      key: 'part',
      align: 'center',
    },
    {
      title: translateDebtor('branch'),
      width: 200,
      dataIndex: 'branch',
      key: 'branch',
      align: 'center',
    },
    {
      title: translateDebtor('customer_name'),
      width: 200,
      dataIndex: 'customerName',
      key: 'customerName',
      align: 'center',
    },
    {
      title: translateDebtor('note'),
      width: 300,
      dataIndex: 'note',
      key: 'note',
      align: 'center',
    },
    {
      title: translateDebtor('creator'),
      width: 250,
      dataIndex: 'creator',
      key: 'creator',
      align: 'center',
    },
    {
      key: 'operation',
      fixed: 'right',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      render: (value) => (
        <Button
          onClick={() => handleEditDebtor(value)}
          icon={<EditOutlined />}
        ></Button>
      ),
    },
  ];

  const handleEditDebtor = (id: string) => {
    router.push(ROUTERS.DEBTOR_EDIT(id));
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
            <CreateDebtor />
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
        title={translateDebtor('title')}
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
