import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import CreateQuotation from './create-quotation';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';

// const STATUS_COLORS = {
//   Active: '#00A651',
//   DeActive: '#ED1C27',
// };
// const STATUS_LABELS = {
//   Active: 'Active',
//   DeActive: 'Tạm ngừng',
// };

// const STATUS_CAPACITY_COLORS = {
//   Full: '#31AFFE',
//   NotFull: '#616887',
// };
// const STATUS_CAPACITY_LABELS = {
//   Full: 'Đầy',
//   NotFull: 'Nửa đầy',
// };

export default function QuotationPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateQuotation } = useI18n('quotation');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    quotationNo: string;
    customerName: string;
    receiptOfGoods: string;
    delivery: string;
    fee: string;
    emptyGetOrReturn: string;
    itemType: string;
    effectiveDate: string;
    creator: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      quotationNo: '123456',
      customerName: 'Nguyễn Văn A',
      receiptOfGoods: 'Nhận hàng',
      delivery: 'Giao hàng',
      fee: '500000',
      emptyGetOrReturn: 'Nhận/TRả rỗng',
      itemType: 'Thực Phẩm',
      effectiveDate: 'Ngày hiệu lực',
      creator: 'Trần Thị A',
    });
  }

  const columns: ColumnsType<DataType> = [
    {
      title: translateQuotation('quotation_no'),
      width: 150,
      dataIndex: 'quotationNo',
      key: 'quotationNo',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateQuotation('customer_name'),
      width: 150,
      dataIndex: 'customerName',
      key: 'customerName',
      fixed: 'left',
      align: 'center',
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateQuotation('receipt_of_goods'),
      dataIndex: 'receiptOfGoods',
      key: 'receiptOfGoods',
      align: 'center',
    },
    {
      title: translateQuotation('delivery'),
      dataIndex: 'delivery',
      key: 'delivery',
      align: 'center',
    },
    {
      title: translateQuotation('fee'),
      dataIndex: 'fee',
      key: 'fee',
      align: 'center',
    },
    {
      title: translateQuotation('empty_get_or_return'),
      dataIndex: 'emptyGetOrReturn',
      key: 'emptyGetOrReturn',
      align: 'center',
    },
    {
      title: translateQuotation('item_type'),
      dataIndex: 'itemType',
      key: 'itemType',
      align: 'center',
    },
    {
      title: translateQuotation('effective_date'),
      dataIndex: 'effectiveDate',
      key: 'effectiveDate',
      align: 'center',
    },
    {
      title: translateQuotation('creator'),
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
          onClick={() => handleEditCustomer(value)}
          icon={<EditOutlined />}
        ></Button>
      ),
    },
  ];

  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.QUOTATION_EDIT(id));
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
            <CreateQuotation />
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
        title={translateQuotation('title')}
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
