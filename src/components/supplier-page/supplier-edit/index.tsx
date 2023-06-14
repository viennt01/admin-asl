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

export default function EditSupplier() {
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
  const data: readonly any[] | undefined = [];
  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã số transaction',
      dataIndex: 'containerNo',
      align: 'center',
    },
    {
      title: 'Số tiền',
      dataIndex: 'typeContainer',
      align: 'center',
    },
    {
      title: 'Người gửi',
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
                <Title level={3}>Edit a supplier</Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Supplier No"
                  name="code_supplier"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of code supplier',
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã supplier" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Supplier Name"
                  name="name_supplier"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Supplier Name',
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên Supplier" />
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
                    name="phone"
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
                  label="Transaction amount"
                  name="transaction_amount"
                  rules={[
                    {
                      required: true,
                      message: 'Please input transaction amount',
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    max={100000}
                    defaultValue={100}
                    placeholder="Please input transaction amount"
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label="Date created"
                  name="date_created"
                  rules={[
                    { required: true, message: 'Please input date created' },
                  ]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} span={24}>
                <Form.Item
                  label="Creator"
                  name="creator"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of Creator',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Ngân',
                        label: 'Ngân',
                      },
                      {
                        value: 'Khoa',
                        label: 'Khoa',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} span={24}>
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
                        value: 'Save As Draft',
                        label: 'Save As Draft',
                      },
                      {
                        value: 'Pending',
                        label: 'Pending',
                      },
                      {
                        value: 'Approved',
                        label: 'Approved',
                      },
                      {
                        value: 'Processing',
                        label: 'Processing',
                      },
                      {
                        value: 'Completed',
                        label: 'Completed',
                      },
                      {
                        value: 'Cancel',
                        label: 'Cancel',
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
            </Row>
          </Card>
          <Card style={{ marginBottom: 24 }} title="Transaction history">
            <Table columns={columns} dataSource={data} />
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
                <Button onClick={() => router.push(ROUTERS.TYPES_OF_CONTAINER)}>
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
