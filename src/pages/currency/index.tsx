import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CurrencyPage from '@/components/currency-page';

function Currency() {
  return (
    <>
      <Head>
        <title>GLS | CURRENCY</title>
      </Head>
      <CurrencyPage />
    </>
  );
}

export default withAuthentication(Currency);
