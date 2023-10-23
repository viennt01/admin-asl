import { Layout, Image, Form, Input, Button, Row, Col, Select } from 'antd';
import style from './register.module.scss';
import CustomCard from '../commons/custom-card';
import Link from 'next/link';
import { ConfirmOtpData } from '../cofirm-otp/interface';
import { useState } from 'react';
import { ROUTERS } from '@/constant/router';
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  InfoOutlined,
  BarcodeOutlined,
  WindowsOutlined,
  ReadOutlined,
} from '@ant-design/icons';
const { Content } = Layout;

export default function RegisterV2() {
  const [isLoadingConfirmOtp] = useState(false);
  const handleSubmitVerifyOtp = (values: ConfirmOtpData) => {
    console.log(values);
  };

  const initialValuesRegisterForm = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
    taxCode: '',
    companyName: '',
    address: '',
    emailCompany: '',
    phoneNumberCompany: '',
    websiteCompany: '',
    abbreviationsCompany: '',
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
            marginLeft: '24px',
            marginRight: '24px',
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

          <Form
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
              <Col lg={9} span={24}>
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your first name!',
                    },
                  ]}
                >
                  <Input
                    placeholder="First Name"
                    prefix={<UserOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={9} span={24}>
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your last name!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Last Name"
                    prefix={<UserOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  name="roleID"
                  rules={[
                    {
                      required: true,
                      message: 'Please select role!',
                    },
                  ]}
                >
                  <Select
                    // options={roleOptionSelect}
                    placeholder="Please select role"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                    {
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Please enter a valid email format!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  name="nationality"
                  rules={[
                    {
                      required: true,
                      message: 'Please input nationality!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Nationality"
                    prefix={<EnvironmentOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item name="visa">
                  <Input
                    placeholder="Visa"
                    prefix={<ReadOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item name="citizenIdentification">
                  <Input
                    placeholder="Citizen identification"
                    prefix={<ReadOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
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

              <Col span={12}>
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
                >
                  <Input.Password
                    placeholder="Confirm Password"
                    prefix={<LockOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  name="taxCode"
                  rules={[
                    {
                      required: true,
                      message: 'Please input tax code!',
                    },
                  ]}
                >
                  <Input
                    // onBlur={(value) => handleCheckTaxCode(value)}
                    placeholder="Tax Code Company"
                    prefix={<BarcodeOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input name company!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Name Company"
                    prefix={<InfoOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item name="abbreviationsCompany">
                  <Input
                    placeholder="Abbreviations company"
                    prefix={<InfoOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  name="emailCompany"
                  rules={[
                    {
                      required: true,
                      message: 'Please input email company!',
                    },
                    {
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Please enter a valid email format!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Email Company"
                    prefix={<MailOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: 'Please input address!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Address"
                    prefix={<EnvironmentOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
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
                >
                  <Input
                    placeholder="Phone Number"
                    prefix={<PhoneOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item name="workingBranch">
                  <Input
                    placeholder="Working Branch"
                    prefix={<EnvironmentOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="websiteCompany">
                  <Input
                    placeholder="Website company"
                    prefix={<WindowsOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button
              // size="200px"
              type="primary"
              htmlType="submit"
              style={{ width: '30%' }}
              loading={isLoadingConfirmOtp}
            >
              SIGN UP
            </Button>
          </Form>
        </CustomCard>
      </Content>
    </Layout>
  );
}
