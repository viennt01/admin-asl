import { Layout, Image, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { errorToast } from '@/hook/toast';
import style from './confirm-otp.module.scss';
import { useState } from 'react';
import { API_MESSAGE } from '@/constant/message';
import { ROUTERS } from '@/constant/router';
import Link from 'next/link';
import CustomCard from '../commons/custom-card';
import { useRouter } from 'next/router';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { ConfirmOtpData } from './interface';
import { ConfirmOtpFetch } from './fetcher';

const { Content } = Layout;

const initialValuesVerifyOtp: ConfirmOtpData = {
  email: '',
  otpCode: '',
};

export default function ConfirmOtp() {
  const [isLoadingConfirmOtp, setIsLoadingConfirmOtp] = useState(false);
  const router = useRouter();
  const { email, ipAddress, deviceName } = router.query;

  const handleSubmitVerifyOtp = (values: ConfirmOtpData) => {
    setIsLoadingConfirmOtp(true);
    const data = {
      otpCode: values.otpCode,
      email: (email as string) || '',
    };
    const header = {
      deviceName: (deviceName as string) || '',
      ipAddress: (ipAddress as string) || '',
    };
    ConfirmOtpFetch(data, header)
      .then((res) => {
        if (res.status) {
          appLocalStorage.set(LOCAL_STORAGE_KEYS.TOKEN, res.data.accessToken);
          appLocalStorage.set(
            LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
            res.data.refreshToken
          );
          router.push(ROUTERS.HOME);
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

  return (
    <Layout className={style.layoutForgotPassword}>
      <div className={style.colorBackdrop}></div>
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
            <Link href={ROUTERS.LOGIN}>
              <Image
                src="/images/logo_ASL.png"
                alt="logo"
                width={180}
                preview={false}
              />
            </Link>
          </div>
          <div className={style.titleForgotPassword}>
            <h2>CONFIRM OTP</h2>
            <h2>CONFIRM OTP</h2>
          </div>

          <Form
            onFinish={handleSubmitVerifyOtp}
            initialValues={initialValuesVerifyOtp}
          >
            <Form.Item
              name="otpCode"
              rules={[
                {
                  required: true,
                  message: 'Please input your OTP!',
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
              style={{ width: '100%', marginTop: '15px' }}
              loading={isLoadingConfirmOtp}
            >
              CONFIRM OTP
            </Button>
          </Form>
        </CustomCard>
      </Content>
    </Layout>
  );
}
