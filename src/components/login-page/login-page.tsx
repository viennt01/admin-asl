import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { ROUTERS } from '@/constant/router';
import { appLocalStorage } from '@/utils/localstorage';
import { useRouter } from 'next/router';
import {
  Button,
  Form,
  Input,
  notification,
  Image,
  Checkbox,
  ConfigProvider,
  Space,
} from 'antd';
import style from './login.module.scss';
import { LoginData, login } from './fetcher';
import { API_MESSAGE } from '@/constant/message';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
const initialValues: LoginData = {
  email: '',
  password: '',
};

export default function LoginPage() {
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
    if (!ip) {
      return;
    }
    const data = {
      email: values.email,
      password: values.password,
    };
    // appLocalStorage.set(LOCAL_STORAGE_KEYS.IP_ADDRESS, ip);
    // appLocalStorage.set(LOCAL_STORAGE_KEYS.DEVICE_NAME, deviceName);

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
  useEffect(() => {
    getIp();
  }, []);

  const loginUser = useMutation({
    mutationFn: (data: LoginData) => {
      return login(data, dataHeader);
    },
  });

  return (
    <div className={style.container}>
      {contextHolder}
      <div className={style.circles}>
        <Image
          src="/images/Circles.png"
          alt="logo"
          preview={false}
          style={{ width: '100%' }}
        />
      </div>

      <div className={style.content}>
        <div className={style.cover}>
          <div className={style.circlesBottom}>
            <Image
              src="/images/CirclesBottom.png"
              alt="logo"
              preview={false}
              style={{ width: '100%' }}
            />
          </div>

          <div className={style.left}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                marginBottom: '32px',
                marginTop: '20px',
                cursor: 'pointer',
              }}
            >
              <Image
                src="/images/gls-logo.jpg"
                alt="logo"
                width={450}
                preview={false}
              />
            </div>

            <div
              style={{
                maxWidth: 500,
                marginLeft: '10%',
              }}
            >
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={initialValues}
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
                autoComplete="off"
              >
                <Form.Item
                  label={
                    <label
                      style={{
                        color: '#00a651',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}
                    >
                      Username
                    </label>
                  }
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input
                    placeholder="Enter your username"
                    style={{
                      borderColor: '#00a651',
                      height: '40px',
                      width: '120%',
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <label
                      style={{
                        color: '#00a651',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}
                    >
                      Password
                    </label>
                  }
                  name="password"
                  style={{
                    marginTop: '30px',
                  }}
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    style={{
                      borderColor: '#00a651',
                      height: '40px',
                      width: '120%',
                      // marginBottom: '10px',
                    }}
                  />
                </Form.Item>

                <Space
                  size={55}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px',
                    marginTop: '30px',
                  }}
                >
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    style={{
                      marginBottom: 'unset',
                    }}
                  >
                    <ConfigProvider
                      theme={{
                        components: {
                          Checkbox: {
                            colorPrimary: '#00a651',
                            colorPrimaryHover: '#00a651',
                          },
                        },
                      }}
                    >
                      <Checkbox
                        style={{
                          width: '150px',
                        }}
                      >
                        Remember me
                      </Checkbox>
                    </ConfigProvider>
                  </Form.Item>

                  <a
                    href=""
                    style={{
                      fontSize: '14px',
                      color: 'red',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                    }}
                  >
                    Forgot password?
                  </a>
                </Space>

                <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimary: '#00a651',
                          colorPrimaryHover: '#00a651',
                        },
                      },
                    }}
                  >
                    <Button
                      loading={loginUser.isLoading}
                      type="primary"
                      style={{
                        height: '40px',
                        width: '120%',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        boxShadow:
                          'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                      }}
                      htmlType="submit"
                    >
                      Login
                    </Button>
                  </ConfigProvider>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.img__cover__print}>
              <Image
                className={style.img__print}
                src="/images/print.png"
                alt="logo"
                width={320}
                preview={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
