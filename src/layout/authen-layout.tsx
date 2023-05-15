import { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Space, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import AppSider from './components/app-sider';

const { Text, Title } = Typography;
const { Header, Content, Footer } = Layout;
const HEADER_HEIGHT = 64;

interface Props {
  children: React.ReactNode;
}

export function AppLayout(props: Props) {
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <link rel="favicon" href="/images/gls-logo.ico" />
        <link rel="shortcut icon" href="/images/gls-logo.ico" />
      </Head>
      <AppSider />
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
            <Title level={4} style={{ marginBottom: '0' }}>
              {router.pathname.slice(1).toUpperCase()}
            </Title>
            <Space style={{ cursor: 'pointer' }}>
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
