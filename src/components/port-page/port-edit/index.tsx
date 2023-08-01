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
  DatePicker,
} from 'antd';
import dayjs from 'dayjs';
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
              <Col lg={6} span={24}>
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

              <Col lg={13} span={24}>
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

              <Col lg={5} span={24}>
                <Form.Item
                  label={translatePort('type_of_port')}
                  name="type_of_port"
                  rules={[
                    { required: true, message: 'Please input type of port' },
                  ]}
                >
                  <Input placeholder="Please input type of port" />
                </Form.Item>
              </Col>

              <Col lg={19} span={24}>
                <Form.Item
                  label={translatePort('address')}
                  name="address"
                  rules={[{ required: true, message: 'Please input Address' }]}
                >
                  <Input placeholder="Please input Address" />
                </Form.Item>
              </Col>

              <Col lg={10} span={24}>
                <Form.Item
                  label={translatePort('company')}
                  name="company"
                  rules={[{ required: true, message: 'Please input company' }]}
                >
                  <Cascader options={residences} />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
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
                  <Input placeholder="Please input Creator" />
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
