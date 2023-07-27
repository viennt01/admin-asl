import style from './login.module.scss';
import { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import FormLogin from './components/form-login';
import FormRegister from './components/form-register';
import { Form } from 'antd';
import {
  CompanyForm,
  ContactForm,
  DataGender,
  DataRole,
  InformationForm,
  PasswordForm,
} from './interface';
import { listGender, listRole } from './fetcher';

export default function LoginPage() {
  const [classActiveForm, setClassActiveForm] = useState('signinMode');
  const [formInformation] = Form.useForm<InformationForm>();
  const [formContact] = Form.useForm<ContactForm>();
  const [formPassword] = Form.useForm<PasswordForm>();
  const [formCompany] = Form.useForm<CompanyForm>();
  const [formLogin] = Form.useForm();
  const [genderOptions, setGenderOptions] = useState<DataGender[]>([]);
  const [roleOptions, setRoleOptions] = useState<DataRole[]>([]);

  function onClickAnimationChangeForm() {
    formInformation.resetFields();
    formContact.resetFields();
    formPassword.resetFields();
    formCompany.resetFields();
    formLogin.resetFields();
    if (classActiveForm === 'signupMode') {
      setClassActiveForm('signinMode');
    } else {
      setClassActiveForm('signupMode');
    }
  }

  useEffect(() => {
    listRole()
      .then((res) => {
        if (res.status) {
          setRoleOptions(
            res.data.map((item: DataRole) => ({
              name: item.name,
              roleID: item.roleID,
            }))
          );
        }
      })
      .catch((e: Error) => console.log(e));
    listGender()
      .then((res) => {
        if (res.status) {
          setGenderOptions(
            res.data.map((item: DataGender) => ({
              name: item.name,
              genderID: item.genderID,
            }))
          );
        }
      })
      .catch((e: Error) => console.log(e));
  }, []);

  return (
    <div
      className={`${style.bodyContainer} ${
        classActiveForm === 'signinMode' ? style.signinMode : style.signupMode
      }`}
    >
      <div className={style.colorBackdrop}></div>
      <div className={style.formsContainer}>
        <div className={style.signinSignup}>
          <FormLogin formLogin={formLogin} />
          <div className={style.signupForm}>
            <FormRegister
              formInformation={formInformation}
              formContact={formContact}
              formPassword={formPassword}
              formCompany={formCompany}
              onClickAnimationChangeForm={onClickAnimationChangeForm}
              genderOptions={genderOptions}
              roleOptions={roleOptions}
            />
          </div>
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
