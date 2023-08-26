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
  Select,
  DatePicker,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export interface FormValues {
  type_of_Location: string;
  detail_placeholder: string;
  number_Location: string;
}

// interface DataType {
//   key: React.Key;
//   typeLocationNo: string;
//   typeLocation: string;
//   detail: string;
//   teus: string;
//   status: string;
//   dateCreate: string;
//   creator: string;
// }

const initialValue = {
  type_of_Location: '',
  detail_placeholder: '',
  number_Location: '',
};

const { Title } = Typography;

export default function EditTypeOfLocation() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const dateFormat = 'YYYY/MM/DD';
  const { translate: translateTypeOfLocation } = useI18n('typeOfLocation');

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    return formValues;
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
                  {translateTypeOfLocation('information_edit_type_of_location')}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} span={24}>
                <Form.Item
                  label={translateTypeOfLocation('name')}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfLocation('name_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeOfLocation(
                      'type_of_Location_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={14} span={24}>
                <Form.Item
                  label={translateTypeOfLocation('description')}
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfLocation(
                        'description_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeOfLocation(
                      'description_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateTypeOfLocation('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfLocation('status_placeholder'),
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

              <Col lg={6} md={24}>
                <Form.Item
                  label={translateTypeOfLocation('date_created')}
                  name="dateCreated"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfLocation(
                        'date_created_placeholder'
                      ),
                    },
                  ]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>

              <Col lg={6} md={24}>
                <Form.Item
                  label={translateTypeOfLocation('date_update')}
                  name="dateUpdate"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfLocation(
                        'date_update_placeholder'
                      ),
                    },
                  ]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} md={24}>
                <Form.Item
                  label={translateTypeOfLocation('updater')}
                  name="updater"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfLocation('updater_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeOfLocation('updater_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} md={24}>
                <Form.Item
                  label={translateTypeOfLocation('creator')}
                  name="creator"
                  rules={[
                    {
                      required: true,
                      message: translateTypeOfLocation('creator_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeOfLocation('creator_placeholder')}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.TYPE_OF_LOCATION)}>
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
