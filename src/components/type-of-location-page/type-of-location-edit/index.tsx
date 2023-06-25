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

export default function EditTypeOfLocation() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translateTypeOfLocation } = useI18n('typeOfLocation');
  const dateFormat = 'YYYY/MM/DD';

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
                  {translateTypeOfLocation('information_edit_type_of_location')}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} span={24}>
                <Form.Item
                  label={translateTypeOfLocation('type_of_location_no')}
                  name="type_of_location_no"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of location no',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeOfLocation(
                      'type_of_location_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>
              <Col lg={18} span={24}>
                <Form.Item
                  label={translateTypeOfLocation('type_of_location')}
                  name="code_location"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã địa chỉ" />
                </Form.Item>
              </Col>
              <Col lg={6} span={24}>
                <Form.Item
                  label={translateTypeOfLocation('status')}
                  name="status_depot"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Tạm ngừng',
                        label: 'Tạm ngừng',
                      },
                      {
                        value: 'Active',
                        label: 'Active',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateTypeOfLocation('date_created')}
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

              <Col lg={14} span={24}>
                <Form.Item
                  label={translateTypeOfLocation('creator')}
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
