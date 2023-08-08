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
  ProfileOutlined,
  InboxOutlined,
  CalculatorOutlined,
  ClusterOutlined,
  ApartmentOutlined,
  UsergroupAddOutlined,
  GoldOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  AuditOutlined,
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogoutData, logout } from './fetcher';
import { UserInfo, checkNewUser } from '@/layout/fetcher';
import { ResponseWithPayload } from '@/fetcherAxios';

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
  const [ipAddress, setIpAddress] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  const { translate: translateCommon } = useI18n('common');
  const refHome = useRef(null);
  const refQuotation = useRef(null);
  const refBooking = useRef(null);
  const refPricing = useRef(null);
  const refSeaPricing = useRef(null);
  const refAirPricing = useRef(null);
  const refCustomsPricing = useRef(null);
  const refTruckingPricing = useRef(null);
  const refPartner = useRef(null);
  const refMasterData = useRef(null);
  const refSystem = useRef(null);
  const refCustomer = useRef(null);
  const refPotentialCustomer = useRef(null);
  const refOfficialCustomer = useRef(null);
  const refCustomersAreOnSales = useRef(null);
  const refSupplier = useRef(null);
  const refPort = useRef(null);
  const refTypeOfContainer = useRef(null);
  const refFee = useRef(null);
  const refAccountant = useRef(null);
  const refCurrency = useRef(null);
  const refBank = useRef(null);
  const refUnit = useRef(null);
  const refUser = useRef(null);
  const refStaff = useRef(null);
  const refPermission = useRef(null);
  const [openTour, setOpenTour] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const dataUser = queryClient.getQueryData<ResponseWithPayload<UserInfo>>([
    'user',
  ]);
  const checkNewUserFirst = useMutation({
    mutationFn: () => checkNewUser(),
  });

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
      `${translateCommon('pricing')}`,
      '1',
      <AuditOutlined ref={refPricing} />,
      [
        getItem(
          `${translateCommon('sea_pricing')}`,
          ROUTERS.SEA_PRICING,
          <AuditOutlined ref={refSeaPricing} />
        ),
        getItem(
          `${translateCommon('air_pricing')}`,
          ROUTERS.AIR_PRICING,
          <AuditOutlined ref={refAirPricing} />
        ),
        getItem(
          `${translateCommon('customs_pricing')}`,
          ROUTERS.CUSTOMS_PRICING,
          <AuditOutlined ref={refCustomsPricing} />
        ),
        getItem(
          `${translateCommon('trucking_pricing')}`,
          ROUTERS.TRUCKING_PRICING,
          <AuditOutlined ref={refTruckingPricing} />
        ),
      ]
    ),

    getItem(
      `${translateCommon('partner')}`,
      '2',
      <TeamOutlined ref={refPartner} />,
      [
        // getItem(
        //   `${translateCommon('customer')}`,
        //   ROUTERS.CUSTOMER,
        //   <UserOutlined ref={refCustomer} />
        // ),

        getItem(
          `${translateCommon('customer')}`,
          '3',
          <UserOutlined ref={refCustomer} />,
          [
            getItem(
              `${translateCommon('potential_customer')}`,
              ROUTERS.POTENTIAL_CUSTOMER,
              <UserAddOutlined ref={refPotentialCustomer} />
            ),
            getItem(
              `${translateCommon('official_customer')}`,
              ROUTERS.OFFICIAL_CUSTOMER,
              <UserOutlined ref={refOfficialCustomer} />
            ),
            getItem(
              `${translateCommon('customers_on_sales')}`,
              ROUTERS.CUSTOMER_ON_SALES,
              <UserSwitchOutlined ref={refCustomersAreOnSales} />
            ),
          ]
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
      '4',
      <AppstoreOutlined ref={refMasterData} />,
      [
        getItem(
          `${translateCommon('port')}`,
          ROUTERS.PORT,
          <GoldOutlined ref={refPort} />
        ),
        getItem(
          `${translateCommon('fee')}`,
          ROUTERS.FEE,
          <ProfileOutlined ref={refFee} />
        ),
        getItem(
          `${translateCommon('accountant')}`,
          '5',
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
          `${translateCommon('type_of_container')}`,
          ROUTERS.TYPES_OF_CONTAINER,
          <InboxOutlined ref={refTypeOfContainer} />
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
      '6',
      <ClusterOutlined ref={refSystem} />,
      [
        getItem(
          `${translateCommon('user')}`,
          ROUTERS.USER,
          <UserOutlined ref={refUser} />
        ),
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

  const logoutUser = useMutation({
    mutationFn: (body: LogoutData) => {
      return logout(body);
    },
    onSuccess: async () => {
      appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
      await router.push(ROUTERS.LOGIN);
    },
  });

  const handleClickLogout = () => {
    const data = {
      accessToken: appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN),
      ipAddress: ipAddress,
      deviceName: deviceName,
    };
    modal.confirm({
      centered: true,
      icon: <LogoutOutlined />,
      content: <Text>{translateCommon('notification_sign_out')}</Text>,
      onOk() {
        logoutUser.mutate(data);
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

  useEffect(() => {
    setIpAddress(appLocalStorage.get(LOCAL_STORAGE_KEYS.IP_ADDRESS));
    setDeviceName(appLocalStorage.get(LOCAL_STORAGE_KEYS.DEVICE_NAME));
    if (dataUser?.data.newUser) {
      setOpenTour(true);
    }
  }, [dataUser]);
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
      <Tour
        open={openTour}
        onClose={() => {
          checkNewUserFirst.mutate();
          setOpenTour(false);
        }}
        steps={steps}
      />
    </>
  );
};

export default AppSider;
