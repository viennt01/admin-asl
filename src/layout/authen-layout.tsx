import React, { useContext, useEffect, useState } from 'react';
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
  Badge,
  Popover,
  Row,
  Col,
  List,
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
import {
  NotificationType,
  ROUTERS,
  ROUTERS_NOTIFICATION,
} from '@/constant/router';
import {
  confirmNotification,
  getListCity,
  getListCountry,
  getListTypeLocations,
  getUserInfo,
} from './fetcher';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  API_LOCATION_TYPE,
  API_MASTER_DATA,
  API_USER,
} from '@/fetcherAxios/endpoint';
import SHOW_ROUTER_HEADER from './constant';
import { AppContext } from '@/app-context';
import { getPriorityRole } from '@/hook/useAuthentication';
import { GetTitleNotificationTab } from '@/utils/common';
import { calculateElapsedTime } from '@/utils/format';
import COLORS from '@/constant/color';

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
const WSS_URL = process.env.WSS_URL_CHECK_USER;
const WSS_URL_NOTIFICATION = process.env.WSS_URL_NOTIFICATION;

export function AppLayout(props: Props) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const [languageSelected, setLanguage] = useState<string>(LANGUAGE.EN);
  const [classActiveDropdown, setClassActiveDropdown] = useState('');
  const [languageSelectedName, setLanguageSelectedName] = useState('');
  const [classActiveAvatarPopup, setClassActiveAvatarPopup] = useState('');
  const locale = useLocale();
  const { userInfo, setUserInfo, setRole, setNotification, notification } =
    useContext(AppContext);

  const updateStatusReadMutation = useMutation({
    mutationFn: (id: string) => {
      return confirmNotification(id);
    },
  });

  useQuery({
    queryKey: [API_USER.CHECK_USER],
    queryFn: () => getUserInfo(),
    onSuccess: (data) => {
      if (!data.status) {
        // remove token and redirect to home
        appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
        router.replace(ROUTERS.LOGIN);
      } else {
        const dataRole = getPriorityRole(data?.data?.listRole || ['AGENT']);
        if (setRole) setRole(dataRole);
        if (setUserInfo) setUserInfo(data.data);
      }
    },
    onError: () => {
      // remove token and redirect to home
      appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
      router.replace(ROUTERS.LOGIN);
    },
    retry: 0,
  });

  useEffect(() => {
    const token = appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN);
    const languageName =
      appLocalStorage.get(LOCAL_STORAGE_KEYS.LANGUAGE) || LANGUAGE.EN;
    const ws = new WebSocket(
      `${WSS_URL}?languageName=${languageName}&accessToken=${token}`
    );
    ws.addEventListener('open', (event) => {
      console.log('WebSocket is open now.'), event;
    });

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (!data.status) {
        appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
        router.replace(ROUTERS.LOGIN);
      } else {
        const dataRole = getPriorityRole(data?.data?.listRole || ['AGENT']);
        if (setRole) setRole(dataRole);
        if (setUserInfo) setUserInfo(data.data);
      }
    });

    ws.addEventListener('close', (event) => {
      console.log('WebSocket is closed now.', event);
    });

    return () => {
      ws.close();
    };
  }, [setUserInfo]);

  useEffect(() => {
    const token = appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN);
    const languageName =
      appLocalStorage.get(LOCAL_STORAGE_KEYS.LANGUAGE) || LANGUAGE.EN;
    const ws = new WebSocket(
      `${WSS_URL_NOTIFICATION}?languageName=${languageName}&accessToken=${token}`
    );
    // Lắng nghe sự kiện mở kết nối
    ws.addEventListener('open', (event) => {
      console.log('WebSocket notification is open now.'), event;
    });

    // Lắng nghe sự kiện nhận dữ liệu từ server
    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.status) {
        if (setNotification) {
          setNotification(data.data);
        }
      }
    });

    // Lắng nghe sự kiện đóng kết nối
    ws.addEventListener('close', (event) => {
      console.log('WebSocket notification is closed now.', event);
    });

    return () => {
      ws.close();
    };
  }, [setNotification]); // Chỉ chạy một lần khi component được mount

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

  const handleChangePageNotification = (
    id: string,
    type: string,
    IDataInformation: string
  ) => {
    router.push(ROUTERS_NOTIFICATION[type as NotificationType](id));
    updateStatusReadMutation.mutate(IDataInformation);
  };

  const contentDetail = () => {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <List
            itemLayout="horizontal"
            dataSource={notification?.notificationDTOs || []}
            style={{ maxHeight: '800px', width: '500px' }}
            renderItem={(item) => (
              <List.Item
                key={item.notificationID}
                onClick={() =>
                  handleChangePageNotification(
                    item.objectID,
                    item.typeObject,
                    item.notificationID
                  )
                }
              >
                <List.Item.Meta
                  style={{ cursor: 'pointer' }}
                  avatar={
                    <Avatar
                      style={{
                        verticalAlign: 'middle',
                        backgroundColor: item?.colorAvatar,
                      }}
                      src={item?.avatar}
                    >
                      {item?.defaultAvatar || ''}
                    </Avatar>
                  }
                  title={
                    <div
                      style={{
                        color: item.isRead ? COLORS.SEARCH.FILTER_DEFAULT : '',
                      }}
                    >
                      {item.fullName} - {item.title}
                    </div>
                  }
                  description={
                    <div>
                      <div>{item.content}</div>
                      <div
                        style={{
                          color: item.isRead ? '' : COLORS.BLUE,
                        }}
                      >
                        {calculateElapsedTime(item.dateInserted)}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  };

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
                <div>
                  <div className={AuthenLayout.notification}>
                    <Popover content={contentDetail()} placement="bottomLeft">
                      <Badge
                        count={GetTitleNotificationTab(
                          notification?.totalNewNotification || '0'
                        )}
                        style={{
                          marginRight: '20px',
                          marginTop: '18px',
                        }}
                      >
                        <svg viewBox="-10 0 35 20">
                          <path
                            className={
                              notification?.totalNewNotification === '0'
                                ? ''
                                : AuthenLayout.notificationBell
                            }
                            d="M14 12v1H0v-1l0.73-0.58c0.77-0.77 0.81-3.55 1.19-4.42 0.77-3.77 4.08-5 4.08-5 0-0.55 0.45-1 1-1s1 0.45 1 1c0 0 3.39 1.23 4.16 5 0.38 1.88 0.42 3.66 1.19 4.42l0.66 0.58z"
                          ></path>
                          <path
                            className={
                              notification?.totalNewNotification === '0'
                                ? ''
                                : AuthenLayout.notificationBellClapper
                            }
                            d="M7 15.7c1.11 0 2-0.89 2-2H5c0 1.11 0.89 2 2 2z"
                          ></path>
                        </svg>
                      </Badge>
                    </Popover>
                  </div>
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
                      backgroundColor: userInfo?.colorAvatar,
                    }}
                    src={userInfo?.avatar}
                  >
                    {userInfo?.defaultAvatar || ''}
                  </Avatar>
                  {userInfo?.fullName || ''}
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
