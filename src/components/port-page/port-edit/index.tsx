import COLORS from '@/constant/color';
import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import {
  Button,
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  ConfigProvider,
  Cascader,
  CascaderProps,
  Select,
  InputNumber,
  Table,
  DatePicker,
} from 'antd';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export interface FormValues {
  code: string;
  type_of_container: string;
  location: string;
  detail_location: string;
  rentCost: string;
  price: string;
}

const initialValue = {
  code: '',
  type_of_container: '',
  location: '',
  detail_location: '',
  rentCost: '',
  price: '',
};

const { Title } = Typography;

export default function EditPort() {
  const { translate: translatePort } = useI18n('port');
  const { translate: translateContainer } = useI18n('container');
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
  interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
  }
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
  interface DataType {
    key: React.Key;
    containerCode: string;
    typeOfContainer: string;
    address: string;
    capacityState: string;
    containerStatus: string;
    rentCost: number;
    price: number;
    status: string;
    supplier: string;
    dateCreated: string;
    creator: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: translateContainer('code'),
      width: 200,
      dataIndex: 'containerCode',
      align: 'center',
    },
    {
      title: translateContainer('type_of_container'),
      width: 150,
      dataIndex: 'typeOfContainer',
      align: 'center',
    },
    {
      title: translateContainer('location'),
      width: 300,
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: translateContainer('containerStatus'),
      width: 200,
      dataIndex: 'containerStatus',
      align: 'center',
    },
    {
      title: translateContainer('rentCost'),
      dataIndex: 'rentCost',
      width: 200,
      align: 'center',
    },
    {
      title: translateContainer('price'),
      dataIndex: 'price',
      width: 200,
      align: 'center',
    },
    {
      title: translateContainer('supplier'),
      width: 350,
      dataIndex: 'supplier',
      align: 'center',
    },
    {
      title: translateContainer('status'),
      dataIndex: 'status',
      width: 120,
      align: 'center',
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateContainer('date_created')}
        </div>
      ),
      width: 150,
      dataIndex: 'dateCreated',
      align: 'center',
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateContainer('creator')}
        </div>
      ),
      width: 200,
      dataIndex: 'creator',
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
                <Title level={3}>
                  {translatePort('information_edit_port')}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={5} span={24}>
                <Form.Item
                  label={translatePort('code')}
                  tooltip={translatePort('code')}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Port Code',
                    },
                  ]}
                >
                  <Input placeholder={translatePort('new_port_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePort('name')}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Port Name',
                    },
                  ]}
                >
                  <Input placeholder={translatePort('new_port_title')} />
                </Form.Item>
              </Col>

              <Col lg={3} span={24}>
                <Form.Item
                  label={translatePort('quantity_container')}
                  name="quantity_container"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    max={100000}
                    defaultValue={3}
                    placeholder={translatePort(
                      'quantity_container_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePort('status_capacity')}
                  name="status_capacity"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Đầy',
                        label: 'Đầy',
                      },
                      {
                        value: 'Nửa đầy',
                        label: 'Nửa đầy',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translatePort('country_name')}
                  name="countryName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Country',
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

              <Col lg={19} span={24}>
                <Form.Item
                  label={translatePort('address')}
                  name="location"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Input placeholder="Nhập Address" />
                </Form.Item>
              </Col>

              <Col lg={11} span={24}>
                <Form.Item
                  label={translatePort('company')}
                  name="company"
                  rules={[{ required: true, message: 'Please input company' }]}
                >
                  <Cascader options={residences} />
                </Form.Item>
              </Col>

              <Col lg={3} span={24}>
                <Form.Item
                  label={translatePort('date_created')}
                  name="dateCreated"
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

              <Col lg={6} span={24}>
                <Form.Item
                  label={translatePort('creator')}
                  name="creator"
                  rules={[
                    {
                      required: true,
                      message: 'Please input creator',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Creator" />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePort('status')}
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
            title={translateContainer('title')}
          >
            <Table columns={columns} dataSource={data} />
          </Card>
          <Card>
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.PORT)}>
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
