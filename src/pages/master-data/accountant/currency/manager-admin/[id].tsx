import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';

function CurrencyManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | CURRENCY MANAGER</title>
      </Head>
      <ManagerCurrency />
    </>
  );
}

export default withAuthentication(CurrencyManagerPage);
import { getStatic } from '@/lib/getStaticProps';
import ManagerCurrency from '@/components/currency-page/manager';
export const getStaticProps = getStatic(['common', 'currency']);
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
