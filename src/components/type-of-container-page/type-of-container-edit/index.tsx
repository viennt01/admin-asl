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

// interface DataType {
//   key: React.Key;
//   typeContainerNo: string;
//   typeContainer: string;
//   detail: string;
//   teus: string;
//   status: string;
//   dateCreate: string;
//   creator: string;
// }

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
  const dateFormat = 'YYYY/MM/DD';
  const { translate: translateTypeOfContainer } = useI18n('typeOfContainer');

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
                  {translateTypeOfContainer(
                    'information_edit_type_of_container'
                  )}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} span={24}>
                <Form.Item
                  label={translateTypeOfContainer('container_no')}
                  name="typeContainerNo"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTypeOfContainer(
                      'type_of_container_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={14} span={24}>
                <Form.Item
                  label={translateTypeOfContainer('type_of_container')}
                  name="typeContainer"
                  rules={[{ required: true, message: 'Please input email' }]}
                >
                  <Input
                    placeholder={translateTypeOfContainer(
                      'number_container_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateTypeOfContainer('status')}
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

              <Col lg={24} md={24}>
                <Form.Item
                  label={translateTypeOfContainer('detail')}
                  name="detail"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Input.TextArea
                    placeholder={translateTypeOfContainer('detail_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={6} md={24}>
                <Form.Item
                  label={translateTypeOfContainer('teus')}
                  name="teus"
                  rules={[{ required: true, message: 'Please input teus' }]}
                >
                  <Input
                    placeholder={translateTypeOfContainer('teus_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={6} md={24}>
                <Form.Item
                  label={translateTypeOfContainer('date_created')}
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

              <Col lg={12} md={24}>
                <Form.Item
                  label={translateTypeOfContainer('creator')}
                  name="detail_placeholder"
                  rules={[{ required: true, message: 'Please input creator' }]}
                >
                  <Input
                    placeholder={translateTypeOfContainer(
                      'creator_placeholder'
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
