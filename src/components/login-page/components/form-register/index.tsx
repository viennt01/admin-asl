import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  // notification,
} from 'antd';
import style from '../../login.module.scss';
import { useRef } from 'react';
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

const FormRegister = () => {
  // const [notiApi, contextHolder] = notification.useNotification();
  const stepOneRef = useRef<HTMLDivElement>(null);
  const stepTwoRef = useRef<HTMLDivElement>(null);
  const stepThreeRef = useRef<HTMLDivElement>(null);
  const stepFourRef = useRef<HTMLDivElement>(null);
  const stepLineOneRef = useRef<HTMLDivElement>(null);
  const stepLineTwoRef = useRef<HTMLDivElement>(null);
  const stepLineThreeRef = useRef<HTMLDivElement>(null);
  const stepLineFourRef = useRef<HTMLDivElement>(null);

  const onClickNextInFormOne = () => {
    let className;
    let classNameStep;

    if (stepOneRef.current && stepLineOneRef.current) {
      className = stepOneRef.current.classList[1];
      classNameStep = stepLineOneRef.current.classList[1];
      stepOneRef.current.classList.remove(stepOneRef.current.classList[1]);
      stepLineOneRef.current.classList.remove(
        stepLineOneRef.current.classList[1]
      );
    }

    stepTwoRef.current?.classList.add(`${className}`);
    stepLineTwoRef.current?.classList.add(`${classNameStep}`);
  };

  const onClickNextInFormTwo = () => {
    let className;
    let classNameStep;

    if (stepTwoRef.current && stepLineTwoRef.current) {
      className = stepTwoRef.current.classList[1];
      classNameStep = stepLineTwoRef.current.classList[1];

      stepTwoRef.current.classList.remove(stepTwoRef.current.classList[1]);
      stepLineTwoRef.current.classList.remove(
        stepLineTwoRef.current.classList[1]
      );
    }

    stepThreeRef.current?.classList.add(`${className}`);
    stepLineThreeRef.current?.classList.add(`${classNameStep}`);
  };

  const onClickNextInFormThree = () => {
    let className;
    let classNameStep;

    if (stepThreeRef.current && stepLineThreeRef.current) {
      className = stepThreeRef.current.classList[1];
      classNameStep = stepLineThreeRef.current.classList[1];

      stepThreeRef.current.classList.remove(stepThreeRef.current.classList[1]);
      stepLineThreeRef.current.classList.remove(
        stepLineThreeRef.current.classList[1]
      );
    }

    stepFourRef.current?.classList.add(`${className}`);
    stepLineFourRef.current?.classList.add(`${classNameStep}`);
  };

  const onClickPreviousInFormFour = () => {
    let className;
    let classNameStep;

    if (stepFourRef.current && stepLineFourRef.current) {
      className = stepFourRef.current.classList[1];
      classNameStep = stepLineFourRef.current.classList[1];

      stepFourRef.current.classList.remove(stepFourRef.current.classList[1]);
      stepLineFourRef.current.classList.remove(
        stepLineFourRef.current.classList[1]
      );
    }

    stepThreeRef.current?.classList.add(`${className}`);
    stepLineThreeRef.current?.classList.add(`${classNameStep}`);
  };

  const onClickPreviousInFormThree = () => {
    let className;
    let classNameStep;

    if (stepThreeRef.current && stepLineThreeRef.current) {
      className = stepThreeRef.current.classList[1];
      classNameStep = stepLineThreeRef.current.classList[1];

      stepThreeRef.current.classList.remove(stepThreeRef.current.classList[1]);
      stepLineThreeRef.current.classList.remove(
        stepLineThreeRef.current.classList[1]
      );
    }

    stepTwoRef.current?.classList.add(`${className}`);
    stepLineTwoRef.current?.classList.add(`${classNameStep}`);
  };

  const onClickPreviousInFormTwo = () => {
    let className;
    let classNameStep;

    if (stepTwoRef.current && stepLineTwoRef.current) {
      className = stepTwoRef.current.classList[1];
      classNameStep = stepLineTwoRef.current.classList[1];

      stepTwoRef.current.classList.remove(stepTwoRef.current.classList[1]);
      stepLineTwoRef.current.classList.remove(
        stepLineTwoRef.current.classList[1]
      );
    }

    stepOneRef.current?.classList.add(`${className}`);
    stepLineOneRef.current?.classList.add(`${classNameStep}`);
  };
  // useEffect(() => {}, []);
  return (
    <>
      {/* {contextHolder} */}
      <Form>
        <div className={style.titleSignup}>
          <h2>Sign up</h2>
          <h2>Sign up</h2>
        </div>

        <div className={style.progressbar}>
          <div className={style.progress}></div>
          <div
            ref={stepLineOneRef}
            className={`${style.progressStep} ${style.progressStepActive}`}
            data-title="Information"
          ></div>
          <div
            ref={stepLineTwoRef}
            className={style.progressStep}
            data-title="Contact"
          ></div>
          <div
            ref={stepLineThreeRef}
            className={style.progressStep}
            data-title="Password"
          ></div>
          <div
            ref={stepLineFourRef}
            className={style.progressStep}
            data-title="Company"
          ></div>
        </div>

        {/* Steps */}
        <div
          ref={stepOneRef}
          className={`${style.formStep} ${style.formStepActive}`}
        >
          <Row gutter={16}>
            <Col lg={12} span={24}>
              <Form.Item
                name="firstName"
                style={{ width: '100%' }}
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
                <div className={style.inputField}>
                  <UserOutlined className={style.signupUserIcon} />
                  <Input
                    placeholder="First Name"
                    className={style.signupFirstNameInput}
                    bordered={false}
                    style={{ width: '235px' }}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                name="lastName"
                style={{ width: '100%' }}
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
                <div className={style.inputField}>
                  <UserOutlined className={style.signupUserIcon} />
                  <Input
                    placeholder="Last Name"
                    className={style.signupLastNameInput}
                    bordered={false}
                    style={{ width: '235px' }}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                name="birthDay"
                style={{ width: '100%' }}
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
                <div className={style.inputField}>
                  <CalendarOutlined className={style.signupCalendarIcon} />
                  <DatePicker
                    placeholder="BirthDay"
                    style={{ width: '235px' }}
                    className={style.signupBirthDayChoose}
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                name="gender"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: true,
                    message: (
                      <div className={style.message}>Please select gender!</div>
                    ),
                  },
                ]}
              >
                <div className={style.inputField}>
                  <ManOutlined className={style.signupManIcon} />
                  <Select
                    className={style.signupGenderSelect}
                    options={[
                      {
                        value: '1',
                        label: 'Male',
                      },
                      {
                        value: '2',
                        label: 'Female',
                      },
                    ]}
                    placeholder="Please select gender"
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Button
              // loading={loginUser.isLoading}
              className={style.btnSignUp}
              htmlType="button"
              onClick={onClickNextInFormOne}
            >
              Next
            </Button>
          </Row>
        </div>

        <div ref={stepTwoRef} className={`${style.formStep}`}>
          <Row gutter={16}>
            <Col lg={14} span={24}>
              <Form.Item
                name="email"
                style={{ width: '100%' }}
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
                <div className={style.inputField}>
                  <MailOutlined className={style.signupMailIcon} />
                  <Input
                    placeholder="Email"
                    className={style.signupMailInput}
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={10} span={24}>
              <Form.Item
                name="phoneNumber"
                style={{ width: '100%' }}
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
                <div className={style.inputField}>
                  <PhoneOutlined className={style.signupPhoneIcon} />
                  <Input
                    placeholder="Phone Number"
                    className={style.signupPhoneInput}
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={14} span={24}>
              <Form.Item
                name="address"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: true,
                    message: (
                      <div className={style.message}>Please input address!</div>
                    ),
                  },
                ]}
              >
                <div className={style.inputField}>
                  <EnvironmentOutlined className={style.signupAddressIcon} />
                  <Input
                    placeholder="Address"
                    className={style.signupAddressInput}
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={10} span={24}>
              <Form.Item
                name="city"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: true,
                    message: (
                      <div className={style.message}>Please select city!</div>
                    ),
                  },
                ]}
              >
                <div className={style.inputField}>
                  <EnvironmentOutlined className={style.signupAddressIcon} />
                  <Select
                    className={style.signupAddressSelect}
                    options={[
                      {
                        value: '1',
                        label: 'TPHCM',
                      },
                      {
                        value: '2',
                        label: 'HN',
                      },
                    ]}
                    placeholder="Please select city"
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Button
              // loading={loginUser.isLoading}
              className={style.btnSignUp}
              htmlType="button"
              onClick={onClickPreviousInFormTwo}
              style={{ marginRight: 10 }}
            >
              Previous
            </Button>

            <Button
              // loading={loginUser.isLoading}
              className={style.btnSignUp}
              htmlType="button"
              onClick={onClickNextInFormTwo}
            >
              Next
            </Button>
          </Row>
        </div>

        <div ref={stepThreeRef} className={`${style.formStep}`}>
          <Row gutter={16}>
            <Col lg={12} span={24}>
              <Form.Item
                name="password"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: true,
                    message: (
                      <div className={style.message}>
                        Please input your password!
                      </div>
                    ),
                  },
                ]}
              >
                <div className={style.inputField}>
                  <LockOutlined className={style.signupLockIcon} />
                  <Input.Password
                    placeholder="Password"
                    className={style.signupPasswordInput}
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                name="passwordConfirm"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: true,
                    message: (
                      <div className={style.message}>
                        Please input password confirm!
                      </div>
                    ),
                  },
                ]}
              >
                <div className={style.inputField}>
                  <LockOutlined className={style.signupLockIcon} />
                  <Input.Password
                    placeholder="Confirm Password"
                    className={style.signupConfirmPasswordInput}
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Button
              // loading={loginUser.isLoading}
              className={style.btnSignUp}
              htmlType="button"
              onClick={onClickPreviousInFormThree}
              style={{ marginRight: 10 }}
            >
              Previous
            </Button>

            <Button
              // loading={loginUser.isLoading}
              className={style.btnSignUp}
              htmlType="button"
              onClick={onClickNextInFormThree}
            >
              Next
            </Button>
          </Row>
        </div>

        <div ref={stepFourRef} className={`${style.formStep}`}>
          <Row gutter={16}>
            <Col lg={14} span={24}>
              <Form.Item
                name="nameCompany"
                style={{ width: '100%' }}
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
                <div className={style.inputField}>
                  <InfoOutlined className={style.signupInfoIcon} />
                  <Input
                    placeholder="Name Company"
                    className={style.signupNameCompanyInput}
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={10} span={24}>
              <Form.Item
                name="phoneNumberCompany"
                style={{ width: '100%' }}
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
                <div className={style.inputField}>
                  <PhoneOutlined className={style.signupPhoneIcon} />
                  <Input
                    placeholder="Phone Number"
                    className={style.signupPhoneInput}
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={24} span={24}>
              <Form.Item
                name="emailCompany"
                style={{ width: '100%' }}
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
                <div className={style.inputField}>
                  <MailOutlined className={style.signupMailIcon} />
                  <Input
                    placeholder="Email Company"
                    className={style.signupEmailCompanyInput}
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={14} span={24}>
              <Form.Item
                name="addressCompany"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: true,
                    message: (
                      <div className={style.message}>Please input address!</div>
                    ),
                  },
                ]}
              >
                <div className={style.inputField}>
                  <EnvironmentOutlined className={style.signupAddressIcon} />
                  <Input
                    placeholder="Address"
                    className={style.signupAddressInput}
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={10} span={24}>
              <Form.Item
                name="city"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: true,
                    message: (
                      <div className={style.message}>Please select city!</div>
                    ),
                  },
                ]}
              >
                <div className={style.inputField}>
                  <EnvironmentOutlined className={style.signupAddressIcon} />
                  <Select
                    className={style.signupAddressSelect}
                    options={[
                      {
                        value: '1',
                        label: 'TPHCM',
                      },
                      {
                        value: '2',
                        label: 'HN',
                      },
                    ]}
                    placeholder="Please select city"
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={14} span={24}>
              <Form.Item
                name="taxCodeCompany"
                style={{ width: '100%' }}
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
                <div className={style.inputField}>
                  <BarcodeOutlined className={style.signupBarCodeIcon} />
                  <Input
                    placeholder="Tax Code Company"
                    className={style.signupTaxCodeInput}
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col lg={10} span={24}>
              <Form.Item
                name="role"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: true,
                    message: (
                      <div className={style.message}>Please select role!</div>
                    ),
                  },
                ]}
              >
                <div className={style.inputField}>
                  <TeamOutlined className={style.signupRoleIcon} />
                  <Select
                    className={style.signupRoleSelect}
                    options={[
                      {
                        value: '1',
                        label: 'Admin',
                      },
                      {
                        value: '2',
                        label: 'User',
                      },
                    ]}
                    placeholder="Please select role"
                    bordered={false}
                  />
                </div>
              </Form.Item>
            </Col>

            <Button
              // loading={loginUser.isLoading}
              className={style.btnSignUp}
              htmlType="button"
              onClick={onClickPreviousInFormFour}
              style={{ marginRight: 10 }}
            >
              Previous
            </Button>

            <Button
              // loading={loginUser.isLoading}
              className={style.btnSignUp}
              htmlType="submit"
            >
              Sign Up
            </Button>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default FormRegister;
