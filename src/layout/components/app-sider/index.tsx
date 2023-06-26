import style from './index.module.scss';
import React, { useEffect, useRef, useState } from 'react';
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
import { Modal, Typography, Tour } from 'antd';
import type { TourProps } from 'antd';
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
  const refHome = useRef(null);
  const refQuotation = useRef(null);
  const refBooking = useRef(null);
  const refPartner = useRef(null);
  const refMasterData = useRef(null);
  const refSystem = useRef(null);
  const refCustomer = useRef(null);
  const refSupplier = useRef(null);
  const refPort = useRef(null);
  const refDepot = useRef(null);
  const refContainerCatalog = useRef(null);
  const refContainer = useRef(null);
  const refTypeOfContainer = useRef(null);
  const refTypeOfExpenses = useRef(null);
  const refLocationCatalog = useRef(null);
  const refLocation = useRef(null);
  const refTypeOfLocation = useRef(null);
  const refAccountant = useRef(null);
  const refCurrency = useRef(null);
  const refBank = useRef(null);
  const refUnit = useRef(null);
  const refStaff = useRef(null);
  const refPermission = useRef(null);
  const [openTour, setOpenTour] = useState<boolean>(true);
  const steps: TourProps['steps'] = [
    {
      title: 'Trang chủ',
      description: 'Màn hình thống kê dữ liệu.',
      cover: <img alt="home page" src="images/HomeASL.png" />,
      target: () => refHome.current,
    },
    {
      title: 'Báo giá',
      description: 'Màn hình quản lý báo giá của khách hàng.',
      target: () => refQuotation.current,
    },
    {
      title: 'Booking',
      description: 'Màn hình quản lý đặt container.',
      target: () => refBooking.current,
    },
    {
      title: 'Đối tác',
      description:
        'Menu này bao gồm màn hình khách hàng và màn hình nhà cung cấp.',
      target: () => refPartner.current,
    },
    {
      title: 'Danh mục',
      description:
        'Menu này bao gồm màn hình cảng, depot, danh mục container, loại chi phí, danh mục địa điểm, kế toán và đơn vị.',
      target: () => refMasterData.current,
    },
    {
      title: 'Hệ thống',
      description: 'Menu này bao gồm màn hình nhân viên và quyền hạn.',
      target: () => refSystem.current,
    },
  ];

  const items: MenuItem[] = [
    getItem(
      `${translateCommon('home')}`,
      ROUTERS.HOME,
      <HomeOutlined ref={refHome} />
    ),
    getItem(
      `${translateCommon('quotation')}`,
      ROUTERS.QUOTATION,
      <ContainerOutlined ref={refQuotation} />
    ),
    getItem(
      `${translateCommon('booking')}`,
      ROUTERS.BOOKING,
      <SolutionOutlined ref={refBooking} />
    ),
    getItem(
      `${translateCommon('partner')}`,
      '1',
      <TeamOutlined ref={refPartner} />,
      [
        getItem(
          `${translateCommon('customer')}`,
          ROUTERS.CUSTOMER,
          <UserOutlined ref={refCustomer} />
        ),
        getItem(
          `${translateCommon('supplier')}`,
          ROUTERS.SUPPLIER,
          <BankOutlined ref={refSupplier} />
        ),
      ]
    ),
    getItem(
      `${translateCommon('master_data')}`,
      '2',
      <AppstoreOutlined ref={refMasterData} />,
      [
        getItem(
          `${translateCommon('port')}`,
          ROUTERS.PORT,
          <GoldOutlined ref={refPort} />
        ),
        getItem(
          `${translateCommon('depot')}`,
          ROUTERS.DEPOT,
          <GoldOutlined ref={refDepot} />
        ),
        getItem(
          `${translateCommon('container_catalog')}`,
          '4',
          <InboxOutlined ref={refContainerCatalog} />,
          [
            getItem(
              `${translateCommon('container')}`,
              ROUTERS.CONTAINER,
              <InboxOutlined ref={refContainer} />
            ),
            getItem(
              `${translateCommon('type_of_container')}`,
              ROUTERS.TYPES_OF_CONTAINER,
              <InboxOutlined ref={refTypeOfContainer} />
            ),
          ]
        ),
        getItem(
          `${translateCommon('type_of_expenses')}`,
          ROUTERS.TYPES_OF_EXPENSES,
          <ProfileOutlined ref={refTypeOfExpenses} />
        ),
        getItem(
          `${translateCommon('location_catalog')}`,
          '5',
          <EnvironmentOutlined ref={refLocationCatalog} />,
          [
            getItem(
              `${translateCommon('location')}`,
              ROUTERS.LOCATION,
              <EnvironmentOutlined ref={refLocation} />
            ),
            getItem(
              `${translateCommon('type_of_location')}`,
              ROUTERS.TYPE_OF_LOCATION,
              <EnvironmentOutlined ref={refTypeOfLocation} />
            ),
          ]
        ),
        getItem(
          `${translateCommon('accountant')}`,
          '6',
          <DollarOutlined ref={refAccountant} />,
          [
            getItem(
              `${translateCommon('currency')}`,
              ROUTERS.CURRENCY,
              <DollarOutlined ref={refCurrency} />
            ),
            getItem(
              `${translateCommon('bank')}`,
              ROUTERS.BANK,
              <BankOutlined ref={refBank} />
            ),
          ]
        ),
        getItem(
          `${translateCommon('unit')}`,
          ROUTERS.UNIT,
          <CalculatorOutlined ref={refUnit} />
        ),
      ]
    ),
    getItem(
      `${translateCommon('system')}`,
      '3',
      <ClusterOutlined ref={refSystem} />,
      [
        getItem(
          `${translateCommon('staff')}`,
          ROUTERS.STAFF,
          <UsergroupAddOutlined ref={refStaff} />
        ),
        getItem(
          `${translateCommon('permission')}`,
          ROUTERS.PERMISSION,
          <ApartmentOutlined ref={refPermission} />
        ),
      ]
    ),
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
            colorPrimaryBg: COLORS.BRIGHT,
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
                    style={{
                      paddingRight: '8px',
                      cursor: 'pointer',
                      width: '110px',
                    }}
                    src="/images/asl-logo.png"
                    onClick={() => router.push(ROUTERS.HOME)}
                    alt="logo"
                  />
                )}
                {collapsed && (
                  <Image
                    preview={false}
                    style={{
                      paddingRight: '8px',
                      cursor: 'pointer',
                      width: '50px',
                    }}
                    src="/images/asl-logo.png"
                    onClick={() => router.push(ROUTERS.HOME)}
                    alt="logo"
                  />
                )}
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
      <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />
    </>
  );
};

export default AppSider;
