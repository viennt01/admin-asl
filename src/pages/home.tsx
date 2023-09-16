import DashboardPage from '@/components/home/home';
import withAuthentication from '@/hook/useAuthentication';
import { Inter } from '@next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

function Home() {
  return (
    <>
      <Head>
        <title>ASL | HOME</title>
      </Head>
      <main className={inter.className}>
        <DashboardPage />
      </main>
    </>
  );
}

export default withAuthentication(Home);

import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'home']);
