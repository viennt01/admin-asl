import COLORS from '@/constant/color';
import { COUNTRY_CODES } from '@/constant/form';
import { ROUTERS } from '@/constant/router';
import {
  Button,
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  ConfigProvider,
  Select,
  Cascader,
  CascaderProps,
  DatePicker,
  Table,
  InputNumber,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}
export interface FormValues {
  type_of_container: string;
  detail_placeholder: string;
  number_container: string;
}
interface DataType {
  key: React.Key;
  containerNo: string;
  typeContainer: string;
  status: string;
}

const initialValue = {
  type_of_container: '',
  detail_placeholder: '',
  number_container: '',
};

const { Title } = Typography;

export default function EditLCustomer() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    console.log(formValues);
  };
  const residences: CascaderProps<DataNodeType>['options'] = [
    {
      value: 'Thành phố Hồ Chí Minh',
      label: 'Thành phố Hồ Chí Minh',
      children: [
        {
          value: 'Gò Vấp',
          label: 'Gò Vấp',
          children: [
            {
              value: 'Phường 1',
              label: 'Phường 1',
            },
          ],
        },
      ],
    },
    {
      value: 'Hà Nội',
      label: 'Hà Nội',
      children: [
        {
          value: 'Huyện Ba Vì',
          label: 'Huyện Ba Vì',
          children: [
            {
              value: 'Xã Ba Trại',
              label: 'Xã Ba Trại',
            },
          ],
        },
      ],
    },
  ];
  const dataTransHis: readonly any[] | undefined = [];
  const columnsTransHis: ColumnsType<DataType> = [
    {
      title: 'Booking No',
      dataIndex: 'containerNo',
      align: 'center',
    },
    {
      title: 'Port of Loading',
      dataIndex: 'typeContainer',
      align: 'center',
    },
    {
      title: 'Port of Discharge',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Container No',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Supplier',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Package',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Shipper',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Consignee (Cnee)',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Place of Delivery',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Note',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'ETD',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'ETA',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Creator',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Date created',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
    },
  ];
  const columnsReceivable: ColumnsType<DataType> = [
    {
      title: 'Invoice No',
      dataIndex: 'containerNo',
      align: 'center',
    },
    {
      title: 'Invoice series',
      dataIndex: 'typeContainer',
      align: 'center',
    },
    {
      title: 'Detailed explanation',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Unit price',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Items',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Quantity',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Amount exclude tax',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Tax (%)',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Tax money',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Total amount',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Invoice creation date',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Type of Expenses',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'EDate created',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Creator',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
    },
  ];
  const columnsPayable: ColumnsType<DataType> = [
    {
      title: 'Invoice No',
      dataIndex: 'containerNo',
      align: 'center',
    },
    {
      title: 'Invoice series',
      dataIndex: 'typeContainer',
      align: 'center',
    },
    {
      title: 'Detailed explanation',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Unit price',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Items',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Quantity',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Amount exclude tax',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Tax (%)',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Tax money',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Total amount',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Invoice creation date',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Type of Expenses',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'EDate created',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Creator',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
    },
  ];
  return (
    <div style={{ padding: '24px 0' }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: COLORS.GREEN,
          },
        }}
      >
        <Form
          form={form}
          initialValues={initialValue}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Card style={{ marginBottom: 24 }}>
            <Row justify={'center'}>
              <Col>
                <Title level={3}>Edit a customer</Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Customer No"
                  name="code_customer"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of code customer',
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã customer" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Customer Name"
                  name="name_customer"
                  rules={[
                    {
                      required: true,
                      message: 'Please input customer Name',
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên customer" />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Number of transactions"
                  name="number_of_transactions"
                  rules={[
                    {
                      required: true,
                      message: 'Please input number of transactions',
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    max={100000}
                    defaultValue={3}
                    placeholder="Please input number of transactions"
                  />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Date of birth"
                  name="date_birth"
                  rules={[
                    { required: true, message: 'Please input date of birth' },
                  ]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input email',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Email" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item label="Hot line" style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="phone_code"
                    style={{ display: 'inline-block', width: 104 }}
                  >
                    <Select
                      size="large"
                      options={COUNTRY_CODES.map(({ dial_code, code }) => ({
                        value: `${code}_${dial_code}`,
                        label: dial_code,
                      }))}
                      showSearch
                    />
                  </Form.Item>
                  <Form.Item
                    name="Phone Number"
                    style={{
                      display: 'inline-block',
                      width: 'calc(100% - 104px - 16px)',
                      marginLeft: 16,
                    }}
                    rules={[
                      {
                        pattern: /^[0-9]{7,15}$/,
                        message: 'Sai định dạng',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Nhập số điện thoại"
                      style={{
                        width: '100%',
                      }}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: 'Please input address' }]}
                >
                  <Cascader options={residences} />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Address detail"
                  name="detail_address"
                  rules={[
                    { required: true, message: 'Please input address detail' },
                  ]}
                >
                  <Input placeholder="Nhập vị trí cụ thể" />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Service Provided"
                  name="service_rovided"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Service Provided',
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên Service Provided" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Branch"
                  name="branch"
                  rules={[
                    {
                      required: true,
                      message: 'Please input branch',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Hải Phòng',
                        label: 'Hải Phòng',
                      },
                      {
                        value: 'Hồ Chí Minh',
                        label: 'Hồ Chí Minh',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Note"
                  name="note"
                  rules={[
                    {
                      required: true,
                      message: 'Please input note',
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Nhập ghi chú" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of status',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Active',
                        label: 'Active',
                      },
                      {
                        value: 'Deactivate',
                        label: 'Deactivate',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card
            style={{ marginBottom: 24 }}
            title={
              <Title
                level={3}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Transaction history
              </Title>
            }
          >
            <Table columns={columnsTransHis} dataSource={dataTransHis} />
          </Card>

          <Card
            style={{ marginBottom: 24 }}
            title={
              <Title
                level={3}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Debt history
              </Title>
            }
          >
            <Card style={{ marginBottom: 24 }} title="Công nợ chi">
              <Table columns={columnsReceivable} dataSource={dataTransHis} />
            </Card>
            <Card style={{ marginBottom: 24 }} title="Công nợ thu">
              <Table columns={columnsPayable} dataSource={dataTransHis} />
            </Card>
          </Card>

          <Card
            style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 11,
            }}
          >
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.CUSTOMER)}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>
      </ConfigProvider>
    </div>
  );
}
