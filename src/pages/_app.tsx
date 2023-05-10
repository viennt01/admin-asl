import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import { AppLayout } from '@/layout/authen-layout';
import { Inter } from '@next/font/google';
import Head from 'next/head';
// import AppContextProvider from '@/app-context';

const inter = Inter({ subsets: ['latin'] });
export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  Layout?: React.ElementType;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const L = Component.Layout ? Component.Layout : AppLayout;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2f54eb',
        },
        components: {
          Input: {},
        },
      }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <AppContextProvider> */}
      <L>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </L>
      {/* </AppContextProvider> */}
    </ConfigProvider>
  );
}
