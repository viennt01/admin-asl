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
import { LANGUAGES } from '@/constant';
export const getStaticProps = getStatic(['common', 'currency']);
export const getStaticPaths = () => {
  return {
    paths: LANGUAGES.map((locale: string) => {
      return {
        params: { id: '' },
        locale: locale,
      };
    }),
    fallback: true,
  };
};
