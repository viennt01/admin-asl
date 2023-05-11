import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Space, Avatar } from 'antd';
import { Layout } from 'antd';
import { Typography } from 'antd';

import AppSider from './components/app-sider';
import Head from 'next/head';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;
const HEADER_HEIGHT = 64;

interface Props {
  children: React.ReactNode;
}

export function AppLayout(props: Props) {
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
            <div></div>
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
