import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CurrencyPage from '@/components/currency-page';

function Currency() {
  return (
    <>
      <Head>
        <title>ASL | CURRENCY</title>
      </Head>
      <CurrencyPage />
    </>
  );
}

export default withAuthentication(Currency);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'currency']);
