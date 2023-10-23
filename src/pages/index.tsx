import withAuthentication from '@/hook/useAuthentication';
import { PageWithNoLayout } from '@/layout/no-layout';
//import L from '@/components/login';
import L from '@/components/login-v2';
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
//const LoginPage = withAuthentication(Login);
const LoginPageV2 = withAuthentication(Login);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

//LoginPage.Layout = PageWithNoLayout;
LoginPageV2.Layout = PageWithNoLayout;

//export default LoginPage;
export default LoginPageV2;
