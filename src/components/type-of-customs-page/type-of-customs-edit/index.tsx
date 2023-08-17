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

const { Title } = Typography;

export default function EditTypeOfCustoms() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const dateFormat = 'YYYY/MM/DD';
  const { translate: translateTypeOfCustoms } = useI18n('typeOfCustoms');

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    console.log(formValues);
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
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Card style={{ marginBottom: 24 }}>
            <Row justify={'center'}>
              <Col>
                <Title level={3}>
                  {translateTypeOfCustoms('information_add_type_of_customs')}
                </Title>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col lg={14} span={24}>
                <Form.Item
                  label={translateTypeOfCustoms('name_customs')}
                  name="name_customs"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfCustoms(
                        'name_customs_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeOfCustoms(
                      'name_customs_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={10} span={24}>
                <Form.Item
                  label={translateTypeOfCustoms('customs')}
                  name="customs"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfCustoms('customs_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeOfCustoms('customs_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateTypeOfCustoms('currency')}
                  name="currency"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfCustoms('currency_placeholder'),
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
                  label={translateTypeOfCustoms('vat')}
                  name="vat"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfCustoms('vat_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeOfCustoms('vat_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={10} span={24}>
                <Form.Item
                  label={translateTypeOfCustoms('cost')}
                  name="cost"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfCustoms('cost_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeOfCustoms('cost_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateTypeOfCustoms('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfCustoms('status_placeholder'),
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
                  label={translateTypeOfCustoms('date_created')}
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
                  label={translateTypeOfCustoms('creator')}
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
                <Button onClick={() => router.push(ROUTERS.TYPES_OF_CUSTOMS)}>
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
