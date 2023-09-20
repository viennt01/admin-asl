import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCurrency from '@/components/currency-page/edit';

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
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
