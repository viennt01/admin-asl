import { ROUTERS } from '@/constant/router';
import { Button, Form, FormInstance, Input } from 'antd';
import Link from 'next/link';
import style from '../../login.module.scss';
import { activeAccount, login } from '../../fetcher';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { LoginData } from '../../interface';
import { errorToast } from '@/hook/toast';

interface LoginProps {
  formLogin: FormInstance;
}

const initialValues: LoginData = {
  email: '',
  password: '',
};

const FormLogin = ({ formLogin }: LoginProps) => {
  const router = useRouter();
  const { email } = router.query;
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

    if (email) {
      const dataActiveAccount = {
        email: email as string,
      };
      activeAccount(dataActiveAccount)
        .then((payload) => {
          if (!payload.status) {
            errorToast(API_MESSAGE.ERROR);
            return;
          }
        })
        .catch(() => errorToast(API_MESSAGE.ERROR));
    }

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
          errorToast(data.message);
        }
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
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
      <div
        className={style.signinForm}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link href={ROUTERS.LOGIN}>
          <img src="/images/logo_ASL.png" alt="" className={style.signinLogo} />
        </Link>

        <Form
          form={formLogin}
          name="formLogin"
          initialValues={initialValues}
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
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
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 'bold',
                    }}
                  >
                    Please input your email!
                  </div>
                ),
              },
            ]}
          >
            <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: (
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 'bold',
                    }}
                  >
                    Please input your password!
                  </div>
                ),
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Password"
            />
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
            style={{ width: '100%', marginTop: '15px' }}
          >
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default FormLogin;
