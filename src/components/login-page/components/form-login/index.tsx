import { ROUTERS } from '@/constant/router';
import { Button, Form, Input, notification } from 'antd';
import Link from 'next/link';
import style from '../../login.module.scss';
import { LoginData, login } from '../../fetcher';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
const initialValues: LoginData = {
  email: '',
  password: '',
};

const FormLogin = () => {
  const router = useRouter();
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
    console.log(ip);

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
  useEffect(() => {
    getIp();
  }, []);
  return (
    <>
      {contextHolder}
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
                <div className={style.message}>Please input your email!</div>
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
                <div className={style.message}>Please input your password!</div>
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
    </>
  );
};

export default FormLogin;
