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
  Image,
  Dropdown,
} from 'antd';
import { UserOutlined, MenuOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { LANGUAGE } from '@/constant';
import Link from 'next/link';
import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;
export const HEADER_HEIGHT = 64;
export const FOOTER_HEIGHT = 38;
const WIDTH_FLAG = 36;
interface Props {
  children: React.ReactNode;
}

const items: MenuProps['items'] = [
  {
    label: (
      <Space>
        <Image
          preview={false}
          width={WIDTH_FLAG}
          src={'/images/en.png'}
          alt="en"
        />
        <span>English</span>
      </Space>
    ),
    key: LANGUAGE.EN,
  },
  {
    type: 'divider',
  },
  {
    label: (
      <Space>
        <Image
          preview={false}
          width={WIDTH_FLAG}
          src={'/images/vi.png'}
          alt="vi"
        />
        <span>Vietnamese</span>
      </Space>
    ),
    key: LANGUAGE.VI,
  },
];

interface SelectLanguage {
  languageSelected: string;
  setLanguage: (language: string) => void;
  router: NextRouter;
}

const SelectLanguage = ({
  languageSelected,
  setLanguage,
  router,
}: SelectLanguage) => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    setLanguage(key as string);
    const { pathname, asPath, query } = router;
    router.replace({ pathname, query }, asPath, { locale: key });
    appLocalStorage.set(LOCAL_STORAGE_KEYS.LANGUAGE, key);
  };
  return (
    <div>
      <Dropdown
        menu={{ items, onClick }}
        arrow={{ pointAtCenter: true }}
        placement="bottomLeft"
        trigger={['click']}
        overlayStyle={{ top: '8%' }}
      >
        <Space>
          <Image
            preview={false}
            width={WIDTH_FLAG}
            alt=""
            src={`/images/${languageSelected}.png`}
          />
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};

export function AppLayout(props: Props) {
  const { translate: translateCommon } = useI18n('common');
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const [languageSelected, setLanguage] = useState<string>(LANGUAGE.EN);

  useEffect(() => {
    setLanguage(
      appLocalStorage.get(LOCAL_STORAGE_KEYS.LANGUAGE) || LANGUAGE.EN
    );
  }, [languageSelected]);
  const ROUTER_HEADER = {
    '/': [{ title: `${translateCommon('home')}` }],
    '/quotation': [{ title: `${translateCommon('quotation')}` }],
    '/quotation/edit/[id]': [
      {
        title: (
          <Link href={ROUTERS.QUOTATION}>{translateCommon('quotation')}</Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/booking': [{ title: `${translateCommon('booking')}` }],
    '/booking/edit/[id]': [
      {
        title: <Link href={ROUTERS.BOOKING}>{translateCommon('booking')}</Link>,
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/partner/customer': [
      { title: `${translateCommon('partner')}` },
      { title: `${translateCommon('customer')}` },
    ],
    '/partner/customer/edit/[id]': [
      { title: `${translateCommon('partner')}` },
      {
        title: (
          <Link href={ROUTERS.CUSTOMER}>{translateCommon('customer')}</Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/partner/supplier': [
      { title: `${translateCommon('partner')}` },
      { title: `${translateCommon('supplier')}` },
    ],
    '/partner/supplier/edit/[id]': [
      { title: `${translateCommon('partner')}` },
      {
        title: (
          <Link href={ROUTERS.SUPPLIER}>{translateCommon('supplier')}</Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/port': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('port')}` },
    ],
    '/master-data/port/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: <Link href={ROUTERS.PORT}>{translateCommon('port')}</Link> },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/depot': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('depot')}` },
    ],
    '/master-data/depot/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: <Link href={ROUTERS.DEPOT}>{translateCommon('depot')}</Link> },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/location-catalog/location': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      { title: `${translateCommon('location')}` },
    ],
    '/master-data/location-catalog/location/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      {
        title: (
          <Link href={ROUTERS.LOCATION}>{translateCommon('location')}</Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/location-catalog/type-of-location': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      { title: `${translateCommon('type_of_location')}` },
    ],
    '/master-data/location-catalog/type-of-location/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      {
        title: (
          <Link href={ROUTERS.TYPE_OF_LOCATION}>
            {translateCommon('type_of_location')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/container-catalog/container': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('container_catalog')}` },
      { title: `${translateCommon('container')}` },
    ],
    '/master-data/container-catalog/container/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('container_catalog')}` },
      {
        title: (
          <Link href={ROUTERS.CONTAINER}>{translateCommon('container')}</Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/unit': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('unit')}` },
    ],
    '/master-data/unit/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: <Link href={ROUTERS.UNIT}>{translateCommon('unit')}</Link> },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/accountant/exchange-rate': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      { title: `${translateCommon('exchange_rate')}` },
    ],
    '/master-data/accountant/exchange-rate/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      {
        title: (
          <Link href={ROUTERS.CURRENCY}>
            {translateCommon('exchange_rate')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/accountant/currency': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      { title: `${translateCommon('currency')}` },
    ],
    '/master-data/accountant/currency/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      {
        title: (
          <Link href={ROUTERS.CURRENCY}>{translateCommon('currency')}</Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/accountant/bank': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      { title: `${translateCommon('bank')}` },
    ],
    '/master-data/accountant/bank/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      {
        title: <Link href={ROUTERS.BANK}>{translateCommon('bank')}</Link>,
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/type-of-expenses': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('type_of_expenses')}` },
    ],
    '/master-data/type-of-expenses/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      {
        title: (
          <Link href={ROUTERS.TYPES_OF_EXPENSES}>
            {translateCommon('type_of_expenses')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/container-catalog/type-of-container': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('container_catalog')}` },
      { title: `${translateCommon('type_of_container')}` },
    ],
    '/master-data/container-catalog/type-of-container/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('container_catalog')}` },
      {
        title: (
          <Link href={ROUTERS.TYPES_OF_CONTAINER}>
            {translateCommon('type_of_container')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/system/staff': [
      { title: <Link href={''}>{translateCommon('system')}</Link> },
      { title: `${translateCommon('staff')}` },
    ],
    '/system/staff/edit/[id]': [
      { title: <Link href={''}>{translateCommon('system')}</Link> },
      { title: <Link href={ROUTERS.STAFF}>{translateCommon('staff')}</Link> },
      { title: `${translateCommon('detail')}` },
    ],
    '/system/permission': [
      { title: <Link href={''}>{translateCommon('system')}</Link> },
      { title: `${translateCommon('permission')}` },
    ],
    '/system/permission/edit/[id]': [
      { title: <Link href={''}>{translateCommon('system')}</Link> },
      {
        title: (
          <Link href={ROUTERS.PERMISSION}>{translateCommon('permission')}</Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/404': [{ title: `${translateCommon('error')}` }],
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <link rel="favicon" href="/images/gls-logo.ico" />
        <link rel="shortcut icon" href="/images/gls-logo.ico" />
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
                items={ROUTER_HEADER[router.pathname as never]}
              />
            </Space>
            <Space style={{ cursor: 'pointer' }}>
              <SelectLanguage
                languageSelected={languageSelected}
                setLanguage={setLanguage}
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
              <Avatar style={{ display: 'block' }} icon={<UserOutlined />} />
              Thanh Viên
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
          <Footer
            style={{
              textAlign: 'center',
              padding: '8px 0',
              height: `${FOOTER_HEIGHT}px`,
            }}
          >
            <Text disabled>
              ©2023 Existing GLS website. All Rights Reserved | Design by Softek
              Solution
            </Text>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}
