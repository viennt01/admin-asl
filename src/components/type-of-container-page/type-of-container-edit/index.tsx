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

export default function EditTypeOfContainer() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translateAddTypeOfContainer } = useI18n('typeOfContainer');

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
            labelCol={{ span: 4 }}
            autoComplete="off"
            labelAlign="left"
          >
            <Row justify={'center'}>
              <Col>
                <Title level={3}>Edit a type container</Title>
              </Col>
            </Row>
            <Row>
              <Col lg={24} md={24}>
                <Form.Item
                  label={translateAddTypeOfContainer('type_of_container')}
                  name="type_of_container"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateAddTypeOfContainer(
                      'type_of_container_placeholder'
                    )}
                  />
                </Form.Item>

                <Form.Item
                  label={translateAddTypeOfContainer('number_container')}
                  name="email"
                  rules={[{ required: true, message: 'Please input email' }]}
                >
                  <Input
                    placeholder={translateAddTypeOfContainer(
                      'number_container_placeholder'
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label={translateAddTypeOfContainer('detail')}
                  name="detail_placeholder"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Input.TextArea
                    placeholder={translateAddTypeOfContainer(
                      'detail_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
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
          </Form>
        </ConfigProvider>
      </Card>
    </div>
  );
}
