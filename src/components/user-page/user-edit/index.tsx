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
  Image,
  Tag,
  Space,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useI18n from '@/i18n/useI18N';

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

const STATUS_COLORS = {
  Active: '#00A651',
  DeActive: '#ED1C27',
};

const STATUS_LABELS = {
  Active: 'Active',
  DeActive: 'DeActive',
};

export default function EditUser() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const dateFormat = 'YYYY/MM/DD';
  const { translate: translateUser } = useI18n('user');

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
                  {translateUser('information_edit_staff')}
                </Title>
              </Col>
            </Row>

            <Row>
              <Col lg={19} span={24}>
                <Row gutter={16}>
                  <Col lg={5} span={24}>
                    <Form.Item label={translateUser('account')} name="account">
                      <Input placeholder="ngocanh" disabled />
                    </Form.Item>
                  </Col>

                  {/* <Col lg={5} span={24}>
                    <Form.Item
                      label={translateUser('account')}
                      name="account"
                      rules={[
                        {
                          required: true,
                          message: 'Please input Account',
                        },
                      ]}
                    >
                      <Input placeholder="Please input Account" />
                    </Form.Item>
                  </Col> */}

                  <Col lg={10} span={24}>
                    <Form.Item
                      label={translateUser('first_name')}
                      name="full-name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input First Name',
                        },
                      ]}
                    >
                      <Input placeholder="Please input First Name" />
                    </Form.Item>
                  </Col>

                  <Col lg={9} span={24}>
                    <Form.Item
                      label={translateUser('last_name')}
                      name="full-name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input Last Name',
                        },
                      ]}
                    >
                      <Input placeholder="Please input Last Name" />
                    </Form.Item>
                  </Col>

                  <Col lg={16} span={24}>
                    <Form.Item
                      label={translateUser('full_name')}
                      name="full-name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input Full Name',
                        },
                      ]}
                    >
                      <Input placeholder="Please input Full Name" />
                    </Form.Item>
                  </Col>

                  <Col lg={3} span={24}>
                    <Form.Item
                      label={translateUser('gender')}
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: 'Please input gender',
                        },
                      ]}
                    >
                      <Select
                        options={[
                          {
                            value: 'Male',
                            label: 'Male',
                          },
                          {
                            value: 'Female',
                            label: 'Female',
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={5} span={24}>
                    <Form.Item
                      label={translateUser('dob')}
                      name="date_birth"
                      rules={[
                        {
                          required: true,
                          message: 'Please input date of birth',
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

                  <Col lg={5} span={24}>
                    <Form.Item
                      label={translateUser('nationality')}
                      name="nationality"
                      rules={[
                        {
                          required: true,
                          message: 'Please input nationality',
                        },
                      ]}
                    >
                      <Select
                        options={[
                          {
                            value: 'Việt Nam',
                            label: 'Việt Nam',
                          },
                          {
                            value: 'Mỹ',
                            label: 'Mỹ',
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={9} span={24}>
                    <Form.Item
                      label={translateUser('CCCD_Visa')}
                      name="CCCD_Visa"
                      rules={[
                        {
                          required: true,
                          message: 'Please input Citizen Identity Card/Visa',
                        },
                      ]}
                    >
                      <Input placeholder="Please input Citizen Identity Card/Visa" />
                    </Form.Item>
                  </Col>

                  <Col lg={10} span={24}>
                    <Form.Item label="Phone Number" style={{ marginBottom: 0 }}>
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
                        name={translateUser('phone')}
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
                          placeholder="Please input số điện thoại"
                          style={{
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Form.Item>
                  </Col>

                  <Col lg={7} span={24}>
                    <Form.Item
                      label={translateUser('email')}
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please input email',
                        },
                      ]}
                    >
                      <Input placeholder="Please input Email" />
                    </Form.Item>
                  </Col>

                  <Col lg={17} span={24}>
                    <Form.Item
                      label={translateUser('address')}
                      name="address"
                      rules={[
                        { required: true, message: 'Please input Address' },
                      ]}
                    >
                      <Cascader options={residences} />
                    </Form.Item>
                  </Col>

                  <Col lg={9} span={24}>
                    <Form.Item
                      label={translateUser('company')}
                      name="company"
                      rules={[
                        {
                          required: true,
                          message: 'Please input company',
                        },
                      ]}
                    >
                      <Input placeholder="Please input input company" />
                    </Form.Item>
                  </Col>

                  <Col lg={11} span={24}>
                    <Form.Item
                      label={translateUser('working_branch')}
                      name="working_branch"
                      rules={[
                        {
                          required: true,
                          message: 'Please input working branch',
                        },
                      ]}
                    >
                      <Input placeholder="Please input input working branch" />
                    </Form.Item>
                  </Col>

                  <Col lg={4} span={24}>
                    <Form.Item
                      label={translateUser('role')}
                      name="role"
                      rules={[
                        {
                          required: true,
                          message: 'Please input role',
                        },
                      ]}
                    >
                      <Select
                        options={[
                          {
                            value: 'Accountant',
                            label: 'Accountant',
                          },
                          {
                            value: 'Sale',
                            label: 'Sale',
                          },
                          {
                            value: 'Manager',
                            label: 'Manager',
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={6} span={24}>
                    <Form.Item
                      label={translateUser('status')}
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

                  <Col lg={6} span={24}>
                    <Form.Item
                      label={translateUser('last_login')}
                      name="last_login"
                    >
                      <DatePicker
                        defaultValue={dayjs('2015/01/01', dateFormat)}
                        format={dateFormat}
                        style={{ width: '100%' }}
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={6} span={24}>
                    <Form.Item
                      label={translateUser('update_created')}
                      name="update_created"
                    >
                      <DatePicker
                        defaultValue={dayjs('2015/01/01', dateFormat)}
                        format={dateFormat}
                        style={{ width: '100%' }}
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={6} span={24}>
                    <Form.Item
                      label={translateUser('date_created')}
                      name="date_created"
                    >
                      <DatePicker
                        defaultValue={dayjs('2015/01/01', dateFormat)}
                        format={dateFormat}
                        style={{ width: '100%' }}
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={24} span={24}>
                    <Form.Item
                      label={translateUser('note')}
                      name="note"
                      rules={[
                        {
                          required: true,
                          message: 'Please input note',
                        },
                      ]}
                    >
                      <Input.TextArea placeholder="Please input note" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col
                lg={5}
                span={24}
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Space style={{ position: 'relative' }}>
                  <Image
                    style={{
                      objectFit: 'cover',
                      width: '160px',
                      height: '160px',
                      borderRadius: '50%',
                    }}
                    src="/images/anhstaff.jpeg"
                    alt="Avatar"
                  />
                </Space>

                <Space
                  style={{
                    position: 'absolute',
                    transform: 'translate(95px, 25px)',
                  }}
                >
                  <Tag
                    color={STATUS_COLORS.Active}
                    style={{
                      margin: 0,
                      padding: '5px 20px',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      borderRadius: '20px',
                    }}
                  >
                    {STATUS_LABELS.Active}
                  </Tag>
                </Space>

                <p
                  style={{
                    marginTop: '10px',
                    fontSize: '18px',
                    marginBottom: '0',
                  }}
                >
                  ASL151200
                </p>

                <p
                  style={{
                    fontSize: '18px',
                    marginBottom: '0',
                  }}
                >
                  Nguyễn Thị Ngọc Ánh
                </p>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.BOOKING)}>
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
