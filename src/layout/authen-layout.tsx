import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppSider from './components/app-sider';
import { Avatar, Breadcrumb, Layout, Space, Typography, Badge } from 'antd';
import { UserOutlined, MenuOutlined, BellOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;
const HEADER_HEIGHT = 64;

interface Props {
  children: React.ReactNode;
}

export function AppLayout(props: Props) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  console.log(
    'router',
    router.asPath.split('/').filter(function (item) {
      return item !== '';
    })
  );
  const titleHeader = router.asPath.split('/').filter(function (item) {
    return item !== '';
  });

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
            zIndex: 1,
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
