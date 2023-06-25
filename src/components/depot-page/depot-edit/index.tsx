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

export default function EditDepot() {
  const { translate: translateDepot } = useI18n('depot');
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
                  {translateDepot('information_edit_depot')}
                </Title>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col lg={5} span={24}>
                <Form.Item
                  label={translateDepot('depot_code')}
                  name="depot_code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input placeholder={translateDepot('depot_no_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={14} span={24}>
                <Form.Item
                  label={translateDepot('depot_name')}
                  name="depot_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateDepot('depot_name_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateDepot('country_name')}
                  name="location"
                  rules={[
                    { required: true, message: 'Please select the country' },
                  ]}
                >
                  <Cascader options={residences} />
                </Form.Item>
              </Col>

              <Col lg={11} span={24}>
                <Form.Item
                  label={translateDepot('address')}
                  name="detail_location"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Input placeholder="Nhập vị trí cụ thể" />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateDepot('branch_depot')}
                  name="branch_depot"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateDepot('branch_depot_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateDepot('companny_mamagement_depot')}
                  name="companny_mamagement_depot"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateDepot(
                      'companny_mamagement_depot_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={3} span={24}>
                <Form.Item
                  label={translateDepot('date_created')}
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
                  label={translateDepot('creator')}
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

              <Col lg={3} span={24}>
                <Form.Item
                  label={translateDepot('status_depot')}
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
                        value: 'Pending',
                        label: 'Pending',
                      },
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
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateDepot('description')}
                  name="status_depot"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder={translateDepot('description_placeholder')}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card>
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.DEPOT)}>
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
