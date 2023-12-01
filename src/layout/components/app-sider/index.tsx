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
import {
  IPermissionRules,
  PERMISSION,
  PERMISSION_RULES,
} from '@/constant/permission';

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
  const { userInfo, setUserInfo, role } = useContext(AppContext);

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

  const permissionRules = PERMISSION_RULES() as IPermissionRules;

  // const displayRouter = (url: string) => {
  //   const currentPermission =
  //     permissionRules[role || 'LINER'][
  //       url as keyof (typeof permissionRules)[typeof role]
  //     ];

  //   if (currentPermission === PERMISSION.NO_VIEW) {
  //     return false;
  //   }
  //   return true;
  // };

  const displayRouter = (urls: string[] | string) => {
    if (Array.isArray(urls)) {
      // If the input is an array of URLs, check each URL
      for (const url of urls) {
        const currentPermission =
          permissionRules[role || 'LINER'][
            url as keyof (typeof permissionRules)[typeof role]
          ];

        if (currentPermission !== PERMISSION.NO_VIEW) {
          // Return true if at least one URL has the necessary permission
          return true;
        }
      }
      // If none of the URLs have the necessary permission, return false
      return false;
    } else {
      // If the input is a single URL, check its permission
      const currentPermission =
        permissionRules[role || 'LINER'][
          urls as keyof (typeof permissionRules)[typeof role]
        ];

      // Return true if the single URL has the necessary permission
      return currentPermission !== PERMISSION.NO_VIEW;
    }
  };

  const items: MenuItem[] = [
    displayRouter(ROUTERS.HOME)
      ? getItem(
          <div>{translateCommon('home')}</div>,
          ROUTERS.HOME,
          <HomeOutlined ref={refHome} />
        )
      : null,

    displayRouter([
      ROUTERS.SEA_QUOTATION,
      ROUTERS.AIR_QUOTATION,
      ROUTERS.CUSTOMS_QUOTATION,
      ROUTERS.TRUCKING_QUOTATION,
      ROUTERS.QUOTATION_FEE_GROUP,
    ])
      ? getItem(
          `${translateCommon('quotation')}`,
          '1',
          <ContainerOutlined ref={refQuotation} />,
          [
            displayRouter(ROUTERS.SEA_QUOTATION)
              ? getItem(
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
                )
              : null,
            displayRouter(ROUTERS.AIR_QUOTATION)
              ? getItem(
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
                )
              : null,
            displayRouter(ROUTERS.CUSTOMS_QUOTATION)
              ? getItem(
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
                )
              : null,
            displayRouter(ROUTERS.TRUCKING_QUOTATION)
              ? getItem(
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
                )
              : null,
            displayRouter(ROUTERS.QUOTATION_FEE_GROUP)
              ? getItem(
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
                )
              : null,
          ]
        )
      : null,

    displayRouter(ROUTERS.BOOKING)
      ? getItem(
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
        )
      : null,

    displayRouter([
      ROUTERS.SEA_PRICING,
      ROUTERS.AIR_PRICING,
      ROUTERS.CUSTOMS_PRICING,
      ROUTERS.TRUCKING_PRICING,
      ROUTERS.PRICING_FEE_GROUP,
    ])
      ? getItem(
          `${translateCommon('pricing')}`,
          '2',
          <AuditOutlined ref={refPricing} />,
          [
            displayRouter(ROUTERS.SEA_PRICING)
              ? getItem(
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
                )
              : null,
            displayRouter(ROUTERS.AIR_PRICING)
              ? getItem(
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
                )
              : null,
            displayRouter(ROUTERS.CUSTOMS_PRICING)
              ? getItem(
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
                )
              : null,
            displayRouter(ROUTERS.TRUCKING_PRICING)
              ? getItem(
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
                )
              : null,
            displayRouter(ROUTERS.PRICING_FEE_GROUP)
              ? getItem(
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
                )
              : null,
          ]
        )
      : null,

    displayRouter(ROUTERS.PARTNER)
      ? getItem(
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
        )
      : null,

    displayRouter([
      ROUTERS.LOCATION,
      ROUTERS.TYPE_OF_LOCATION,
      ROUTERS.LOAD_CAPACITY,
      ROUTERS.TYPE_OF_LOAD_CAPACITY,
      ROUTERS.FEE,
      ROUTERS.TYPE_FEE,
      ROUTERS.TYPE_FEE_GROUP,
      ROUTERS.CURRENCY,
      ROUTERS.BANK,
      ROUTERS.COMMODITY,
      ROUTERS.TYPES_OF_CONTAINER,
      ROUTERS.UNIT,
      ROUTERS.TYPE_UNIT,
      ROUTERS.TYPE_DECLARATION,
    ])
      ? getItem(
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
            displayRouter([ROUTERS.LOCATION, ROUTERS.TYPE_OF_LOCATION])
              ? getItem(
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
                    displayRouter(ROUTERS.LOCATION)
                      ? getItem(
                          <Badge
                            count={GetTitleNotificationTab(
                              userInfo?.totalLocation
                            )}
                            style={{
                              marginRight: '-12px',
                            }}
                          >
                            {`${translateCommon('location')}`}
                          </Badge>,
                          ROUTERS.LOCATION,
                          <EnvironmentOutlined ref={refLocation} />
                        )
                      : null,
                    displayRouter(ROUTERS.TYPE_OF_LOCATION)
                      ? getItem(
                          <Badge
                            count={GetTitleNotificationTab(
                              userInfo?.totalTypeLocation
                            )}
                            style={{
                              marginRight: '-12px',
                            }}
                          >
                            {`${translateCommon('type_of_location')}`}
                          </Badge>,
                          ROUTERS.TYPE_OF_LOCATION,
                          <GlobalOutlined ref={refTypeOfLocation} />
                        )
                      : null,
                  ]
                )
              : null,

            displayRouter([
              ROUTERS.LOAD_CAPACITY,
              ROUTERS.TYPE_OF_LOAD_CAPACITY,
            ])
              ? getItem(
                  `${translateCommon('load_capacity_catalog')}`,
                  'load_capacity_catalog',
                  <FolderOpenOutlined ref={refLoadCapacityCatalog} />,
                  [
                    displayRouter(ROUTERS.LOAD_CAPACITY)
                      ? getItem(
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
                        )
                      : null,
                    displayRouter(ROUTERS.TYPE_OF_LOAD_CAPACITY)
                      ? getItem(
                          `${translateCommon('type_load_capacity')}`,
                          ROUTERS.TYPE_OF_LOAD_CAPACITY,
                          <GlobalOutlined ref={refTypeLoadCapacity} />
                        )
                      : null,
                  ]
                )
              : null,

            displayRouter([
              ROUTERS.FEE,
              ROUTERS.TYPE_FEE,
              ROUTERS.TYPE_FEE_GROUP,
            ])
              ? getItem(
                  `${translateCommon('fee_catalog')}`,
                  'fee_catalog',
                  <FolderOpenOutlined ref={refFeeCatalog} />,
                  [
                    displayRouter(ROUTERS.FEE)
                      ? getItem(
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
                        )
                      : null,
                    displayRouter(ROUTERS.TYPE_FEE)
                      ? getItem(
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
                        )
                      : null,
                    displayRouter(ROUTERS.TYPE_FEE_GROUP)
                      ? getItem(
                          <Badge
                            count={GetTitleNotificationTab(
                              userInfo?.totalTypeFeeGroup
                            )}
                            style={{
                              marginRight: '-12px',
                            }}
                          >
                            {`${translateCommon('type_fee_group')}`}
                          </Badge>,
                          ROUTERS.TYPE_FEE_GROUP,
                          <ProfileOutlined ref={refTypeFeeGroup} />
                        )
                      : null,
                  ]
                )
              : null,

            displayRouter([ROUTERS.CURRENCY, ROUTERS.BANK])
              ? getItem(
                  `${translateCommon('accountant')}`,
                  '8',
                  <DollarOutlined ref={refAccountant} />,
                  [
                    displayRouter(ROUTERS.CURRENCY)
                      ? getItem(
                          <Badge
                            count={GetTitleNotificationTab(
                              userInfo?.totalCurrency
                            )}
                            style={{
                              marginRight: '-12px',
                            }}
                          >
                            {`${translateCommon('currency')}`}
                          </Badge>,
                          ROUTERS.CURRENCY,
                          <DollarOutlined ref={refCurrency} />
                        )
                      : null,
                    displayRouter(ROUTERS.BANK)
                      ? getItem(
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
                        )
                      : null,
                  ]
                )
              : null,

            displayRouter(ROUTERS.COMMODITY)
              ? getItem(
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
                )
              : null,

            displayRouter(ROUTERS.TYPES_OF_CONTAINER)
              ? getItem(
                  <Badge
                    count={GetTitleNotificationTab(
                      userInfo?.totalTypeContainer
                    )}
                    style={{
                      marginRight: '-12px',
                    }}
                  >
                    {`${translateCommon('type_of_container')}`}
                  </Badge>,
                  ROUTERS.TYPES_OF_CONTAINER,
                  <InboxOutlined ref={refTypeOfContainer} />
                )
              : null,

            displayRouter([ROUTERS.UNIT, ROUTERS.TYPE_UNIT])
              ? getItem(
                  `${translateCommon('unit_catalog')}`,
                  'unit_catalog',
                  <DollarOutlined ref={refUnitCatalog} />,
                  [
                    displayRouter(ROUTERS.UNIT)
                      ? getItem(
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
                        )
                      : null,
                    displayRouter(ROUTERS.TYPE_UNIT)
                      ? getItem(
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
                        )
                      : null,
                  ]
                )
              : null,

            displayRouter(ROUTERS.TYPE_DECLARATION)
              ? getItem(
                  `${translateCommon('declaration_catalog')}`,
                  'declaration_catalog',
                  <FileTextOutlined ref={refDeclarationCatalog} />,
                  [
                    displayRouter(ROUTERS.TYPE_DECLARATION)
                      ? getItem(
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
                        )
                      : null,
                  ]
                )
              : null,
          ]
        )
      : null,

    displayRouter([ROUTERS.USER, ROUTERS.STAFF])
      ? getItem(
          `${translateCommon('system')}`,
          '9',
          <ClusterOutlined ref={refSystem} />,
          [
            displayRouter(ROUTERS.USER)
              ? getItem(
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
                )
              : null,
            displayRouter(ROUTERS.STAFF)
              ? getItem(
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
                )
              : null,
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
        )
      : null,
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
