import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditExchangeRate from '@/components/exchange-rate-page/exchange-rate-edit';

function ExchangeRateEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Exchange Rate Edit</title>
      </Head>
      <EditExchangeRate />
    </>
  );
}

export default withAuthentication(ExchangeRateEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'exchangeRate']);
export const getStaticPaths = async ({ locales }: { locales: [] }) => {
  const ids: string[] = [];
  const paths = ids.map(() =>
    locales.map(() => ({
      params: {},
    }))
  );
  return {
    paths,
    fallback: true,
  };
};
