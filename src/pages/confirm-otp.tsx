import { PageWithNoLayout } from '@/layout/no-layout';
import ConfirmOtp from '@/components/cofirm-otp';

const inter = Inter({ subsets: ['latin'] });
function ConfirmOtpPage() {
  return (
    <>
      <Head>
        <title>ASL | CONFIRM OTP</title>
      </Head>
      <main className={inter.className}>
        <ConfirmOtp />
      </main>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ConfirmOtpPage.Layout = PageWithNoLayout;

export default ConfirmOtpPage;
import { getStatic } from '@/lib/getStaticProps';
import { Inter } from '@next/font/google';
import Head from 'next/head';
export const getStaticProps = getStatic(['common', 'forgot-password']);
