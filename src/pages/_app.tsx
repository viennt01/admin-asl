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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useLocaleAnt } from '@/constant';

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
  const localeApp = useLocaleAnt();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ConfigProvider
      locale={localeApp}
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
