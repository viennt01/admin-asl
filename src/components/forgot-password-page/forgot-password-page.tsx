import { Layout, Image, Form, Input, Button } from 'antd';
import CustomCard from '../commons/CustomCard';
import { UserOutlined } from '@ant-design/icons';
import { errorToast, successToast } from '@/hook/toast';
import style from './login.module.scss';
import { resetPassword, sendOtp, sendVerifyOtp } from './fetcher';
import { useState } from 'react';
import { API_MESSAGE } from '@/constant/message';
import {
  LAYOUT_TYPE,
  SendOtpData,
  SendResetPasswordData,
  SendVerifyOtpData,
} from './interface';
import { useRouter } from 'next/router';
import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';

const { Content } = Layout;

const initialValuesSendOtp: SendOtpData = {
  email: '',
};

const initialValuesVerifyOtp: SendVerifyOtpData = {
  email: '',
  otpCode: '',
};

const initialValuesResetPassword: SendResetPasswordData = {
  Email: '',
  Password: '',
  ComfirmPassword: '',
};

export default function ForgotPasswordPage() {
  const [isLoadingSendOtp, setIsLoadingSendOtp] = useState(false);
  const [isLoadingConfirmOtp, setIsLoadingConfirmOtp] = useState(false);
  const [isLoadingResetPassword, setIsLoadingResetPassword] = useState(false);
  const [isLayout, setIsLayout] = useState<LAYOUT_TYPE>(LAYOUT_TYPE.SEND_OTP);
  const [isEmail, setIsEmail] = useState<string>('');
  const router = useRouter();
  const { translate: translateResetPassword } = useI18n('forgot-password');

  const handleSubmitSendOtp = (values: SendOtpData) => {
    setIsLoadingSendOtp(true);
    setIsEmail(values.email);
    const data = new FormData();
    data.append('email', values.email);
    sendOtp(data)
      .then((res) => {
        if (res.status) {
          successToast(res.message);
          setIsLayout(LAYOUT_TYPE.CONFIRM_OTP);
          setIsLoadingSendOtp(false);
          return;
        } else {
          errorToast(res.message);
          setIsLoadingSendOtp(false);
          return;
        }
      })
      .catch(() => {
        errorToast(API_MESSAGE.ERROR);
        setIsLoadingSendOtp(false);
      });
  };

  const handleSubmitVerifyOtp = (values: SendVerifyOtpData) => {
    setIsLoadingConfirmOtp(true);
    const data = {
      otpCode: values.otpCode,
      email: isEmail,
    };
    sendVerifyOtp(data)
      .then((res) => {
        if (res.status) {
          successToast(res.message);
          setIsLayout(LAYOUT_TYPE.RESET_PASSWORD);
          setIsLoadingConfirmOtp(false);
          return;
        } else {
          errorToast(res.message);
          setIsLoadingConfirmOtp(false);
          return;
        }
      })
      .catch(() => {
        errorToast(API_MESSAGE.ERROR);
        setIsLoadingConfirmOtp(false);
      });
  };

  const handleSubmitResetPassword = (values: SendResetPasswordData) => {
    setIsLoadingResetPassword(true);
    const data = new FormData();
    data.append('Email', isEmail);
    data.append('Password', values.Password);
    data.append('ComfirmPassword', values.ComfirmPassword);
    resetPassword(data)
      .then((res) => {
        if (res.status) {
          successToast(res.message);
          setIsLoadingResetPassword(false);
          router.push(ROUTERS.LOGIN);
          return;
        } else {
          errorToast(res.message);
          setIsLoadingResetPassword(false);
          return;
        }
      })
      .catch(() => {
        errorToast(API_MESSAGE.ERROR);
        setIsLoadingResetPassword(false);
      });
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Content
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CustomCard
          style={{
            maxWidth: 480,
            width: '100%',
            margin: 24,
            boxShadow: 'none',
            border: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '24px',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <Image
              src="/images/logo_ASL.png"
              alt="logo"
              width={140}
              height={120}
            />
          </div>
          <div className={style.titleForgotPassword}>
            <h2>{translateResetPassword('title')}</h2>
            <h2>{translateResetPassword('title')}</h2>
          </div>
          {isLayout === LAYOUT_TYPE.SEND_OTP ? (
            <Form
              onFinish={handleSubmitSendOtp}
              initialValues={initialValuesSendOtp}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: `${translateResetPassword(
                      'form-send-otp.errors'
                    )}`,
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Email"
                />
              </Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={isLoadingSendOtp}
              >
                {translateResetPassword('button_send_otp')}
              </Button>
            </Form>
          ) : isLayout === LAYOUT_TYPE.CONFIRM_OTP ? (
            <Form
              onFinish={handleSubmitVerifyOtp}
              initialValues={initialValuesVerifyOtp}
            >
              <Form.Item
                name="otpCode"
                rules={[
                  {
                    required: true,
                    message: `${translateResetPassword(
                      'form-confirm-otp.errors'
                    )}`,
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="OTP Code"
                />
              </Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={isLoadingConfirmOtp}
              >
                {translateResetPassword('button_confirm_otp')}
              </Button>
            </Form>
          ) : (
            <Form
              onFinish={handleSubmitResetPassword}
              initialValues={initialValuesResetPassword}
            >
              <Form.Item
                name="Password"
                rules={[
                  {
                    required: true,
                    message: `${translateResetPassword(
                      'form-set-password.new-password-message-1'
                    )}`,
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*(),.~/?=|;:'"{}<>]{8,}/,
                    message: `${translateResetPassword(
                      'form-set-password.new-password-message-2'
                    )}`,
                  },
                ]}
                required={false}
                hasFeedback
                style={{ marginBottom: 24 }}
              >
                <Input
                  size="large"
                  type="password"
                  placeholder={`${translateResetPassword(
                    'form-set-password.placeholder-password'
                  )}`}
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item
                name="ComfirmPassword"
                rules={[
                  {
                    required: true,
                    message: `${translateResetPassword(
                      'form-set-password.new-password-message-1'
                    )}`,
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*(),.~/?=|;:'"{}<>]{8,}/,
                    message: `${translateResetPassword(
                      'form-set-password.new-password-message-2'
                    )}`,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('Password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          `${translateResetPassword(
                            'form-set-password.errors-password'
                          )}`
                        )
                      );
                    },
                  }),
                ]}
                required={false}
                hasFeedback
                style={{ marginBottom: 24 }}
              >
                <Input
                  size="large"
                  type="password"
                  placeholder={`${translateResetPassword(
                    'form-set-password.placeholder-password'
                  )}`}
                  autoComplete="off"
                />
              </Form.Item>

              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={isLoadingResetPassword}
              >
                {translateResetPassword('button_request_password')}
              </Button>
            </Form>
          )}
        </CustomCard>
      </Content>
    </Layout>
  );
}
