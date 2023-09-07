import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerBank from '@/components/bank-page/manager';

function BankManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | BANK MANAGER</title>
      </Head>
      <ManagerBank />
    </>
  );
}

export default withAuthentication(BankManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'bank']);
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
