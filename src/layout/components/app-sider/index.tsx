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
} from '@ant-design/icons';
import { Button, MenuProps, Image } from 'antd';
import { Layout, Menu, Row, Col } from 'antd';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Modal, Typography } from 'antd';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';

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

const items: MenuItem[] = [
  getItem('Dashboard', ROUTERS.HOME, <HomeOutlined />),
  getItem('Quotation', ROUTERS.PRICE, <ContainerOutlined />),
  getItem('Booking', ROUTERS.BOOKING, <SolutionOutlined />),
  getItem('Participant ', '1', <TeamOutlined />, [
    getItem('Customer', ROUTERS.CUSTOMER, <UserOutlined />),
    getItem('Supplier', ROUTERS.SUPPLIER, <BankOutlined />),
  ]),
  getItem('Master data', '2', <AppstoreOutlined />, [
    getItem('Port', ROUTERS.DEPOT, <AppstoreOutlined />),
    getItem('Location', ROUTERS.LOCATION, <EnvironmentOutlined />),
    getItem('Types of expenses', ROUTERS.TYPES_OF_EXPENSES, <DollarOutlined />),
    getItem(
      'Type of container',
      ROUTERS.TYPES_OF_CONTAINER,
      <AppstoreOutlined />
    ),
    getItem(
      'Unit of measurement',
      ROUTERS.UNIT_OF_MEASUREMENT,
      <AppstoreOutlined />
    ),
    getItem('Currency', ROUTERS.CURRENCY, <AppstoreOutlined />),
  ]),
];

const AppSider = ({ collapsed }: Props) => {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const [selectedKey, setSelectedKey] = useState(ROUTERS.HOME);

  const handleClickMenuItem = (path: MenuInfo) => {
    setSelectedKey(path.key);
    router.push(path.key);
  };

  const handleClickLogout = () => {
    modal.confirm({
      centered: true,
      icon: <LogoutOutlined />,
      content: <Text>Do you want to sign out?</Text>,
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
    setSelectedKey(router.pathname ?? ROUTERS.HOME);
  }, [router]);

  return (
    <>
      {contextHolder}
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
              selectedKeys={[selectedKey]}
              onClick={handleClickMenuItem}
              mode="inline"
              items={items}
            />
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Button
              style={{ margin: '24px 0' }}
              type="primary"
              size="large"
              danger
              icon={<LogoutOutlined />}
              onClick={handleClickLogout}
            >
              {collapsed ? '' : 'Sign out'}
            </Button>
          </Col>
        </Row>
      </Sider>
    </>
  );
};

export default AppSider;
