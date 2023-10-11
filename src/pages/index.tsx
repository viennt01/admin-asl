import withAuthentication from '@/hook/useAuthentication';
import { PageWithNoLayout } from '@/layout/no-layout';
import L from '@/components/login';
import { Inter } from '@next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });
function Login() {
  return (
    <>
      <Head>
        <title>ASL | LOGIN</title>
      </Head>
      <main className={inter.className}>
        <L />
      </main>
    </>
  );
}
const LoginPage = withAuthentication(Login);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
LoginPage.Layout = PageWithNoLayout;

export default LoginPage;
