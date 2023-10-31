import { Layout, Image, Form, Input, Button, Row, Col, Select } from 'antd';
import style from './register.module.scss';
import CustomCard from '../commons/custom-card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ROUTERS } from '@/constant/router';
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  InfoOutlined,
  BarcodeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { DataRole, RegisterForm } from './interface';
import { checkTaxCode, listRole, register } from './fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { useRouter } from 'next/router';
const { Content } = Layout;

const initialValuesRegisterForm = {
  email: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
  taxCode: '',
  companyName: '',
  address: '',
  emailCompany: '',
  phoneNumberCompany: '',
};

export default function RegisterV2() {
  const [isLoadingConfirmOtp, setLoadingButtonRegister] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm<RegisterForm>();
  const [roleOptions, setRoleOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const handleSubmitVerifyOtp = (values: RegisterForm) => {
    setLoadingButtonRegister(true);
    const data = {
      roleID: values.roleID,
      email: values.email,
      fullName: values.fullName,

      taxCode: values.taxCode,
      companyName: values.companyName,
      address: values.address,
      emailCompany: values.emailCompany,
      phoneNumberCompany: values.phoneNumberCompany,

      password: values.password,
      passwordConfirm: values.passwordConfirm,
    };
    register(data)
      .then((res) => {
        if (res.status) {
          router.push(ROUTERS.LOGIN);
          successToast(res.message);
          return;
        } else {
          errorToast(res.message);
          return;
        }
      })
      .catch(() => {
        errorToast(API_MESSAGE.ERROR);
      })
      .finally(() => {
        setLoadingButtonRegister(false);
      });
  };
  useEffect(() => {
    listRole()
      .then((res) => {
        if (res.status) {
          setRoleOptions(
            res.data.map((item: DataRole) => ({
              label: item.name,
              value: item.roleID,
            }))
          );
        }
      })
      .catch((e: Error) => console.log(e));
  }, []);

  const handleCheckTaxCode = (value: React.FocusEvent<HTMLInputElement>) => {
    if (value.target.value) {
      const data = {
        taxCode: value.target.value,
      };
      checkTaxCode(data).then((payload) => {
        if (payload.status) {
          form.setFieldsValue({
            companyName: payload.data.companyName,
            address: payload.data.address,
          });
        }
      });
    }
  };

  return (
    <Layout className={style.layoutForgotPassword}>
      <div className={style.colorBackdrop}></div>
      <Content
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CustomCard
          style={{
            // overflowY: 'scroll',
            // height: '90vh',
            maxWidth: 480,
            width: '100%',
            background: 'rgba(255, 255, 255, 0.6156862745)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '20px',
            boxShadow: '4px 4px 10px -1px #1d4486',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '15px',
              gap: '5px',
              cursor: 'pointer',
            }}
          >
            <Link href={ROUTERS.LOGIN}>
              <Image
                src="/images/logo_ASL.png"
                alt="logo"
                width={180}
                preview={false}
              />
            </Link>
          </div>
          <div className={style.titleForgotPassword}>
            <h2>SIGN UP</h2>
            <h2>SIGN UP</h2>
          </div>

          <div
            style={{
              overflowY: 'scroll',
              height: '55vh',
              overflowX: 'hidden',
            }}
          >
            <Form
              form={form}
              onFinish={handleSubmitVerifyOtp}
              initialValues={initialValuesRegisterForm}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Row gutter={24}>
                <Col
                  span={24}
                  style={{ paddingLeft: '18px', paddingRight: '18px' }}
                >
                  <Form.Item
                    name="roleID"
                    rules={[
                      {
                        required: true,
                        message: 'Please select role!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Select
                      options={roleOptions}
                      placeholder="Please select role"
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col
                  span={24}
                  style={{ paddingLeft: '18px', paddingRight: '18px' }}
                >
                  <Form.Item
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your full name!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder="Full Name"
                      prefix={<UserOutlined />}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col
                  span={24}
                  style={{ paddingLeft: '18px', paddingRight: '18px' }}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                      {
                        pattern:
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Please enter a valid email format!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder="Email"
                      prefix={<MailOutlined />}
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col
                  span={24}
                  style={{ paddingLeft: '18px', paddingRight: '18px' }}
                >
                  <Form.Item
                    name="taxCode"
                    rules={[
                      {
                        required: true,
                        message: 'Please input tax code!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      onBlur={(value) => handleCheckTaxCode(value)}
                      placeholder="Tax Code Company"
                      prefix={<BarcodeOutlined />}
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col
                  span={24}
                  style={{ paddingLeft: '18px', paddingRight: '18px' }}
                >
                  <Form.Item
                    name="companyName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input name company!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder="Name Company"
                      prefix={<InfoOutlined />}
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col
                  span={24}
                  style={{ paddingLeft: '18px', paddingRight: '18px' }}
                >
                  <Form.Item
                    name="emailCompany"
                    rules={[
                      {
                        required: true,
                        message: 'Please input email company!',
                      },
                      {
                        pattern:
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Please enter a valid email format!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder="Email Company"
                      prefix={<MailOutlined />}
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col
                  span={24}
                  style={{ paddingLeft: '18px', paddingRight: '18px' }}
                >
                  <Form.Item
                    name="phoneNumberCompany"
                    rules={[
                      {
                        required: true,
                        message: 'Please input phone number!',
                      },
                      {
                        pattern: /^[0-9]{7,15}$/,
                        message: 'Please enter a vailid phone number!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder="Phone Number"
                      prefix={<PhoneOutlined />}
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col
                  span={24}
                  style={{ paddingLeft: '18px', paddingRight: '18px' }}
                >
                  <Form.Item
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: 'Please input address!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.TextArea placeholder="Address" size="large" />
                  </Form.Item>
                </Col>

                <Col
                  span={24}
                  style={{ paddingLeft: '18px', paddingRight: '18px' }}
                >
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        pattern:
                          // Bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự
                          /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
                        message:
                          'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      placeholder="Password"
                      prefix={<LockOutlined />}
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col
                  span={24}
                  style={{ paddingLeft: '18px', paddingRight: '18px' }}
                >
                  <Form.Item
                    name="passwordConfirm"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        pattern:
                          // Bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự
                          /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
                        message:
                          'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              'The two passwords that you entered do not match!'
                            )
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      placeholder="Confirm Password"
                      prefix={<LockOutlined />}
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Button
                loading={isLoadingConfirmOtp}
                className={style.btnSubmit}
                htmlType="submit"
                // style={{ width: '30%' }}
                style={{
                  width: '98%',
                  marginTop: '15px',
                }}
              >
                SIGN UP
              </Button>
            </Form>
          </div>
        </CustomCard>
      </Content>
    </Layout>
  );
}
