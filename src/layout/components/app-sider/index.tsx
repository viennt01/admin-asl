import style from './index.module.scss';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
  // ApartmentOutlined,
  UsergroupAddOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  FolderOpenOutlined,
  ShoppingOutlined,
  AuditOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Button, MenuProps, Image, Badge } from 'antd';
import { Layout, Menu, Row, Col } from 'antd';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Modal, Typography, Tour } from 'antd';
import type { TourProps } from 'antd';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import useI18n from '@/i18n/useI18N';
import { useMutation } from '@tanstack/react-query';
import { LogoutData, logout } from './fetcher';
import { checkNewUser } from '@/layout/fetcher';
import { AppContext, INITIAL_VALUE_USER_INFO } from '@/app-context';
import { GetTitleNotificationTab } from '@/utils/common';

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
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
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
  const refSeaQuotation = useRef(null);
  const refAirQuotation = useRef(null);
  const refCustomsQuotation = useRef(null);
  const refTruckingQuotation = useRef(null);
  const refBooking = useRef(null);
  const refPricing = useRef(null);
  const refSeaPricing = useRef(null);
  const refAirPricing = useRef(null);
  const refCustomsPricing = useRef(null);
  const refTruckingPricing = useRef(null);
  const refPartner = useRef(null);
  const refMasterData = useRef(null);
  const refSystem = useRef(null);
  const refLocationCatalog = useRef(null);
  const refTypeOfLocation = useRef(null);
  const refLocation = useRef(null);
  const refCommodity = useRef(null);
  const refTypeOfContainer = useRef(null);
  const refFeeCatalog = useRef(null);
  const refLoadCapacityCatalog = useRef(null);
  const refLoadCapacity = useRef(null);
  const refTypeLoadCapacity = useRef(null);
  const refFee = useRef(null);
  const refTypeFee = useRef(null);
  const refFeeGroupQuotation = useRef(null);
  const refFeeGroupPricing = useRef(null);
  const refTypeFeeGroup = useRef(null);
  const refAccountant = useRef(null);
  const refCurrency = useRef(null);
  const refBank = useRef(null);
  const refUnit = useRef(null);
  const refUnitCatalog = useRef(null);
  const refTypeUnit = useRef(null);
  const refDeclarationCatalog = useRef(null);
  const refTypeDeclaration = useRef(null);
  const refUser = useRef(null);
  const refStaff = useRef(null);
  // const refPermission = useRef(null);
  const [openTour, setOpenTour] = useState<boolean>(false);
  const { userInfo, setUserInfo } = useContext(AppContext);

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
      description:
        'Menu này bao gồm màn hình người dùng, nhân viên và quyền hạn.',
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
      '1',
      <ContainerOutlined ref={refQuotation} />,
      [
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('sea_quotation')}`}
          </Badge>,
          ROUTERS.SEA_QUOTATION,
          <ContainerOutlined ref={refSeaQuotation} />
        ),
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('air_quotation')}`}
          </Badge>,
          ROUTERS.AIR_QUOTATION,
          <ContainerOutlined ref={refAirQuotation} />
        ),
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('customs_quotation')}`}
          </Badge>,
          ROUTERS.CUSTOMS_QUOTATION,
          <ContainerOutlined ref={refCustomsQuotation} />
        ),
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('trucking_quotation')}`}
          </Badge>,
          ROUTERS.TRUCKING_QUOTATION,
          <ContainerOutlined ref={refTruckingQuotation} />
        ),
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('fee_group')}`}
          </Badge>,
          ROUTERS.QUOTATION_FEE_GROUP,
          <ContainerOutlined ref={refFeeGroupQuotation} />
        ),
      ]
    ),

    getItem(
      <Badge
        count={GetTitleNotificationTab('0')}
        style={{
          marginRight: '-12px',
        }}
      >
        {`${translateCommon('booking')}`}
      </Badge>,
      ROUTERS.BOOKING,
      <SolutionOutlined ref={refBooking} />
    ),

    getItem(
      `${translateCommon('pricing')}`,
      '2',
      <AuditOutlined ref={refPricing} />,
      [
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('sea_pricing')}`}
          </Badge>,
          ROUTERS.SEA_PRICING,
          <AuditOutlined ref={refSeaPricing} />
        ),
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('air_pricing')}`}
          </Badge>,
          ROUTERS.AIR_PRICING,
          <AuditOutlined ref={refAirPricing} />
        ),
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('customs_pricing')}`}
          </Badge>,
          ROUTERS.CUSTOMS_PRICING,
          <AuditOutlined ref={refCustomsPricing} />
        ),
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('trucking_pricing')}`}
          </Badge>,
          ROUTERS.TRUCKING_PRICING,
          <AuditOutlined ref={refTruckingPricing} />
        ),
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('fee_group')}`}
          </Badge>,
          ROUTERS.PRICING_FEE_GROUP,
          <AuditOutlined ref={refFeeGroupPricing} />
        ),
      ]
    ),

    getItem(
      <Badge
        count={GetTitleNotificationTab('0')}
        style={{
          marginRight: '-12px',
        }}
      >
        {`${translateCommon('partner')}`}
      </Badge>,
      ROUTERS.PARTNER,
      <TeamOutlined ref={refPartner} />
    ),

    getItem(
      `${translateCommon('master_data')}`,
      '5',
      // <Badge
      //   dot={true}
      //   style={{
      //     marginTop: '0px',
      //   }}
      // >
      //   <AppstoreOutlined ref={refMasterData} />
      // </Badge>,
      <AppstoreOutlined ref={refMasterData} />,
      [
        getItem(
          <Badge
            count={GetTitleNotificationTab(userInfo?.totalLocation)}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('location_catalog')}`}
          </Badge>,
          '6',
          <FolderOpenOutlined ref={refLocationCatalog} />,
          [
            getItem(
              <Badge
                count={GetTitleNotificationTab('0')}
                style={{
                  marginRight: '-12px',
                }}
              >
                {`${translateCommon('location')}`}
              </Badge>,
              ROUTERS.LOCATION,
              <EnvironmentOutlined ref={refLocation} />
            ),

            getItem(
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalTypeLocation)}
                style={{
                  marginRight: '-12px',
                }}
              >
                {`${translateCommon('type_of_location')}`}
              </Badge>,
              ROUTERS.TYPE_OF_LOCATION,
              <GlobalOutlined ref={refTypeOfLocation} />
            ),
          ]
        ),

        getItem(
          `${translateCommon('load_capacity_catalog')}`,
          'load_capacity_catalog',
          <FolderOpenOutlined ref={refLoadCapacityCatalog} />,
          [
            getItem(
              <Badge
                count={GetTitleNotificationTab('0')}
                style={{
                  marginRight: '-12px',
                }}
              >
                {`${translateCommon('load_capacity')}`}
              </Badge>,
              ROUTERS.LOAD_CAPACITY,
              <InboxOutlined ref={refLoadCapacity} />
            ),
            getItem(
              `${translateCommon('type_load_capacity')}`,
              ROUTERS.TYPE_OF_LOAD_CAPACITY,
              <GlobalOutlined ref={refTypeLoadCapacity} />
            ),
          ]
        ),

        getItem(
          `${translateCommon('fee_catalog')}`,
          'fee_catalog',
          <FolderOpenOutlined ref={refFeeCatalog} />,
          [
            getItem(
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalFee)}
                style={{
                  marginRight: '-12px',
                }}
              >
                {`${translateCommon('fee')}`}
              </Badge>,
              ROUTERS.FEE,
              <ProfileOutlined ref={refFee} />
            ),
            getItem(
              <Badge
                count={GetTitleNotificationTab('0')}
                style={{
                  marginRight: '-12px',
                }}
              >
                {`${translateCommon('type_fee')}`}
              </Badge>,
              ROUTERS.TYPE_FEE,
              <ProfileOutlined ref={refTypeFee} />
            ),
            getItem(
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalTypeFeeGroup)}
                style={{
                  marginRight: '-12px',
                }}
              >
                {`${translateCommon('type_fee_group')}`}
              </Badge>,
              ROUTERS.TYPE_FEE_GROUP,
              <ProfileOutlined ref={refTypeFeeGroup} />
            ),
          ]
        ),

        getItem(
          `${translateCommon('accountant')}`,
          '8',
          <DollarOutlined ref={refAccountant} />,
          [
            getItem(
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalCurrency)}
                style={{
                  marginRight: '-12px',
                }}
              >
                {`${translateCommon('currency')}`}
              </Badge>,
              ROUTERS.CURRENCY,
              <DollarOutlined ref={refCurrency} />
            ),
            getItem(
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalBank)}
                style={{
                  marginRight: '-12px',
                }}
              >
                {`${translateCommon('bank')}`}
              </Badge>,
              ROUTERS.BANK,
              <BankOutlined ref={refBank} />
            ),
          ]
        ),

        getItem(
          <Badge
            count={GetTitleNotificationTab(userInfo?.totalCommodity)}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('commodity')}`}
          </Badge>,
          ROUTERS.COMMODITY,
          <ShoppingOutlined ref={refCommodity} />
        ),

        getItem(
          <Badge
            count={GetTitleNotificationTab(userInfo?.totalTypeContainer)}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('type_of_container')}`}
          </Badge>,
          ROUTERS.TYPES_OF_CONTAINER,
          <InboxOutlined ref={refTypeOfContainer} />
        ),

        getItem(
          `${translateCommon('unit_catalog')}`,
          'unit_catalog',
          <DollarOutlined ref={refUnitCatalog} />,
          [
            getItem(
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalUnit)}
                style={{
                  marginRight: '-12px',
                }}
              >
                {`${translateCommon('unit')}`}
              </Badge>,
              ROUTERS.UNIT,
              <CalculatorOutlined ref={refUnit} />
            ),
            getItem(
              <Badge
                count={GetTitleNotificationTab('0')}
                style={{
                  marginRight: '-12px',
                }}
              >
                {`${translateCommon('type_unit')}`}
              </Badge>,
              ROUTERS.TYPE_UNIT,
              <CalculatorOutlined ref={refTypeUnit} />
            ),
          ]
        ),

        getItem(
          `${translateCommon('declaration_catalog')}`,
          'declaration_catalog',
          <FileTextOutlined ref={refDeclarationCatalog} />,
          [
            getItem(
              <Badge
                count={GetTitleNotificationTab('0')}
                style={{
                  marginRight: '-12px',
                }}
              >
                {`${translateCommon('type_declaration')}`}
              </Badge>,
              ROUTERS.TYPE_DECLARATION,
              <FileTextOutlined ref={refTypeDeclaration} />
            ),
          ]
        ),
      ]
    ),
    getItem(
      `${translateCommon('system')}`,
      '9',
      <ClusterOutlined ref={refSystem} />,
      [
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('user')}`}
          </Badge>,
          ROUTERS.USER,
          <UserOutlined ref={refUser} />
        ),
        getItem(
          <Badge
            count={GetTitleNotificationTab('0')}
            style={{
              marginRight: '-12px',
            }}
          >
            {`${translateCommon('staff')}`}
          </Badge>,
          ROUTERS.STAFF,
          <UsergroupAddOutlined ref={refStaff} />
        ),
        // getItem(
        //   <Badge
        //     count={GetTitleNotificationTab('0')}
        //     style={{
        //       marginRight: '-12px',
        //     }}
        //   >
        //     {`${translateCommon('permission')}`}
        //   </Badge>,
        //   ROUTERS.PERMISSION,
        //   <ApartmentOutlined ref={refPermission} />
        // ),
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
      if (setUserInfo) setUserInfo(INITIAL_VALUE_USER_INFO);
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
    if (userInfo?.newUser) {
      setOpenTour(true);
    }
  }, [userInfo]);
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
