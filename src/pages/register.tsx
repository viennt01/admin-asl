import { PageWithNoLayout } from '@/layout/no-layout';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import RegisterV2 from '@/components/register-v2';

const inter = Inter({ subsets: ['latin'] });
function RegisterPage() {
  return (
    <>
      <Head>
        <title>ASL | REGISTER</title>
      </Head>
      <main className={inter.className}>
        <RegisterV2 />
      </main>
    </>
  );
}
// const LoginPage = withAuthentication(Login);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
RegisterPage.Layout = PageWithNoLayout;

export default RegisterPage;
