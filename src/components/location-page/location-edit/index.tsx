import COLORS from '@/constant/color';
import { COUNTRY_CODES } from '@/constant/form';
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
  Cascader,
  CascaderProps,
  DatePicker,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}
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

export default function EditLocation() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translateLocation } = useI18n('location');
  const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    console.log(formValues);
  };
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
                  {translateLocation('information_edit_location')}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={5} span={24}>
                <Form.Item
                  label={translateLocation('code')}
                  name="code_location"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input placeholder={translateLocation('name_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={14} span={24}>
                <Form.Item
                  label={translateLocation('name')}
                  name="name_location"
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

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateLocation('type_of_location')}
                  name="type_of_location"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Nhận hàng',
                        label: 'Nhận hàng',
                      },
                      {
                        value: 'Trả hàng',
                        label: 'Trả hàng',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateLocation('country_name')}
                  name="country_name"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Cascader options={residences} />
                </Form.Item>
              </Col>

              <Col lg={19} span={24}>
                <Form.Item
                  label={translateLocation('address')}
                  name="address"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Cascader options={residences} />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  label={translateLocation('phone')}
                  style={{ marginBottom: 0 }}
                >
                  <Form.Item
                    name="phone_code"
                    style={{ display: 'inline-block', width: 104 }}
                  >
                    <Select
                      options={COUNTRY_CODES.map(({ dial_code, code }) => ({
                        value: `${code}_${dial_code}`,
                        label: dial_code,
                      }))}
                      showSearch
                    />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    style={{
                      display: 'inline-block',
                      width: 'calc(100% - 104px - 16px)',
                      marginLeft: 16,
                    }}
                    rules={[
                      {
                        pattern: /^[0-9]{7,15}$/,
                        message: 'Sai định dạng',
                      },
                    ]}
                  >
                    <Input
                      placeholder={translateLocation('phone_placeholder')}
                      style={{
                        width: '100%',
                      }}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateLocation('email')}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input email',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Email" />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateLocation('date_created')}
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

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateLocation('creator')}
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
                <Button onClick={() => router.push(ROUTERS.LOCATION)}>
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
