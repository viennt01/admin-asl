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
} from 'antd';
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

export default function EditCompany() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translateCompany } = useI18n('company');

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
                <Title level={3}>
                  {translateCompany('information_edit_Company')}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={10} span={24}>
                <Form.Item
                  label={translateCompany('Company')}
                  name="Company_from"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of Company From',
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã Company From" />
                </Form.Item>
              </Col>
              <Col lg={7} span={24}>
                <Form.Item
                  label={translateCompany('exchange_rate_to_VND')}
                  name="Company-to"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Company To',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Company To" />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateCompany('exchange_rate_to_USD')}
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
            </Row>

            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.COMPANY)}>
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
