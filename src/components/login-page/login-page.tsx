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
import { ERROR_CODE } from '@/constant/error-code';
import { API_MESSAGE } from '@/constant/message';
import { headers } from '@/fetcher/utils';

const initialValues: LoginData = {
  username: '',
  password: '',
};

// const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const [notiApi, contextHolder] = notification.useNotification();
  const onFinish = (values: LoginData) => {
    headers.setToken('res.payload');
    appLocalStorage.set(LOCAL_STORAGE_KEYS.TOKEN, 'res.payload');
    router.push(ROUTERS.HOME);
    return;
    const data: LoginData = values;
    login(data)
      .then((res) => {
        if (res.error_code === ERROR_CODE.SUCCESS) {
          headers.setToken(res.payload);
          appLocalStorage.set(LOCAL_STORAGE_KEYS.TOKEN, res.payload);
          router.push(ROUTERS.HOME);
        }
      })
      .catch((err) => {
        const res = JSON.parse(err.message);
        if (res.error_code === ERROR_CODE.INCORRECT) {
          notiApi.error({
            message: '',
            description: res.message,
            placement: 'topRight',
            duration: 3,
          });
          return;
        }
        notiApi.error({
          message: '',
          description: API_MESSAGE.ERROR,
          placement: 'topRight',
          duration: 3,
        });
      });
  };

  return (
    <div className={style.container}>
      {contextHolder}
      <div className={style.content}>
        <div className={style.cover}>
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
                  name="username"
                  colon={false}
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input
                    placeholder="Please input your username"
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
                    placeholder="Please input your password"
                    style={{
                      borderColor: '#00a651',
                      height: '40px',
                      width: '120%',
                      // marginBottom: '10px',
                    }}
                  />
                </Form.Item>

                <Space size={35}>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    style={{ display: 'flex', alignItems: 'center' }}
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
                          marginTop: '15px',
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
                      type="primary"
                      style={{ height: '40px', width: '120%' }}
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
