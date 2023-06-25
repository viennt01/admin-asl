import COLORS from '@/constant/color';
import { COUNTRY_CODES } from '@/constant/form';
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
  Cascader,
  CascaderProps,
  DatePicker,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useI18n from '@/i18n/useI18N';
const dateFormat = 'YYYY/MM/DD';

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

export default function EditBank() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translateBank } = useI18n('bank');

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
                  {translateBank('information_edit_bank')}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={5} span={24}>
                <Form.Item
                  label={translateBank('bank_code')}
                  name="code_bank"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of mã bank',
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã bank" />
                </Form.Item>
              </Col>

              <Col lg={13} span={24}>
                <Form.Item
                  label={translateBank('bank_name')}
                  name="bank_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Bank name',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Bank name" />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  label={translateBank('bank_branch')}
                  name="bank_branch"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Bank branch',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Hải Phòng',
                        label: 'Hải Phòng',
                      },
                      {
                        value: 'Hồ Chí Minh',
                        label: 'Hồ Chí Minh',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={24} span={24}>
                <Form.Item
                  label={translateBank('bank_address')}
                  name="location"
                  rules={[{ required: true, message: 'Please input Address' }]}
                >
                  <Cascader options={residences} />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateBank('VND_account_number')}
                  name="VND_account_number"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Bank account number',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Bank account number" />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateBank('USD_account_number')}
                  name="VND_account_number"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Bank account number',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Bank account number" />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateBank('phone')}
                  style={{ marginBottom: 0 }}
                >
                  <Form.Item
                    name="phone_code"
                    style={{ display: 'inline-block', width: 100 }}
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
                      placeholder="Nhập số điện thoại"
                      style={{
                        width: '100%',
                      }}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  label={translateBank('bank_email')}
                  name="bank_email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Bank email',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Bank email" />
                </Form.Item>
              </Col>

              <Col lg={3} span={24}>
                <Form.Item
                  label={translateBank('status')}
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

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateBank('date_created')}
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

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateBank('creator')}
                  name="creator"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of Creator',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Creator" />
                </Form.Item>
              </Col>

              <Col lg={14} span={24}>
                <Form.Item
                  label={translateBank('bank_note')}
                  name="note"
                  rules={[
                    {
                      required: true,
                      message: 'Please input note',
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Nhập ghi chú" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.BANK)}>
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
