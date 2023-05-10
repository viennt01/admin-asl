import Head from 'next/head';
import { Inter } from '@next/font/google';
import DashboardPage from '@/components/dashboard/dashboard';
import withAuthentication from '@/hook/useAuthentication';

const inter = Inter({ subsets: ['latin'] });

function Home() {
  return (
    <>
      <Head>
        <title>Merchants | Dashboard</title>
      </Head>
      <main className={inter.className}>
        <DashboardPage />
      </main>
    </>
  );
}

export default withAuthentication(Home);
