import { Button, Col, DatePicker, Form, Input, Row, Select, Steps } from 'antd';
import style from '../../login.module.scss';
import { useState } from 'react';
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  ManOutlined,
  CalendarOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  InfoOutlined,
  TeamOutlined,
  BarcodeOutlined,
} from '@ant-design/icons';
import {
  InformationForm,
  ContactForm,
  PasswordForm,
  CompanyForm,
  register,
} from '../../fetcher';
import { API_MESSAGE } from '@/constant/message';
import { errorToast, successToast } from '@/hook/toast';

interface RegisterProps {
  onClickAnimationChangeForm: () => void;
}

const initialValuesInformationForm: InformationForm = {
  firstName: '',
  lastName: '',
  birthDay: '',
  genderName: '',
};
const initialValuesContactForm: ContactForm = {
  email: '',
  phoneNumber: '',
  address: '',
  cityName: '',
};
const initialValuesPasswordForm: PasswordForm = {
  password: '',
  passwordConfirm: '',
};
const initialValuesCompanyForm: CompanyForm = {
  companyName: '',
  taxCodeCompany: '',
  emailCompany: '',
  phoneNumberCompany: '',
  addressCompany: '',
  cityCompany: '',
  roleName: '',
};

const FormRegister = ({ onClickAnimationChangeForm }: RegisterProps) => {
  const [formInformation] = Form.useForm<InformationForm>();
  const [formContact] = Form.useForm<ContactForm>();
  const [formPassword] = Form.useForm<PasswordForm>();
  const [formCompany] = Form.useForm<CompanyForm>();
  const [current, setCurrent] = useState(0);

  const onFinish = () => {
    const data = {
      firstName: formInformation.getFieldValue('firstName'),
      lastName: formInformation.getFieldValue('lastName'),
      fullName: `${formInformation.getFieldValue(
        'firstName'
      )} ${formInformation.getFieldValue('lastName')}`,
      birthDay: formInformation.getFieldValue('birthDay').valueOf() as string,
      genderName: formInformation.getFieldValue('genderName'),
      address: formContact.getFieldValue('address'),
      email: formContact.getFieldValue('email'),
      cityName: formContact.getFieldValue('cityName'),
      phoneNumber: formContact.getFieldValue('phoneNumber'),
      password: formPassword.getFieldValue('password'),
      passwordConfirm: formPassword.getFieldValue('passwordConfirm'),
      companyName: formCompany.getFieldValue('companyName'),
      taxCodeCompany: formCompany.getFieldValue('taxCodeCompany'),
      emailCompany: formCompany.getFieldValue('emailCompany'),
      phoneNumberCompany: formCompany.getFieldValue('phoneNumberCompany'),
      addressCompany: formCompany.getFieldValue('addressCompany'),
      cityCompany: formCompany.getFieldValue('cityCompany'),
      roleName: formCompany.getFieldValue('roleName'),
    };
    console.log(data);

    register(data)
      .then((res) => {
        if (res.status) {
          onClickAnimationChangeForm();
          formInformation.resetFields();
          formContact.resetFields();
          formPassword.resetFields();
          formCompany.resetFields();
          setCurrent(0);
          successToast(res.message);
          return;
        } else {
          errorToast(res.message);
          return;
        }
      })
      .catch(() => {
        errorToast(API_MESSAGE.ERROR);
      });
  };

  const submitInformation = () => {
    console.log(formInformation.getFieldsValue());
    console.log(
      '1formInformation',
      formInformation.getFieldValue('genderName')
    );
    next();
  };

  const submitContact = (value: ContactForm) => {
    console.log('ContactForm', value);
    console.log('ContactForm', formContact);
    console.log('ss', formContact.getFieldsValue());
    // console.log('1formInformation', formContact.getFieldValue('genderName'));
    next();
  };

  const submitPassword = (value: PasswordForm) => {
    console.log('ContactForm', value);
    console.log('ContactForm', formPassword);
    console.log('ss', formPassword.getFieldsValue());
    // console.log('1formInformation', formContact.getFieldValue('genderName'));
    next();
  };

  const steps = [
    {
      title: 'Information',
      content: (
        <Form
          form={formInformation}
          onFinish={submitInformation}
          initialValues={initialValuesInformationForm}
          name="formInformation"
        >
          <Row gutter={16}>
            <Col lg={12} span={24}>
              <div className={style.inputField}>
                <UserOutlined className={style.signupUserIcon} />
                <Form.Item
                  name="firstName"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input your first name!
                        </div>
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder="First Name"
                    className={style.signupFirstNameInput}
                    bordered={false}
                    style={{ width: '235px' }}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={12} span={24}>
              <div className={style.inputField}>
                <UserOutlined className={style.signupUserIcon} />
                <Form.Item
                  name="lastName"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input your last name!
                        </div>
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder="Last Name"
                    className={style.signupLastNameInput}
                    bordered={false}
                    style={{ width: '235px' }}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={12} span={24}>
              <div className={style.inputField}>
                <CalendarOutlined className={style.signupCalendarIcon} />
                <Form.Item
                  name="birthDay"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input choose birthday!
                        </div>
                      ),
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="BirthDay"
                    style={{ width: '235px' }}
                    className={style.signupBirthDayChoose}
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={12} span={24}>
              <div className={style.inputField}>
                <ManOutlined className={style.signupManIcon} />
                <Form.Item
                  name="genderNamew" //đố nhau
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please select gender!
                        </div>
                      ),
                    },
                  ]}
                >
                  <Select
                    className={style.signupGenderSelect}
                    options={[
                      {
                        value: 'Male',
                        label: (
                          <div
                            style={{
                              color: '#1D4486',
                              fontWeight: 600,
                              fontSize: '1.3rem',
                            }}
                          >
                            Male
                          </div>
                        ),
                      },
                      {
                        value: 'Female',
                        label: (
                          <div
                            style={{
                              color: '#1D4486',
                              fontWeight: 600,
                              fontSize: '1.3rem',
                            }}
                          >
                            Female
                          </div>
                        ),
                      },
                    ]}
                    placeholder={
                      <div
                        style={{
                          color: '#4240ae',
                          fontWeight: 400,
                          fontSize: '1.3rem',
                        }}
                      >
                        Gender
                      </div>
                    }
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item>
                <Button
                  className={style.btnCustome}
                  htmlType="submit"
                  style={{ marginRight: 10 }}
                >
                  Next
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: 'Contact',
      content: (
        <Form
          form={formContact}
          onFinish={submitContact}
          initialValues={initialValuesContactForm}
          name="formContact"
        >
          <Row gutter={16}>
            <Col lg={14} span={24}>
              <div className={style.inputField}>
                <MailOutlined className={style.signupMailIcon} />
                <Form.Item
                  name="email"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input your email!
                        </div>
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    className={style.signupMailInput}
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={10} span={24}>
              <div className={style.inputField}>
                <PhoneOutlined className={style.signupPhoneIcon} />
                <Form.Item
                  name="phoneNumber"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input phone number!
                        </div>
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder="Phone Number"
                    className={style.signupPhoneInput}
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={14} span={24}>
              <div className={style.inputField}>
                <EnvironmentOutlined className={style.signupAddressIcon} />
                <Form.Item
                  name="address"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input address!
                        </div>
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder="Address"
                    className={style.signupAddressInput}
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={10} span={24}>
              <div className={style.inputField}>
                <EnvironmentOutlined className={style.signupAddressIcon} />
                <Form.Item
                  name="cityName"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>Please select city!</div>
                      ),
                    },
                  ]}
                >
                  <Select
                    className={style.signupAddressSelect}
                    options={[
                      {
                        value: '1',
                        label: (
                          <div
                            style={{
                              color: '#1D4486',
                              fontWeight: 600,
                              fontSize: '1.3rem',
                            }}
                          >
                            TP.HCM
                          </div>
                        ),
                      },
                      {
                        value: '2',
                        label: (
                          <div
                            style={{
                              color: '#1D4486',
                              fontWeight: 600,
                              fontSize: '1.3rem',
                            }}
                          >
                            HN
                          </div>
                        ),
                      },
                    ]}
                    placeholder={
                      <div
                        style={{
                          color: '#4240ae',
                          fontWeight: 400,
                          fontSize: '1.3rem',
                        }}
                      >
                        Please select city
                      </div>
                    }
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button
                  className={style.btnCustome}
                  htmlType="submit"
                  style={{ marginRight: 10 }}
                >
                  Next
                </Button>
              </Form.Item>
            </Col>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button
                  onClick={() => prev()}
                  className={style.btnCustome}
                  htmlType="button"
                >
                  Previous
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: 'Password',
      content: (
        <Form
          form={formPassword}
          onFinish={submitPassword}
          initialValues={initialValuesPasswordForm}
          name="formPassword"
        >
          <Row gutter={16}>
            <Col span={24}>
              <div
                className={style.inputField}
                style={{ marginBottom: '44px' }}
              >
                <LockOutlined className={style.signupLockIcon} />
                <Form.Item
                  name="password"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input your password!
                        </div>
                      ),
                    },
                    {
                      pattern:
                        // Bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự
                        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
                      message: (
                        <div className={style.message}>
                          Must contain 8 characters, one uppercase, one
                          lowercase, one number and one special case character
                        </div>
                      ),
                    },
                  ]}
                  required={false}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Password"
                    className={style.signupPasswordInput}
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col span={24}>
              <div className={style.inputField}>
                <LockOutlined className={style.signupLockIcon} />
                <Form.Item
                  name="passwordConfirm"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input your password!
                        </div>
                      ),
                    },
                    {
                      pattern:
                        // Bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự
                        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
                      message: (
                        <div className={style.message}>
                          Must contain 8 characters, one uppercase, one
                          lowercase, one number and one special case character
                        </div>
                      ),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        // return Promise.reject(
                        //   new Error(
                        //     'The two passwords that you entered do not match!'
                        //   )
                        // );
                      },
                      // message:
                      //   'The two passwords that you entered do not match!',
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm Password"
                    className={style.signupConfirmPasswordInput}
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: 24 }}>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button
                  className={style.btnCustome}
                  htmlType="submit"
                  style={{ marginRight: 10 }}
                >
                  Next
                </Button>
              </Form.Item>
            </Col>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button
                  onClick={() => prev()}
                  className={style.btnCustome}
                  htmlType="button"
                >
                  Previous
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: 'Company',
      content: (
        <Form
          form={formCompany}
          onFinish={onFinish}
          initialValues={initialValuesCompanyForm}
          name="formCompany"
        >
          <Row gutter={16}>
            <Col lg={24} span={24}>
              <div className={style.inputField}>
                <InfoOutlined
                  className={style.signupInfoIcon}
                  style={{ width: '50.11px' }}
                />
                <Form.Item
                  name="companyName"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input name company!
                        </div>
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder="Name Company"
                    className={style.signupNameCompanyInput}
                    bordered={false}
                    style={{ marginLeft: '-40px' }}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={14} span={24}>
              <div className={style.inputField}>
                <MailOutlined className={style.signupMailIcon} />
                <Form.Item
                  name="emailCompany"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input email company!
                        </div>
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder="Email Company"
                    className={style.signupEmailCompanyInput}
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={10} span={24}>
              <div className={style.inputField}>
                <PhoneOutlined className={style.signupPhoneIcon} />
                <Form.Item
                  name="phoneNumberCompany"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input phone number!
                        </div>
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder="Phone Number"
                    className={style.signupPhoneInput}
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={14} span={24}>
              <div className={style.inputField}>
                <EnvironmentOutlined className={style.signupAddressIcon} />
                <Form.Item
                  name="addressCompany"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input address!
                        </div>
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder="Address"
                    className={style.signupAddressInput}
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={10} span={24}>
              <div className={style.inputField}>
                <EnvironmentOutlined className={style.signupAddressIcon} />
                <Form.Item
                  name="cityCompany"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>Please select city!</div>
                      ),
                    },
                  ]}
                >
                  <Select
                    className={style.signupAddressSelect}
                    options={[
                      {
                        value: '1',
                        label: (
                          <div
                            style={{
                              color: '#1D4486',
                              fontWeight: 600,
                              fontSize: '1.3rem',
                            }}
                          >
                            TP.HCM
                          </div>
                        ),
                      },
                      {
                        value: '2',
                        label: (
                          <div
                            style={{
                              color: '#1D4486',
                              fontWeight: 600,
                              fontSize: '1.3rem',
                            }}
                          >
                            HN
                          </div>
                        ),
                      },
                    ]}
                    placeholder={
                      <div
                        style={{
                          color: '#4240ae',
                          fontWeight: 400,
                          fontSize: '1.3rem',
                        }}
                      >
                        Please select city
                      </div>
                    }
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={14} span={24}>
              <div className={style.inputField}>
                <BarcodeOutlined className={style.signupBarCodeIcon} />
                <Form.Item
                  name="taxCodeCompany"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>
                          Please input tax code!
                        </div>
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder="Tax Code Company"
                    className={style.signupTaxCodeInput}
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col lg={10} span={24}>
              <div className={style.inputField}>
                <TeamOutlined className={style.signupRoleIcon} />
                <Form.Item
                  name="roleName"
                  className={style.formItem}
                  rules={[
                    {
                      required: true,
                      message: (
                        <div className={style.message}>Please select role!</div>
                      ),
                    },
                  ]}
                >
                  <Select
                    className={style.signupRoleSelect}
                    options={[
                      {
                        value: '1',
                        label: (
                          <div
                            style={{
                              color: '#1D4486',
                              fontWeight: 600,
                              fontSize: '1.3rem',
                            }}
                          >
                            Admin
                          </div>
                        ),
                      },
                      {
                        value: '2',
                        label: (
                          <div
                            style={{
                              color: '#1D4486',
                              fontWeight: 600,
                              fontSize: '1.3rem',
                            }}
                          >
                            User
                          </div>
                        ),
                      },
                    ]}
                    placeholder={
                      <div
                        style={{
                          color: '#4240ae',
                          fontWeight: 400,
                          fontSize: '1.3rem',
                        }}
                      >
                        Please select role
                      </div>
                    }
                    bordered={false}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button
                  className={style.btnCustome}
                  htmlType="submit"
                  style={{ marginRight: 10 }}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Col>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button
                  onClick={() => prev()}
                  className={style.btnCustome}
                  htmlType="button"
                >
                  Previous
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <div>
        <div className={style.titleSignup}>
          <h2>Sign up</h2>
          <h2>Sign up</h2>
        </div>

        <Steps
          current={current}
          items={items}
          progressDot
          className={style.stepSignup}
        />
        <div className={style.contentStyle}>{steps[current].content}</div>
      </div>
    </>
  );
};

export default FormRegister;
