import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import CreateExchangeRate from './create-exchange-rate';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';

const STATUS_COLORS = {
  Increase: '#00A651',
  Reduce: '#ED1C27',
};
const STATUS_LABELS = {
  Increase: 'Tăng',
  Reduce: 'Giảm',
};

// const STATUS_CAPACITY_COLORS = {
//   Full: '#31AFFE',
//   NotFull: '#616887',
// };
// const STATUS_CAPACITY_LABELS = {
//   Full: 'Đầy',
//   NotFull: 'Nửa đầy',
// };

export default function ExchangeRatePage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateExchangeRate } = useI18n('exchangeRate');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    currencyFrom: string;
    currencyTo: string;
    bank: string;
    exchangeRate: number;
    price: number;
    sell: number;
    status: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      currencyFrom: 'USD',
      currencyTo: 'VND',
      bank: 'ACB',
      exchangeRate: 26098,
      price: 23375,
      sell: 26098,
      status: i % 2 === 1 ? 'Increase' : 'Reduce',
    });
  }

  const columns: ColumnsType<DataType> = [
    {
      title: translateExchangeRate('code'),
      width: 120,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateExchangeRate('currency_from'),
      width: 150,
      dataIndex: 'currencyFrom',
      key: 'currencyFrom',
      fixed: 'left',
      align: 'center',
      filters: [
        {
          text: 'USD',
          value: 'USD',
        },
        {
          text: 'EUR',
          value: 'EUR',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateExchangeRate('currency_to'),
      width: 180,
      fixed: 'left',
      dataIndex: 'currencyTo',
      key: 'currencyTo',
      align: 'center',
      filters: [
        {
          text: 'USD',
          value: 'USD',
        },
        {
          text: 'Euro',
          value: 'Euro',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateExchangeRate('exchange_rate'),
      width: 150,
      dataIndex: 'exchangeRate',
      key: 'exchangeRate',
      align: 'center',
      sorter: (a, b) => a.exchangeRate - b.exchangeRate,
    },
    {
      title: translateExchangeRate('bank'),
      width: 180,
      dataIndex: 'bank',
      key: 'bank',
      align: 'center',
      filters: [
        {
          text: 'ABBank',
          value: 'ABBank',
        },
        {
          text: 'ACB',
          value: 'ACB',
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
      title: translateExchangeRate('cash_buy'),
      width: 150,
      dataIndex: 'sell',
      key: 'sell',
      align: 'center',
      sorter: (a, b) => a.sell - b.sell,
    },
    {
      title: translateExchangeRate('cash_sell'),
      width: 150,
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.sell - b.sell,
    },
    {
      title: translateExchangeRate('transfer_buy'),
      width: 200,
      dataIndex: 'sell',
      key: 'sell',
      align: 'center',
      sorter: (a, b) => a.sell - b.sell,
    },
    {
      title: translateExchangeRate('transfer_sell'),
      width: 200,
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.sell - b.sell,
    },
    {
      title: translateExchangeRate('status'),
      dataIndex: 'status',
      fixed: 'right',
      key: 'status',
      align: 'center',
      filters: [
        {
          text: 'Tăng',
          value: 'Increase',
        },
        {
          text: 'Giảm',
          value: 'Reduce',
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
    router.push(ROUTERS.EXCHANGE_RATE_EDIT(id));
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
            <CreateExchangeRate />
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
        title={translateExchangeRate('title')}
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