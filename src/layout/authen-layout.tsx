import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import AppSider from './components/app-sider';
import AuthenLayout from './authen-layout.module.scss';
import {
  Avatar,
  Breadcrumb,
  Layout,
  Space,
  Typography,
  Button,
  FloatButton,
} from 'antd';
import {
  UserOutlined,
  MenuOutlined,
  CaretDownOutlined,
  LockOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { LANGUAGE, useLocale } from '@/constant';
// import Link from 'next/link';
import { ROUTERS } from '@/constant/router';
// import useI18n from '@/i18n/useI18N';
import {
  UserInfo,
  getListCity,
  getListCountry,
  getListTypeLocations,
  getUserInfo,
} from './fetcher';
import { useQuery } from '@tanstack/react-query';
import {
  API_LOCATION_TYPE,
  API_MASTER_DATA,
  API_USER,
} from '@/fetcherAxios/endpoint';
import SHOW_ROUTER_HEADER from './constant';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;
export const HEADER_HEIGHT = 64;
export const FOOTER_HEIGHT = 38;
const WIDTH_FLAG = 36;

interface Props {
  children: React.ReactNode;
}

const items = [
  { value: '/images/EN.png', label: 'English', key: LANGUAGE.EN },
  { value: '/images/VN.png', label: 'Vietnamese', key: LANGUAGE.VN },
];

interface SelectLanguage {
  languageSelected: string;
  languageSelectedName: string;
  classActiveDropdown: string;
  setLanguage: (language: string) => void;
  setLanguageSelectedName: (languageName: string) => void;
  setClassActiveDropdown: (className: string) => void;
  router: NextRouter;
}

const SelectLanguage = ({
  languageSelected,
  classActiveDropdown,
  languageSelectedName,
  setClassActiveDropdown,
  setLanguage,
  setLanguageSelectedName,
  router,
}: SelectLanguage) => {
  function onClickChangeLanguage(key: string, label: string) {
    setLanguage(key as string);
    setLanguageSelectedName(label);
    const { pathname, asPath, query } = router;
    router.replace({ pathname, query }, asPath, { locale: key });
    appLocalStorage.set(LOCAL_STORAGE_KEYS.LANGUAGE, key);
  }

  function onClickShowPopupLanguage() {
    classActiveDropdown === 'active'
      ? setClassActiveDropdown('')
      : setClassActiveDropdown('active');
  }

  return (
    <div>
      <div
        className={`${AuthenLayout.selectMenu} ${
          classActiveDropdown != '' ? AuthenLayout.active : ''
        }`}
      >
        <div
          className={AuthenLayout.selectBtn}
          onClick={onClickShowPopupLanguage}
        >
          <div className={AuthenLayout.layoutChooseImage}>
            <img
              src={`/images/${languageSelected}.png`}
              alt=""
              width={WIDTH_FLAG}
            />
            <span>{languageSelectedName}</span>
          </div>
          <CaretDownOutlined className={AuthenLayout.selectBtnIcon} />
        </div>
        <ul className={AuthenLayout.options}>
          {items.map(({ value, label, key }, index) => (
            <li
              key={index}
              onClick={() => {
                onClickChangeLanguage(key, label);
                onClickShowPopupLanguage();
              }}
              className={AuthenLayout.option}
            >
              <img src={value} alt={label} />
              <span className={AuthenLayout.optionText}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export function AppLayout(props: Props) {
  // const { translate: translateCommon } = useI18n('common');
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const [languageSelected, setLanguage] = useState<string>(LANGUAGE.EN);
  const [classActiveDropdown, setClassActiveDropdown] = useState('');
  const [languageSelectedName, setLanguageSelectedName] = useState('');
  const [classActiveAvatarPopup, setClassActiveAvatarPopup] = useState('');
  const [informationUser, setInformationUser] = useState<UserInfo>();
  const locale = useLocale();

  useQuery({
    queryKey: [API_MASTER_DATA.GET_COUNTRY],
    queryFn: () =>
      getListCountry({
        currentPage: 1,
        pageSize: 500,
      }),
  });
  useQuery({
    queryKey: [API_LOCATION_TYPE.GET_TYPE_LOCATION],
    queryFn: () => getListTypeLocations(),
  });
  useQuery({
    queryKey: [API_MASTER_DATA.GET_CITY],
    queryFn: () =>
      getListCity({
        currentPage: 1,
        pageSize: 500,
      }),
  });

  useQuery({
    queryKey: [API_USER.CHECK_USER],
    queryFn: () => getUserInfo(),
    onSuccess: (data) => {
      if (!data.status) {
        // remove token and redirect to home
        appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
        router.replace(ROUTERS.LOGIN);
      }
      setInformationUser(data.data);
    },
    onError: () => {
      // remove token and redirect to home
      appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
      router.replace(ROUTERS.LOGIN);
    },
    retry: 0,
  });

  useEffect(() => {
    setLanguage(locale);
    languageSelected === LANGUAGE.EN
      ? setLanguageSelectedName('English')
      : setLanguageSelectedName('Vietnamese');
  }, [languageSelected, locale]);

  function onClickShowPopupAvatar() {
    classActiveAvatarPopup === 'active'
      ? setClassActiveAvatarPopup('')
      : setClassActiveAvatarPopup('active');
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <link rel="favicon" href="/images/asl-logo.png" />
        <link rel="shortcut icon" href="/images/asl-logo.png" />
      </Head>
      <AppSider collapsed={collapsed} />
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 999,
            padding: '0 24px',
            background: '#fff',
            height: HEADER_HEIGHT,
            borderBottom: '1px solid',
          }}
        >
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space>
              <MenuOutlined onClick={() => setCollapsed((prev) => !prev)} />
              <Breadcrumb
                style={{ margin: '16px 0' }}
                items={SHOW_ROUTER_HEADER()[router.pathname as never]}
              />
            </Space>
            <Space style={{ cursor: 'pointer' }}>
              <SelectLanguage
                languageSelected={languageSelected}
                classActiveDropdown={classActiveDropdown}
                languageSelectedName={languageSelectedName}
                setLanguage={setLanguage}
                setClassActiveDropdown={setClassActiveDropdown}
                setLanguageSelectedName={setLanguageSelectedName}
                router={router}
              />
              <Space
                style={{
                  cursor: 'pointer',
                  margin: '0px 8px 0px 0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '64px',
                }}
              >
                <div className={AuthenLayout.notification}>
                  <svg viewBox="-10 0 35 20">
                    <path
                      className={AuthenLayout.notificationBell}
                      d="M14 12v1H0v-1l0.73-0.58c0.77-0.77 0.81-3.55 1.19-4.42 0.77-3.77 4.08-5 4.08-5 0-0.55 0.45-1 1-1s1 0.45 1 1c0 0 3.39 1.23 4.16 5 0.38 1.88 0.42 3.66 1.19 4.42l0.66 0.58z"
                    ></path>
                    <path
                      className={AuthenLayout.notificationBellClapper}
                      d="M7 15.7c1.11 0 2-0.89 2-2H5c0 1.11 0.89 2 2 2z"
                    ></path>
                  </svg>
                  <span className={AuthenLayout.notificationNumber}></span>
                </div>
              </Space>
              <div>
                <div
                  onClick={onClickShowPopupAvatar}
                  className={AuthenLayout.userAvatar}
                >
                  <Avatar
                    style={{
                      verticalAlign: 'middle',
                      marginRight: '10px',
                      backgroundColor: informationUser?.colorAvatar,
                    }}
                    src={informationUser?.avatar}
                  >
                    {informationUser?.defaultAvatar || ''}
                  </Avatar>
                  {informationUser?.fullName || ''}
                </div>
                <div
                  className={`${AuthenLayout.userMenu} ${
                    classActiveAvatarPopup != '' ? AuthenLayout.active : ''
                  }`}
                >
                  <ul>
                    <li>
                      <Button
                        className={AuthenLayout.userMenuButton}
                        icon={<UserOutlined />}
                      >
                        My Profile
                      </Button>
                    </li>
                    <li>
                      <Button
                        className={AuthenLayout.userMenuButton}
                        icon={<LockOutlined />}
                      >
                        Change Password
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </Space>
          </Space>
        </Header>
        <Content
          style={{
            padding: '0 24px',
            maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            overflowY: 'auto',
          }}
        >
          <main>{props.children}</main>
          <FloatButton.Group
            trigger="hover"
            type="primary"
            style={{ right: 24 }}
            icon={<CustomerServiceOutlined />}
          >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
          </FloatButton.Group>
          <Footer
            style={{
              textAlign: 'center',
              padding: '8px 0',
              height: `${FOOTER_HEIGHT}px`,
            }}
          >
            <Text disabled>
              ©2023 Existing ASL website. All Rights Reserved | Design by Softek
              Solution
            </Text>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}
