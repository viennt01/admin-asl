import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import { AppLayout } from '@/layout/authen-layout';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import COLORS from '@/constant/color';
import { useEffect, useState } from 'react';
import enUS from 'antd/lib/locale/en_US';
import vi_VN from 'antd/lib/locale/vi_VN';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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

function App({ Component, pageProps }: AppPropsWithLayout) {
  const L = Component.Layout ? Component.Layout : AppLayout;
  const [locale, setLocale] = useState(enUS);
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  useEffect(() => {
    switch (appLocalStorage.get(LOCAL_STORAGE_KEYS.LANGUAGE)) {
      case 'EN':
        setLocale(enUS);
        break;
      case 'VN':
        setLocale(vi_VN);
        break;
      default:
        setLocale(vi_VN);
        break;
    }
  }, [router]);
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: COLORS.PRIMARY,
        },
        components: {
          Input: {},
        },
      }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <L>
          <div className={inter.className}>
            <Component {...pageProps} />
          </div>
        </L>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default appWithTranslation(App);
