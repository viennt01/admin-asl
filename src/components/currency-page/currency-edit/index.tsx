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
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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

export default function EditCurrency() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    console.log(formValues);
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Card style={{ marginBottom: 24 }}>
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
            <Row justify={'center'}>
              <Col>
                <Title level={3}>Edit a currency</Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Currency From"
                  name="currency_from"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of Currency From',
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã Currency From" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Currency To"
                  name="currency-to"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Currency To',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Currency To" />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Exchange rate"
                  name="exchange_rate"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Exchange rate',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Exchange rate" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Bank"
                  name="bank"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Bank',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'BIDV',
                        label: 'BIDV',
                      },
                      {
                        value: 'VCB',
                        label: 'VCB',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Cash (buy)"
                  name="cash_buy"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of Cash (buy)',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Cash (buy)" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Cash (sell)"
                  name="cash_sell"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of Cash (sell)',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Cash (sell)" />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Transfer (buy)"
                  name="transfer_buy"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of Transfer (buy)',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Transfer (buy)" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Transfer (sell)"
                  name="transfer_sell"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of Transfer (sell)',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Transfer (sell)" />
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
                        value: 'Increase',
                        label: 'Increase',
                      },
                      {
                        value: 'Decrease',
                        label: 'Decrease',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.CURRENCY)}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </ConfigProvider>
      </Card>
    </div>
  );
}
