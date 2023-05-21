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
import useI18n from '@/i18n/useI18N';

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
    getItem(`${translateCommon('dashboard')}`, ROUTERS.HOME, <HomeOutlined />),
    getItem(
      `${translateCommon('quotation')}`,
      ROUTERS.PRICE,
      <ContainerOutlined />
    ),
    getItem(
      `${translateCommon('booking')}`,
      ROUTERS.BOOKING,
      <SolutionOutlined />
    ),
    getItem(`${translateCommon('participant')}`, '1', <TeamOutlined />, [
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
    getItem(`${translateCommon('masterData')}`, '2', <AppstoreOutlined />, [
      getItem(
        `${translateCommon('port')}`,
        ROUTERS.DEPOT,
        <AppstoreOutlined />
      ),
      getItem(
        `${translateCommon('location')}`,
        ROUTERS.LOCATION,
        <EnvironmentOutlined />
      ),
      getItem(
        `${translateCommon('typeOfExpenses')}`,
        ROUTERS.TYPES_OF_EXPENSES,
        <DollarOutlined />
      ),
      getItem(
        `${translateCommon('typeOfContainer')}`,
        ROUTERS.TYPES_OF_CONTAINER,
        <AppstoreOutlined />
      ),
      getItem(
        `${translateCommon('unitOfMeasurement')}`,
        ROUTERS.UNIT_OF_MEASUREMENT,
        <AppstoreOutlined />
      ),
      getItem(
        `${translateCommon('currency')}`,
        ROUTERS.CURRENCY,
        <AppstoreOutlined />
      ),
    ]),
  ];

  // const ENROUTER = {
  //   HOME: [],
  //   BOOKING: ['Booking'],
  //   PRICE: ['Price'],
  //   CUSTOMER: ['Participant', 'Customer'],
  //   SUPPLIER: ['Participant', 'Supplier'],
  //   DEPOT: ['Master data', 'Depot'],
  //   DEPOT_EDIT: ['Master data', 'Depot', 'Edit'],
  //   LOCATION: ['Master data', 'Location'],
  //   TYPES_OF_CONTAINER: ['Master data', 'Type of container'],
  //   TYPES_OF_EXPENSES: ['Master data', 'Type of Expenses'],
  //   UNIT_OF_MEASUREMENT: ['Master data', 'Unit of measurement'],
  //   CURRENCY: ['Master data', 'Currency'],
  // };

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
