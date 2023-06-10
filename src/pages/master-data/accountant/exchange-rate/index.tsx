import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ExchangeRatePage from '@/components/exchange-rate-page';

function ExchangeRate() {
  return (
    <>
      <Head>
        <title>GLS | CURRENCY</title>
      </Head>
      <ExchangeRatePage />
    </>
  );
}

export default withAuthentication(ExchangeRate);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'exchangeRate']);
