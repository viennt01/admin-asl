// import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
// import { ROUTERS } from '@/constant/router';
// import { appLocalStorage } from '@/utils/localstorage';
// import { useRouter } from 'next/router';
import { Button, Form, Input } from 'antd';
import {
  UserOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons';
import style from './login.module.scss';
import { LoginData, login } from './fetcher';
//import { API_MESSAGE } from '@/constant/message';
import { useMutation } from '@tanstack/react-query';
import { Player } from '@lottiefiles/react-lottie-player';
import { useState } from 'react';

// const initialValues: LoginData = {
//   username: '',
//   password: '',
//   ipAddress: 'string',
//   deviceName: 'string',
// };

export default function LoginPage() {
  // const router = useRouter();
  const [classActiveForm, setClassActiveForm] = useState('signinMode');
  // const [notiApi, contextHolder] = notification.useNotification();
  // const [ip, setIp] = useState();
  // const deviceName = navigator.userAgent;
  // const getIp = async () => {
  //   const response = await fetch('https://api.ipify.org/?format=json');
  //   const data = await response.json();
  //   setIp(data.ip);
  // };
  // const onFinish = (values: LoginData) => {
  //   if (!ip) {
  //     return;
  //   }
  //   const data = {
  //     username: values.username,
  //     password: values.password,
  //     ipAddress: ip,
  //     deviceName: deviceName,
  //   };
  //   appLocalStorage.set(LOCAL_STORAGE_KEYS.IP_ADDRESS, ip);
  //   appLocalStorage.set(LOCAL_STORAGE_KEYS.DEVICE_NAME, deviceName);

  //   loginUser.mutate(data, {
  //     onSuccess(data) {
  //       if (data.status) {
  //         appLocalStorage.set(LOCAL_STORAGE_KEYS.TOKEN, data.data.accessToken);
  //         appLocalStorage.set(
  //           LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
  //           data.data.refreshToken
  //         );
  //         router.push(ROUTERS.HOME);
  //       } else {
  //         notiApi.error({
  //           message: '',
  //           description: data.message,
  //           placement: 'topRight',
  //           duration: 3,
  //         });
  //       }
  //     },
  //     onError() {
  //       notiApi.error({
  //         message: '',
  //         description: API_MESSAGE.ERROR,
  //         placement: 'topRight',
  //         duration: 3,
  //       });
  //     },
  //   });
  // };
  // useEffect(() => {
  //   getIp();
  // }, []);

  const loginUser = useMutation({
    mutationFn: (body: LoginData) => {
      return login(body);
    },
  });

  function onClickAnimationChangeForm() {
    if (classActiveForm === 'signupMode') {
      setClassActiveForm('signinMode');
    } else {
      setClassActiveForm('signupMode');
    }
  }

  return (
    // <div className={style.container}>
    //   {contextHolder}
    //   <div className={style.circles}>
    //     <Image
    //       src="/images/Circles.png"
    //       alt="logo"
    //       preview={false}
    //       style={{ width: '100%' }}
    //     />
    //   </div>

    //   <div className={style.content}>
    //     <div className={style.cover}>
    //       <div className={style.circlesBottom}>
    //         <Image
    //           src="/images/CirclesBottom.png"
    //           alt="logo"
    //           preview={false}
    //           style={{ width: '100%' }}
    //         />
    //       </div>

    //       <div className={style.left}>
    //         <div
    //           style={{
    //             display: 'flex',
    //             justifyContent: 'left',
    //             alignItems: 'center',
    //             marginBottom: '32px',
    //             marginTop: '20px',
    //             cursor: 'pointer',
    //           }}
    //         >
    //           <Image
    //             src="/images/gls-logo.jpg"
    //             alt="logo"
    //             width={450}
    //             preview={false}
    //           />
    //         </div>

    //         <div
    //           style={{
    //             maxWidth: 500,
    //             marginLeft: '10%',
    //           }}
    //         >
    //           <Form
    //             name="basic"
    //             labelCol={{ span: 8 }}
    //             wrapperCol={{ span: 16 }}
    //             initialValues={initialValues}
    //             onFinish={onFinish}
    //             layout="vertical"
    //             requiredMark={false}
    //             autoComplete="off"
    //           >
    //             <Form.Item
    //               label={
    //                 <label
    //                   style={{
    //                     color: '#00a651',
    //                     fontWeight: 'bold',
    //                     fontSize: '16px',
    //                   }}
    //                 >
    //                   Username
    //                 </label>
    //               }
    //               name="username"
    //               rules={[
    //                 { required: true, message: 'Please input your username!' },
    //               ]}
    //             >
    //               <Input
    //                 placeholder="Enter your username"
    //                 style={{
    //                   borderColor: '#00a651',
    //                   height: '40px',
    //                   width: '120%',
    //                 }}
    //               />
    //             </Form.Item>

    //             <Form.Item
    //               label={
    //                 <label
    //                   style={{
    //                     color: '#00a651',
    //                     fontWeight: 'bold',
    //                     fontSize: '16px',
    //                   }}
    //                 >
    //                   Password
    //                 </label>
    //               }
    //               name="password"
    //               style={{
    //                 marginTop: '30px',
    //               }}
    //               rules={[
    //                 { required: true, message: 'Please input your password!' },
    //               ]}
    //             >
    //               <Input.Password
    //                 placeholder="Enter your password"
    //                 style={{
    //                   borderColor: '#00a651',
    //                   height: '40px',
    //                   width: '120%',
    //                   // marginBottom: '10px',
    //                 }}
    //               />
    //             </Form.Item>

    //             <Space
    //               size={55}
    //               style={{
    //                 display: 'flex',
    //                 alignItems: 'center',
    //                 marginBottom: '15px',
    //                 marginTop: '30px',
    //               }}
    //             >
    //               <Form.Item
    //                 name="remember"
    //                 valuePropName="checked"
    //                 style={{
    //                   marginBottom: 'unset',
    //                 }}
    //               >
    //                 <ConfigProvider
    //                   theme={{
    //                     components: {
    //                       Checkbox: {
    //                         colorPrimary: '#00a651',
    //                         colorPrimaryHover: '#00a651',
    //                       },
    //                     },
    //                   }}
    //                 >
    //                   <Checkbox
    //                     style={{
    //                       width: '150px',
    //                     }}
    //                   >
    //                     Remember me
    //                   </Checkbox>
    //                 </ConfigProvider>
    //               </Form.Item>

    //               <a
    //                 href=""
    //                 style={{
    //                   fontSize: '14px',
    //                   color: 'red',
    //                   fontWeight: 'bold',
    //                   marginBottom: '10px',
    //                 }}
    //               >
    //                 Forgot password?
    //               </a>
    //             </Space>

    //             <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
    //               <ConfigProvider
    //                 theme={{
    //                   components: {
    //                     Button: {
    //                       colorPrimary: '#00a651',
    //                       colorPrimaryHover: '#00a651',
    //                     },
    //                   },
    //                 }}
    //               >
    //                 <Button
    //                   loading={loginUser.isLoading}
    //                   type="primary"
    //                   style={{
    //                     height: '40px',
    //                     width: '120%',
    //                     fontSize: '18px',
    //                     fontWeight: 'bold',
    //                     boxShadow:
    //                       'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    //                   }}
    //                   htmlType="submit"
    //                 >
    //                   Login
    //                 </Button>
    //               </ConfigProvider>
    //             </Form.Item>
    //           </Form>
    //         </div>
    //       </div>
    //       <div className={style.right}>
    //         <div className={style.img__cover__print}>
    //           <Image
    //             className={style.img__print}
    //             src="/images/print.png"
    //             alt="logo"
    //             width={320}
    //             preview={false}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div
      className={`${style.bodyContainer} ${
        classActiveForm === 'signinMode' ? style.signinMode : style.signupMode
      }`}
    >
      {/* {contextHolder} */}
      <div className={style.formsContainer}>
        <div className={style.signinSignup}>
          <Form className={style.signinForm}>
            <h2 className={style.titleSignIn}>Sign in</h2>
            <div className={style.inputField}>
              <MailOutlined className={style.signinMailIcon} />
              <Input placeholder="Email" className={style.signinEmailInput} />
              <CheckCircleOutlined className={style.signinEmailIconCheck} />
              <ExclamationCircleOutlined
                className={style.signinEmailIconError}
              />
            </div>
            <div className={style.message}>
              <span></span>
            </div>
            <div className={style.inputField}>
              <LockOutlined className={style.signinLockIcon} />
              <Input.Password
                placeholder="Password"
                className={style.signinPasswordInput}
              />
              <CheckCircleOutlined className={style.signinPasswordIconCheck} />
              <ExclamationCircleOutlined
                className={style.signinPasswordIconError}
              />
            </div>
            <div className={style.message}>
              <span></span>
            </div>
            <div className={style.loginOptions}>
              <div>
                <a href="" className={style.forgotFieldLink}>
                  Forgot password
                </a>
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
            <h2 className={style.titleSignup}>Sign up</h2>
            <div className={style.inputField}>
              <UserOutlined className={style.signupUserIcon} />
              <Input
                placeholder="Full Name"
                className={style.signupFullNameInput}
              />
              <CheckCircleOutlined className={style.signupFullnameIconCheck} />
              <ExclamationCircleOutlined
                className={style.signupFullnameIconError}
              />
            </div>
            <div className="message">
              <span></span>
            </div>
            <div className={style.inputField}>
              <MailOutlined className={style.signupMailIcon} />
              <Input placeholder="Email" className={style.signupMailInput} />
              <CheckCircleOutlined className={style.signupEmailIconCheck} />
              <ExclamationCircleOutlined
                className={style.signupEmailIconError}
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
              />
              <CheckCircleOutlined className={style.signupPasswordIconCheck} />
              <ExclamationCircleOutlined
                className={style.signupPasswordIconError}
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
              />
              <CheckCircleOutlined className={style.confirmPasswordIconCheck} />
              <ExclamationCircleOutlined
                className={style.confirmPasswordIconError}
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
            <p>Create an account to explore more about Fresh Tooth!</p>
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
          <div className={style.content}>
            <h3>Already have an account ?</h3>
            <p>Sign in and visit Fresh Tooth Website! Let&apos;s Go!</p>
            <button
              onClick={onClickAnimationChangeForm}
              className={style.btnPanelSignIn}
            >
              Sign in
            </button>
          </div>
          <Player
            src="https://lottie.host/d495397f-b342-48f8-86cf-b0cbfe74c64a/ySNVoXDcwV.json"
            className={style.image}
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
}
