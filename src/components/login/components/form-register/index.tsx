import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Steps,
  FormInstance,
} from 'antd';
import style from '../../login.module.scss';
import { useMemo, useState } from 'react';
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
import { checkTaxCode, register } from '../../fetcher';
import { API_MESSAGE } from '@/constant/message';
import { errorToast, successToast } from '@/hook/toast';
import {
  CompanyForm,
  ContactForm,
  DataRole,
  PasswordForm,
} from '../../interface';
interface RegisterProps {
  onClickAnimationChangeForm: () => void;
  formInformation: FormInstance;
  formContact: FormInstance;
  formPassword: FormInstance;
  formCompany: FormInstance;
  roleOptions: DataRole[];
}

const initialValuesInformationForm = {
  firstName: '',
  lastName: '',
};

const initialValuesContactForm = {
  email: '',
  phoneNumber: '',
};

const initialValuesPasswordForm = {
  password: '',
  passwordConfirm: '',
};

const initialValuesCompanyForm = {
  taxCode: '',
  companyName: '',
  address: '',
  emailCompany: '',
  phoneNumberCompany: '',
  websiteCompany: '',
  abbreviationsCompany: '',
};

const FormRegister = ({
  onClickAnimationChangeForm,
  formInformation,
  formContact,
  formPassword,
  formCompany,
  roleOptions,
}: RegisterProps) => {
  const [current, setCurrent] = useState(0);
  const [loadingButtonRegister, setLoadingButtonRegister] = useState(false);

  const onFinish = () => {
    setLoadingButtonRegister(true);
    const data = {
      firstName: formInformation.getFieldValue('firstName'),
      lastName: formInformation.getFieldValue('lastName'),
      fullName: `${formInformation.getFieldValue(
        'firstName'
      )} ${formInformation.getFieldValue('lastName')}`,
      roleID: formInformation.getFieldValue('roleID'),

      email: formContact.getFieldValue('email'),
      workingBranch: formContact.getFieldValue('workingBranch') || '',
      nationality: formContact.getFieldValue('nationality'),
      visa: formContact.getFieldValue('visa') || '',
      citizenIdentification:
        formContact.getFieldValue('citizenIdentification') || '',

      password: formPassword.getFieldValue('password'),
      passwordConfirm: formPassword.getFieldValue('passwordConfirm'),

      taxCode: formCompany.getFieldValue('taxCode'),
      companyName: formCompany.getFieldValue('companyName'),
      address: formCompany.getFieldValue('address'),
      emailCompany: formCompany.getFieldValue('emailCompany'),
      phoneNumberCompany: formCompany.getFieldValue('phoneNumberCompany') || '',
      websiteCompany: formCompany.getFieldValue('websiteCompany') || '',
      abbreviationsCompany:
        formCompany.getFieldValue('abbreviationsCompany') || '',
    };

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
      })
      .finally(() => {
        setLoadingButtonRegister(false);
      });
  };

  const submitInformation = () => {
    next();
  };

  const submitContact = (value: ContactForm) => {
    formContact.setFieldValue('email', value.email);
    formContact.setFieldValue('workingBranch', value.workingBranch || '');
    formContact.setFieldValue('nationality', value.nationality);
    formContact.setFieldValue('visa', value.visa || '');
    formContact.setFieldValue(
      'citizenIdentification',
      value.citizenIdentification || ''
    );
    next();
  };

  const submitPassword = (value: PasswordForm) => {
    formPassword.setFieldValue('password', value.password);
    formPassword.setFieldValue('passwordConfirm', value.passwordConfirm);
    next();
  };

  const submitCompany = (value: CompanyForm) => {
    formCompany.setFieldValue('taxCode', value.taxCode);
    formCompany.setFieldValue('companyName', value.companyName);
    formCompany.setFieldValue('address', value.address);
    formCompany.setFieldValue('emailCompany', value.emailCompany);
    formCompany.setFieldValue('phoneNumberCompany', value.phoneNumberCompany);
    formCompany.setFieldValue('websiteCompany', value.websiteCompany || '');
    formCompany.setFieldValue(
      'abbreviationsCompany',
      value.abbreviationsCompany || ''
    );
    onFinish();
  };

  const roleOptionSelect = useMemo(
    () =>
      roleOptions.map((item) => ({
        label: item.name,
        value: item.roleID,
      })),
    [roleOptions]
  );

  const handleCheckTaxCode = (value: React.FocusEvent<HTMLInputElement>) => {
    if (value.target.value) {
      const data = {
        taxCode: value.target.value,
      };
      checkTaxCode(data).then((payload) => {
        if (payload.status) {
          formCompany.setFieldsValue({
            companyName: payload.data.companyName,
            address: payload.data.address,
          });
        }
      });
    }
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
          style={{ marginTop: '30px' }}
        >
          <Row gutter={24}>
            <Col lg={24} span={24}>
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

            <Col lg={24} span={24}>
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

            <Col lg={12} span={24}>
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
                  options={roleOptionSelect}
                  placeholder="Please select role"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item>
                <Button className={style.btnSignUp} htmlType="submit">
                  Next
                  <LongRightArrow />
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
          <Row gutter={24}>
            <Col lg={12} span={24}>
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

            <Col lg={12} span={24}>
              <Form.Item name="workingBranch">
                <Input
                  placeholder="Working Branch"
                  prefix={<EnvironmentOutlined />}
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
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

            <Col lg={12} span={24}>
              <Form.Item name="visa">
                <Input
                  placeholder="Visa"
                  prefix={<ReadOutlined />}
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item name="citizenIdentification">
                <Input
                  placeholder="Citizen identification"
                  prefix={<ReadOutlined />}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button
                  onClick={() => prev()}
                  className={style.btnSignUp}
                  htmlType="button"
                >
                  <LongLeftArrow />
                  Previous
                </Button>
              </Form.Item>
            </Col>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button className={style.btnSignUp} htmlType="submit">
                  Next
                  <LongRightArrow />
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

            <Col span={24}>
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
          </Row>
          <Row style={{ marginTop: 24 }}>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button
                  onClick={() => prev()}
                  className={style.btnSignUp}
                  htmlType="button"
                >
                  <LongLeftArrow />
                  Previous
                </Button>
              </Form.Item>
            </Col>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button className={style.btnSignUp} htmlType="submit">
                  Next
                  <LongRightArrow />
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
          onFinish={submitCompany}
          initialValues={initialValuesCompanyForm}
          name="formCompany"
        >
          <Row gutter={16}>
            <Col lg={12} span={24}>
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
                  onBlur={(value) => handleCheckTaxCode(value)}
                  placeholder="Tax Code Company"
                  prefix={<BarcodeOutlined />}
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item name="abbreviationsCompany">
                <Input
                  placeholder="Abbreviations company"
                  prefix={<InfoOutlined />}
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col lg={24} span={24}>
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

            <Col lg={24} span={24}>
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

            <Col lg={14} span={24}>
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

            <Col lg={10} span={24}>
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

            <Col span={24}>
              <Form.Item name="websiteCompany">
                <Input
                  placeholder="Website company"
                  prefix={<WindowsOutlined />}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button
                  onClick={() => prev()}
                  className={style.btnSignUp}
                  htmlType="button"
                >
                  <LongLeftArrow />
                  Previous
                </Button>
              </Form.Item>
            </Col>
            <Col md={24} lg={7}>
              <Form.Item>
                <Button
                  className={style.btnSignUp}
                  htmlType="submit"
                  loading={loadingButtonRegister}
                >
                  SIGN UP
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

  const contentStyle: React.CSSProperties = {
    marginTop: 16,
  };

  return (
    <>
      <div>
        <div className={style.titleSignup}>
          <h2>Sign up</h2>
          <h2>Sign up</h2>
        </div>

        <Steps
          className={style.stepSignup}
          current={current}
          items={items}
          progressDot
        />
        <div style={contentStyle}>{steps[current].content}</div>
      </div>
    </>
  );
};

export default FormRegister;

const LongRightArrow = () => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 12H3.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.2152 11.7966L16.765 7.90356C16.2355 7.52535 15.5 7.90385 15.5 8.55455V15.4454C15.5 16.0961 16.2355 16.4746 16.765 16.0964L22.2152 12.2034C22.3548 12.1037 22.3548 11.8963 22.2152 11.7966Z"
      fill="currentColor"
    />
  </svg>
);

const LongLeftArrow = () => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 12H70.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.78481 11.7966L8.23501 7.90356C8.7645 7.52535 9.5 7.90385 9.5 8.55455V15.4454C9.5 16.0961 8.7645 16.4746 8.23501 16.0964L2.78481 12.2034C2.64522 12.1037 2.64522 11.8963 2.78481 11.7966Z"
      fill="currentColor"
    />
  </svg>
);
