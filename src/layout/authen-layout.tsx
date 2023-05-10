import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Space, Avatar, Image } from 'antd';
import { Layout } from 'antd';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import { Typography } from 'antd';

// import { AppContext } from '@/app-context';
import AppSider from './components/app-sider';
import Head from 'next/head';

const { Text } = Typography;
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
        {/* <link rel="favicon" href={merchantInfo?.config?.favicon_url} /> */}
        {/* <link rel="shortcut icon" href={merchantInfo?.config?.favicon_url} /> */}
      </Head>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          padding: '0 24px',
          background: '#adadad',
          height: HEADER_HEIGHT,
        }}
      >
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Image
            style={{ maxHeight: 40, cursor: 'pointer' }}
            src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="logo"
            preview={false}
            onClick={() => router.push(ROUTERS.HOME)}
          />
          <Space
            style={{ cursor: 'pointer' }}
            // onClick={handleToggleUserInfoCollapse}
          >
            <Avatar style={{ display: 'block' }} icon={<UserOutlined />} />
            Thanh Viên
          </Space>
        </Space>
      </Header>
      <Layout>
        <AppSider />
        <Content
          style={{
            padding: '0 24px',
            maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            overflowY: 'auto',
          }}
        >
          <main>{props.children}</main>
          <Footer style={{ textAlign: 'center' }}>
            <Text disabled>{process.env.VERSION}</Text>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}
