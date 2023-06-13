import style from './index.module.scss';
import React, { useEffect, useState } from 'react';
import {
  LogoutOutlined,
  HomeOutlined,
  AppstoreOutlined,
  SolutionOutlined,
  ContainerOutlined,
  TeamOutlined,
  UserOutlined,
  BankOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  ProfileOutlined,
  InboxOutlined,
  CalculatorOutlined,
  ClusterOutlined,
  ApartmentOutlined,
  UsergroupAddOutlined,
  GoldOutlined,
} from '@ant-design/icons';
import { Button, MenuProps, Image, ConfigProvider } from 'antd';
import { Layout, Menu, Row, Col } from 'antd';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Modal, Typography } from 'antd';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';

const { Text, Title } = Typography;
const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
  collapsed?: boolean;
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  // disabled?: boolean,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    // disabled,
  } as MenuItem;
}

const AppSider = ({ collapsed }: Props) => {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const [selectedKey, setSelectedKey] = useState(ROUTERS.HOME);
  const { translate: translateCommon } = useI18n('common');

  const items: MenuItem[] = [
    getItem(`${translateCommon('home')}`, ROUTERS.HOME, <HomeOutlined />),
    getItem(
      `${translateCommon('quotation')}`,
      ROUTERS.QUOTATION,
      <ContainerOutlined />
    ),
    getItem(
      `${translateCommon('booking')}`,
      ROUTERS.BOOKING,
      <SolutionOutlined />
    ),
    getItem(`${translateCommon('partner')}`, '1', <TeamOutlined />, [
      getItem(
        `${translateCommon('customer')}`,
        ROUTERS.CUSTOMER,
        <UserOutlined />
      ),
      getItem(
        `${translateCommon('supplier')}`,
        ROUTERS.SUPPLIER,
        <BankOutlined />
      ),
    ]),
    getItem(`${translateCommon('master_data')}`, '2', <AppstoreOutlined />, [
      getItem(`${translateCommon('port')}`, ROUTERS.PORT, <GoldOutlined />),
      getItem(`${translateCommon('depot')}`, ROUTERS.DEPOT, <GoldOutlined />),
      getItem(
        `${translateCommon('container_catalog')}`,
        '4',
        <InboxOutlined />,
        [
          getItem(
            `${translateCommon('container')}`,
            ROUTERS.CONTAINER,
            <InboxOutlined />
          ),
          getItem(
            `${translateCommon('type_of_container')}`,
            ROUTERS.TYPES_OF_CONTAINER,
            <InboxOutlined />
          ),
        ]
      ),
      getItem(
        `${translateCommon('type_of_expenses')}`,
        ROUTERS.TYPES_OF_EXPENSES,
        <ProfileOutlined />
      ),
      getItem(
        `${translateCommon('location_catalog')}`,
        '5',
        <EnvironmentOutlined />,
        [
          getItem(
            `${translateCommon('location')}`,
            ROUTERS.LOCATION,
            <EnvironmentOutlined />
          ),
          getItem(
            `${translateCommon('type_of_location')}`,
            ROUTERS.TYPE_OF_LOCATION,
            <EnvironmentOutlined />
          ),
        ]
      ),
      getItem(`${translateCommon('accountant')}`, '6', <DollarOutlined />, [
        getItem(
          `${translateCommon('currency')}`,
          ROUTERS.CURRENCY,
          <DollarOutlined />
        ),
        getItem(`${translateCommon('bank')}`, ROUTERS.BANK, <BankOutlined />),
      ]),
      getItem(
        `${translateCommon('unit')}`,
        ROUTERS.UNIT,
        <CalculatorOutlined />
      ),
    ]),
    getItem(`${translateCommon('system')}`, '3', <ClusterOutlined />, [
      getItem(
        `${translateCommon('staff')}`,
        ROUTERS.STAFF,
        <UsergroupAddOutlined />
      ),
      getItem(
        `${translateCommon('permission')}`,
        ROUTERS.PERMISSION,
        <ApartmentOutlined />
      ),
    ]),
  ];

  const handleClickMenuItem = (path: MenuInfo) => {
    setSelectedKey(path.key);
    router.push(path.key);
  };

  const handleClickLogout = () => {
    modal.confirm({
      centered: true,
      icon: <LogoutOutlined />,
      content: <Text>{translateCommon('notification_sign_out')}</Text>,
      onOk() {
        appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
        router.push(ROUTERS.LOGIN);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    if (router.pathname.slice(-5) === '/[id]') {
      setSelectedKey(router.pathname.substring(0, router.pathname.length - 10));
    } else {
      setSelectedKey(router.pathname ?? ROUTERS.HOME);
    }
  }, [router]);

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: COLORS.GREEN,
          },
        }}
      >
        <Sider
          className={style.sidebarContainer}
          width={280}
          collapsedWidth={60}
          collapsed={collapsed}
          theme="light"
          breakpoint="xl"
        >
          <Row
            style={{
              flexDirection: 'column',
              height: '100%',
              flexWrap: 'nowrap',
            }}
          >
            <Col flex={1}>
              <Title className={style.title}>
                {!collapsed && (
                  <Image
                    preview={false}
                    style={{ paddingRight: '8px', cursor: 'pointer' }}
                    src="/images/gls-logo.jpg"
                    onClick={() => router.push(ROUTERS.HOME)}
                    alt="logo"
                  />
                )}
                <Image
                  preview={false}
                  style={{
                    paddingRight: '8px',
                    cursor: 'pointer',
                    height: '20px',
                  }}
                  src="/images/gls-logo.ico"
                  onClick={() => router.push(ROUTERS.HOME)}
                  alt="logo"
                />
              </Title>
              {!collapsed && <hr style={{ width: '60%' }} />}
              <Menu
                className={style.antMenu}
                selectedKeys={[selectedKey]}
                onClick={handleClickMenuItem}
                mode="inline"
                items={items}
                style={{
                  marginTop: '16px',
                  fontWeight: '500',
                  // height: '75vh',
                  overflowY: 'auto',
                }}
              />
            </Col>
            <Col style={{ textAlign: 'center' }}>
              <Button
                style={{ margin: '12px 0 20px 0' }}
                type="primary"
                size="large"
                danger
                icon={<LogoutOutlined />}
                onClick={handleClickLogout}
              >
                {collapsed ? '' : `${translateCommon('sign_out')}`}
              </Button>
            </Col>
          </Row>
        </Sider>
      </ConfigProvider>
    </>
  );
};

export default AppSider;
