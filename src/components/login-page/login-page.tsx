import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { ROUTERS } from '@/constant/router';
import { appLocalStorage } from '@/utils/localstorage';
import { useRouter } from 'next/router';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  notification,
  Select,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  CalendarOutlined,
  ManOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  InfoOutlined,
  BarcodeOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import style from './login.module.scss';
import { LoginData, login } from './fetcher';
import { API_MESSAGE } from '@/constant/message';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';

const initialValues: LoginData = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const router = useRouter();
  const [classActiveForm, setClassActiveForm] = useState('signinMode');
  const [notiApi, contextHolder] = notification.useNotification();
  const [ip, setIp] = useState();
  const stepOneRef = useRef<HTMLDivElement>(null);
  const stepTwoRef = useRef<HTMLDivElement>(null);
  const stepThreeRef = useRef<HTMLDivElement>(null);
  const stepFourRef = useRef<HTMLDivElement>(null);
  const stepLineOneRef = useRef<HTMLDivElement>(null);
  const stepLineTwoRef = useRef<HTMLDivElement>(null);
  const stepLineThreeRef = useRef<HTMLDivElement>(null);
  const stepLineFourRef = useRef<HTMLDivElement>(null);
  const deviceName = navigator.userAgent;
  const getIp = async () => {
    const response = await fetch('https://api.ipify.org/?format=json');
    const data = await response.json();
    setIp(data.ip);
  };

  const dataHeader = {
    ipAddress: ip || '',
    deviceName: deviceName,
  };

  const onFinish = (values: LoginData) => {
    if (!ip) {
      return;
    }
    const data = {
      email: values.email,
      password: values.password,
    };
    appLocalStorage.set(LOCAL_STORAGE_KEYS.IP_ADDRESS, ip);
    appLocalStorage.set(LOCAL_STORAGE_KEYS.DEVICE_NAME, deviceName);

    loginUser.mutate(data, {
      onSuccess(data) {
        if (data.status) {
          appLocalStorage.set(LOCAL_STORAGE_KEYS.TOKEN, data.data.accessToken);
          appLocalStorage.set(
            LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
            data.data.refreshToken
          );
          router.push(ROUTERS.HOME);
        } else {
          notiApi.error({
            message: '',
            description: data.message,
            placement: 'topRight',
            duration: 3,
          });
        }
      },
      onError() {
        notiApi.error({
          message: '',
          description: API_MESSAGE.ERROR,
          placement: 'topRight',
          duration: 3,
        });
      },
    });
  };

  const loginUser = useMutation({
    mutationFn: (data: LoginData) => {
      return login(data, dataHeader);
    },
  });

  function onClickAnimationChangeForm() {
    if (classActiveForm === 'signupMode') {
      setClassActiveForm('signinMode');
    } else {
      setClassActiveForm('signupMode');
    }
  }

  useEffect(() => {
    getIp();
  }, []);

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

  return (
    <div
      className={`${style.bodyContainer} ${
        classActiveForm === 'signinMode' ? style.signinMode : style.signupMode
      }`}
    >
      <div className={style.colorBackdrop}></div>
      {contextHolder}
      <div className={style.formsContainer}>
        <div className={style.signinSignup}>
          <Form
            className={style.signinForm}
            name="basic"
            initialValues={initialValues}
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
            autoComplete="off"
          >
            <img
              src="/images/logo_ASL.png"
              alt=""
              style={{ marginBottom: '15px', width: '180px' }}
            />
            <div className={style.titleSignIn}>
              <h2>Sign in</h2>
              <h2>Sign in</h2>
            </div>
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
                <MailOutlined className={style.signinMailIcon} />
                <Input
                  placeholder="Email"
                  className={style.signinEmailInput}
                  bordered={false}
                />
              </div>
            </Form.Item>
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
                <LockOutlined className={style.signinLockIcon} />
                <Input.Password
                  placeholder="Password"
                  className={style.signinPasswordInput}
                  bordered={false}
                />
              </div>
            </Form.Item>

            <div className={style.loginOptions}>
              <div>
                <Link
                  href={ROUTERS.FORGOT_PASSWORD}
                  className={style.forgotFieldLink}
                >
                  Forgot password ?
                </Link>
              </div>
            </div>
            <Button
              loading={loginUser.isLoading}
              className={style.btnLogin}
              htmlType="submit"
            >
              Login
            </Button>
          </Form>

          <Form className={style.signupForm}>
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
                          <div className={style.message}>
                            Please select gender!
                          </div>
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
                  loading={loginUser.isLoading}
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
                          <div className={style.message}>
                            Please input address!
                          </div>
                        ),
                      },
                    ]}
                  >
                    <div className={style.inputField}>
                      <EnvironmentOutlined
                        className={style.signupAddressIcon}
                      />
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
                          <div className={style.message}>
                            Please select city!
                          </div>
                        ),
                      },
                    ]}
                  >
                    <div className={style.inputField}>
                      <EnvironmentOutlined
                        className={style.signupAddressIcon}
                      />
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
                  loading={loginUser.isLoading}
                  className={style.btnSignUp}
                  htmlType="button"
                  onClick={onClickPreviousInFormTwo}
                  style={{ marginRight: 10 }}
                >
                  Previous
                </Button>

                <Button
                  loading={loginUser.isLoading}
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
                  loading={loginUser.isLoading}
                  className={style.btnSignUp}
                  htmlType="button"
                  onClick={onClickPreviousInFormThree}
                  style={{ marginRight: 10 }}
                >
                  Previous
                </Button>

                <Button
                  loading={loginUser.isLoading}
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
                          <div className={style.message}>
                            Please input address!
                          </div>
                        ),
                      },
                    ]}
                  >
                    <div className={style.inputField}>
                      <EnvironmentOutlined
                        className={style.signupAddressIcon}
                      />
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
                          <div className={style.message}>
                            Please select city!
                          </div>
                        ),
                      },
                    ]}
                  >
                    <div className={style.inputField}>
                      <EnvironmentOutlined
                        className={style.signupAddressIcon}
                      />
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
                          <div className={style.message}>
                            Please select role!
                          </div>
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
                  loading={loginUser.isLoading}
                  className={style.btnSignUp}
                  htmlType="button"
                  onClick={onClickPreviousInFormFour}
                  style={{ marginRight: 10 }}
                >
                  Previous
                </Button>

                <Button
                  loading={loginUser.isLoading}
                  className={style.btnSignUp}
                  htmlType="submit"
                >
                  Sign Up
                </Button>
              </Row>
            </div>
          </Form>
        </div>
      </div>
      <div className={style.panelsContainer}>
        <div className={style.leftPanel}>
          <div className={style.content}>
            <h3>Do not have an account ?</h3>
            <p>Create an account to explore more about ASL!</p>
            <button
              onClick={onClickAnimationChangeForm}
              className={style.btnPanelSignUp}
            >
              Sign up
            </button>
          </div>
          <Player
            src="https://lottie.host/2de98eed-b8d9-4fce-ba6b-8e7a3cc64e03/zDqQl136LV.json"
            className={style.image}
            loop
            autoplay
          />
        </div>

        <div className={style.rightPanel}>
          <Player
            src="https://lottie.host/d495397f-b342-48f8-86cf-b0cbfe74c64a/ySNVoXDcwV.json"
            className={style.image}
            loop
            autoplay
          />
          <div className={style.content}>
            <h3>Already have an account ?</h3>
            <p>Sign in and visit ASL Website! Let&apos;s Go!</p>
            <button
              onClick={onClickAnimationChangeForm}
              className={style.btnPanelSignIn}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
