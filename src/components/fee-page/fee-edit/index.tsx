import COLORS from '@/constant/color';
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
  DatePicker,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useI18n from '@/i18n/useI18N';

export interface FormValues {
  type_of_container: string;
  detail_placeholder: string;
  number_container: string;
}

const initialValue = {
  type_of_container: '',
  detail_placeholder: '',
  number_container: '',
};

const { Title } = Typography;

export default function EditFee() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const dateFormat = 'YYYY/MM/DD';
  const { translate: translateFee } = useI18n('fee');

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    return formValues;
  };

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
                <Title level={3}>{translateFee('information_edit_fee')}</Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={5} span={24}>
                <Form.Item
                  label={translateFee('code')}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Input disabled placeholder="Nhập mã" />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateFee('name')}
                  name="name_customer"
                  rules={[
                    {
                      required: true,
                      message: translateFee('name_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translateFee('name_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateFee('customs')}
                  name="customs"
                  rules={[
                    {
                      required: true,
                      message: translateFee('customs_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translateFee('customs_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateFee('currency')}
                  name="currency"
                  rules={[
                    {
                      required: true,
                      message: translateFee('currency_placeholder'),
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'USD',
                        label: 'USD',
                      },
                      {
                        value: 'VND',
                        label: 'VND',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={10} span={24}>
                <Form.Item
                  label={translateFee('vat')}
                  name="vat"
                  rules={[
                    {
                      required: true,
                      message: translateFee('vat_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translateFee('vat_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={10} span={24}>
                <Form.Item
                  label={translateFee('cost')}
                  name="cost"
                  rules={[
                    {
                      required: true,
                      message: translateFee('cost_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translateFee('cost_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateFee('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translateFee('status_placeholder'),
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

              <Col lg={6} span={24}>
                <Form.Item
                  label={translateFee('date_created')}
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

              <Col lg={14} span={24}>
                <Form.Item
                  label={translateFee('creator')}
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
            </Row>
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
                <Button onClick={() => router.push(ROUTERS.FEE)}>Cancel</Button>
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
