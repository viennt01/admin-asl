import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import AppSider from './components/app-sider';
import {
  Avatar,
  Breadcrumb,
  Layout,
  Space,
  Typography,
  Badge,
  Image,
  Dropdown,
} from 'antd';
import {
  UserOutlined,
  MenuOutlined,
  BellOutlined,
  DownOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { LANGUAGE } from '@/constant';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;
const HEADER_HEIGHT = 64;
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
        // overlayClassName={style.languageMenu}
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
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const [languageSelected, setLanguage] = useState<string>(LANGUAGE.EN);
  const titleHeader = router.asPath.split('/').filter(function (item) {
    return item !== '';
  });
  console.log('titleHeader', router.pathname);

  useEffect(() => {
    setLanguage(
      appLocalStorage.get(LOCAL_STORAGE_KEYS.LANGUAGE) || LANGUAGE.EN
    );
  }, [languageSelected]);

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
              <Breadcrumb style={{ margin: '16px 0' }}>
                {titleHeader.map((item, index) => (
                  <Breadcrumb.Item key={index}>
                    {item
                      .split('-')
                      .map(function (word) {
                        return word.charAt(0).toUpperCase() + word.slice(1);
                      })
                      .join(' ')}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
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
                  height: '40px',
                }}
              >
                <Badge size="default" count={5}>
                  <BellOutlined style={{ fontSize: '26px' }} />
                </Badge>
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
          <Footer style={{ textAlign: 'center' }}>
            <Text disabled>GLS @2023 Created by GLS</Text>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}
