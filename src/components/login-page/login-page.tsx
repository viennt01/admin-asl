import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { ROUTERS } from '@/constant/router';
import { appLocalStorage } from '@/utils/localstorage';
import { useRouter } from 'next/router';
import { Button, Form, Input, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import style from './login.module.scss';
import { LoginData, login } from './fetcher';
import { API_MESSAGE } from '@/constant/message';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
              style={{ marginBottom: '15px', width: '150px' }}
            />
            <div className={style.titleSignIn}>
              <h2>Sign in</h2>
              <h2>Sign in</h2>
            </div>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: (
                    <div className={style.message}>
                      Please input your Email!
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
              rules={[
                {
                  required: true,
                  message: (
                    <div className={style.message}>
                      Please input your Email!
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

              <div className={style.progressStep} data-title="Info"></div>
              <div className={style.progressStep} data-title="Contact"></div>
              <div className={style.progressStep} data-title="Password"></div>
              <div className={style.progressStep} data-title="Company"></div>
            </div>
            <div className={style.inputField}>
              <UserOutlined className={style.signupUserIcon} />
              <Input
                placeholder="Full Name"
                className={style.signupFullNameInput}
                bordered={false}
              />
            </div>
            <div className="message">
              <span></span>
            </div>
            <div className={style.inputField}>
              <MailOutlined className={style.signupMailIcon} />
              <Input
                placeholder="Email"
                className={style.signupMailInput}
                bordered={false}
              />
            </div>
            <div className="message">
              <span></span>
            </div>
            <div className={style.inputField}>
              <LockOutlined className={style.signupLockIcon} />
              <Input.Password
                placeholder="Password"
                className={style.signupPasswordInput}
                bordered={false}
              />
            </div>
            <div className="message">
              <span></span>
            </div>
            <div className={style.inputField}>
              <LockOutlined className={style.signupLockIcon} />
              <Input.Password
                placeholder="Confirm Password"
                className={style.signupConfirmPasswordInput}
                bordered={false}
              />
            </div>
            <div className="message">
              <span></span>
            </div>
            <Button
              loading={loginUser.isLoading}
              className={style.btnSignUp}
              htmlType="submit"
            >
              Sign Up
            </Button>
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
