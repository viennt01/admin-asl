import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCurrency from '@/components/currency-page/currency-edit';

function CurrencyEditPage() {
  return (
    <>
      <Head>
        <title>ASL | CURRENCY EDIT</title>
      </Head>
      <EditCurrency />
    </>
  );
}

export default withAuthentication(CurrencyEditPage);
import { getStatic } from '@/lib/getStaticProps';
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
