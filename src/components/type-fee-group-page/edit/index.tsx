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
import useI18n from '@/i18n/useI18N';

export interface FormValues {
  type_of_container: string;
  detail_placeholder: string;
  number_container: string;
}

const { Title } = Typography;

export default function EditTypeFeeGroup() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translateTypeFeeGroup } = useI18n('typeFeeGroup');

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
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Card style={{ marginBottom: 24 }}>
            <Row justify={'center'}>
              <Col>
                <Title level={3}>
                  {translateTypeFeeGroup('information_edit_type_fee_group')}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={5} span={24}>
                <Form.Item
                  label={translateTypeFeeGroup(
                    'type_fee_group_code_form.title'
                  )}
                  tooltip={translateTypeFeeGroup(
                    'type_fee_group_code_form.title'
                  )}
                  name="type_fee_group_code_form"
                  rules={[
                    {
                      required: true,
                      message: translateTypeFeeGroup(
                        'type_fee_group_code_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeFeeGroup(
                      'type_fee_group_code_form.placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={14} span={24}>
                <Form.Item
                  label={translateTypeFeeGroup(
                    'type_fee_group_name_form.title'
                  )}
                  tooltip={translateTypeFeeGroup(
                    'type_fee_group_name_form.title'
                  )}
                  name="type_fee_group_name_form"
                  rules={[
                    {
                      required: true,
                      message: translateTypeFeeGroup(
                        'type_fee_group_name_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeFeeGroup(
                      'type_fee_group_name_form.placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateTypeFeeGroup('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translateTypeFeeGroup('status_placeholder'),
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
                  label={translateTypeFeeGroup('date_created')}
                  name="date_created"
                >
                  <Input
                    placeholder={translateTypeFeeGroup(
                      'date_created_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateTypeFeeGroup('creator')}
                  name="creator"
                >
                  <Input
                    placeholder={translateTypeFeeGroup('creator_placeholder')}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  label={translateTypeFeeGroup('date_inserted')}
                  name="date_inserted"
                >
                  <Input
                    placeholder={translateTypeFeeGroup(
                      'date_inserted_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={9} span={24}>
                <Form.Item
                  label={translateTypeFeeGroup('inserter')}
                  name="inserter"
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card>
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.TYPE_FEE_GROUP)}>
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
