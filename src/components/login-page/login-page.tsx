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
  Typography,
  Card,
} from 'antd';
import style from './login.module.scss';
import { LoginData, login } from './fetcher';
import { ERROR_CODE } from '@/constant/error-code';
import { API_MESSAGE } from '@/constant/message';
import { headers } from '@/fetcher/utils';

const initialValues: LoginData = {
  email: '',
  password: '',
};

const { Title } = Typography;

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
      <Card className={style.content} bordered={false}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '32px',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <Image
            src="/images/gls-logo.svg"
            alt="logo"
            width={60}
            height={60}
            preview={false}
          />
          <Title level={2} style={{ fontWeight: 'bold', margin: 0 }}>
            GLS ADMIN
          </Title>
        </div>
        <Form
          name="basic"
          initialValues={initialValues}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          autoComplete="off"
          size="large"
          labelAlign="left"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Button block type="primary" size="large" htmlType="submit">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
